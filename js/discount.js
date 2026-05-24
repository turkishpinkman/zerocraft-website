/* =============================================
   ZERØCRAFT — Discount Logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const discountInput = document.getElementById('discount-input');
  const discountMessage = document.getElementById('discount-message');
  const priceDisplays = document.querySelectorAll('.price-display');

  if (!discountInput) return;

  const originalPriceText = '₺2.980';
  const discountedPriceText = '₺2.384';

  discountInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();

    if (val === 'tiktok20') {
      priceDisplays.forEach(el => {
        el.style.opacity = 0;
        setTimeout(() => {
          el.innerHTML = discountedPriceText;
          el.style.color = '#1DB954'; // Show green color on discount
          el.style.opacity = 1;
        }, 150);
      });
      discountMessage.style.display = 'block';
    } else {
      priceDisplays.forEach(el => {
        if (el.innerHTML !== originalPriceText) {
          el.style.opacity = 0;
          setTimeout(() => {
            el.innerHTML = originalPriceText;
            el.style.color = 'var(--text-main)'; // Restore original color
            el.style.opacity = 1;
          }, 150);
        }
      });
      discountMessage.style.display = 'none';
    }
  });
});
