const navbar = document.getElementById("navbar");
const openSidebarButton = document.getElementById("open-sidebar-button");
const closeSidebarButton = document.getElementById("close-sidebar-button");

function openSidebar() {
    navbar.classList.add("show");
    openSidebarButton.setAttribute("aria-expanded", true);
    document.body.style.overflow = "hidden";

}

function closeSidebar() {
    navbar.classList.remove("show");
    closeSidebarButton.setAttribute("aria-expanded", false);
    document.body.style.overflow = "auto";
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeSidebar();
    });
    link.addEventListener("click", () => {
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});
