import { SystemExamination, ExaminationTechnique, ExaminationFindings } from '../types/medical';

export const respiratoryExamination: SystemExamination = {
  id: 'respiratory',
  name: 'Solunum Sistemi',
  icon: '��',
  description: 'Çocuklarda solunum sistemi muayenesi - basit, etkili ve güvenli yaklaşım',
  techniques: [
    {
      id: 'inspection',
      name: 'Göz ile Değerlendirme (İnspeksiyon)',
      description: 'Çocuğu uzaktan gözlemleyerek solunum durumunu anlayın - dokunmadan çok şey öğrenebilirsiniz!',
      steps: [
        'Çocuğun nasıl nefes aldığını izleyin - hızlı mı, yavaş mı?',
        'Göğüs kafesi şeklini kontrol edin - simetrik mi?',
        'Solurken extra kaslar çalışıyor mu? (boyun, karın kasları)',
        'Dudakları, parmakları mavi mi? (siyanoz)',
        'Göğüs kafesi solurken içe çekiliyor mu? (retraksiyon)',
        'Burun deliklerini solurken kullanıyor mu?'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Bebekler karnıyla nefes alır - bu normal! Hızlı solunumu normal ama retraksiyon varsa dikkat.',
        '2-6': '💡 Püf Noktası: Çocuk oyun oynarken gözlemleyin - doğal halini görmek için en iyi yöntem.',
        '6-18': '💡 Püf Noktası: Ergenler mahremiyetten dolayı çekinebilir - önce açıklama yapın.'
      }
    },
    {
      id: 'palpation',
      name: 'Dokunarak Hissetme (Palpasyon)',
      description: 'Nazikçe dokunarak solunum sisteminin nasıl çalıştığını hissedin',
      steps: [
        'Göğüs kafesinin her iki yanı da eşit şişiyor mu?',
        'Konuşurken göğüste titreşim hissedilebilir mi?',
        'Dokunulduğunda ağrısı var mı?',
        'Boğaz orta yerinde mi, yana kaymış mı?',
        'Boyunda büyük lenf düğümleri var mı?'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Bebek sakin ve memnunken yapın. Ağlarsa gerçek muayeneyi göremezsiniz.',
        '2-6': '💡 Püf Noktası: "Doktor oyunu" gibi yapın. Önce oyuncağa, sonra çocuğa yapın.',
        '6-18': '💡 Püf Noktası: Her adımı açıklayın. "Şimdi ciğerlerinin nasıl çalıştığına bakacağım."'
      }
    },
    {
      id: 'percussion',
      name: 'Hafifçe Vurma (Perküsyon)',
      description: 'Parmakla hafifçe vurarak akciğerlerin içinde hava mı, sıvı mı var anlayın',
      steps: [
        'Akciğer sınırlarını belirleyin - normal boyutta mı?',
        'Solunum kasının hareketini kontrol edin',
        'Anormal bölgeler var mı tespit edin',
        'Kalp bölgesinin sınırlarını anlayın'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Çok küçük alanda nazikçe yapın. Bebeğin hassas kaburga kemikleri var.',
        '2-6': '💡 Püf Noktası: "Trampetçi gibi ses çıkarıyorum" diyerek oyun yapın.',
        '6-18': '💡 Püf Noktası: Normal perküsyon teknikleri uygulanabilir ama açıklama yapın.'
      }
    },
    {
      id: 'auscultation',
      name: 'Dinleme (Oskültasyon)',
      description: 'Stetoskopla dinleyerek akciğerlerde neler oluyor anlayın',
      steps: [
        'Normal solunum seslerini dinleyin - temiz mi?',
        'Anormal sesler var mı? (hırıltı, ıslık)',
        'Her iki akciğer de eşit çalışıyor mu?',
        'Konuşma sesleri nasıl duyuluyor?'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Bebek uyurken veya sakinken dinleyin. Ağlayınca hiçbir şey duyamazsınız.',
        '2-6': '💡 Püf Noktası: Oyuncak stetoskopla önce kendisini dinlettin, sonra sizi.',
        '6-18': '💡 Püf Noktası: Sırt, ön ve yanlardan sistematik dinleyin - hiçbir yeri atlamayın.'
      }
    }
  ],
  normalFindings: {
    inspection: [
      'Göğüs kafesi her iki yanı da eşit hareket ediyor',
      'Yaşına uygun nefes alma hızı (çok hızlı veya yavaş değil)',
      'Dudaklar ve parmaklar pembe renkte (mavi değil)',
      'Göğüs kafesi solurken içe çekilmiyor',
      'Burun deliklerini kullanarak zorlanarak solumak yok'
    ],
    palpation: [
      'Göğüs kafesinin her iki yanı da eşit genişliyor',
      'Konuşma titreşimi normal hissediliyor',
      'Dokunulduğunda ağrı yok',
      'Boğaz orta yerinde, yana kaymamış',
      'Boyunda büyük lenf düğümleri yok'
    ],
    percussion: [
      'Normal rezonans sesi (davul gibi boş ses)',
      'Akciğer sınırları normal boyutta',
      'Solunum kası normal hareket ediyor'
    ],
    auscultation: [
      'Temiz, doğal solunum sesleri',
      'Anormal ek sesler yok',
      'Her iki akciğer de eşit çalışıyor'
    ]
  },
  abnormalFindings: {
    inspection: [
      'Göğüs kafesi bir yanı hareket etmiyor',
      'Çok hızlı veya çok yavaş nefes alma',
      'Dudaklar, parmaklar mavi (oksijen eksikliği)',
      'Göğüs kafesi içe çekiliyor (nefes almakta zorlanıyor)',
      'Burun delikleriyle zorlanarak nefes alma',
      'Göğüs kafesi şekil bozukluğu'
    ],
    palpation: [
      'Tek taraflı genişleme',
      'Titreşim çok az veya çok fazla',
      'Dokunulduğunda ağrı',
      'Boğaz yana kaymış',
      'Boyunda büyük lenf düğümleri'
    ],
    percussion: [
      'Mat ses (akciğerde sıvı birikimi)',
      'Çok boş ses (akciğerde hava birikimi)',
      'Solunum kası hareket etmiyor'
    ],
    auscultation: [
      'Zayıf veya hiç solunum sesi duyulmuyor',
      'Hırıltılı sesler, ıslık sesi, çatırtı',
      'Tek taraflı azalmış havalanma',
      'Stridor (nefes alırken yüksek ses)'
    ]
  },
  redFlags: [
    '🚨 Dudak ve parmaklar mavi (SİYANOZ) - acil müdahale!',
    '🚨 Çok ciddi nefes alma zorluğu - derhal oksijen!',
    '🚨 Nefes alırken yüksek ses (STRİDOR) - havayolu tıkanıklığı!',
    '🚨 Göğüs kafesi hiç hareket etmiyor - nefes alamıyor!',
    '🚨 Göğüs kafesi çok fazla içe çekiliyor - ağır durum!',
    '🚨 Nefes alma duraklamaları (APNE) - beyin sorunu olabilir!'
  ],
  clinicalPearls: [
    '💎 Bebeklerde karın nefesi normal - endişelenmeyin!',
    '💎 Hırıltı her zaman astım değildir - nedenini araştırın!',
    '💎 Hırıltı öksürükle değişiyorsa çoğunlukla balgam var',
    '💎 Çatırtı sesi zatürre işareti olabilir - dikkatli dinleyin!',
    '💎 Tek taraflı azalmış solunum sesleri göğüste hava birikimini düşündürür',
    '💎 Çocuk korktuğunda nefes hızlanır - sakinleştirin önce!'
  ]
};

