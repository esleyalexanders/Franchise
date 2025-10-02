### Phase 1 – MVP Scope

---

#### **1. Multi-Tenant, Secure Client Login & Management**
* **Goal:** Provide each business (tenant) with an isolated environment and secure access for both admin and end clients.
* **Features:**
    * **Tenant isolation:** Separate databases per client to allow full portability if moving to another platform.
    * **Role-based access:** Admin, staff, and client roles with configurable permissions.
    * **Secure authentication:** Email/password, 2FA optional, single sign-on via Google or Microsoft.
    * **White-label branding** per tenant (logo, colors, contact details).
    * **Audit logs** for all login and data changes.
* **Configuration:**
    * Admin console for creating and managing tenants.
    * Password policy configurable per tenant.
* **Data model impact:**
    * Separate schemas or databases for each tenant.
* **UI impact:**
    * Login page customisable for each tenant’s brand.
    * Clear separation of admin vs client portal.

---

#### **2. Sales & Quoting Module**
* **Goal:** Enable businesses to manage quotes, assign staff, block out work times, and get approvals.
* **Features:**
    * **Central calendar** for sales quotes and follow-ups.
    * Add quotes with **estimated time** and assign staff.
    * Ability to add products/services from internal database or external links (e.g., Bunnings).
    * **Block out time** in calendar when quote is approved.
    * Send quotes via email/SMS/WhatsApp.
    * **Automated client reminders.**
    * **Client portal approval** to start work.
* **Configuration:**
    * Quote templates with editable line items.
    * Reminder intervals configurable.
* **Data model impact:**
    * Quotes linked to customers and staff.
    * Status tracking (Draft, Sent, Approved, Rejected).
* **UI impact:**
    * Calendar view showing sales appointments and blocked work slots.
    * Quote builder with product search.

---

#### **3. Job Tracking & Invoicing**
* **Goal:** Manage active jobs, staff time, and invoice clients efficiently.
* **Features:**
    * **Assign work time** to calendar and staff.
    * **Daily staff timesheet approval** by owner/manager.
    * Send **progress reports** to clients.
    * Generate and send invoices with **payment links**.
    * Support for **progress payments.**
    * **Automated invoice reminders.**
* **Configuration:**
    * Default invoice terms per tenant.
    * Time approval workflow.
* **Data model impact:**
    * Jobs linked to quotes and invoices.
* **UI impact:**
    * Job detail page with status tracking.
    * Integrated timesheet submission and approval screen.

---

#### **4. Money Collection & Accounting Integration**
* **Goal:** Collect payments, manage reconciliation, and integrate with accounting platforms.
* **Features:**
    * **API integration** with Xero, QuickBooks, and MYOB.
    * **Bank reconciliation** via connected accounting software.
    * **Multi-gateway payment support** (credit card, direct debit, PayPal, Apple Pay, Google Wallet).
    * **Split payments** support for partial invoices.
    * **Auto-sync** of payment receipts to accounting system.
* **Configuration:**
    * Default payment methods per tenant.
    * Gateway provider selection per tenant.
* **Data model impact:**
    * Payment transaction records linked to invoices.
* **UI impact:**
    * Payment status dashboard.
    * Setup wizard for accounting software integration.

---

#### **5. Accounts & Payroll Interface**
* **Goal:** Streamline payroll and give admins a single place to manage client payroll needs.
* **Features:**
    * **Payroll handled in accounting software** but with summary view in platform.
    * Admin interface for **payroll data entry** for clients using managed payroll services.
    * **Profit & loss summary** from accounting API.
* **Configuration:**
    * Payroll frequency per tenant.
* **UI impact:**
    * Payroll summary dashboard.

---

#### **6. Communication Hub**
* **Goal:** Centralise business communication with clients and staff.
* **Features:**
    * Send **email, SMS, and WhatsApp messages**.
    * **Scheduled and repeating communications.**
    * **Automatic responses** based on pre-set rules.
    * Easy rules setup via clickable templates (no coding).
    * **AI-assisted responses** for common queries (optional approval before sending).
* **Configuration:**
    * Comms templates per tenant.
    * Approval flow toggle.
* **UI impact:**
    * Conversation view with multi-channel messaging.
    * Rule builder interface.

---

#### **7. Location-Aware Booking with Google Maps**
* **Goal:** For on-site services, optimise schedules by preventing inefficient travel.
* **Features:**
    * **Google Maps Distance Matrix API integration.**
    * When booking, check distance/time from prior job.
    * If threshold exceeded, block booking or suggest alternate times.
    * **Auto-adjust available slots** based on travel time.
    * **Override option** for authorised roles.
* **Configuration:**
    * Thresholds per tenant or job type.
* **Data model impact:**
    * Store job addresses and geocodes.
* **UI impact:**
    * Calendar view shows travel times between jobs.
    * Warning pop-ups for conflicts.

---

#### **8. Multi-Booking Calendar by Business Type**
* **Goal:** Allow multiple bookings at the same time for relevant industries.
* **Features:**
    * **Configurable concurrency limits** per tenant or job type.
    * **Visual indicator** when slots are full.

