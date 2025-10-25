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

        if (!name || !unitCode || !contactEmail) {
            errEl.textContent = 'Please fill required fields: Name, Unit Code, Contact Email.';
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
    const tenantUrl = BASE_DOMAIN.replace(/\/+$/,'') + '/' + unitCode;
    const address = { street, city, state, postalCode, country };
    const item = { id, name, unitCode, contactName, contactEmail, address, status, phone, notes, tenantUrl, invitedAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        items.push(item);
        save(items);

        // Simulate sending invite
        alert('Franchisee created and invite sent (prototype)');

        // Redirect back to Franchisor home
        window.location.href = 'Franchisor_Home_New.html';
    });

    cancelBtn.addEventListener('click', function(){ window.location.href = 'Franchisor_Home_New.html'; });
    
    // live preview of tenant URL based on derived base domain + unitCode
    const unitInput = document.getElementById('unitCode');
    const prefixEl = document.getElementById('urlPrefix');
    const previewText = document.getElementById('tenantUrlPreviewText');
    function updatePreview(){
        const base = BASE_DOMAIN;
        const unit = (unitInput && unitInput.value) ? unitInput.value.trim().toLowerCase() : '';
        const url = base.replace(/\/+$/,'') + (unit ? ('/' + unit) : '');
        if (prefixEl) prefixEl.textContent = base.replace(/\/+$/,'') + '/';
        if (previewText) previewText.textContent = url;
    }
    if (unitInput) unitInput.addEventListener('input', updatePreview);
    // initialize preview on load
    updatePreview();
})();
