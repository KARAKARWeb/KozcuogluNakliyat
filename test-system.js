#!/usr/bin/env node

/**
 * Kozcuoğlu Nakliyat - Kapsamlı Sistem Test Scripti
 * Tüm admin paneli ve frontend özellikleri test edilir
 */

const BASE_URL = 'http://localhost:3000';

const tests = {
  services: {
    name: 'Hizmetler',
    admin: {
      list: '/admin/services',
      create: '/admin/services/new',
      edit: '/admin/services/{id}',
    },
    api: {
      get: '/api/services',
      post: '/api/services',
      put: '/api/services/{slug}/update',
      delete: '/api/services/{slug}/update',
      reorder: '/api/services/reorder',
    },
    frontend: {
      list: '/hizmetlerimiz',
      detail: '/{slug}', // dinamik
    },
    checks: [
      'Admin liste sayfası yükleniyor mu?',
      'Yeni hizmet oluşturma formu çalışıyor mu?',
      'Hizmet düzenleme sayfası açılıyor mu?',
      'API GET tüm hizmetleri getiriyor mu?',
      'Frontend liste sayfası render ediliyor mu?',
      'Frontend detay sayfası çalışıyor mu?',
      'Sıralama (drag-drop) API çalışıyor mu?',
      'MediaPicker görsel seçimi çalışıyor mu?',
      'Content editörü (HTML) çalışıyor mu?',
      'SEO alanları kaydediliyor mu?',
      'FAQ ekleme/silme çalışıyor mu?',
      'Kategori filtreleme çalışıyor mu?',
    ]
  },
  solutions: {
    name: 'Çözümler',
    admin: {
      list: '/admin/solutions',
      create: '/admin/solutions/new',
      edit: '/admin/solutions/{id}',
    },
    api: {
      get: '/api/solutions',
      post: '/api/solutions',
      put: '/api/solutions/{slug}',
      delete: '/api/solutions/{slug}',
      reorder: '/api/solutions/reorder',
    },
    frontend: {
      list: '/cozumlerimiz',
      detail: '/{slug}',
    },
    checks: [
      'Admin liste sayfası yükleniyor mu?',
      'Yeni çözüm oluşturma formu çalışıyor mu?',
      'Çözüm düzenleme sayfası açılıyor mu?',
      'API GET tüm çözümleri getiriyor mu?',
      'Frontend liste sayfası render ediliyor mu?',
      'Frontend detay sayfası çalışıyor mu?',
      'Sıralama (drag-drop) API çalışıyor mu?',
      'MediaPicker görsel seçimi çalışıyor mu?',
      'Content editörü (HTML) çalışıyor mu?',
      'SEO alanları kaydediliyor mu?',
      'İkon seçimi çalışıyor mu?',
      'Aktif/Pasif toggle çalışıyor mu?',
    ]
  },
  regions: {
    name: 'Bölgeler',
    admin: {
      list: '/admin/regions',
      create: '/admin/regions/new',
      edit: '/admin/regions/{id}',
    },
    api: {
      get: '/api/regions',
      post: '/api/regions',
      put: '/api/regions/{slug}',
      delete: '/api/regions/{slug}',
    },
    frontend: {
      list: '/hizmet-bolgeleri',
      detail: '/{slug}.html', // .html uzantılı
    },
    checks: [
      'Admin liste sayfası yükleniyor mu?',
      'Yeni bölge oluşturma formu çalışıyor mu?',
      'Bölge düzenleme sayfası açılıyor mu?',
      'API GET tüm bölgeleri getiriyor mu?',
      'Frontend liste sayfası render ediliyor mu?',
      'Frontend detay sayfası .html ile çalışıyor mu?',
      'Yeni bölge eklendiğinde otomatik .html alıyor mu?',
      'Middleware .html rewrite çalışıyor mu?',
      'MediaPicker görsel seçimi çalışıyor mu?',
      'Content editörü (HTML) çalışıyor mu?',
      'SEO alanları kaydediliyor mu?',
      'Geo koordinatlar kaydediliyor mu?',
      'District/Intercity type seçimi çalışıyor mu?',
    ]
  },
  pages: {
    name: 'Sayfalar',
    admin: {
      list: '/admin/pages',
      edit: '/admin/pages/{id}',
    },
    api: {
      get: '/api/pages',
      put: '/api/pages/{id}',
    },
    frontend: {
      dynamic: true, // Her sayfa farklı slug
    },
    checks: [
      'Admin liste sayfası yükleniyor mu?',
      'Sayfa düzenleme sayfası açılıyor mu?',
      'RichTextEditor çalışıyor mu?',
      'MediaPicker çalışıyor mu?',
      'Section bazlı içerik düzenleme çalışıyor mu?',
      'SEO metadata kaydediliyor mu?',
      'Frontend sayfalar dynamic content gösteriyor mu?',
      'Hero content render ediliyor mu?',
      'seoText section render ediliyor mu?',
      'Array field (FAQ, items) ekleme/silme çalışıyor mu?',
      'Background image upload çalışıyor mu?',
    ]
  },
  blog: {
    name: 'Blog',
    admin: {
      list: '/admin/blog',
      create: 'inline', // Modal/inline form
      edit: 'inline',
    },
    api: {
      get: '/api/blog',
      getAdmin: '/api/blog?admin=true',
      post: '/api/blog',
      put: '/api/blog/{slug}',
      delete: '/api/blog/{slug}',
    },
    frontend: {
      list: '/blog',
      detail: '/{slug}', // catch-all route
    },
    checks: [
      'Admin liste sayfası yükleniyor mu?',
      'Yeni yazı oluşturma formu açılıyor mu?',
      'Yazı düzenleme formu açılıyor mu?',
      'RichTextEditor çalışıyor mu?',
      'HTML kaynak modu çalışıyor mu?',
      'HTML kaynak → normal görünüm geçişinde içerik korunuyor mu?',
      'MediaPicker görsel seçimi çalışıyor mu?',
      'API GET admin=true tüm yazıları (taslak dahil) getiriyor mu?',
      'API GET public sadece yayında olanları getiriyor mu?',
      'Taslak yazılar kaydediliyor mu?',
      'Yayınlanan yazılar frontend\'de görünüyor mu?',
      'dynamicParams=true yeni yazıları kapsıyor mu?',
      'SEO metadata kaydediliyor mu?',
      'Kategori ve etiketler çalışıyor mu?',
    ]
  },
  settings: {
    name: 'Ayarlar',
    admin: {
      main: '/admin/settings',
    },
    api: {
      get: '/api/settings',
      put: '/api/settings',
    },
    checks: [
      'Settings sayfası yükleniyor mu?',
      'NAP bilgileri kaydediliyor mu?',
      'Site bilgileri (logo, favicon, OG image) kaydediliyor mu?',
      'Logo/favicon upload çalışıyor mu?',
      'Social media linkleri kaydediliyor mu?',
      'Integrations (GA4, GTM, Clarity) kaydediliyor mu?',
      'Custom code injection çalışıyor mu?',
      'Service categories yönetimi çalışıyor mu?',
      'Blog categories yönetimi çalışıyor mu?',
      'Activity log görüntüleniyor mu?',
      'Backup/restore çalışıyor mu?',
    ]
  },
  media: {
    name: 'Medya',
    api: {
      list: '/api/media',
      upload: '/api/upload',
      uploadIcon: '/api/media/upload-icon',
      delete: '/api/media',
    },
    checks: [
      'MediaPicker modal açılıyor mu?',
      'Medya listesi yükleniyor mu?',
      'Görsel upload çalışıyor mu?',
      'Klasör filtreleme çalışıyor mu?',
      'Arama çalışıyor mu?',
      'Görsel seçimi çalışıyor mu?',
      'Görsel silme çalışıyor mu?',
      'Icon upload (logo, favicon) çalışıyor mu?',
    ]
  },
  auth: {
    name: 'Kimlik Doğrulama',
    routes: {
      login: '/admin',
      logout: '/api/auth/signout',
    },
    checks: [
      'Login sayfası yükleniyor mu?',
      'Giriş yapma çalışıyor mu?',
      'Session 30 gün süreyle korunuyor mu?',
      'Yetkisiz erişim engelleniyor mu?',
      'Logout çalışıyor mu?',
    ]
  }
};

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   KOZCUOĞLU NAKLİYAT - SİSTEM TEST RAPORU                 ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('📋 TEST KAPSAMI:\n');
Object.entries(tests).forEach(([key, module]) => {
  console.log(`✓ ${module.name}`);
  console.log(`  - Admin: ${Object.keys(module.admin || {}).length} sayfa`);
  console.log(`  - API: ${Object.keys(module.api || {}).length} endpoint`);
  console.log(`  - Frontend: ${Object.keys(module.frontend || {}).length} sayfa`);
  console.log(`  - Kontrol: ${module.checks.length} madde\n`);
});

