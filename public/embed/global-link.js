(function() {
  var LINK_HREF = "https://kozcuoglunakliyat.com.tr";
  var LINK_TITLE = "evden eve nakliyat";
  var STORAGE_KEY = "kozcuoglu_embed_active";

  // head'e dofollow link ekle (yoksa)
  function addLink() {
    if (!document.querySelector('link[href="' + LINK_HREF + '"]')) {
      var link = document.createElement("link");
      link.rel = "dofollow";
      link.href = LINK_HREF;
      link.title = LINK_TITLE;
      document.head.appendChild(link);
    }
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
  }
})();
