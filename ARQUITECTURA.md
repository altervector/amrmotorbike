# ARQUITECTURA — AMR Motorbike

Mapa de context de la web. No conté codi: explica **qui fa què** i **com es connecta**.
Esborrany v4 (22/10/2026): el panell admin de motos d'ocasió ja està implementat i la secció 8 descriu com funciona. Les parts marcades com **(pendent de verificar)** encara no s'han revisat sobre el codi real.

---

## 1. Idea general

- Web estàtica en HTML/CSS/JS pur, desplegada a Cloudflare Pages.
- **`config.js` és la font única de veritat**: dades del client, URLs, textos i arrays. Per canviar contingut, es toca només `config.js`. **Excepció: les motos d'ocasió**, que viuen al KV de Cloudflare i es gestionen des del panell admin (secció 8). `CONFIG.OCASION` a `config.js` és ara un array buit (només hi queden les plantilles comentades); `main.js` l'omple amb el que respon el Worker.
- Els mòduls no tenen dades pròpies: les llegeixen de `CONFIG`.
- Les peces que són iguals o molt semblants en altres webs són **custom elements** (web components) i viuen en fitxers propis.
- El contingut propi d'AMR el construeix `main.js`.

---

## 2. Fitxers

### Pàgines HTML
| Fitxer | Funció |
|---|---|
| `index.html` | Pàgina principal. Defineix `window.MODULS` i carrega `loader.js` |
| `admin.html` | **Panell admin de motos d'ocasió** (secció 8). Pàgina pròpia: carrega `config.js` i `login.js` directament, sense `loader.js`, i porta el seu CSS dins el mateix fitxer. Té `noindex` |
| `migrar-fotos.html` | **Temporal, d'un sol ús**: va servir per moure les fotos velles d'`avsets` a Cloudinary i canviar-ne els noms al KV. Un cop fet, es reanomena amb el prefix `zzz` |
| `reset.html` | **Còpia i restauració de les dades** (interna, `noindex`, sense enllaços). Botó 1: descarrega les motos del KV a `dades-copia.json`. Botó 2: tria un `.json` (p. ex. `dades-inicial.json`) i el desa al KV (confirmació en 2 clics; el Worker en fa còpia a `DADES_BAK`). No toca `ULTIM_ID` (a mà al KV) ni les fotos de Cloudinary. Sense modal de login: cal entrar abans per la web i, a la mateixa pestanya, anar a `reset.html`. S'usa per a proves i demostracions; es pot treure del deploy o reanomenar amb `zzz` |
| `aviso-legal.html`, `cookies.html`, `privacitat.html` | Pàgines legals |
| `form-contacte.html` | Formulari de contacte (usa `form-contacte.js`) |

### Lògica general
| Fitxer | Funció |
|---|---|
| `loader.js` | Carregador universal. Veure secció 3 |
| `config.js` | Objecte `CONFIG` amb totes les dades i textos, més la funció `rutaFotoOcasio(foto)` (ruta completa d'una foto d'ocasió a Cloudinary) |
| `main.js` | Construeix el contingut central (hero i seccions). Demana les motos d'ocasió al Worker |
| `login.js` | Modal de login. Defineix `obrirModalLogin()` i `tancarModalLogin()`; verifica la contrasenya contra el Worker (`/login`) i, si és correcta, desa la clau a `sessionStorage` (`admin_clau`) i porta a `admin.html` |

### Peces comunes (custom elements)
| Etiqueta a `index.html` | Fitxer | Funció |
|---|---|---|
| `<navbar-comu>` | `navbar.js` | Barra de navegació |
| `<footer-comu>` | `footer.js` | Peu de pàgina |
| `<contacte-flotant-comu>` | `contacte-flotant.js` | Botons flotants de contacte |
| `<cookies-banner>` | `cookies-banner.js` | Bàner de cookies |
| `<modal-moto-comu>` | `modal-moto.js` | Fitxa ampliada d'una moto d'ocasió (llegeix `CONFIG.OCASION`) |

