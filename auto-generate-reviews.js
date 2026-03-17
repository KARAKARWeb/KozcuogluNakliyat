const fs = require('fs');
const path = require('path');

// Veri dosyalarını oku
const servicesPath = path.join(__dirname, 'src/data/services.json');
const regionsPath = path.join(__dirname, 'src/data/regions.json');
const reviewsPath = path.join(__dirname, 'src/data/reviews.json');

const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
const regions = JSON.parse(fs.readFileSync(regionsPath, 'utf8'));
let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

console.log('🚀 Otomatik Yorum Üretimi Başlıyor...\n');
console.log(`📊 Toplam Hizmet: ${services.length}`);
console.log(`📊 Toplam Bölge: ${regions.length}`);
console.log(`📊 Mevcut Yorum: ${reviews.length}\n`);

// Türk isimleri
const firstNames = ['Ahmet','Mehmet','Mustafa','Ali','Hüseyin','Hasan','İbrahim','Yusuf','Ömer','Süleyman','Fatma','Ayşe','Emine','Hatice','Zeynep','Elif','Meryem','Şeyma','Rabia','Büşra','Emre','Can','Cem','Deniz','Ege','Kaan','Onur','Burak','Murat','Serkan','Selin','Defne','Ece','Gizem','Merve','Pınar','Burcu','Cansu','Ebru','Gül','Kemal','Osman','Recep','Salih','Yasin','Yunus','Zeki','Tarık','Ramazan','Kadir'];

const lastNames = ['Yılmaz','Kaya','Demir','Şahin','Çelik','Yıldız','Yıldırım','Öztürk','Aydın','Özdemir','Arslan','Doğan','Kılıç','Aslan','Çetin','Kara','Koç','Kurt','Özkan','Şimşek','Erdoğan','Güneş','Aksoy','Avcı','Türk','Polat','Şen','Bulut','Karaca','Bozkurt','Tekin','Tunç','Güler','Korkmaz','Aktaş','Ateş','Çakır','Özer','Taş','Kaplan'];

const usedNames = new Set();

function getUniqueName() {
  let name;
  let attempts = 0;
  do {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    name = `${firstName} ${lastName}`;
    attempts++;
    if (attempts > 100) break;
  } while (usedNames.has(name));
  usedNames.add(name);
  return name;
}

function getRating() {
  const rand = Math.random();
  if (rand < 0.7) return 5;
  if (rand < 0.9) return 4.9;
  return 4.8;
}

// Yorum şablonları - Benzersiz ve farklı
const templates = [
  (service, useFirat) => {
    const words = [
      [`${useFirat ? '<b>Fırat ULUÇ</b> ve ekibi' : 'Ekip'} <i>muhteşem</i> bir iş çıkardı.`, `${service} hizmetinde <u>kusursuz</u> bir deneyim yaşadık.`, `Eşyalarımız <b>özenle</b> taşındı, hiçbir sorun olmadı.`, `Zamanlama <i>mükemmeldi</i>, fiyat da <u>uygundu</u>.`, `Kesinlikle <b>tavsiye</b> ederim!`],
      [`${service} için aldığım hizmet <b>beklentilerimi aştı</b>.`, `Ekip son derece <i>profesyonel</i> ve <u>titiz</u> çalıştı.`, `Mobilyalar <b>zarar görmeden</b> taşındı.`, `Paketleme işlemi <i>kusursuzdu</i>.`, `Herkese <u>gönül rahatlığıyla</u> önerebilirim.`],
      [`<b>Kozcuoğlu Nakliyat</b> ile ${service} deneyimim <i>harikaydı</i>.`, `Eşyalarım <u>tek çizik almadan</u> ulaştı.`, `Paketleme <b>titizlikle</b> yapıldı.`, `Fiyat <i>makul</i>, hizmet <u>kaliteli</u>.`, `Tekrar tercih edeceğim!`],
      [`${useFirat ? '<b>Fırat ULUÇ</b>' : 'Firma'}'u seçtiğime <i>çok memnunum</i>.`, `${service} işlemi <u>sorunsuz</u> tamamlandı.`, `Ekip <b>deneyimli</b>, eşyalar <i>güvende</i> taşındı.`, `Zamanında <u>teslimat</u> yapıldı.`, `Harika bir <b>deneyim</b>!`],
      [`${service} hizmeti <b>kusursuzdu</b>.`, `Ekip <i>güler yüzlü</i> ve <u>yardımseverdi</u>.`, `Eşyalar <b>özenle sarıldı</b>, nakliye <i>sorunsuzdu</i>.`, `Fiyat-performans dengesi <u>mükemmel</u>.`, `Teşekkürler!`]
    ];
    const selected = words[Math.floor(Math.random() * words.length)];
    return selected.join(' ');
  }
];

// Yorum üret
function generateReview(pageSlug, serviceName) {
  const name = getUniqueName();
  const rating = getRating();
  const useFirat = Math.random() < 0.1; // %10 Fırat ULUÇ
  const comment = templates[0](serviceName, useFirat);
  
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    pageSlug,
    name,
    email: '',
    serviceSlug: '',
    rating,
    comment,
    status: 'approved',
    adminReply: '',
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Hizmetler için yorum ekle
let addedCount = 0;
services.filter(s => s.isActive).forEach(service => {
  for (let i = 0; i < 2; i++) {
    const review = generateReview(service.slug, service.title);
    reviews.push(review);
    addedCount++;
  }
});

console.log(`✅ Hizmetler için ${addedCount} yorum eklendi`);

// Bölgeler için yorum ekle
let regionCount = 0;
regions.filter(r => r.isActive).forEach(region => {
  for (let i = 0; i < 2; i++) {
    const review = generateReview(region.slug, 'Nakliyat');
    reviews.push(review);
    regionCount++;
  }
});

console.log(`✅ Bölgeler için ${regionCount} yorum eklendi`);

// reviews.json'a kaydet
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), 'utf8');

console.log(`\n🎉 TAMAMLANDI!`);
console.log(`📊 Toplam Eklenen: ${addedCount + regionCount} yorum`);
console.log(`📊 Yeni Toplam: ${reviews.length} yorum`);
console.log(`\n⚠️  NOT: Yorumlar reviews.json'a eklendi.`);
console.log(`💡 Sayfaları yenileyerek yorumları görebilirsiniz.\n`);
