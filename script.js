// INTERACTIVE RECIEPT GENERATOR
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('generatedInvoiceData');
    if (saved) {
        try { invoiceData = JSON.parse(saved); } catch(e) {}
    }
    populateForm();
    renderFormItems();
});

// Button Controls
const resetBtn = document.getElementById("reset-btn");
const resetBtn1 = document.getElementById("reset-1");

const generateInvoiceBtn = document.getElementById("generate-invoice-btn");
const generateInvoiceBtn1 = document.getElementById("generate-invoice-1");
const generateInvoiceBtn2 = document.getElementById("generate-invoice-2");

const addItemBtn = document.getElementById("add-item-btn");

const saveDraftBtn = document.getElementById("save-draft-btn");
const saveDraftBtn1 = document.getElementById("save-draft-1");

resetBtn.addEventListener("click", resetDefaults);
resetBtn1.addEventListener("click", resetDefaults);

addItemBtn.addEventListener("click", addNewItem);

saveDraftBtn.addEventListener("click", saveDraft);
saveDraftBtn1.addEventListener("click", saveDraft);

generateInvoiceBtn.addEventListener("click", () => {
    readFormInputs();
    window.location.href = 'reciept.html';
});
generateInvoiceBtn1.addEventListener("click", () => {
    readFormInputs();
    window.location.href = 'reciept.html';
});
generateInvoiceBtn2.addEventListener("click", () => {
    readFormInputs();
    window.location.href = 'reciept.html';
});

// Dynamic Line Items - Form Controls
function renderFormItems () {
    const itemsConatiner = document.getElementById("items-container");
    itemsConatiner.innerHTML = '';

    invoiceData.items.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "item";
        row.innerHTML += `
            <div class="item-description">
                <p>Item Description</p>
                <input class="input input-secondary" type="text" value="${item.description}" oninput="updateItem(${index}, 'description', this.value)" required>
            </div>

            <button onclick="removeItem(${index})" class="trash-btn">
                <i class="fa-solid fa-trash-can fa-xl" style="color: #c9421c;"></i>
            </button>

            <div class="item-price">
                <p>Unit Price</p>
                <input class="input input-secondary" type="number" value="${item.unitPrice}" oninput="updateItem(${index}, 'unitPrice', parseFloat(this.value)||0)" required>
            </div>
            <div class="item-quantity">
                <p>Quantity</p>
                <input class="input input-secondary" type="number" value="${item.quantity}" oninput="updateItem(${index}, 'quantity', parseFloat(this.value)||0)" required>
            </div>
        `;
        itemsConatiner.appendChild(row);
    });
}

function addNewItem() {
    invoiceData.items.push({
        description: "New Item",
        unitPrice: 50000,
        quantity: 1
    });
    renderFormItems();
    saveInvoiceState();
}

function removeItem(index) {
    if  (invoiceData.items.length <= 1) {
        alert("An incvoice must conatin at least one line item.");
        return;
    }
    invoiceData.items.splice(index, 1);
    renderFormItems();
    saveInvoiceState();
}

function updateItem(index, prop, value) {
    invoiceData.items[index][prop] = value;
    saveInvoiceState();
}

// State Store
let invoiceData = {
    clientName: document.getElementById("client-name-input").value,
    clientPhone: document.getElementById("client-phone-input").value,
    clientAddress: document.getElementById("client-address-input").value,
    invoiceNo: document.getElementById("invoice-no-input").value,
    invoiceDate: document.getElementById("invoice-date-input").value,
    currency: document.getElementById("currency-input").value,
    percentagePay: document.getElementById("percentage-pay-input").value,
    paymentMethod: document.getElementById("payment-method-input").value,
    signeeName: document.getElementById("signee-name-input").value,
    signeeBadge: document.getElementById("signee-badge-input").value,
    items: [
        { description: "Event Planning & Coordination Services", unitPrice: 500000, quantity: 2 },
        { description: "Sound System & Stage Lighting Setup", unitPrice: 350000, quantity: 2 },
        { description: "Logistics & Security Management", unitPrice: 150000, quantity: 2 }
    ] 
};

saveInvoiceState();

// Populate Form Fields with Invoice Data
function populateForm() {
    document.getElementById("client-name-input").value = invoiceData.clientName;
    document.getElementById("client-phone-input").value = invoiceData.clientPhone;
    document.getElementById("client-address-input").value = invoiceData.clientAddress;
    document.getElementById("invoice-no-input").value = invoiceData.invoiceNo;
    document.getElementById("invoice-date-input").value = invoiceData.invoiceDate;
    document.getElementById("currency-input").value = invoiceData.currency;
    document.getElementById("percentage-pay-input").value = invoiceData.percentagePay;
    document.getElementById("payment-method-input").value = invoiceData.paymentMethod;
    document.getElementById("signee-name-input").value = invoiceData.signeeName;
    document.getElementById("signee-badge-input").value = invoiceData.signeeBadge;
}

// Read Form Fields and Update Invoice Data
function readFormInputs () {
    invoiceData.clientName = document.getElementById("client-name-input").value;
    invoiceData.clientPhone = document.getElementById("client-phone-input").value;
    invoiceData.clientAddress = document.getElementById("client-address-input").value;
    invoiceData.invoiceNo = document.getElementById("invoice-no-input").value;
    invoiceData.invoiceDate = document.getElementById("invoice-date-input").value;
    invoiceData.currency = document.getElementById("currency-input").value;
    invoiceData.percentagePay = document.getElementById("percentage-pay-input").value;
    invoiceData.paymentMethod = document.getElementById("payment-method-input").value;
    invoiceData.signeeName = document.getElementById("signee-name-input").value;
    invoiceData.signeeBadge = document.getElementById("signee-badge-input").value;

    saveInvoiceState();
}

// Save data locally and navigate to separate receipt page
function saveInvoiceState() {
    localStorage.setItem('generatedInvoiceData', JSON.stringify(invoiceData));
    // window.location.href = 'reciept.html';
}

function resetDefaults () {
    localStorage.removeItem('generatedInvoiceData');
    invoiceData = {
        clientName: "Abradi Opas Kim",
        clientPhone: "+234-806-255-4720",
        clientAddress: "1, Beco Street, Off Babaponmile Street, Mangoro, Ikeja, Lagos.",
        invoiceNo: "0123 456 789",
        invoiceDate: "16 Oct 2026",
        currency: "₦",
        percentagePay: "50",
        paymentMethod: "Payment via bank transfer",
        signeeName: "Lukman Toluwani",
        signeeBadge: "MANAGER",
        items: [
            { description: "Event Planning & Coordination Services", unitPrice: 500000, quantity: 2 },
            { description: "Sound System & Stage Lighting Setup", unitPrice: 350000, quantity: 2 },
            { description: "Logistics & Security Management", unitPrice: 150000, quantity: 2 }
        ] 
    };
    populateForm();
    renderFormItems();
}

function saveDraft () {
    saveInvoiceState();
    alert("Draft saved successfully!");
}