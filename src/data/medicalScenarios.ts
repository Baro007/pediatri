import { RashData, LimpData, MedicalScenario, AlgorithmStep } from '../types/medical';

export const rashData: RashData[] = [
  {
    name: 'Kızamık (Rubeola)',
    prodrome: '3K: Öksürük, Burun akıntısı, Konjonktivit. Yüksek ateş.',
    rash: 'Baştan başlayıp yayılan, birleşen makülopapüler döküntü.',
    clue: 'Koplik lekeleri (ağız içi).'
  },
  {
    name: 'Kızıl (Scarlet Fever)',
    prodrome: 'Ani ateş, boğaz ağrısı, kusma.',
    rash: 'İnce, kırmızı, zımpara kağıdı hissi veren döküntü. Ağız çevresi soluk.',
    clue: 'Çilek dili, Pastia çizgileri.'
  },
  {
    name: '5. Hastalık',
    prodrome: 'Genellikle prodromsuz.',
    rash: 'Önce "tokatlanmış yüz" görünümü, sonra dantelimsi (retiküler) döküntü.',
    clue: 'Döküntünün tipik görünümü.'
  },
  {
    name: '6. Hastalık',
    prodrome: '3-5 gün süren yüksek ateş.',
    rash: 'Ateş düştükten sonra aniden ortaya çıkan soluk pembe döküntü.',
    clue: 'Ateşin düşmesiyle döküntünün başlaması.'
  },
  {
    name: 'Su Çiçeği (Varisella)',
    prodrome: 'Hafif ateş, halsizlik.',
    rash: 'Kaşıntılı, farklı evrelerdeki (vezikül, püstül, krut) lezyonların bir arada olması.',
    clue: 'Lezyonların polimorfizmi.'
  },
  {
    name: 'El-Ayak-Ağız',
    prodrome: 'Hafif ateş, boğaz ağrısı.',
    rash: 'El, ayak ve ağız çevresinde veziküler lezyonlar.',
    clue: 'Lezyonların tipik lokalizasyonu.'
  }
];

export const limpData: LimpData[] = [
  {
    etiology: 'Enfeksiyon/İnflamasyon',
    '1-3': '<strong>Septik Artrit</strong>, <strong>Geçici Sinovit</strong>, Osteomiyelit',
    '4-10': '<strong>Geçici Sinovit</strong>, Septik Artrit',
    '11-15': 'Septik Artrit'
  },
  {
    etiology: 'Ortopedik/Mekanik',
    '1-3': '<strong>GKD</strong>, Toddler\'s Fracture',
    '4-10': '<strong>Legg-Calve-Perthes</strong>',
    '11-15': '<strong>SCFE</strong>, Osgood-Schlatter'
  },
  {
    etiology: 'Tümöral',
    '1-3': 'Lösemi, Nöroblastoma',
    '4-10': 'Lösemi, Osteoid Osteoma',
    '11-15': 'Osteosarkom, Ewing'
  },
  {
    etiology: 'Romatolojik',
    '1-3': 'JİA',
    '4-10': 'JİA, HSP',
    '11-15': 'JİA, SLE'
  }
];

export const cyanosisAlgorithmSteps: AlgorithmStep[] = [
  {
    id: 'step-1',
    question: 'Çocukta santral siyanoz var mı?',
    type: 'question',
    options: [
      { label: 'Evet', value: 'yes', nextStepId: 'step-2' },
      { label: 'Hayır', value: 'no', nextStepId: 'result-no-cyanosis' }
    ]
  },
  {
    id: 'step-2',
    question: 'Solunum sıkıntısı bulguları var mı? (Takipne, Retraksiyon)',
    type: 'question',
    options: [
      { label: 'Evet', value: 'yes', nextStepId: 'result-respiratory' },
      { label: 'Hayır', value: 'no', nextStepId: 'step-3' }
    ]
  },
  {
    id: 'step-3',
    question: 'Hiperoksi Testi yap. (%100 O₂ ile PaO₂ > 150 mmHg oluyor mu?)',
    type: 'question',
    options: [
      { label: 'Evet', value: 'yes', nextStepId: 'result-respiratory' },
      { label: 'Hayır', value: 'no', nextStepId: 'result-cardiac' }
    ]
  },
  {
    id: 'result-no-cyanosis',
    question: '',
    type: 'result',
    options: [],
    result: 'Santral siyanoz yok. Periferik siyanoz veya akrosiyanoz olabilir (genellikle benign).'
  },
  {
    id: 'result-respiratory',
    question: '',
    type: 'result',
    options: [],
    result: 'Siyanoz muhtemelen **solunumsal** kökenli. Akciğer grafisi, kan gazı değerlendir. Akciğer patolojilerini (RDS, Pnömoni) düşün.'
  },
  {
    id: 'result-cardiac',
    question: '',
    type: 'result',
    options: [],
    result: 'Siyanoz muhtemelen **kardiyak** kökenli (sağdan-sola şant). Acil çocuk kardiyoloji konsültasyonu iste. Prostaglandin E1 infüzyonunu düşün.'
  }
];

export const medicalScenarios: MedicalScenario[] = [
  {
    id: 'fever-approach',
    title: 'Ateşli Çocuğa Yaklaşım',
    description: 'Ateşli çocuğa sistematik yaklaşım ve kırmızı bayraklar',
    approach: 'Yaş, ateş derecesi, eşlik eden bulgular ve genel durum değerlendirmesi',
    redFlags: [
      '< 3 ay bebekte rektal ≥ 38°C ateş',
      'Herhangi bir yaşta ≥ 40°C ateş',
      'Havale geçirme, ense sertliği, uyandırılamama',
      'Basmakla solmayan peteşiyal/purpurik döküntü'
    ]
  },
  {
    id: 'cough-approach',
    title: 'Öksürüklü Çocuğa Yaklaşım',
    description: 'Öksürük süresine ve karakterine göre ayırıcı tanı',
    approach: 'Öksürüğün süresi, karakteri ve eşlik eden bulgular ayırıcı tanıda yol gösterici',
    redFlags: [
      'Stridor (üst hava yolu obstrüksiyonu)',
      'Ani başlayan öksürük (yabancı cisim)',
      'Kanlı balgam',
      'Ateş ve toksik görünüm'
    ]
  },
  {
    id: 'limp-approach',
    title: 'Topallayan Çocuğa Yaklaşım',
    description: 'Yaşa göre topallama nedenleri ve ayırıcı tanı',
    approach: 'Yaş, ateş varlığı, travma öyküsü ve laboratuvar bulguları',
    redFlags: [
      'Yüksek ateş ve toksik görünüm (septik artrit)',
      'Yük verememe',
      'Eklem hareket kısıtlılığı',
      'Lokal ısı artışı ve şişlik'
    ]
  },
  {
    id: 'seizure-approach',
    title: 'Nöbet Geçiren Çocuğa Yaklaşım',
    description: 'Ateşli ve ateşsiz nöbetlere yaklaşım',
    approach: 'ABC güvenliği, ateş durumu, nöbet süresi ve karakteri',
    redFlags: [
      'Ateşsiz nöbet',
      '15 dakikadan uzun nöbet',
      'Odaksal nöbet',
      'Bilinç değişikliği persistansı'
    ]
  }
];

export interface AbdominalPainData {
  ageGroup: string;
  commonCauses: string[];
  lessCommon: string[];
  rare: string[];
  clinicalTips: string[];
  redFlags: string[];
}

