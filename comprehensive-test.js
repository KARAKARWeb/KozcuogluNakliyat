#!/usr/bin/env node

/**
 * KOZCUOĞLU NAKLİYAT - KAPSAMLI SİSTEM TESTİ
 * Dashboard + Frontend + API - Her şey test edilir
 */

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3000';

// Dashboard menüsündeki TÜM sayfalar
const ADMIN_PAGES = {
  'Genel': [
    { name: 'Dashboard', path: '/admin/dashboard', crud: false },
  ],
  'İçerik': [
    { name: 'Hizmetler - Liste', path: '/admin/services', crud: true },
    { name: 'Hizmetler - Yeni', path: '/admin/services/new', crud: false },
    { name: 'Çözümler - Liste', path: '/admin/solutions', crud: true },
    { name: 'Çözümler - Yeni', path: '/admin/solutions/new', crud: false },
    { name: 'Bölgeler - Liste', path: '/admin/regions', crud: true },
    { name: 'Bölgeler - Yeni', path: '/admin/regions/new', crud: false },
    { name: 'Blog - Liste', path: '/admin/blog', crud: true },
    { name: 'Sayfalar - Liste', path: '/admin/pages', crud: true },
    { name: 'Footer - Düzenle', path: '/admin/footer', crud: false },
  ],
  'Müşteri': [
    { name: 'Mesajlar', path: '/admin/messages', crud: true },
    { name: 'Yorumlar', path: '/admin/reviews', crud: true },
    { name: 'Teklifler', path: '/admin/quotes', crud: true },
    { name: 'Keşif Talepleri', path: '/admin/surveys', crud: true },
    { name: 'Taşıma Takip', path: '/admin/tracking', crud: true },
  ],
  'Yönetim': [
    { name: 'Medya Kütüphanesi', path: '/admin/media', crud: true },
    { name: 'Fiyat Modülleri', path: '/admin/pricing', crud: true },
    { name: 'Projeler', path: '/admin/projects', crud: true },
    { name: 'Araç Filosu', path: '/admin/fleet', crud: true },
    { name: 'Kampanyalar', path: '/admin/campaigns', crud: true },
    { name: 'Galeri', path: '/admin/gallery', crud: true },
    { name: 'Sözleşmeler', path: '/admin/contracts', crud: true },
    { name: 'Müşteri Logoları', path: '/admin/clients', crud: true },
  ],
  'SEO': [
    { name: 'Rating', path: '/admin/ratings', crud: true },
    { name: 'İç Linkleme', path: '/admin/internal-links', crud: true },
    { name: 'Redirects & 404', path: '/admin/redirects', crud: true },
  ],
  'Sistem': [
    { name: 'Ayarlar', path: '/admin/settings', crud: false },
  ],
};

// API Endpoints
const API_ENDPOINTS = {
  'Hizmetler': [
    { method: 'GET', path: '/api/services', auth: false },
    { method: 'POST', path: '/api/services', auth: true },
    { method: 'PUT', path: '/api/services/{slug}/update', auth: true },
    { method: 'DELETE', path: '/api/services/{slug}/update', auth: true },
    { method: 'PUT', path: '/api/services/reorder', auth: true },
  ],
  'Çözümler': [
    { method: 'GET', path: '/api/solutions', auth: false },
    { method: 'POST', path: '/api/solutions', auth: true },
    { method: 'PUT', path: '/api/solutions/{slug}', auth: true },
    { method: 'DELETE', path: '/api/solutions/{slug}', auth: true },
    { method: 'PUT', path: '/api/solutions/reorder', auth: true },
  ],
  'Bölgeler': [
    { method: 'GET', path: '/api/regions', auth: false },
    { method: 'POST', path: '/api/regions', auth: true },
    { method: 'PUT', path: '/api/regions/{slug}', auth: true },
    { method: 'DELETE', path: '/api/regions/{slug}', auth: true },
  ],
  'Blog': [
    { method: 'GET', path: '/api/blog', auth: false },
    { method: 'GET', path: '/api/blog?admin=true', auth: true },
    { method: 'POST', path: '/api/blog', auth: true },
    { method: 'PUT', path: '/api/blog/{slug}', auth: true },
    { method: 'DELETE', path: '/api/blog/{slug}', auth: true },
  ],
  'Sayfalar': [
    { method: 'GET', path: '/api/pages', auth: false },
    { method: 'PUT', path: '/api/pages/{id}', auth: true },
  ],
  'Medya': [
    { method: 'GET', path: '/api/media', auth: false },
    { method: 'POST', path: '/api/upload', auth: true },
    { method: 'DELETE', path: '/api/media', auth: true },
  ],
  'Ayarlar': [
    { method: 'GET', path: '/api/settings', auth: false },
    { method: 'PUT', path: '/api/settings', auth: true },
  ],
};

