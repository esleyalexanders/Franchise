Franchise Fee — Spec
=====================

Purpose
-------
Define how franchisors charge franchisees a franchise fee (one-time onboarding fee, recurring fees, or other charges). This spec covers fee types, billing models, data model, API endpoints, UI flows (franchisor and franchisee), notifications, failure handling, reporting, and a minimal prototype approach.

Goals
-----
- Allow franchisors to require and collect franchise fees from their franchisees.
- Support common billing models: one-time franchise fee, recurring royalty/management fee, and optional ad-hoc charges (e.g., equipment or training).
- Provide clear UI for franchisors to configure fees and for franchisees to view/pay invoices.
- Provide server-side APIs to create charges, generate invoices, process payments, and send notifications.
- Handle failed payments, refunds, and audit logging.

Terminology
-----------
- Franchisor: parent tenant who creates and manages franchisee tenants.
- Franchisee: child tenant that may owe fees to the franchisor.
- Franchise Fee: any charge the franchisor levies on a franchisee. This can be:
  - One-time franchise onboarding fee
  - Recurring fee (monthly/quarterly/annual) — royalty, management fee
  - Ad-hoc charges (training, equipment)
- Billing Account: payment method and billing contact for a franchisee.
- Invoice: billing document with line items, total, due date, and status.
- Transaction: attempt to charge a payment method (success/fail), with external gateway reference.

High-level flows
----------------
1. Franchisor configures fee model(s) in the Franchisor UI (set amounts, frequency, due dates, and optional automated collection).
2. On franchisee creation (or when franchisor chooses), the system can optionally generate an initial invoice for the one-time franchise fee.
3. If automated collection is enabled, attempt to charge the franchisee's stored payment method when an invoice is due. Otherwise, email invoice to franchisee for manual payment.
4. On successful payment mark invoice PAID, create transaction record, notify both parties, and record revenue.
5. On failed payment, retry policy applies; notify franchisee and franchisor; provide UI to update payment method or mark invoice as paid manually.

Billing models & options
------------------------
- One-time fee: charged at onboarding/creation or when franchisor triggers. Single invoice with due date.
- Recurring fee: fixed amount or percentage-based (e.g., X% of revenue). For prototype implement fixed-amount recurring.
- Ad-hoc charges: franchisor can create a custom invoice for specific items.
- Collection modes:
  - Platform-collected (recommended): the platform holds a payment gateway integration and attempts capture; platform may remit to franchisor outside scope.
  - Manual/External: franchisor bills franchisee off-platform and marks invoices as paid in the system.

Data model (core entities)
--------------------------
- FeeDefinition
  - id
  - franchisorId
  - name (e.g., "Onboarding Fee", "Monthly Royalty")
  - type ("one-time" | "recurring" | "ad-hoc")
  - amount (decimal)
  - currency
  - frequency (for recurring: "monthly" | "quarterly" | "annual")
  - effectiveFrom, effectiveTo
  - active (bool)
  - description

- Invoice
  - id
  - tenantId (franchisee)
  - franchisorId
  - items: [{description, amount, feeDefinitionId?}]
  - subtotal, taxAmount, total
  - currency
  - status ("draft" | "open" | "paid" | "past_due" | "cancelled")
  - issuedAt, dueAt, paidAt
  - invoiceNumber

- Transaction
  - id
  - invoiceId
  - tenantId
  - amount
  - currency
  - status ("succeeded" | "failed" | "pending")
  - gatewayReference
  - createdAt

- BillingAccount
  - tenantId
  - billingContactName
  - billingContactEmail
  - defaultPaymentMethodId
  - paymentMethods: [{id, type, last4, brand, expiresAt}]

- Refund (if needed)
  - id, transactionId, amount, reason, status

Server API endpoints (core)
---------------------------
Note: For prototype these may be mocked; production requires secure server-side endpoints.

- GET /api/franchisors/{franchisorId}/fees
  - List fee definitions

- POST /api/franchisors/{franchisorId}/fees
  - Create/Update fee definitions (admin-only)

- POST /api/franchisors/{franchisorId}/franchisees/{tenantId}/invoices
  - Create an invoice for a franchisee (body includes items or reference to FeeDefinition)
  - Response: invoice object

- GET /api/franchisors/{franchisorId}/franchisees/{tenantId}/invoices
  - List invoices for franchisee

- POST /api/invoices/{invoiceId}/pay
  - Attempt payment capture using stored/default method, or accept payment details in body
  - Returns transaction result

- POST /api/invoices/{invoiceId}/mark-paid
  - Admin/manual: mark invoice as paid (if offline payment)

- GET /api/tenants/{tenantId}/billing-account
  - Retrieve billing account and payment methods

- POST /api/tenants/{tenantId}/payment-methods
  - Add payment method (tokenization flow)

