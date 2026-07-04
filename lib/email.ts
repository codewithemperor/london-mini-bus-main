import { Resend } from "resend";

type SendEmailOptions = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

let resend: Resend | null = null;
const fallbackResendSender = "London Minibus Rental <onboarding@resend.dev>";

function getResendClient() {
  const apiKey = process.env.RESEND_QUOTE_API_KEY || process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Resend API key");
  }

  resend ??= new Resend(apiKey);
  return resend;
}

export async function sendEmail({
  from,
  to,
  subject,
  html,
  replyTo,
}: SendEmailOptions) {
  const sender = process.env.RESEND_FROM_EMAIL || fallbackResendSender;

  const { data, error } = await getResendClient().emails.send({
    from: sender,
    to,
    subject,
    html,
    replyTo: replyTo || extractEmailAddress(from),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

function extractEmailAddress(value: string) {
  return value.match(/<([^>]+)>/)?.[1] || value;
}
