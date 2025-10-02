# Franchisor Create Screen Design - Super Admin

## Overview
This screen allows Super Admins to create new Franchisor instances (tenants) in the system. Each Franchisor represents a brand owner who can manage multiple franchise locations.

## Screen Layout

### Header Section
```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to Tenant Management    Create New Franchisor    [Save] │
└─────────────────────────────────────────────────────────────────┘
```

### Main Content Area

#### 1. Basic Information Section
```
┌─ Basic Information ─────────────────────────────────────────────┐
│                                                                 │
│ Franchisor Name *        [________________________]            │
│ Business Registration #   [________________________]            │
│ Industry Category        [Dropdown: Food & Beverage ▼]        │
│ Business Type            [Dropdown: Restaurant ▼]              │
│                                                                 │
│ Description              [________________________]            │
│                         [________________________]            │
│                         [________________________]            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 2. Contact Information Section
```
┌─ Contact Information ───────────────────────────────────────────┐
│                                                                 │
│ Primary Contact Name *   [________________________]            │
│ Email Address *          [________________________]            │
│ Phone Number *           [________________________]            │
│ Mobile Number            [________________________]            │
│                                                                 │
│ Website URL              [________________________]            │
│ LinkedIn Profile         [________________________]            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 3. Address Information Section
```
┌─ Address Information ───────────────────────────────────────────┐
│                                                                 │
│ Street Address *         [________________________]            │
│ City *                   [________________________]            │
│ State/Province *         [________________________]            │
│ Postal Code *            [________________________]            │
│ Country *                [Dropdown: United States ▼]          │
│                                                                 │
│ [ ] Same as billing address                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 4. Billing Information Section
```
┌─ Billing Information ───────────────────────────────────────────┐
│                                                                 │
│ Billing Contact Name     [________________________]            │
│ Billing Email            [________________________]            │
│ Billing Phone            [________________________]            │
│                                                                 │
│ Billing Address          [________________________]            │
│                         [________________________]            │
│ City                     [________________________]            │
│ State/Province           [________________________]            │
│ Postal Code              [________________________]            │
│ Country                  [Dropdown: United States ▼]          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 5. System Configuration Section
```
┌─ System Configuration ──────────────────────────────────────────┐
│                                                                 │
│ Tenant Subdomain *       [________________________] .franchise.com │
│                         [Check Availability]                   │
│                                                                 │
│ Default Language         [Dropdown: English ▼]                 │
│ Time Zone *              [Dropdown: UTC-8 (PST) ▼]             │
│ Currency *               [Dropdown: USD ($) ▼]                 │
│                                                                 │
│ Subscription Plan        [Dropdown: Professional ▼]            │
│ Max Franchise Locations  [________________________]            │
│ Max Staff Members        [________________________]            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 6. Branding & Customization Section
```
┌─ Branding & Customization ──────────────────────────────────────┐
│                                                                 │
│ Logo Upload              [Choose File] [Preview]               │
│                         [Recommended: 200x200px, PNG/JPG]     │
│                                                                 │
│ Primary Brand Color      [Color Picker: #FF6B35]               │
│ Secondary Brand Color    [Color Picker: #004E89]               │
│                                                                 │
│ Brand Tagline            [________________________]            │
│                         [________________________]            │
│                                                                 │
│ [ ] Enable custom domain (advanced)                            │
│ Custom Domain            [________________________]            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 7. Initial Admin User Section
```
┌─ Initial Admin User ────────────────────────────────────────────┐
│                                                                 │
│ Admin First Name *       [________________________]            │
│ Admin Last Name *        [________________________]            │
│ Admin Email *            [________________________]            │
│ Admin Phone *            [________________________]            │
│                                                                 │
│ [ ] Send welcome email with login credentials                  │
│ [ ] Require password change on first login                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 8. Terms & Conditions Section
```
┌─ Terms & Conditions ────────────────────────────────────────────┐
│                                                                 │
│ [ ] I agree to the Terms of Service                            │
│ [ ] I agree to the Privacy Policy                              │
│ [ ] I confirm that all information provided is accurate        │
│                                                                 │
│ Service Agreement              [View] [Download]               │
│ Data Processing Agreement      [View] [Download]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Form Validation Rules

### Required Fields
- Franchisor Name
- Primary Contact Name
- Email Address
- Phone Number
- Street Address
- City, State/Province, Postal Code, Country
- Tenant Subdomain
- Time Zone
- Currency
- Admin First Name, Last Name, Email, Phone

### Validation Rules
- **Email**: Valid email format, unique across system
- **Phone**: Valid phone number format
- **Subdomain**: 3-20 characters, alphanumeric and hyphens only, unique
- **Business Registration**: Valid format based on country
- **Postal Code**: Valid format based on country
- **Website URL**: Valid URL format
- **Logo**: Max 5MB, PNG/JPG only
- **Max Locations/Staff**: Positive integers

## Action Buttons

### Primary Actions
- **Save & Create**: Creates the franchisor and redirects to tenant management
- **Save as Draft**: Saves incomplete form for later completion
- **Preview**: Shows how the franchisor's site will look

### Secondary Actions
- **Cancel**: Returns to tenant management without saving
- **Reset Form**: Clears all fields
- **Import from Template**: Load from existing franchisor template

## Success States

### After Successful Creation
```
┌─ Franchisor Created Successfully ──────────────────────────────┐
│                                                                 │
│ ✅ Franchisor "Starbucks Vietnam" has been created             │
│                                                                 │
│ Tenant URL: https://starbucks-vn.franchise.com                 │
│ Admin Login: admin@starbucks-vn.franchise.com                  │
│                                                                 │
│ [View Franchisor Dashboard] [Send Welcome Email] [Create Another] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Error Handling

### Common Error Messages
- "Subdomain already exists. Please choose a different one."
- "Email address is already registered in the system."
- "Invalid business registration number format."
- "Logo file is too large. Maximum size is 5MB."
- "Please fill in all required fields."

### Field-Level Validation
- Real-time validation as user types
- Clear error indicators next to invalid fields
- Helpful suggestions for corrections

## Responsive Design Considerations

### Mobile Layout
- Single column layout
- Collapsible sections
- Touch-friendly form controls
- Swipe navigation between sections

### Tablet Layout
- Two-column layout for related fields
- Larger touch targets
- Optimized for landscape orientation

## Integration Points

### External Services
- **Address Validation**: Google Maps API for address verification
- **Email Verification**: Send verification email to admin
- **Subdomain Check**: Real-time availability checking
- **Logo Processing**: Image optimization and resizing

### Internal Systems
- **User Management**: Create initial admin user
- **Tenant Database**: Set up new tenant schema
- **Branding System**: Apply custom branding
- **Subscription Management**: Set up billing and limits

## Security Considerations

### Data Protection
- All form data encrypted in transit
- Sensitive information masked in logs
- Secure file upload handling
- Input sanitization and validation

### Access Control
- Super Admin authentication required
- Session timeout handling
- Audit logging for all actions
- IP whitelisting (optional)

## Technical Implementation Notes

### Form State Management
- Auto-save draft every 30 seconds
- Browser back/forward support
- Form validation on blur events
- Progress indicator for multi-step process

### Performance Optimizations
- Lazy loading of country/state data
- Debounced subdomain availability checking
- Image compression before upload
- Cached validation rules

### Accessibility Features
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus management for dynamic content

## Future Enhancements

### Phase 2 Features
- Bulk franchisor import from CSV
- Franchisor templates and presets
- Advanced branding customization
- Integration with external CRM systems
- Automated compliance checking

### Phase 3 Features
- AI-powered form completion
- Video onboarding walkthrough
- Advanced analytics and reporting
- Multi-language support
- Custom field configuration
