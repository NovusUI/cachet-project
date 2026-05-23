import { hasSupabaseConfig, supabase } from "./supabase";

export type ContactSubmissionPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  siteKey: string;
  formKey: string;
  sourceUrl: string;
};

type ContactSubmissionResponse = {
  ok: boolean;
  message?: string;
  submissionId?: string;
  error?: string;
};

const GENERIC_ERROR_MESSAGE =
  "We couldn't send your message just now. Please try again shortly.";

export async function submitContactForm(payload: ContactSubmissionPayload) {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error(
      "Supabase is not configured yet. Add the public project URL and publishable key to your Vite environment."
    );
  }

  const { data, error } = await supabase.functions.invoke<ContactSubmissionResponse>(
    "form-submission",
    {
      body: payload,
    }
  );

  if (error) {
    throw new Error(error.message || GENERIC_ERROR_MESSAGE);
  }

  if (!data?.ok) {
    throw new Error(data?.error || data?.message || GENERIC_ERROR_MESSAGE);
  }

  return data;
}