export const abdominalPainByAge: AbdominalPainData[] = [
  {
    ageGroup: '0-2 yaş (Bebek)',
    commonCauses: [
      'Kolik (ilk 3 ay)',
      'Gastroenterit',
      'Reflü özofajit',
      'Konstipasyon',
      'İntolerans (laktoz, protein)'
    ],
    lessCommon: [
      'İntussusepsiyon (6-24 ay pik)',
      'Malrotasyon + volvulus',
      'İnguinal hernii',
      'UTI',
      'Mezenterik lenfadenit'
    ],
    rare: [
      'Appendisit (çok nadir <2 yaş)',
      'Necrotizing enterokolit',
      'Hirschsprung hastalığı',
      'Böbrek taşı',
      'Pankreatit'
    ],
    clinicalTips: [
      '💡 Bebek sürekli ağlıyor ve bacaklarını karına çekiyorsa kolik düşün',
      '💡 Vişne jölesi gaita = intussusepsiyon kanıtla!',
      '💡 Gallgreen sign: Bebek düşük kalça için diz-dirsek pozisyonu',
      '💡 Safralı kusma = malrotasyon kanıtla (ACİL!)',
      '💡 İlk 6 ayda konstipasyon nadir - patoloji ara'
    ],
    redFlags: [
      'Safralı kusma (yeşil)',
      'Vişne jölesi gaita',
      'Karın distansiyonu',
      'Ateş + toksik görünüm',
      'Beslenmeyi reddetme'
    ]
  },
  {
    ageGroup: '2-5 yaş (Okul öncesi)',
    commonCauses: [
      'Viral gastroenterit',
      'Mezenterik lenfadenit',
      'Konstipasyon',
      'UTI (özellikle kızlarda)',
      'Nonspesifik karın ağrısı'
    ],
    lessCommon: [
      'Appendisit (artan sıklık)',
      'Pneumonia (alt lob)',
      'Yabancı cisim yutma',
      'Travma (çocuk istismarı?)',
      'HSP (Henoch-Schönlein Purpura)'
    ],
    rare: [
      'İnflammatory bowel hastalığı',
      'Safra kesesi hastalığı',
      'Pankreatit',
      'Testis torsiyonu',
      'Genitoplasti komplikasyonu'
    ],
    clinicalTips: [
      '💡 Bu yaşta appendisit perforasyon riski yüksek (lokalizasyon zor)',
      '💡 Alt lob pnömoni karın ağrısı yapabilir - akciğer dinle!',
      '💡 Konstipasyon çok sık - rektum muayenesi yapmadan palpasyon yapma',
      '💡 UTI bizde kızlarda 5 kat sık - rutin idrar bakın',
      '💡 Çocuk istismarında vis sera travması düşün'
    ],
    redFlags: [
      'Yürümekte zorlanma',
      'Fetal pozisyon alma',
      'Rebound tenderness',
      'Ateş + lökositoz',
      "İdrar'da kan"
    ]
  },
  {
    ageGroup: '5-10 yaş (Okul çağı)',
    commonCauses: [
      'Appendisit (sıklık artar)',
      'Mezenterik lenfadenit',
      'Viral gastroenterit',
      'UTI',
      'Stresle ilişkili (okul, sınav)',
      'Konstipasyon'
    ],
    lessCommon: [
      'Pneumonia (alt lob)',
      'Safra kesesi hastalığı',
      'Pankreatit',
      'İnflammatory bowel hastalığı',
      'Böbrek taşı'
    ],
    rare: [
      'Ovarian kist (prepubertal)',
      'Testis torsiyonu',
      'Malignite (lenfoma)',
      'Crohn hastalığı',
      'Çölya hastalığı'
    ],
    clinicalTips: [
      '💡 McBurney testi bu yaşta daha güvenilir',
      '💡 Stresle ilişkili ağrılar gerçek ama organik nedenleri ekarte et',
      '💡 Tekrarlayan ağrılarda IBD düşün',
      '💡 Ailevi Akdeniz ateşi ülkemizde sık',
      '💡 Çölya hastalığı karın ağrısıyla prezente olabilir'
    ],
    redFlags: [
      'Geceleri uyandıran ağrı',
      'Kilo kaybı',
      'Kan/mukus gaitada',
      'Büyüme geriliği',
      'Tekrarlayan ateş'
    ]
  },
  {
    ageGroup: '10-18 yaş (Adolesan)',
    commonCauses: [
      'Appendisit (en sık)',
      'Gastroenterit',
      'UTI',
      'Jinekolojik nedenler (kızlarda)',
      'İBS (irritabl bowel sendromu)',
      'Peptik ülser'
    ],
    lessCommon: [
      'Ovarian kist/torsiyon',
      'Ektopik gebelik',
      'PID (pelvik inflamatuar hastalık)',
      'İnflammatory bowel hastalığı',
      'Safra kesesi hastalığı',
      'Testis torsiyonu'
    ],
    rare: [
      'Malignite',
      'Pankreatit',
      'Böbrek taşı',
      'Endometrioza',
      'Adneksiyal torsiyon'
    ],
    clinicalTips: [
      '💡 Adolesanda mutlaka gebelik testi yap',
      '💡 Menstruel sikl ile ilişkili ağrı ovarian patoloji',
      '💡 Sağ adneksiyal ağrı appendisit taklit edebilir',
      '💡 Crohn hastalığı bu yaşta daha sık',
      '💡 H. pylori ülkemizde sık, dispepside test et'
    ],
    redFlags: [
      'Amenore + karın ağrısı',
      'Vajinal akıntı + ateş',
      'Kilo kaybı + gece ağrısı',
      'Hematemez/melena',
      'Şiddetli dizmenore'
    ]
  }
];

// Karın ağrısı fizik muayene teknikleri
export interface AbdominalExamTechnique {
  name: string;
  description: string;
  technique: string[];
  positiveFindings: string[];
  clinicalSignificance: string;
  ageSpecificTips: string[];
}

export const abdominalExamTechniques: AbdominalExamTechnique[] = [
  {
    name: 'McBurney Point Testi',
    description: 'Appendisit tanısında en önemli fizik muayene bulgularından biri',
    technique: [
      'Çocuğu supin pozisyona al, dizleri hafif fleksiyona al',
      'Umbilicus ile ASIS (anterior superior iliac spine) arasındaki mesafeyi 3e böl',
      'Dış 1/3 noktası McBurney noktasıdır',
      'Bu noktaya hafif bastır (2-3 parmakla)',
      'Çocuğun yüz ifadesini izle, ağrı var mı değerlendir'
    ],
    positiveFindings: [
      'Noktasal hassasiyet',
      'Çocuk elinizi ittirme',
      'Bacaklarını çekme',
      'Yüz ifadesinde değişim'
    ],
    clinicalSignificance: 'Akut appendisit için %85-90 sensitif',
    ageSpecificTips: [
      '0-5 yaş: Lokalizasyon zor, genel tepki gözlemle',
      '5-10 yaş: Oyun haline getir "hangi nokta acıyor"',
      '10+ yaş: Standart teknik uygulanabilir'
    ]
  },
  {
    name: 'Rovsing Testi',
    description: 'Sol alt kadrandan sağ alt kadrana yansıyan ağrı ile appendisit tanısı',
    technique: [
      'Çocuk supin pozisyonda',
      'Sol alt kadrana derin palpasyon uygula',
      'Ani basınç uygulayıp bırak',
      'Sağ alt kadranda ağrı olup olmadığını sor/gözlemle'
    ],
    positiveFindings: [
      'Sol alt kadran basıncıyla sağ alt kadranda ağrı',
      'McBurney noktasında ağrı artışı'
    ],
    clinicalSignificance: 'Appendisit için spesifik bulgu (%70 pozitif)',
    ageSpecificTips: [
      'Küçük çocuklarda yüz ifadesi takip et',
      'Oyun yapar gibi "şurada ağrı var mı?" diye sor',
      'Ağlarsa testi durdur'
    ]
  },
  {
    name: 'Psoas Testi',
    description: 'Retrocecal appendisit tanısında kullanılan özel test',
    technique: [
      'Çocuk sol yan yatar pozisyonda',
      'Sağ kalçayı pasif ekstansiyona al',
      'Alternatif: Supin pozisyonda sağ kalçayı fleksiyona karşı direnç',
      'Ağrı varlığını değerlendir'
    ],
    positiveFindings: [
      'Sağ alt kadran ağrısı',
      'Fleksiyon yapmaya direnç',
      'Psoas kas spazmı'
    ],
    clinicalSignificance: 'Retrocecal appendisit için önemli (%50 pozitif)',
    ageSpecificTips: [
      'Küçük çocukta pasif hareket tercih et',
      'Oyun haline getir: "bacağını kaldır bakalım"',
      'Ağrı varsa testi durdur'
    ]
  },
  {
    name: 'Obturator Testi',
    description: 'Pelvik appendisit tanısında kullanılan özelleşmiş test',
    technique: [
      'Çocuk supin pozisyonda',
      'Sağ kalça ve dizi 90° fleksiyona al',
      'Kalçayı internal ve eksternal rotasyona al',
      'Ağrı gelişimini gözlemle'
    ],
    positiveFindings: [
      'İç rotasyonda sağ alt kadran ağrısı',
      'Obturator kas irritasyon bulguları'
    ],
    clinicalSignificance: 'Pelvik appendisit için spesifik (%25 pozitif)',
    ageSpecificTips: [
      'Adolesan yaş grubunda daha güvenilir',
      'Nazik hareket uygula',
      'Jinekolojik patolojilerle karışabilir'
    ]
  },
  {
    name: 'Rebound Tenderness (Blumberg)',
    description: 'Peritoneal irritasyon bulgularının en önemlisi',
    technique: [
      'Ağrısız bölgeden başla',
      'Yavaş ve derin palpasyon uygula',
      'Ani olarak elinizi çek',
      'Çocuğun tepkisini gözlemle'
    ],
    positiveFindings: [
      'El çekildiğinde artan ağrı',
      'Koruyucu kas spazmı',
      'Çocuk elini ittirme'
    ],
    clinicalSignificance: 'Peritonit için %95 spesifik',
    ageSpecificTips: [
      'Çocukları korkutabilir - nazik ol',
      'Oyun haline getir: "şimdi elimi çekeceğim"',
      'Pozitifse tekrarlama - tetkik et'
    ]
  },
  {
    name: 'Dance Sign',
    description: 'İntussusepsiyon tanısında kullanılan işaret',
    technique: [
      'Çocuk supin pozisyonda',
      'Sağ alt kadranı palpasyon yap',
      'Normal ileocecal bölge dolgunluğunu ara',
      'Boşluk varsa pozitif'
    ],
    positiveFindings: [
      'Sağ alt kadran boşluğu',
      'İleocecal bölge dolgunluğu yok',
      'Sosis şeklinde kitle başka bölgede'
    ],
    clinicalSignificance: 'İntussusepsiyon için %85 spesifik',
    ageSpecificTips: [
      '6-24 ay arasında en değerli',
      'USG ile birlikte değerlendir',
      'Acil cerrahi konsültasyonu gerektirir'
    ]
  }
];

