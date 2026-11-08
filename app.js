/**
 * Minimalist Editorial Portfolio - Will Palaia
 * Tactile Card Spring Tilt · River Flip Contact Button · Natural Physics
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIZER (Quiet tactile feedback) ---
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSoftCardTouch() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {
      // Audio error ignored
    }
  }

  function playFlipSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [440, 659.25, 880].forEach((freq, idx) => {
        const t = now + idx * 0.05;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.22);
      });
    } catch (e) {
      // Audio error ignored
    }
  }

  // --- TACTILE POCKET CARDS PERSPECTIVE TILT ---
  const cardsStage = document.getElementById('cardsStage');
  const cardLeft = document.getElementById('cardHeroLeft');
  const cardRight = document.getElementById('cardHeroRight');

  if (cardsStage && cardLeft && cardRight) {
    cardsStage.addEventListener('mouseenter', () => {
      playSoftCardTouch();
    });

    cardsStage.addEventListener('mousemove', (e) => {
      const rect = cardsStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = -y * 12;
      const tiltY = x * 12;

      cardLeft.style.transform = `rotate(-10deg) translate3d(${-20 + x * 15}px, ${y * 10}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      cardRight.style.transform = `rotate(10deg) translate3d(${20 + x * 15}px, ${y * 10}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    cardsStage.addEventListener('mouseleave', () => {
      cardLeft.style.transform = '';
      cardRight.style.transform = '';
    });

    [cardLeft, cardRight].forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('card-inspected');
        playSoftCardTouch();
      });
    });
  }

  // --- CONTACT FORM SUBMISSION WITH 3D FLIP ---
  const contactForm = document.getElementById('contactForm');
  const submitFlipper = document.getElementById('submitFlipper');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && submitFlipper) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.textContent = 'Please provide your name, email, and message.';
          formFeedback.className = 'text-xs text-rose-400 mt-2 block';
        }
        return;
      }

      // Flip button to submitted state
      submitFlipper.classList.add('flipped');
      playFlipSound();

      if (formFeedback) {
        formFeedback.textContent = 'Opening your email client to complete dispatch...';
        formFeedback.className = 'text-xs text-emerald-400 mt-2 block';
      }

      setTimeout(() => {
        const mailtoUri = `mailto:wpalaia.2022@gmail.com?subject=${encodeURIComponent(
          `Portfolio Inquiry from ${name}`
        )}&body=${encodeURIComponent(
          `From: ${name} (${email})\n\n${message}`
        )}`;
        window.location.href = mailtoUri;
      }, 600);

      setTimeout(() => {
        submitFlipper.classList.remove('flipped');
        if (formFeedback) {
          formFeedback.textContent = 'Message drafted. Will reply within 24 hours.';
          formFeedback.className = 'text-xs text-slate-400 mt-2 block';
        }
      }, 6000);
    });
  }

  // --- SMOOTH SCROLL NAVBAR HIGHLIGHT ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + 240;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-white', 'border-white/20');
        link.classList.remove('text-slate-400');
      } else {
        link.classList.remove('text-white', 'border-white/20');
        link.classList.add('text-slate-400');
      }
    });
  });

  console.log('Will Palaia Portfolio Loaded.');
})();
