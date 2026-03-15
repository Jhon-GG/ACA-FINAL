// ─── Datos de cada carrusel ───────────────────────────────────────────────────

const carousels = [
  {
    id: 'carousel-1',
    images: [
      { src: "https://i.pinimg.com/736x/a6/0b/1b/a60b1bcc5a77cdcbf9bddc1161910a61.jpg", alt: "Moto", label: "Yamaha R15" },
      { src: "https://i.pinimg.com/736x/0d/67/e8/0d67e815058580a0f93d2c2af265b541.jpg", alt: "Moto", label: "Honda CBR 600RR" },
      { src: "https://i.pinimg.com/1200x/4f/81/d3/4f81d317ea9795e9465ee7f10e9de30e.jpg", alt: "Moto", label: "BMW S1000RR" },
      { src: "https://i.pinimg.com/736x/48/e9/6c/48e96c66d0931b8d198fd4a528c221c2.jpg", alt: "Moto", label: "Yamaha R6" },
      { src: "https://i.pinimg.com/736x/9a/b0/b2/9ab0b2f0a4ff7e83b91c93ccc2ce8586.jpg", alt: "Moto", label: "SUZUKI GSXR1000" },
      { src: "https://i.pinimg.com/736x/33/79/13/33791384daf614bfa1e4cdf4fd788c7b.jpg", alt: "Moto", label: "Ducati Panigale V4 S" },
    ]
  },
  {
    id: 'carousel-2',
    images: [
      { src: "https://i.pinimg.com/1200x/42/bf/88/42bf888a0000556a9a130230127b6497.jpg", alt: "Moto", label: "Suzuki GSXS 750" },
      { src: "https://i.pinimg.com/1200x/00/e1/78/00e178fb02670a95165a4e1b70d1cebd.jpg", alt: "Moto", label: "Ducati Streetfighter V4" },
      { src: "https://i.pinimg.com/736x/fa/0d/8e/fa0d8e3f99636dd4db368dc4c9845f5d.jpg", alt: "Moto", label: "KTM 1290 Super Duke R" },
      { src: "https://i.pinimg.com/736x/de/bb/18/debb18b0834fbb1aba5eda183710aade.jpg", alt: "Moto", label: "Honda CB650R" },
      { src: "https://i.pinimg.com/1200x/65/b3/50/65b35092df70b7ff2fe5cd01b75a7377.jpg", alt: "Moto", label: "BMW M1000R" },
      { src: "https://i.pinimg.com/736x/86/d2/77/86d277f54e471d4af9456138462a9009.jpg", alt: "Moto", label: "Kawasaki Z900" },
    ]
  },
  {
    id: 'carousel-3',
    images: [
      { src: "https://i.pinimg.com/736x/db/71/b7/db71b7779619b026c25ed5eaeb11f611.jpg", alt: "Moto", label: "Yamaha Tracer 9" },
      { src: "https://i.pinimg.com/1200x/3e/e1/91/3ee1917dd484400b387f5597d3bee39e.jpg", alt: "Moto", label: "Honda Africa Twin" },
      { src: "https://i.pinimg.com/736x/52/86/b4/5286b4189eb3c1a15c0a19a8535627d8.jpg", alt: "Moto", label: "Cf Moto 450 MT" },
      { src: "https://i.pinimg.com/1200x/33/ca/55/33ca5522fa04e75d5f5457a24bce37c0.jpg", alt: "Moto", label: "Suzuki Vstrom 650 XT" },
      { src: "https://i.pinimg.com/1200x/35/e9/91/35e99113f6f14434111aa4518b50985c.jpg", alt: "Moto", label: "BMW R1250GS" },
      { src: "https://i.pinimg.com/1200x/b0/3a/41/b03a410bbe42701cb06fe4d0bd18bdb8.jpg", alt: "Moto", label: "Kawasaky Versys 650" },
    ]
  },
  {
    id: 'carousel-4',
    images: [ /* ... */ ]
  },
];

// ─── Función que inicializa un carrusel dado su config ────────────────────────

function initCarousel({ id, images }) {
  const total = images.length;
  const track  = document.querySelector(`#${id} .carousel-track-container`);
  const dotsEl = document.querySelector(`#${id} .dots`);
  let current  = 0;

  const slideEls = images.map((img, i) => {
    const div   = document.createElement('div');
    div.className = 'slide';

    const im    = document.createElement('img');
    im.src      = img.src;
    im.alt      = img.alt;
    im.draggable = false;
    div.appendChild(im);

    // ← AQUÍ está el texto: se crea un <span> con la etiqueta
    const label = document.createElement('span');
    label.className = 'slide-label';
    label.textContent = img.label;
    div.appendChild(label);

    div.addEventListener('click', () => goTo(i));
    track.appendChild(div);
    return div;
  });

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
      if (pos >  total / 2) pos -= total;
      if (pos < -total / 2) pos += total;
      if (pos >= -2 && pos <= 2) {
        el.setAttribute('data-pos', pos);
        el.removeAttribute('data-hidden');
      } else {
        el.setAttribute('data-pos', pos < 0 ? '-3' : '3');
        el.setAttribute('data-hidden', '');
      }
    });
    dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    update();
  }

  document.querySelector(`#${id} #prev-${id}`)
    .addEventListener('click', () => goTo(current - 1));
  document.querySelector(`#${id} #next-${id}`)
    .addEventListener('click', () => goTo(current + 1));

  // Touch
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
  });

  update();
}

// ─── Inicializar todos ────────────────────────────────────────────────────────
let startX = 0;
carousels.forEach(initCarousel);

// Teclas (controlan el carrusel que tenga foco visual, o el primero por defecto)
document.addEventListener('keydown', e => { });