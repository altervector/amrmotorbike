/* ============================================================
   LOGIN.JS — Gestió del modal de login per a l'Admin
   ============================================================ */

(function() {

    // Injectar l'estructura del modal de login si no existeix
    if (!document.getElementById('modal-login')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="modal-login" style="display:none; position:fixed; top:0; left:0;
                width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999;
                align-items:center; justify-content:center;">
                <div style="
                    background: #1a1a2e;
                    border: 1px solid #ff6600;
                    padding: 40px 30px;
                    width: 90%;
                    max-width: 320px;
                    text-align: center;
                    font-family: 'Segoe UI', sans-serif;">
                    
                    <p style="color:#ff6600; letter-spacing:2px; text-transform:uppercase;
                        font-size:12px; margin-bottom:20px;">Accés Restringit</p>
                    
                    <input id="login-input" type="text" placeholder="Contrasenya"
                        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                        style="width:100%; padding:10px; background:#0d0d1a; border:1px solid #444;
                        color:#eee; font-size:14px; outline:none; margin-bottom:12px;
                        text-align:center; letter-spacing:2px;
                        -webkit-text-security: disc;">
                    
                    <button id="login-boto"
                        style="width:100%; padding:10px; background:#2c3e35; color:#ff6600;
                        border:1px solid #ff6600; font-size:13px; letter-spacing:1px;
                        cursor:pointer; text-transform:uppercase;">
                        Entrar
                    </button>
                    
                    <p id="login-error" style="color:#e74c3c; font-size:12px;
                        margin-top:12px; min-height:18px;"></p>
                    
                    <button onclick="tancarModalLogin()"
                        style="margin-top:16px; background:none; border:none;
                        color:#555; font-size:12px; cursor:pointer; letter-spacing:1px;">
                        Cancel·lar
                    </button>
                </div>
            </div>
        `);
    }

    // Funcions globals per obrir/tancar
    window.obrirModalLogin = function() {
        if (sessionStorage.getItem('admin_clau')) {
            window.location.href = 'admin.html';
            return;
        }
        const modal = document.getElementById('modal-login');
        const input = document.getElementById('login-input');
        const error = document.getElementById('login-error');
        error.textContent = '';
        input.value = '';
        modal.style.display = 'flex';
        setTimeout(() => input.focus(), 100);
    };

    window.tancarModalLogin = function() {
        document.getElementById('modal-login').style.display = 'none';
    };

    // Lògica de verificació amb el Worker
    const fer_login = async () => {
        const input = document.getElementById('login-input');
        const error = document.getElementById('login-error');
        const clau = input.value.trim();
        if (!clau) return;

        error.textContent = '⏳ Verificant...';

        try {
            const res = await fetch(`${CONFIG.BASE_WORKER}/login?p=${encodeURIComponent(clau)}`);
            const resposta = res.ok ? await res.text() : '';
            if (resposta === 'OK') {
                sessionStorage.setItem('admin_clau', clau);
                tancarModalLogin();
                window.location.href = 'admin.html';
            } else if (resposta === 'HIDE' || resposta === 'SHOW') {
                // Contrasenyes de manteniment: el Worker ja ha canviat l'interruptor. Només es tanca el modal, sense missatge ni canvi de pàgina
                tancarModalLogin();
            } else {
                error.textContent = '❌ Clau incorrecta';
                input.value = '';
                input.focus();
            }
        } catch (e) {
            error.textContent = '❌ Error de connexió';
        }
    };

    // Esdeveniments: enllaça el botó Entrar i la tecla Enter amb fer_login
    const enllacarEsdeveniments = () => {
        const boto = document.getElementById('login-boto');
        const input = document.getElementById('login-input');
        if (boto) boto.addEventListener('click', fer_login);
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') fer_login();
            });
        }
    };

    // loader.js carrega aquest fitxer quan la pàgina ja està llegida (DOMContentLoaded ja ha passat),
    // així que si ja no estem "loading" cal enllaçar-ho ara mateix en lloc d'esperar l'esdeveniment
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enllacarEsdeveniments);
    } else {
        enllacarEsdeveniments();
    }

})();