// Döküntü Dağılım Haritası - Vücut Bölgelerine Göre Tanı İpuçları
export interface RashDistributionData {
  bodyRegion: string;
  icon: string;
  commonRashes: {
    name: string;
    description: string;
    clinicalClue: string;
    frequency: 'very-common' | 'common' | 'uncommon' | 'rare';
  }[];
  clinicalPearls: string[];
  redFlags: string[];
}

export const rashDistributionMapping: RashDistributionData[] = [
  {
    bodyRegion: 'Yüz ve Saç Derisi',
    icon: '👤',
    commonRashes: [
      {
        name: 'Erythema Infectiosum',
        description: '"Slapped cheek" - tokatlanmış yanak görünümü',
        clinicalClue: 'Bilateral yanak kızarıklığı, nazal köprü korunmuş',
        frequency: 'common'
      },
      {
        name: 'Seboreik Dermatit',
        description: 'Sarı, yağlı pullanma (cradle cap)',
        clinicalClue: 'Saçlı deride ve kaşlarda sarımsı krusts',
        frequency: 'very-common'
      },
      {
        name: 'Atopik Dermatit',
        description: 'Kuru, kaşıntılı, eritemli plaklar',
        clinicalClue: 'Flexural alanlarda + yanak tutulumu (bebek)',
        frequency: 'very-common'
      },
      {
        name: 'İmpetigo',
        description: 'Bal renginde krutslar, kontagiöz',
        clinicalClue: 'Burnun etrafında, hızla yayılan',
        frequency: 'common'
      },
      {
        name: 'Kızamık',
        description: 'Makülopapüler, birleşme eğilimi',
        clinicalClue: 'Saç çizgisinden başlar, aşağı yayılır',
        frequency: 'uncommon'
      }
    ],
    clinicalPearls: [
      '💎 "Slapped cheek" = Parvovirus B19 patognomonik',
      '💎 Bebekte yanak atopik dermatiti çok sık',
      '💎 İmpetigo çok bulaşıcı - izolasyon gerekir',
      '💎 Seboreik dermatit benign, kendiliğinden geçer'
    ],
    redFlags: [
      'Periorbital sellülit bulguları',
      'Facial ödem + solunum güçlüğü',
      'Asimetrik facial tutulum',
      'Mukozal tutulum'
    ]
  },
  {
    bodyRegion: 'Boyun ve Kulak',
    icon: '🫱',
    commonRashes: [
      {
        name: 'Intertrigo',
        description: 'Boyun kıvrımlarında mazerasyonlu irritasyon',
        clinicalClue: 'Nem, sürtünme, şişman bebeklerde',
        frequency: 'very-common'
      },
      {
        name: 'Kawasaki Hastalığı',
        description: 'Servikal lenfadenopati + polimorfik döküntü',
        clinicalClue: '≥1.5cm tek taraflı, ateş 5+ gün',
        frequency: 'rare'
      },
      {
        name: 'Viral Eksantem',
        description: 'Yaygın makülopapüler döküntünün bir parçası',
        clinicalClue: 'Sistemik belirtilerle birlikte',
        frequency: 'common'
      }
    ],
    clinicalPearls: [
      '💎 Boyun kıvrımları nemli kalıyor - mantar enfeksiyonu riski',
      '💎 Kawasaki: tek taraflı >1.5cm lenf düğümü tipik',
      '💎 Kulak arkası döküntü kızamıkta sık'
    ],
    redFlags: [
      'Boyun sertliği + döküntü',
      'Massive lenfadenopati',
      'Trakeal deviasyon'
    ]
  },
  {
    bodyRegion: 'Gövde (Ön-Arka)',
    icon: '👕',
    commonRashes: [
      {
        name: 'Varicella',
        description: 'Polimorfik vezikül, "çiğ kaplama" görünümü',
        clinicalClue: 'Merkez→periferik yayılım, farklı evreler',
        frequency: 'common'
      },
      {
        name: 'Roseola',
        description: 'Pembe makülopapüler, ateş düşünce çıkar',
        clinicalClue: 'Gövde predominant, 6ay-2yaş',
        frequency: 'common'
      },
      {
        name: 'Tinea Corporis',
        description: 'Anular, kenarları kabartılmış',
        clinicalClue: 'Merkez temizleniyor, çevre aktif',
        frequency: 'common'
      },
      {
        name: 'Pityriasis Rosea',
        description: 'Herald patch + fir tree pattern',
        clinicalClue: 'İlk büyük leke, sonra küçükler paralel',
        frequency: 'uncommon'
      },
      {
        name: 'Drug Rash',
        description: 'Simetrik, makülopapüler',
        clinicalClue: 'İlaç başlangıcından 1-2 hafta sonra',
        frequency: 'common'
      }
    ],
    clinicalPearls: [
      '💎 Varicella: Aynı anda farklı evrelerde lezyonlar',
      '💎 Roseola: "Ateş gitti, döküntü geldi"',
      '💎 Tinea: KOH preparatı tanısal',
      '💎 Pityriasis rosea: Herald patch tipik'
    ],
    redFlags: [
      'Target lezyonlar (SJS/TEN)',
      'Yaygın eritem + deskuamasyon',
      'Purpurik komponent',
      'Bullöz lezyonlar'
    ]
  },
  {
    bodyRegion: 'Üst Ekstremiteler',
    icon: '🦾',
    commonRashes: [
      {
        name: 'Atopik Dermatit',
        description: 'Antekubital fossada, kaşıntılı',
        clinicalClue: 'Flexural yerleşim, kuru cilt',
        frequency: 'very-common'
      },
      {
        name: 'Contact Dermatitis',
        description: 'Temas yerinde lokalize irritasyon',
        clinicalClue: 'Maruziyetle uyumlu patern',
        frequency: 'common'
      },
      {
        name: 'Viral Eksantem',
        description: 'Yaygın döküntünün ekstremite komponenti',
        clinicalClue: 'Gövdeden ekstremitelere yayılım',
        frequency: 'common'
      }
    ],
    clinicalPearls: [
      '💎 Antekubital fossa en sık atopik dermatit yeri',
      '💎 Watch strap dermatit modern çocuklarda sık',
      '💎 Kızamık: kraniokaudal yayılım gösterir'
    ],
    redFlags: [
      'Tek taraflı tutulum',
      'Nekrotik lezyonlar',
      'Vaskülit bulguları'
    ]
  },
  {
    bodyRegion: 'Alt Ekstremiteler',
    icon: '🦵',
    commonRashes: [
      {
        name: 'Erythema Migrans',
        description: 'Kene ısırığı yerinde genişleyen halka',
        clinicalClue: 'Merkez temiz, kenar eritemli, ağrısız',
        frequency: 'rare'
      },
      {
        name: 'HSP (Henoch-Schönlein Purpura)',
        description: 'Alt extremitelerde palpabl purpura',
        clinicalClue: 'Gravitasional dağılım, palpasyon+',
        frequency: 'uncommon'
      },
      {
        name: 'Cellulitis',
        description: 'Sıcak, şiş, kızıl, ağrılı alan',
        clinicalClue: 'Ateş + lökositoz, tek taraflı',
        frequency: 'common'
      },
      {
        name: 'Insect Bites',
        description: 'Papüler, kaşıntılı, gruplar halinde',
        clinicalClue: 'Açık alanlar, yaz mevsimi',
        frequency: 'very-common'
      }
    ],
    clinicalPearls: [
      '💎 HSP: Gravitational purpura + abdominal pain',
      '💎 Erythema migrans: Lyme hastalığı patognomik',
      '💎 Böcek ısırığı: Linear yerleşim tipik'
    ],
    redFlags: [
      'Purpura + hematüri',
      'Hızla yayılan cellulitis',
      'Necrotizing fasciitis bulguları'
    ]
  },
  {
    bodyRegion: 'El-Ayak Palmerleri',
    icon: '✋',
    commonRashes: [
      {
        name: 'Hand-Foot-Mouth Disease',
        description: 'Palmoplantar vezikül',
        clinicalClue: 'Oral lezyonlar eşlik eder',
        frequency: 'very-common'
      },
      {
        name: 'Kawasaki Hastalığı',
        description: 'El-ayak ödemi, eritemı, deskuamasyon',
        clinicalClue: 'Ateş >5 gün + diğer kriterler',
        frequency: 'rare'
      },
      {
        name: 'Syphilis (Secondary)',
        description: 'Palmoplantar maküler döküntü',
        clinicalClue: 'Congenital syphilis, ağrısız',
        frequency: 'rare'
      },
      {
        name: 'Scabies',
        description: 'Interdigital, kaşıntılı papül',
        clinicalClue: 'Gece kaşıntı artar, aile hikayesi',
        frequency: 'common'
      }
    ],
    clinicalPearls: [
      '💎 Palmoplantar tutulum viral enfeksiyonda nadir!',
      '💎 HFMD: En sık viral palmoplantal neden',
      '💎 Kawasaki: El-ayak deskuamasyonu geç bulgu',
      '💎 Scabies: İnterdigital yerleşim tipik'
    ],
    redFlags: [
      'Palmoplantar + sistemik bulgular',
      'Büllöz lezyonlar',
      'Nekrotik alanlar'
    ]
  },
  {
    bodyRegion: 'Genital Bölge',
    icon: '🩲',
    commonRashes: [
      {
        name: 'Diaper Dermatitis',
        description: 'İrritasyon kontakt dermatiti',
        clinicalClue: 'Bez altı alanlar, kıvrımlar korunmuş',
        frequency: 'very-common'
      },
      {
        name: 'Candida Dermatitis',
        description: 'Eritemli plak + satellit lezyonlar',
        clinicalClue: 'Kıvrımları da tutar, satellit pustuller',
        frequency: 'common'
      },
      {
        name: 'Streptokokal Perianal Dermatit',
        description: 'Anal çevre belirgin eritem',
        clinicalClue: 'Kaşıntı, anal fissür, kızıl renk',
        frequency: 'common'
      },
      {
        name: 'Molluscum Contagiosum',
        description: 'Göbek çukuru papül',
        clinicalClue: 'Genital bölgede, viral, bulaşıcı',
        frequency: 'common'
      }
    ],
    clinicalPearls: [
      '💎 Diaper rash: Kıvrımlar korunuyorsa irritant',
      '💎 Candida: Kıvrımları da tutarsa mantar',
      '💎 Strep perianal: Boğaz sürüntüsü de pozitif olabilir',
      '💎 Molluscum: Viraldi, kendiliğinden geçer'
    ],
    redFlags: [
      'Ülseratif lezyonlar',
      'Sistemik bulgular',
      'Çocuk istismarı şüphesi'
    ]
  },
  {
    bodyRegion: 'Mukozalar (Ağız-Göz)',
    icon: '👄',
    commonRashes: [
      {
        name: 'Herpetic Gingivostomatitis',
        description: 'Ağrılı oral vezikül/ülserler',
        clinicalClue: 'İlk HSV enfeksiyonu, yutma güçlüğü',
        frequency: 'common'
      },
      {
        name: 'Aphthous Stomatit',
        description: 'Tekrarlayan ağrılı ülserler',
        clinicalClue: 'Sistemik bulgu yok, ailevi yatkınlık',
        frequency: 'common'
      },
      {
        name: 'Koplik Spots',
        description: 'Bukkal mukozada beyaz noktalar',
        clinicalClue: 'Kızamıktan 1-2 gün önce, patognomik',
        frequency: 'rare'
      },
      {
        name: 'Stevens-Johnson Sendromu',
        description: 'Mukozal erozyon + target lezyonlar',
        clinicalClue: 'İlaç reaksiyonu, ağır durum',
        frequency: 'rare'
      },
      {
        name: 'Kawasaki Hastalığı',
        description: 'Çilek dil, dudak kızarıklığı',
        clinicalClue: 'Strawberry tongue, cheilitis',
        frequency: 'rare'
      }
    ],
    clinicalPearls: [
      '💎 Koplik spots: Kızamık için patognomik!',
      '💎 HSV stomatit: İlk enfeksiyon en ağır seyreder',
      '💎 SJS: Mukoza + deri tutulumu = acil',
      '💎 Kawasaki: Çilek dil tipik bulgu'
    ],
    redFlags: [
      'Yaygın mukozal erozyon',
      'Airway tutulumu',
      'Odinofaji + dehidratasyon',
      'Target lezyonlar + mukoza'
    ]
  }
];

