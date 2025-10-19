# Tenant Closure/Deactivation Feature Implementation

## Overview
Implement a tenant closure feature allowing users to deactivate their accounts when they no longer wish to continue using the service.

## 1. UI Implementation

### Location
Add to the tenant edit screen (`tenant_edit_screen.html`) in a new section called "Account Management" or "Danger Zone" at the bottom of the form, before the footer.

### UI Components
```html
<!-- Account Management Section -->
<div class="form-section danger-zone">
    <h2 class="section-title">Account Management</h2>
    <div class="account-status">
        <div class="status-indicator active">
            <span class="status-text">Account Status: Active</span>
        </div>
    </div>
    
    <div class="danger-actions">
        <div class="action-card">
            <h3>Close Account</h3>
            <p>Once you close your account, you will lose access to all services and data.</p>
            <button class="btn btn-danger" onclick="initiateAccountClosure()">Close Account</button>
        </div>
    </div>
</div>
```

### CSS Styling
```css
.danger-zone {
    border: 2px solid #dc3545;
    border-radius: 8px;
    background: #fff5f5;
}

.status-indicator {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
}

.status-indicator.active {
    background: #d4edda;
    color: #155724;
}

.status-indicator.closed {
    background: #f8d7da;
    color: #721c24;
}

.danger-actions {
    margin-top: 20px;
}

.action-card {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
}

.action-card h3 {
    color: #dc3545;
    margin-bottom: 10px;
}

.btn-danger {
    background: #dc3545;
    color: white;
    border: none;
}

.btn-danger:hover {
    background: #c82333;
}
```

## 2. Closure Workflow

### Step 1: Initial Confirmation
```javascript
function initiateAccountClosure() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Close Account</h2>
            <p>Are you sure you want to close your account? This action cannot be undone.</p>
            <div class="closure-reasons">
                <label>Please tell us why you're closing your account:</label>
                <select id="closureReason">
                    <option value="">Select a reason</option>
                    <option value="cost">Too expensive</option>
                    <option value="features">Missing features</option>
                    <option value="competitor">Switching to competitor</option>
                    <option value="business_closed">Business closed</option>
                    <option value="temporary">Temporary suspension</option>
                    <option value="other">Other</option>
                </select>
                <textarea id="closureComments" placeholder="Additional comments..."></textarea>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-danger" onclick="confirmClosure()">Close Account</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
```

### Step 2: Final Confirmation
```javascript
function confirmClosure() {
    const reason = document.getElementById('closureReason').value;
    const comments = document.getElementById('closureComments').value;
    
    if (!reason) {
        alert('Please select a reason for closing your account.');
        return;
    }
    
    // Final confirmation
    if (confirm('This will permanently close your account. All data will be retained but access will be disabled. Are you absolutely sure?')) {
        closeAccount(reason, comments);
    }
}
```

### Step 3: Account Closure
```javascript
function closeAccount(reason, comments) {
    const closureData = {
        tenantId: getCurrentTenantId(),
        closureReason: reason,
        closureComments: comments,
        closureDate: new Date().toISOString(),
        status: 'closed'
    };
    
    // API call to close account
    fetch('/api/tenants/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(closureData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account closed successfully. You will be logged out.');
            // Redirect to logout or closed account page
            window.location.href = '/account-closed';
        } else {
            alert('Error closing account: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error closing account. Please try again.');
    });
}
```

## 3. Backend Considerations

### Database Schema Changes
```sql
-- Add to tenants table
ALTER TABLE tenants ADD COLUMN status ENUM('active', 'suspended', 'closed') DEFAULT 'active';
ALTER TABLE tenants ADD COLUMN closure_reason VARCHAR(255);
ALTER TABLE tenants ADD COLUMN closure_comments TEXT;
ALTER TABLE tenants ADD COLUMN closure_date DATETIME;
ALTER TABLE tenants ADD COLUMN closed_by VARCHAR(255);
```

### API Endpoints
- `POST /api/tenants/{id}/close` - Close tenant account
- `POST /api/tenants/{id}/reactivate` - Reactivate closed account (admin only)
- `GET /api/tenants/{id}/status` - Get tenant status

### Access Control
- Closed tenants cannot log in
- Closed tenants cannot access any features
- Admin can view closed tenant data but not modify
- Billing stops automatically for closed tenants

## 4. Data Retention Policy

### What to Keep
- All historical data (sales, customers, transactions)
- Account creation and closure metadata
- Legal documents and contracts

### What to Disable
- User access and authentication
- API access
- Billing and payments
- Email notifications

### Data Archival
- Move closed tenant data to archive tables after 30 days
- Compress old data for storage efficiency
- Maintain audit trail for compliance

## 5. User Communication

### Email Notifications
- Immediate confirmation of closure
- 7-day grace period email with reactivation option
- Final closure confirmation after grace period
- Data retention policy reminder

### Grace Period
- 7-30 day grace period where account can be reactivated
- Clear reactivation instructions
- Support contact information

## 6. Admin Features

### Closure Management
- View all closed tenants
- Filter by closure reason
- Export closure reports
- Manual reactivation capability

### Analytics
- Track closure reasons
- Monitor closure rates
- Identify patterns for improvement

## 7. Legal & Compliance

### Data Privacy
- GDPR compliance for data deletion requests
- Clear data retention policies
- User consent for data processing

### Contract Terms
- Update terms of service with closure procedures
- Define data retention periods
- Specify reactivation conditions

## Implementation Priority

1. **Phase 1**: Basic closure UI and backend logic
2. **Phase 2**: Grace period and reactivation
3. **Phase 3**: Admin management tools
4. **Phase 4**: Advanced analytics and reporting

Would you like me to implement any specific part of this closure feature?