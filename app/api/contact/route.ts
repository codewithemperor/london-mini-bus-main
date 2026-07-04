import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { fullName, email, phoneNumber, message, captchaToken } =
      await req.json();

    if (!captchaToken) {
      return NextResponse.json(
        { error: "Missing captcha token" },
        { status: 400 },
      );
    }

    const formData = new URLSearchParams();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
    formData.append("response", captchaToken);

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const verification = await verifyRes.json();

    if (!verification.success) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 403 },
      );
    }

    if (!fullName || !email || !phoneNumber || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    /* 1️⃣ Send to YOU */
    await sendEmail({
      from: `"London Minibus Rental" <info@londonminibusrental.co.uk>`,
      to: "info@londonminibusrental.co.uk",
      replyTo: email,
      subject: "New Contact Form Inquiry",
      html: `  <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Inquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f2f4f7">
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="font-family: Arial, Helvetica, sans-serif"
    >
      <tr>
        <td align="center" style="padding: 32px 12px">
          <!-- Main container -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 14px;
              overflow: hidden;
              box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
            "
          >
            <!-- Header image -->
            <tr>
              <td>
                <img
                  src="https://londonminibusrental.co.uk/buses/tower-bus.webp"
                  alt="London Minibus Rental"
                  width="600"
                  height="300"
                  style="
                    display: block;
                    width: 100%;
                    max-width: 600px;

                    object-fit: cover;
                    object-position: 0% 90%;
                  "
                />
              </td>
            </tr>

            <!-- Logo -->
            <tr>
              <td align="center" style="padding: 20px 24px 8px">
                <img
                  src="https://londonminibusrental.co.uk/logo.png"
                  alt="London Minibus Rental Logo"
                  width="100"
                  style="display: block; height: auto"
                />
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td
                align="center"
                style="
                  padding: 8px 24px 24px;
                  font-size: 22px;
                  font-weight: 600;
                  color: #0e0d62;
                  text-decoration: underline;
                  text-underline-offset: 10px;
                  text-decoration-style: dotted;
                "
              >
                New Inquiry From Contact Form
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 0 32px 24px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280">Full Name</td>
                    <td
                      style="
                        padding: 10px 0;
                        font-size: 12px;
                        font-weight: 600;
                        color: #111827;
                      "
                    >
                      ${fullName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280">Email</td>
                    <td
                      style="
                        padding: 10px 0;
                        font-size: 12px;
                        font-weight: 600;
                        color: #111827;
                      "
                    >
                      ${email}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #6b7280">Phone</td>
                    <td
                      style="
                        padding: 10px 0;
                        font-size: 12px;
                        font-weight: 600;
                        color: #111827;
                      "
                    >
                      ${phoneNumber}
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <div
                  style="
                    margin-top: 24px;
                    padding: 18px;
                    background-color: #e9e8ff;
                    border-radius: 10px;
                    border: 1px solid #e5e7eb;
                  "
                >
                  <p style="margin: 0 0 8px; font-weight: 600; color: #111827">
                    Message
                  </p>
                  <p style="margin: 0; color: #1b1b1b; line-height: 1.6">
                    ${message}
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding: 21px;
                  background-color: #fff1e0;
                  font-size: 12px;
                  color: #3f3f3f;
                "
              >
                Sent from the contact form on<br />
                <strong>londonminibusrental.co.uk</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });

    /* 2️⃣ Auto-reply to customer */
    await sendEmail({
      from: `"London Minibus Rental" <info@londonminibusrental.co.uk>`,
      to: email,
      subject: "We've received your message",
      html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>We've received your message</title>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f3f4f6">
    <table
      width="100%"
      cellpadding="0"
      cell-spacing="0"
      role="presentation"
      style="font-family: Arial, Helvetica, sans-serif"
    >
      <tr>
        <td align="center" style="padding: 32px 12px">
          <!-- Main container -->
          <table
            width="600"
            cellpadding="0"
            cell-spacing="0"
            style="
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 14px 40px rgba(11, 10, 78, 0.15);
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background-color: #0b0a4e;
                  padding: 28px 24px;
                  text-align: center;
                "
              >
                <img
                  src="https://londonminibusrental.co.uk/logo-white.png"
                  alt="London Minibus Rental"
                  width="120"
                  style="display: block; margin: 0 auto 12px; height: auto"
                />

                <h1
                  style="
                    margin: 0;
                    font-size: 22px;
                    font-weight: 600;
                    color: #ffffff;
                  "
                >
                  Message Received
                </h1>

                <div
                  style="
                    width: 60px;
                    height: 3px;
                    background-color: #ffb866;
                    margin: 14px auto 0;
                    border-radius: 2px;
                  "
                ></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px; color: #1f2937">
                <p style="margin: 0 0 14px; line-height: 1.6">Hi ${fullName},</p>

                <p style="margin: 0 0 14px; line-height: 1.6">
                  Thank you for contacting
                  <strong style="color: #0b0a4e"> London Minibus Rental </strong
                  >. We've safely received your message and one of our team
                  members will get back to you shortly.
                </p>

                <p style="margin: 0 0 14px; line-height: 1.6">
                  We aim to respond as quickly as possible during business
                  hours.
                </p>

                <!-- Accent box -->
                <div
                  style="
                    margin-top: 24px;
                    padding: 16px;
                    background-color: #fff1e0;
                    border-left: 4px solid #fff1e0;
                    border-radius: 10px;
                  "
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 14px;
                      line-height: 1.6;
                      color: #0b0a4e;
                    "
                  >
                    Kindly reach us directly via phone call for immediate assistance for urgent enquiries.
                  </p>
                </div>
              </td>
            </tr>

        <!-- Footer -->
<tr>
  <td
    align="center"
    style="
      padding: 22px;
      background-color: #e9e8ff;
      font-size: 12px;
      color: #0b0a4e;
      text-align: center;
    "
  >
    <strong style="font-size: 13px;">London Minibus Rental</strong>

    <table
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center"
      style="margin: 12px auto 0;"
    >
      <!-- Website -->
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" role="presentation" align="center">
            <tr>
              <td valign="middle" style="padding-right: 6px;">
                <img
                  src="http://www.londonminibusrental.co.uk/icons/globe.webp"
                  width="16"
                  height="16"
                  alt="Website"
                  style="display: block;"
                />
              </td>
              <td
                valign="middle"
                style="line-height: 16px; text-align: center;"
              >
                <a
                  href="https://londonminibusrental.co.uk"
                  style="
                    color: #0e0d62;
                    text-decoration: none;
                    font-weight: 600;
                  "
                >
                  londonminibusrental.co.uk
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Address -->
      <tr>
        <td align="center" style="padding-top: 6px;">
          <table cellpadding="0" cellspacing="0" role="presentation" align="center">
            <tr>
              <td valign="middle" style="padding-right: 6px;">
                <img
                  src="http://www.londonminibusrental.co.uk/icons/location.webp"
                  width="16"
                  height="16"
                  alt="Address"
                  style="display: block;"
                />
              </td>
              <td
                valign="middle"
                style="line-height: 16px; text-align: center;"
              >
                London, United Kingdom
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Phone -->
      <tr>
        <td align="center" style="padding-top: 6px;">
          <table cellpadding="0" cellspacing="0" role="presentation" align="center">
            <tr>
              <td valign="middle" style="padding-right: 6px;">
                <img
                  src="http://www.londonminibusrental.co.uk/icons/phone.webp"
                  width="16"
                  height="16"
                  alt="Phone"
                  style="display: block;"
                />
              </td>
              <td
                valign="middle"
                style="line-height: 16px; text-align: center;"
              >
                <a
                  href="tel:+442089878046"
                  style="
                    color: #0e0d62;
                    text-decoration: none;
                    font-weight: 600;
                  "
                >
                  +44 20 8987 8046
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