// Meningokoksemi Erken Tanı Kriterleri
export interface MeningococcalSigns {
  category: string;
  earlySign: string;
  criticalSign: string;
  timeframe: string;
  clinicalPearl: string;
}

export const meningococcalRecognition: MeningococcalSigns[] = [
  {
    category: 'Döküntü Karakteristikleri',
    earlySign: 'Birkaç peteşi (özellikle ayaklarda)',
    criticalSign: 'Yaygın purpurik döküntü',
    timeframe: '2-4 saat içinde',
    clinicalPearl: 'CAM TESTİ: Purpura solmaz, peteşi solar'
  },
  {
    category: 'Genel Görünüm',
    earlySign: 'İrritabilite, huzursuzluk',
    criticalSign: 'Letarji, stupor',
    timeframe: '4-6 saat içinde',
    clinicalPearl: 'Glasgo Koma Skoru hızla düşer'
  },
  {
    category: 'Vital Bulgular',
    earlySign: 'Taşikardi, hafif hipotermi',
    criticalSign: 'Hipotansiyon, bradikardi',
    timeframe: '6-8 saat içinde',
    clinicalPearl: 'Kapiller doluş >2 saniye kritik'
  },
  {
    category: 'Ekstremiteler',
    earlySign: 'Soğuk el-ayaklar',
    criticalSign: 'Mottled cilt, siyanöz',
    timeframe: '8-12 saat içinde',
    clinicalPearl: 'Core-peripheral temperatür farkı >4°C'
  },
  {
    category: 'Mental Durum',
    earlySign: 'Konfüzyon, ajitasyon',
    criticalSign: 'Koma, konvülsiyon',
    timeframe: '12-24 saat içinde',
    clinicalPearl: 'Meningeal irritasyon bulguları olmayabilir'
  }
];

// Büyüme ve Gelişme Değerlendirme Verileri
export interface GrowthData {
  ageMonths: number;
  gender: 'male' | 'female';
  percentiles: {
    height: { p3: number; p10: number; p25: number; p50: number; p75: number; p90: number; p97: number };
    weight: { p3: number; p10: number; p25: number; p50: number; p75: number; p90: number; p97: number };
    headCircumference?: { p3: number; p10: number; p25: number; p50: number; p75: number; p90: number; p97: number };
  };
}

// Türk çocukları için büyüme standartları (seçilmiş yaş grupları)
export const turkishGrowthStandards: GrowthData[] = [
  // 0-5 yaş için temel noktalar (WHO standartları)
  {
    ageMonths: 0,
    gender: 'male',
    percentiles: {
      height: { p3: 46.1, p10: 47.5, p25: 48.7, p50: 50.0, p75: 51.3, p90: 52.5, p97: 53.9 },
      weight: { p3: 2.5, p10: 2.8, p25: 3.2, p50: 3.6, p75: 4.0, p90: 4.4, p97: 4.8 },
      headCircumference: { p3: 32.0, p10: 32.7, p25: 33.7, p50: 34.8, p75: 35.9, p90: 36.9, p97: 37.9 }
    }
  },
  {
    ageMonths: 12,
    gender: 'male',
    percentiles: {
      height: { p3: 71.0, p10: 72.8, p25: 74.4, p50: 76.2, p75: 78.0, p90: 79.8, p97: 81.6 },
      weight: { p3: 7.7, p10: 8.4, p25: 9.2, p50: 10.2, p75: 11.3, p90: 12.4, p97: 13.6 },
      headCircumference: { p3: 43.5, p10: 44.4, p25: 45.4, p50: 46.5, p75: 47.6, p90: 48.6, p97: 49.7 }
    }
  },
  {
    ageMonths: 24,
    gender: 'male',
    percentiles: {
      height: { p3: 82.5, p10: 84.8, p25: 86.8, p50: 89.0, p75: 91.2, p90: 93.4, p97: 95.7 },
      weight: { p3: 10.5, p10: 11.4, p25: 12.4, p50: 13.6, p75: 14.9, p90: 16.3, p97: 17.9 }
    }
  },
  {
    ageMonths: 60,
    gender: 'male',
    percentiles: {
      height: { p3: 102.0, p10: 104.7, p25: 107.2, p50: 110.0, p75: 112.8, p90: 115.5, p97: 118.2 },
      weight: { p3: 14.1, p10: 15.4, p25: 16.8, p50: 18.7, p75: 20.9, p90: 23.4, p97: 26.3 }
    }
  }
  // Kız çocukları için de benzer standartlar...
];

export interface GrowthEvaluation {
  category: string;
  description: string;
  clinicalApproach: string[];
  redFlags: string[];
  workupNeeded: string[];
  managementTips: string[];
}

