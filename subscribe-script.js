// Subscribe Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Payment method radio buttons
    const paymentRadios = document.querySelectorAll('.payment-radio');
    const creditCardForm = document.getElementById('creditCardForm');
    const digitalWalletForm = document.getElementById('digitalWalletForm');
    const paypalForm = document.getElementById('paypalForm');
    const subscribeBtn = document.querySelector('.subscribe-btn');

    // Handle payment method selection
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Forms are now shown/hidden via CSS :has() selector
            // Just validate the appropriate form
            if (this.id === 'creditCard') {
                validateCreditCardForm();
            } else if (this.id === 'digitalWallet') {
                subscribeBtn.disabled = false;
            } else if (this.id === 'paypal') {
                subscribeBtn.disabled = false;
            }
        });
    });

    // Initialize with credit card selected
    document.getElementById('creditCard').checked = true;
    validateCreditCardForm();

    // Credit card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
        validateCreditCardForm();
    });

    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\//g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + ' / ' + value.slice(2);
        }
        e.target.value = value;
        validateCreditCardForm();
    });

    // CVV input
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
        validateCreditCardForm();
    });

    // Validate credit card form
    function validateCreditCardForm() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const expiry = expiryInput.value.trim();
        const cvv = cvvInput.value.trim();
        const address = document.getElementById('address').value.trim();
        const postal = document.getElementById('postal').value.trim();

        const isValid = firstName && lastName && cardNumber.length >= 13 && 
                       expiry.length >= 7 && cvv.length >= 3 && 
                       address && postal;

        subscribeBtn.disabled = !isValid;
    }

    // Form inputs validation
    const formInputs = document.querySelectorAll('#creditCardForm input, #creditCardForm select');
    formInputs.forEach(input => {
        input.addEventListener('input', validateCreditCardForm);
        input.addEventListener('change', validateCreditCardForm);
    });

    // Modal navigation
    const modalBack = document.querySelector('.modal-back');
    const modalClose = document.querySelector('.modal-close');

    modalBack.addEventListener('click', function() {
        // Go back to previous page
        window.history.back();
    });

    modalClose.addEventListener('click', function() {
        // Close modal or go to home
        window.location.href = 'index.html';
    });

    // Discount button
    const discountBtn = document.querySelector('.discount-btn');
    discountBtn.addEventListener('click', function() {
        showNotification('Discount section expanded', 'info');
    });

    // Google Pay button
    const googlePayBtn = document.querySelector('.google-pay-btn');
    googlePayBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Redirecting to Google Pay...', 'info');
        setTimeout(() => {
            showNotification('Google Pay payment processed successfully!', 'success');
        }, 2000);
    });

    // Apple Pay button
    const applePayBtn = document.querySelector('.apple-pay-btn');
    applePayBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Redirecting to Apple Pay...', 'info');
        setTimeout(() => {
            showNotification('Apple Pay payment processed successfully!', 'success');
        }, 2000);
    });

    // PayPal button
    const paypalBtn = document.querySelector('.paypal-btn');
    if (paypalBtn) {
        paypalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to PayPal...', 'info');
            setTimeout(() => {
                showNotification('PayPal connection established!', 'success');
            }, 2000);
        });
    }

    // Subscribe button
    subscribeBtn.addEventListener('click', function() {
        const selectedPayment = document.querySelector('.payment-radio:checked');
        
        if (selectedPayment.id === 'creditCard') {
            processSubscription('Credit Card');
        } else if (selectedPayment.id === 'digitalWallet') {
            processSubscription('Digital Wallet');
        } else if (selectedPayment.id === 'paypal') {
            processSubscription('PayPal');
        }
    });

    function processSubscription(paymentMethod) {
        // Show loading state
        subscribeBtn.textContent = 'Processing...';
        subscribeBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification(`Subscription successful with ${paymentMethod}!`, 'success');
            subscribeBtn.textContent = 'Subscribed';
            
            // Redirect after success
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
    }

    // CVV help icon
    const cvvHelp = document.querySelector('.cvv-help');
    cvvHelp.addEventListener('click', function() {
        showTooltip(this, 'The 3 or 4 digit security code on the back of your card');
    });

    // Add line button
    const addLineBtn = document.querySelector('.add-line-btn');
    addLineBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create new address line
        const addressGroup = this.closest('.form-group');
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.className = 'form-input';
        newInput.placeholder = 'Address line 2';
        newInput.style.marginTop = '8px';
        
        addressGroup.insertBefore(newInput, this);
        this.style.display = 'none';
    });

    // Country select
    const countrySelect = document.getElementById('country');
    countrySelect.addEventListener('change', function() {
        validateCreditCardForm();
    });

    // Postal code validation
    const postalInput = document.getElementById('postal');
    postalInput.addEventListener('input', function() {
        validateCreditCardForm();
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close-btn">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        minWidth: '300px',
        maxWidth: '400px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transform: 'translateX(500px)',
        transition: 'all 0.3s ease',
        zIndex: '2000'
    });

    const content = notification.querySelector('.notification-content');
    Object.assign(content.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: '1'
    });

    const icon = content.querySelector('i');
    icon.style.fontSize = '18px';

    // Set border and icon color based on type
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #10b981';
        icon.style.color = '#10b981';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid #ef4444';
        icon.style.color = '#ef4444';
    } else if (type === 'warning') {
        notification.style.borderLeft = '4px solid #f59e0b';
        icon.style.color = '#f59e0b';
    } else {
        notification.style.borderLeft = '4px solid #3b82f6';
        icon.style.color = '#3b82f6';
    }

    const closeBtn = notification.querySelector('.notification-close-btn');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: '#6b7280',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '4px',
        transition: 'all 0.2s'
    });

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = '#f3f4f6';
        closeBtn.style.color = '#111827';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = 'transparent';
        closeBtn.style.color = '#6b7280';
    });

    // Add to DOM
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto hide after 3 seconds
    const autoHideTimer = setTimeout(() => {
        hideNotification(notification);
    }, 3000);

    // Close button handler
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoHideTimer);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(500px)';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Tooltip function
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;

    Object.assign(tooltip.style, {
        position: 'absolute',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        maxWidth: '200px',
        zIndex: '1000',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        opacity: '0',
        transition: 'opacity 0.2s'
    });

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.bottom + 8 + 'px';

    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.remove();
        }, 200);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close
    if (e.key === 'Escape') {
        window.location.href = 'index.html';
    }
});

// Prevent form submission on enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
    }
});
