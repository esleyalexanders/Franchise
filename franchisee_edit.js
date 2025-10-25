// franchisee_edit.js — edit page for the prototype
(function(){
    const STORAGE_KEY = 'franchisees_v1';
    const form = document.getElementById('editForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const errEl = document.getElementById('editError');

    function load(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e){ return []; } }
    function save(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

    function getQueryParam(name){
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    const id = getQueryParam('tenantId') || getQueryParam('id');
    if (!id) {
        alert('No franchisee id provided');
        window.location.href = 'Franchisor_Home_New.html';
    }

    const BASE_DOMAIN = (document.body && document.body.dataset && document.body.dataset.baseDomain) ? document.body.dataset.baseDomain : (window.location.host || 'acme.datax.com');

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

    // populate
    const items = load();
    const item = items.find(i => i.id === id);
    if (!item) {
        alert('Franchisee not found');
        window.location.href = 'Franchisor_Home_New.html';
    }

    // fill fields
    document.getElementById('name').value = item.name || '';
    document.getElementById('unitCode').value = item.unitCode || '';
    document.getElementById('contactName').value = item.contactName || '';
    document.getElementById('contactEmail').value = item.contactEmail || '';
    document.getElementById('phone').value = item.phone || '';
    document.getElementById('street').value = (item.address && item.address.street) || '';
    document.getElementById('city').value = (item.address && item.address.city) || '';
    document.getElementById('state').value = (item.address && item.address.state) || '';
    document.getElementById('postalCode').value = (item.address && item.address.postalCode) || '';
    document.getElementById('country').value = (item.address && item.address.country) || '';
    document.getElementById('notes').value = item.notes || '';
    updatePreview();

    function validateUnitUnique(unitCode){
        if (!unitCode) return true;
        const items = load();
        const found = items.find(i => i.unitCode === unitCode && i.id !== id);
        return !found;
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        errEl.classList.add('hidden');
        const name = document.getElementById('name').value.trim();
        const unitCode = document.getElementById('unitCode').value.trim().toLowerCase();
        const contactName = document.getElementById('contactName').value.trim();
        const contactEmail = document.getElementById('contactEmail').value.trim();
    const phone = (document.getElementById('phone')||{}).value.trim();
    const street = (document.getElementById('street')||{}).value.trim();
    const city = (document.getElementById('city')||{}).value.trim();
    const state = (document.getElementById('state')||{}).value.trim();
    const postalCode = (document.getElementById('postalCode')||{}).value.trim();
    const country = (document.getElementById('country')||{}).value.trim();
    const notes = document.getElementById('notes').value.trim();

        if (!name || !unitCode || !contactEmail) {
            errEl.textContent = 'Please fill required fields: Name, Unit Code, Contact Email.';
            errEl.classList.remove('hidden');
            return;
        }
        if (!/^[a-z0-9-]{2,30}$/.test(unitCode)) {
            errEl.textContent = 'Unit code must be 2-30 chars using lowercase letters, numbers, or hyphens.';
            errEl.classList.remove('hidden');
            return;
        }
        if (!validateUnitUnique(unitCode)) {
            errEl.textContent = 'Unit code already in use. Choose another.';
            errEl.classList.remove('hidden');
            return;
        }

        const items = load();
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1) {
            alert('Franchisee not found');
            window.location.href = 'Franchisor_Home_New.html';
            return;
        }

    const tenantUrl = BASE_DOMAIN.replace(/\/+$/,'') + '/' + unitCode;
    const address = { street, city, state, postalCode, country };
    items[idx] = Object.assign(items[idx], { name, unitCode, contactName, contactEmail, phone, address, notes, tenantUrl, updatedAt: new Date().toISOString() });
        save(items);
        alert('Franchisee updated (prototype)');
        window.location.href = 'Franchisor_Home_New.html';
    });

    cancelBtn.addEventListener('click', function(){ window.location.href = 'Franchisor_Home_New.html'; });
})();