export const cardiovascularExamination: SystemExamination = {
  id: 'cardiovascular',
  name: 'Kardiyovasküler Sistem',
  icon: '❤️',
  description: 'Pediatrik kardiyovasküler sistem muayenesi',
  techniques: [
    {
      id: 'inspection',
      name: 'İnspeksiyon',
      description: 'Kardiyovasküler sistem görsel değerlendirmesi',
      steps: [
        'Genel durum ve aktivite seviyesi',
        'Siyanoz değerlendirmesi',
        'Prekordiyal bölge değerlendirmesi',
        'Boyun venlerinin değerlendirmesi',
        'Ekstremitelerde ödem',
        'Kapiller dolum zamanı'
      ],
      ageSpecific: {
        '0-2': 'Beslenme zorluğu, huzursuzluk',
        '2-6': 'Oyun toleransı değerlendirmesi',
        '6-18': 'Egzersiz kapasitesi sorgulaması'
      }
    },
    {
      id: 'palpation',
      name: 'Palpasyon',
      description: 'Kardiyovasküler sistem palpasyonu',
      steps: [
        'Kalp tepe atımı (PMI) lokalizasyonu',
        'Trill araştırması',
        'Periferik nabızlar',
        'Karaciğer büyüklüğü',
        'Ekstremite nabızları'
      ],
      ageSpecific: {
        '0-2': 'Femoral nabız kontrolü önemli',
        '2-6': 'Oyun sırasında nabız değerlendirmesi',
        '6-18': 'Kan basıncı ölçümü rutin'
      }
    },
    {
      id: 'auscultation',
      name: 'Oskültasyon',
      description: 'Kalp seslerinin dinlenmesi',
      steps: [
        'Kalp sesleri (S1, S2) değerlendirmesi',
        'Üfürüm araştırması',
        'Ritim düzensizlikleri',
        'Ek kalp sesleri (S3, S4)',
        'Dört odak noktasında dinleme'
      ],
      ageSpecific: {
        '0-2': 'Yüksek kalp hızı normal',
        '2-6': 'Masum üfürümler sık',
        '6-18': 'Egzersiz sonrası değişim'
      }
    }
  ],
  normalFindings: {
    inspection: [
      'Aktif, beslenme normal',
      'Siyanoz yok',
      'Prekordiyal bölge normal',
      'Boyun venleri normal',
      'Ödem yok',
      'Kapiller dolum <2 saniye'
    ],
    palpation: [
      'PMI normal lokalizasyonda',
      'Trill yok',
      'Periferik nabızlar palpable',
      'Karaciğer normal boyutta',
      'Ekstremite nabızları eşit'
    ],
    auscultation: [
      'S1, S2 net duyulur',
      'Üfürüm yok veya masum',
      'Ritim düzenli',
      'Ek ses yok'
    ]
  },
  abnormalFindings: {
    inspection: [
      'Beslenme zorluğu',
      'Siyanoz',
      'Prekordiyal kabarma',
      'Boyun veni dolgunluğu',
      'Ödem',
      'Kapiller dolum >2 saniye'
    ],
    palpation: [
      'PMI yer değiştirmiş',
      'Trill (+)',
      'Zayıf periferik nabızlar',
      'Hepatomegali',
      'Nabız asimetrisi'
    ],
    auscultation: [
      'S1, S2 anormal',
      'Patolojik üfürüm',
      'Aritmi',
      'Ek kalp sesleri'
    ]
  },
  redFlags: [
    'Siyanoz (özellikle santral)',
    'Ciddi beslenme zorluğu',
    'Şiddetli tachycardia/bradycardia',
    'Kardiyojenik şok belirtileri',
    'Pulsus paradoksus',
    'Ciddi aritmi'
  ],
  clinicalPearls: [
    'Çocuklarda masum üfürümler %50-85 oranında',
    'Femoral nabız kontrolü koarktasyon için önemli',
    'Beslenme zorluğu kalp yetmezliğinin erken belirtisi',
    'Siyanoz 5g/dL methemoglobin gerektirir',
    'Çocuklarda bradycardia daha ciddi'
  ]
};

