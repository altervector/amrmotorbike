(function() {

    const now = new Date().getTime();

    // ─── 1. TREURE EL VEL ────────────────────────────────
    // Fora de tot el que depèn del config: així, encara que
    // el config falli, la pàgina mai es queda en blanc.
    const mostrarPagina = () => {
        document.body.style.opacity = "1";
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mostrarPagina);
    } else {
        mostrarPagina();
    }

    // Fallback: si algo falla, mostrar a los 2 segundos igual
    setTimeout(mostrarPagina, 2000);


    // ─── 2. TOT EL QUE DEPÈN DEL CONFIG ──────────────────
    // Dins una funció, per cridar-la quan CONFIG ja existeixi
    const iniciar = () => {

        // SEGURETAT
        if (CONFIG.SITIOS_SEGUROS && CONFIG.SITIOS_SEGUROS.length > 0) {
            const esSitioSeguro = CONFIG.SITIOS_SEGUROS.some(s =>
                window.location.hostname.includes(s));
            if (!esSitioSeguro) {
                document.documentElement.innerHTML = "";
                if (CONFIG.URL_OFICIAL) window.location.href = CONFIG.URL_OFICIAL;
                return;
            }
        }

        const base = CONFIG.BASE_URL;

        // CSS
        const css = document.createElement("link");
        css.rel   = "stylesheet";
        css.href  = base + "estils.css?v=" + now;
        document.head.appendChild(css);

        // SCRIPTS
        const moduls = window.MODULS || [];
        moduls.forEach(file => {
            const s  = document.createElement("script");
            s.src    = base + file + "?v=" + now;
            s.async  = false;
            document.head.appendChild(s);
        });
    };


    // ─── 3. CARREGAR EL CONFIG (amb anti-caché) ──────────
    if (typeof CONFIG !== 'undefined') {
        // El config ja hi és (HTML antic amb <script src="config.js">)
        iniciar();
    } else {
        const c  = document.createElement("script");
        c.src    = "config.js?v=" + now;
        c.onload = iniciar;
        document.head.appendChild(c);
    }

})();
/* ============================================================
   LOADER.JS - Carregador universal de pàgines
   No tocar — funciona igual per a tots els projectes
   ============================================================ */

/*(function() {
    if (typeof CONFIG === 'undefined') return;

    // 1. SEGURETAT
    if (CONFIG.SITIOS_SEGUROS && CONFIG.SITIOS_SEGUROS.length > 0) {
        const esSitioSeguro = CONFIG.SITIOS_SEGUROS.some(s =>
            window.location.hostname.includes(s));
        if (!esSitioSeguro) {
            document.documentElement.innerHTML = "";
            if (CONFIG.URL_OFICIAL) window.location.href = CONFIG.URL_OFICIAL;
            return;
        }
    }

    const now  = new Date().getTime();
    const base = CONFIG.BASE_URL;

    // 2. CSS
    const css = document.createElement("link");
    css.rel   = "stylesheet";
    css.href  = base + "estils.css?v=" + now;
    document.head.appendChild(css);

    // 3. SCRIPTS
    const moduls = window.MODULS || [];
    moduls.forEach(file => {
        const s  = document.createElement("script");
        s.src    = base + file + "?v=" + now;
        s.async  = false;
        document.head.appendChild(s);
    });

    // 4. TREURE EL VEL
    const mostrarPagina = () => {
        document.body.style.opacity = "1";
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mostrarPagina);
    } else {
        mostrarPagina();
    }

    // Fallback: si algo falla, mostrar a los 2 segundos igual
    setTimeout(mostrarPagina, 2000);


})();
*/