// Email Service for Franchise Management System
// In a real application, this would integrate with an actual email service like SendGrid, Mailgun, etc.

class EmailService {
    constructor() {
        this.sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    }

    // Send franchisee invitation email
    async sendFranchiseeInvitation(franchiseeData, franchisorData) {
        const emailData = {
            id: Date.now(),
            type: 'franchisee_invitation',
            to: franchiseeData.email,
            subject: `Welcome to ${franchisorData.businessName} Franchise Network`,
            template: 'franchisee_invitation',
            data: {
                franchisee: franchiseeData,
                franchisor: franchisorData,
                inviteLink: this.generateInviteLink('franchisee', franchiseeData.id)
            },
            sentAt: new Date().toISOString(),
            status: 'sent'
        };

        this.sentEmails.push(emailData);
        this.saveEmails();

        // In real app, this would make an API call to email service
        console.log('Franchisee invitation email sent:', emailData);

        return emailData;
    }

    // Send staff invitation email
    async sendStaffInvitation(staffData, storeData) {
        const emailData = {
            id: Date.now(),
            type: 'staff_invitation',
            to: staffData.email,
            subject: `You're invited to join ${storeData.businessName}`,
            template: 'staff_invitation',
            data: {
                staff: staffData,
                store: storeData,
                inviteLink: this.generateInviteLink('staff', staffData.id)
            },
            sentAt: new Date().toISOString(),
            status: 'sent'
        };

        this.sentEmails.push(emailData);
        this.saveEmails();

        // In real app, this would make an API call to email service
        console.log('Staff invitation email sent:', emailData);

        return emailData;
    }

    // Send franchisor activation email
    async sendFranchisorActivation(franchisorData) {
        const emailData = {
            id: Date.now(),
            type: 'franchisor_activation',
            to: franchisorData.email,
            subject: 'Your Franchisor Account is Now Active',
            template: 'franchisor_activation',
            data: {
                franchisor: franchisorData,
                loginLink: `${window.location.origin}/[SU] New Tenant creation/auth_signin.html`,
                dashboardLink: `${window.location.origin}/[SU] Franchisor Management/franchisor_create_screen.html`
            },
            sentAt: new Date().toISOString(),
            status: 'sent'
        };

        this.sentEmails.push(emailData);
        this.saveEmails();

        console.log('Franchisor activation email sent:', emailData);
        return emailData;
    }

    // Send single store activation email
    async sendSingleStoreActivation(storeData) {
        const emailData = {
            id: Date.now(),
            type: 'store_activation',
            to: storeData.email,
            subject: 'Your Store Account is Now Active',
            template: 'store_activation',
            data: {
                store: storeData,
                loginLink: `${window.location.origin}/[SU] New Tenant creation/auth_signin.html`,
                dashboardLink: `${window.location.origin}/[SU] Franchisor Management/Tenant_managment_screen.html`
            },
            sentAt: new Date().toISOString(),
            status: 'sent'
        };

        this.sentEmails.push(emailData);
        this.saveEmails();

        console.log('Store activation email sent:', emailData);
        return emailData;
    }

    // Send super admin notification
    async sendSuperAdminNotification(data, type) {
        const emailData = {
            id: Date.now(),
            type: 'admin_notification',
            to: 'admin@franchisesystem.com', // Super admin email
            subject: `New ${type} Account Activated`,
            template: 'admin_notification',
            data: {
                registrationType: type,
                data: data,
                dashboardLink: `${window.location.origin}/admin/dashboard.html`
            },
            sentAt: new Date().toISOString(),
            status: 'sent'
        };

        this.sentEmails.push(emailData);
        this.saveEmails();

        console.log('Admin notification email sent:', emailData);
        return emailData;
    }

