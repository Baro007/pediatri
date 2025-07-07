import React from 'react';
import { Link } from 'react-router-dom';
import { DoseCalculator } from '../components/medical/DoseCalculator';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const HomePage: React.FC = () => {
  const quickAccessItems = [
    {
      title: '👶 Gelişim Takibi',
      description: 'Yaşa özel gelişim basamaklarını ve "kırmızı bayrakları" interaktif olarak inceleyin.',
      link: '/development',
      color: 'hover:shadow-lg hover:-translate-y-1'
    },
    {
      title: '🚨 Sık Senaryolar',
      description: 'Ateş, öksürük ve topallama gibi sık karşılaşılan durumlara yönelik yaklaşımları öğrenin.',
      link: '/scenarios',
      color: 'hover:shadow-lg hover:-translate-y-1'
    },
    {
      title: '📊 Hızlı Başvuru',
      description: 'Vital bulgular, döküntü karşılaştırmaları ve dehidratasyon tablolarına anında erişin.',
      link: '/quick-reference',
      color: 'hover:shadow-lg hover:-translate-y-1'
    },
    {
      title: '🫁 Sistem Muayenesi',
      description: 'Tüm sistemlere göre pediatrik muayene tekniklerini ve bulgularını inceleyin.',
      link: '/systems',
      color: 'hover:shadow-lg hover:-translate-y-1'
    },
    {
      title: '🩺 Değerlendirme Esasları',
      description: 'Pediatrik hasta değerlendirmesinin temel prensiplerini öğrenin.',
      link: '/assessment',
      color: 'hover:shadow-lg hover:-translate-y-1'
    },
    {
      title: '📚 Kaynaklar',
      description: 'Güncel pediatri rehberleri ve referans materyallerine erişin.',
      link: '/references',
      color: 'hover:shadow-lg hover:-translate-y-1'
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Pediatrik Klinik Asistanı
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Bu interaktif rehber, klinik pratiğinizi desteklemek için tasarlanmıştır. 
          Aşağıdaki doz hesaplayıcıyı kullanabilir veya hızlı erişim kartlarından 
          spesifik konulara anında erişebilirsiniz.
        </p>
      </div>

      {/* Dose Calculator */}
      <DoseCalculator className="mb-8" />

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card hover className={`h-full ${item.color} transition-all duration-300 cursor-pointer`}>
                <CardHeader>
                  <CardTitle className="text-teal-700">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-teal-50 rounded-xl p-8 border border-teal-100">
        <h2 className="text-2xl font-bold text-teal-800 mb-4">
          Uygulama Özellikleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">💊</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-teal-800 mb-1">Doz Hesaplayıcı</h3>
              <p className="text-teal-700 text-sm">
                Ağırlığa göre otomatik ilaç dozu hesaplama ve ml cinsinden konversiyon
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">📊</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-teal-800 mb-1">İnteraktif Grafikler</h3>
              <p className="text-teal-700 text-sm">
                Yaşa göre vital bulgular ve gelişim tabloları ile görsel analiz
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🚨</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-teal-800 mb-1">Kırmızı Bayraklar</h3>
              <p className="text-teal-700 text-sm">
                Acil durumları tanımak için kritik uyarı işaretleri ve alarm bulguları
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">📱</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-teal-800 mb-1">Mobil Uyumlu</h3>
              <p className="text-teal-700 text-sm">
                Tüm cihazlarda kullanılabilir, offline çalışma desteği ile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Support */}
      <div className="text-center py-6 border-t border-slate-200">
        <p className="text-slate-500 mb-2">
          Bu araç eğitim amaçlıdır ve tıbbi kararlarınızda yalnızca destekleyici bir rehber olarak kullanılmalıdır.
        </p>
        <p className="text-sm text-slate-400">
          Versiyon 1.0.0 - Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
      </div>
    </div>
  );
};

export default HomePage; 