export const gastrointestinalExamination: SystemExamination = {
  id: 'gastrointestinal',
  name: 'Gastrointestinal Sistem',
  icon: '🫄',
  description: 'Pediatrik gastrointestinal sistem muayenesi',
  techniques: [
    {
      id: 'inspection',
      name: 'İnspeksiyon',
      description: 'Karın bölgesinin görsel değerlendirmesi',
      steps: [
        'Karın şekli ve simetrisi',
        'Karın distansiyonu',
        'Görünür peristaltizm',
        'Cilt değişiklikleri',
        'Umbilikal bölge',
        'Inguinal bölge'
      ],
      ageSpecific: {
        '0-2': 'Bebeklerde karın proeminent normal',
        '2-6': 'Oyun sırasında rahat muayene',
        '6-18': 'Mahremiyet dikkate alınmalı'
      }
    },
    {
      id: 'auscultation',
      name: 'Oskültasyon',
      description: 'Bağırsak seslerinin dinlenmesi',
      steps: [
        'Bağırsak sesleri varlığı',
        'Bağırsak sesleri karakteri',
        'Bağırsak sesleri sıklığı',
        'Vasküler sesler'
      ],
      ageSpecific: {
        '0-2': 'Beslenme sonrası aktif sesler',
        '2-6': 'Oyun aralarında dinleme',
        '6-18': 'Açlık/tokluk durumu değerlendirmesi'
      }
    },
    {
      id: 'palpation',
      name: 'Palpasyon',
      description: 'Karın palpasyonu',
      steps: [
        'Yüzeyel palpasyon',
        'Derin palpasyon',
        'Organ büyüklükleri',
        'Kitle araştırması',
        'Hassasiyet değerlendirmesi',
        'Rebound test'
      ],
      ageSpecific: {
        '0-2': 'Nazik palpasyon, sakin ortamda',
        '2-6': 'Oyun haline getirerek',
        '6-18': 'Sistematik palpasyon'
      }
    },
    {
      id: 'percussion',
      name: 'Perküsyon',
      description: 'Karın perküsyonu',
      steps: [
        'Karaciğer sınırları',
        'Dalak büyüklüğü',
        'Asit araştırması',
        'Timpani/matite alanları'
      ],
      ageSpecific: {
        '0-2': 'Çok hafif perküsyon',
        '2-6': 'Oyun şeklinde perküsyon',
        '6-18': 'Detaylı perküsyon'
      }
    }
  ],
  normalFindings: {
    inspection: [
      'Simetrik karın',
      'Distansiyon yok',
      'Görünür peristaltizm yok',
      'Cilt normal',
      'Umbilikus normal',
      'Fıtık yok'
    ],
    auscultation: [
      'Bağırsak sesleri (+)',
      'Normal karakter',
      'Normal sıklık (5-30/dk)',
      'Vasküler ses yok'
    ],
    palpation: [
      'Yumuşak karın',
      'Hassasiyet yok',
      'Organlar normal boyutta',
      'Kitle yok',
      'Rebound (−)'
    ],
    percussion: [
      'Karaciğer normal sınırlarda',
      'Dalak palpable değil',
      'Asit yok',
      'Normal timpani'
    ]
  },
  abnormalFindings: {
    inspection: [
      'Asimetrik karın',
      'Distansiyon',
      'Görünür peristaltizm',
      'Cilt değişiklikleri',
      'Umbilikal anormallikler',
      'Fıtık'
    ],
    auscultation: [
      'Bağırsak sesleri (−)',
      'Hipoaktif/hiperaktif',
      'Metalik sesler',
      'Vasküler üfürüm'
    ],
    palpation: [
      'Sert karın',
      'Hassasiyet',
      'Organomegali',
      'Kitle',
      'Rebound (+)'
    ],
    percussion: [
      'Hepatomegali',
      'Splenomegali',
      'Asit',
      'Anormal matite'
    ]
  },
  redFlags: [
    'Akut karın bulguları',
    'Bağırsak obstrüksiyonu',
    'Peritonit bulguları',
    'Masif GI kanama',
    'Şiddetli dehidratasyon',
    'Toksik görünüm'
  ],
  clinicalPearls: [
    'Çocuklarda appendisit atipik olabilir',
    'Karın ağrısı lokalizasyonu yaşla gelişir',
    'Bağırsak seslerinin yokluğu ciddi',
    'Karaciğer çocuklarda palpable olabilir',
    'Konstipasyon sık karın ağrısı nedeni'
  ]
};

