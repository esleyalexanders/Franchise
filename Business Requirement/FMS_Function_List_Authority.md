# FMS Function List & Authority - Franchise Management System

## User Roles Authority Legend
- **Super Admin**: Platform administrator with full system access
- **Franchisor**: Business owner managing their franchise operations
- **Single Store Owner**: Business owner managing their single store operations
- **Franchisee/Branch**: An independent business owner who pays to use a brand's model and name or a company-owned and managed location
- **Staff**: Employees working within a franchise
- **Client**: End customers using the system

**Authority Indicators:**
- `TRUE` = Full access to the function
- Empty cell = No access to the function

---

## A. Multi-Tenant, Secure Client Login

**Authority:** All roles have access to this category

### A1. Tenant Management

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| a1-1 | **Tenant Creation and Management** | Create, edit, and allocate new tenant instances through Super Admin console. | TRUE | | | |
| a1-2 | **Tenant Deletion** | Disable or delete tenants with cascade operations to remove all associated data. | TRUE | | | |
| a1-3 | **Tenant Access and Monitoring** | Access tenant systems for configuration checking and customer support operations. | TRUE | | | |

### A2. User Management & Security

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| a2-1 | **Super Admin Authentication** | Super Admin login functionality and profile management with elevated permissions. | TRUE | | | |
| a2-2 | **Roles and Permissions Management** | System-wide user roles and permissions management across all tenants. | TRUE | | | |

### A3. Platform Management

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| a3-1 | **Database Design and Management** | Comprehensive database design including common tables and schema review. | TRUE | | | |

### A4. User Authentication

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| a4-1 | **Email/Password Login** | Users log in to the system using email address and password. Supports 2FA (SMS/Email/App-based). Details: Google/Microsoft SSO integration, role-based access control after login. | | TRUE | TRUE | TRUE |
| a4-2 | **Logout** | Safe logout from system and end session. | | TRUE | TRUE | TRUE |
| a4-3 | **Password Reset** | Password reset procedure when forgotten. Send reset link via email. | | TRUE | TRUE | TRUE |
| a4-4 | **2FA Setup Interface** | Interface for setting up and managing 2FA using authenticator app. | | TRUE | TRUE | TRUE |
| a4-5 | **SSO Login (Google/Microsoft)** | Single sign-on using Google or Microsoft account. Details: 2FA and security rules depend on external provider. | | TRUE | TRUE | TRUE |

### A5. Branding & Display

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| a5-1 | **Tenant Branding Display** | Display logo, colors, and branding information of current tenant. Retrieved dynamically via API. | | TRUE | TRUE | |
| a5-2 | **Branding Configuration Interface** | Tenant admin uploads logo, selects colors, and configures branding. | | TRUE | | |
| a5-3 | **Landing Page Display** | Tenant-specific landing page. Basic setup based on template. | | TRUE | TRUE | |
| a5-4 | **Public Website Display** | Public website. Tenant information and service introduction. | | TRUE | TRUE | TRUE |

---

## B. Sales Management

### B1. Quote Basic Functions

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| b1-1 | **Quote Management** | Creating, reading, updating, deleting quotes with status tracking. | | TRUE | | |
| b1-2 | **Quote Items Management** | Managing quote line items including products, services, pricing, and quantities. | | TRUE | | |
| b1-3 | **Quote Status Tracking Logic** | Automated workflow logic for quote status changes (Draft → Sent → Approved → Rejected). | | TRUE | | |

### B2. Quote Builder & Editor

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| b2-1 | **Quote Builder/Editor Interface** | Intuitive drag-and-drop interface for creating professional quotes with templates. | | TRUE | | |
| b2-2 | **Product/Service Search Component** | Integrated product catalog search with external supplier API integration for pricing. | | TRUE | | |
| b2-3 | **Quote Management Interface** | Dashboard for managing all quotes with filtering, sorting, and bulk operations. | | TRUE | | |

### B3. Quote Sending & Notifications

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| b3-1 | **Send Quote (Email/SMS/WhatsApp)** | Multi-channel quote delivery with formatted email templates and plain text SMS/WhatsApp. | | TRUE | TRUE | |
| b3-2 | **Automatic Reminder Jobs** | Scheduled automated reminders for pending quotes and follow-ups. | | TRUE | TRUE | |

