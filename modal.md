<!-- Modal Fitxa Moto ------------------------------------------------------------------- -->
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