export const genitourinaryExamination: SystemExamination = {
  id: 'gu',
  name: 'Genitoüriner Sistem',
  icon: '💧',
  description: 'Çocuklarda böbrek, idrar yolları ve genital bölge muayenesi - hassas ve dikkatli yaklaşım',
  techniques: [
    {
      id: 'inspection',
      name: 'Göz ile Değerlendirme (İnspeksiyon)',
      description: 'Karın, genital bölge ve idrar rengini inceleyerek genel durumu anlayın',
      steps: [
        'Karın şeklini ve şişkinlik var mı kontrol edin',
        'İdrar rengini ve kokusunu değerlendirin',
        'Genital bölge gelişimini yaşa uygun olarak inceleyin',
        'Ödem (şişlik) belirtileri arayın - özellikle göz kapakları',
        'Üretral akıntı veya irritasyon var mı bakın'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Bez değiştirirken fırsatını değerlendirin. Hipospadias kontrolü yapmayı unutmayın.',
        '2-6': '💡 Püf Noktası: Ebeveyn kucağında, oyuncakla dikkat dağıtarak muayene yapın.',
        '6-18': '💡 Püf Noktası: Mahremiyet çok önemli! Aynı cinsiyetten ebeveyn bulundurun, açıklama yapın.'
      }
    },
    {
      id: 'palpation',
      name: 'Nazik Dokunma (Palpasyon)',
      description: 'Böbrekler, mesane ve genital organları nazikçe hissederek değerlendirin',
      steps: [
        'Böbrekleri iki elle hissederek büyüklük kontrolü yapın',
        'Mesane doluluğunu kontrol edin (alt karında)',
        'Erkek bebeklerde testis iniş kontrolü yapın',
        'Kasık bölgesinde fıtık kontrolü yapın',
        'Hassasiyet veya ağrı var mı değerlendirin'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Bebek sakin iken yapın. Testis iniş kontrolü çok önemli!',
        '2-6': '💡 Püf Noktası: "Doktor karnına bakıyor" diyerek açıklayın. Acele etmeyin.',
        '6-18': '💡 Püf Noktası: Özellikle kız çocuklarında çok nazik olun, kendilerini rahatsız hissetmesinler.'
      }
    },
    {
      id: 'urinalysis',
      name: 'İdrar Analizi',
      description: 'İdrar örneği alarak böbrek ve idrar yolları sağlığını değerlendirin',
      steps: [
        'İdrar örneği toplama metodunu açıklayın',
        'İdrar rengini ve berraklığını değerlendirin',
        'Protein, kan, nitrit varlığını test edin',
        'Mikroskobik inceleme gerekirse yapın',
        'Kültür gereksinimini değerlendirin'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Torba ile toplama zor olabilir. Temiz yakalama için suprapubik aspirasyon gerekebilir.',
        '2-6': '💡 Püf Noktası: Tuvalet eğitimi alamayanlar için özel yöntemler kullanın.',
        '6-18': '💡 Püf Noktası: Doğru tekniği öğretin. Kızlarda orta akım örneği çok önemli.'
      }
    },
    {
      id: 'special_tests',
      name: 'Özel Testler',
      description: 'Yaşa ve cinsiyete özel muayene teknikleri uygulayın',
      steps: [
        'Erkeklerde: testis pozisyonu, hipospadias kontrolü',
        'Kızlarda: labial füzyon, vulvar irritasyon kontrolü',
        'Böbrek vuruş hassasiyeti (costovertebral angle)',
        'Mesane percusyonu (doluluğu kontrol)',
        'Genital hijyen değerlendirmesi'
      ],
      ageSpecific: {
        '0-2': '💡 Püf Noktası: Konjenital anomaliler için dikkatli tarama yapın.',
        '2-6': '💡 Püf Noktası: Tuvalet eğitimi sorunları ve enfeksiyon riski yüksek.',
        '6-18': '💡 Püf Noktası: Puberte değişiklikleri ve hijyen eğitimi önemli.'
      }
    }
  ],
  normalFindings: {
    inspection: [
      'Karın normal şekilde, şişkinlik yok',
      'İdrar açık sarı, berrak, normal koku',
      'Genital gelişim yaşa uygun',
      'Ödem bulguları yok',
      'Üretral akıntı veya irritasyon yok'
    ],
    palpation: [
      'Böbrekler palpe edilmiyor (normal)',
      'Mesane boş halde palpe edilmiyor',
      'Her iki testis skrotumda (erkek)',
      'Kasık fıtığı yok',
      'Hassasiyet veya ağrı yok'
    ],
    urinalysis: [
      'İdrar berrak, açık sarı',
      'Protein yok veya eser',
      'Kan yok',
      'Nitrit negatif',
      'Mikroskobik normal'
    ],
    special_tests: [
      'Testis pozisyonu normal (erkek)',
      'Genital anatomi normal',
      'Böbrek vuruş hassasiyeti yok',
      'Mesane percusyonu normal'
    ]
  },
  abnormalFindings: {
    inspection: [
      'Karın şişkinliği veya asimetri',
      'İdrar koyu, bulanık, kötü koku',
      'Genital gelişim bozukluğu',
      'Periorbital veya pretibial ödem',
      'Üretral akıntı, kızarıklık, irritasyon'
    ],
    palpation: [
      'Böbrek büyümesi palpe ediliyor',
      'Mesane distansiyonu',
      'Undesen testis (kriptorşidizm)',
      'Kasık fıtığı mevcut',
      'Hassasiyet veya ağrı var'
    ],
    urinalysis: [
      'İdrar koyu, bulanık',
      'Protein pozitif',
      'Hematüri (kan)',
      'Nitrit pozitif',
      'Mikroskobik anormallik'
    ],
    special_tests: [
      'Testis anomalileri (erkek)',
      'Genital malformasyon',
      'Böbrek vuruş hassasiyeti pozitif',
      'Mesane retansiyonu'
    ]
  },
  redFlags: [
    '🚨 Akut skrotum (testis torsiyonu şüphesi) - ACİL CERRAHİ!',
    '🚨 Anüri (24 saattir idrar çıkarmıyor) - böbrek yetmezliği!',
    '🚨 Masif hematüri (kanlı idrar) - ciddi patoloji!',
    '🚨 Hipertansif kriz bulguları - böbrek hastalığı!',
    '🚨 Ciddi ödem + nefes darlığı - kalp yetmezliği riski!',
    '🚨 Febril UTI + kusma - ürosepsis riski!'
  ],
  clinicalPearls: [
    '💎 Erkek bebeklerde undesen testis %3 oranında görülür',
    '💎 Kız çocuklarında UTI 10 kat daha sık!',
    '💎 Tuvalet eğitimi sırasında UTI riski artar',
    '💎 Böbrek palpasyonu sadece patolojik durumda mümkün',
    '💎 İdrar kültürü alırken kontaminasyon çok sık!',
    '💎 Circumcision sonrası hipospadias gözden kaçabilir',
    '💎 Adolesanda ani skrotum ağrısı = torsiyonu kanıtla!'
  ]
};

