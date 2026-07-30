/* ============================================================
   FORM-CONTACTE.JS — AMR MotorBike
   Web Component: <form-contacte></form-contacte>
   Depèn de: config.js

   Formulari únic: contacte general + CV opcional (adjunt).
   El CV es converteix a base64 al navegador i es queda només
   a memòria fins enviar-lo — mai es puja ni es guarda enlloc.
   ============================================================ */

class FormContacte extends HTMLElement {
    connectedCallback() {

        const MIDA_MAXIMA_CV = 4 * 1024 * 1024; // 4MB, abans de convertir a base64

        this.innerHTML = `
            <form class="form-contacte" id="form-contacte">
                <input type="text" id="fc-nom" placeholder="Nombre *" required>
                <input type="tel"  id="fc-telefon" placeholder="Teléfono *" required>
                <input type="email" id="fc-email" placeholder="Correo electrónico">
                <textarea id="fc-missatge" placeholder="¿En qué podemos ayudarte? *" required></textarea>

                <label class="fc-file-label" id="fc-file-label" for="fc-cv">
                    📎 Adjuntar CV (opcional)
                </label>
                <input type="file" id="fc-cv" accept=".pdf,.doc,.docx" style="display:none;">
                <p id="fc-cv-nom" style="font-size:12px; color:var(--gris); min-height:16px;"></p>

                <label style="display:flex; align-items:flex-start; gap:8px; font-size:12px; color:var(--gris);">
                    <input type="checkbox" id="fc-consentiment" required style="margin-top:3px;">
                    <span>He leído y acepto la <a href="privacitat.html" target="_blank">Política de Privacidad</a> *</span>
                </label>

                <div style="font-size:11px; color:var(--gris); background:var(--negre-suau); padding:10px 12px; border-radius:var(--radi); border-left:3px solid var(--taronja);">
                    <strong>Responsable:</strong> ${CONFIG.NOM} ·
                    <strong>Finalidad:</strong> responder tu consulta o valorar tu candidatura ·
                    <strong>Derechos:</strong> acceso, rectificación y supresión escribiendo a
                    <a href="mailto:${CONFIG.EMAIL}">${CONFIG.EMAIL}</a>
                </div>

                <button type="submit" class="hero-boto-principal" id="fc-boto">Enviar mensaje</button>
                <p id="fc-estat" style="font-size:13px; min-height:18px;"></p>
            </form>
        `;

        const form      = this.querySelector('#form-contacte');
        const boto      = this.querySelector('#fc-boto');
        const estat     = this.querySelector('#fc-estat');
        const inputCv   = this.querySelector('#fc-cv');
        const labelCv   = this.querySelector('#fc-file-label');
        const nomCvText = this.querySelector('#fc-cv-nom');

        // Variables on guardem el CV ja convertit
        let cvBase64 = ''; // contingut en base64, sense el prefix "data:...;base64,"
        let cvNom    = ''; // nom original de l'arxiu

        // Clicar l'etiqueta obre el selector de fitxer (l'input real està amagat)
        labelCv.addEventListener('click', () => inputCv.click());

        inputCv.addEventListener('change', () => {
            const arxiu = inputCv.files[0];
            if (!arxiu) return;

            if (arxiu.size > MIDA_MAXIMA_CV) {
                nomCvText.textContent = '❌ El archivo pesa demasiado (máx. 4MB)';
                nomCvText.style.color = 'var(--vermell)';
                inputCv.value = '';
                cvBase64 = ''; cvNom = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                // reader.result és "data:application/pdf;base64,XXXX" → ens quedem amb XXXX
                cvBase64 = reader.result.split(',')[1];
                cvNom    = arxiu.name;
                nomCvText.textContent = `✅ ${arxiu.name}`;
                nomCvText.style.color = 'var(--taronja)';
            };
            reader.readAsDataURL(arxiu);
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const dades = {
                nom:          this.querySelector('#fc-nom').value.trim(),
                telefon:      this.querySelector('#fc-telefon').value.trim(),
                email:        this.querySelector('#fc-email').value.trim(),
                missatge:     this.querySelector('#fc-missatge').value.trim(),
                consentiment: this.querySelector('#fc-consentiment').checked
            };

            if (cvBase64 && cvNom) {
                dades.cv    = cvBase64;
                dades.cvNom = cvNom;
            }

            boto.disabled = true;
            boto.textContent = 'Enviando...';
            estat.textContent = '';

            try {
                const res = await fetch(`${CONFIG.BASE_WORKER}/contacte`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dades)
                });

                if (res.ok) {
                    estat.textContent = '✅ Mensaje enviado correctamente. Le contactaremos lo antes posible.';
                    estat.style.color = 'var(--taronja)';
                    form.reset();
                    nomCvText.textContent = '';
                    cvBase64 = ''; cvNom = '';
                } else {
                    throw new Error('Error del servidor');
                }
            } catch (error) {
                estat.textContent = '❌ No se ha podido enviar. Inténtelo de nuevo o llámenos directamente.';
                estat.style.color = 'var(--vermell)';
            }

            boto.disabled = false;
            boto.textContent = 'Enviar mensaje';
        });
    }
}
customElements.define('form-contacte', FormContacte);