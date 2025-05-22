const navLinks = document.getElementById("rt");
const icon = document.getElementById("icon");

icon.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});