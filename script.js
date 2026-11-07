'use strict';

// Navegação mobile acessível.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const closeMenu = () => {
  navigation.classList.remove('is-open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
};
menuButton?.addEventListener('click', () => {
  const isOpening = !navigation.classList.contains('is-open');
  navigation.classList.toggle('is-open', isOpening);
  menuButton.classList.toggle('is-open', isOpening);
  menuButton.setAttribute('aria-expanded', String(isOpening));
  menuButton.setAttribute('aria-label', isOpening ? 'Fechar menu' : 'Abrir menu');
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (navigation?.classList.contains('is-open') && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

// Visualizações reais exportadas da prancha do protótipo enviada pelo usuário.
const angles = {
  frontal: { src: 'assets/vista-frontal.webp', alt: 'Visão frontal do protótipo de óculos Vision Max', description: 'A vista frontal destaca o formato clássico da armação e as lentes em tom lilás.' },
  lateral: { src: 'assets/vista-lateral.webp', alt: 'Visão lateral da armação Vision Max', description: 'Na lateral, as hastes pretas mantêm uma aparência minimalista com a assinatura do projeto.' },
  perspectiva: { src: 'assets/vista-perspectiva.webp', alt: 'Óculos Vision Max vistos em perspectiva', description: 'Armação preta e lentes em tons lilás. Um design de aparência familiar com proposta tecnológica.' }
};
const angleImage = document.getElementById('angle-image');
const angleDescription = document.getElementById('angle-description');
const angleButtons = [...document.querySelectorAll('[data-angle]')];
angleButtons.forEach(button => button.addEventListener('click', () => {
  const data = angles[button.dataset.angle];
  if (!data) return;
  angleImage.src = data.src;
  angleImage.alt = data.alt;
  angleDescription.textContent = data.description;
  angleButtons.forEach(btn => {
    const selected = btn === button;
    btn.classList.toggle('is-active', selected);
    btn.setAttribute('aria-pressed', String(selected));
  });
}));

// Revelação sutil, sem bloquear conteúdo quando JS está desativado.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('will-reveal');
    observer.observe(element);
  });
}

// Ano atualizado automaticamente.
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());


// Lightbox para ampliar os materiais originais, com fechamento por Esc e toque fora.
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('image-modal-visual');
const modalCaption = document.getElementById('image-modal-caption');
document.querySelectorAll('[data-lightbox-src]').forEach(button => {
  button.addEventListener('click', () => {
    if (!imageModal || !modalImg) return;
    modalImg.src = button.dataset.lightboxSrc;
    modalImg.alt = button.dataset.lightboxLabel || 'Imagem ampliada';
    modalCaption.textContent = button.dataset.lightboxLabel || '';
    imageModal.showModal();
  });
});
imageModal?.querySelector('.image-modal-close')?.addEventListener('click', () => imageModal.close());
imageModal?.addEventListener('click', event => { if (event.target === imageModal) imageModal.close(); });