export const neurologicalExamination: SystemExamination = {
  id: 'neuro',
  name: 'Nörolojik Sistem',
  icon: '🧠',
  description: 'Pediatrik nörolojik sistem muayenesi ve gelişimsel değerlendirme',
  techniques: [
    {
      id: 'mental_status',
      name: 'Mental Durum',
      description: 'Bilinç ve mental fonksiyon değerlendirmesi',
      steps: [
        'Bilinç seviyesi değerlendirmesi',
        'Oryantasyon kontrolü',
        'Dikkat ve konsantrasyon',
        'Bellek değerlendirmesi',
        'Dil gelişimi',
        'Sosyal etkileşim'
      ],
      ageSpecific: {
        '0-2': 'Spontan hareketler, göz teması, sesli tepkiler',
        '2-6': 'Basit komutları anlama, oyun davranışları',
        '6-18': 'Oryantasyon, okul performansı, davranış değerlendirmesi'
      }
    },
    {
      id: 'cranial_nerves',
      name: 'Kranial Sinirler',
      description: '12 çift kranial sinir muayenesi',
      steps: [
        'Optik disk ve görme',
        'Göz hareketleri',
        'Yüz simetrisi',
        'İşitme değerlendirmesi',
        'Yutma ve konuşma',
        'Omuz ve boyun hareketleri'
      ],
      ageSpecific: {
        '0-2': 'Refleksler ve spontan hareketlerle değerlendirme',
        '2-6': 'Oyun ve taklit ile kooperasyon',
        '6-18': 'Detaylı kranial sinir muayenesi'
      }
    },
    {
      id: 'motor_system',
      name: 'Motor Sistem',
      description: 'Kas gücü ve hareket değerlendirmesi',
      steps: [
        'Kas tonusu değerlendirmesi',
        'Kas gücü testi',
        'Koordinasyon testleri',
        'Involünter hareketler',
        'Yürüyüş analizi'
      ],
      ageSpecific: {
        '0-2': 'Spontan hareketler, tonus değerlendirmesi',
        '2-6': 'Basit motor testler, oyun ile değerlendirme',
        '6-18': 'Standart motor testler'
      }
    },
    {
      id: 'reflexes',
      name: 'Refleksler',
      description: 'Derin tendon ve primitif refleks değerlendirmesi',
      steps: [
        'Derin tendon refleksleri',
        'Primitif refleksler (bebeklerde)',
        'Patolojik refleksler',
        'Kutanöz refleksler'
      ],
      ageSpecific: {
        '0-2': 'Primitif refleksler önemli (Moro, emme, kavrama)',
        '2-6': 'Primitif refleksler kaybolmalı',
        '6-18': 'Erişkin tip refleks paterni'
      }
    }
  ],
  normalFindings: {
    mental_status: [
      'Yaşına uygun bilinç',
      'Çevreye ilgi',
      'Uygun sosyal etkileşim',
      'Yaşa uygun dil gelişimi'
    ],
    cranial_nerves: [
      'Göz hareketleri normal',
      'Yüz simetrisi normal',
      'İşitme normal',
      'Yutma normal'
    ],
    motor_system: [
      'Kas tonusu normal',
      'Kas gücü yaşa uygun',
      'Koordinasyon normal',
      'İnvolünter hareket yok'
    ],
    reflexes: [
      'DTR normal (2+)',
      'Primitif refleksler yaşa uygun',
      'Patolojik refleks yok'
    ]
  },
  abnormalFindings: {
    mental_status: [
      'Bilinç bulanıklığı',
      'Oryantasyon bozukluğu',
      'Gelişimsel gerilik',
      'Davranış değişiklikleri'
    ],
    cranial_nerves: [
      'Göz hareket kısıtlılığı',
      'Yüz felci',
      'İşitme kaybı',
      'Yutma güçlüğü'
    ],
    motor_system: [
      'Hipotoni/hipertoni',
      'Kas zayıflığı',
      'Koordinasyon bozukluğu',
      'İnvolünter hareketler'
    ],
    reflexes: [
      'DTR değişiklikleri',
      'Primitif refleks persitansı',
      'Patolojik refleksler (+)'
    ]
  },
  redFlags: [
    'Bilinç kaybı',
    'Nöbet aktivitesi',
    'Artan intrakranial basınç bulguları',
    'Fokal nörolojik defisit',
    'Ciddi gelişimsel gerilik',
    'Ani davranış değişiklikleri'
  ],
  clinicalPearls: [
    'Primitif refleksler 6 ayda kaybolmalı',
    'Hipotoni "floppy baby syndrome" işareti',
    'Asimetrik bulgular fokal patolojiyi düşündürür',
    'Gelişimsel mil taşları takibi önemli',
    'Nöbet çocuklarda sık görülür'
  ]
};

