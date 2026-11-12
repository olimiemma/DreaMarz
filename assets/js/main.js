/**
 * DreaMarz, LLC - Main Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  document.querySelectorAll('.drawer-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Telemetry Console Tab Switcher & Live Simulation
  const tabBtns = document.querySelectorAll('.telemetry-tab-btn');
  const secFeed = document.getElementById('sec-feed');
  const dataFeed = document.getElementById('data-feed');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.tab;
      if (target === 'security') {
        if (secFeed) secFeed.style.display = 'flex';
        if (dataFeed) dataFeed.style.display = 'none';
      } else {
        if (secFeed) secFeed.style.display = 'none';
        if (dataFeed) dataFeed.style.display = 'flex';
      }
    });
  });

  // Live timestamp updates
  function updateTimestamps() {
    const times = document.querySelectorAll('.feed-time');
    times.forEach((t, i) => {
      const secondsAgo = (i + 1) * 3 + Math.floor(Math.random() * 2);
      t.textContent = `${secondsAgo}s ago`;
    });
  }
  setInterval(updateTimestamps, 4000);

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Contact Form Validation and Mock Submit
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success-modal');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Securing Connection...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (formSuccess) {
          formSuccess.style.display = 'flex';
        } else {
          alert('Thank you! Your inquiry has been encrypted and transmitted to DreaMarz partners. We will respond within 24 hours under mutual NDA.');
          contactForm.reset();
        }
      }, 1200);
    });
  }

  // 5. Dynamic Footer Year
  const yearEls = document.querySelectorAll('.current-year');
  const curYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = curYear);
});

