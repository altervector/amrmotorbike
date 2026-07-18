/* ============================================================
   COOKIES-BANNER.JS
   Web Component: <cookies-banner></cookies-banner>
   Depèn de: config.js (per l'enllaç a cookies.html i CONFIG.COOK)

   QUÈ FA AQUEST FITXER:
   Mostra el banner de cookies centrat en pantalla si l'usuari
   encara no ha triat (localStorage buit). Els botons Acceptar
   i Rebutjar tenen el mateix pes visual — obligatori legalment.
   Un cop tries, es guarda a localStorage i no torna a sortir.

   CLAU: CONFIG.COOK (definida a cada projecte) → 'acceptat' | 'rebutjat'
   Cada projecte té la seva pròpia clau per evitar que es
   trepitgin entre si quan comparteixen el mateix origen
   (mateix domini .github.io o mateix localhost).
   ============================================================ */

class CookiesBanner extends HTMLElement {
    connectedCallback() {

        // Si ja hi ha una elecció guardada → no pintem res
        const eleccio = localStorage.getItem(CONFIG.COOK);
        if (eleccio) return;

        this.innerHTML = `
            <style>
                .cb-fons {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 99998;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .cb-caixa {
                    background: white;
                    max-width: 420px;
                    width: 100%;
                    padding: 28px 24px;
                    border-radius: 10px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    font-family: 'Segoe UI', Roboto, sans-serif;
                    text-align: center;
                }
                .cb-caixa h3 {
                    font-size: 1.1rem;
                    color: var(--gris-fosc, #1f1f1f);
                    margin-bottom: 12px;
                }
                .cb-caixa p {
                    font-size: 13px;
                    color: var(--gris, #666);
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .cb-caixa a {
                    color: var(--vermell, #e53012);
                }
                .cb-botons {
                    display: flex;
                    gap: 10px;
                }
                .cb-botons button {
                    flex: 1;
                    padding: 12px;
                    font-size: 13px;
                    font-weight: bold;
                    border-radius: 6px;
                    cursor: pointer;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                /* Mateix pes visual als dos botons */
                #cb-acceptar {
                    background: var(--vermell, #e53012);
                    color: white;
                    border: 1px solid var(--vermell, #e53012);
                }
                #cb-rebutjar {
                    background: white;
                    color: var(--gris-fosc, #1f1f1f);
                    border: 1px solid #ccc;
                }
            </style>

            <div class="cb-fons">
                <div class="cb-caixa">
                    <h3>Utilizamos cookies</h3>
                    <p>
                        Usamos una cookie técnica propia para recordar tu elección.
                        No utilizamos cookies de terceros ni de análisis.
                        <a href="cookies.html">Más información</a>
                    </p>
                    <div class="cb-botons">
                        <button id="cb-rebutjar">Rechazar</button>
                        <button id="cb-acceptar">Aceptar</button>
                    </div>
                </div>
            </div>
        `;

        // ─── EVENTS ───────────────────────────────────────────
        // Guarda l'elecció i elimina el banner del DOM
        // remove() en lloc de display:none → neteja del tot
        this.querySelector('#cb-acceptar').addEventListener('click', () => {
            localStorage.setItem(CONFIG.COOK, 'acceptat');
            this.remove();
        });

        this.querySelector('#cb-rebutjar').addEventListener('click', () => {
            localStorage.setItem(CONFIG.COOK, 'rebutjat');
            this.remove();
        });
    }
}
customElements.define('cookies-banner', CookiesBanner);