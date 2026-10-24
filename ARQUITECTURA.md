# ARQUITECTURA — AMR Motorbike

Mapa de context de la web. No conté codi: explica **qui fa què** i **com es connecta**.
Esborrany v6 (24/10/2026): el panell admin de motos d'ocasió, la còpia/restauració (`reset.html`), l'historial de còpies (`AMRBAK/`) i el mode manteniment ja estan implementats i provats; la secció 8 descriu com funciona. El botó "Llámanos" del hero té ara una llum elèctrica (secció 5).

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
| `zzzmigrar-fotos.html` | **Ja usat**: va servir per moure les fotos velles d'`avsets` a Cloudinary i canviar-ne els noms al KV. Reanomenat amb `zzz`; es manté com a referència |
| `manteniment.html` | Pàgina que veu tothom quan el mode manteniment és actiu (secció 8). No carrega el loader ni cap mòdul |
| `reset.html` | **Còpia i restauració de les dades** (interna, `noindex`, sense enllaços). Botó 1: descarrega a `dades-copia.json` les motos del KV i `ULTIM_ID` (format `{ultimId, motos}`). Botó 2: tria un `.json` i el restaura al KV (confirmació en 2 clics; el Worker en guarda una còpia a `AMRBAK/…` com en qualsevol desat); accepta també un fitxer antic que sigui només l'array de motos (p. ex. `dades-inicial.json`), i llavors l'ID no es toca. No toca les fotos de Cloudinary. Sense modal de login: cal entrar abans per la web i, a la mateixa pestanya, anar a `reset.html`. S'usa per a proves i demostracions; es pot treure del deploy o reanomenar amb `zzz` |
| `aviso-legal.html`, `cookies.html`, `privacitat.html` | Pàgines legals |
| `form-contacte.html` | Formulari de contacte (usa `form-contacte.js`) |

### Lògica general
| Fitxer | Funció |
|---|---|
| `loader.js` | Carregador universal. Veure secció 3 |
| `config.js` | Objecte `CONFIG` amb totes les dades i textos, més la funció `rutaFotoOcasio(foto)` (ruta completa d'una foto d'ocasió a Cloudinary) |
| `main.js` | Construeix el contingut central (hero i seccions). Demana les motos d'ocasió al Worker |
| `login.js` | Modal de login. Defineix `obrirModalLogin()` i `tancarModalLogin()`; verifica la contrasenya contra el Worker (`/login`) i, si és correcta (`OK`), desa la clau a `sessionStorage` (`admin_clau`) i porta a `admin.html`. Si el Worker respon `HIDE` o `SHOW` (claus de manteniment), només tanca el modal |

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
| `dades-inicial.json` | Còpia de seguretat de Carles (a la repo; la web no la carrega) | Punt de partida per restaurar amb `reset.html`: motos i `ultimId` (format `{ultimId, motos}`, generat amb el botó 1). Un fitxer antic que sigui només l'array també s'accepta |

### Estils, SEO i PWA
`estils.css`, `robots.txt`, `sitemap.xml`, `manifest.json`.

`estils.css` guarda les variables de color (`--taronja`, `--negre`...) i tots els estils; el CSS és mobile-first, amb CSS niat natiu i un sol breakpoint (`min-width: 768px`).

### Es poden ignorar
- `modal.md`: còpia antiga del HTML del modal de la fitxa de moto; ja el genera `modal-moto.js`. No el fa servir cap fitxer.
- Les maquetes `prova-*.html` (`prova-blanc`, `prova-boto`, `prova-boto-capes`) són proves visuals independents i no formen part de la web.
- `qr/`: redirecció perquè el codi QR segueixi sent vàlid.
- Tot el codi **comentat** o molt tabulat dins els fitxers JS: restes que no s'han esborrat de moment.

---

## 3. Ordre de càrrega

1. `index.html` defineix al `<head>`:
   `window.MODULS = ["cookies-banner.js", "navbar.js", "footer.js", "contacte-flotant.js", "modal-moto.js", "login.js", "main.js"]`
   i després carrega `loader.js`.