### Fora del repositori
| Peça | On viu | Funció |
|---|---|---|
| `worker.js` | Worker `amrmotorbike` a Cloudflare | Totes les rutes del servidor (secció 8) |
| `dades-inicial.json` | Còpia de seguretat de Carles | Array inicial de motos tal com ha de quedar al KV (`AMRMOTORBIKE/DADES`), amb els noms de foto nous |

### Estils, SEO i PWA
`estils.css`, `robots.txt`, `sitemap.xml`, `manifest.json`.

### Es poden ignorar
- `modal.md`: còpia de seguretat.
- `qr/`: redirecció perquè el codi QR segueixi sent vàlid.
- Tot el codi **comentat** o molt tabulat dins els fitxers JS: restes que no s'han esborrat de moment (inclosa la versió antiga comentada al final de `worker.js`).

---

## 3. Ordre de càrrega

1. `index.html` defineix al `<head>`:
   `window.MODULS = ["cookies-banner.js", "navbar.js", "footer.js", "contacte-flotant.js", "modal-moto.js", "login.js", "main.js"]`
   i després carrega `loader.js`.
2. `loader.js` **treu el vel d'opacitat primer** (`DOMContentLoaded` + fallback de 2 s), abans de dependre de res, perquè la pàgina mai quedi en blanc.
3. `loader.js` carrega `config.js?v=<timestamp>` (anti-caché) i, quan s'ha carregat (`onload`), executa `iniciar()`.
4. `iniciar()`:
   - Comprova la seguretat (`CONFIG.SITIOS_SEGUROS` i `CONFIG.URL_OFICIAL`).
   - Carrega `estils.css`.
   - Carrega cada mòdul de `MODULS` **en ordre** (`async = false`), tots amb `CONFIG.BASE_URL` i anti-caché.
5. `main.js` va **l'últim** perquè els elements comuns ja estiguin definits.

`config.js` **no** és a la llista `MODULS`: el carrega `loader.js` pel seu compte.

**Important:** els mòduls es carreguen quan la pàgina ja ha acabat de llegir-se, així que l'esdeveniment `DOMContentLoaded` **ja ha passat**. Un mòdul que vulgui enllaçar esdeveniments ha de comprovar `document.readyState` (a `login.js` va ser la causa que el botó Entrar no funcionés des del logo; arreglat). A `admin.html`, en canvi, `login.js` es carrega durant la lectura de la pàgina i l'esdeveniment encara arriba.

---

## 4. Estructura del `<body>` de `index.html`

| Peça | Qui la dibuixa |
|---|---|
| `<navbar-comu>` | `navbar.js` |
| `<div id="hero">` | `main.js` |
| `<div id="seccions">` | `main.js` |
| `<footer-comu>` | `footer.js` |
| `<contacte-flotant-comu>` | `contacte-flotant.js` |
| `<cookies-banner>` | `cookies-banner.js` |
| `<modal-moto-comu>` | `modal-moto.js` |
| Script GoatCounter (visites) | Script propi, `async`, fora del loader |

`<div id="stats">` està comentat i no es fa servir.

---

## 5. Què fa `main.js`

Omple els contenidors que ja existeixen a `index.html` amb `innerHTML`. No crea contenidors nous.

1. **Pulsació llarga al logo (1,5 s)** → crida `obrirModalLogin()` si existeix.
2. **Hero** (`#hero`): imatge, logo i botons (trucar i enllaços a seccions).
3. **Motos d'ocasió des del Worker:** abans de construir les seccions, demana les motos a `CONFIG.BASE_WORKER` (GET `/`, màxim 3 s). Si respon amb un array, aquest passa a ser `CONFIG.OCASION`. Si falla o triga massa, `CONFIG.OCASION` queda buit i la secció d'ocasió surt sense targetes (la resta de la web es construeix igual).
4. **Seccions** (`#seccions`), en aquest ordre:
   - Qui som (`#qui-som`)
   - Serveis (`#serveis`): targetes generades amb `CONFIG.SERVEIS`
   - Ocasió (`#ocasion`): targetes generades amb `CONFIG.OCASION`
   - Per què nosaltres (`#perque`): tres blocs
   - Franja de marques (marquee)
   - Contacte (`#contacte`): adreça, telèfon, correu, horari, WhatsApp i enllaç al formulari
