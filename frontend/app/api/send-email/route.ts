import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "re_Z2wwJge3_5Y6rFnkaGLkbAoB7pyahtS2g";
const recipientEmail = process.env.NOTIFICATION_EMAIL || "ssindia2006@gmail.com";

const resend = new Resend(resendApiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      type, // 'enquiry' | 'contact'
      firstName,
      lastName,
      email,
      phone,
      category,
      model,
      message,
      enquiry,
    } = body;

    const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Website Visitor";
    const userMessage = enquiry || message || "No message provided";
    const isEnquiry = type === "enquiry" || Boolean(category || model);

    const subject = isEnquiry
      ? `🚨 New Product Enquiry: ${model || category || "General Product"} - ${fullName}`
      : `📩 New Contact Inquiry from ${fullName} - SSIL Website`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #1e293b; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
            .header { background: #E11D48; padding: 24px 32px; color: #ffffff; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; }
            .header p { margin: 4px 0 0 0; font-size: 12px; opacity: 0.9; }
            .body { padding: 32px; }
            .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #E11D48; margin-bottom: 16px; border-bottom: 2px solid #ffe4e6; padding-bottom: 6px; }
            .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            .field-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .field-label { font-weight: 700; color: #64748b; width: 35%; }
            .field-value { font-weight: 600; color: #0f172a; }
            .message-box { background: #f8fafc; border-left: 4px solid #E11D48; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
            .footer { background: #0f172a; padding: 16px 32px; text-align: center; font-size: 12px; color: #94a3b8; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; background: #ffe4e6; color: #e11d48; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>Shiv Shakti India Limited</h1>
              <p>${isEnquiry ? "Official Product Specification & Quote Enquiry" : "Official Website Contact Inquiry"}</p>
            </div>
            
            <div class="body">
              <div class="section-title">
                ${isEnquiry ? "Product Enquiry Details" : "Sender Contact Information"}
              </div>

              <table class="field-table">
                <tr>
                  <td class="field-label">Full Name:</td>
                  <td class="field-value">${fullName}</td>
                </tr>
                <tr>
                  <td class="field-label">Email Address:</td>
                  <td class="field-value"><a href="mailto:${email}" style="color: #e11d48; text-decoration: none; font-weight: 700;">${email || "Not Provided"}</a></td>
                </tr>
                <tr>
                  <td class="field-label">Phone Number:</td>
                  <td class="field-value"><a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone || "Not Provided"}</a></td>
                </tr>
                ${
                  category
                    ? `<tr>
                        <td class="field-label">Product Category:</td>
                        <td class="field-value"><span class="badge">${category}</span></td>
                      </tr>`
                    : ""
                }
                ${
                  model
                    ? `<tr>
                        <td class="field-label">Model / Variant ID:</td>
                        <td class="field-value"><strong>${model}</strong></td>
                      </tr>`
                    : ""
                }
                <tr>
                  <td class="field-label">Submission Date:</td>
                  <td class="field-value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
                </tr>
              </table>

              <div class="section-title">Customer Message / Requirements</div>
              <div class="message-box">
                ${userMessage.replace(/\n/g, "<br/>")}
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0;">Automated lead delivery from SSIL Corporate Portal (Shiv Shakti India Limited)</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Try sending email to the target recipient (ssindia2006@gmail.com)
    // Note: If on Resend's free tier testing domain (onboarding@resend.dev), Resend allows sending to verified domain emails or account owner.
    const result = await resend.emails.send({
      from: "SSIL Portal <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email || undefined,
      subject: subject,
      html: htmlContent,
    });

    if (result.error) {
      console.warn("Resend primary delivery notice:", result.error.message);
      
      // Fallback: If free tier sandbox restricts to account owner (harshitssindia@gmail.com)
      if (recipientEmail !== "harshitssindia@gmail.com") {
        try {
          const fallbackResult = await resend.emails.send({
            from: "SSIL Portal <onboarding@resend.dev>",
            to: ["harshitssindia@gmail.com"],
            replyTo: email || undefined,
            subject: `[SSIL Lead] ${subject}`,
            html: htmlContent,
          });

          if (!fallbackResult.error) {
            return NextResponse.json({
              success: true,
              deliveredTo: "harshitssindia@gmail.com",
              note: "Delivered to verified account email while custom domain is pending verification.",
              id: fallbackResult.data?.id,
            });
          }
        } catch (e) {
          console.error("Fallback resend error:", e);
        }
      }

      return NextResponse.json(
        { success: false, error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error: any) {
    console.error("Error in /api/send-email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
