// Interactive Header
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

// Toggle dropdown when clicking 3-dots
toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!toggleBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("is-active");
    }
});

// Interactive Receipt Generator

const clientNameInput = document.getElementById("client-name-input");
const clientPhoneInput = document.getElementById("client-phone-input");
const invoiceNumInput = document.getElementById("invoice-no-input");
const invoiceDateInput = document.getElementById("invoice-date-input");
const currencyInput = document.getElementById("currency-input");
const clientAddressInput = document.getElementById("client-address-input");

const printBtn = document.getElementById("print-btn");

const clientNameDisplay = document.getElementById("client-name");
const clientPhoneDisplay = document.getElementById("client-phone");
const clientAddressDisplay = document.getElementById("client-address");
const invoiceNoDisplay = document.getElementById("invoice-number");
const invoiceDateDisplay = document.getElementById("invoice-date");