export const growthEvaluationGuide: GrowthEvaluation[] = [
  {
    category: 'Normal Büyüme Varyasyonları',
    description: 'Sağlıklı çocuklarda görülen normal büyüme paternleri',
    clinicalApproach: [
      'Genetik potansiyel değerlendirmesi (ebeveyn boyları)',
      'Büyüme hızı takibi (cm/yıl)',
      'Puberte timing değerlendirmesi',
      'Nutrisyonel durum değerlendirmesi',
      'Sosyoekonomik faktörler'
    ],
    redFlags: [
      'Büyüme hızı <4 cm/yıl (5 yaş sonrası)',
      'Percentil çizgileri kesin geçiş',
      'Boy/ağırlık uyumsuzluğu',
      'Puberte gecikmesi (>14yaş kız, >16yaş erkek)'
    ],
    workupNeeded: [
      'Detaylı büyüme öyküsü',
      'Aile büyüme öyküsü',
      'Beslenme anamnezi',
      'Kemik yaşı (sol el-el bileği grafisi)',
      'Tiroid fonksiyonları'
    ],
    managementTips: [
      'Ebeveyn boy ortalaması hesapla',
      'Büyüme eğrisi çiz ve takip et',
      'Beslenme danışmanlığı',
      'Düzenli 6 aylık kontroller'
    ]
  },
  {
    category: 'Constitutional Growth Delay',
    description: 'Geç büyüyen ama normal pattern gösteren çocuklar',
    clinicalApproach: [
      'Familial öykü sorgulama (ebeveyn/kardeş geç büyüme)',
      'Kemik yaşı kronolojik yaştan geri (1-2 yıl)',
      'Büyüme hızı normal (>4cm/yıl)',
      'Puberte gecikmesi var ama eventual normal',
      'Final adult boy normal'
    ],
    redFlags: [
      'Aile öyküsü yok',
      'Kemik yaşı >2 yıl geri',
      'Büyüme hızı <4 cm/yıl',
      'Diğer endokrin bulgular'
    ],
    workupNeeded: [
      'Kemik yaşı (en önemli)',
      'Büyüme hormonu stimülasyon testi (seçilmiş)',
      'Tiroid fonksiyonları',
      'İGF-1, IGFBP-3 düzeyleri'
    ],
    managementTips: [
      'Aile güven verilmesi',
      'Eventual normal boy guarantee',
      'Psikososyal destek',
      'Spor/aktivite teşviki'
    ]
  },
  {
    category: 'Büyüme Hormonu Eksikliği',
    description: 'Patolojik boy kısalığı - endokrin neden',
    clinicalApproach: [
      'Ciddi boy kısalığı (<3 percentil)',
      'Büyüme hızı <4 cm/yıl',
      'Kemik yaşı >2 yıl geri',
      'Hipoglisemi epizodları',
      'Mikropenis (erkekte)'
    ],
    redFlags: [
      'Neonatal hipoglisemi öyküsü',
      'Midline defektleri',
      'Kranial irradyasyon öyküsü',
      'Hipofiz-hipotalam travması'
    ],
    workupNeeded: [
      'İki farklı büyüme hormonu stimülasyon testi',
      'İGF-1, IGFBP-3',
      'Hipofiz MRI',
      'Diğer hipofiz hormonları'
    ],
    managementTips: [
      'Pediatrik endokrin konsültasyonu',
      'Büyüme hormonu tedavisi',
      'Düzenli takip (3-6 aylık)',
      'Final boy tahminleri'
    ]
  },
  {
    category: 'Nutrisyonel Boy Kısalığı',
    description: 'Yetersiz beslenmeye bağlı büyüme geriliği',
    clinicalApproach: [
      'Ağırlık boy kısalığından önce etkilenir',
      'Kalori/protein yetersizliği öyküsü',
      'Kronik hastalık varlığı',
      'Sosyoekonomik zorluklar',
      'Beslenme anamnezi detaylı'
    ],
    redFlags: [
      'Ağırlık percentili << boy percentili',
      'Kronik ishal/malabsorpsiyon',
      'Tekrarlayan enfeksiyonlar',
      'Gelişme geriliği'
    ],
    workupNeeded: [
      'Detaylı beslenme analizi',
      'Malabsorpsiyon panel',
      'Çölya hastalığı tarama',
      'İnflamatuar belirteçler'
    ],
    managementTips: [
      'Nutrisyonel rehabilitasyon',
      'Altta yatan hastalık tedavisi',
      'Beslenme uzmanı konsültasyonu',
      'Catch-up growth beklentisi'
    ]
  }
];

// Percentile Hesaplama Fonksiyonu İçin Veriler
export interface PercentileCalculator {
  calculatePercentile: (value: number, gender: 'male' | 'female', ageMonths: number, parameter: 'height' | 'weight' | 'headCircumference') => number;
  interpretPercentile: (percentile: number) => {
    category: string;
    description: string;
    recommendation: string;
    followUp: string;
  };
}

export const percentileInterpretation = (percentile: number) => {
  if (percentile < 3) {
    return {
      category: 'Ciddi Kısa (<3p)',
      description: 'Çocuk yaşıt grup ortalamasından ciddi şekilde kısa',
      recommendation: 'Mutlaka pediatrik endokrin değerlendirmesi gerekli',
      followUp: 'Acil endokrin konsültasyonu, kemik yaşı, büyüme hormonu panel'
    };
  } else if (percentile < 10) {
    return {
      category: 'Kısa (3-10p)',
      description: 'Yaşıt grubundan kısa ama normal varyasyon olabilir',
      recommendation: 'Aile boy öyküsü, büyüme hızı değerlendirmesi',
      followUp: '6 aylık takip, kemik yaşı, beslenme değerlendirmesi'
    };
  } else if (percentile <= 90) {
    return {
      category: 'Normal (10-90p)',
      description: 'Yaşına uygun normal büyüme',
      recommendation: 'Düzenli takip, sağlıklı beslenme önerileri',
      followUp: 'Yıllık rutin takip, büyüme eğrisi izlemi'
    };
  } else if (percentile <= 97) {
    return {
      category: 'Uzun (90-97p)',
      description: 'Yaşıt grubundan uzun ama normal varyasyon',
      recommendation: 'Aile boy öyküsü değerlendirmesi, puberte takibi',
      followUp: '6-12 aylık takip, puberte gelişimi izlemi'
    };
  } else {
    return {
      category: 'Çok Uzun (>97p)',
      description: 'Yaşıt grup ortalamasından ciddi şekilde uzun',
      recommendation: 'Endokrin değerlendirme (erken puberte, büyüme hormonu fazlalığı)',
      followUp: 'Endokrin konsültasyonu, kemik yaşı, puberte değerlendirmesi'
    };
  }
};

// Development Milestones Extension
export interface DetailedMilestone {
  ageRange: string;
  domain: 'motor' | 'cognitive' | 'language' | 'social' | 'adaptive';
  milestone: string;
  clinicalSignificance: string;
  redFlag: string;
  assessmentTip: string;
}

export const detailedDevelopmentMilestones: DetailedMilestone[] = [
  {
    ageRange: '2-3 ay',
    domain: 'motor',
    milestone: 'Başını kaldırır (prone pozisyonda)',
    clinicalSignificance: 'Boyun kas kontrolü gelişimi',
    redFlag: '4 ay sonra başını kaldıramıyor',
    assessmentTip: 'Prone pozisyonda 45° kaldırabilmeli'
  },
  {
    ageRange: '4-6 ay',
    domain: 'motor',
    milestone: 'Desteksiz oturma',
    clinicalSignificance: 'Trunk kontrol gelişimi',
    redFlag: '9 ayda desteksiz oturamıyor',
    assessmentTip: 'İlk destekli sonra desteksiz oturma'
  },
  {
    ageRange: '6-8 ay',
    domain: 'cognitive',
    milestone: 'Nesne permanence (obje saklama)',
    clinicalSignificance: 'Kognitif gelişim önemli milestone',
    redFlag: '12 ayda nesne arayışı yok',
    assessmentTip: 'Oyuncağı bez altına saklayıp arayışını gözlemle'
  },
  {
    ageRange: '9-12 ay',
    domain: 'motor',
    milestone: 'Pincer grasp (tutma)',
    clinicalSignificance: 'İnce motor beceri gelişimi',
    redFlag: '15 ayda pincer grasp yok',
    assessmentTip: 'Küçük cisim (cheerio) başparmak-işaret parmağıyla alabilir'
  },
  {
    ageRange: '12-15 ay',
    domain: 'language',
    milestone: 'İlk anlamlı kelimeler',
    clinicalSignificance: 'Dil gelişimi başlangıcı',
    redFlag: '18 ayda hiç kelime yok',
    assessmentTip: '"mama, dada, baba" anlamlı kullanım'
  },
  {
    ageRange: '18-24 ay',
    domain: 'language',
    milestone: '50 kelime, 2 kelimeli cümleler',
    clinicalSignificance: 'Language explosion dönemi',
    redFlag: '24 ayda <10 kelime',
    assessmentTip: 'Kelime sayısını ebeveyn kayıt eder'
  },
  {
    ageRange: '2-3 yaş',
    domain: 'social',
    milestone: 'Paralel oyun, imitasyon',
    clinicalSignificance: 'Sosyal gelişim başlangıcı',
    redFlag: '3 yaşta göz kontağı kurmama',
    assessmentTip: 'Diğer çocukların yanında (ama onlarla değil) oynar'
  },
  {
    ageRange: '3-4 yaş',
    domain: 'adaptive',
    milestone: 'Tuvalet eğitimi tamamlanma',
    clinicalSignificance: 'Özerklik gelişimi',
    redFlag: '4 yaşta hiç tuvalet eğitimi başarısı yok',
    assessmentTip: 'Gündüz kontrol gece kontrolden önce gelişir'
  },
  {
    ageRange: '4-5 yaş',
    domain: 'cognitive',
    milestone: 'Okul öncesi hazırlık becerileri',
    clinicalSignificance: 'Formal eğitim hazırlığı',
    redFlag: '5 yaşta hiç harfi bilmeme',
    assessmentTip: 'İsimini yazabilir, basit çizimler yapar'
  }
];

