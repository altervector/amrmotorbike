class ContacteFlotantComu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="barra-fixa-mobil">
                <a href="tel:${CONFIG.TELEFON}" class="boto-fix trucar">Llamar</a>
                <a href="${CONFIG.WHATSAPP}" target="_blank" rel="noopener" class="boto-fix whatsapp">WhatsApp</a>
            </div>
            <div class="barra-fixa-pc">
                <a href="tel:${CONFIG.TELEFON}" class="boto-fix-pc trucar">Llamar</a>
                <a href="${CONFIG.WHATSAPP}" target="_blank" rel="noopener" class="boto-fix-pc whatsapp">WhatsApp</a>
            </div>
        `;
    }
}

customElements.define('contacte-flotant-comu', ContacteFlotantComu);