/* =============================================
   ZERØCRAFT — Waitlist Form Handler
   Email collection with localStorage
   ============================================= */

(function () {
  'use strict';

  const form = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('waitlist-email');
  const successMsg = document.getElementById('waitlist-success');
  const submitBtn = document.getElementById('waitlist-submit');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Validate email
    if (!isValidEmail(email)) {
      shakeInput(emailInput);
      return;
    }

    // Save to localStorage
    saveEmail(email);

    // Show success
    form.style.display = 'none';
    successMsg.classList.add('show');

    // Reset after 5 seconds
    setTimeout(function () {
      form.style.display = '';
      successMsg.classList.remove('show');
      emailInput.value = '';
    }, 5000);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function saveEmail(email) {
    try {
      var emails = JSON.parse(localStorage.getItem('zerocraft_waitlist') || '[]');

      // Avoid duplicates
      if (emails.indexOf(email) === -1) {
        emails.push(email);
        localStorage.setItem('zerocraft_waitlist', JSON.stringify(emails));
      }
    } catch (err) {
      // localStorage might be unavailable
      console.warn('Waitlist save failed:', err);
    }
  }

  function shakeInput(input) {
    input.style.animation = 'none';
    input.offsetHeight; // Trigger reflow
    input.style.animation = 'shake 0.4s ease';
    input.style.borderColor = 'var(--error)';

    setTimeout(function () {
      input.style.borderColor = '';
      input.style.animation = '';
    }, 1000);
  }

  // Add shake keyframes dynamically
  var style = document.createElement('style');
  style.textContent = '@keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }';
  document.head.appendChild(style);

})();
