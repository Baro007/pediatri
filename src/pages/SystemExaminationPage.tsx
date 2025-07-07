import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RedFlag, ClinicalPearl } from '../components/ui/MedicalAlert';
import { systemExaminations, getSystemExaminationById } from '../data/systemExaminations';

const SystemExaminationPage: React.FC = () => {
  const { systemId } = useParams<{ systemId?: string }>();

  if (!systemId) {
    return <SystemExaminationList />;
  }

  const examination = getSystemExaminationById(systemId);
  if (!examination) {
    return <SystemNotFound />;
  }

  return <SystemExaminationDetail examination={examination} />;
};

const SystemExaminationList: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🩺 Sistem Muayenesi Rehberi
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Çocuklarda sistem muayenesi yapmak bir sanat! Her yaşa özel ipuçları ve pratik yaklaşımlarla
          etkili muayene yapmayı öğrenin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {systemExaminations.map((system) => (
          <Link key={system.id} to={`/systems/${system.id}`} className="group">
            <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-blue-300">
              <div className="text-center p-6">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {system.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {system.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {system.description}
                </p>
                <div className="flex justify-center items-center gap-2 text-sm text-blue-600 font-medium">
                  <span>📋</span>
                  <span>{system.techniques.length} pratik teknik</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <span>🎯</span> Muayene Sırası
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-blue-900">Göz ile Bakma (İnspeksiyon)</h3>
                <p className="text-blue-800 text-sm">Uzaktan gözlemle - dokunmadan çok şey öğrenin!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-blue-900">Dokunma (Palpasyon)</h3>
                <p className="text-blue-800 text-sm">Nazikçe hissederek değerlendirin</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-blue-900">Vurma (Perküsyon)</h3>
                <p className="text-blue-800 text-sm">Hafif vurarak içerideki yapıları anlayın</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-blue-900">Dinleme (Oskültasyon)</h3>
                <p className="text-blue-800 text-sm">Stetoskopla dikkatli dinleyin</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
            <span>👶</span> Yaşa Göre Yaklaşım
          </h2>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-70 rounded-lg p-4">
              <h3 className="font-bold text-green-900 mb-2">👶 0-2 yaş (Bebek)</h3>
              <p className="text-green-800 text-sm">Sakin ortam, anne kucağında, nazik muayene. Ağlamamasına dikkat!</p>
            </div>
            <div className="bg-white bg-opacity-70 rounded-lg p-4">
              <h3 className="font-bold text-green-900 mb-2">🧒 2-6 yaş (Küçük Çocuk)</h3>
              <p className="text-green-800 text-sm">Oyun haline getirin, kooperasyon sağlayın. "Doktor oyunu" yapın!</p>
            </div>
            <div className="bg-white bg-opacity-70 rounded-lg p-4">
              <h3 className="font-bold text-green-900 mb-2">👦 6-18 yaş (Büyük Çocuk)</h3>
              <p className="text-green-800 text-sm">Açıklama yapın, mahremiyet, sistematik muayene yapın.</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-100 border-purple-200">
        <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
          <span>💡</span> En Önemli Püf Noktaları
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-purple-800 flex items-start gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>Çocuğu korkutmayın - önce oyuncakla gösterin</span>
            </p>
            <p className="text-purple-800 flex items-start gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>Ağlıyor mu? Önce sakinleştirin, sonra muayene edin</span>
            </p>
            <p className="text-purple-800 flex items-start gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>Ebeveynin endişelerini ciddiye alın</span>
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-purple-800 flex items-start gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>Normal bulgular yaşa göre değişir - tablolara bakın</span>
            </p>
            <p className="text-purple-800 flex items-start gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>İlk bakışınız çok önemli - genel görünüm kaydın</span>
            </p>
            <p className="text-purple-800 flex items-start gap-2">
              <span className="text-yellow-500">⭐</span>
              <span>Şüpheli bulgu? Karşı tarafla karşılaştırın</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const SystemExaminationDetail: React.FC<{ examination: any }> = ({ examination }) => {
  const [selectedTechnique, setSelectedTechnique] = useState(examination.techniques[0]);
  const [activeTab, setActiveTab] = useState<'normal' | 'abnormal'>('normal');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8">
        <div className="flex items-center mb-4">
          <Link to="/systems" className="bg-white text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg font-medium mr-6 transition-colors">
            ← Ana Sayfaya Dön
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{examination.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{examination.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{examination.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2 space-y-6">
          {/* Teknik Seçimi */}
          <Card className="bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>🔧</span> Muayene Teknikleri
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {examination.techniques.map((technique: any) => (
                <Button
                  key={technique.id}
                  variant={selectedTechnique.id === technique.id ? 'primary' : 'outline'}
                  onClick={() => setSelectedTechnique(technique)}
                  className="p-4 h-auto flex flex-col items-center gap-2 text-center"
                >
                  <span className="text-2xl">
                    {technique.id === 'inspection' && '👁️'}
                    {technique.id === 'palpation' && '✋'}
                    {technique.id === 'percussion' && '👊'}
                    {technique.id === 'auscultation' && '🩺'}
                  </span>
                  <span className="text-sm font-medium">{technique.name}</span>
                </Button>
              ))}
            </div>

            {/* Seçili Teknik */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">
                  {selectedTechnique.id === 'inspection' && '👁️'}
                  {selectedTechnique.id === 'palpation' && '✋'}
                  {selectedTechnique.id === 'percussion' && '👊'}
                  {selectedTechnique.id === 'auscultation' && '🩺'}
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{selectedTechnique.name}</h3>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed bg-white bg-opacity-70 p-4 rounded-lg">
                {selectedTechnique.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-5">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📋</span> Adım Adım Ne Yapacaksınız?
                  </h4>
                  <ol className="space-y-3">
                    {selectedTechnique.steps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white rounded-lg p-5">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>👶</span> Yaşa Göre Özel İpuçları
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(selectedTechnique.ageSpecific).map(([ageRange, description]) => (
                      <div key={ageRange} className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50 rounded-r-lg">
                        <div className="font-semibold text-blue-900 text-sm mb-1">
                          {ageRange === '0-2' && '👶 0-2 yaş (Bebek)'}
                          {ageRange === '2-6' && '🧒 2-6 yaş (Küçük Çocuk)'}
                          {ageRange === '6-18' && '👦 6-18 yaş (Büyük Çocuk/Ergen)'}
                        </div>
                        <div className="text-blue-800 text-sm leading-relaxed">{String(description)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Normal vs Anormal Bulgular */}
          <Card className="bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>📊</span> Bulgu Değerlendirmesi
              </h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('normal')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'normal'
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ✅ Normal Bulgular
                </button>
                <button
                  onClick={() => setActiveTab('abnormal')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'abnormal'
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ⚠️ Anormal Bulgular
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(
                activeTab === 'normal' ? examination.normalFindings : examination.abnormalFindings
              ).map(([category, findings]) => (
                <div key={category} className={`rounded-lg p-4 ${
                  activeTab === 'normal' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <h3 className={`font-bold mb-3 text-center ${
                    activeTab === 'normal' ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {category === 'inspection' && '👁️ Göz ile Bakma'}
                    {category === 'palpation' && '✋ Dokunma'}
                    {category === 'percussion' && '👊 Vurma'}
                    {category === 'auscultation' && '🩺 Dinleme'}
                  </h3>
                  <ul className="space-y-2">
                    {(findings as string[]).map((finding: string, index: number) => (
                      <li key={index} className={`text-sm flex items-start gap-2 ${
                        activeTab === 'normal' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        <span className={`mt-0.5 ${
                          activeTab === 'normal' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {activeTab === 'normal' ? '✓' : '✗'}
                        </span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Yan Panel */}
        <div className="space-y-6">
          {/* Red Flags */}
          <Card className="bg-red-50 border-red-200">
            <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <span>🚨</span> ACİL DURUMLAR!
            </h2>
            <div className="space-y-3">
              {examination.redFlags.map((flag: string, index: number) => (
                <RedFlag key={index} message={flag} />
              ))}
            </div>
          </Card>

          {/* Clinical Pearls */}
          <Card className="bg-blue-50 border-blue-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span>💎</span> Değerli İpuçları
            </h2>
            <div className="space-y-3">
              {examination.clinicalPearls.map((pearl: string, index: number) => (
                <ClinicalPearl key={index} message={pearl} />
              ))}
            </div>
          </Card>

          {/* Hızlı Referans */}
          <Card className="bg-yellow-50 border-yellow-200">
            <h2 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
              <span>⚡</span> Hızlı Hatırlatma
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-white bg-opacity-70 rounded p-3">
                <h3 className="font-semibold text-yellow-900 mb-1">🏃‍♂️ Hızlı Kontrol:</h3>
                <p className="text-yellow-800">Görme → Dokunma → Vurma → Dinleme sırası</p>
              </div>
              <div className="bg-white bg-opacity-70 rounded p-3">
                <h3 className="font-semibold text-yellow-900 mb-1">👶 Çocuk Dostluğu:</h3>
                <p className="text-yellow-800">Oyun yap, açıkla, korkutma, sabırlı ol</p>
              </div>
              <div className="bg-white bg-opacity-70 rounded p-3">
                <h3 className="font-semibold text-yellow-900 mb-1">🎯 Anahtar:</h3>
                <p className="text-yellow-800">Her iki tarafı karşılaştır, normal varyasyonları bil</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SystemNotFound: React.FC = () => (
  <div className="fade-in text-center py-12">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">
      Sistem Bulunamadı
    </h1>
    <p className="text-slate-600 mb-6">
      Aradığınız sistem muayenesi mevcut değil.
    </p>
    <Link to="/systems">
      <Button variant="primary">
        Sistem Listesine Dön
      </Button>
    </Link>
  </div>
);

export default SystemExaminationPage; 