export const musculoskeletalExamination: SystemExamination = {
  id: 'msk',
  name: 'Kas-İskelet Sistemi',
  icon: '🦴',
  description: 'Pediatrik kas-iskelet sistem muayenesi ve ortopedik değerlendirme',
  techniques: [
    {
      id: 'inspection',
      name: 'İnspeksiyon',
      description: 'Kas-iskelet sisteminin görsel değerlendirmesi',
      steps: [
        'Postür ve duruş değerlendirmesi',
        'Ekstremite simetrisi',
        'Deformite araştırması',
        'Şişlik ve ödem',
        'Cilt değişiklikleri',
        'Yürüyüş analizi'
      ],
      ageSpecific: {
        '0-2': 'Spontan hareketler, kalça displazisi taraması',
        '2-6': 'Oyun sırasında hareket gözlemi',
        '6-18': 'Spor aktiviteleri, skolyoz taraması'
      }
    },
    {
      id: 'palpation',
      name: 'Palpasyon',
      description: 'Dokunma ile kas-iskelet değerlendirmesi',
      steps: [
        'Kemik yapılar palpasyonu',
        'Eklem palpasyonu',
        'Kas palpasyonu',
        'Hassasiyet araştırması',
        'Sıcaklık değişiklikleri'
      ],
      ageSpecific: {
        '0-2': 'Nazik palpasyon, kalça muayenesi',
        '2-6': 'Oyun haline getirerek palpasyon',
        '6-18': 'Sistematik eklem muayenesi'
      }
    },
    {
      id: 'range_of_motion',
      name: 'Hareket Genişliği',
      description: 'Eklem hareket açıklığı değerlendirmesi',
      steps: [
        'Aktif hareket değerlendirmesi',
        'Pasif hareket değerlendirmesi',
        'Hareket kısıtlılığı',
        'Ağrı ile hareket',
        'Instabilite testleri'
      ],
      ageSpecific: {
        '0-2': 'Pasif hareket değerlendirmesi',
        '2-6': 'Oyun ile aktif hareket',
        '6-18': 'Spesifik hareket testleri'
      }
    },
    {
      id: 'special_tests',
      name: 'Özel Testler',
      description: 'Spesifik ortopedik testler',
      steps: [
        'Ortolani ve Barlow testleri',
        'Galeazzi testi',
        'Thomas testi',
        'Skolyoz taraması',
        'Ligament testleri'
      ],
      ageSpecific: {
        '0-2': 'Kalça displazisi testleri zorunlu',
        '2-6': 'Yürüyüş ve postür değerlendirmesi',
        '6-18': 'Spor yaralanması testleri'
      }
    }
  ],
  normalFindings: {
    inspection: [
      'Simetrik ekstremiteler',
      'Normal postür',
      'Deformite yok',
      'Şişlik yok',
      'Normal yürüyüş'
    ],
    palpation: [
      'Hassasiyet yok',
      'Normal kemik yapı',
      'Kas tonusu normal',
      'Sıcaklık normal'
    ],
    range_of_motion: [
      'Tam hareket genişliği',
      'Ağrısız hareket',
      'Stabilite normal'
    ],
    special_tests: [
      'Ortolani/Barlow (-)',
      'Galeazzi normal',
      'Skolyoz yok'
    ]
  },
  abnormalFindings: {
    inspection: [
      'Asimetri',
      'Postür bozukluğu',
      'Deformite',
      'Şişlik/ödem',
      'Anormal yürüyüş'
    ],
    palpation: [
      'Hassasiyet (+)',
      'Kemik irregülaritesi',
      'Kas spazmı',
      'Sıcaklık artışı'
    ],
    range_of_motion: [
      'Hareket kısıtlılığı',
      'Ağrılı hareket',
      'İnstabilite'
    ],
    special_tests: [
      'Ortolani/Barlow (+)',
      'Bacak boy farkı',
      'Skolyoz (+)'
    ]
  },
  redFlags: [
    'Akut kırık bulguları',
    'Nörovasküler kompromizasyon',
    'Enfeksiyon bulguları',
    'Malignite şüphesi',
    'Ciddi deformite',
    'Kompartman sendromu'
  ],
  clinicalPearls: [
    'Kalça displazisi taraması kritik',
    'Çocuklarda kırıklar hızlı iyileşir',
    'Büyüme plağı yaralanmaları önemli',
    'Skolyoz adolesan dönemde artar',
    'Spor yaralanmaları artan oranda'
  ]
};

