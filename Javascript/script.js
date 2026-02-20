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


const numberVar = 24;
const stringVar = "Hello, FlexiSAF";
const booleanVar = true;

// Comparison examples
const isAdult = numberVar >= 18;
const containsWord = stringVar.toLowerCase().includes('flexisaf');

// Function example
function formatPrice(n) {
    if (typeof n !== 'number' || Number.isNaN(n)) return 'N/A';
    return '$' + n.toFixed(2);
}

// Array of objects example
const plans = [
    { name: 'Monthly', price: 49 },
    { name: 'Yearly', price: 70 },
    { name: 'Quarterly', price: 65 }
];

// Object example
const user = {
    name: 'Godspower',
    enrolled: true,
    level: 'B1',
    features: ['Live classes', 'Materials', 'Progress tracking']
};

// Demo modal panel
function createDemoPanel() {
    const panel = document.createElement('aside');
    panel.id = 'js-demo-panel';
    // minimal inline styles so it appears without editing CSS files
    Object.assign(panel.style, {
        position: 'fixed',
        right: '18px',
        bottom: '18px',
        width: '320px',
        maxHeight: '60vh',
        overflow: 'auto',
        background: 'rgba(255,255,255,0.96)',
        color: 'var(--primary-color)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        borderRadius: '10px',
        padding: '12px',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        zIndex: 9999,
    });

    // header
    const h = document.createElement('div');
    h.style.display = 'flex';
    h.style.justifyContent = 'space-between';
    h.style.alignItems = 'center';
    h.style.marginBottom = '8px';
    const title = document.createElement('strong');
    title.textContent = 'JS Types Demo';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    Object.assign(closeBtn.style, { border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer' });
    closeBtn.title = 'Close demo';
    closeBtn.addEventListener('click', () => panel.remove());
    h.appendChild(title);
    h.appendChild(closeBtn);
    panel.appendChild(h);

    // content list
    const list = document.createElement('div');

    const addLine = (label, value) => {
        const row = document.createElement('div');
        row.style.marginBottom = '6px';
        const lbl = document.createElement('div');
        lbl.textContent = label;
        lbl.style.fontSize = '12px';
        lbl.style.color = 'var(--secondary-color)';
        const val = document.createElement('div');
        val.textContent = value;
        val.style.fontWeight = '600';
        row.appendChild(lbl);
        row.appendChild(val);
        list.appendChild(row);
        return val;
    };

    addLine('Number (example)', numberVar);
    addLine('String (example)', stringVar);
    addLine('Boolean (example)', String(booleanVar));
    addLine('Comparison: number >= 18', String(isAdult));
    addLine('Comparison: string contains "flexisaf"', String(containsWord));

    // function & formatted prices
    const priceNode = addLine('Function: formatPrice(70)', formatPrice(70));

    // Array & loop
    const arrLabel = document.createElement('div');
    arrLabel.textContent = 'Array (plans) — looped below:';
    arrLabel.style.fontSize = '12px';
    arrLabel.style.color = '#666';
    list.appendChild(arrLabel);

    const ul = document.createElement('ul');
    ul.style.margin = '6px 0 10px 18px';
    ul.style.padding = '0';
    ul.style.listStyle = 'disc';
    for (const p of plans) {
        // demonstrate loop + object access
        const li = document.createElement('li');
        li.textContent = `${p.name} — ${formatPrice(p.price)}`;
        li.style.marginBottom = '4px';
        ul.appendChild(li);
    }
    list.appendChild(ul);

    // Object example and its features (loop)
    const userLabel = document.createElement('div');
    userLabel.textContent = 'Object (user)';
    userLabel.style.fontSize = '12px';
    userLabel.style.color = 'var(--secondary-color)';
    list.appendChild(userLabel);

    const userName = addLine('Name', user.name);
    addLine('Enrolled', String(user.enrolled));
    addLine('Level', user.level);

    const featLabel = document.createElement('div');
    featLabel.textContent = 'Features (loop):';
    featLabel.style.fontSize = '12px';
    featLabel.style.color = 'var(--secondary-color)';
    list.appendChild(featLabel);

    const featUl = document.createElement('ul');
    featUl.style.margin = '6px 0 0 18px';
    featUl.style.padding = '0';
    featUl.style.listStyle = 'disc';
    for (let i = 0; i < user.features.length; i++) {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${user.features[i]}`;
        featUl.appendChild(li);
    }
    list.appendChild(featUl);

    // append all
    panel.appendChild(list);

    // small footer note
    const note = document.createElement('div');
    note.style.marginTop = '8px';
    note.style.fontSize = '12px';
    note.style.color = 'var(--secondary-color)';
    note.textContent = 'This panel shows JS primitives and common constructs.';
    panel.appendChild(note);

    document.body.appendChild(panel);
}

// create panel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDemoPanel);
} else {
    createDemoPanel();
}

