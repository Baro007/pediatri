import { AssessmentFundamental } from '../types/medical';

export const triageAssessment: AssessmentFundamental = {
  id: 'triage',
  title: 'Triage ve İlk Değerlendirme',
  icon: '🔍',
  description: 'Acil serviste pediatrik hastaların sistematik değerlendirmesi',
  principles: [
    {
      title: 'ABC Yaklaşımı',
      description: 'Öncelikli yaşamsal fonksiyonların değerlendirilmesi',
      keyPoints: [
        'Airway (Hava yolu): Açık mı, obstrüksiyon var mı?',
        'Breathing (Solunum): Solunum sıkıntısı, siyanoz?',
        'Circulation (Dolaşım): Nabız, kan basıncı, perfüzyon?',
        'Disability (Nörolojik): Bilinç düzeyi, GCS',
        'Exposure (Maruz kalma): Soyma, vücut ısısı'
      ]
    },
    {
      title: 'Pediatrik Triage Sistemi',
      description: 'Yaş ve semptom odaklı önceliklendirme',
      keyPoints: [
        'Acil (Level 1): Yaşamsal tehlike, resüsitasyon',
        'Çok Acil (Level 2): Potansiyel yaşamsal tehlike',
        'Acil (Level 3): Stabil ama acil müdahale gerekli',
        'Daha Az Acil (Level 4): Stabil, ertelenebilir',
        'Elektif (Level 5): Rutin bakım'
      ]
    },
    {
      title: 'Genel Görünüm Değerlendirmesi',
      description: 'Çocuğun genel durumunun hızlı değerlendirilmesi',
      keyPoints: [
        'Bilinç düzeyi: Uyanık, irritabl, letarjik',
        'Aktivite: Oyun, etkileşim, beslenme',
        'Ağlama: Konsolasyon, ses kalitesi',
        'Renk: Soluk, siyanotik, pembe',
        'Ebeveyn endişesi: Sezgisel değerlendirme'
      ]
    }
  ],
  ageSpecific: {
    '0-3 ay': [
      'Ateşli bebek (>38°C) tam sepsis workup',
      'Beslenme paterninde değişiklik önemli',
      'Apne episodları dikkatli izleme',
      'Fontanel gerginliği değerlendirme',
      'Hipoterminin febrilden daha ciddi olması'
    ],
    '3-24 ay': [
      'Yabancı cisim aspirasyonu riski yüksek',
      'Febril konvülsiyon sık görülür',
      'Dehidratasyon hızla gelişebilir',
      'Gelişimsel milestone gecikmeleri',
      'Ebeveyn ayrılık anksiyetesi'
    ],
    '2-5 yaş': [
      'Kooperasyon zorluğu, oyun ile yaklaşım',
      'Travma riski artar (düşme, kaza)',
      'Astım ve alerjik reaksiyonlar sık',
      'Davranışsal değişiklikler önemli',
      'Ağrı skorlama araçları kullanma'
    ],
    '5-12 yaş': [
      'Direkt sorgulama mümkün',
      'Okul performansı değerlendirme',
      'Sosyal faktörlerin etkisi',
      'Spor yaralanmaları sık',
      'Psikosomatik şikayetler'
    ],
    '12-18 yaş': [
      'Gizlilik ve otonomi önemli',
      'Riskli davranışlar (madde, cinsellik)',
      'Ergenlik problemleri',
      'Mental sağlık sorunları sık',
      'Aile dinamiklerini değerlendirme'
    ]
  },
  tools: [
    {
      name: 'Pediatric Early Warning Score (PEWS)',
      purpose: 'Klinik durumun objektif değerlendirilmesi',
      steps: [
        'Davranış skoru (0-3): Oyun/uygun - irritabl - letarjik',
        'Kardiyovasküler skor (0-3): Renk, CRT, HR',
        'Solunum skoru (0-3): Solunum eforu, SpO2, solunum sesleri'
      ],
      interpretation: [
        'Toplam skor 0-3: Düşük risk',
        'Toplam skor 4-6: Orta risk, yakın takip',
        'Toplam skor ≥7: Yüksek risk, acil müdahale'
      ]
    },
    {
      name: 'AVPU Skalası',
      purpose: 'Bilinç düzeyinin hızlı değerlendirilmesi',
      steps: [
        'A (Alert): Uyanık, çevreye duyarlı',
        'V (Voice): Ses uyarısına yanıt',
        'P (Pain): Ağrı uyarısına yanıt',
        'U (Unresponsive): Yanıtsız'
      ],
      interpretation: [
        'A: Normal bilinç',
        'V: Hafif bilinç bulanıklığı',
        'P: Ciddi bilinç kaybı',
        'U: Koma durumu'
      ]
    },
    {
      name: 'Dehidratasyon Değerlendirmesi',
      purpose: 'Sıvı kaybının objektif belirlenmesi',
      steps: [
        'Genel görünüm: Uyanık/irritabl/letarjik',
        'Göz: Normal/çukur/çok çukur',
        'Mukoza: Nemli/kuru/çok kuru',
        'Gözyaşı: Var/azalmış/yok',
        'CRT: <2sn/2-4sn/>4sn'
      ],
      interpretation: [
        'Hafif dehidratasyon: <5% vücut ağırlığı',
        'Orta dehidratasyon: 5-10% vücut ağırlığı',
        'Ağır dehidratasyon: >10% vücut ağırlığı'
      ]
    }
  ]
};