console.log('\n📊 TOPLAM TEST SAYISI:');
const totalChecks = Object.values(tests).reduce((sum, m) => sum + m.checks.length, 0);
console.log(`   ${totalChecks} adet kontrol maddesi\n`);

console.log('\n⚠️  NOT: Bu script manuel test rehberidir.');
console.log('   Gerçek kullanıcı senaryolarıyla test edilmelidir.\n');

console.log('\n🔍 ÖNERİLEN TEST SIRASI:\n');
console.log('1. HİZMETLER SİSTEMİ');
console.log('   → Admin: Yeni hizmet ekle');
console.log('   → Content: HTML editör ile içerik ekle');
console.log('   → Media: Görsel yükle');
console.log('   → SEO: Metadata doldur');
console.log('   → Kaydet ve frontend\'de kontrol et\n');

console.log('2. ÇÖZÜMLER SİSTEMİ');
console.log('   → Admin: Yeni çözüm ekle');
console.log('   → Content: HTML editör ile içerik ekle');
console.log('   → Sıralama: Drag-drop test et');
console.log('   → Frontend\'de kontrol et\n');

console.log('3. BÖLGELER SİSTEMİ');
console.log('   → Admin: Yeni bölge ekle');
console.log('   → Slug: Otomatik oluşturuluyor mu?');
console.log('   → Frontend: .html uzantısı ile açılıyor mu?');
console.log('   → Middleware: Rewrite çalışıyor mu?\n');

console.log('4. SAYFALAR SİSTEMİ');
console.log('   → Admin: Ana sayfa düzenle');
console.log('   → RichTextEditor: İçerik ekle');
console.log('   → MediaPicker: Görsel seç');
console.log('   → Frontend: Dynamic content render ediliyor mu?\n');

console.log('5. BLOG SİSTEMİ');
console.log('   → Admin: Yeni yazı ekle');
console.log('   → RichTextEditor: HTML kaynak modu test et');
console.log('   → MediaPicker: Görsel seç');
console.log('   → Taslak kaydet → Yayınla');
console.log('   → Frontend: Yazı görünüyor mu?\n');

console.log('\n✅ TEST SONUÇLARI İÇİN:');
console.log('   Her modül için yukarıdaki kontrol maddelerini işaretle');
console.log('   Çalışmayan özellikleri not et');
console.log('   Hata mesajlarını kaydet\n');
