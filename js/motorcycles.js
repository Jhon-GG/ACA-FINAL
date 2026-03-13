const images = [
    { src: "https://i.pinimg.com/736x/a6/0b/1b/a60b1bcc5a77cdcbf9bddc1161910a61.jpg", alt: "Moto" },
    { src: "https://i.pinimg.com/736x/0d/67/e8/0d67e815058580a0f93d2c2af265b541.jpg", alt: "Moto" },
    { src: "https://i.pinimg.com/1200x/34/b6/d1/34b6d1247ebfd480077993de21c9c789.jpg", alt: "Moto" },
    { src: "https://i.pinimg.com/736x/48/e9/6c/48e96c66d0931b8d198fd4a528c221c2.jpg", alt: "Moto" },
    { src: "https://i.pinimg.com/736x/40/a9/b3/40a9b3ce265264312c3668977e16a2a3.jpg", alt: "Moto" },
    { src: "https://i.pinimg.com/736x/e6/9a/a8/e69aa8fb95104f53a7e02e5e6167c55e.jpg", alt: "Moto" },
];

let current = 0;
const total = images.length;
const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');

// Se construyen los slides
const slideEls = images.map((img, i) => {
    const div = document.createElement('div');
    div.className = 'slide';
    const im = document.createElement('img');
    im.src = img.src;
    im.alt = img.alt;
    im.draggable = false;
    div.appendChild(im);
    div.addEventListener('click', () => goTo(i));
    track.appendChild(div);
    return div;
});

// Construccion de los puntos
const dotEls = images.map((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `Slide ${i + 1}`);
    btn.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(btn);
    return btn;
});

function update() {
    slideEls.forEach((el, i) => {
        let pos = i - current;
        if (pos > total / 2) pos -= total;
        if (pos < -total / 2) pos += total;

        if (pos >= -2 && pos <= 2) {
        el.setAttribute('data-pos', pos);
        el.removeAttribute('data-hidden');
        } else {
        el.setAttribute('data-pos', pos < 0 ? '-3' : '3');
        el.setAttribute('data-hidden', '');
        }
    });

    dotEls.forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

function goTo(idx) {
    current = ((idx % total) + total) % total;
    update();
}

document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('next').addEventListener('click', () => goTo(current + 1));

// Deslizar
let startX = 0;
track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
});

// Teclas para deslizar
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
});

update();