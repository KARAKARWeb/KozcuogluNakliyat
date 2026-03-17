import { NextRequest, NextResponse } from "next/server";

// Basit mesafe hesaplama - Türkiye şehirleri arası yaklaşık mesafeler
const CITY_DISTANCES: { [key: string]: { [key: string]: number } } = {
  "İstanbul": {
    "Ankara": 450,
    "İzmir": 480,
    "Bursa": 150,
    "Antalya": 720,
    "Adana": 940,
    "Konya": 660,
    "Gaziantep": 1150,
    "Kayseri": 770,
    "Eskişehir": 330,
    "Kocaeli": 100,
  },
  "Ankara": {
    "İstanbul": 450,
    "İzmir": 590,
    "Bursa": 380,
    "Antalya": 480,
    "Adana": 500,
    "Konya": 260,
    "Gaziantep": 710,
    "Kayseri": 330,
    "Eskişehir": 230,
  },
  "İzmir": {
    "İstanbul": 480,
    "Ankara": 590,
    "Bursa": 380,
    "Antalya": 480,
    "Adana": 1000,
    "Konya": 560,
    "Manisa": 40,
    "Aydın": 130,
  },
};

// İlçe bazlı mesafe hesaplama (İstanbul için)
const ISTANBUL_DISTRICTS: { [key: string]: number } = {
  "Kadıköy": 0,
  "Beşiktaş": 15,
  "Şişli": 18,
  "Beyoğlu": 12,
  "Üsküdar": 8,
  "Ümraniye": 25,
  "Kartal": 30,
  "Maltepe": 22,
  "Pendik": 35,
  "Tuzla": 45,
  "Bakırköy": 20,
  "Bahçelievler": 18,
  "Küçükçekmece": 28,
  "Avcılar": 35,
  "Beylikdüzü": 40,
  "Esenyurt": 45,
  "Başakşehir": 38,
  "Sultangazi": 32,
  "Eyüpsultan": 28,
  "Sarıyer": 25,
  "Beykoz": 30,
  "Çekmeköy": 35,
  "Sancaktepe": 32,
  "Sultanbeyli": 40,
  "Arnavutköy": 42,
  "Silivri": 65,
  "Çatalca": 70,
};

export async function POST(req: NextRequest) {
  try {
    const { from, to } = await req.json();

    if (!from || !to) {
      return NextResponse.json({ success: false, error: "Başlangıç ve varış noktası gerekli" }, { status: 400 });
    }

    let distance = 0;

    // Aynı yer ise
    if (from === to) {
      distance = 0;
    }
    // İstanbul ilçeleri arası
    else if (ISTANBUL_DISTRICTS[from] !== undefined && ISTANBUL_DISTRICTS[to] !== undefined) {
      distance = Math.abs(ISTANBUL_DISTRICTS[from] - ISTANBUL_DISTRICTS[to]);
    }
    // Şehirler arası
    else if (CITY_DISTANCES[from]?.[to]) {
      distance = CITY_DISTANCES[from][to];
    }
    else if (CITY_DISTANCES[to]?.[from]) {
      distance = CITY_DISTANCES[to][from];
    }
    // Bulunamadıysa varsayılan
    else {
      distance = 50; // Varsayılan şehir içi mesafe
    }

    return NextResponse.json({ 
      success: true, 
      data: { 
        from, 
        to, 
        distance,
        unit: "km"
      } 
    });
  } catch (error) {
    console.error("Distance calculation error:", error);
    return NextResponse.json({ success: false, error: "Mesafe hesaplanamadı" }, { status: 500 });
  }
}
