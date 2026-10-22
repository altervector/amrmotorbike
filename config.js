/* ============================================================
   CONFIG.JS - AMR MotorBike (pàgina principal)
   Esquelet comú (mateix ordre a totes les webs):
   1 Negoci · 2 Rutes · 3 Imatges · 4 Navbar · 5 Hero · 6 Qui som
   7 Contingut del projecte · 8 On som · 9 Seguretat · 10 Altres
   ============================================================ */

const CONFIG = {

// ═══ 1. NEGOCI ═══════════════════════════════════════════════════════════
COOK:           "cookies_amr",
NOM:            "AMR MotorBike",
LOGO:           "logo/logoAMR.png",
LOGO_T:         "logo/logo-nouAMR.png",
SLOGAN:         "Especialistas en motos. Sabadell.",
TELEFON:        "669 66 98 77",        TELEFON_LABEL:   "Teléfono",      TELEFON_ICO: "📞",
MOBIL:          "669669877",
WHATSAPP:       "https://wa.me/34669669877?text=Hola%20AMR,%20soy%20[Nombre],%20tengo%20una%20[Marca/Modelo]%20y%20necesito%20[Avería%20o%20servicio].", WHATSAPPLABEL:"💬 Escríbenos por WhatsApp",
EMAIL:          "info@amrmotorbike.com",    EMAIL_LABEL:"e-Mail",        EMAIL_ICO: "✉️",
ADRECA:         "C/ Vila Cinca, 97, 08208 Sabadell, Barcelona",
ADRECA_LABEL:   "Dirección",
ADRECA_ICO:     "📍",
HORA_0:         "Horario",   HR: "🕐",
HORA_1:         "Lunes a Jueves: 8:30 – 13:00 | 15:00 – 18:00",
HORA_2:         "Viernes: 08:30 – 16:00",
HORA_3:         "Sábado y Domingo: Cerrado",
INSTAGRAM:      "https://www.instagram.com/amrmotorbike",
FACEBOOK:       "",
EMAIL_SUPORT:   "info@alterwebstudio.com",
//-------------------------------------------------------------------------------------------------------------------------

// ═══ 2. RUTES ════════════════════════════════════════════════════════════
REPO_URL:       "https://altervector.github.io/amrmotorbike/",
BASE_URL:       "./",
BASE_WORKER:    "https://amrmotorbike.altervector.workers.dev",
URL_OFICIAL:    "https://www.amrmotorbike.com",
ASSETS:         "https://avsets.pages.dev/",
// Cloudinary: fotos de les motos d'ocasió noves (el panell admin les puja aquí)
CLOUDINARY_CLOUD: "deopqx65a",
CLOUDINARY_KEY:   "786648346725765",   // ← API Key (la pública, NO el secret) del compte Cloudinary
CLOUDINARY_OCA:   "https://res.cloudinary.com/deopqx65a/image/upload/Ocasion/",
                               
URL_MAPS:       "https://www.google.com/maps/search/?api=1&query=AMR+MotorBike&query_place_id=ChIJD7yoLgCVpBIRwGk2PRTlhQA",
URL_RESSENYES:  "https://g.page/r/CcBpNj0U5YUAEBM/review",
//-------------------------------------------------------------------------------------------------------------------------

// ═══ 3. IMATGES ══════════════════════════════════════════════════════════
BACKGROUND:      "", // ← canviar en el css .html{}
BLOC_HERO:       "images/amrmotorbike/hero-amrmotorbike.webp", 
QR:              "qr/qr-amrmotorbike.png",
//-------------------------------------------------------------------------------------------------------------------------

// ═══ 4. NAVBAR ═══════════════════════════════════════════════════════════
NAV_INICI:          "Inicio",
NAV_NOSALTRES:      "Nosotros",
NAV_SERVEIS:        "Servicios",
NAV_OCA:            "Ocasión",
NAV_PXQ:            "¿Por qué AMR?",
NAV_CONTACTE:       "Contacto",


         //

// ═══ 5. HERO ═════════════════════════════════════════════════════════════
HERO_EYEBROW:       "",
HERO_TITOL:         "",
HERO_BOTO_PRI:      "📞 Llámanos",
HERO_BOTO_SEC:      "Nuestros servicios",
HERO_BOTO_3:        "Motos de Ocasión",
//-------------------------------------------------------------------------------------------------------------------------

// ═══ 6. QUI SOM ══════════════════════════════════════════════════════════
QUI_SOM:            "Quiénes somos...",
QUI_SOM_TIT:        "Pasión por las motos desde hace más de 20 años",
QUI_SOM_DESC:       "En el Taller AMR MotorBike somos especialistas en mantenimiento, reparación y restauración de motocicletas. Más de 20 años de experiencia en varias marcas del sector y en Sabadell, cuidando tu moto con la misma pasión con la que la conduces. Trabajamos con todas las marcas y modelos, desde scooters hasta motos de gran cilindrada.",


                                                //  STATS---------------------------------------------------------------------------------------------------------------

                                                    /*ANYS_EXPERIENCIA:   "+20",    ANYS_EXPERIENCIA2:   "Años de experiencia",
                                                    MOTOS_REPARADES:    "+2.000", MOTOS_REPARADES2:    "Motos reparadas",
                                                    CLIENTS:            "+1.200", CLIENTS2:            "Clientes satisfechos",
                                                    ESTRELLES:          "5 ",      ESTRELLES2:          "Valoración en Google",*/

                                                //-------------------------------------------------------------------------------------------------------------------------


// ═══ 7. CONTINGUT DEL PROJECTE (diferent a cada web) ═════════════════════

// ── 7.1 Serveis (graella) ──
QUE_FEM:            "Lo que hacemos",
QUE_FEM_SRV:        "Nuestros servicios",
QUE_FEM_OCA:        "MOTOS DE OCASION",


//-------------------------------------------------------------------------------------------------------------------------

// MAPS SERVEIS-------------------------------------------------------------------------------------------------------------------------
SERVEIS: [
{ ico: "🔧", titol: "Mantenimiento general",    desc: "Cambio de aceite y filtro, limpieza de sistemas de admisión, ajustes y reglajes." },
{ ico: "🛑", titol: "Frenos",                   desc: "Cambio de pastillas y discos de freno, mordazas, limpiezas circuito y cambio de líquidos." },
{ ico: "⛓️", titol: "Transmisión y cadena",     desc: "Ajuste y lubricación de cadena, cambio del kit de arrastre y revisión de la caja de velocidades." },
{ ico: "⚡", titol: "Sistema eléctrico",        desc: "Revisión y cambio de batería, diagnóstico con escáner ECU y reparación de luces y conexiones." },
{ ico: "🏍️", titol: "Suspensión y dirección",   desc: "Servicio de suspensión delantera, ajuste de dirección y revisión de rodamientos y amortiguadores." },
{ ico: "💨", titol: "Sistema de escape",        desc: "Revisión de fugas, reparación e instalación de escapes deportivos o personalizados." },
{ ico: "🔘", titol: "Neumáticos",               desc: "Cambio de llantas, equilibrado, alineación y reparación de pinchazos." },
{ ico: "⚙️", titol: "Motor",                    desc: "Ajuste general, reparaciones de todo tipos, fugas y reglajes, reparación de cilindro, pistón, válvulas y ajuste de distribución." },
{ ico: "🎨", titol: "Personalización",          desc: "Instalación de accesorios." },
],

// ── 7.2 Motos d'ocasió ──
OCASION: [
        // Les motos viuen ara al KV (el Worker les serveix a main.js). Aquest array queda buit; sota, només les plantilles comentades.
        // MOTOS ACTIVES (Exemples)


        /*{ id: "id0004", marca: "",      model: "",          preu: "",       cc: 0,   kw: 0,  any: "",     km: "",
        descripcio: "",
        fotos: ["id0004/1.webp", "id0004/2.webp", "id0004/3.webp", "id0004/4.webp", "id0004/5.webp"], venuda: false ,reservada: false },*/


        /*{ id: "id0005", marca: "",      model: "",          preu: "",       cc: 0,   kw: 0,  any: "",     km: "",
        descripcio: "",
        fotos: ["id0005/1.webp", "id0005/2.webp", "id0005/3.webp", "id0005/4.webp", "id0005/5.webp"], venuda: false ,reservada: false },*/


        /*{ id: "id0006", marca: "",      model: "",          preu: "",       cc: 0,   kw: 0,  any: "",     km: "",
        descripcio: "",
        fotos: ["id0006/1.webp", "id0006/2.webp", "id0006/3.webp", "id0006/4.webp", "id0006/5.webp"], venuda: false  ,reservada: false},*/


        /*{ id: "id0007", marca: "",      model: "",          preu: "",       cc: 0,   kw: 0,  any: "",     km: "",
        descripcio: "",
        fotos: ["id0007/1.webp", "id0007/2.webp", "id0007/3.webp", "id0007/4.webp", "id0007/5.webp"], venuda: false  ,reservada: false},*/


        /*{ id: "id0008", marca: "",      model: "",          preu: "",       cc: 0,   kw: 0,  any: "",     km: "",
        descripcio: "",
        fotos: ["id0008/1.webp", "id0008/2.webp", "id0008/3.webp", "id0008/4.webp", "id0008/5.webp"], venuda: false ,reservada: false },*/


        /*{ id: "id0009", marca: "",      model: "",          preu: "",       cc: 0,   kw: 0,  any: "",     km: "",
        descripcio: "",
        fotos: ["id0009/1.webp", "id0009/2.webp", "id0009/3.webp", "id0009/4.webp", "id0009/5.webp"], venuda: false ,reservada: false },*/


        /*{ id: "id0010", marca: "",      model: "",          preu: "",       cc: 0,   kw: 0,  any: "",     km: "",
        descripcio: "",
        fotos: ["id0010/1.webp", "id0010/2.webp", "id0010/3.webp", "id0010/4.webp", "id0010/5.webp"], venuda: false  ,reservada: false},*/


        // CARD FIXA AL FINAL
    ],
 //-------------------------------------------------------------------------------------------------------------------------



// ── 7.3 Per què nosaltres ──
PXQ:        "¿ Por qué AMR MotorBike ?",
PXQ_DESC:   "El taller que tu moto se merece",

PXQ_BLOC1_TIT:          "Diagnóstico rápido",                    PXQ_BLOC1_emo:"⚡",
PXQ_BLOC1_DESC:         "Detectamos el problema en el mismo día y te informamos antes de tocar nada.",

PXQ_BLOC2_TIT:          "Recambios de calidad",                  PXQ_BLOC2_emo:"🔩",
PXQ_BLOC2_DESC:         "Trabajamos con piezas originales o equivalentes homologadas, nunca piezas dudosas.",

PXQ_BLOC3_TIT:          "Moto de cortesía",                      PXQ_BLOC3_emo:"🏍️",
PXQ_BLOC3_DESC:         "Si la reparación se alarga, te dejamos una moto para seguir rodando sin interrupciones.",
//-------------------------------------------------------------------------------------------------------------------------


// ═══ 8. ON SOM ═══════════════════════════════════════════════════════════
ON_SOM:            "Dónde estamos...",
ON_SOM_TIT:        "Ven a vernos",

//-------------------------------------------------------------------------------------------------------------------------

// ═══ 9. SEGURETAT ════════════════════════════════════════════════════════
//SITIOS_SEGUROS: ["alterwebstudio.com", "pages.dev", "altervector.github.io", "amrmotorbike.es","amrmotorbike.com"],
SITIOS_SEGUROS: ["alterwebstudio.com", "pages.dev", "altervector.github.io", "amrmotorbike.es","amrmotorbike.com", "localhost", "127.0.0.1"],

// ═══ 10. ALTRES ══════════════════════════════════════════════════════════
// (res en aquest projecte)
};

// Ruta completa d'una foto d'ocasió: tots els noms ("0004_1.webp") són a la carpeta Ocasion de Cloudinary
function rutaFotoOcasio(foto) {
    return CONFIG.CLOUDINARY_OCA + foto;
}