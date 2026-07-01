import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      email,
      pickupPostcode,
      dropoffPostcode,
      pickupDate,
      pickupTime,
      returnTime,
      distanceMiles,
      totalCost,
    } = data;

    if (!email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* ---------------- CUSTOMER EMAIL ---------------- */
    await transporter.sendMail({
      from: `"Quote Estimate" <info@londonminibusrental.co.uk>`,
      to: email,
      subject: "Your Trip Quote Estimate",
      html: `
       <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Your Trip Quote Estimate</title>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f3f4f6">
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
                  Your Trip Quote
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
                <p style="margin: 0 0 18px; line-height: 1.6">
                  Thank you for requesting a quote with
                  <strong style="color: #0b0a4e">London Minibus Rental</strong>.
                  Below are the details of your trip:
                </p>

                <!-- Quote details -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Pick-up:</strong>
                    </td>
                    <td style="padding: 10px 0; font-size: 14px; text-align: right">
                      ${pickupPostcode} at ${pickupTime}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Drop-off:</strong>
                    </td>
                    <td style="padding: 10px 0; font-size: 14px; text-align: right">
                      ${dropoffPostcode} at ${returnTime}
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Pick-up Date:</strong>
                    </td>
                    <td style="padding: 10px 0; font-size: 14px; text-align: right">
                      ${pickupDate} 
                    </td>
                  </tr>

                        

                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Distance:</strong>
                    </td>
                    <td style="padding: 10px 0; font-size: 14px; text-align: right">
                      ${distanceMiles} miles
                    </td>
                  </tr>
                </table>

                <!-- Accent box -->
                <div
                  style="
                    margin-top: 24px;
                    padding: 18px;
                    background-color: #fff1e0;
                    border-radius: 10px;
                    text-align: center;
                  "
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 16px;
                      font-weight: 600;
                      color: #0b0a4e;
                    "
                  >
                    Total Quote Estimate: ${totalCost}
                  </p>
                </div>

                <p style="margin: 24px 0 0; line-height: 1.6">
                  We’ll contact you shortly to confirm availability and answer
                  any questions you may have.
                </p>
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
                  src="http://www.londonminibusrental.co.uk/icons/globe.png"
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
                  src="http://www.londonminibusrental.co.uk/icons/location.png"
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
                  src="http://www.londonminibusrental.co.uk/icons/phone.png"
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
</html>
      `,
    });

    /* ---------------- COMPANY EMAIL ---------------- */
    await transporter.sendMail({
      from: `"Quote Estimate London Minibus" <info@londonminibusrental.co.uk>`,
      to: "info@londonminibusrental.co.uk",
      subject: "New Estimate Calculated",
      html: `
       <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Quote Estimate</title>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f3f4f6">
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
                  New Quote Request
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
                <p style="margin: 0 0 18px; line-height: 1.6">
                  A new quote estimate has been calculated with the following
                  details:
                </p>

                <!-- Customer details -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Customer Email:</strong>
                    </td>
                    <td
                      style="
                        padding: 10px 0;
                        font-size: 14px;
                        text-align: right;
                      "
                    >
                      ${email}
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <div
                  style="margin: 24px 0; height: 1px; background-color: #e5e7eb"
                ></div>

                <!-- Trip details -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Pickup:</strong>
                    </td>
                    <td
                      style="
                        padding: 10px 0;
                        font-size: 14px;
                        text-align: right;
                      "
                    >
                      ${pickupPostcode} at ${pickupTime}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Drop-off:</strong>
                    </td>
                    <td
                      style="
                        padding: 10px 0;
                        font-size: 14px;
                        text-align: right;
                      "
                    >
                      ${dropoffPostcode} at ${returnTime}
                    </td>
                  </tr>

                    <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Pick-up Date:</strong>
                    </td>
                    <td style="padding: 10px 0; font-size: 14px; text-align: right">
                      ${pickupDate} 
                    </td>
                  </tr>

                      

                  <tr>
                    <td style="padding: 10px 0; font-size: 14px">
                      <strong>Distance:</strong>
                    </td>
                    <td
                      style="
                        padding: 10px 0;
                        font-size: 14px;
                        text-align: right;
                      "
                    >
                      ${distanceMiles} miles
                    </td>
                  </tr>
                </table>

                <!-- Total -->
                <div
                  style="
                    margin-top: 24px;
                    padding: 18px;
                    background-color: #fff1e0;
                    border-radius: 10px;
                    text-align: center;
                  "
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 16px;
                      font-weight: 600;
                      color: #0b0a4e;
                    "
                  >
                    Total Quote: ${totalCost}
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding: 18px;
                  background-color: #e9e8ff;
                  font-size: 12px;
                "
              >
                <strong style="color: #0b0a4e">London Minibus Rental</strong>
                <br />
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
    </table>
  </body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return new Response("Email failed", { status: 500 });
  }
}