export const dermatologicalExamination: SystemExamination = {
  id: 'derma',
  name: 'Dermatolojik Sistem',
  icon: '😊',
  description: 'Pediatrik cilt ve mukoza muayenesi',
  techniques: [
    {
      id: 'inspection',
      name: 'İnspeksiyon',
      description: 'Cilt ve eklerinin görsel değerlendirmesi',
      steps: [
        'Genel cilt görünümü',
        'Pigmentasyon değerlendirmesi',
        'Lezyonların tanımlanması',
        'Saç ve tırnak muayenesi',
        'Mukoza değerlendirmesi'
      ],
      ageSpecific: {
        '0-2': 'Doğum lekeleri, diaper dermatiti',
        '2-6': 'Atopik dermatit, viral eksantemler',
        '6-18': 'Akne, puberte değişiklikleri'
      }
    },
    {
      id: 'palpation',
      name: 'Palpasyon',
      description: 'Cilt dokusunun dokunma ile değerlendirmesi',
      steps: [
        'Cilt elastisitesi',
        'Nem durumu',
        'Sıcaklık değerlendirmesi',
        'Lezyon sertliği',
        'Hassasiyet kontrolü'
      ],
      ageSpecific: {
        '0-2': 'Nazik dokunma, dehidratasyon işaretleri',
        '2-6': 'Oyun haline getirerek muayene',
        '6-18': 'Sistemik muayene'
      }
    },
    {
      id: 'dermoscopy',
      name: 'Dermatoskopi',
      description: 'Lezyonların detaylı incelenmesi',
      steps: [
        'Lezyon sınırları',
        'Pigment dağılımı',
        'Vasküler patern',
        'Yüzey karakteristikleri'
      ],
      ageSpecific: {
        '0-2': 'Doğumsal lezyonlar',
        '2-6': 'Melanositik nevuslar',
        '6-18': 'Şüpheli lezyonlar'
      }
    }
  ],
  normalFindings: {
    inspection: [
      'Normal pigmentasyon',
      'Lezyon yok',
      'Saç normal',
      'Tırnak normal',
      'Mukoza normal'
    ],
    palpation: [
      'Normal elastisite',
      'Nem normal',
      'Sıcaklık normal',
      'Hassasiyet yok'
    ],
    dermoscopy: [
      'Düzenli pigmentasyon',
      'Normal vaskülarite',
      'Düz yüzey'
    ]
  },
  abnormalFindings: {
    inspection: [
      'Pigmentasyon bozuklukları',
      'Çeşitli lezyonlar',
      'Saç kaybı',
      'Tırnak değişiklikleri',
      'Mukoza lezyonları'
    ],
    palpation: [
      'Azalmış elastisite',
      'Kuruluğa/yaşlık',
      'Sıcaklık değişimi',
      'Hassasiyet'
    ],
    dermoscopy: [
      'İrregüler pigmentasyon',
      'Anormal vaskülarite',
      'Yüzey değişiklikleri'
    ]
  },
  redFlags: [
    'Malignite şüpheli lezyon',
    'Yaygın purpura',
    'Ciddi enfeksiyon bulguları',
    'Stevens-Johnson sendromu',
    'Ciddi alerjik reaksiyonlar',
    'Çoklu organ tutulumu'
  ],
  clinicalPearls: [
    'Çocuklarda viral eksantemler sık',
    'Atopik dermatit yaygın',
    'Melanom çocuklarda nadir',
    'Diaper dermatiti önlenebilir',
    'Güneş korunması önemli'
  ]
};

export const systemExaminations: SystemExamination[] = [
  respiratoryExamination,
  cardiovascularExamination,
  gastrointestinalExamination,
  genitourinaryExamination,
  neurologicalExamination,
  musculoskeletalExamination,
  dermatologicalExamination
];

export const getSystemExaminationById = (id: string): SystemExamination | undefined => {
  return systemExaminations.find(exam => exam.id === id);
}; 