// billing_mock.js - simple localStorage-backed mock for fee definitions, invoices, and payments
window.BillingMock = (function(){
    const FEES_KEY = 'franchise_fees_v1';
    const INVOICES_KEY = 'franchise_invoices_v1';
    const TX_KEY = 'franchise_transactions_v1';
    const FRANCHISEE_KEY = 'franchisees_v1'; // existing

    function uid(prefix){ return (prefix||'id_') + Math.random().toString(36).slice(2,9); }
    function load(key){ try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){ return []; } }
    function save(key, data){ localStorage.setItem(key, JSON.stringify(data)); }

    // Fees
    function getFees(){ return load(FEES_KEY); }
    function getFee(id){ return getFees().find(f=>f.id===id); }
    function createFee(obj){ const fees = getFees(); const f = Object.assign({ id: uid('fee_'), name:'', type:'one-time', amount:0, frequency:'monthly', active:true, applyOnCreate:false }, obj); fees.push(f); save(FEES_KEY, fees); return f; }
    function updateFee(f){ const fees = getFees(); const idx = fees.findIndex(x=>x.id===f.id); if (idx===-1) return; fees[idx]=f; save(FEES_KEY, fees); }
    function deleteFee(id){ const fees = getFees().filter(f=>f.id!==id); save(FEES_KEY, fees); }

    // Franchisees helper
    function getFranchisees(){ return load(FRANCHISEE_KEY); }
    function getFranchisee(id){ return getFranchisees().find(x=>x.id===id); }

    // Invoices
    function getInvoices(){ return load(INVOICES_KEY); }
    function getInvoicesForTenant(tenantId){ return getInvoices().filter(i=>i.tenantId === tenantId); }
    function createInvoice(tenantId, items, dueDays=7){ const invoices = getInvoices(); const total = items.reduce((s,it)=>s+Number(it.amount||0),0); const inv = { id: uid('inv_'), invoiceNumber: 'INV'+(Math.floor(Math.random()*90000)+10000), tenantId, items, subtotal: total, taxAmount:0, total, currency:'USD', status:'open', issuedAt: new Date().toISOString(), dueAt: new Date(Date.now()+dueDays*24*3600*1000).toISOString() }; invoices.push(inv); save(INVOICES_KEY, invoices); return inv; }

    function generateInvoicesForAll(){
        const fees = getFees().filter(f=>f.active && f.type==='recurring');
        const franchisees = getFranchisees();
        let created = 0;
        franchisees.forEach(ff => {
            fees.forEach(f => {
                // create invoice item
                const item = { description: f.name, amount: Number(f.amount || 0), feeDefinitionId: f.id };
                createInvoice(ff.id, [item]); created++;
            });
        });
        return created;
    }

    // pay invoice (simulate) - returns true if succeeded
    function payInvoice(invoiceId){
        const invoices = getInvoices(); const inv = invoices.find(i=>i.id===invoiceId); if (!inv) return false; 
        // simulate success 90% of time
        const ok = Math.random() < 0.9;
        const txs = load(TX_KEY);
        const tx = { id: uid('tx_'), invoiceId, tenantId: inv.tenantId, amount: inv.total, currency: inv.currency, status: ok? 'succeeded' : 'failed', gatewayReference: uid('gw_'), createdAt: new Date().toISOString() };
        txs.push(tx); save(TX_KEY, txs);
        if (ok){ inv.status = 'paid'; inv.paidAt = new Date().toISOString(); save(INVOICES_KEY, invoices); return true; }
        inv.status = 'past_due'; save(INVOICES_KEY, invoices); return false;
    }

    // Onboarding: when creating franchisee elsewhere, if fee.applyOnCreate create invoice
    function applyOnCreateForFranchisee(franchiseeId){ const fees = getFees().filter(f=>f.applyOnCreate && f.active); let count=0; fees.forEach(f=>{ createInvoice(franchiseeId, [{ description: f.name, amount: f.amount, feeDefinitionId: f.id }]); count++; }); return count; }

    // Admin helper: create invoice from fee definition for a tenant
    function createInvoiceFromFeeForTenant(feeId, tenantId){ const f = getFee(feeId); if (!f) return null; return createInvoice(tenantId, [{ description: f.name, amount: f.amount, feeDefinitionId: f.id }]); }

    // Accessors
    return { getFees, getFee, createFee, updateFee, deleteFee, getInvoices, createInvoice, getInvoicesForTenant, payInvoice, generateInvoicesForAll, getFranchisee, applyOnCreateForFranchisee, createInvoiceFromFeeForTenant };
})();
