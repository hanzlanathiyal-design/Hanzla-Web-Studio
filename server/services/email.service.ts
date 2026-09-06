import { logger } from "../utils/logger";

export interface LeadNotificationPayload {
  referenceId: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string | null;
  businessType?: string;
  projectType: string;
  budget?: string;
  message: string;
  createdAt: Date | string;
}

export interface EmailSendResult {
  sent: boolean;
  status: "DELIVERED" | "SKIPPED_NOT_CONFIGURED" | "FAILED";
  messageId?: string;
  error?: string;
}

export class EmailService {
  /**
   * Evaluates whether email notification credentials are configured in the environment.
   * Does NOT assume or invent credentials.
   */
  public isConfigured(): boolean {
    const apiKey = process.env.EMAIL_API_KEY?.trim();
    return Boolean(apiKey && apiKey.length > 0);
  }

  /**
   * Retrieves the configured recipient email address.
   * Defaults to the studio contact email if EMAIL_TO is not explicitly set.
   */
  private getRecipientEmail(): string {
    return (
      process.env.EMAIL_TO?.trim() ||
      process.env.ADMIN_EMAIL?.trim() ||
      "hanzlanathiyal@gmail.com"
    );
  }

  /**
   * Retrieves the configured sender email address.
   */
  private getSenderEmail(): string {
    return (
      process.env.EMAIL_FROM?.trim() ||
      "Hanzla Web Studio <onboarding@resend.dev>"
    );
  }

  /**
   * Sends an email notification to the studio administrator about a newly stored lead.
   * If credentials are not configured, gracefully logs and skips without failing.
   */
  public async sendNewLeadNotification(
    lead: LeadNotificationPayload
  ): Promise<EmailSendResult> {
    if (!this.isConfigured()) {
      logger.info(
        `[EmailService] Notification skipped: EMAIL_API_KEY is not configured. Lead ${lead.referenceId} securely saved in database.`
      );
      return {
        sent: false,
        status: "SKIPPED_NOT_CONFIGURED",
      };
    }

    const apiKey = process.env.EMAIL_API_KEY!.trim();
    const to = this.getRecipientEmail();
    const from = this.getSenderEmail();
    const subject = `[New Lead] ${lead.businessName} - ${lead.projectType} (Ref: ${lead.referenceId})`;

    const textContent = `
New Project Inquiry Received - Hanzla Web Studio
-------------------------------------------------
Reference ID: ${lead.referenceId}
Status: NEW
Date: ${new Date(lead.createdAt).toUTCString()}

Client Details:
- Name: ${lead.name}
- Business: ${lead.businessName}
- Email: ${lead.email}
- Phone/WhatsApp: ${lead.phone || "Not provided"}
- Business Type: ${lead.businessType || "General Business"}
- Project Type: ${lead.projectType}
- Estimated Budget: ${lead.budget || "Flexible / Need Advice"}

Project Scope / Brief:
"${lead.message}"

Reply directly to: ${lead.email}
-------------------------------------------------
View in Admin Portal: ${process.env.APP_URL || "http://localhost:3000"}/#admin
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B1726; color: #E5E7EB; margin: 0; padding: 32px 16px;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #111E2E; border-radius: 12px; border: 1px solid #1E2E42; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="padding: 24px 32px; background-color: #0B1726; border-bottom: 2px solid #D4A72C;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display: inline-block; background-color: rgba(212, 167, 44, 0.15); color: #D4A72C; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px;">New Client Lead</span>
              <h1 style="color: #FFFFFF; font-size: 20px; margin: 0; font-weight: 700;">${this.escapeHtml(lead.businessName)}</h1>
              <p style="color: #9CA3AF; font-size: 13px; margin: 4px 0 0 0;">Reference: <strong>${this.escapeHtml(lead.referenceId)}</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Information -->
    <tr>
      <td style="padding: 32px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding-bottom: 12px; width: 35%; color: #9CA3AF; font-size: 13px;">Client Name:</td>
            <td style="padding-bottom: 12px; color: #FFFFFF; font-size: 14px; font-weight: 600;">${this.escapeHtml(lead.name)}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; color: #9CA3AF; font-size: 13px;">Email Address:</td>
            <td style="padding-bottom: 12px; color: #38BDF8; font-size: 14px; font-weight: 600;">
              <a href="mailto:${encodeURIComponent(lead.email)}?subject=Re:%20Website%20Project%20for%20${encodeURIComponent(lead.businessName)}" style="color: #38BDF8; text-decoration: none;">${this.escapeHtml(lead.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; color: #9CA3AF; font-size: 13px;">Phone / WhatsApp:</td>
            <td style="padding-bottom: 12px; color: #FFFFFF; font-size: 14px;">${this.escapeHtml(lead.phone || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; color: #9CA3AF; font-size: 13px;">Industry / Sector:</td>
            <td style="padding-bottom: 12px; color: #FFFFFF; font-size: 14px;">${this.escapeHtml(lead.businessType || "General Business")}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; color: #9CA3AF; font-size: 13px;">Project Type:</td>
            <td style="padding-bottom: 12px; color: #D4A72C; font-size: 14px; font-weight: 600;">${this.escapeHtml(lead.projectType)}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; color: #9CA3AF; font-size: 13px;">Target Budget:</td>
            <td style="padding-bottom: 12px; color: #10B981; font-size: 14px; font-weight: 600;">${this.escapeHtml(lead.budget || "Flexible / Need Advice")}</td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="background-color: #0B1726; border-radius: 8px; border: 1px solid #1E2E42; padding: 20px; margin-bottom: 28px;">
          <p style="margin: 0 0 8px 0; color: #9CA3AF; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Client Project Brief</p>
          <p style="margin: 0; color: #F3F4F6; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${this.escapeHtml(lead.message)}</p>
        </div>

        <!-- Quick Action Button -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="mailto:${encodeURIComponent(lead.email)}?subject=Website%20Inquiry%20-%20Hanzla%20Web%20Studio" style="display: inline-block; background-color: #D4A72C; color: #0B1726; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none;">Reply to ${this.escapeHtml(lead.name)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 16px 32px; background-color: #080F1A; border-top: 1px solid #1E2E42; text-align: center; font-size: 11px; color: #6B7280;">
        Received via Hanzla Web Studio Contact Portal • SLA: Respond within 4 hours
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    try {
      const endpoint =
        process.env.EMAIL_API_ENDPOINT?.trim() || "https://api.resend.com/emails";

      // 6-second timeout to ensure email delivery attempts never block HTTP responses
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          html: htmlContent,
          text: textContent,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        logger.error(`[EmailService] Delivery provider returned HTTP ${response.status}`, {
          status: response.status,
          response: errorBody.slice(0, 300),
          referenceId: lead.referenceId,
        });

        return {
          sent: false,
          status: "FAILED",
          error: `Provider error HTTP ${response.status}`,
        };
      }

      const responseData: any = await response.json().catch(() => ({}));
      logger.info(
        `[EmailService] Notification successfully sent for lead ${lead.referenceId}`,
        {
          messageId: responseData?.id,
          to,
        }
      );

      return {
        sent: true,
        status: "DELIVERED",
        messageId: responseData?.id,
      };
    } catch (error: any) {
      const isAborted = error?.name === "AbortError";
      const errorMsg = isAborted ? "Email provider request timed out" : error?.message || "Unknown error";

      logger.error("[EmailService] Failed to dispatch email notification", error, {
        referenceId: lead.referenceId,
        isAborted,
      });

      return {
        sent: false,
        status: "FAILED",
        error: errorMsg,
      };
    }
  }

  private escapeHtml(str: string): string {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

export const emailService = new EmailService();
