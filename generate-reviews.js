const fs = require('fs');
const path = require('path');

// Türk isimleri ve soyisimleri
const firstNames = [
  'Ahmet', 'Mehmet', 'Mustafa', 'Ali', 'Hüseyin', 'Hasan', 'İbrahim', 'Yusuf', 'Ömer', 'Süleyman',
  'Fatma', 'Ayşe', 'Emine', 'Hatice', 'Zeynep', 'Elif', 'Meryem', 'Şeyma', 'Rabia', 'Büşra',
  'Emre', 'Can', 'Cem', 'Deniz', 'Ege', 'Kaan', 'Onur', 'Burak', 'Murat', 'Serkan',
  'Selin', 'Defne', 'Ece', 'Gizem', 'Merve', 'Pınar', 'Burcu', 'Cansu', 'Ebru', 'Gül',
  'Kemal', 'Osman', 'Recep', 'Salih', 'Yasin', 'Yunus', 'Zeki', 'Tarık', 'Ramazan', 'Kadir'
];

const lastNames = [
  'Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir',
  'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şimşek',
  'Erdoğan', 'Güneş', 'Aksoy', 'Avcı', 'Türk', 'Polat', 'Şen', 'Bulut', 'Karaca', 'Bozkurt',
  'Tekin', 'Tunç', 'Güler', 'Korkmaz', 'Aktaş', 'Ateş', 'Çakır', 'Özer', 'Taş', 'Kaplan'
];

// İstanbul ilçeleri ve mahalleleri
const istanbulLocations = [
  'Kadıköy, İstanbul', 'Beşiktaş, İstanbul', 'Şişli, İstanbul', 'Üsküdar, İstanbul', 'Beyoğlu, İstanbul',
  'Fatih, İstanbul', 'Bakırköy, İstanbul', 'Maltepe, İstanbul', 'Pendik, İstanbul', 'Kartal, İstanbul',
  'Ataşehir, İstanbul', 'Ümraniye, İstanbul', 'Başakşehir, İstanbul', 'Küçükçekmece, İstanbul', 'Bahçelievler, İstanbul',
  'Moda, Kadıköy', 'Caddebostan, Kadıköy', 'Fenerbahçe, Kadıköy', 'Göztepe, Kadıköy', 'Acıbadem, Üsküdar',
  'Etiler, Beşiktaş', 'Levent, Beşiktaş', 'Nişantaşı, Şişli', 'Mecidiyeköy, Şişli', 'Taksim, Beyoğlu'
];

// Diğer iller
const otherCities = [
  'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri', 'Eskişehir',
  'Diyarbakır', 'Samsun', 'Denizli', 'Şanlıurfa', 'Adapazarı', 'Malatya', 'Kahramanmaraş', 'Erzurum', 'Van', 'Batman',
  'Elazığ', 'İzmit', 'Manisa', 'Sivas', 'Gebze', 'Balıkesir', 'Tarsus', 'Kütahya', 'Trabzon', 'Çorum'
];

// Hizmetler
const services = [
  'Ev Taşıma', 'Ofis Taşımacılığı', 'Villa Taşımacılığı', 'Piyano Taşımacılığı', 'Parça Eşya Taşımacılığı',
  'Kurum Taşımacılığı', 'Fabrika Taşımacılığı', 'Antika Eşya Taşımacılığı', 'Şehirler Arası Nakliyat', 'Yalı Taşımacılığı'
];

// Kullanılmış isimler
const usedNames = new Set();

function getUniqueName() {
  let name;
  let attempts = 0;
  do {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    name = `${firstName} ${lastName}`;
    attempts++;
    if (attempts > 100) {
      // Yeni isim kombinasyonu oluştur
      name = `${firstName} ${lastName} ${Math.floor(Math.random() * 100)}`;
    }
  } while (usedNames.has(name));
  
  usedNames.add(name);
  return name;
}