    // Send welcome email with plan and invoice summary
    async sendWelcomeWithInvoiceEmail({
        toEmail,
        recipientName,
        accountType,
        businessName,
        planKey,
        planName,
        amount,
        currency = 'USD',
        period = 'per month',
        invoiceNumber,
        invoiceDate = new Date().toISOString(),
        invoiceUrl,
        dashboardLink,
        contentFormat = 'html'
    }) {
        const emailData = {
            id: Date.now(),
            type: 'welcome_with_invoice',
            to: toEmail,
            subject: `Welcome to Franchise Management – ${planName} activated` ,
            template: contentFormat === 'markdown' ? 'welcome_with_invoice_md' : 'welcome_with_invoice',
            data: {
                recipientName,
                accountType,
                businessName,
                planKey,
                planName,
                amount,
                currency,
                period,
                invoiceNumber,
                invoiceDate,
                invoiceUrl,
                dashboardLink
            },
            sentAt: new Date().toISOString(),
            status: 'sent',
            format: contentFormat
        };

        this.sentEmails.push(emailData);
        this.saveEmails();

        console.log('Welcome email with invoice sent:', emailData);
        return emailData;
    }

    // Generate invitation link
    generateInviteLink(type, id) {
        const baseUrl = window.location.origin;
        if (type === 'franchisee') {
            return `${baseUrl}/auth_signin.html?inviteType=franchisee&inviteId=${id}`;
        } else if (type === 'staff') {
            return `${baseUrl}/auth_signin.html?inviteType=staff&inviteId=${id}`;
        }
        return '';
    }

