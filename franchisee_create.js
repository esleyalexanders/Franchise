// franchisee_create.js — create page for the prototype
(function(){
    const STORAGE_KEY = 'franchisees_v1';
    const form = document.getElementById('createForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const errEl = document.getElementById('createError');

    function load(){
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e){ return []; }
    }
    function save(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
    function generateId(){ return 'f_' + Math.random().toString(36).slice(2,9); }

    function validateUnitUnique(unitCode){
        if (!unitCode) return true;
        const items = load();
        return !items.find(i => i.unitCode === unitCode);
    }

    // Base domain is derived from body[data-base-domain] if present, otherwise from the current host.
    const BASE_DOMAIN = (document.body && document.body.dataset && document.body.dataset.baseDomain) ? document.body.dataset.baseDomain : (window.location.host || 'acme.datax.com');

    form.addEventListener('submit', function(e){
        e.preventDefault();
        errEl.classList.add('hidden');
        const name = document.getElementById('name').value.trim();
        const countryCode = (document.getElementById('countryCode') || {}).value || 'au';
        const unitCode = document.getElementById('unitCode').value.trim().toLowerCase();
    const contactName = document.getElementById('contactName').value.trim();
    const contactEmail = document.getElementById('contactEmail').value.trim();
    const street = (document.getElementById('street')||{}).value.trim();
    const city = (document.getElementById('city')||{}).value.trim();
    const state = (document.getElementById('state')||{}).value.trim();
    const postalCode = (document.getElementById('postalCode')||{}).value.trim();
    const country = (document.getElementById('country')||{}).value.trim();
    // Status is set by the system on create
    const status = 'invited';
    const phone = (document.getElementById('phone')||{}).value.trim();
    const notes = document.getElementById('notes').value.trim();
    const franchiseeAddress = (document.getElementById('franchiseeAddress')||{}).value.trim();
    const homeAddress = (document.getElementById('homeAddress')||{}).value.trim();
    const postalAddress = (document.getElementById('postalAddress')||{}).value.trim();
    const ownerPhone = (document.getElementById('ownerPhone')||{}).value.trim();
    const secondaryContactName = (document.getElementById('secondaryContactName')||{}).value.trim();
    const relationshipToOwner = (document.getElementById('relationshipToOwner')||{}).value.trim();
    const secondaryContactEmail = (document.getElementById('secondaryContactEmail')||{}).value.trim();
    const secondaryContactPhone = (document.getElementById('secondaryContactPhone')||{}).value.trim();
    const contractStartDate = (document.getElementById('contractStartDate')||{}).value.trim();
    const contractEndDate = (document.getElementById('contractEndDate')||{}).value.trim();

        if (!name || !unitCode || !contactEmail || !contactName || !franchiseeAddress || !phone) {
            errEl.textContent = 'Please fill required fields: Franchisee Name, Country Code, Unit Code, Franchisee Address, Phone Number, Owner Name, Owner Email.';
            errEl.classList.remove('hidden');
            return;
        }
        // Conditional validation: If secondary contact name is provided, relationship is required
        if (secondaryContactName && !relationshipToOwner) {
            errEl.textContent = 'Relationship to Owner is required when Secondary Contact Name is provided.';
            errEl.classList.remove('hidden');
            return;
        }
        // Validation: Contract end date must be after start date if both are provided
        if (contractStartDate && contractEndDate && contractStartDate > contractEndDate) {
            errEl.textContent = 'Contract End Date must be after Contract Start Date.';
            errEl.classList.remove('hidden');
            return;
        }
        if (!/^[a-z0-9-]{2,30}$/.test(unitCode)){
            errEl.textContent = 'Unit code must be 2-30 chars using lowercase letters, numbers, or hyphens.';
            errEl.classList.remove('hidden');
            return;
        }
        if (!validateUnitUnique(unitCode)){
            errEl.textContent = 'Unit code already in use. Choose another.';
            errEl.classList.remove('hidden');
            return;
        }

        const items = load();
        const id = generateId();
    const tenantUrl = BASE_DOMAIN.replace(/\/+$/,'') + '/' + countryCode + '/' + unitCode;
    const address = { street, city, state, postalCode, country };
    const item = { id, name, unitCode, countryCode, contactName, contactEmail, ownerPhone, address, franchiseeAddress, homeAddress, postalAddress, secondaryContactName, secondaryContactEmail, secondaryContactPhone, relationshipToOwner, contractStartDate, contractEndDate, status, phone, notes, tenantUrl, invitedAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        items.push(item);
        save(items);

        // Simulate sending invite
        alert('Franchisee created and invite sent (prototype)');

        // Redirect back to Franchisor home
        window.location.href = 'Franchisor_Home_New.html';
    });

    cancelBtn.addEventListener('click', function(){ window.location.href = 'Franchisor_Home_New.html'; });
    
    // live preview of tenant URL based on derived base domain + countryCode + unitCode
    const unitInput = document.getElementById('unitCode');
    const countryCodeSelect = document.getElementById('countryCode');
    const prefixEl = document.getElementById('urlPrefix');
    const previewText = document.getElementById('tenantUrlPreviewText');
    function updatePreview(){
        const base = BASE_DOMAIN;
        const countryCode = (countryCodeSelect && countryCodeSelect.value) ? countryCodeSelect.value.toLowerCase() : 'au';
        const unit = (unitInput && unitInput.value) ? unitInput.value.trim().toLowerCase() : '';
        const url = base.replace(/\/+$/,'') + '/' + countryCode + (unit ? ('/' + unit) : '');
        if (prefixEl) prefixEl.textContent = base.replace(/\/+$/,'') + '/' + countryCode + '/';
        if (previewText) previewText.textContent = url;
    }
    if (unitInput) unitInput.addEventListener('input', updatePreview);
    if (countryCodeSelect) countryCodeSelect.addEventListener('change', updatePreview);
    // initialize preview on load
    updatePreview();

    // Conditional validation for Relationship to Owner field
    const secondaryContactInput = document.getElementById('secondaryContactName');
    const relationshipSelect = document.getElementById('relationshipToOwner');
    const relationshipRequiredIndicator = document.getElementById('relationshipRequiredIndicator');
    
    function updateRelationshipRequirement(){
        const hasSecondaryContact = secondaryContactInput && secondaryContactInput.value.trim().length > 0;
        if (relationshipRequiredIndicator) {
            if (hasSecondaryContact) {
                relationshipRequiredIndicator.classList.remove('hidden');
                if (relationshipSelect) relationshipSelect.setAttribute('required', 'required');
            } else {
                relationshipRequiredIndicator.classList.add('hidden');
                if (relationshipSelect) relationshipSelect.removeAttribute('required');
            }
        }
    }
    
    if (secondaryContactInput) {
        secondaryContactInput.addEventListener('input', updateRelationshipRequirement);
    }
    // initialize on load
    updateRelationshipRequirement();
})();
