const data = JSON.parse(localStorage.getItem('generatedInvoiceData'));

if (!data) {
    alert("No invoice data found. Please fill out the form first.");
    window.location.href = 'index.html';
} else {
    // Render Generated Invoice View Page

    renderInvoicePreview();

    // Invoice Button Controls
    const editFormBtn = document.getElementById("edit-form-btn");
    const printBtn = document.getElementById("print-btn");

    editFormBtn.addEventListener("click", () => {
        
        window.location.href = 'index.html';
    });

    printBtn.addEventListener("click", () => {
        window.print();
    })
}

function renderInvoicePreview () {
    document.getElementById("client-name-display").innerText = data.clientName || "Client Name";
    document.getElementById("client-phone-display").innerText = data.clientPhone || "-";
    document.getElementById("client-address-display").innerText = data.clientAddress || "-";
    // document.getElementById("invoice-number-display").innerText = data.invoiceNo || "-";
    document.getElementById("invoice-date-display").innerText = data.invoiceDate || "-";
    document.getElementById("pay-percentage-display").innerText = data.percentagePay || "-";
    document.getElementById("payment-method-display").innerText = data.paymentMethod || "-";
    document.getElementById("signee-name-display").innerText = data.signeeName || "-";
    document.getElementById("signee-badge-display").innerText = data.signeeBadge || "MANAGER";
    // Calculate & Render Table Rows
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    let grandTotal = 0;

    data.items.forEach((item) => {
        const lineTotal = (item.unitPrice || 0) * (item.quantity || 0);
        grandTotal += lineTotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${item.description}</td>
            <td>${data.currency}${item.unitPrice}</td>
            <td>${item.quantity}</td>
            <td>${data.currency}${lineTotal}</td> 
        `;
        tbody.appendChild(tr);
    })

    // Fill empty visual spacer rows if few items exist
    const minRows = 4;
    if (data.items.length < minRows) {
        for (let i = data.items.length; i < minRows; i++) {
            const tr = document.createElement('tr');
            tr.style.height = '36px';
            tr.innerHTML = `<td></td><td></td><td></td><td></td>`;
            tbody.appendChild(tr);
        }
    }

    document.getElementById("currency-display").innerText = data.currency;
    document.getElementById("total-cost-display").innerText = grandTotal;
    document.getElementById("grand-total-display").innerText = grandTotal;

    paymentMethodDisplay = data.paymentMethod || "Payment via bank transfer";
    signeeNameDisplay = data.signeeName || "Lukman Toluwani";
    signeeBadgeDisplay = data.signeeBadge || "MANAGER";
}