function getLocation(preferIstanbul = true) {
  if (preferIstanbul && Math.random() < 0.6) {
    return istanbulLocations[Math.floor(Math.random() * istanbulLocations.length)];
  }
  return otherCities[Math.floor(Math.random() * otherCities.length)];
}

function getService() {
  return services[Math.floor(Math.random() * services.length)];
}

function getRating() {
  const rand = Math.random();
  if (rand < 0.7) return 5; // %70 - 5 yıldız
  if (rand < 0.9) return 4.9; // %20 - 4.9 yıldız
  return 4.8; // %10 - 4.8 yıldız
}

// Yorum şablonları - HER BİRİ TAMAMEN FARKLI
const reviewTemplates = [
  (name, service, location) => `<b>Fırat ULUÇ</b> ve ekibinin <i>profesyonelliği</i> <u>takdire şayan</u>. ${service} hizmetinde ${location}'dan memnun kaldık. Eşyalarımız <b>özenle</b> paketlendi, hiçbir <i>hasar</i> görmedi. Zamanlama <u>kusursuzdu</u>, fiyat <b>uygundu</b>. Kesinlikle tavsiye ederim!`,
  
  (name, service, location) => `${location}'daki ${service} deneyimim <b>harikaydı</b>. Ekip son derece <i>titiz</i> çalıştı. Mobilyalar <u>zarar görmeden</u> taşındı. Paketleme <b>profesyonelce</b> yapıldı. Fiyat-performans dengesi <i>mükemmel</i>. Herkese <u>gönül rahatlığıyla</u> önerebilirim.`,
  
  (name, service, location) => `${service} için aldığım hizmet <b>beklentilerimi aştı</b>. ${location}'dan taşınırken <i>stressiz</i> bir süreç yaşadık. Eşyalar <u>özenle sarıldı</u>, nakliye <b>sorunsuzdu</b>. Ekip <i>güler yüzlü</i> ve <u>yardımseverdi</u>. Teşekkürler!`,
  
  (name, service, location) => `<b>Kozcuoğlu Nakliyat</b> ile ${location}'daki ${service} işlemim <i>kusursuz</i> geçti. Eşyalarım <u>tek çizik almadan</u> ulaştı. Paketleme <b>titizlikle</b> yapıldı. Fiyat <i>makul</i>, hizmet <u>kaliteli</u>. Tekrar tercih edeceğim!`,
  
  (name, service, location) => `${service} hizmeti için <b>Fırat ULUÇ</b>'u seçtiğime <i>çok memnunum</i>. ${location}'dan taşınma <u>sorunsuz</u> tamamlandı. Ekip <b>deneyimli</b>, eşyalar <i>güvende</i> taşındı. Zamanında <u>teslimat</u> yapıldı. Harika bir deneyim!`
];

console.log('🚀 Yorum üretimi başlıyor...\n');
console.log('📊 Hedef: Her sayfa için 2 benzersiz yorum\n');

// Örnek: 10 yorum üret
const reviews = [];
for (let i = 0; i < 10; i++) {
  const name = getUniqueName();
  const service = getService();
  const location = getLocation();
  const rating = getRating();
  const template = reviewTemplates[i % reviewTemplates.length];
  const comment = template(name, service, location);
  
  reviews.push({
    name,
    service,
    location,
    rating,
    comment,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString()
  });
}

console.log('✅ Örnek yorumlar oluşturuldu:\n');
reviews.forEach((r, i) => {
  console.log(`${i + 1}. ${r.name} - ${r.service} - ${r.location} - ${r.rating}⭐`);
  console.log(`   "${r.comment.substring(0, 80)}..."\n`);
});

console.log('\n📝 NOT: Bu bir örnek script\'tir.');
console.log('💡 Gerçek kullanım için daha fazla şablon ve kelime havuzu eklenmelidir.');
console.log('⚠️  AI tespit riskini azaltmak için manuel düzenleme önerilir.\n');
