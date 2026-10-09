let motoActualIndex = 0;

function obrirModalMoto(index) {
    motoActualIndex = index;
    carregarDadesModal();
    document.getElementById('modal-moto').style.display = 'flex';
}

function tancarModalMoto() {
    document.getElementById('modal-moto').style.display = 'none';
}

function canviarMoto(direccio) {
    motoActualIndex += direccio;
    
    if (motoActualIndex < 0) {
        motoActualIndex = CONFIG.OCASION.length - 1;
    } else if (motoActualIndex >= CONFIG.OCASION.length) {
        motoActualIndex = 0;
    }
    
    carregarDadesModal();
}

function carregarDadesModal() {
    const moto = CONFIG.OCASION[motoActualIndex];
    const containerMiniatures = document.getElementById('modal-miniatures');
    
    // Detectem el bloc gris de les dades tècniques
    const elPreu = document.getElementById('modal-preu');
    const blocSpecs = elPreu ? (elPreu.closest('.modal-specs') || elPreu.parentElement.parentElement) : null;

    // --- GESTIÓ DEL BANNER "VENUDA" ---
    // Busquem el contenidor de la imatge gran
    const imgContainer = document.getElementById('modal-img-gran').parentElement;
    
    // Netejem qualsevol banner anterior
    const bannerAnterior = imgContainer.querySelector('.modal-banner');
    if (bannerAnterior) bannerAnterior.remove();

    // Si la moto està venuda i NO és la targeta de contacte general, posem el banner
    if (moto.venuda && !moto.titol) {
        const bannerHTML = `
            <div class="modal-banner">
                <span class="banner-linia1">VENDIDA</span>
            </div>
        `;
        // Inserim el banner al contenidor de la imatge
        imgContainer.insertAdjacentHTML('beforeend', bannerHTML);
    }
    // ----------------------------------

    if (moto.titol) {
        // ... (Codi per a la targeta de contacte, sense canvis)
        document.getElementById('modal-titol').innerHTML = `
            ${moto.titol}
            <div style="font-size: 0.85em; color: #ff6600; margin-top: 6px; text-transform: uppercase;">${moto.subtitol}</div>
        `;
        document.getElementById('modal-desc').innerText = `${moto.textAccio1} ${moto.textAccio2}`;
        if (containerMiniatures) containerMiniatures.style.display = 'none';
        if (blocSpecs) blocSpecs.style.display = 'none';
        const textWA = encodeURIComponent(`Hola, quiero vender mi moto.`);
        document.getElementById('modal-btn-wa').href = `https://wa.me/34669669877?text=${textWA}`;
    } else {
        // Restaurar vista normal per a les motos d'ocasió
        document.getElementById('modal-titol').innerText = `${moto.marca} ${moto.model}`;
        document.getElementById('modal-preu').innerText = moto.preu;
        document.getElementById('modal-cc').innerText = moto.cc;
        document.getElementById('modal-kw').innerText = moto.kw;
        document.getElementById('modal-any').innerText = moto.any;
        document.getElementById('modal-km').innerText = moto.km;
        document.getElementById('modal-desc').innerText = moto.descripcio;

        // Mostrar miniatures i dades tècniques
        if (containerMiniatures) containerMiniatures.style.display = '';
        if (blocSpecs) blocSpecs.style.display = '';

        // Opcional: Canviar text WhatsApp si està venuda
        let textWA;
        if (moto.venuda) {
            textWA = encodeURIComponent(`Hola, he visto que la ${moto.marca} ${moto.model} está vendida. ¿Tenéis alguna similar?`);
        } else {
            textWA = encodeURIComponent(`Hola, estic interessat en la ${moto.marca} ${moto.model} (${moto.preu}€).`);
        }
        document.getElementById('modal-btn-wa').href = `https://wa.me/34669669877?text=${textWA}`;
    }
    
    // Imatge principal
    const imgGran = document.getElementById('modal-img-gran');
    imgGran.src = `${CONFIG.ASSETS_OCA}${moto.fotos[0]}`;

    // Renderitzar miniatures... (Resta del codi sense canvis)
    if (containerMiniatures) {
        containerMiniatures.innerHTML = '';
        if (!moto.titol) {
            const fotosValides = moto.fotos.filter(f => f !== '');
            fotosValides.forEach((fotoPath, idx) => {
                const img = document.createElement('img');
                const rutaCompleta = `${CONFIG.ASSETS_OCA}${fotoPath}`;
                img.src = rutaCompleta;
                img.alt = `Foto ${idx + 1}`;
                if (idx === 0) img.classList.add('activa');
                img.onclick = () => {
                    imgGran.src = rutaCompleta;
                    document.querySelectorAll('#modal-miniatures img').forEach(i => i.classList.remove('activa'));
                    img.classList.add('activa');
                };
                containerMiniatures.appendChild(img);
            });
        }
    }
}

class ModalMotoComu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="modal-moto" class="modal-overlay" style="display: none;">
                <div class="modal-container">
                    
                    <!-- Botó Tancar -->
                    <button class="modal-btn-tancar" onclick="tancarModalMoto()"><strong>✕</strong></button>

                    <!-- Fletxes de navegació entre motos 
                    <button class="modal-fletxa fletxa-esq" onclick="canviarMoto(-1)">❮</button>
                    <button class="modal-fletxa fletxa-dreta" onclick="canviarMoto(1)">❯</button>-->

                    <!-- Títol (Marca i Model) -->
                    <h2 id="modal-titol" class="modal-titol"></h2>

                    <!-- Imatge Principal -->
                    <div class="modal-foto-principal">
                        <img id="modal-img-gran" src="" alt="Foto principal">
                    </div>

                    <!-- Reixeta de Miniatures (4 restant) -->
                    <div id="modal-miniatures" class="modal-miniatures-grid"></div>

                    <!-- Característiques tècniques -->
                    <div class="modal-specs-wrapper">
                        <button class="modal-fletxa fletxa-esq" onclick="canviarMoto(-1)">❮</button>
                        <div class="modal-specs-grid">
                            <div class="spec-item"><span class="spec-label">Precio:</span> <span id="modal-preu" class="spec-val"></span></div>
                            <div class="spec-item"><span class="spec-label">Cilindrada:</span> <span id="modal-cc" class="spec-val"></span> cc</div>
                            <div class="spec-item"><span class="spec-label">Potencia:</span> <span id="modal-kw" class="spec-val"></span> cv/kW</div>
                            <div class="spec-item"><span class="spec-label">Año:</span> <span id="modal-any" class="spec-val"></span></div>
                            <div class="spec-item"><span class="spec-label">Kilometros:</span> <span id="modal-km" class="spec-val"></span> km</div>
                        </div>
                        <button class="modal-fletxa fletxa-dreta" onclick="canviarMoto(1)">❯</button>
                    </div>

                    <!-- Descripció / Extres -->
                    <p id="modal-desc" class="modal-descripcio"></p>

                    <!-- Botons de contacte -->
                    <div class="modal-accions">
                        <a id="modal-btn-wa" href="" target="_blank" class="btn-contacte btn-wa">WhatsApp</a>
                        <a href="tel:+34669669877" class="btn-contacte btn-tel">Trucar</a>
                    </div>

                </div>
            </div>
        `;
    }
}

customElements.define('modal-moto-comu', ModalMotoComu);