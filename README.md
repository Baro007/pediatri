https://pediatri.netlify.app/ (Live Web App)

# 🩺 Pediatrik Semiyoloji Rehberi

> Pediatrik semiyoloji için kapsamlı, kanıta dayalı rehber uygulaması

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/pediatri-rehber/web-app)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.14-646CFF.svg)](https://vitejs.dev/)

## 📋 İçerik

- [Özellikler](#-özellikler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Geliştirme](#-geliştirme)
- [Deployment](#-deployment)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

### 🎯 Klinik Araçlar
- **Klinik Senaryolar**: Yaş gruplarına özel vaka analizleri
- **Sistem Muayeneleri**: Detaylı fizik muayene rehberleri
- **Doz Hesaplayıcısı**: Pediatrik doz hesaplama araçları
- **Vital Signs**: Yaş gruplarına göre normal değerler

### 📊 Gelişim Takibi
- **Milestone Tracking**: Gelişim basamakları izlemi
- **Büyüme Eğrileri**: Percentile hesaplamaları
- **Davranış Değerlendirmesi**: ADHD, OSB screening araçları
- **Beslenme Rehberi**: FTT değerlendirmesi ve kalori hesaplama

### 🔍 Tanı Destekleri
- **Diferansiyel Tanı**: Yaş gruplarına özel ayırıcı tanı
- **Red Flag Uyarıları**: Kritik bulguların tanınması
- **Clinical Pearls**: Praktik ipuçları ve püf noktaları
- **Döküntü Haritası**: Anatomik bölgelere göre tanı rehberi

### 💻 Teknik Özellikler
- **PWA Desteği**: Offline çalışabilir, yüklenebilir
- **Responsive Design**: Mobil, tablet ve desktop uyumlu
- **Code Splitting**: Hızlı yükleme ve performans
- **Error Handling**: Kapsamlı hata yönetimi
- **Accessibility**: Erişilebilirlik standartları

## 🚀 Kurulum

### Gereksinimler
- Node.js 18.0.0 veya üzeri
- npm 9.0.0 veya üzeri

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/pediatri-rehber/web-app.git
   cd pediatri-app
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Environment dosyasını oluşturun**
   ```bash
   cp .env.example .env
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

5. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📖 Kullanım

### Ana Bölümler

#### 🏠 Ana Sayfa
- Hızlı erişim widget'ları
- Son güncellemeler
- Sık kullanılan araçlar

#### 🎯 Klinik Senaryolar
- Ateş değerlendirmesi
- Karın ağrısı tanısı
- Döküntü değerlendirmesi
- Başağrısı ayırıcı tanısı
- Nöbet yönetimi

#### 📏 Gelişim Takibi
- Yaş gruplarına özel milestone'lar
- Büyüme percentile hesaplamaları
- Davranış screening araçları
- Beslenme değerlendirmesi

#### 🔬 Sistem Muayeneleri
- Kardiyovasküler sistem
- Solunum sistemi
- Gastrointestinal sistem
- Nörolojik sistem
- Genitüriner sistem
- Kas-iskelet sistemi

#### ⚡ Hızlı Referans
- Doz hesaplayıcısı
- Vital signs tablosu
- Acil durum algoritmaları
- İlaç dozları

## 🛠 Geliştirme

### Teknoloji Stack
- **Frontend**: React 19.1.0, TypeScript 5.8.3
- **Build Tool**: Vite 4.5.14
- **Styling**: TailwindCSS 3.4.17
- **State Management**: Zustand 5.0.6
- **Routing**: React Router 6.30.1
- **Charts**: Chart.js 4.5.0
- **UI Components**: Headless UI 2.2.4

### Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build önizlemesi
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

### Proje Yapısı

```
src/
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   ├── medical/        # Medical-specific components
│   └── layout/         # Layout components
├── pages/              # Page components
├── data/               # Medical data and scenarios
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── services/           # API services
```

### Kod Kalitesi

- **TypeScript**: Strict mode etkin
- **ESLint**: Kod kalitesi kontrolü
- **Prettier**: Kod formatlama
- **Error Boundary**: Hata yakalama
- **Accessibility**: WCAG 2.1 AA uyumlu

## 🌍 Deployment

### Vercel Deployment

1. **Vercel CLI yükleyin**
   ```bash
   npm i -g vercel
   ```

2. **Deploy edin**
   ```bash
   vercel --prod
   ```

### Netlify Deployment

1. **Build edin**
   ```bash
   npm run build
   ```

2. **Netlify'a yükleyin**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Environment Variables

Production için gerekli environment variables:

```bash
VITE_APP_NAME=Pediatrik Semiyoloji Rehberi
VITE_APP_VERSION=1.0.0
VITE_APP_URL=https://pediatri-rehber.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SERVICE_WORKER=true
```

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizasyonlar
- Code splitting ve lazy loading
- Tree shaking
- Bundle analizi
- Image optimization
- Service worker caching

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen katkıda bulunmadan önce:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Geliştirme Kuralları
- TypeScript kullanın
- ESLint kurallarına uyun
- Testler yazın
- Accessibility standartlarına uyun
- Mobile-first yaklaşım

## 📝 Changelog

### v1.0.0 (2024-01-XX)
- ✨ İlk release
- 🎯 Klinik senaryolar sistemi
- 📊 Gelişim takibi araçları
- 🔧 Doz hesaplayıcısı
- 📱 PWA desteği
- ♿ Accessibility iyileştirmeleri

## 🐛 Bilinen Sorunlar

Şu anda bilinen bir sorun bulunmamaktadır. Sorun bulduğunuzda lütfen [issue açın](https://github.com/pediatri-rehber/web-app/issues).

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## 👥 Ekip

- **Lead Developer**: [İsim](https://github.com/username)
- **Medical Consultant**: [İsim](https://github.com/username)
- **UI/UX Designer**: [İsim](https://github.com/username)

## 🙏 Teşekkürler

Bu proje aşağıdaki kaynaklar ve katkıcılar sayesinde geliştirilmiştir:

- Türk Pediatri Derneği rehberleri
- WHO çocuk gelişimi standartları
- AAP (American Academy of Pediatrics) guidelines
- Açık kaynak topluluğu

---

<p align="center">
  Türkiye'deki pediatri eğitimi ve pratiği için ❤️ ile geliştirilmiştir
</p>
