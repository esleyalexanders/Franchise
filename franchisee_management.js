// franchisee_management.js — simple localStorage-backed mock for prototype
(function(){
    const STORAGE_KEY = 'franchisees_v1';

    // Elements
    const listContainer = document.getElementById('listContainer');
    const createBtn = document.getElementById('createBtn');
    const modal = document.getElementById('franchiseeModal');
    const cancelModal = document.getElementById('cancelModal');
    const form = document.getElementById('franchiseeForm');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const modalTitle = document.getElementById('modalTitle');
    const formError = document.getElementById('formError');

    let editingId = null;

    function load() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        try { return JSON.parse(raw); } catch(e) { return []; }
    }

    function save(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function generateId() {
        return 'f_' + Math.random().toString(36).slice(2,9);
    }

    function render() {
        const items = load();
        const filter = statusFilter.value;
        const q = (searchInput.value || '').toLowerCase().trim();

        listContainer.innerHTML = '';

        if (items.length === 0) {
            listContainer.innerHTML = '<div class="empty">No franchisees yet. Click Create Franchisee to add one.</div>';
            return;
        }

        // header row
        const header = document.createElement('div');
        header.className = 'row header';
    header.innerHTML = '<div class="col">Name</div><div class="col">Unit</div><div class="col">Owner</div><div class="col">City</div><div class="col">Status</div><div class="col">Actions</div>';
        listContainer.appendChild(header);

        items.filter(i => filter === 'all' ? true : i.status === filter)
             .filter(i => {
                 if (!q) return true;
                 return (i.name || '').toLowerCase().includes(q) || (i.unitCode || '').toLowerCase().includes(q) || (i.city || '').toLowerCase().includes(q);
             })
             .forEach(item => {
                const row = document.createElement('div');
                row.className = 'row';

                const nameCol = document.createElement('div'); nameCol.className='col name'; nameCol.textContent = item.name || '';
                const unitCol = document.createElement('div'); unitCol.className='col unit'; unitCol.textContent = item.unitCode || '';
                const contactCol = document.createElement('div'); contactCol.className='col owner'; contactCol.textContent = (item.contactEmail || '') + (item.phone ? (' \u2022 ' + item.phone) : '');
                const cityCol = document.createElement('div'); cityCol.className='col city';
                const addr = item.address || {};
                const shortAddr = addr.city ? (addr.city + (addr.state ? (', ' + addr.state) : '')) : (item.city || '');
                cityCol.textContent = shortAddr;
                const statusCol = document.createElement('div'); statusCol.className='col status ' + (item.status || '');
                const s = item.status || '';
                statusCol.textContent = s ? (s.charAt(0).toUpperCase() + s.slice(1)) : '';
                const actionsCol = document.createElement('div'); actionsCol.className='col actions';

                // actions as compact icon buttons
                const makeBtn = (opts) => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'btn small' + (opts.className ? ' ' + opts.className : '');
                    b.title = opts.title || '';
                    b.innerHTML = opts.html || '';
                    if (opts.onClick) b.addEventListener('click', opts.onClick);
                    return b;
                };

                // open site (external link icon)
                const openBtn = makeBtn({
                    title: 'Open site',
                    html: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 21H3V3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.05"/></svg>',
                    onClick: () => {
                        const url = 'tenant_edit_screen.html?tenantId=' + encodeURIComponent(item.id);
                        window.open(url, '_blank');
                    }
                });

                // invite (mail icon)
                const inviteBtn = makeBtn({
                    title: 'Invite',
                    className: 'outline',
                    html: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v.5l9 6 9-6V6.5z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    onClick: () => { alert('Invite sent to ' + (item.contactEmail || '[no email]') + ' (prototype)'); }
                });

                // edit (pencil icon)
                const editBtn = makeBtn({
                    title: 'Edit',
                    html: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21l3-1 11-11 1-3-3 1L4 20z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    onClick: () => { window.location.href = 'franchisee_edit_screen.html?tenantId=' + encodeURIComponent(item.id); }
                });

                // deactivate (red highlight, power/trash icon)
                const deactivateBtn = makeBtn({
                    title: 'Deactivate',
                    className: 'danger action-deactivate',
                    html: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14v7a1 1 0 0 0 2 0v-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 7h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4h4v3H10z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    onClick: () => {
                        if (!confirm('Deactivate this franchisee?')) return;
                        updateStatus(item.id, 'inactive');
                    }
                });

                actionsCol.appendChild(openBtn);
                actionsCol.appendChild(inviteBtn);
                actionsCol.appendChild(editBtn);
                actionsCol.appendChild(deactivateBtn);

                row.appendChild(nameCol);
                row.appendChild(unitCol);
                row.appendChild(contactCol);
                row.appendChild(cityCol);
                row.appendChild(statusCol);
                row.appendChild(actionsCol);

                listContainer.appendChild(row);
             });
    }

    function updateStatus(id, status) {
        const items = load();
        const idx = items.findIndex(i => i.id === id);
        if (idx === -1) return;
        items[idx].status = status;
        items[idx].updatedAt = new Date().toISOString();
        save(items);
        render();
    }

    function openEdit(id) {
        editingId = id;
        const items = load();
        const item = items.find(i => i.id === id);
        if (!item) return;
        modalTitle.textContent = 'Edit Franchisee';
        document.getElementById('f_name').value = item.name || '';
        document.getElementById('f_unitCode').value = item.unitCode || '';
        document.getElementById('f_contactName').value = item.contactName || '';
        document.getElementById('f_contactEmail').value = item.contactEmail || '';
        document.getElementById('f_city').value = item.city || '';
        document.getElementById('f_status').value = item.status || 'pending';
        document.getElementById('f_notes').value = item.notes || '';
        showModal();
    }

    function showModal() {
        formError.classList.add('hidden');
        modal.classList.remove('hidden');
    }
    function hideModal() { modal.classList.add('hidden'); editingId = null; form.reset(); }

    function validateUnitUnique(unitCode, idToIgnore) {
        if (!unitCode) return true;
        const items = load();
        const found = items.find(i => i.unitCode === unitCode && i.id !== idToIgnore);
        return !found;
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('f_name').value.trim();
        const unitCode = document.getElementById('f_unitCode').value.trim().toLowerCase();
        const contactName = document.getElementById('f_contactName').value.trim();
        const contactEmail = document.getElementById('f_contactEmail').value.trim();
        const city = document.getElementById('f_city').value.trim();
        const status = document.getElementById('f_status').value;
        const notes = document.getElementById('f_notes').value.trim();

        if (!name || !unitCode || !contactEmail) {
            formError.textContent = 'Please fill required fields: Name, Unit Code, Contact Email.';
            formError.classList.remove('hidden');
            return;
        }
        if (!/^[a-z0-9-]{2,30}$/.test(unitCode)) {
            formError.textContent = 'Unit code must be 2-30 chars using lowercase letters, numbers, or hyphens.';
            formError.classList.remove('hidden');
            return;
        }
        if (!validateUnitUnique(unitCode, editingId)) {
            formError.textContent = 'Unit code already in use. Choose another.';
            formError.classList.remove('hidden');
            return;
        }

        const items = load();
        if (editingId) {
            const idx = items.findIndex(i => i.id === editingId);
            if (idx === -1) return;
            items[idx] = Object.assign(items[idx], { name, unitCode, contactName, contactEmail, city, status, notes, updatedAt: new Date().toISOString() });
            save(items);
            hideModal();
            render();
            alert('Franchisee updated (prototype)');
            return;
        }

        // create
        const id = generateId();
        const newItem = { id, name, unitCode, contactName, contactEmail, city, status, notes, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        items.push(newItem);
        save(items);
        hideModal();
        render();
        alert('Franchisee created and invite sent (prototype)');
    });

    // Create button now navigates to a dedicated create page; keep modal-only for edit flows.
    // If the UI still wants to open the modal, we can wire it separately. For now the dedicated page handles creation.

    cancelModal.addEventListener('click', () => hideModal());

    searchInput.addEventListener('input', debounce(render, 200));
    statusFilter.addEventListener('change', render);

    // small helper: debounce
    function debounce(fn, wait){
        let t;
        return function(){ clearTimeout(t); t = setTimeout(()=>fn.apply(this, arguments), wait); };
    }

    // seed sample data if none
    (function seed(){
        const items = load();
        if (items.length === 0) {
            const sample = [
                { id: generateId(), name: 'Acme Hanoi', unitCode: 'hanoi', contactName: 'Nguyen A', contactEmail: 'hanoi@acme.com', city: 'Hanoi', status: 'active', notes: '' },
                { id: generateId(), name: 'Acme Saigon', unitCode: 'saigon', contactName: 'Tran B', contactEmail: 'saigon@acme.com', city: 'Ho Chi Minh', status: 'active', notes: '' },
            ];
            save(sample);
        }
    })();

    // initial render
    render();
})();