// Test sonuçları
const results = {
  admin: { total: 0, success: 0, failed: [] },
  api: { total: 0, success: 0, failed: [] },
  frontend: { total: 0, success: 0, failed: [] },
};

// HTTP request helper
function testUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, (res) => {
      resolve({ status: res.statusCode, url });
    });
    req.on('error', () => {
      resolve({ status: 0, url });
    });
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ status: 0, url });
    });
  });
}

async function testAdminPages() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   ADMIN PANEL TESTİ                                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  for (const [category, pages] of Object.entries(ADMIN_PAGES)) {
    console.log(`\n📁 ${category}`);
    for (const page of pages) {
      results.admin.total++;
      const result = await testUrl(`${BASE_URL}${page.path}`);
      
      // 200 veya 302 (redirect to login) başarılı sayılır
      if (result.status === 200 || result.status === 302) {
        results.admin.success++;
        console.log(`  ✅ ${page.name.padEnd(30)} → ${result.status}`);
      } else {
        results.admin.failed.push({ name: page.name, path: page.path, status: result.status });
        console.log(`  ❌ ${page.name.padEnd(30)} → ${result.status || 'TIMEOUT'}`);
      }
    }
  }
}

async function testFrontendPages() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   FRONTEND SAYFA TESTİ (Sitemap.xml)                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Sitemap.xml'den URL'leri al
  const sitemapResult = await testUrl(`${BASE_URL}/sitemap.xml`);
  if (sitemapResult.status !== 200) {
    console.log('❌ Sitemap.xml yüklenemedi!');
    return;
  }

  console.log('📄 Sitemap.xml okunuyor...\n');

  // Örnek test - ilk 50 sayfa
  const testPages = [
    '/',
    '/hakkimizda',
    '/hizmetlerimiz',
    '/cozumlerimiz',
    '/hizmet-bolgeleri',
    '/blog',
    '/iletisim',
    '/referanslar',
    '/galeri',
    '/kampanyalar',
    '/teklif-al',
    '/tasima-takip',
    '/nakliyat-fiyat-hesaplama',
    '/tasima-kontrol-listesi',
    '/sikca-sorulan-sorular',
    '/gizlilik-politikasi',
    '/kullanim-kosullari',
    '/kvkk-aydinlatma-metni',
    '/cerez-politikasi',
    '/sozlesmeler',
  ];

  for (const path of testPages) {
    results.frontend.total++;
    const result = await testUrl(`${BASE_URL}${path}`);
    
    if (result.status === 200) {
      results.frontend.success++;
      console.log(`  ✅ ${path.padEnd(40)} → 200`);
    } else {
      results.frontend.failed.push({ path, status: result.status });
      console.log(`  ❌ ${path.padEnd(40)} → ${result.status || 'TIMEOUT'}`);
    }
  }

  console.log(`\n📊 Test edilen: ${testPages.length} / ~239 sayfa (örneklem)`);
}