// Davranış Problemleri Değerlendirme Verileri
export interface BehavioralAssessment {
  category: string;
  ageGroup: string;
  diagnosticCriteria: string[];
  clinicalPresentation: string[];
  differentialDiagnosis: string[];
  assessmentTools: string[];
  redFlags: string[];
  managementApproach: string[];
}

export const behavioralProblemsGuide: BehavioralAssessment[] = [
  {
    category: 'ADHD - Dikkat Eksikliği Hiperaktivite Bozukluğu',
    ageGroup: '6-18 yaş (okul çağı)',
    diagnosticCriteria: [
      'Dikkat eksikliği: 6+ kriter, 6+ ay sürekli',
      'Hiperaktivite/impulsivite: 6+ kriter, 6+ ay sürekli',
      'Belirtiler 12 yaş öncesi başlamış',
      'İki veya daha fazla ortamda mevcut (ev, okul)',
      'Sosyal/akademik işlevselliği belirgin bozuyor',
      'Başka ruhsal bozuklukla açıklanamıyor'
    ],
    clinicalPresentation: [
      'Dikkat: Detaylara dikkat edememe, dalgınlık, unutkanlık',
      'Hiperaktivite: Yerinde duramama, aşırı koşma/tırmanma',
      'İmpulsivite: Sabırsızlık, sırayı bekleyememe, araya girme',
      'Okul sorunları: Düşük akademik başarı, ödev yapmama',
      'Sosyal sorunlar: Arkadaş ilişkilerinde zorluk',
      'Aile içi çatışmalar: Ebeveyn-çocuk gerginliği'
    ],
    differentialDiagnosis: [
      'Normal yaş uygun davranış (özellikle 3-5 yaş)',
      'Anksiyete bozuklukları (dikkat dağınıklığı)',
      'Depresyon (konsantrasyon güçlüğü)',
      'Öğrenme güçlüğü (akademik zorluklar)',
      'Otizm spektrum bozukluğu (sosyal iletişim)',
      'İşitme sorunları (dikkat vermeme)',
      'Uyku bozuklukları (gündüz yorgunluk)'
    ],
    assessmentTools: [
      'DSM-5 ADHD Checklist',
      'Conners Rating Scale (ebeveyn/öğretmen)',
      'Vanderbilt Assessment Scale',
      'TOVA (Test of Variables of Attention)',
      'Okul performans raporları',
      'Davranışsal gözlem formu'
    ],
    redFlags: [
      '3 yaş altında hiperaktivite normal!',
      'Sadek tek ortamda belirtiler (ADHD değil)',
      'Ani başlangıç (organik neden ara)',
      'Ciddi agresyon (etyolojik araştırma)',
      'Developmental regression (nörolojik değerlendirme)'
    ],
    managementApproach: [
      'Davranışsal müdahaleler (ilk seçenek)',
      'Ebeveyn eğitimi ve aile terapisi',
      'Okul bazlı müdahaleler',
      'İlaç tedavisi (6 yaş sonrası)',
      'Komorbid durumları tedavi et',
      'Düzenli takip ve ayarlamalar'
    ]
  },
  {
    category: 'Otizm Spektrum Bozukluğu (OSB)',
    ageGroup: '0-18 yaş (erken tanı kritik)',
    diagnosticCriteria: [
      'Sosyal iletişimde sürekli eksiklikler',
      'Kısıtlı, tekrarlayıcı davranış paterni',
      'Belirtiler erken gelişim döneminde başlar',
      'Belirtiler günlük işlevselliği sınırlar',
      'Başka gelişimsel bozuklukla açıklanamaz'
    ],
    clinicalPresentation: [
      'Sosyal iletişim: Göz kontağı eksikliği, jest kullanmama',
      'Dil gelişimi: Gecikmeli/atipik, ekolali',
      'Sosyal etkileşim: Akran ilişkisi kuramama, izolasyon',
      'Tekrarlayıcı davranışlar: Stereotipiler, obsesif rutinler',
      'Duyusal sorunlar: Hiper/hiposensitivite',
      'Oyun becerileri: Imaginatif oyun eksikliği'
    ],
    differentialDiagnosis: [
      'Dil gelişimi gecikmesi (pure language delay)',
      'İşitme kaybı (sosyal iletişim eksikliği)',
      'Global gelişim geriliği',
      'ADHD (dikkat/hiperaktivite)',
      'Sosyal anksiyete bozukluğu',
      'Rett sendromu (regresyon var)',
      'Fragile X sendromu (genetik)'
    ],
    assessmentTools: [
      'M-CHAT-R (18-24 ay tarama)',
      'ADOS-2 (Autism Diagnostic Observation)',
      'ADI-R (ebeveyn görüşmesi)',
      'CARS (Childhood Autism Rating Scale)',
      'Denver II gelişim testi',
      'Vineland adaptif davranış skalası'
    ],
    redFlags: [
      '12 ayda parmakla gösterme yok',
      '18 ayda tek kelime bile yok',
      '24 ayda 2 kelimeli cümle yok',
      'Herhangi yaşta dil/sosyal beceri kaybı',
      'Göz kontağı kurmama',
      'İsmine tepki vermeme',
      'Basit komutları anlamama'
    ],
    managementApproach: [
      'Erken müdahale programları (0-3 yaş)',
      'Applied Behavior Analysis (ABA)',
      'Konuşma ve dil terapisi',
      'Occupational therapy',
      'Özel eğitim hizmetleri',
      'Aile destek programları'
    ]
  },
  {
    category: 'Oppositional Defiant Disorder (ODD)',
    ageGroup: '3-18 yaş',
    diagnosticCriteria: [
      'En az 6 ay boyunca 4+ kriter',
      'Öfkeli/irritabl mood: öfke patlamaları',
      'Argumentative/defiant davranış',
      'Vindictive davranış (intikamcı)',
      'Normal gelişimsel düzeyden fazla',
      'Davranış sıkıntı yaratıyor'
    ],
    clinicalPresentation: [
      'Otorite figürlerine karşı gelme',
      'Kuralları çiğneme, provokasyon',
      'Başkalarını suçlama, öfke patlamaları',
      'Okul disiplin sorunları',
      'Aile içi sürekli çatışma',
      'Sosyal ilişkilerde zorluk'
    ],
    differentialDiagnosis: [
      'Normal yaş uygun oppositionality (2-3 yaş, adolesan)',
      'ADHD (impulsive davranışlar)',
      'Mood bozuklukları (irritabilite)',
      'Anxiety disorders (kontrol ihtiyacı)',
      'Learning disabilities (frustrasyon)',
      'Conduct disorder (daha ciddi)'
    ],
    assessmentTools: [
      'Disruptive Behavior Rating Scale',
      'Child Behavior Checklist (CBCL)',
      'Behavior Assessment System for Children',
      'Okul davranış raporları',
      'Ev davranış grafikleri'
    ],
    redFlags: [
      'Fiziksel agresyon (conduct disorder)',
      'Hayvanları zarar verme',
      'Yangın çıkarma/çalma',
      'Ciddi sosyal/akademik bozulma',
      'Komorbid substance use'
    ],
    managementApproach: [
      'Parent Management Training (PMT)',
      'Davranışsal aile terapisi',
      'Collaborative & Proactive Solutions',
      'Okul bazlı müdahaleler',
      'İlaç tedavisi (komorbid durumlarda)',
      'Sosyal beceri eğitimi'
    ]
  },
  {
    category: 'Anksiyete Bozuklukları',
    ageGroup: '2-18 yaş',
    diagnosticCriteria: [
      'Aşırı korku/endişe, 6+ ay',
      'Yaş uygun düzeyden fazla',
      'Fonksiyonel bozulma yaratıyor',
      'Başka tıbbi durumla açıklanamaz',
      'Madde kullanımı etkisiyle değil'
    ],
    clinicalPresentation: [
      'Ayrılık anksiyetesi: ebeveynden ayrılma korkusu',
      'Sosyal anksiyete: sosyal durumlarda çekingenlik',
      'Yaygın anksiyete: her şey için endişe',
      'Spesifik fobiler: belirli nesne/durum korkusu',
      'Panik ataklar: ani korku episodları',
      'Fiziksel şikayetler: baş ağrısı, karın ağrısı'
    ],
    differentialDiagnosis: [
      'Normal gelişimsel korkular',
      'ADHD (konsantrasyon güçlüğü)',
      'Otizm (sosyal çekingenlik)',
      'Depresyon (geri çekilme)',
      'Medical conditions (tiroid, asım)',
      'PTSD (travma sonrası)',
      'OCD (obsesif davranışlar)'
    ],
    assessmentTools: [
      'SCARED (anxiety screening)',
      'Spence Children\'s Anxiety Scale',
      'Beck Youth Inventories',
      'Clinical interview (çocuk + ebeveyn)',
      'Behavioral observation',
      'School anxiety report'
    ],
    redFlags: [
      'Okula hiç gidememe',
      'Sosyal izolasyon',
      'Panik ataklar',
      'Self-harm behaviors',
      'Eating/sleeping disturbance',
      'Substance use başlangıcı'
    ],
    managementApproach: [
      'Cognitive Behavioral Therapy (CBT)',
      'Exposure therapy (kademeli)',
      'Gevşeme teknikleri',
      'Mindfulness eğitimi',
      'Aile psiko-eğitimi',
      'SSRI (ciddi vakalarda)'
    ]
  }
];

