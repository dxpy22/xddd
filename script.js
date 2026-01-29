const introduccion = document.getElementById('introduccion');
const botonCorazon = document.getElementById('boton-corazon');
const musica = document.getElementById('musica');
const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");
const iconoVolumen = document.getElementById('icono-volumen');
const barraVolumen = document.getElementById('barra-volumen');

// Playlist
const playlist = [
    { src: 'Temazo.mp3', name: 'Frances limon' },
    { src: 'tuyyo.mp3', name: 'Tu y Yo' },
    { src: 'Ojoscanela.mp3', name: 'Ojos Canela' },
    { src: 'soloporvos.mp3', name: 'Solo Por Vos' },
    { src: 'cosasque.mp3', name: 'Cosas que no te dije' },
    { src: 'ami.mp3', name: 'A mi' }

];
let currentSongIndex = 0;

const prevSongBtn = document.getElementById('prev-song');
const nextSongBtn = document.getElementById('next-song');
const currentSongSpan = document.getElementById('current-song');

function loadSong(index) {
    musica.src = playlist[index].src;
    currentSongSpan.textContent = playlist[index].name;
    musica.load();
}

prevSongBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    musica.play();
});

nextSongBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    musica.play();
});

// Carga la primera canción
loadSong(currentSongIndex);

// Introducción
botonCorazon.addEventListener('click', () => {
    try {
        musica.volume = 0.5;
        musica.currentTime = 0;
        musica.play().then(() => {
            console.log('Música sonando al tocar corazón');
        }).catch((error) => {
            console.log('Error al reproducir música:', error);
        });
    } catch (e) {
        console.log('Error:', e);
    }
    introduccion.classList.add('oculta');
});

// Carta
document.addEventListener("click", (e) => {
    if (e.target.matches(".sobre, .solapa-derecha, .solapa-izquierda, .corazon")) {
        try {

            console.log('Música sonando al abrir carta');
        } catch (e) {
            console.log('Error en música al abrir:', e);
        }
        envoltura.classList.toggle("abierto");
        envoltura.classList.add("desactivar-sobre");
        if (!carta.classList.contains("abierta")) {
            setTimeout(() => {
                carta.classList.add("mostrar-carta");
                setTimeout(() => {
                    carta.classList.remove("mostrar-carta");
                    carta.classList.add("abierta");
                }, 500);
            }, 1000);
        }
    } else if (e.target.matches(".envoltura-sobre *")) {
        envoltura.classList.remove("abierto");
        envoltura.classList.remove("desactivar-sobre");
        if (carta.classList.contains("abierta")) {
            carta.classList.add("cerrando-carta");
            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
                console.log('Música pausada al cerrar carta');
            }, 500);
        }
    }
});

// Volumen
barraVolumen.addEventListener('input', () => {
    musica.volume = barraVolumen.value;
});

iconoVolumen.addEventListener('click', () => {
    if (musica.volume > 0) {
        musica.volume = 0;
        iconoVolumen.textContent = '🔇';
    } else {
        musica.volume = barraVolumen.value;
        iconoVolumen.textContent = '🔊';
    }
});