export const developmentalAssessment: AssessmentFundamental = {
  id: 'developmental',
  title: 'Gelişimsel Değerlendirme',
  icon: '👶',
  description: 'Çocuklarda motor, kognitif ve sosyal gelişim değerlendirmesi',
  principles: [
    {
      title: 'Gelişim Alanları',
      description: 'Değerlendirilmesi gereken temel alanlar',
      keyPoints: [
        'Motor gelişim: Kaba ve ince motor becerileri',
        'Dil gelişimi: Alıcı ve ifade edici dil',
        'Sosyal-duygusal gelişim: Etkileşim becerileri',
        'Kognitif gelişim: Problem çözme, öğrenme',
        'Adaptif beceriler: Günlük yaşam aktiviteleri'
      ]
    },
    {
      title: 'Red Flags',
      description: 'Gelişimsel gecikme işaretleri',
      keyPoints: [
        'Milestone gecikmesi: Yaşına göre beklenen becerilerin olmaması',
        'Regresyon: Kazanılan becerilerin kaybı',
        'Asimetri: Tek taraflı motor kayıp',
        'Sosyal geri çekilme: Göz teması kaybı',
        'Dil gecikmesi: Yaşına göre beklenenden geri'
      ]
    }
  ],
  ageSpecific: {
    '0-6 ay': [
      'Refleks değerlendirmesi',
      'Baş kontrolü (4 ay)',
      'Sosyal gülümseme (6-8 hafta)',
      'Görsel takip (2-3 ay)',
      'Ses çıkarma (2-4 ay)'
    ],
    '6-12 ay': [
      'Oturma (6-8 ay)',
      'Emekleme (8-10 ay)',
      'Pincer grasp (9-12 ay)',
      'Mama-dada (9-12 ay)',
      'Yabancı anksiyetesi (8-10 ay)'
    ],
    '12-24 ay': [
      'Yürüme (12-15 ay)',
      'İlk kelimeler (12-18 ay)',
      'Sembolik oyun (18-24 ay)',
      'İki kelime birleştirme (18-24 ay)',
      'Paralel oyun (18-24 ay)'
    ],
    '2-5 yaş': [
      'Tuvalet eğitimi (2-3 yaş)',
      'Cümle kurma (2-3 yaş)',
      'Kooperatif oyun (3-4 yaş)',
      'Okul öncesi hazırlık (4-5 yaş)',
      'Sosyal kurallar (3-5 yaş)'
    ]
  },
  tools: [
    {
      name: 'Denver Developmental Screening Test (DDST)',
      purpose: 'Gelişimsel gecikmenin taranması',
      steps: [
        'Yaş hesaplama (prematüre düzeltme)',
        'Kişisel-sosyal alan değerlendirme',
        'İnce motor-adaptif alan',
        'Dil alanı değerlendirme',
        'Kaba motor alan'
      ],
      interpretation: [
        'Normal: Yaşına uygun gelişim',
        'Şüpheli: Bir veya iki alanda gecikme',
        'Gecikme: İki veya daha fazla alanda gecikme'
      ]
    }
  ]
};

