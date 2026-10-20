// Interactive Header
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

// Toggle dropdown when clicking 3-dots
toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-active");
    console.log("Toggle button fired")
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!toggleBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("is-active");
    }
});

