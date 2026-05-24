/* =============================================
   ZERØCRAFT — GitHub Release Fetcher
   Dinamik olarak en son .exe dosyasını çeker
   ============================================= */

(function () {
  'use strict';

  const downloadBtn = document.getElementById('dynamic-download-btn');
  const fallbackText = document.getElementById('download-fallback-text');
  
  if (!downloadBtn) return;

  const GITHUB_REPO = 'turkishpinkman/zerodeck-releases';
  const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

  fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error('GitHub API yanıt vermedi');
      return response.json();
    })
    .then(data => {
      // Sürüm numarasını al (örn: v1.0.2)
      const version = data.tag_name;
      
      // Assetler içinde .exe dosyasını bul
      const exeAsset = data.assets.find(asset => asset.name.endsWith('.exe'));
      
      if (exeAsset) {
        // Buton linkini ve metnini güncelle
        downloadBtn.href = exeAsset.browser_download_url;
        downloadBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Windows Uygulamasını İndir (${version})
        `;
        downloadBtn.classList.add('btn-primary');
        downloadBtn.classList.remove('btn-secondary');
      } else {
        // Exe bulunamazsa release sayfasına yönlendir
        downloadBtn.href = data.html_url;
        fallbackText.style.display = 'block';
      }
    })
    .catch(error => {
      console.warn('Otomatik sürüm çekilemedi:', error);
      // Hata durumunda link zaten en son release sayfasına gidiyor (HTML'de tanımlı)
      fallbackText.style.display = 'block';
    });
})();
