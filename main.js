/* ============================================================
   MAIN.JS —  Adri Motors
   Construeix tota la pàgina a partir de CONFIG
   ============================================================ */

(function() {

    const inicialitzar = async () => {

        /* ── 1. NAVBAR ─────────────────────────────────────── */
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.innerHTML = `
                <nav class="navbar">
                    <div class="navbar-logo">
                        <img src="${CONFIG.ASSETS}${CONFIG.LOGO}" alt="${CONFIG.NOM}">
                    </div>
                    <button class="navbar-hamburguesa">☰</button>
                    <ul class="navbar-menu">
                        <li><a href="#qui-som">Nosaltres</a></li>
                        <li><a href="#serveis">Serveis</a></li>
                        <li><a href="#perque">Per què Adri</a></li>
                        <li><a href="#contacte">Contacte</a></li>
                    </ul>
                </nav>
            `;
        }

        const btnHamburguesa = document.querySelector('.navbar-hamburguesa');
        const menu = document.querySelector('.navbar-menu');

        btnHamburguesa.addEventListener('click', () => {
            menu.classList.toggle('obert');
        });

        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => menu.classList.remove('obert'));
        });

        // Long press logo → login (per si un dia hi ha admin)
        const logo = document.querySelector('.navbar-logo img');
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


        /* ── 2. HERO ───────────────────────────────────────── */
        const hero = document.getElementById('hero');
        if (hero) {
            hero.innerHTML = `
                <section class="hero">
                    <img class="hero-imatge"
                        src="${CONFIG.ASSETS}${CONFIG.BLOC_HERO}"
                        alt="${CONFIG.NOM}">
                    <div class="hero-overlay"></div>
                    <div class="hero-contingut">
                        <span class="hero-eyebrow">Taller de Motocicletes</span>
                        <h1 class="hero-titol">${CONFIG.NOM}</h1>
                        <p class="hero-slogan">${CONFIG.SLOGAN}</p>
                        <div class="hero-botons">
                            <a href="tel:${CONFIG.TELEFON}" class="hero-boto-principal">
                                ${CONFIG.HERO_BOTO_PRI}
                            </a>
                            <a href="#serveis" class="hero-boto-secundari">
                                ${CONFIG.HERO_BOTO_SEC}
                            </a>
                        </div>
                    </div>
                </section>
            `;
        }


        /* ── 3. STATS ──────────────────────────────────────── */
        const stats = document.getElementById('stats');
        if (stats) {
            stats.innerHTML = `
                <div class="stats-franja">
                    <div class="stat-item">
                        <div class="stat-numero">+${CONFIG.ANYS_EXPERIENCIA}</div>
                        <div class="stat-label">Anys d'experiència</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-numero">+${CONFIG.MOTOS_REPARADES}</div>
                        <div class="stat-label">Motos reparades</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-numero">+${CONFIG.CLIENTS}</div>
                        <div class="stat-label">Clients satisfets</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-numero">${CONFIG.ESTRELLES}⭐</div>
                        <div class="stat-label">Valoració Google</div>
                    </div>
                </div>
            `;
        }


        /* ── 4. SECCIONS ───────────────────────────────────── */
        const seccions = document.getElementById('seccions');
        if (seccions) {

            // Construeix les targetes de serveis a partir de CONFIG.SERVEIS
            const targetesServeis = CONFIG.SERVEIS.map(s => `
                <div class="servei-card">
                    <div class="servei-ico">${s.ico}</div>
                    <div class="servei-titol">${s.titol}</div>
                    <div class="servei-desc">${s.desc}</div>
                </div>
            `).join('');

            seccions.innerHTML = `

                <!-- QUI SOM -->
                <section class="seccio" id="qui-som">
                    <p class="seccio-eyebrow">${CONFIG.QUI_SOM}</p>
                    <h2 class="seccio-titol">${CONFIG.QUI_SOM_TIT}</h2>
                    <p class="seccio-text">${CONFIG.QUI_DESC}</p>
                    <a href="tel:${CONFIG.TELEFON}" class="hero-boto-principal"
                        style="display:inline-block; margin-top: 8px;">
                        ${CONFIG.HERO_BOTO_PRI}
                    </a>
                </section>

                <hr class="separador">

                <!-- SERVEIS -->
                <section class="seccio" id="serveis">
                    <p class="seccio-eyebrow">El que fem</p>
                    <h2 class="seccio-titol">Els nostres serveis</h2>
                    <div class="serveis-grid">
                        ${targetesServeis}
                    </div>
                </section>

                <hr class="separador">

                <!-- PER QUÈ NOSALTRES -->
                <section class="seccio" id="perque">
                    <p class="seccio-eyebrow">Per què Adri Motors</p>
                    <h2 class="seccio-titol">El taller que la teva moto mereix</h2>
                    <div class="perque-grid">
                        <div class="perque-item">
                            <div class="perque-ico">⚡</div>
                            <div>
                                <div class="perque-titol">Diagnòstic ràpid</div>
                                <div class="perque-desc">Detectem el problema en el mateix dia i t'informem abans de tocar res.</div>
                            </div>
                        </div>
                        <div class="perque-item">
                            <div class="perque-ico">🔩</div>
                            <div>
                                <div class="perque-titol">Recanvis de qualitat</div>
                                <div class="perque-desc">Treballem amb peces originals o equivalents homologades, mai peces dubtoses.</div>
                            </div>
                        </div>
                        <div class="perque-item">
                            <div class="perque-ico">🏍️</div>
                            <div>
                                <div class="perque-titol">Moto de cortesia</div>
                                <div class="perque-desc">Si la reparació s'allarga, et deixem moto per seguir rodant sense interrupcions.</div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr class="separador">

                <!-- CONTACTE -->
                <section class="seccio" id="contacte">
                    <p class="seccio-eyebrow">On som</p>
                    <h2 class="seccio-titol">Vine a veure'ns</h2>
                    <div class="contacte-grid">
                        <div class="contacte-item">
                            <div class="contacte-ico">📍</div>
                            <div>
                                <div class="contacte-label">Adreça</div>
                                <div class="contacte-valor">
                                    <a href="${CONFIG.URL_MAPS}" target="_blank">${CONFIG.ADRECA}</a>
                                </div>
                            </div>
                        </div>
                        <div class="contacte-item">
                            <div class="contacte-ico">📞</div>
                            <div>
                                <div class="contacte-label">Telèfon</div>
                                <div class="contacte-valor">
                                    <a href="tel:${CONFIG.TELEFON}">${CONFIG.TELEFON}</a><br>
                                    <a href="tel:${CONFIG.MOBIL}">${CONFIG.MOBIL}</a>
                                </div>
                            </div>
                        </div>
                        <div class="contacte-item">
                            <div class="contacte-ico">✉️</div>
                            <div>
                                <div class="contacte-label">Email</div>
                                <div class="contacte-valor">
                                    <a href="mailto:${CONFIG.EMAIL}">${CONFIG.EMAIL}</a>
                                </div>
                            </div>
                        </div>
                        <div class="contacte-item">
                            <div class="contacte-ico">🕐</div>
                            <div>
                                <div class="contacte-label">Horaris</div>
                                <div class="contacte-valor">
                                    ${CONFIG.HORA_1}<br>
                                    ${CONFIG.HORA_2}<br>
                                    ${CONFIG.HORA_3}
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="${CONFIG.WHATSAPP}" target="_blank" class="boto-whatsapp">
                        💬 Escriu-nos per WhatsApp
                    </a>
                </section>
            `;
        }


        /* ── 5. FOOTER ─────────────────────────────────────── */
        const footer = document.getElementById('footer');
        if (footer) {
            footer.innerHTML = `
                <footer class="footer">
                    <p class="footer-nom">${CONFIG.NOM}</p>
                    <p class="footer-slogan">${CONFIG.SLOGAN}</p>
                    <div class="footer-xarxes">
                        <a href="${CONFIG.INSTAGRAM}" target="_blank">Instagram</a>
                        <a href="${CONFIG.FACEBOOK}" target="_blank">Facebook</a>
                        <a href="mailto:${CONFIG.EMAIL}">Email</a>
                    </div>
                    <p style="font-size:13px; color: var(--gris);">
                        <a href="${CONFIG.URL_MAPS}" target="_blank">${CONFIG.ADRECA}</a>
                    </p>
                    <p class="footer-poweredby">
                        Powered by <a href="https://www.altervector.com" target="_blank">AlterVector</a>
                    </p>
                </footer>
            `;
        }


        /* ── 6. NAVBAR SCROLL ──────────────────────────────── */
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
        });

        document.addEventListener('contextmenu', (e) => e.preventDefault());

    }; // fi inicialitzar

    if (document.readyState === "complete" || document.readyState === "interactive") {
        inicialitzar();
    } else {
        document.addEventListener("DOMContentLoaded", inicialitzar);
    }

})();
