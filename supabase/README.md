# Supabase + Resend Contact Form Setup

This project is wired to submit the website contact form through a Supabase Edge Function named `form-submission`.

## 1. Frontend environment

Create a local Vite env file with:

```bash
VITE_SUPABASE_URL=https://nhuduzndhmbqyqjtdojx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

## 2. Supabase database

Run the migration in `supabase/migrations/20260523162000_create_contact_submissions.sql` so the `contact_submissions` table exists.

## 3. Supabase function secrets

Add these secrets in Supabase:

```bash
SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=re_your_resend_api_key
CONTACT_TO_EMAIL=Cachetrealtors26@gmail.com
CONTACT_FROM_EMAIL=forms@support.gathergo.events
```

`SUPABASE_URL` is already available by default inside hosted Edge Functions, so you do not need to add it manually.

`CONTACT_FROM_EMAIL` must use your verified Resend domain.

## 4. Deploy the function

Deploy the Edge Function named `form-submission`.

If you are deploying from the Supabase dashboard editor, use the single-file source in `supabase/functions/form-submission/index.ts`. It no longer depends on sibling helper imports.

Make sure JWT verification is disabled for this function. The local config in `supabase/config.toml` already reflects that.

## 5. Frontend behavior

Once deployed, the site contact form submits to:

- function: `form-submission`
- site key: `cachet-main-site`
- form key: `primary-contact`

Each submission is stored in Supabase and then emailed through Resend.
