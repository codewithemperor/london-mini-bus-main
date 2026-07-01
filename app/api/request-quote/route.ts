import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
;

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const {
      tripType,
      phone,
      email,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupPostcode,
      destinationPostcode,
      passengers,
      luggage,
    } = data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* ---------------- COMPANY EMAIL ---------------- */
    await transporter.sendMail({
      from: `"Website Quote" <info@londonminibusrental.co.uk>`,
      to: "info@londonminibusrental.co.uk",
      replyTo: email,
      subject: "New Minibus Quote Request",
      html: `
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Trip Request</title>
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
                  src="http://www.londonminibusrental.co.uk/logo-white.png"
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
                  New Trip Request
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
                  A new trip request has been submitted via the website.
                </p>

                <!-- Trip Overview -->
                <h3
                  style="margin: 24px 0 12px; color: #0b0a4e; font-size: 16px"
                >
                  Trip Overview
                </h3>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="font-size: 14px"
                >
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">Trip type</td>
                    <td style="padding: 6px 0; text-align: right">
                      ${tripType}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">Phone</td>
                    <td style="padding: 6px 0; text-align: right">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">Email</td>
                    <td style="padding: 6px 0; text-align: right">${email}</td>
                  </tr>
                </table>

                <!-- Date -->
                <h3
                  style="margin: 28px 0 12px; color: #0b0a4e; font-size: 16px"
                >
                  Date
                </h3>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="font-size: 14px"
                >
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">
                      Pick up date
                    </td>
                    <td style="padding: 6px 0; text-align: right">
                      ${pickupDate}
                    </td>
                  </tr>

                  ${
                    returnDate
                      ? `
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">
                      Return date
                    </td>
                    <td style="padding: 6px 0; text-align: right">
                      ${returnDate}
                    </td>
                  </tr>
                  `
                      : ""
                  }
                </table>

                <!-- Time -->
                <h3
                  style="margin: 28px 0 12px; color: #0b0a4e; font-size: 16px"
                >
                  Time
                </h3>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="font-size: 14px"
                >
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">
                      Pick up time
                    </td>
                    <td style="padding: 6px 0; text-align: right">
                      ${pickupTime}
                    </td>
                  </tr>

                  ${
                    returnTime
                      ? `
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">
                      Return time
                    </td>
                    <td style="padding: 6px 0; text-align: right">
                      ${returnTime}
                    </td>
                  </tr>
                  `
                      : ""
                  }
                </table>

                <!-- Location -->
                <h3
                  style="margin: 28px 0 12px; color: #0b0a4e; font-size: 16px"
                >
                  Location
                </h3>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="font-size: 14px"
                >
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">
                      Pick up postcode
                    </td>
                    <td style="padding: 6px 0; text-align: right">
                      ${pickupPostcode}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">
                      Destination postcode
                    </td>
                    <td style="padding: 6px 0; text-align: right">
                      ${destinationPostcode}
                    </td>
                  </tr>
                </table>

                <!-- Capacity -->
                <h3
                  style="margin: 28px 0 12px; color: #0b0a4e; font-size: 16px"
                >
                  Capacity
                </h3>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="font-size: 14px"
                >
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">Passengers</td>
                    <td style="padding: 6px 0; text-align: right">
                      ${passengers}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600">Luggage</td>
                    <td style="padding: 6px 0; text-align: right">
                      ${luggage}
                    </td>
                  </tr>
                </table>

                <!-- Accent note -->
                <div
                  style="
                    margin-top: 28px;
                    padding: 16px;
                    background-color: #fff1e0;
                    border-left: 4px solid #ffb866;
                    border-radius: 10px;
                  "
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 13px;
                      line-height: 1.6;
                      color: #0b0a4e;
                    "
                  >
                    Please follow up with the customer as soon as possible.
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
                  color: #0b0a4e;
                "
              >
                <strong>London Minibus Rental</strong><br />
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

    /* ---------------- CUSTOMER AUTO-REPLY ---------------- */
    transporter
      .sendMail({
        from: `"London Minibus Rental" <info@londonminibusrental.co.uk>`,
        to: email,
        subject: "We've received your message",
        html: `
        <!doctype html>
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
                <p style="margin: 0 0 14px; line-height: 1.6">Hi there,</p>

                <p style="margin: 0 0 14px; line-height: 1.6">
                  Thank you for contacting
                  <strong style="color: #0b0a4e"> London Minibus Rental</strong
                  >. We have received your enquiry and will send you a quote shortly.
                </p>

                <p style="margin: 0 0 14px; line-height: 1.6">
                  We cannot wait to go on a ride with you.
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
      })
      .catch((err) => {
        console.error("Auto-reply failed:", err);
      });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Email failed" },
      { status: 500 },
    );
  }
}