    // Get email templates (in real app, these would be stored on server)
    getEmailTemplate(templateName, data) {
        const templates = {
            franchisee_invitation: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #007bff;">Welcome to the Franchise Network!</h1>
                    <p>Dear ${data.franchisee.name},</p>
                    <p>Congratulations! You've been selected to join the ${data.franchisor.businessName} franchise network.</p>
                    <p>Your franchisor has created an account for your location: <strong>${data.franchisee.name}</strong></p>
                    <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
                        <h3>Location Details:</h3>
                        <p><strong>Business Name:</strong> ${data.franchisee.name}</p>
                        <p><strong>Owner:</strong> ${data.franchisee.owner}</p>
                        <p><strong>Address:</strong> ${data.franchisee.address}, ${data.franchisee.city}, ${data.franchisee.state} ${data.franchisee.postal}</p>
                    </div>
                    <p>To get started, please click the button below to set up your account:</p>
                    <a href="${data.inviteLink}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Set Up My Account</a>
                    <p>If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="${data.inviteLink}">${data.inviteLink}</a></p>
                    <p>Once you complete the setup, you'll have access to your franchise management dashboard.</p>
                    <p>Best regards,<br>The Franchise Management Team</p>
                </div>
            `,
            staff_invitation: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #007bff;">You're Invited to Join the Team!</h1>
                    <p>Dear ${data.staff.name},</p>
                    <p>You've been invited to join ${data.store.businessName} as a team member.</p>
                    <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
                        <h3>Store Details:</h3>
                        <p><strong>Store:</strong> ${data.store.businessName}</p>
                        <p><strong>Your Role:</strong> ${data.staff.role}</p>
                    </div>
                    <p>To get started, please click the button below to set up your account:</p>
                    <a href="${data.inviteLink}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Set Up My Account</a>
                    <p>If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="${data.inviteLink}">${data.inviteLink}</a></p>
                    <p>Best regards,<br>The ${data.store.businessName} Team</p>
                </div>
            `,
            franchisor_activation: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #28a745;">Your Franchisor Account is Active!</h1>
                    <p>Dear ${data.franchisor.contactName},</p>
                    <p>Congratulations! Your franchisor account for ${data.franchisor.businessName} has been activated.</p>
                    <p>Franchisee invitation emails have been sent to all the locations you specified.</p>
                    <div style="background: #d4edda; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #28a745;">
                        <h3>What's Next:</h3>
                        <ul>
                            <li>Complete your brand identity setup</li>
                            <li>Monitor franchisee onboarding progress</li>
                            <li>Access your franchisor dashboard</li>
                        </ul>
                    </div>
                    <a href="${data.dashboardLink}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Access Your Dashboard</a>
                    <p>Best regards,<br>The Franchise Management Team</p>
                </div>
            `,
            store_activation: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #28a745;">Your Store Account is Active!</h1>
                    <p>Dear ${data.store.contactName},</p>
                    <p>Congratulations! Your store account for ${data.store.businessName} has been activated.</p>
                    <div style="background: #d4edda; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #28a745;">
                        <h3>What's Next:</h3>
                        <ul>
                            <li>Complete your store setup (brand, payment, staff, services)</li>
                            <li>Invite team members to join</li>
                            <li>Access your store dashboard</li>
                        </ul>
                    </div>
                    <a href="${data.dashboardLink}" style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Access Your Dashboard</a>
                    <p>Best regards,<br>The Franchise Management Team</p>
                </div>
            `,
            admin_notification: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #17a2b8;">New Account Activated</h1>
                    <p>A new ${data.registrationType} account has been activated.</p>
                    <div style="background: #d1ecf1; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #17a2b8;">
                        <p>The account is now active and the user can access their dashboard immediately.</p>
                        <p><strong>Account Type:</strong> ${data.registrationType}</p>
                        <p><strong>Contact:</strong> ${data.data.contactName} (${data.data.email})</p>
                        <p><strong>Business:</strong> ${data.data.businessName}</p>
                    </div>
                    <a href="${data.dashboardLink}" style="background: #17a2b8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">View Admin Dashboard</a>
                    <p>Best regards,<br>The Franchise Management System</p>
                </div>
            `
            ,
            welcome_with_invoice: `
                <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
                    <h1 style="color: #28a745; margin-bottom: 8px;">Welcome aboard, ${data.recipientName}!</h1>
                    <p style="margin: 0 0 16px 0;">Your ${data.accountType === 'franchisor' ? 'Franchisor' : 'Single Store'} tenant for <strong>${data.businessName}</strong> has been created and activated.</p>
                    <div style="background:#f8f9fa; border-left:4px solid #28a745; padding:16px; border-radius:8px; margin:16px 0;">
                        <h3 style="margin:0 0 8px 0; color:#2c3e50;">Plan Details</h3>
                        <p style="margin:0;">
                            <strong>Plan:</strong> ${data.planName} (${data.period})<br>
                            <strong>Amount:</strong> ${new Intl.NumberFormat('en-US',{style:'currency',currency:data.currency}).format(data.amount)}
                        </p>
                    </div>
                    <div style="background:#fff3cd; border-left:4px solid #ffc107; padding:16px; border-radius:8px; margin:16px 0;">
                        <h3 style="margin:0 0 8px 0; color:#856404;">Invoice</h3>
                        <p style="margin:0;">
                            <strong>Invoice #:</strong> ${data.invoiceNumber}<br>
                            <strong>Date:</strong> ${new Date(data.invoiceDate).toLocaleDateString()}<br>
                            ${data.invoiceUrl ? `<a href="${data.invoiceUrl}" style="color:#0056b3;">View/Download Invoice</a>` : ''}
                        </p>
                    </div>
                    ${data.dashboardLink ? `<a href="${data.dashboardLink}" style="background:#007bff; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; display:inline-block; margin:16px 0;">Go to Dashboard</a>` : ''}
                    <p style="color:#6c757d;">If you have any questions, just reply to this email—we're here to help.</p>
                    <p>— The Franchise Management Team</p>
                </div>
            `
            ,
            welcome_with_invoice_md: `
# Welcome aboard, ${data.recipientName}!

Your ${data.accountType === 'franchisor' ? 'Franchisor' : 'Single Store'} tenant for **${data.businessName}** has been created and activated.

## Plan Details
- **Plan**: ${data.planName} (${data.period})
- **Amount**: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: data.currency }).format(data.amount)}

## Invoice
- **Invoice #**: ${data.invoiceNumber}
- **Date**: ${new Date(data.invoiceDate).toLocaleDateString()}
${data.invoiceUrl ? `- **Invoice Link**: ${data.invoiceUrl}` : ''}

${data.dashboardLink ? `[Go to Dashboard](${data.dashboardLink})` : ''}

If you have any questions, just reply to this email — we're here to help.

— The Franchise Management Team
            `
        };

        return templates[templateName] || '<div>Email template not found</div>';
    }

    // Save emails to localStorage (in real app, this would be server-side)
    saveEmails() {
        localStorage.setItem('sentEmails', JSON.stringify(this.sentEmails));
    }

    // Get sent emails
    getSentEmails() {
        return this.sentEmails;
    }

    // Simulate email sending (in real app, this would be actual API calls)
    async simulateEmailSend(emailData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    messageId: `msg_${emailData.id}`,
                    deliveredAt: new Date().toISOString()
                });
            }, 1000);
        });
    }
}

// Create global email service instance
window.emailService = new EmailService();
