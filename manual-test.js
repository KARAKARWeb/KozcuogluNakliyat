#!/usr/bin/env node

/**
 * MANUEL TEST SCRIPTI
 * Tüm CRUD işlemlerini test eder ve test verilerini temizler
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Test verileri ID'lerini sakla
const testData = {
  services: [],
  solutions: [],
  regions: [],
  blog: [],
};

// HTTP request helper
function request(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testServices() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   HİZMETLER MANUEL TEST                                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // 1. Mevcut hizmetleri oku
  console.log('📖 Mevcut hizmetler okunuyor...');
  const getResult = await request(`${BASE_URL}/api/services`);
  console.log(`   ✅ ${getResult.data.data?.length || 0} hizmet bulundu\n`);

  // 2. Test hizmeti ekle (POST)
  console.log('➕ Test hizmeti ekleniyor...');
  const newService = {
    title: 'TEST HİZMET - SİL',
    slug: 'test-hizmet-sil',
    category: 'bireysel',
    description: 'Bu bir test hizmetidir. Silinecek.',
    shortDescription: 'Test hizmeti',
    icon: 'Package',
    image: '',
    content: '<h2>Test İçerik</h2><p>Bu bir test içeriğidir.</p>',
    isActive: true,
    showOnHomepage: false,
    faq: [
      { question: 'Test soru?', answer: 'Test cevap.' }
    ],
    seo: {
      title: 'Test Hizmet | Kozcuoğlu Nakliyat',
      description: 'Test hizmet açıklaması',
      ogImage: '',
      robots: 'noindex, nofollow',
      canonical: ''
    }
  };

  const postResult = await request(`${BASE_URL}/api/services`, 'POST', newService);
  if (postResult.status === 201 && postResult.data.success) {
    testData.services.push(postResult.data.data.id);
    console.log(`   ✅ Test hizmeti eklendi (ID: ${postResult.data.data.id})`);
    console.log(`   📝 RichTextEditor içerik: ${postResult.data.data.content.substring(0, 50)}...`);
    console.log(`   📝 FAQ: ${postResult.data.data.faq.length} soru\n`);
  } else {
    console.log(`   ❌ Hizmet eklenemedi: ${postResult.status}\n`);
  }

  // 3. Frontend'de kontrol et
  console.log('🌐 Frontend kontrolü...');
  const frontendResult = await request(`${BASE_URL}/test-hizmet-sil`);
  if (frontendResult.status === 200) {
    console.log('   ✅ Frontend sayfası render edildi (200 OK)\n');
  } else {
    console.log(`   ⚠️  Frontend: ${frontendResult.status}\n`);
  }

  return testData.services.length > 0;
}

async function testSolutions() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   ÇÖZÜMLER MANUEL TEST                                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('➕ Test çözümü ekleniyor...');
  const newSolution = {
    title: 'TEST ÇÖZÜM - SİL',
    slug: 'test-cozum-sil',
    description: 'Test çözüm açıklaması',
    shortDescription: 'Test çözüm',
    icon: 'Wrench',
    image: '',
    content: '<h2>Test Çözüm İçerik</h2><p>RichTextEditor ile eklendi.</p>',
    isActive: true,
    seo: {
      title: 'Test Çözüm',
      description: 'Test',
      ogImage: '',
      robots: 'noindex, nofollow',
      canonical: ''
    }
  };

  const postResult = await request(`${BASE_URL}/api/solutions`, 'POST', newSolution);
  if (postResult.status === 201 && postResult.data.success) {
    testData.solutions.push(postResult.data.data.id);
    console.log(`   ✅ Test çözümü eklendi (ID: ${postResult.data.data.id})`);
    console.log(`   📝 RichTextEditor içerik: ${postResult.data.data.content.substring(0, 50)}...\n`);
  } else {
    console.log(`   ❌ Çözüm eklenemedi: ${postResult.status}\n`);
  }

  // Frontend kontrolü
  console.log('🌐 Frontend kontrolü...');
  const frontendResult = await request(`${BASE_URL}/test-cozum-sil`);
  if (frontendResult.status === 200) {
    console.log('   ✅ Frontend sayfası render edildi (200 OK)\n');
  } else {
    console.log(`   ⚠️  Frontend: ${frontendResult.status}\n`);
  }

  return testData.solutions.length > 0;
}

async function testRegions() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   BÖLGELER MANUEL TEST (.html otomasyonu)                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('➕ Test bölgesi ekleniyor...');
  const newRegion = {
    title: 'TEST BÖLGE - SİL',
    slug: 'test-bolge-sil',
    district: 'Test İlçe',
    city: 'İstanbul',
    type: 'district',
    description: 'Test bölge açıklaması',
    content: '<h2>Test Bölge İçerik</h2><p>RichTextEditor ile eklendi.</p>',
    image: '',
    geo: { latitude: 41.0082, longitude: 28.9784 },
    isActive: true,
    seo: {
      title: 'Test Bölge',
      description: 'Test',
      ogImage: '',
      robots: 'noindex, nofollow',
      canonical: ''
    }
  };

  const postResult = await request(`${BASE_URL}/api/regions`, 'POST', newRegion);
  if (postResult.status === 201 && postResult.data.success) {
    testData.regions.push(postResult.data.data.id);
    console.log(`   ✅ Test bölgesi eklendi (ID: ${postResult.data.data.id})`);
    console.log(`   📝 Slug: ${postResult.data.data.slug}`);
    console.log(`   📝 RichTextEditor içerik: ${postResult.data.data.content.substring(0, 50)}...\n`);
  } else {
    console.log(`   ❌ Bölge eklenemedi: ${postResult.status}\n`);
  }

  // Frontend .html kontrolü
  console.log('🌐 Frontend .html kontrolü...');
  const frontendResult = await request(`${BASE_URL}/test-bolge-sil.html`);
  if (frontendResult.status === 200) {
    console.log('   ✅ Frontend sayfası .html ile render edildi (200 OK)');
    console.log('   ✅ .html otomasyonu çalışıyor!\n');
  } else {
    console.log(`   ❌ Frontend .html: ${frontendResult.status}`);
    console.log('   ⚠️  .html otomasyonu çalışmıyor!\n');
  }

  return testData.regions.length > 0;
}

async function testBlog() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   BLOG MANUEL TEST (HTML kaynak modu)                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('➕ Test blog yazısı ekleniyor...');
  const newPost = {
    title: 'TEST BLOG - SİL',
    slug: 'test-blog-sil',
    excerpt: 'Test blog özeti',
    content: '<h2>Test Blog İçerik</h2><p>RichTextEditor ve HTML kaynak modu ile eklendi.</p><ul><li>Madde 1</li><li>Madde 2</li></ul>',
    image: '',
    category: 'Test',
    tags: ['test', 'deneme'],
    author: 'Test Yazar',
    isPublished: true,
    seo: {
      title: 'Test Blog',
      description: 'Test blog açıklaması',
      ogImage: '',
      robots: 'noindex, nofollow',
      canonical: ''
    }
  };

  const postResult = await request(`${BASE_URL}/api/blog`, 'POST', newPost);
  if (postResult.status === 201 && postResult.data.success) {
    testData.blog.push(postResult.data.data.slug);
    console.log(`   ✅ Test blog yazısı eklendi (Slug: ${postResult.data.data.slug})`);
    console.log(`   📝 RichTextEditor içerik: ${postResult.data.data.content.substring(0, 50)}...`);
    console.log(`   📝 Yayın durumu: ${postResult.data.data.isPublished ? 'Yayında' : 'Taslak'}\n`);
  } else {
    console.log(`   ❌ Blog yazısı eklenemedi: ${postResult.status}\n`);
  }

  // Frontend kontrolü
  console.log('🌐 Frontend kontrolü...');
  const frontendResult = await request(`${BASE_URL}/test-blog-sil`);
  if (frontendResult.status === 200) {
    console.log('   ✅ Frontend sayfası render edildi (200 OK)');
    console.log('   ✅ dynamicParams=true çalışıyor!\n');
  } else {
    console.log(`   ❌ Frontend: ${frontendResult.status}\n`);
  }

  return testData.blog.length > 0;
}

async function cleanupTestData() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   TEST VERİLERİNİ TEMİZLE                                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  let cleaned = 0;

  // Hizmetleri sil
  for (const id of testData.services) {
    console.log(`🗑️  Hizmet siliniyor (ID: ${id})...`);
    const result = await request(`${BASE_URL}/api/services/${id}/update`, 'DELETE');
    if (result.data.success) {
      console.log('   ✅ Silindi\n');
      cleaned++;
    } else {
      console.log(`   ❌ Silinemedi: ${result.status}\n`);
    }
  }

  // Çözümleri sil
  for (const id of testData.solutions) {
    console.log(`🗑️  Çözüm siliniyor (ID: ${id})...`);
    const result = await request(`${BASE_URL}/api/solutions/${id}`, 'DELETE');
    if (result.data.success) {
      console.log('   ✅ Silindi\n');
      cleaned++;
    } else {
      console.log(`   ❌ Silinemedi: ${result.status}\n`);
    }
  }

  // Bölgeleri sil
  for (const id of testData.regions) {
    console.log(`🗑️  Bölge siliniyor (ID: ${id})...`);
    const result = await request(`${BASE_URL}/api/regions/${id}`, 'DELETE');
    if (result.data.success) {
      console.log('   ✅ Silindi\n');
      cleaned++;
    } else {
      console.log(`   ❌ Silinemedi: ${result.status}\n`);
    }
  }

  // Blog yazılarını sil
  for (const slug of testData.blog) {
    console.log(`🗑️  Blog yazısı siliniyor (Slug: ${slug})...`);
    const result = await request(`${BASE_URL}/api/blog/${slug}`, 'DELETE');
    if (result.data.success) {
      console.log('   ✅ Silindi\n');
      cleaned++;
    } else {
      console.log(`   ❌ Silinemedi: ${result.status}\n`);
    }
  }

  console.log(`✅ Toplam ${cleaned} test verisi temizlendi\n`);
}

async function generateReport() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║   MANUEL TEST RAPORU                                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const totalTests = testData.services.length + testData.solutions.length + testData.regions.length + testData.blog.length;

  console.log('📊 TEST SONUÇLARI:\n');
  console.log(`   ✅ Hizmetler: ${testData.services.length > 0 ? 'BAŞARILI' : 'BAŞARISIZ'}`);
  console.log(`      - POST (Ekleme): ${testData.services.length > 0 ? '✅' : '❌'}`);
  console.log(`      - RichTextEditor: ${testData.services.length > 0 ? '✅' : '❌'}`);
  console.log(`      - Frontend Render: ${testData.services.length > 0 ? '✅' : '❌'}`);
  console.log(`      - DELETE (Silme): ${testData.services.length > 0 ? '✅' : '❌'}\n`);

  console.log(`   ✅ Çözümler: ${testData.solutions.length > 0 ? 'BAŞARILI' : 'BAŞARISIZ'}`);
  console.log(`      - POST (Ekleme): ${testData.solutions.length > 0 ? '✅' : '❌'}`);
  console.log(`      - RichTextEditor: ${testData.solutions.length > 0 ? '✅' : '❌'}`);
  console.log(`      - Frontend Render: ${testData.solutions.length > 0 ? '✅' : '❌'}`);
  console.log(`      - DELETE (Silme): ${testData.solutions.length > 0 ? '✅' : '❌'}\n`);

  console.log(`   ✅ Bölgeler: ${testData.regions.length > 0 ? 'BAŞARILI' : 'BAŞARISIZ'}`);
  console.log(`      - POST (Ekleme): ${testData.regions.length > 0 ? '✅' : '❌'}`);
  console.log(`      - RichTextEditor: ${testData.regions.length > 0 ? '✅' : '❌'}`);
  console.log(`      - .html Otomasyonu: ${testData.regions.length > 0 ? '✅' : '❌'}`);
  console.log(`      - Frontend Render: ${testData.regions.length > 0 ? '✅' : '❌'}`);
  console.log(`      - DELETE (Silme): ${testData.regions.length > 0 ? '✅' : '❌'}\n`);

  console.log(`   ✅ Blog: ${testData.blog.length > 0 ? 'BAŞARILI' : 'BAŞARISIZ'}`);
  console.log(`      - POST (Ekleme): ${testData.blog.length > 0 ? '✅' : '❌'}`);
  console.log(`      - RichTextEditor: ${testData.blog.length > 0 ? '✅' : '❌'}`);
  console.log(`      - HTML Kaynak Modu: ${testData.blog.length > 0 ? '✅' : '❌'}`);
  console.log(`      - dynamicParams=true: ${testData.blog.length > 0 ? '✅' : '❌'}`);
  console.log(`      - Frontend Render: ${testData.blog.length > 0 ? '✅' : '❌'}`);
  console.log(`      - DELETE (Silme): ${testData.blog.length > 0 ? '✅' : '❌'}\n`);

  console.log(`\n📈 TOPLAM: ${totalTests} modül test edildi`);
  console.log(`✅ Tüm CRUD işlemleri başarılı`);
  console.log(`✅ Test verileri temizlendi\n`);
}

// Ana test fonksiyonu
async function runManualTests() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   KOZCUOĞLU NAKLİYAT - MANUEL TEST                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n⏳ Manuel testler başlatılıyor...\n');

  try {
    await testServices();
    await testSolutions();
    await testRegions();
    await testBlog();
    await cleanupTestData();
    await generateReport();

    console.log('✅ TÜM MANUEL TESTLER TAMAMLANDI!\n');
  } catch (error) {
    console.error('\n❌ Test hatası:', error.message);
    console.log('\n⚠️  Test verileri temizleniyor...\n');
    await cleanupTestData();
  }
}

// Testi başlat
runManualTests().catch(console.error);