5. **Bloqueja el menú contextual** (clic dret) a tota la pàgina.

Les ancores del menú (`#inici`, `#qui-som`, `#serveis`, `#ocasion`, `#perque`, `#contacte`) corresponen als `id` que crea `main.js`.

### Estructura de les entrades de `OCASION` (a l'array del KV)
Té **dos tipus d'entrada**:
- **Moto:** `id` (p. ex. `id0004`), `marca`, `model`, `preu`, `cc`, `kw`, `any`, `km`, `descripcio`, `fotos[]` (5 noms, p. ex. `0004_1.webp`; els buits són `0000_1.webp`), i els booleans `venuda` / `reservada` (banner a la targeta; si cap és cert, la moto està en venda).
- **Targeta especial "vull vendre la meva moto"** (`id9999`): té `titol`, `subtitol`, `textAccio1`, `textAccio2` i una foto (`9999_1.webp`). Es distingeix perquè **té `titol`**. Va dins de l'array, sempre al final.

Cada targeta crida `obrirModalMoto(idx)` amb el seu índex dins l'array. Aquesta funció viu a `modal-moto.js`.

**Fotos:** tots els noms es resolen amb `rutaFotoOcasio(foto)`, que els posa darrere de `CONFIG.CLOUDINARY_OCA` (carpeta `Ocasion` del cloud `deopqx65a`). Ja no es fa servir `avsets.pages.dev` per a les motos.

---

## 6. Punts fràgils

- **`main.js` i el logo:** `document.querySelector('.navbar-logo img')` no té comprovació de `null`. Si el logo encara no existeix quan s'executa `main.js`, falla i el hero i les seccions no es pinten. Ara funciona perquè `navbar.js` carrega abans.
- **Si `config.js` falla** (sintaxi o no es troba): `iniciar()` no s'executa, així que no hi ha CSS ni mòduls. La pàgina es veu, però sense estils ni contingut.
- **Si el Worker falla:** la secció d'ocasió queda buida (no hi ha cap recanvi a `config.js`, decisió deliberada: millor res que dades velles).
- **Control de seguretat:** si el domini no és a `CONFIG.SITIOS_SEGUROS`, la pàgina es buida. Si en un domini nou o de previsualització es queda en blanc, mirar-ho primer.
- **Marquee de marques:** rutes i noms escrits a mà dins `main.js`, amb la llista duplicada per l'efecte de bucle. És l'única part que no ve de `config.js`.

---

## 7. Per buscar errors

1. Obrir la consola del navegador (F12 → Console) i copiar el missatge d'error.
2. Dir què s'esperava que passés.
3. Segons aquest mapa, identificar el fitxer implicat i enganxar només aquest (o aquests dos).

Regla ràpida:
- Falla contingut propi d'AMR → `main.js` (i `config.js` per a les dades).
- Falla una peça comuna → el seu mòdul (i pot afectar altres webs).
- No carrega res o es veu sense estils → `loader.js` / `config.js`.
- Pàgina en blanc en un domini nou → `SITIOS_SEGUROS`.
- Falla el panell admin, el desat o les fotos → `admin.html` i `worker.js`.
- No surten les motos d'ocasió → respondre el Worker? (obrir `https://amrmotorbike.altervector.workers.dev/` al navegador: ha de mostrar l'array).

---

## 8. Panell admin de motos d'ocasió (implementat)

**Objectiu:** que el client gestioni ell mateix les motos d'ocasió (afegir, editar, eliminar, marcar com a reservada o venuda i pujar fotos) des d'un panell amb login, sense tocar codi.