export const painAssessment: AssessmentFundamental = {
  id: 'pain',
  title: 'Ağrı Değerlendirmesi',
  icon: '😣',
  description: 'Pediatrik hastalarda ağrı değerlendirmesi ve skorlama',
  principles: [
    {
      title: 'Yaş Gruplarına Göre Ağrı Değerlendirmesi',
      description: 'Farklı yaş gruplarında ağrı değerlendirme yöntemleri',
      keyPoints: [
        'Yenidoğan: Fizyolojik ve davranışsal belirtiler',
        'İnfant: Ağlama, irritabilite, davranış değişiklikleri',
        'Toddler: Basit ağrı skalaları, davranış gözlemi',
        'Okul öncesi: Yüz skalaları, basit sayısal değerlendirme',
        'Okul çağı: Sayısal skorlama, detaylı tanımlama'
      ]
    },
    {
      title: 'Ağrı Belirtileri',
      description: 'Çocuklarda ağrıyı gösteren işaretler',
      keyPoints: [
        'Davranışsal: Ağlama, huzursuzluk, geri çekilme',
        'Fizyolojik: Taşikardi, hipertansiyon, terleme',
        'Verbal: Ağrı ifadesi, inleme, şikayet',
        'Postüral: Pozisyon değişiklikleri, koruma',
        'Aktivite: Oyun azalması, beslenme bozukluğu'
      ]
    }
  ],
  ageSpecific: {
    '0-3 ay': [
      'NIPS (Neonatal Infant Pain Scale)',
      'Ağlama karakteristikleri',
      'Yüz ifadesi değerlendirmesi',
      'Vücut hareketleri',
      'Vital sign değişiklikleri'
    ],
    '3-12 ay': [
      'FLACC Scale (Face, Legs, Activity, Cry, Consolability)',
      'Ebeveyn gözlemi',
      'Davranış değişiklikleri',
      'Beslenme paterninde değişiklik',
      'Uyku düzeninde bozukluk'
    ],
    '1-3 yaş': [
      'FLACC modifiye versiyonu',
      'Basit yüz skalaları',
      'Davranış gözlemi',
      'Oyun aktivitesinde azalma',
      'Sözel ifadeler'
    ],
    '3-7 yaş': [
      'Wong-Baker FACES Scale',
      'Oucher Scale',
      'Renk analoğu skala',
      'Basit sayısal skala',
      'Oyun terapisi ile değerlendirme'
    ],
    '7+ yaş': [
      'Visual Analog Scale (VAS)',
      'Numerical Rating Scale (0-10)',
      'Detaylı ağrı tanımlaması',
      'Lokalizasyon yetisi',
      'Sebep-sonuç ilişkisi kurma'
    ]
  },
  tools: [
    {
      name: 'FLACC Scale',
      purpose: '2 ay - 7 yaş arası ağrı değerlendirmesi',
      steps: [
        'Face (Yüz): Yüz ifadesi (0-2 puan)',
        'Legs (Bacaklar): Bacak pozisyonu (0-2 puan)',
        'Activity (Aktivite): Hareket düzeyi (0-2 puan)',
        'Cry (Ağlama): Ağlama kalitesi (0-2 puan)',
        'Consolability (Teselli): Teselli edilebilirlik (0-2 puan)'
      ],
      interpretation: [
        'Toplam 0-3: Hafif ağrı',
        'Toplam 4-6: Orta ağrı',
        'Toplam 7-10: Şiddetli ağrı'
      ]
    },
    {
      name: 'Wong-Baker FACES Scale',
      purpose: '3 yaş ve üzeri çocuklar için ağrı skoru',
      steps: [
        'Yüz ifadelerini göster (0-10 skala)',
        'Çocuğun hissettiği ağrıya uygun yüzü seçmesini iste',
        'Skorlama: 0 (gülümseyen) - 10 (ağlayan yüz)'
      ],
      interpretation: [
        '0-2: Ağrı yok / çok hafif',
        '3-4: Hafif ağrı',
        '5-6: Orta ağrı',
        '7-8: Şiddetli ağrı',
        '9-10: Çok şiddetli ağrı'
      ]
    }
  ]
};

export const assessmentFundamentals: AssessmentFundamental[] = [
  triageAssessment,
  developmentalAssessment,
  painAssessment
];

export const getAssessmentFundamentalById = (id: string): AssessmentFundamental | undefined => {
  return assessmentFundamentals.find(assessment => assessment.id === id);
}; 