- Webhooks: /webhooks/payment (gateway notification for asynchronous events)

Rules & UX details
------------------
- Franchisor UI: Fee Definitions screen
  - Create a new fee (name, type, amount, frequency, default apply on create toggle)
  - List of franchisees with next due amounts and statuses
  - Bulk actions: generate invoices for a set of franchisees, send reminders, or trigger charges
- Franchisee UI: Billing / Invoices screen
  - View open invoices, due dates, history
  - Add/update payment methods (tokenization flow)
  - Pay invoices manually if platform does not auto-collect
- On franchisee creation: if franchisor has an "onboarding fee" fee definition and "apply on create" checked, system generates an invoice and (optionally) attempts to auto-collect
- Tax: Invoice schema includes taxAmount. For prototype tax calculation can be omitted; production should integrate tax rules per jurisdiction.

Payment & retry policy
----------------------
- Attempt immediate capture when auto-collect enabled.
- On failed capture:
  - Mark transaction failed and invoice status = "past_due".
  - Notify franchisee and franchisor via email.
  - Retry schedule: 1st retry after 24 hours, 2nd retry after 72 hours, final retry after 7 days. (Configurable.)
  - After final failure, mark invoice as "uncollectible" or keep "past_due" and let franchisor decide to deactivate or pursue collection.
- Manual payment: franchisor can mark invoice paid (off-platform) with admin notes.

Notifications
-------------
- Invoice created: send to franchisee billing email and copy to franchisor.
- Payment succeeded: send receipts to franchisee and confirmation to franchisor.
- Payment failed: notify franchisee + franchisor with retry schedule.
- Invoice overdue reminders: configurable schedule (e.g., 7 days before due, 1 day after due, 7 days after due).

Permissions & Security
----------------------
- Only franchisor admins can create fee definitions or trigger bulk invoice creation for their franchisees.
- Franchisee admins can view and pay invoices for their own tenant only.
- All payment operations are server-side and require CSRF-protected endpoints and auth checks.
- Audit logs must record who created invoices, who triggered manual payments, and any changes to fee definitions.

Edge cases & errors
-------------------
- Duplicate invoice prevention: do not auto-generate multiple onboarding invoices for the same fee and franchisee (check existing open invoices for the same feeDefinitionId).
- Currency mismatches: invoices should be issued in franchisee currency, or system should normalize amounts.
- Refunds: support full/partial refunds via linked transactions and record refund transactions.
- Dispute handling: provide status and notes fields on invoices and transactions.

Reporting & Reconciliation
--------------------------
- Franchisor reports: outstanding balances by franchisee, aging buckets (0-30, 31-60, 61+ days), revenue recognized (by period).
- Transaction logs with gateway references for reconciliation with payment provider statements.

Prototype (static) implementation notes
--------------------------------------
- Use the existing localStorage mock key (`franchisees_v1`) for franchisee records.
- Add a small `billing_mock.js` that can:
  - Store FeeDefinition objects in localStorage under `franchise_fees_v1`.
  - Generate invoice objects stored under `invoices_v1`.
  - Simulate payment capture (toggle success/failure) and update invoice/transaction status.
- UI pages to add:
  - `franchisor_fees.html` — manage fee definitions and bulk actions.
  - Extend `Franchisor_Home_New.html` to show next due amounts for each franchisee.
  - `franchisee_billing.html` — tenant view to list and pay invoices.

Acceptance criteria
-------------------
- Franchisor can create fee definitions and see them listed.
- On creating a franchisee (if the onboarding fee is configured), an invoice is generated.
- Franchisee can view their invoices and (in prototype) simulate payment, which marks invoice paid and creates a transaction record.
- Failed payments trigger retries (simulated) and the system updates statuses.

Open questions / decisions for you
---------------------------------
1. Who collects the money in production: the platform (recommended) or the franchisor directly (off-platform)?
   - If platform collects, we must integrate a payment gateway and manage payouts/remittance to franchisors separately.
2. Fee types: do you need percentage-based fees (royalty) in addition to fixed amounts? If yes, how will revenue input be provided (franchisee reports sales)?
3. Currency & tax: should the system support multiple currencies and tax calculations now, or defer to later?
4. Retry/collections policy: are the retry timings above acceptable or should they be different?
5. Do franchisors need auto-deactivation of franchisees after prolonged non-payment, or will that be manual?

Next steps I can take
---------------------
- Implement the prototype mock for fee definitions and invoices (`franchisor_fees.html`, `franchisee_billing.html`, `billing_mock.js`) and wire to existing franchisee records.
- Or, draft API stubs (server-side) and an integration plan for a chosen payment provider (Stripe/PayPal) including webhook handling and remittance.

Pick which next step you'd like and answer the open questions above so I can tailor the implementation accordingly.