### Peces i com es connecten
- **Web pública** (`main.js`) → llegeix l'array del Worker (GET `/`).
- **Panell** (`admin.html`) → llegeix el mateix array i el desa amb POST `/` passant la clau d'admin.
- **Worker** `amrmotorbike` → l'únic que parla amb el KV i que signa les pujades a Cloudinary.
- **KV** (binding `KV_DATA`) → les dades.
- **Cloudinary** → les fotos. El navegador les puja **directament** a Cloudinary; el Worker només signa la pujada (el secret no surt mai del Worker).

### Rutes del Worker
| Ruta | Mètode | Clau d'admin | Què fa |
|---|---|---|---|
| `/` | GET | no | Torna l'array de motos (`[]` si no n'hi ha) |
| `/` | POST | **sí** (`X-Admin-Key`) | Comprova que el cos és un array, copia `DADES` a `DADES_BAK` i escriu `DADES` |
| `/login` | GET `?p=` | — | Compara la clau amb `ADMIN_PASS`: `OK` o 401 |
| `/nou-id` | POST | **sí** | Fa pujar el comptador `ULTIM_ID` i torna la ID nova (`id0004`...). Si la clau `ULTIM_ID` no existeix, dona error 500 en lloc d'inventar-se una ID |
| `/sign-foto` | POST | **sí** | Torna la signatura per pujar una foto (`moto` + `num` 1–5 → `public_id` `Ocasion/0004_1`, `asset_folder` `Ocasion`) |
| `/contacte` | POST | no | Formulari de contacte (Resend) |
| `/visites` | GET | no | Comptador de visites (GoatCounter) |

