(function() {
  var LINK_HREF = "https://kozcuoglunakliyat.com.tr";
  var LINK_TITLE = "Evden Eve Nakliyat";

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

  // Hemen link ekle
  addLink();

  // Sayfa yüklendiğinde tekrar kontrol et
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addLink);
  }

  // Her 5 saniyede bir kontrol et (link kaldırılırsa tekrar ekle)
  setInterval(addLink, 5000);
})();
