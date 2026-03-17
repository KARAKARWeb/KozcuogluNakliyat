(function() {
  var LINK_HREF = "https://kozcuoglunakliyat.com.tr";
  var LINK_TITLE = "Evden Eve Nakliyat";
  var STORAGE_KEY = "kozcuoglu_embed_active";

  // head'e link ekle (yoksa)
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
        console.log("Kozcuoğlu Nakliyat global link eklendi");
      } catch(e) {
        console.error("Global link eklenemedi:", e);
      }
    }
    return !!document.querySelector('link[data-kozcuoglu-embed="required"]');
  }

  // localStorage'da embed aktif mi kontrol et
  try {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      addLink();
    }
  } catch(e) {}

  // Sayfa yüklendiğinde tekrar kontrol et
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      try {
        if (localStorage.getItem(STORAGE_KEY) === "true") {
          addLink();
        }
      } catch(e) {}
    });
  } else {
    // Sayfa zaten yüklenmişse hemen kontrol et
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        addLink();
      }
    } catch(e) {}
  }

  // Her 3 saniyede bir kontrol et
  setInterval(function() {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        addLink();
      }
    } catch(e) {}
  }, 3000);
})();