---

#### **9. Social Media & Digital Ads Integration with AI**
* **Goal:** Provide in-platform social media marketing and advertising automation.
* **Features:**
    * Direct **API integration** with Facebook, Instagram, TikTok, LinkedIn.
    * **Google Ads integration** for paid search/display.
    * **AI-generated ad copy and creative suggestions.**
    * Scheduling and posting from platform.
    * Basic performance reporting.

---

#### **10. Photo-to-Accounting & Tax Sync**
* **Goal:** Simplify expense and mileage tracking with phone photo sync.
* **Features:**
    * Mobile **photo capture** uploads directly to platform.
    * **AI categorisation** (e.g., receipt, mileage, asset).
    * Sync to Xero/QuickBooks/MYOB with correct category.
    * Special mode for odometer photos (logs mileage automatically).

---

### **Phase 2 – Expansion Scope**

---

#### **1. Advanced Analytics & BI Dashboards**
* **Goal:** Deliver deep operational and financial insights to help franchise businesses optimise performance.
* **Features:**
    * **Predictive analytics** for sales, staffing, and cash flow.
    * **AI-powered profitability analysis** by client, service, and staff.
    * **Customer churn prediction** with recommended retention actions.
    * **Cross-tenant benchmarking** (if opted in).
    * **Custom KPI creation** by tenant.
* **Configuration:**
    * Dashboard layouts per tenant.
    * Opt-in for anonymised benchmarking.
* **Data model impact:**
    * Historical and aggregated data warehouse.
* **UI impact:**
    * Interactive Power BI/embedded charts.
    * Drill-down to source transactions.

---

#### **2. AI Job Scheduling & Workforce Optimisation**
* **Goal:** Automatically assign jobs and staff based on skills, availability, location, and profitability.
* **Features:**
    * **AI-based shift and job assignment engine.**
    * Optimises travel, skills, and job duration.
    * Learns from historical performance and staff preferences.
    * Suggests cost-efficient resource allocation.
* **Configuration:**
    * Weighting for cost vs time vs customer priority.
* **Data model impact:**
    * Store staff skill profiles and cost rates.
* **UI impact:**
    * Suggested schedule view with one-click acceptance.
    * Conflict and cost saving indicators.

---

#### **3. Integrated Supplier & Inventory Management**
* **Goal:** Track supplier relationships, orders, and stock levels inside the platform.
* **Features:**
    * **Purchase order generation** and approvals.
    * **Supplier database** with performance ratings.
    * **Stock level tracking** with low-stock alerts.
    * Integration with suppliers for real-time stock/pricing where available.
* **Configuration:**
    * Min/max stock levels per item.
    * Preferred supplier per item.
* **UI impact:**
    * Inventory dashboard and reorder panel.

---

#### **4. Client Self-Service Portal Enhancements**
* **Goal:** Give clients greater control and convenience.
* **Features:**
    * Client ability to **reschedule/cancel bookings** within rules.
    * View invoices, quotes, job progress, and files.
    * **Chat interface** linked to Communication Hub.
    * Track loyalty points or credits (if enabled).

---

#### **5. AI Document & Contract Automation**
* **Goal:** Reduce admin work by auto-generating and managing contracts, compliance docs, and forms.
* **Features:**
    * Templates with dynamic fields populated from CRM/job data.
    * **E-signature integration.**
    * Document expiry tracking and renewal reminders.

---

#### **6. White-Label Marketplace & Partner Portal**
* **Goal:** Enable franchises to sell complementary products/services to clients within the portal.
* **Features:**
    * Tenant-specific online store linked to jobs/invoices.
    * Cross-sell partner services.
    * Commission tracking for partner sales.

---

#### **7. Franchise Compliance & Audit Toolkit**
* **Goal:** Support franchisors in enforcing standards across the network.
* **Features:**
    * **Scheduled compliance audits** with checklists.
    * Photo/video evidence capture.
    * Scoring and automated reporting to franchisor.

---

#### **8. Industry Pack Customisation Framework**
* **Goal:** Quickly adapt platform for different industries (moat-building).
* **Features:**
    * **Configurable workflows, fields, and forms** per industry pack.
    * Industry-specific templates for quotes, jobs, and compliance.
    * Optional modules enabled per tenant.

---

#### **9. Loyalty, Referrals, & Customer Engagement Automation**
* **Goal:** Help franchises drive repeat business and referrals.
* **Features:**
    * **Automated reward programs.**
    * **AI-driven referral prompts** at peak satisfaction times.
    * **Gamified client engagement** (optional).

---

#### **10. AI Business Advisor Module**
* **Goal:** Act as a “virtual franchise coach” giving tailored advice.
* **Features:**
    * Analyse business data to surface growth opportunities.
    * Suggest marketing campaigns and operational improvements.
    * Explain recommendations in plain language.
    * Integrate with Communication Hub to launch campaigns directly.