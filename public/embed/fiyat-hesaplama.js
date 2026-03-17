(function() {
  // Script'in yüklendiği domain'i otomatik algıla (iframe için)
  var scriptSrc = document.currentScript ? document.currentScript.src : "";
  var scriptOrigin = scriptSrc ? new URL(scriptSrc).origin : "https://kozcuoglunakliyat.com.tr";
  
  var EMBED_URL = scriptOrigin + "/embed/fiyat-hesaplama";
  var LINK_HREF = "https://kozcuoglunakliyat.com.tr"; // Her zaman production domain
  var LINK_TITLE = "Evden Eve Nakliyat";
  var STORAGE_KEY = "kozcuoglu_embed_active";
  var PAGES_KEY = "kozcuoglu_embed_pages";

  // localStorage'a embed kullanımını kaydet
  try {
    localStorage.setItem(STORAGE_KEY, "true");
    // Mevcut sayfayı kaydet
    var pages = JSON.parse(localStorage.getItem(PAGES_KEY) || "[]");
    var currentPage = window.location.pathname;
    if (pages.indexOf(currentPage) === -1) {
      pages.push(currentPage);
      localStorage.setItem(PAGES_KEY, JSON.stringify(pages));
    }
  } catch(e) {}

  // head'e link ekle (yoksa) - TÜM SAYFALARA
  function addLink() {
    if (!document.querySelector('link[data-kozcuoglu-embed="required"]')) {
      var link = document.createElement("link");
      link.rel = "alternate";
      link.href = LINK_HREF;
      link.title = LINK_TITLE;
      link.setAttribute("data-kozcuoglu-embed", "required");
      link.setAttribute("hreflang", "tr");
      try {
        document.head.appendChild(link);
        console.log("Kozcuoğlu Nakliyat embed linki eklendi");
      } catch(e) {
        console.error("Link eklenemedi:", e);
      }
    }
    return !!document.querySelector('link[data-kozcuoglu-embed="required"]');
  }

  // İlk yükleme - link ekle ve kontrol et
  if (!addLink()) {
    console.error("UYARI: Kozcuoğlu Nakliyat embed linki eklenemedi. Form yüklenmeyecek.");
  }

  // Her 3 saniyede bir link kontrolü yap ve ekle
  setInterval(function() {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        addLink();
      }
    } catch(e) {}
  }, 3000);

  // Her sayfa yüklendiğinde link kontrolü yap
  if (typeof window !== "undefined") {
    // Sayfa yüklendiğinde kontrol et
    window.addEventListener("load", function() {
      try {
        if (localStorage.getItem(STORAGE_KEY) === "true") {
          addLink();
        }
      } catch(e) {}
    });

    // DOMContentLoaded'da da kontrol et
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function() {
        try {
          if (localStorage.getItem(STORAGE_KEY) === "true") {
            addLink();
          }
        } catch(e) {}
      });
    }

    // Sayfa değişikliklerinde de kontrol et (SPA için)
    var lastUrl = location.href;
    new MutationObserver(function() {
      var url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        try {
          if (localStorage.getItem(STORAGE_KEY) === "true") {
            addLink();
          }
        } catch(e) {}
      }
    }).observe(document, { subtree: true, childList: true });
  }

  var container = document.getElementById("kozcuoglu-fiyat-hesaplama");
  if (!container) {
    container = document.currentScript.parentElement;
  }
  if (!container) return;

  // Link kontrolü - yoksa iframe yükleme
  function checkAndLoadIframe() {
    var linkExists = document.querySelector('link[data-kozcuoglu-embed="required"]');
    if (!linkExists) {
      container.innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif;color:#e3000f;border:2px solid #e3000f;border-radius:16px;background:#fef2f2"><strong>Uyarı:</strong> Bu formu kullanmak için sitenizin &lt;head&gt; bölümüne gerekli link eklenmelidir.</div>';
      return;
    }
    
    var iframe = document.createElement("iframe");
    iframe.src = EMBED_URL;
    iframe.style.cssText = "width:100%;min-height:600px;border:none;border-radius:16px;overflow:hidden;";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("title", "Kozcuoğlu Nakliyat Fiyat Hesaplama");
    iframe.setAttribute("allow", "camera");
    container.appendChild(iframe);
    
    return iframe;
  }

  var iframe = checkAndLoadIframe();
  if (!iframe) return;

  // link kaldırılırsa formu devre dışı bırak ve localStorage'ı temizle
  if (iframe) {
    var observer = new MutationObserver(function() {
      if (!document.querySelector('link[data-kozcuoglu-embed="required"]')) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch(e) {}
        iframe.srcdoc = '<div style="padding:40px;text-align:center;font-family:sans-serif;color:#e3000f;border:2px solid #e3000f;border-radius:16px;background:#fef2f2"><strong>Uyarı:</strong> Gerekli link kaldırıldı. Form devre dışı bırakıldı.</div>';
        iframe.src = "";
      }
    });
    observer.observe(document.head, { childList: true, subtree: true });
  }

  window.addEventListener("message", function(e) {
    if (e.origin !== scriptOrigin) return;
    if (e.data && e.data.type === "kozcuoglu-resize" && e.data.height) {
      iframe.style.height = e.data.height + "px";
    }
  });
})();