// Yaş Gruplarına Göre Normal Davranış Paterni
export interface DevelopmentalBehavior {
  ageRange: string;
  normalBehaviors: string[];
  concerningBehaviors: string[];
  parentGuidance: string[];
  redFlags: string[];
}

export const developmentalBehaviorGuide: DevelopmentalBehavior[] = [
  {
    ageRange: '2-3 yaş (Toddler)',
    normalBehaviors: [
      'Temper tantrums (öfke patlamaları)',
      'Başkaldırı davranışları ("hayır" deme)',
      'Paralel oyun (yan yana, beraber değil)',
      'Taklit davranışları',
      'Kısa dikkat süresi (2-3 dakika)',
      'Tuvalet eğitimi zorlanması'
    ],
    concerningBehaviors: [
      'Aşırı agresyon (ısırma, vurma)',
      'Hiç kelime kullanmama',
      'Göz kontağı kurmama',
      'Sosyal etkileşimden kaçınma',
      'Obsesif rutinler',
      'Self-injury behaviors'
    ],
    parentGuidance: [
      'Sabırlı olun - normal gelişim süreci',
      'Tutarlı sınırlar koyun',
      'Pozitif davranışları pekiştirin',
      'Oyun zamanı artırın',
      'Rutinler oluşturun',
      'Öfke anında sakin kalın'
    ],
    redFlags: [
      'Dil gelişimi tamamen durmuş',
      'Sosyal beceri kaybı',
      'Aşırı agresif davranışlar',
      'Uyku/beslenme ciddi sorunları',
      'Gelişim geriye gitme'
    ]
  },
  {
    ageRange: '4-5 yaş (Preschool)',
    normalBehaviors: [
      'Kurallara test etme',
      'Hayal kurma, imaginative play',
      'Peer interaction başlangıcı',
      'Soru sorma dönemi ("neden?")',
      'Dikkat süresi artışı (5-10 dakika)',
      'İmpulse control gelişimi'
    ],
    concerningBehaviors: [
      'Aşırı aggressive behavior',
      'Hiç arkadaş yapmama',
      'Ciddi language delays',
      'Repetitive behaviors',
      'Extreme fearfulness',
      'Developmental regression'
    ],
    parentGuidance: [
      'Okul hazırlığı destekleyin',
      'Sosyal becerileri öğretin',
      'Problem solving öğretin',
      'Emotion regulation becerisi',
      'Structured activities sunun',
      'Peer playdate düzenleyin'
    ],
    redFlags: [
      'Okul ortamına hiç adapte olamama',
      'Ciddi agresyon devam ediyor',
      'No pretend play',
      'Severe social withdrawal',
      'Language regression'
    ]
  },
  {
    ageRange: '6-12 yaş (School age)',
    normalBehaviors: [
      'Okul performansı değişkenliği',
      'Peer group importance artışı',
      'Rule-oriented behavior',
      'Competition ve achievement focus',
      'Mood swings (hafif)',
      'Independence arayışı'
    ],
    concerningBehaviors: [
      'Chronic academic failure',
      'No peer relationships',
      'Persistent oppositional behavior',
      'Mood disorders emergence',
      'Attention/hyperactivity sorunları',
      'Anxiety disorders'
    ],
    parentGuidance: [
      'Akademik destek sağlayın',
      'Sosyal aktiviteleri destekleyin',
      'Structured homework routine',
      'Clear expectations koyun',
      'Positive reinforcement kullanın',
      'Mental health aware olun'
    ],
    redFlags: [
      'Academic regression',
      'Social isolation complete',
      'Behavioral problems escalating',
      'Self-harm thoughts/behaviors',
      'Substance use curiosity'
    ]
  }
];

// Beslenme Sorunları Değerlendirme Verileri
export interface NutritionAssessment {
  category: string;
  ageGroup: string;
  definition: string;
  clinicalPresentation: string[];
  etiologyCategories: string[];
  workupApproach: string[];
  managementStrategy: string[];
  redFlags: string[];
}

export const nutritionProblemsGuide: NutritionAssessment[] = [
  {
    category: 'Failure to Thrive (FTT)',
    ageGroup: '0-2 yaş (kritik dönem)',
    definition: 'Ağırlık <5p veya ağırlık percentilinde 2+ çizgi düşüş',
    clinicalPresentation: [
      'Inadequate weight gain (<20g/gün ilk 3 ay)',
      'Ağırlık boy percentilinden düşük',
      'Linear growth deceleration',
      'Delayed development milestones',
      'Apathetic appearance',
      'Decreased muscle mass, subcutaneous fat'
    ],
    etiologyCategories: [
      'Inadequate intake (90%): Poor feeding, maternal factors',
      'Malabsorption (5%): CF, celiac, milk allergy',
      'Increased losses (3%): GER, diarrhea, infection',
      'Increased requirements (2%): Hyperthyroid, CHD, malignancy',
      'Defective utilization (<1%): Metabolic disorders'
    ],
    workupApproach: [
      'Detaylı beslenme hikayesi (3-7 günlük diary)',
      'Caloric intake calculation',
      'Psikososyal değerlendirme',
      'Physical exam (dysmorphism, organomegaly)',
      'Basic labs: CBC, CMP, UA, stool studies',
      'Seçilmiş testler: Celiac, CF, endocrin panel'
    ],
    managementStrategy: [
      'Caloric density artırın (>120 kcal/kg/gün)',
      'Frequent feeding schedule',
      'Nutritionist consultation',
      'Underlying condition tedavisi',
      'Psychosocial support',
      'Close follow-up (haftalık tartım)'
    ],
    redFlags: [
      'Severe dehydration/malnutrition',
      'Developmental delay eşlik ediyor',
      'Recurrent infections',
      'Organomegaly veya dysmorphism',
      'Family dysfunction/neglect'
    ]
  },
  {
    category: 'Infantil Feeding Difficulties',
    ageGroup: '0-12 ay',
    definition: 'Emme, yutma veya beslenme koordinasyonu problemleri',
    clinicalPresentation: [
      'Poor suck-swallow coordination',
      'Frequent choking/gagging',
      'Emme güçsüzlüğü',
      'Prolonged feeding times (>30 min)',
      'Food aversion/oral sensitivity',
      'Recurrent aspiration/pneumonia'
    ],
    etiologyCategories: [
      'Neurological: CP, hypotonia, cranial nerve palsy',
      'Anatomical: Cleft palate, tongue tie, laryngeal cleft',
      'Gastrointestinal: GER, esophageal atresia',
      'Cardiac: CHD causing fatigue',
      'Respiratory: Chronic lung disease',
      'Behavioral: Food aversion, oral aversion'
    ],
    workupApproach: [
      'Video swallow study (VFSS)',
      'Fiberoptic endoscopic evaluation (FEES)',
      'Speech therapy evaluation',
      'Occupational therapy assessment',
      'Upper GI series (GER değerlendirmesi)',
      'Cardiac/pulmonary evaluation (gerekirse)'
    ],
    managementStrategy: [
      'Speech-language therapy',
      'Occupational therapy',
      'Modified feeding techniques',
      'Texture modifications',
      'Positioning strategies',
      'Tube feeding (NG/GT) if needed'
    ],
    redFlags: [
      'Recurrent aspiration pneumonia',
      'Severe failure to thrive',
      'Cyanosis during feeding',
      'Chronic cough/wheeze',
      'Complete food refusal'
    ]
  },
  {
    category: 'Gastroesophageal Reflux (GER)',
    ageGroup: '0-12 ay (pik 4-6 ay)',
    definition: 'Gastrik içeriğin özofagusa geri kaçması',
    clinicalPresentation: [
      'Frequent spitting up/vomiting',
      'Feeding intolerance',
      'Irritability, arching back',
      'Sleep disturbances',
      'Chronic cough, wheeze',
      'Poor weight gain (GERD)'
    ],
    etiologyCategories: [
      'Physiologic (normal): İmmature LES, liquid diet',
      'Pathologic GERD: Esophagitis, aspiration',
      'Secondary causes: Anatomical abnormalities',
      'Neurological: Delayed gastric emptying',
      'Mechanical: Hiatal hernia, malrotation'
    ],
    workupApproach: [
      'Clinical diagnosis (most cases)',
      'Upper GI series (anatomical evaluation)',
      'pH probe study (quantify acid exposure)',
      'Gastric emptying study',
      'Endoscopy (esophagitis şüphesi)',
      'Trial of acid suppression'
    ],
    managementStrategy: [
      'Positioning: Head elevated 30°',
      'Feeding modifications: Smaller, frequent feeds',
      'Thickened feeds (rice cereal)',
      'Acid suppression: PPI, H2 blockers',
      'Promotility agents (limited use)',
      'Surgical: Fundoplication (severe cases)'
    ],
    redFlags: [
      'Hematemesis (upper GI bleeding)',
      'Failure to thrive',
      'Recurrent pneumonia',
      'Apparent life-threatening events',
      'Chronic irritability'
    ]
  },
  {
    category: 'Cow Milk Protein Allergy (CMPA)',
    ageGroup: '0-6 ay (formula fed)',
    definition: 'İnek sütü proteinine karşı immünolojik reaksiyon',
    clinicalPresentation: [
      'GI symptoms: Vomiting, diarrhea, colic',
      'Cutaneous: Eczema, urticaria',
      'Respiratory: Wheeze, chronic cough',
      'Systemic: Anaphylaxis (rare)',
      'Growth: Poor weight gain',
      'Behavioral: Irritability, sleep disturbance'
    ],
    etiologyCategories: [
      'IgE-mediated: Immediate reaction (<2 hrs)',
      'Non-IgE mediated: Delayed reaction (hrs-days)',
      'Mixed type: Combination pattern',
      'Primary: Direct milk exposure',
      'Secondary: Through breast milk'
    ],
    workupApproach: [
      'Clinical history detailed',
      'Skin prick test (IgE-mediated)',
      'Serum specific IgE levels',
      'Elimination diet trial',
      'Oral challenge test (gold standard)',
      'Stool studies (blood, eosinophils)'
    ],
    managementStrategy: [
      'Elimination diet: Avoid all cow milk',
      'Extensively hydrolyzed formula',
      'Amino acid formula (severe)',
      'Breastfeeding mothers: Maternal elimination',
      'Read labels carefully',
      'Nutritional counseling'
    ],
    redFlags: [
      'Anaphylactic reactions',
      'Severe failure to thrive',
      'Bloody stools persistent',
      'Severe eczema',
      'Respiratory distress'
    ]
  }
];

