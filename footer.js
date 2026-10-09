class FooterComu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <p class="footer-nom">${CONFIG.NOM}</p>
                <p class="footer-slogan">${CONFIG.SLOGAN}</p>
                <div class="footer-xarxes">
                    <a href="${CONFIG.INSTAGRAM}" target="_blank">
                        <img src="${CONFIG.ASSETS}icon/Icoinsta.png" alt="Instagram" class="icona-app"> Instagram
                    </a>
                    <a href="${CONFIG.URL_RESSENYES}" target="_blank">
                        <img src="${CONFIG.ASSETS}icon/google.png" alt="Google" class="icona-app">Google (Reseñas)
                    </a>
                </div>
                <p class="footer-qr">
                    <a href="${CONFIG.ASSETS}${CONFIG.QR}">
                        <img src="${CONFIG.ASSETS}${CONFIG.QR}" alt="QR">
                    </a>
                </p>
                <p style="font-size:13px; color: var(--gris);">
                    <a href="${CONFIG.URL_MAPS}" target="_blank">${CONFIG.ADRECA}</a>
                </p>
                <div class="footer-legal">
                    <a href="aviso-legal.html">Aviso Legal</a>
                    <a href="privacitat.html">Política de privacidad</a>
                    <a href="cookies.html">Uso de Cookies</a>
                </div>
                <p class="footer-poweredby">
                    Powered by <a href="https://www.alterwebstudio.com" target="_blank">AlterWeb Studio</a>
                </p>
                <span id="visites"></span>
            </footer>
        `;

        fetch(`${CONFIG.BASE_WORKER}/visites`)
            .then(r => r.json())
            .then(data => {
                const el = this.querySelector('#visites');
                if (el && data.visites) {
                    el.textContent = `${data.visites} visites`;
                }
            })
            .catch(() => {});
    }
}

customElements.define('footer-comu', FooterComu);