### B4. Quote Assignment & Scheduling

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| b4-1 | **Staff Assignment Interface** | Role-based quote assignment system (Admins assign, Staff view assigned quotes only). | | TRUE | TRUE | |
| b4-2 | **Schedule Lock on Quote Approval** | Automatic calendar blocking when quotes are approved to prevent double-booking. | | TRUE | TRUE | |
| b4-3 | **Calendar Integration Interface** | Interactive calendar showing quotes, appointments, and work schedules with conflict detection. | | TRUE | TRUE | TRUE |

---

## C. Work Operations Management

### C1. Job Management

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| c1-1 | **Job Creation from Approved Quote API** | Automatic job creation and scheduling when quotes are approved by clients. | | TRUE | TRUE | |
| c1-2 | **Work Details and Staff Assignment API** | API for assigning staff to jobs with skill matching and availability checking. | | TRUE | TRUE | |
| c1-3 | **Job Detail Page** | Comprehensive job page with status updates, file attachments, and progress tracking. | | TRUE | TRUE | |
| c1-4 | **Job Check-in/Check-out** | Mobile/web interface for staff to check-in/out of jobs with time tracking (location optional). | | TRUE | TRUE | |

### C2. Timesheet Management

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| c2-1 | **Timesheet Submission API** | API for staff to submit timesheets with automatic calculation of hours and breaks. | | TRUE | TRUE | |
| c2-2 | **Timesheet Submission Screen** | User-friendly interface for entering work hours, breaks, and job details. | | TRUE | TRUE | |
| c2-3 | **Timesheet Approval and Viewing** | Admin interface for approving timesheets and viewing attendance records by staff member. | | TRUE | TRUE | |

---

## D. Finance & Accounting Management

### D1. Payment Gateway

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| d1-1 | **Stripe API Integration** | Secure Stripe integration for credit card processing and direct debit payments. | | TRUE | | |
| d1-2 | **PayPal API Integration** | PayPal gateway integration with fraud protection and buyer/seller protection. | | TRUE | | |
| d1-3 | **Apple Pay/Google Wallet Integration** | Mobile wallet integration for seamless checkout experience. | | TRUE | | |
| d1-4 | **Payment Status Notification Webhook API** | Real-time webhook notifications for payment status updates and failed transactions. | | TRUE | | |

### D2. Payment Management

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| d2-1 | **Affiliate Payment** | Processing affiliate commissions and partner payment calculations. | | TRUE | | |
| d2-2 | **Payment Request Creation Interface** | Interface for creating payment requests with approval workflows and due dates. | | TRUE | | |
| d2-3 | **Payment Gateway Connection Setup Interface** | Wizard for connecting and configuring payment gateways with API key management. | | TRUE | | |
| d2-4 | **Payment Status Tracking Dashboard** | Real-time dashboard showing payment status, transaction history, and reconciliation. | | TRUE | | |

### D3. Accounting Software Integration

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| d3-1 | **Xero Authentication Flow** | OAuth 2.0 authentication and connection setup with Xero accounting software. | | TRUE | | |
| d3-2 | **Xero Sync Logic** | Automated synchronization of invoices, payments, and expenses with Xero. | | TRUE | | |
| d3-3 | **QuickBooks Authentication Flow** | OAuth 2.0 authentication and connection setup with QuickBooks. | | TRUE | | |
| d3-4 | **QuickBooks Sync Logic** | Automated synchronization of financial data with QuickBooks. | | TRUE | | |
| d3-5 | **MYOB Authentication Flow** | OAuth 2.0 authentication and connection setup with MYOB. | | TRUE | | |
| d3-6 | **MYOB Sync Logic** | Automated synchronization of accounting data with MYOB. | | TRUE | | |
| d3-7 | **Accounting Software Connection Wizard** | Step-by-step wizard for connecting and configuring accounting software integrations. | | TRUE | | |

---

## E. Financial Reports

### E1. Report Data Sync

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| e1-1 | **Accounting Software Data Sync** | Sync financial data from connected accounting software including payroll information. | | TRUE | | |
| e1-2 | **Salary Summary Data Retrieval** | Retrieve and calculate salary summaries for payroll reporting. | | TRUE | | |
| e1-3 | **P&L Report Data Retrieval** | Retrieve profit and loss data from accounting software for financial reporting. | | TRUE | | |

### E2. Report Display

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| e2-1 | **Salary Summary Dashboard** | Interactive dashboard displaying salary summaries, overtime, and payroll costs. | | TRUE | | |
| e2-2 | **P&L Summary Interface** | Financial reporting interface showing profit/loss statements and key financial metrics. | | TRUE | | |
| e2-3 | **Payroll Sync Interval Configuration** | Configuration interface for setting payroll data synchronization frequency. | | TRUE | | |