2. `loader.js` **treu el vel d'opacitat primer** (`DOMContentLoaded` + fallback de 2 s), abans de dependre de res, perquè la pàgina mai quedi en blanc.
3. `loader.js` carrega `config.js?v=<timestamp>` (anti-caché) i, quan s'ha carregat (`onload`), executa `iniciar()`.
4. `iniciar()`:
   - Comprova la seguretat (`CONFIG.SITIOS_SEGUROS` i `CONFIG.URL_OFICIAL`).
   - **Comprova el mode manteniment:** demana `GET /manteniment` al Worker (màxim 2 s). Si respon `{"actiu": true}`, fa `location.replace('manteniment.html')` i no carrega res més. Si el Worker falla o no respon, la web es carrega igualment. Afecta totes les pàgines que fan servir el loader (`index`, `aviso-legal`, `cookies`, `privacitat`, `form-contacte`); no afecta `admin.html` ni `reset.html`.
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
2. **Hero** (`#hero`): imatge, logo (dins una `.card` inclinada en 3D) i, a sota, `.hero-botons` amb tres botons: el de trucar (`.boto-llum`) i dos d'enllaç a seccions (`.hero-boto-secundari`).
   - **Botó de trucar, `.boto-llum`:** píndola (radi 50) amb una llum elèctrica que corre per la vora. Són tres capes: `::before` = un quadrat amb degradat cònic que gira (cap taronja, cua llarga clara), `overflow: hidden` = el retalla a la forma del botó, `::after` = farciment fosc 2 px més petit que deixa veure només la vora. Té una resplendor que "respira" i s'atura amb `prefers-reduced-motion`. Només s'aplica a aquest botó: la classe antiga `.hero-boto-principal` (+ `.btn-balla`) continua al botó de "Qui som" i a "Enviar mensaje" del formulari, i al `main.js` el botó antic del hero queda comentat per poder tornar enrere.
   - **Botons secundaris:** vora fina transparent, radi 50, `width: 230px; min-width: max-content; margin-inline: auto`, de manera que queden centrats sota la card i el text no salta de línia.
   - **Ample de `.hero-botons`:** si no té `width: fit-content` i `margin: 0 auto`, s'estira fins a l'amplada del logo i el padding dels botons no es nota. L'ample final de cada botó es controla al mateix botó.
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
- **Si el Worker falla:** la secció d'ocasió queda buida (no hi ha cap recanvi a `config.js`, decisió deliberada: millor res que dades velles). Tampoc es detecta el mode manteniment (la web es mostra igualment).
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
- La web mostra la pàgina de manteniment sense voler → clau `AMRMOTORBIKE/MANTENIMENT` del KV a `0` (o la clau de `SHOW_PASS` al login d'`admin.html`).
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
| `/` | POST | **sí** (`X-Admin-Key`) | Comprova que el cos és un array i escriu el nou array a `AMRBAK/aammdd-hhmmss` (còpia) i a `DADES` (primer la còpia) |
| `/login` | GET `?p=` | — | Compara la clau amb `ADMIN_PASS` (`OK`), `HIDE_PASS` (activa el manteniment, respon `HIDE`) o `SHOW_PASS` (el desactiva, respon `SHOW`); si no, 401 |
| `/manteniment` | GET | no | Torna `{"actiu": true/false}` sense memòria cau |
| `/nou-id` | POST | **sí** | Fa pujar el comptador `ULTIM_ID` i torna la ID nova (`id0004`...). Si la clau `ULTIM_ID` no existeix, dona error 500 en lloc d'inventar-se una ID |
| `/ultim-id` | GET / POST | **sí** | GET torna el número d'`ULTIM_ID`; POST el fixa (enter 0–9998). L'única ruta que pot fer baixar el comptador; la fa servir `reset.html` |
| `/sign-foto` | POST | **sí** | Torna la signatura per pujar una foto (`moto` + `num` 1–5 → `public_id` `Ocasion/0004_1`, `asset_folder` `Ocasion`) |
| `/contacte` | POST | no | Formulari de contacte (Resend) |
| `/visites` | GET | no | Comptador de visites (GoatCounter) |

### KV i secrets
- **Claus del KV:** `AMRMOTORBIKE/ADMIN_PASS` (contrasenya d'admin), `AMRMOTORBIKE/HIDE_PASS` i `AMRMOTORBIKE/SHOW_PASS` (contrasenyes que activen i desactiven el manteniment), `AMRMOTORBIKE/MANTENIMENT` (`1` = actiu; la crea el Worker), `AMRMOTORBIKE/DADES` (array actiu), `AMRBAK/aammdd-hhmmss` (una còpia per cada desat; vegeu més avall) i `AMRMOTORBIKE/ULTIM_ID` (últim número d'ID usat; només puja en l'ús normal, així una ID eliminada no es torna a usar mai; només `reset.html` el pot fer baixar).
- **Secrets del Worker:** `RESEND_API_KEY`, `GOATCOUNTER_TOKEN` i `CLOUDI_SECRET` (API Secret de Cloudinary; ha de ser el de la mateixa clau que `CLOUDINARY_KEY`).
- **A `config.js` (públic):** `BASE_WORKER`, `CLOUDINARY_CLOUD`, `CLOUDINARY_KEY` (l'API Key, que no és secreta) i `CLOUDINARY_OCA` (adreça base de les fotos).

### Com funciona el panell
- **Entrada:** pulsació llarga de 1,5 s al logo → modal de login → clau a `sessionStorage` (només a la pestanya) → `admin.html`. Si algú obre `admin.html` sense clau (pestanya nova), surt el modal de login i no es mostra cap moto. Amb la web en manteniment no hi ha logo, així que l'entrada és `admin.html` directament. La pàgina és una còpia de la secció d'ocasió i del seu modal, amb camps editables.
- **Camps de la moto:** ID (només lectura), Marca, Model, Preu, Cilindrada, Potència, Any, Kilòmetres, Descripció, 5 fotos i estat (**En venta / Reservada / Vendida**, botons de ràdio: només un marcat).
- **Canvis pendents:** cada camp modificat porta la vora vermella i el botó es posa vermell amb "Pendientes (N)". Si es torna al valor original, el camp deixa de comptar. Una moto eliminada compta com un pendent més.
- **Desar:** un sol botó envia l'array complet (motos + targeta fixa al final) amb la clau; si va bé, els pendents tornen a zero.
- **Moto nova:** el botó obre el selector de fins a 5 fotos → el Worker dona la ID (`/nou-id`) → per a cada foto, el Worker la signa i el navegador la puja a Cloudinary amb el nom `0004_1.webp`... a la carpeta `Ocasion` → s'obre la fitxa nova amb els camps desbloquejats → s'omple i es desa una sola vegada amb els noms de foto. Les fotos que falten es queden amb la imatge buida (`0000_1.webp`). Mentre es pugen, el modal queda bloquejat.
- **WebP:** les fotos es pugen tal com són; Cloudinary les serveix en WebP perquè el nom acaba en `.webp`.
- **Eliminar:** botó al final del modal, amb confirmació amb un segon clic (caduca als 4 s). La ID no es reutilitza.
- **Targeta especial (id9999):** és dins de l'array, no es mostra al panell i es conserva sempre al final en desar.

### Mode manteniment
- **Activar/desactivar:** al modal de login (millor a `admin.html` en pestanya nova) s'escriu la clau de `HIDE_PASS` (amaga la web) o de `SHOW_PASS` (la torna a mostrar). No entren enlloc: el Worker canvia `MANTENIMENT` al KV i el modal es tanca sense missatge.
- **Efecte:** `loader.js` ho comprova en cada càrrega (secció 3). Qui ja tenia la web oberta ho veu en recarregar; el KV pot trigar fins a uns 60 s a propagar-se.
- **Seguretat:** són contrasenyes reals validades pel Worker. Han de ser **llargues i diferents** entre elles i de l'admin: no hi ha límit d'intents, i una de 4 xifres es troba en minuts.
- **Només per a períodes curts:** és una redirecció amb JavaScript, no una pàgina de manteniment "de servidor" per a Google.
- Si es fa servir el Live Server local per provar, es llegeix el Worker **de producció**: amagar ho amaga per a tothom.

### Proteccions contra errors (poka-yoke)
- El Worker no escriu res sense la clau, comprova que el cos sigui un array i desa una còpia amb data a `AMRBAK/…` abans d'escriure `DADES`.
- El panell no deixa guardar una moto sense **Marca** o **Model** (el preu no és obligatori, perquè una moto venuda pot no tenir-lo).
- Una moto nova que es deixa en blanc no es guarda.
- Avís sota el títol amb els canvis sense guardar, i el navegador pregunta si es tanca o recarrega la pàgina amb canvis pendents.
- Mentre es desa o es pugen fotos, els botons queden bloquejats.
- Si el Worker rebutja la clau (401), el panell esborra la sessió i ho diu.

### Notes tècniques
- **Cau del KV:** si en algun lloc es comprova la cau, ha de ser `if (dadesKV && dadesKV !== "0")`, perquè el text `"0"` compta com a cert a JavaScript. (El Worker actual de motos no la fa servir: torna `[]` si la clau no existeix.)
- **Context:** taller local de Sabadell amb poc trànsit. La propagació global del KV no és un problema.
- Els noms de foto es resolen sempre contra Cloudinary: `0001_1.webp` = ID sense el prefix `id` + `_` + número. `0000_1.webp` és la imatge buida i `9999_1.webp` la de la targeta fixa.

### Historial de còpies (`AMRBAK/`)
Cada desat amb canvis (des de l'admin o `reset.html`) escriu el nou array a `AMRBAK/aammdd-hhmmss` (hora UTC: 2 h menys que a Espanya a l'estiu i 1 h menys a l'hivern) i a `DADES`. La còpia més recent és sempre igual a `DADES`, i l'historial conté tots els estats. No caduquen: s'esborren a mà al KV. Per recuperar una versió, es copia el valor de la clau triada a `DADES` (o es guarda en un `.json` i es restaura amb `reset.html`). Les claus antigues `DADES_BAK` i `AMRMOTORBIKE/BAK/…` ja no s'usen.

### Restaurar dades després de proves
`reset.html` (secció 2) fa servir les rutes `/` i `/ultim-id` del Worker. Per tornar a l'estat inicial: restaurar el `.json` (si porta `ultimId`, també es restaura l'ID; si és només l'array, posar `ULTIM_ID` a mà al KV), i esborrar a mà les fotos de prova de Cloudinary amb ID més alta (les que es reutilitzin amb el mateix nom se sobreescriuen soles; la CDN pot servir un temps la imatge vella).

### Limitacions conegudes / pendents
- **Només es pugen fotos en crear una moto.** Canviar les fotos d'una moto existent no està fet.
- **Eliminar una moto no esborra les seves fotos de Cloudinary.**
- **El botó "Nueva moto" és dins del modal:** cal obrir una moto abans; si no en queda cap, no es pot afegir.
- **Les còpies `AMRBAK/` no caduquen ni es netegen soles**: cal esborrar-les a mà quan n'hi hagi massa.
- **`reset.html` no té modal de login:** cal entrar abans pel login i, a la mateixa pestanya, anar-hi. Una clau pròpia per al reset (`RESET_PASS`, que obrís `reset.html` des del mateix modal) queda com a possible millora.
- **Seguretat:** la clau es compara en clar i `/login` la rep per URL (`?p=`); no hi ha límit d'intents. Per a un taller petit és acceptable, però és el punt a reforçar si cal.
- **Poka-yoke pendents:** que el Worker rebutgi arrays amb IDs repetides o entrades sense `id`; comprovar el tipus i la mida de les fotos abans de pujar-les; valorar fer el preu obligatori només per a les motos en venda.
- **Foto de la targeta fixa** i imatge buida: viuen a Cloudinary (`9999_1`, `0000_1`); si s'esborren, falten a tota la web.

---

## 9. Pendent de completar

- **Disseny "tot blanc" (neumorfisme)** per al login i la fitxa de l'admin: només hi ha una maqueta (`prova-blanc.html`, amb fons gris blavós suau o blanc 255). Pendent que el client ho vegi abans de decidir si s'aplica.
- Detall de `navbar.js`, `footer.js`, `contacte-flotant.js`, `cookies-banner.js`.
- `form-contacte.html` / `form-contacte.js`: si fan servir el loader o carreguen els seus propis scripts.
- Llista real de claus de `CONFIG` (noms de variables).
- On viuen Airtable / Workers en altres projectes (a AMR no s'utilitza Airtable).

## 10. Neteja possible (no feta, requereix aprovació)

- Esborrar la versió antiga comentada al final de `loader.js` (i el "No tocar" de la capçalera).
- Esborrar els blocs comentats de `main.js` i les plantilles comentades de `config.js`.
- Moure les marques del marquee a `config.js`.
- Afegir comprovació de `null` al logo de `main.js`.