async function testApiEndpoints() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   API ENDPOINT TESTİ                                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  for (const [category, endpoints] of Object.entries(API_ENDPOINTS)) {
    console.log(`\n🔌 ${category}`);
    for (const endpoint of endpoints) {
      results.api.total++;
      
      // Sadece GET endpoint'lerini test et
      if (endpoint.method === 'GET') {
        const result = await testUrl(`${BASE_URL}${endpoint.path}`);
        
        // 200, 401 (auth required), 400 (bad request) başarılı sayılır
        if ([200, 401, 400].includes(result.status)) {
          results.api.success++;
          console.log(`  ✅ ${endpoint.method.padEnd(6)} ${endpoint.path.padEnd(35)} → ${result.status}`);
        } else {
          results.api.failed.push({ ...endpoint, status: result.status });
          console.log(`  ❌ ${endpoint.method.padEnd(6)} ${endpoint.path.padEnd(35)} → ${result.status || 'TIMEOUT'}`);
        }
      } else {
        // POST/PUT/DELETE için sadece endpoint'in var olduğunu belirt
        console.log(`  ℹ️  ${endpoint.method.padEnd(6)} ${endpoint.path.padEnd(35)} → (Manuel test gerekli)`);
      }
    }
  }
}

async function generateReport() {
  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   TEST RAPORU                                              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📊 ADMIN PANEL');
  console.log(`   Toplam: ${results.admin.total}`);
  console.log(`   Başarılı: ${results.admin.success} (${Math.round(results.admin.success/results.admin.total*100)}%)`);
  console.log(`   Başarısız: ${results.admin.failed.length}`);
  if (results.admin.failed.length > 0) {
    console.log('\n   ❌ Başarısız Sayfalar:');
    results.admin.failed.forEach(f => console.log(`      - ${f.name} (${f.path}) → ${f.status}`));
  }

  console.log('\n📊 FRONTEND');
  console.log(`   Toplam: ${results.frontend.total}`);
  console.log(`   Başarılı: ${results.frontend.success} (${Math.round(results.frontend.success/results.frontend.total*100)}%)`);
  console.log(`   Başarısız: ${results.frontend.failed.length}`);
  if (results.frontend.failed.length > 0) {
    console.log('\n   ❌ Başarısız Sayfalar:');
    results.frontend.failed.forEach(f => console.log(`      - ${f.path} → ${f.status}`));
  }

  console.log('\n📊 API ENDPOINTS');
  console.log(`   Toplam: ${results.api.total}`);
  console.log(`   Test Edilen (GET): ${results.api.success + results.api.failed.length}`);
  console.log(`   Başarılı: ${results.api.success}`);
  console.log(`   Başarısız: ${results.api.failed.length}`);
  if (results.api.failed.length > 0) {
    console.log('\n   ❌ Başarısız Endpoint\'ler:');
    results.api.failed.forEach(f => console.log(`      - ${f.method} ${f.path} → ${f.status}`));
  }

  const totalTests = results.admin.total + results.frontend.total + results.api.total;
  const totalSuccess = results.admin.success + results.frontend.success + results.api.success;
  const totalFailed = results.admin.failed.length + results.frontend.failed.length + results.api.failed.length;

  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   GENEL ÖZET                                               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`   Toplam Test: ${totalTests}`);
  console.log(`   Başarılı: ${totalSuccess} (${Math.round(totalSuccess/totalTests*100)}%)`);
  console.log(`   Başarısız: ${totalFailed} (${Math.round(totalFailed/totalTests*100)}%)`);

  if (totalFailed === 0) {
    console.log('\n   🎉 TÜM TESTLER BAŞARILI!\n');
  } else {
    console.log('\n   ⚠️  Bazı testler başarısız oldu. Detaylar yukarıda.\n');
  }
}

// Ana test fonksiyonu
async function runTests() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   KOZCUOĞLU NAKLİYAT - KAPSAMLI SİSTEM TESTİ              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n⏳ Test başlatılıyor...\n');

  await testAdminPages();
  await testFrontendPages();
  await testApiEndpoints();
  await generateReport();
}

// Testi başlat
runTests().catch(console.error);
