import { MilestoneData, AgeGroup } from '../types/medical';

export const milestoneData: Record<AgeGroup, MilestoneData> = {
  '3m': {
    title: '3 Aylık Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Başını dik tutar ve kontrol eder',
      'Nesnelere uzanır, ellerini birleştirir',
      'Agu-gugu gibi sesler çıkarır, sosyal gülümseme yapar',
      'Annesini tanır, hareketli nesneleri gözle takip eder'
    ],
    redFlags: [
      'Başını dik tutamaz',
      'Sosyal gülümseme yapmaz',
      'Hareketli nesneleri gözle takip etmez',
      'Seslere tepki vermez'
    ],
    tips: [
      '💡 Bebekle göz teması kurun ve konuşun',
      '💡 Renkli objeler göstererek takip ettirin',
      '💡 Müzik çalın ve şarkı söyleyin',
      '💡 Karın üstü oyun zamanı verin (supervision altında)'
    ]
  },
  '6m': {
    title: '6 Aylık Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Desteksiz oturur, yuvarlanır',
      'Eline verilen nesneyi tutar, bir elinden diğerine geçirir',
      'Babıldama (ba-ba, de-de) yapar, seslere dönüp bakar',
      'İnsanlara sevgi gösterir, basit oyunlara katılır'
    ],
    redFlags: [
      'Desteksiz oturamaz',
      'Babıldama yapmaz',
      'Sosyal etkileşim kurmaz',
      'Nesneleri kavrayamaz'
    ],
    tips: [
      '💡 Güvenli oturma alanı hazırlayın',
      '💡 El-göz koordinasyonu için farklı dokular sunun',
      '💡 Bebek babıldamasına karşılık verin',
      '💡 "Kukuli-uu" oyunu oynayın'
    ]
  },
  '9m': {
    title: '9 Aylık Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Destekle ayakta durur, emekleme pozisyonuna geçer',
      'Nesneleri işaret parmağıyla gösterir, pincer kavrama',
      'İsmiyle seslenince bakar, basit komutları anlar',
      '"Ce-e" gibi karşılıklı oyunlar oynar, nesne sürekliği'
    ],
    redFlags: [
      'Destekle ayakta duramaz',
      'İsmiyle seslenince bakmaz',
      'Karşılıklı oyun oynamaz',
      'İşaret parmağını kullanmaz'
    ],
    tips: [
      '💡 Güvenli emekleme alanı oluşturun',
      '💡 Nesne saklama oyunları oynayın',
      '💡 Sık sık ismini söyleyin',
      '💡 Küçük nesneler (güvenli) vererek pincer kavramayı destekleyin'
    ]
  },
  '12m': {
    title: '12 Aylık (1 Yaş) Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Tutunarak ayakta durur, ilk adımlar',
      'İşaret ve başparmağıyla küçük nesneleri alır',
      '"Anne", "baba" gibi anlamlı kelimeler söyler',
      'Saklanan nesneyi arar, basit taklit yapar'
    ],
    redFlags: [
      'Bağımsız ayakta duramaz',
      'Anlamlı kelime söylemez',
      'İşaret etmez veya taklit yapmaz',
      'Nesne permanensiyesi gelişmemiş'
    ],
    tips: [
      '💡 Güvenli yürüme alanı hazırlayın',
      '💡 Kelime tekrarları yapın ve tepki verin',
      '💡 Basit el hareketlerini öğretin (el sallama)',
      '💡 Kitap okuyun ve resimler gösterin'
    ]
  },
  '18m': {
    title: '18 Aylık Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Bağımsız yürür, koşmaya başlar',
      'Kaşık tutar, karalama yapar, sayfa çevirir',
      'En az 6-10 kelime söyler, basit komutları uygular',
      'Başkalarını taklit eder, sembolik oyun başlar'
    ],
    redFlags: [
      'Bağımsız yürüyemez',
      'En az 6 kelime söylemez',
      'Sembolik oyun oynamaz',
      'Basit komutları anlamaz'
    ],
    tips: [
      '💡 Aktif oyun ve hareket fırsatları verin',
      '💡 Kelime dağarcığını günlük aktivitelerle artırın',
      '💡 "Mış gibi" oyunlar başlatın',
      '💡 Basit kitapları birlikte "okuyun"'
    ]
  },
  '2y': {
    title: '2 Yaş Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Koşar, zıplar, merdiven çıkar',
      '4-6 küple kule yapar, kalem tutar',
      'İki kelimelik cümleler kurar, 50+ kelime',
      'Paralel oyun oynar, bağımsızlık isteği'
    ],
    redFlags: [
      'Koşamaz veya sık düşer',
      'İki kelimelik cümleler kuramaz',
      'Sembolik oyun gelişmemiş',
      'Aşırı bağımlı davranışlar'
    ],
    tips: [
      '💡 Fiziksel aktiviteleri teşvik edin',
      '💡 Günlük rutinleri kelimelerle açıklayın',
      '💡 Oyun arkadaşı bulmasını destekleyin',
      '💡 Seçenekler sunarak karar vermesini sağlayın'
    ]
  },
  '3y': {
    title: '3 Yaş Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Üç tekerlekli bisiklet sürer, tek ayak üstünde durur',
      'Daire çizer, basit yapbozları yapar',
      'Konuşması anlaşılır, basit hikayeler anlatır',
      'Diğer çocuklarla oynar, paylaşım yapar'
    ],
    redFlags: [
      'Pedal çeviremez veya denge kuramaz',
      'Konuşması çoğunlukla anlaşılmaz',
      'Göz teması kurmaz',
      'Yaş arkadaşlarıyla oyun oynamaz'
    ],
    tips: [
      '💡 Denge ve koordinasyon oyunları yapın',
      '💡 Hikaye okuyun ve sorular sorun',
      '💡 Sosyal oyun gruplarına katılım sağlayın',
      '💡 Yaratıcı sanat aktiviteleri planlayın'
    ]
  },
  '4y': {
    title: '4 Yaş Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'Tek ayak üzerinde 4-5 saniye durur, topu yakalar',
      'İnsan resmi çizer, makas kullanır',
      'Hikaye anlatır, "neden" sorularını sorar',
      'Hayali oyunlar oynar, kurallı oyunları öğrenir'
    ],
    redFlags: [
      'Tek ayak üzerinde duramaz',
      'Makas kullanamaz',
      'Hikaye anlatamaz',
      'Hayali oyun oynamaz'
    ],
    tips: [
      '💡 Spor aktivitelerine başlayın',
      '💡 Merak duygusunu destekleyin ve sorularını yanıtlayın',
      '💡 Hayali oyunlara katılın',
      '💡 Basit kuralları öğretin ve uygulayın'
    ]
  },
  '5y': {
    title: '5 Yaş Gelişim Basamakları',
    categories: ['Motor Gelişim', 'Dil Gelişimi', 'Sosyal Gelişim', 'Kognitif Gelişim'],
    milestones: [
      'İp atlar, takla atar, bisiklet sürer',
      'Adını yazar, üçgen çizer',
      'Gelecek zamanı kullanır, adresini söyler',
      'Gerçek ile hayali ayırt eder, işbirliği yapar'
    ],
    redFlags: [
      'İp atlayamaz',
      'Adını yazamaz',
      'Okul öncesi becerileri eksik',
      'Arkadaşlarıyla işbirliği yapmaz'
    ],
    tips: [
      '💡 Okul öncesi hazırlık aktiviteleri yapın',
      '💡 Yazma becerileri için çizim çalışmaları',
      '💡 Sorumluluk verip özgüven geliştirin',
      '💡 Takım oyunları ve grup aktiviteleri'
    ]
  }
}; 