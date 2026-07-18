/* ============================================================
   MAIN.JS —  AMR MotorBike
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
                        <img src="${CONFIG.ASSETS}${CONFIG.LOGO_T}" alt="${CONFIG.NOM}">
                    </div>
                    <button class="navbar-hamburguesa">☰</button>
                    <ul class="navbar-menu">
                        <li><a href="#hero">${CONFIG.NAV_INI}</a></li>
                        <li><a href="#qui-som">${CONFIG.NAV_NOS}</a></li>
                        <li><a href="#serveis">${CONFIG.NAV_SER}</a></li>
                        <li><a href="#perque">${CONFIG.NAV_PXQ}</a></li>
                        <li><a href="#contacte">${CONFIG.NAV_CON}</a></li>
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

                        /*<span class="hero-eyebrow">Taller de Motocicletes</span>
                        <h1 class="hero-titol">${CONFIG.NOM}</h1>
                        <p class="hero-slogan">${CONFIG.SLOGAN}</p>*/
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
                        <div class="card">                        
                                    <img class="hero-pic" src="${CONFIG.ASSETS}${CONFIG.LOGO_T}" alt="${CONFIG.NOM}">    
                        </div>
                    
                        <div class="hero-botons">
                            <a href="tel:${CONFIG.TELEFON}" class="hero-boto-principal btn-balla">
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
                        <div class="stat-numero">${CONFIG.ANYS_EXPERIENCIA}</div>
                        <div class="stat-label">${CONFIG.ANYS_EXPERIENCIA2}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-numero">${CONFIG.MOTOS_REPARADES}</div>
                        <div class="stat-label">${CONFIG.MOTOS_REPARADES2}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-numero">${CONFIG.CLIENTS}</div>
                        <div class="stat-label">${CONFIG.CLIENTS2}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-numero">${CONFIG.ESTRELLES}⭐</div>
                        <div class="stat-label">${CONFIG.ESTRELLES2}</div>
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
                    <a href="tel:${CONFIG.TELEFON}" class="hero-boto-principal btn-balla"
                        style="display:inline-block; margin-top: 8px;">
                        ${CONFIG.HERO_BOTO_PRI}
                    </a>
                </section>

                <hr class="separador">

                <!-- SERVEIS -->
                <section class="seccio" id="serveis">
                    <p class="seccio-eyebrow">${CONFIG.QUE_FEM}</p>
                    <h2 class="seccio-titol">${CONFIG.QUE_FEM_SRV}</h2>
                    <div class="serveis-grid">
                        ${targetesServeis}
                    </div>
                </section>

                <hr class="separador">

                <!-- PER QUÈ NOSALTRES -->
                <section class="seccio" id="perque">
                    <p class="seccio-eyebrow">${CONFIG.PXQ}</p>
                    <h2 class="seccio-titol">${CONFIG.PXQ_DESC}</h2>
                    <div class="perque-grid">
                        <div class="perque-item">
                            <div class="perque-ico">${CONFIG.PXQ_BLOC1_emo}</div>
                            <div>
                                <div class="perque-titol">${CONFIG.PXQ_BLOC1_TIT}</div>
                                <div class="perque-desc">${CONFIG.PXQ_BLOC1_DESC}</div>
                            </div>
                        </div>
                        <div class="perque-item">
                            <div class="perque-ico">${CONFIG.PXQ_BLOC2_emo}</div>
                            <div>
                                <div class="perque-titol">${CONFIG.PXQ_BLOC2_TIT}</div>
                                <div class="perque-desc">${CONFIG.PXQ_BLOC2_DESC}</div>
                            </div>
                        </div>
                        <div class="perque-item">
                            <div class="perque-ico">${CONFIG.PXQ_BLOC3_emo}</div>
                            <div>
                                <div class="perque-titol">${CONFIG.PXQ_BLOC3_TIT}</div>
                                <div class="perque-desc">${CONFIG.PXQ_BLOC3_DESC}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr class="separador">

                <!-- CONTACTE -->
                <section class="seccio" id="contacte">
                    <p class="seccio-eyebrow">${CONFIG.ON_SOM}</p>
                    <h2 class="seccio-titol">${CONFIG.ON_SOM_TIT}</h2>
                    <div class="contacte-grid">
                        <div class="contacte-item">
                            <div class="contacte-ico">${CONFIG.AD}</div>
                            <div>
                                <div class="contacte-label">${CONFIG.ADRECALBL}</div>
                                <div class="contacte-valor">
                                    <a href="${CONFIG.URL_MAPS}" target="_blank">${CONFIG.ADRECA}</a>
                                </div>
                            </div>
                        </div>
                        <div class="contacte-item">
                            <div class="contacte-ico">${CONFIG.TL}</div>
                            <div>
                                <div class="contacte-label">${CONFIG.TELEFONLBL}</div>
                                <div class="contacte-valor">
                                    <a href="tel:${CONFIG.TELEFON}">${CONFIG.TELEFON}</a><br>
                                    <a href="tel:${CONFIG.MOBIL}">${CONFIG.MOBIL}</a>
                                </div>
                            </div>
                        </div>
                        <div class="contacte-item">
                            <div class="contacte-ico">${CONFIG.EM}</div>
                            <div>
                                <div class="contacte-label">${CONFIG.EMAILLBL}</div>
                                <div class="contacte-valor">
                                    <a href="mailto:${CONFIG.EMAIL}">${CONFIG.EMAIL}</a>
                                </div>
                            </div>
                        </div>
                        <div class="contacte-item">
                            <div class="contacte-ico">${CONFIG.HR}</div>
                            <div>
                                <div class="contacte-label">${CONFIG.HORA_0}</div>
                                <div class="contacte-valor">
                                    ${CONFIG.HORA_1}<br>
                                    ${CONFIG.HORA_2}<br>
                                    ${CONFIG.HORA_3}
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="${CONFIG.WHATSAPP}" target="_blank" class="boto-whatsapp btn-balla">
                       ${CONFIG.WHATSAPPLBL}
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
                        

                        <a href="${CONFIG.INSTAGRAM}" target="_blank">
                            <img src="${CONFIG.ASSETS}icon/Icoinsta.png" alt="Instagram" class="icona-app"> Instagram
                        </a>


                        


                        <a href="${CONFIG.URL_RESSENYES}}" target="_blank">
                                <img src="${CONFIG.ASSETS}icon/google.png" alt="Google" class="icona-app">Google
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
                        Powered by <a href="https://www.altervector.com" target="_blank">AlterVector</a>
                    </p>
                        <!-- #visites s'omple via Worker (BLOC 6) -->
                        <span id="visites"></span>

                </footer>
            `;
        }


        /* ── 6. NAVBAR SCROLL ──────────────────────────────── */
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
        });

        document.addEventListener('contextmenu', (e) => e.preventDefault());

                fetch(`${CONFIG.BASE_WORKER}/visites`)
                .then(r => r.json())       // converteix resposta a objecte JS
                .then(data => {
                const el = document.getElementById('visites');
                if (el && data.visites) {
                    el.textContent = `${data.visites} visites`;
                }
                })
                .catch(() => {}); // Si el Worker no respon → no passa res, el span queda buit


    }; // fi inicialitzar

    if (document.readyState === "complete" || document.readyState === "interactive") {
        inicialitzar();
    } else {
        document.addEventListener("DOMContentLoaded", inicialitzar);
    }

})();