### KV i secrets
- **Claus del KV:** `AMRMOTORBIKE/ADMIN_PASS` (contrasenya), `AMRMOTORBIKE/DADES` (array actiu), `AMRMOTORBIKE/DADES_BAK` (còpia anterior, la crea el Worker en desar) i `AMRMOTORBIKE/ULTIM_ID` (últim número d'ID usat; només puja, així una ID eliminada no es torna a usar mai).
- **Secrets del Worker:** `RESEND_API_KEY`, `GOATCOUNTER_TOKEN` i `CLOUDI_SECRET` (API Secret de Cloudinary; ha de ser el de la mateixa clau que `CLOUDINARY_KEY`).
- **A `config.js` (públic):** `BASE_WORKER`, `CLOUDINARY_CLOUD`, `CLOUDINARY_KEY` (l'API Key, que no és secreta) i `CLOUDINARY_OCA` (adreça base de les fotos).

### Com funciona el panell
- **Entrada:** pulsació llarga de 1,5 s al logo → modal de login → clau a `sessionStorage` (només a la pestanya) → `admin.html`. Si algú obre `admin.html` sense clau, surt el modal de login i no es mostra cap moto. La pàgina és una còpia de la secció d'ocasió i del seu modal, amb camps editables.
- **Camps de la moto:** ID (només lectura), Marca, Model, Preu, Cilindrada, Potència, Any, Kilòmetres, Descripció, 5 fotos i estat (**En venta / Reservada / Vendida**, botons de ràdio: només un marcat).
- **Canvis pendents:** cada camp modificat porta la vora vermella i el botó es posa vermell amb "Pendientes (N)". Si es torna al valor original, el camp deixa de comptar. Una moto eliminada compta com un pendent més.
- **Desar:** un sol botó envia l'array complet (motos + targeta fixa al final) amb la clau; si va bé, els pendents tornen a zero.
- **Moto nova:** el botó obre el selector de fins a 5 fotos → el Worker dona la ID (`/nou-id`) → per a cada foto, el Worker la signa i el navegador la puja a Cloudinary amb el nom `0004_1.webp`... a la carpeta `Ocasion` → s'obre la fitxa nova amb els camps desbloquejats → s'omple i es desa una sola vegada amb els noms de foto. Les fotos que falten es queden amb la imatge buida (`0000_1.webp`). Mentre es pugen, el modal queda bloquejat.
- **WebP:** les fotos es pugen tal com són; Cloudinary les serveix en WebP perquè el nom acaba en `.webp`.
- **Eliminar:** botó al final del modal, amb confirmació amb un segon clic (caduca als 4 s). La ID no es reutilitza.
- **Targeta especial (id9999):** és dins de l'array, no es mostra al panell i es conserva sempre al final en desar.

### Proteccions contra errors (poka-yoke)
- El Worker no escriu res sense la clau, comprova que el cos sigui un array i guarda còpia a `DADES_BAK`.
- El panell no deixa guardar una moto sense **Marca** o **Model** (el preu no és obligatori, perquè una moto venuda pot no tenir-lo).
- Una moto nova que es deixa en blanc no es guarda.
- Avís sota el títol amb els canvis sense guardar, i el navegador pregunta si es tanca o recarrega la pàgina amb canvis pendents.
- Mentre es desa o es pugen fotos, els botons queden bloquejats.
- Si el Worker rebutja la clau (401), el panell esborra la sessió i ho diu.

### Notes tècniques
- **Cau del KV:** si en algun lloc es comprova la cau, ha de ser `if (dadesKV && dadesKV !== "0")`, perquè el text `"0"` compta com a cert a JavaScript. (El Worker actual de motos no la fa servir: torna `[]` si la clau no existeix.)
- **Context:** taller local de Sabadell amb poc trànsit. La propagació global del KV no és un problema.
- Els noms de foto es resolen sempre contra Cloudinary: `0001_1.webp` = ID sense el prefix `id` + `_` + número. `0000_1.webp` és la imatge buida i `9999_1.webp` la de la targeta fixa.

### Restaurar dades després de proves
`reset.html` (secció 2) fa servir només les rutes GET i POST `/` del Worker. Per tornar a l'estat inicial: restaurar el `.json`, posar `ULTIM_ID` al valor real a mà al KV, i esborrar a mà les fotos de prova de Cloudinary amb ID més alta (les que es reutilitzin amb el mateix nom se sobreescriuen soles; la CDN pot servir un temps la imatge vella).

### Limitacions conegudes / pendents
- **Només es pugen fotos en crear una moto.** Canviar les fotos d'una moto existent no està fet.
- **Eliminar una moto no esborra les seves fotos de Cloudinary.**
- **El botó "Nueva moto" és dins del modal:** cal obrir una moto abans; si no en queda cap, no es pot afegir.
- **Una sola còpia enrere** (`DADES_BAK`): dues desades seguides amb un error sobreescriuen la bona.
- **Seguretat:** la clau es compara en clar i `/login` la rep per URL (`?p=`); no hi ha límit d'intents. Per a un taller petit és acceptable, però és el punt a reforçar si cal.
- **Poka-yoke pendents:** que el Worker rebutgi arrays amb IDs repetides o entrades sense `id`; comprovar el tipus i la mida de les fotos abans de pujar-les; valorar fer el preu obligatori només per a les motos en venda.
- **Foto de la targeta fixa** i imatge buida: viuen a Cloudinary (`9999_1`, `0000_1`); si s'esborren, falten a tota la web.

---

## 9. Pendent de completar

- Detall de `navbar.js`, `footer.js`, `contacte-flotant.js`, `cookies-banner.js`.
- `form-contacte.html` / `form-contacte.js`: si fan servir el loader o carreguen els seus propis scripts.
- Llista real de claus de `CONFIG` (noms de variables).
- On viuen Airtable / Workers en altres projectes (a AMR no s'utilitza Airtable).

## 10. Neteja possible (no feta, requereix aprovació)

- Esborrar la versió antiga comentada al final de `loader.js` (i el "No tocar" de la capçalera).
- Esborrar els blocs comentats de `main.js` i les plantilles comentades de `config.js`.
- Moure les marques del marquee a `config.js`.
- Afegir comprovació de `null` al logo de `main.js`.
- Reanomenar `migrar-fotos.html` amb el prefix `zzz` un cop fet el pas.
