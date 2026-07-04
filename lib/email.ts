import nodemailer from "nodemailer";

type SendEmailOptions = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

let transporter: nodemailer.Transporter | null = null;

function getEnv(...keys: string[]) {
  return keys.map((key) => process.env[key]).find(Boolean);
}

function getSmtpTransporter() {
  const user = getEnv("SMTP_USER", "EMAIL_SERVER_USER", "MAIL_USER");
  const host = getEnv("SMTP_HOST", "EMAIL_SERVER_HOST", "MAIL_HOST");
  const port = Number(
    getEnv("SMTP_PORT", "EMAIL_SERVER_PORT", "MAIL_PORT") ?? 587,
  );
  const pass = getEnv(
    "SMTP_PASS",
    "SMTP_PASSWORD",
    "EMAIL_SERVER_PASSWORD",
    "MAIL_PASS",
  );
  const secure =
    getEnv("SMTP_SECURE", "EMAIL_SERVER_SECURE", "MAIL_SECURE") === "true" ||
    port === 465;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration");
  }

  transporter ??= nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export async function sendEmail({
  from,
  to,
  subject,
  html,
  replyTo,
}: SendEmailOptions) {
  const sender = getEnv("SMTP_FROM", "EMAIL_FROM", "MAIL_FROM") || from;

  return getSmtpTransporter().sendMail({
    from: sender,
    to,
    subject,
    html,
    replyTo: replyTo || extractEmailAddress(sender),
  });
}

function extractEmailAddress(value: string) {
  return value.match(/<([^>]+)>/)?.[1] || value;
}
