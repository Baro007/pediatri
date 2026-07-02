# 🩺 Pediatrik Klinik Asistanı & Semiyoloji Rehberi

> Hekimler, asistanlar ve tıp öğrencileri için pediatri rotasyonlarında ve acil nöbetlerinde kullanılmak üzere tasarlanmış kapsamlı, interaktif ve kanıta dayalı klinik karar destek aracı.

[![Live App](https://img.shields.io/badge/Live-Uygulama-teal.svg?style=for-the-badge)](https://pediatri.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue.svg?style=for-the-badge)](https://github.com/Baro007/pediatri)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 👨‍⚕️ Geliştirici ve Proje Hakkında

Bu proje, **Dr. Sadık Barış Adıgüzel** (Antalya Eğitim ve Araştırma Hastanesi, Aile Hekimliği Asistanı) tarafından, pediatri klinik rotasyonu esnasında edinilen teorik ve pratik bilgileri pekiştirmek ve nöbetlerde hızlı klinik karar vermeyi desteklemek amacıyla geliştirilmiştir. 

Projenin temel amacı; tüm hekim meslektaşların, asistanların ve tıp öğrencilerinin acilde ya da poliklinikte pediatrik hastaları değerlendirirken kılavuzlara ve hesaplama araçlarına saniyeler içinde ulaşabilmesini sağlamaktır. Proje **tamamen açık kaynak kodlu** olup meslektaşların katkılarına açıktır.

* **Web Sitesi:** [dr.sadikbarisadiguzel.com](https://dr.sadikbarisadiguzel.com/)
* **LinkedIn:** [linkedin.com/in/sadikbarisadiguzel](https://linkedin.com/in/sadikbarisadiguzel)

---

## ✨ Temel Özellikler

### 1. ⚙️ İnteraktif Doz Hesaplayıcı
* **Geniş İlaç Veritabanı:** Parasetamol ve Ibuprofen'den başlayarak poliklinik ve acillerin vazgeçilmezleri olan *Salbutamol (şurup & nebül), Deksametazon (Krup steroidi), Oral Rehidratasyon Sıvısı (ORS), Ondansetron (antiemetik)* ve yaygın pediatrik antibiyotiklerin (Amoksisilin-Klavulanat, Sefuroksim vb.) pediatrik dozlarını hesaplar.
* **Akıllı Formül Desteği:** İlacın cinsine göre mg/kg/doz, mg/kg/gün veya statik (Budesonid 2mg, Vitamin D 1 damla gibi) bazda dozajlama yaparak ml ve ölçek cinsinden tam sonuç verir.
* **Zustand Persistence:** Girilen hasta kilosu ve hesaplama sonuçları tarayıcı belleğinde kalıcı olarak saklanır, sayfalar arası geçişlerde veri kaybı yaşanmaz.

### 2. 🫁 Sistem Muayeneleri Kılavuzu
* Solunum, Kardiyovasküler, Gastrointestinal, Genitoüriner, Nörolojik, Kas-İskelet ve Dermatolojik muayenelerin pediatrik hastalardaki spesifik uygulama adımları ve yorumlama kılavuzları.
* Yaş gruplarına göre normal değerler ve patolojik bulgu ipuçları.

### 3. 👶 Gelişim Takibi & Milestone İzlemi
* WHO ve pediatri standartlarına uygun olarak 3. aydan 5. yaşa kadar motor, dil, bilişsel ve sosyal gelişim basamakları.
* Hekimin gelişim basamaklarını işaretleyebileceği kalıcı (Zustand/LocalStorage) kontrol listeleri.
* Tek tıkla yeni hasta muayenesine başlamak için **"Muayeneyi Sıfırla"** özelliği.

### 4. 🏥 Klinik Senaryolar & Karar Algoritmaları
* Ateş, Öksürük, Topallama, Nöbet gibi acil durumlara sistematik yaklaşım basamakları.
* **İnteraktif Karın Ağrısı Tanı Aracı:** Yaş gruplarına özel (Bebek, Okul Öncesi, Okul Çağı, Adolesan) ayırıcı tanılar ve *McBurney, Rovsing, Psoas, Obturator, Rebound (Blumberg) ve Dance Sign* muayene tekniklerinin adım adım uygulanış rehberi.
* **Döküntü Dağılım Haritası:** Yüz, Gövde, El-Ayak Palmerleri vb. vücut bölgelerine göre döküntüleri süzebilen interaktif modül ve Kızamık, Kızıl, Suçiçeği gibi döküntülü hastalıkların ayırıcı ipuçları.

---

## 💻 Teknolojik Altyapı

* **Framework:** React 19 + TypeScript (Strict Mode)
* **Build Tool:** Vite
* **Styling:** TailwindCSS 3
* **State Management:** Zustand + LocalStorage Persistence
* **Build / Deploy:** Netlify

---

## 🚀 Yerel Kurulum

Projeyi kendi bilgisayarınızda çalıştırmak veya geliştirmek için aşağıdaki adımları takip edebilirsiniz:

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/Baro007/pediatri.git
   cd pediatri
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
   Uygulama tarayıcınızda otomatik olarak `http://localhost:3000` adresinde açılacaktır.

4. **Derleme Kontrolleri:**
   ```bash
   npm run type-check   # TypeScript kontrolü
   npm run build        # Production derlemesi
   ```

---

## 🤝 Katkıda Bulunma (Open Source Contribution)

Uygulamanın klinik içeriğini zenginleştirmek veya kod tabanını geliştirmek için katkılarınızı memnuniyetle bekliyoruz!

1. Bu depoyu fork edin.
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/yeni-ozellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'Eklendi: [Özellik Açıklaması]'`).
4. Dalınızı push edin (`git push origin feature/yeni-ozellik`).
5. Bir Pull Request oluşturun.

---

## ⚠️ Önemli Tıbbi Uyarı (Medical Disclaimer)

Bu uygulama hekimlerin klinik pratiklerine destek olmak ve tıp eğitimi amacıyla geliştirilmiş bir klinik karar destek aracıdır. **Uygulamada yer alan hesaplamalar, dozlar ve algoritmalar yalnızca rehber niteliğindedir. Tedavi uygulayan hekimin klinik kararı ve sorumluluğu esastır.** İlaç dozları uygulanmadan önce güncel ulusal pediatri kılavuzları ve prospektüs bilgileri ile doğrulanmalıdır.

---

<p align="center">
  Antalya Eğitim ve Araştırma Hastanesi - Aile Hekimliği Kliniği bünyesinde ❤️ ve özenle geliştirilmiştir.
</p>
