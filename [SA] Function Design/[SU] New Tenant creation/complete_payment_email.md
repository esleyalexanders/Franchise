Title: Complete Your Payment to Activate Your Tenant

Subject: Action Required — Complete your payment to activate {{tenantName}}

Preheader: Finish your payment to activate access for {{tenantName}}. It only takes a minute.

Placeholders:
- {{recipientName}}: The recipient's first name or full name
- {{tenantName}}: The tenant/business/workspace name being activated
- {{amountDue}}: The total amount to pay (e.g., $149.00)
- {{dueDate}}: Payment due date (e.g., Oct 10, 2025)
- {{paymentLink}}: URL to secure checkout/payment page
- {{invoiceNumber}}: Optional invoice or order number
- {{supportEmail}}: Support contact email
- {{companyName}}: Your company name (sender)
- {{companyAddress}}: Your company postal address (for footer compliance)


HTML template
----------------
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Complete Your Payment</title>
    <style>
      /* Basic email-safe styles */
      body { margin: 0; padding: 0; background-color: #f5f7fb; font-family: Arial, Helvetica, sans-serif; color: #111827; }
      .container { width: 100%; background-color: #f5f7fb; padding: 24px 0; }
      .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06); }
      .header { background: linear-gradient(90deg, #304ffe, #7c4dff); color: #ffffff; padding: 20px 24px; }
      .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
      .content { padding: 24px; }
      .content h2 { margin: 0 0 12px; font-size: 18px; }
      .content p { margin: 12px 0; line-height: 1.6; }
      .summary { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0; }
      .summary table { width: 100%; border-collapse: collapse; }
      .summary td { padding: 6px 0; font-size: 14px; }
      .cta { display: inline-block; background-color: #304ffe; color: #ffffff !important; text-decoration: none; padding: 12px 18px; border-radius: 6px; font-weight: 600; margin: 8px 0 16px; }
      .cta:hover { opacity: 0.95; }
      .note { font-size: 12px; color: #6b7280; margin-top: 8px; }
      .footer { text-align: center; color: #6b7280; font-size: 12px; padding: 16px 24px 24px; }
      .small { font-size: 12px; color: #6b7280; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>Complete your payment to activate {{tenantName}}</h1>
        </div>
        <div class="content">
          <h2>Hi {{recipientName}},</h2>
          <p>
            You're almost there! To activate your tenant <strong>{{tenantName}}</strong> and unlock
            full access, please complete your payment.
          </p>

          <div class="summary">
            <table role="presentation" aria-hidden="true">
              <tr>
                <td><strong>Amount due</strong></td>
                <td style="text-align:right;">{{amountDue}}</td>
              </tr>
              <tr>
                <td><strong>Due by</strong></td>
                <td style="text-align:right;">{{dueDate}}</td>
              </tr>
              <tr>
                <td><strong>Invoice</strong></td>
                <td style="text-align:right;">{{invoiceNumber}}</td>
              </tr>
            </table>
          </div>

          <p>
            Use the secure link below to finish checkout. It takes less than a minute.
          </p>

          <p>
            <a class="cta" href="{{paymentLink}}" target="_blank" rel="noopener">Complete payment</a>
          </p>

          <p class="small">
            If the button doesn't work, copy and paste this link into your browser:<br />
            <a href="{{paymentLink}}" target="_blank" rel="noopener">{{paymentLink}}</a>
          </p>

          <p>
            Need help or have questions? Reply to this email or reach us at
            <a href="mailto:{{supportEmail}}">{{supportEmail}}</a> — we're happy to assist.
          </p>

          <p>Thank you,<br />
            {{companyName}} Team
          </p>

          <p class="note">
            This reminder is about activating tenant "{{tenantName}}". If you've already paid, you can safely ignore this message.
          </p>
        </div>
        <div class="footer">
          <div>{{companyName}}</div>
          <div>{{companyAddress}}</div>
        </div>
      </div>
    </div>
  </body>
  </html>
```


Plain-text template
-------------------
```text
Subject: Action Required — Complete your payment to activate {{tenantName}}

Hi {{recipientName}},

You're almost there! To activate your tenant "{{tenantName}}" and unlock full access, please complete your payment.

Amount due: {{amountDue}}
Due by: {{dueDate}}
Invoice: {{invoiceNumber}}

Complete payment: {{paymentLink}}

If the link doesn't work, copy and paste it into your browser.

Need help? Reply to this email or contact us at {{supportEmail}}.

Thank you,
{{companyName}} Team

{{companyName}}
{{companyAddress}}
```


Subject line alternatives
-------------------------
- Complete your payment to activate {{tenantName}}
- Just one step left — finish payment for {{tenantName}}
- Payment reminder: Activate {{tenantName}} today
- Unlock access: Complete payment for {{tenantName}}


