/* ============================================================
   CONFIG.JS - Configuració global del projecte
   Canvia aquí les dades per adaptar-lo al negoci
   ============================================================ */

const CONFIG = {

    // 1. NEGOCI
    NOM:            "Taller Adri",
    LOGO:           "logo/logoAGtrans.png",
    SLOGAN:         "Especialistes en motos. Terrassa.",
    TELEFON:        "93 000 00 00",
    MOBIL:          "600 000 000",
    EMAIL:          "info@talleradri.com",
    ADRECA:         "Carrer de la Mecànica, 42, 08220 Terrassa, Barcelona",
    INSTAGRAM:      "https://www.instagram.com/talleradri",
    FACEBOOK:       "https://www.facebook.com/talleradri",
    EMAIL_SUPORT:   "suport@altervector.com",

    // 2. RUTES
    REPO_URL:       "https://altervector.github.io/TallerAdri/",
    BASE_URL:       "./",
    BASE_WORKER:    "",
    URL_OFICIAL:    "",
    ASSETS:         "https://avsets.pages.dev/",
    URL_MAPS:       "https://www.google.com/maps/search/?api=1&query=Taller+Adri+Terrassa",
    URL_RESSENYES:  "https://www.google.com/maps/search/?api=1&query=Taller+Adri+Terrassa",

    // 3. IMATGES (placeholders fins que hi hagi fotos reals)
    LOGO:           "logo/logoAGtrans.png",         // ← canviar pel logo real
    HERO_BG:        "images/agora/hero-agora.png",  // ← canviar per foto taller/moto
    BACKGROUND:     "images/agora/background-agora.jpg", // ← canviar per textura/fons

    // 4. TEXTOS
    ANYS_EXPERIENCIA: "15",
    MOTOS_REPARADES:  "2.000",
    CLIENTS:          "1.200",
    ESTRELLES:        "5",

    QUI_DESC: "Al Taller Adri som especialistes en manteniment, reparació i restauració de motocicletes. Més de 15 anys a Terrassa cuidant la teva moto amb la mateixa passió amb la qual tu la condueixes. Treballem amb totes les marques i models, des de scooters fins a motos de gran cilindrada.",

    HORA_1: "Dilluns a dijous: 09:00 – 13:00 | 15:00 – 19:00",
    HORA_2: "Divendres: 09:00 – 13:00 | 15:00 – 18:00",
    HORA_3: "Dissabte i diumenge: Tancat",

    // 5. SERVEIS (graella)
    SERVEIS: [
        { ico: "🔧", titol: "Manteniment general",    desc: "Canvi d'oli i filtre, revisió de nivells, neteja de carburador i preparació per a ITV." },
        { ico: "🛑", titol: "Frens",                  desc: "Canvi de pastilles i sabates, rectificació de discs i purga completa del sistema." },
        { ico: "⛓️", titol: "Transmissió i cadena",   desc: "Ajust i lubricació de cadena, canvi del kit d'arrossegament i revisió de la caixa de canvis." },
        { ico: "⚡", titol: "Sistema elèctric",       desc: "Revisió i canvi de bateria, diagnòstic amb escàner ECU i reparació de llums i connexions." },
        { ico: "🏍️", titol: "Suspensió i direcció",  desc: "Servei de suspensió davantera, ajust de direcció i revisió de rodaments i amortidors." },
        { ico: "💨", titol: "Sistema d'escapament",   desc: "Revisió de fugues, reparació i instal·lació d'escapaments esportius o personalitzats." },
        { ico: "🔘", titol: "Pneumàtics",             desc: "Canvi de llantes, equilibrat, alineació i reparació de punxades." },
        { ico: "⚙️", titol: "Motor",                  desc: "Afinació general, reparació de cilindre, pistó, vàlvules i ajust de distribució." },
        { ico: "🎨", titol: "Personalització",        desc: "Instal·lació d'accessoris, canvis estètics amb vinils i carenats, i modificacions." },
    ],

    // 6. SEGURETAT
    SITIOS_SEGUROS: ["altervector.com", "pages.dev", "altervector.github.io", "localhost", "127.0.0.1"],
};
