// Inicialización de los mapas y las variables necesarias
const map1 = L.map('map1', { crs: L.CRS.EPSG3857 }).setView([51.505, -0.09], 13);
const map2 = L.map('map2', { crs: L.CRS.EPSG3857 }).setView([51.505, -0.09], 13);

// Agregar las capas de OpenStreetMap a ambos mapas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map1);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map2);

// Agregar Geoman a ambos mapas
map1.pm.addControls();
map2.pm.addControls();

// Hacer que el mapa 2 tenga una opacidad inicial (puedes ajustar esto con la barra deslizante)
map2.getContainer().style.opacity = 0.5;

// Sincronizar los mapas
map1.on('move', function () {
    map2.setView(map1.getCenter(), map1.getZoom());
});

map2.on('move', function () {
    map1.setView(map2.getCenter(), map2.getZoom());
});

// Implementar la funcionalidad del deslizador
const slider = document.querySelector('.slider');
let isDragging = false;
let startX = 0;
let map2Opacity = 0.5; // Valor inicial de opacidad

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        map2Opacity = Math.min(Math.max(map2Opacity + deltaX / window.innerWidth, 0), 1); // Rango de 0 a 1
        map2.getContainer().style.opacity = map2Opacity;
        // También ajusta la posición de la barra deslizante
        slider.style.left = `${50 + deltaX / window.innerWidth * 100}%`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'auto';
});
