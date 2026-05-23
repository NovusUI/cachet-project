import { createClient } from "npm:@supabase/supabase-js@2";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  siteKey?: string;
  formKey?: string;
  sourceUrl?: string;
};

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const contactToEmail = Deno.env.get("CONTACT_TO_EMAIL");
const contactFromEmail = Deno.env.get("CONTACT_FROM_EMAIL");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");

const missingServerConfig =
  !resendApiKey || !contactToEmail || !contactFromEmail || !supabaseUrl || !serviceRoleKey;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function normalize(value?: string) {
  return value?.trim() ?? "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed." }, 405);
  }

  if (missingServerConfig) {
    return jsonResponse(
      {
        ok: false,
        error:
          "The contact service is not fully configured yet. Add the Supabase and Resend secrets in your project settings.",
      },
      500
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const firstName = normalize(payload.firstName);
  const lastName = normalize(payload.lastName);
  const phone = normalize(payload.phone);
  const email = normalize(payload.email).toLowerCase();
  const service = normalize(payload.service);
  const message = normalize(payload.message);
  const siteKey = normalize(payload.siteKey) || "cachet-main-site";
  const formKey = normalize(payload.formKey) || "primary-contact";
  const sourceUrl = normalize(payload.sourceUrl);

  if (!firstName || !phone || !email || !service || !message) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Please complete the required fields before submitting the form.",
      },
      400
    );
  }

  if (!emailPattern.test(email)) {
    return jsonResponse(
      {
        ok: false,
        error: "Please enter a valid email address.",
      },
      400
    );
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const origin = request.headers.get("origin") ?? "";
  const submittedAt = new Date().toISOString();

  const serviceClient = createClient(supabaseUrl!, serviceRoleKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const submission = {
    site_key: siteKey,
    form_key: formKey,
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    service,
    message,
    source_url: sourceUrl || null,
    origin: origin || null,
    user_agent: userAgent || null,
  };

  const { data: savedSubmission, error: dbError } = await serviceClient
    .from("contact_submissions")
    .insert(submission)
    .select("id")
    .single();

  if (dbError) {
    console.error("contact_submissions insert failed", dbError);
    return jsonResponse(
      {
        ok: false,
        error:
          "We couldn't save your message right now. Please try again shortly.",
      },
      500
    );
  }

  const senderName = [firstName, lastName].filter(Boolean).join(" ");
  const emailSubject = senderName
    ? `New website enquiry from ${senderName}`
    : "New website enquiry";

  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeService = escapeHtml(service);
  const safeSiteKey = escapeHtml(siteKey);
  const safeFormKey = escapeHtml(formKey);
  const safeSourceUrl = escapeHtml(sourceUrl || "-");
  const safeMessage = escapeHtml(message);

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f1f1f;">
      <h2 style="margin-bottom: 16px; color: #5C2E83;">New Cachet website enquiry</h2>
      <p><strong>Submitted:</strong> ${submittedAt}</p>
      <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Service of interest:</strong> ${safeService}</p>
      <p><strong>Site key:</strong> ${safeSiteKey}</p>
      <p><strong>Form key:</strong> ${safeFormKey}</p>
      <p><strong>Source URL:</strong> ${safeSourceUrl}</p>
      <div style="margin-top: 24px;">
        <p style="margin-bottom: 8px;"><strong>Message</strong></p>
        <div style="padding: 16px; border-radius: 12px; background: #f7efe8; white-space: pre-wrap;">${safeMessage}</div>
      </div>
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: email,
      subject: emailSubject,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error("Resend send failed", resendError);

    await serviceClient
      .from("contact_submissions")
      .update({ status: "email_failed" })
      .eq("id", savedSubmission.id);

    return jsonResponse(
      {
        ok: false,
        error:
          "Your message was saved, but the notification email could not be sent. Please check your Resend configuration.",
      },
      500
    );
  }

  await serviceClient
    .from("contact_submissions")
    .update({ status: "delivered" })
    .eq("id", savedSubmission.id);

  return jsonResponse({
    ok: true,
    message: "Thanks for reaching out. We'll get back to you shortly.",
    submissionId: savedSubmission.id,
  });
});