---

## F. Multi-Channel Communication

### F1. Message Sending

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| f1-1 | **Bidirectional Email Message** | Sending and receiving emails with threading and conversation management. | | TRUE | TRUE | TRUE |
| f1-2 | **Bidirectional SMS Message** | Sending and receiving SMS messages with delivery tracking and responses. | | TRUE | TRUE | TRUE |
| f1-3 | **Bidirectional WhatsApp Message** | WhatsApp messaging with rich media support and conversation management. | | TRUE | TRUE | TRUE |
| f1-4 | **Information Reception Setup via Email/SMS/WhatsApp** | Configuration for receiving customer inquiries through multiple communication channels. | | TRUE | | |

### F2. Auto Response & Templates

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| f2-1 | **Quick Response Content Setup** | Setting up quick response templates and canned responses. | | TRUE | | |
| f2-2 | **Recurring Communication Time Setup** | Interface for scheduling recurring communications and automated messaging. | | TRUE | | |
| f2-3 | **Multi-channel Conversation Interface** | Unified interface for managing conversations across email, SMS, and WhatsApp channels. | | TRUE | TRUE | |
| f2-4 | **Recurring/Repeat Communication Logic** | Automated logic for sending recurring messages based on tenant-defined schedules. | | TRUE | | |
| f2-5 | **Simple Auto Response Rules Logic** | Rule-based system for automatic responses to common customer inquiries. | | TRUE | | |
| f2-6 | **Auto Rules Creation Interface** | Interface for creating and managing automated response rules using templates. | | TRUE | | |
| f2-7 | **Quick Response Template UI** | User interface for selecting and sending quick response templates. | | TRUE | | |
| f2-8 | **Fast Quote Management in Chat Interface** | Integrated quote management within chat interface for quick quote creation and updates. | | TRUE | | |

---

## G. Expanded Calendar Functions

### G1. Concurrent Booking Limits

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| g1-1 | **Concurrent Booking Limit Configuration** | Configure maximum number of simultaneous bookings per time slot or job type. | | TRUE | | |
| g1-2 | **Schedule Check Logic Update** | Updated scheduling logic to enforce concurrent booking limits and prevent overbooking. | | TRUE | | |
| g1-3 | **Visual Indicator for Full Time Slots** | Visual indicators on calendar showing when time slots reach booking capacity. | | TRUE | | |


---

## K. Cost Automation

### K1. AI & OCR Processing

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| k1-1 | **Image Upload** | Uploading receipt and vehicle meter images from mobile devices and web interface. | | TRUE | TRUE | TRUE |
| k1-2 | **OCR Service Integration** | Third-party OCR service integration using OpenAI GPT for text extraction from images. | | TRUE | | |
| k1-3 | **Cost Classification Logic** | AI-powered logic for automatically categorizing expenses and reading odometer values. | | TRUE | | |
| k1-4 | **Invoice/Odometer Data Edit** | Reviewing and manually correcting AI-extracted invoice and mileage data. | | TRUE | TRUE | |

### K2. Data Sync & Management

| Code | Function | Description | Authority |
|------|----------|-------------|-----------|
| | | | **Super Admin** | **Franchise Owner** | **Staff** | **Client** |
| k2-1 | **Cost Sync with Accounting Software** | Automated synchronization of classified costs with connected accounting systems. | | TRUE | | |
| k2-2 | **Image Review and Approval Interface** | User interface for reviewing AI-processed images and approving data before accounting sync. | | TRUE | TRUE | |
| k2-3 | **Cost Management Dashboard** | Dashboard for managing expense categories, approval workflows, and accounting integration. | | TRUE | | |

---

## Authority Summary by Role

### Super Admin
- **Full Access**: All tenant management, platform management, and system administration functions
- **Limited Access**: Some advanced features marked with ◉ (pending confirmation)
- **Total Functions**: 8 functions with full access, 6 functions with limited access

### Franchise Owner
- **Full Access**: All business operations including quotes, jobs, payments, and financial reports
- **Limited Access**: Some advanced features like Google Maps integration and social media
- **Total Functions**: 45+ functions with full access, 8 functions with limited access

### Staff
- **Full Access**: Job management, timesheet submission, communication, and basic operations
- **Limited Access**: Some administrative functions and advanced features
- **Total Functions**: 25+ functions with full access

### Client
- **Full Access**: Authentication, public website, calendar viewing, and communication
- **Limited Access**: Basic system interaction and booking functions
- **Total Functions**: 10+ functions with full access
