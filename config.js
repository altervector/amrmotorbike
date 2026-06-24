/* ============================================================
   CONFIG.JS - Configuració global del projecte
   Canvia aquí les dades per adaptar-lo al negoci
   ============================================================ */

const CONFIG = {

    // 1. NEGOCI
    NOM:            "Adri Motors",
    LOGO:           "logo/logoAMtrans.png",
    SLOGAN:         "Especialistes en motos. Terrassa.",
    TELEFON:        "93 000 00 00",
    MOBIL:          "600 000 000",
    EMAIL:          "info@adrimotors.com",
    ADRECA:         "Carrer de la Mecànica, 42, 08220 Terrassa, Barcelona",
    INSTAGRAM:      "https://www.instagram.com/adrimotors",
    FACEBOOK:       "https://www.facebook.com/adrimotors",
    EMAIL_SUPORT:   "suport@altervector.com",

    // 2. RUTES
    REPO_URL:       "https://altervector.github.io/adrimotors/",
    BASE_URL:       "./",
    BASE_WORKER:    "",
    URL_OFICIAL:    "",
    ASSETS:         "https://avsets.pages.dev/",
    URL_MAPS:       "https://www.google.com/maps/search/?api=1&query=Taller+Adri+Terrassa",
    URL_RESSENYES:  "https://www.google.com/maps/search/?api=1&query=Taller+Adri+Terrassa",

    // 3. IMATGES 
    BACKGROUND:      "", // ← canviar en el css .html{}
    BLOC_HERO:       "images/adrimotors/hero-adrimotors.jpg", 
    
    BLOC1:           "",
    BLOC2:           "",
    BLOC3:           "",
    BLOC4:           "",
    QR:              "qr/qr-adrimotors.png",

    // 4. TEXTOS
    HERO_BOTO_PRI:        "📞 Truca'ns ara",
    HERO_BOTO_SEC:        "Els nostres serveis eis",

    ANYS_EXPERIENCIA: "15",
    MOTOS_REPARADES:  "2.000",
    CLIENTS:          "1.200",
    ESTRELLES:        "5",

    QUI_DESC: "Al Taller Adri som especialistes en manteniment, reparació i restauració de motocicletes. Més de 15 anys a Terrassa cuidant la teva moto amb la mateixa passió amb la qual tu la condueixes. Treballem amb totes les marques i models, des de scooters fins a motos de gran cilindrada.",

    HORA_1: "Dilluns a dijous: 09:00 – 13:00 | 15:00 – 19:00",
    HORA_2: "Divendres: 09:00 – 13:00 | 15:00 – 18:00",
    HORA_3: "Dissabte i diumenge: Tancat",



        // 2.3 RUTES Textos
    
    SECCIO_TITOL:    "Els nostres Menús",

    BLOC1_TITOL:     "Menú Diari",
    BLOC1_DESC:      "De dilluns a divendres al migdia. Primer, segon, postre i beguda.",

    BLOC2_TITOL:     "Menú Cap de Setmana",
    BLOC2_DESC:      "Dissabte i diumenge. Una selecció especial per gaudir en família.",

    BLOC3_TITOL:     "Menú Grups",
    BLOC3_DESC:      "Per a celebracions i esdeveniments. Per a un mínim de 10 persones i amb reserva concertada.",

    BLOC4_TITOL:     "",
    BLOC4_DESC:      "",

    QUI_SOM:         "Qui som...",
    QUI_DESC:        "El nostre local està dedicat als serveis de restauració. Oferim cuina mediterrània i espanyola, incloent esmorzars, dinars, sopars i tapes, amb opcions per menjar al local, a la terrassa o per emportar. Us brindem un menjar de qualitat, ambient acollidor i servei amable.",

    HORA_1:          "Dilluns a dijous: 08:00 – 23:00h",
    HORA_2:          "Divendres i dissabte: 08:00 – 24:00h",
    HORA_3:          "Diumenge: 09:00 - 23:00h",

    RESERVES:        "Fes la teva Reserva",

    // 5. SERVEIS (graella)
    SERVEIS: [
        { ico: "🔧", titol: "Manteniment general",    desc: "Canvi d'oli i filtre, revisió de nivells, neteja de carburador i preparació per a ITV." },
        { ico: "🛑", titol: "Frens",                  desc: "Canvi de pastilles i sabates, rectificació de discs i purga completa del sistema." },
        { ico: "⛓️", titol: "Transmissió i cadena",   desc: "Ajust i lubricació de cadena, canvi del kit d'arrossegament i revisió de la caixa de canvis." },
        { ico: "⚡", titol: "Sistema elèctric",       desc: "Revisió i canvi de bateria, diagnòstic amb escàner ECU i reparació de llums i connexions." },
        { ico: "🏍️", titol: "Suspensió i direcció",   desc: "Servei de suspensió davantera, ajust de direcció i revisió de rodaments i amortidors." },
        { ico: "💨", titol: "Sistema d'escapament",   desc: "Revisió de fugues, reparació i instal·lació d'escapaments esportius o personalitzats." },
        { ico: "🔘", titol: "Pneumàtics",             desc: "Canvi de llantes, equilibrat, alineació i reparació de punxades." },
        { ico: "⚙️", titol: "Motor",                  desc: "Afinació general, reparació de cilindre, pistó, vàlvules i ajust de distribució." },
        { ico: "🎨", titol: "Personalització",        desc: "Instal·lació d'accessoris, canvis estètics amb vinils i carenats, i modificacions." },
    ],

    // 6. SEGURETAT
    SITIOS_SEGUROS: ["altervector.com", "pages.dev", "altervector.github.io", "localhost", "127.0.0.1"],
};
