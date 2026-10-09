class NavbarComu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <div class="navbar-logo">
                    <img src="${CONFIG.ASSETS}${CONFIG.LOGO_T}" alt="${CONFIG.NOM}">
                </div>
                <button class="navbar-hamburguesa">☰</button>
                <ul class="navbar-menu">
                    <li><a href="#inici">${CONFIG.NAV_INICI}</a></li>
                    <li><a href="#qui-som">${CONFIG.NAV_NOSALTRES}</a></li>
                    <li><a href="#serveis">${CONFIG.NAV_SERVEIS}</a></li>
                    <li><a href="#ocasion">${CONFIG.NAV_OCA}</a></li>
                    <li><a href="#perque">${CONFIG.NAV_PXQ}</a></li>
                    <li><a href="#contacte">${CONFIG.NAV_CONTACTE}</a></li>
                </ul>
            </nav>
        `;

        const btnHamburguesa = this.querySelector('.navbar-hamburguesa');
        const menu = this.querySelector('.navbar-menu');

        btnHamburguesa.addEventListener('click', () => {
            menu.classList.toggle('obert');
        });

        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => menu.classList.remove('obert'));
        });

        //* ────Long press logo → login (per si un dia hi ha admin)────────────────────────*//
        const logo = this.querySelector('.navbar-logo img');
        let timerLogo;
        const iniciarPress = (e) => {
            e.preventDefault();
            timerLogo = setTimeout(() => {
                if (typeof window.obrirModalLogin === 'function') window.obrirModalLogin();
            }, 1500);
        };
        const aturarPress = () => clearTimeout(timerLogo);
        logo.addEventListener('mousedown',  iniciarPress);
        logo.addEventListener('mouseup',    aturarPress);
        logo.addEventListener('mouseleave', aturarPress);
        logo.addEventListener('touchstart', iniciarPress, { passive: false });
        logo.addEventListener('touchend',   aturarPress);
        logo.addEventListener('contextmenu', (e) => e.preventDefault());
    }
}

class Navbar2Comu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <div class="navbar-logo">
                    <img src="${CONFIG.ASSETS}${CONFIG.LOGO_T}" alt="${CONFIG.NOM}">
                </div>
                <button class="navbar-hamburguesa">☰</button>
                <ul class="navbar-menu">
                    <li><a href="index.html#inici">${CONFIG.NAV_INICI}</a></li>

                </ul>
            </nav>
        `;

        const btnHamburguesa = this.querySelector('.navbar-hamburguesa');
        const menu = this.querySelector('.navbar-menu');

        btnHamburguesa.addEventListener('click', () => {
            menu.classList.toggle('obert');
        });

        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => menu.classList.remove('obert'));
        });

        //* ────Long press logo → login (per si un dia hi ha admin)────────────────────────*//
        const logo = this.querySelector('.navbar-logo img');
        let timerLogo;
        const iniciarPress = (e) => {
            e.preventDefault();
            timerLogo = setTimeout(() => {
                if (typeof window.obrirModalLogin === 'function') window.obrirModalLogin();
            }, 1500);
        };
        const aturarPress = () => clearTimeout(timerLogo);
        logo.addEventListener('mousedown',  iniciarPress);
        logo.addEventListener('mouseup',    aturarPress);
        logo.addEventListener('mouseleave', aturarPress);
        logo.addEventListener('touchstart', iniciarPress, { passive: false });
        logo.addEventListener('touchend',   aturarPress);
        logo.addEventListener('contextmenu', (e) => e.preventDefault());
    }
}

customElements.define('navbar-comu', NavbarComu);
customElements.define('navbar2-comu', Navbar2Comu);