// Yaşa Göre Kalori İhtiyacı Hesaplayıcısı
export interface CalorieRequirement {
  ageRange: string;
  weight: string;
  baseCalories: number;
  caloriesPerKg: number;
  proteinNeed: number; // g/kg/day
  fluidNeed: number; // ml/kg/day
  specialConsiderations: string[];
}

export const ageBasedCalorieRequirements: CalorieRequirement[] = [
  {
    ageRange: '0-3 ay',
    weight: '3-5 kg',
    baseCalories: 110,
    caloriesPerKg: 110,
    proteinNeed: 2.2,
    fluidNeed: 150,
    specialConsiderations: [
      'Breast milk/formula only',
      'Calorie density: 20 kcal/oz (67 kcal/100ml)',
      'Growth velocity highest',
      'Preterm babies may need 120-150 kcal/kg'
    ]
  },
  {
    ageRange: '4-6 ay',
    weight: '6-8 kg',
    baseCalories: 100,
    caloriesPerKg: 100,
    proteinNeed: 1.5,
    fluidNeed: 130,
    specialConsiderations: [
      'Introduction of solids 4-6 months',
      'Iron-fortified cereals first',
      'Single ingredient foods',
      'No honey, whole cow milk'
    ]
  },
  {
    ageRange: '7-12 ay',
    weight: '7-10 kg',
    baseCalories: 100,
    caloriesPerKg: 100,
    proteinNeed: 1.5,
    fluidNeed: 125,
    specialConsiderations: [
      'Finger foods introduction',
      'Self-feeding encouragement',
      'Avoid choking hazards',
      'Transition to family foods'
    ]
  },
  {
    ageRange: '1-3 yaş',
    weight: '10-15 kg',
    baseCalories: 1000,
    caloriesPerKg: 90,
    proteinNeed: 1.1,
    fluidNeed: 100,
    specialConsiderations: [
      'Whole milk until 2 years',
      'Balanced diet variety',
      'Limit juice <4 oz/day',
      'Avoid large chunks (choking)'
    ]
  },
  {
    ageRange: '4-6 yaş',
    weight: '15-20 kg',
    baseCalories: 1500,
    caloriesPerKg: 85,
    proteinNeed: 0.95,
    fluidNeed: 90,
    specialConsiderations: [
      '2% or low-fat milk',
      'Family meal participation',
      'Structured meal times',
      'Healthy snack choices'
    ]
  },
  {
    ageRange: '7-10 yaş',
    weight: '20-35 kg',
    baseCalories: 2000,
    caloriesPerKg: 70,
    proteinNeed: 0.95,
    fluidNeed: 75,
    specialConsiderations: [
      'Growth spurts variable',
      'Physical activity important',
      'Peer influence on food choices',
      'Nutrition education'
    ]
  },
  {
    ageRange: '11-14 yaş (pubertal)',
    weight: '35-50 kg',
    baseCalories: 2200,
    caloriesPerKg: 60,
    proteinNeed: 0.85,
    fluidNeed: 50,
    specialConsiderations: [
      'Pubertal growth spurt',
      'Increased appetite',
      'Body image concerns',
      'Independence in food choices'
    ]
  }
];

// Beslenme Hesaplayıcısı Fonksiyonları
export const calculateCalorieNeeds = (ageMonths: number, weightKg: number, activity: 'sedentary' | 'moderate' | 'active') => {
  let baseCalories = 0;
  let activityMultiplier = 1.0;

  // Yaşa göre base kalori
  if (ageMonths <= 3) baseCalories = weightKg * 110;
  else if (ageMonths <= 6) baseCalories = weightKg * 100;
  else if (ageMonths <= 12) baseCalories = weightKg * 100;
  else if (ageMonths <= 36) baseCalories = 1000 + (ageMonths - 12) * 100 / 24;
  else if (ageMonths <= 72) baseCalories = 1500 + (ageMonths - 36) * 500 / 36;
  else baseCalories = 2000 + (ageMonths - 72) * 200 / 24;

  // Aktivite düzeyine göre ayarlama
  switch (activity) {
    case 'sedentary': activityMultiplier = 1.0; break;
    case 'moderate': activityMultiplier = 1.2; break;
    case 'active': activityMultiplier = 1.4; break;
  }

  return Math.round(baseCalories * activityMultiplier);
};

export const interpretNutritionalStatus = (weightPercentile: number, heightPercentile: number) => {
  if (weightPercentile < 5 && heightPercentile < 5) {
    return {
      status: 'Severe Malnutrition',
      description: 'Both weight and height significantly below normal',
      recommendation: 'Immediate nutritional intervention required',
      followUp: 'Weekly monitoring, multidisciplinary approach'
    };
  } else if (weightPercentile < 5 && heightPercentile >= 5) {
    return {
      status: 'Acute Malnutrition (Wasting)',
      description: 'Weight affected more than height - recent onset',
      recommendation: 'Investigate acute causes, increase caloric intake',
      followUp: 'Bi-weekly monitoring, identify underlying cause'
    };
  } else if (weightPercentile >= 5 && heightPercentile < 5) {
    return {
      status: 'Chronic Malnutrition (Stunting)',
      description: 'Height affected more than weight - long-term',
      recommendation: 'Long-term nutritional support, address chronic factors',
      followUp: 'Monthly monitoring, comprehensive evaluation'
    };
  } else if (weightPercentile > 95) {
    return {
      status: 'Obesity Risk',
      description: 'Weight significantly above normal for age',
      recommendation: 'Dietary modification, increase physical activity',
      followUp: 'Monthly monitoring, lifestyle counseling'
    };
  } else {
    return {
      status: 'Normal Nutritional Status',
      description: 'Weight and height within normal ranges',
      recommendation: 'Maintain healthy diet and lifestyle',
      followUp: 'Annual routine monitoring'
    };
  }
};

// ... existing code ... 