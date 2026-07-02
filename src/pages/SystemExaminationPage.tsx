import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RedFlag, ClinicalPearl } from '../components/ui/MedicalAlert';
import { systemExaminations, getSystemExaminationById } from '../data/systemExaminations';
import { useMedicalStore } from '../store/medicalStore';

const getCategoryTitle = (cat: string): string => {
  const mapping: { [key: string]: string } = {
    inspection: '👁️ Göz ile Bakma (İnspeksiyon)',
    palpation: '✋ Dokunma (Palpasyon)',
    percussion: '👊 Vurma (Perküsyon)',
    auscultation: '🩺 Dinleme (Oskültasyon)',
    urinalysis: '🧪 İdrar Analizi',
    special_tests: '⚙️ Özel Testler',
    mental_status: '🧠 Mental Durum',
    cranial_nerves: '👁️ Kranial Sinirler',
    motor_system: '💪 Motor Sistem',
    reflexes: '⚡ Refleksler',
    range_of_motion: '🏃‍♂️ Hareket Açıklığı'
  };
  return mapping[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1));
};

const SystemExaminationPage: React.FC = () => {
  const { systemId } = useParams<{ systemId?: string }>();
  const { setSelectedSystemId } = useMedicalStore();

  // Sync selected system with store
  useEffect(() => {
    if (systemId) {
      setSelectedSystemId(systemId);
    } else {
      setSelectedSystemId(null);
    }
  }, [systemId, setSelectedSystemId]);

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
    <div className="space-y-8 fade-in">
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
            <Card className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 hover:border-teal-300">
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
                <div className="flex justify-center items-center gap-2 text-sm text-teal-600 font-medium">
                  <span>📋</span>
                  <span>{system.techniques.length} pratik teknik</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card className="bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-100">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
            <span>🎯</span> Muayene Sırası
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-teal-900">Göz ile Bakma (İnspeksiyon)</h3>
                <p className="text-teal-800 text-sm">Uzaktan gözlemle - dokunmadan çok şey öğrenin!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-teal-900">Dokunma (Palpasyon)</h3>
                <p className="text-teal-800 text-sm">Nazikçe hissederek değerlendirin</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-teal-900">Vurma (Perküsyon)</h3>
                <p className="text-teal-800 text-sm">Hafif vurarak içerideki yapıları anlayın</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-teal-900">Dinleme (Oskültasyon)</h3>
                <p className="text-teal-800 text-sm">Stetoskopla dikkatli dinleyin</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
            <span>👶</span> Yaşa Göre Yaklaşım
          </h2>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-70 rounded-lg p-4 border border-green-100 shadow-sm">
              <h3 className="font-bold text-green-900 mb-2">👶 0-2 yaş (Bebek)</h3>
              <p className="text-green-800 text-sm">Sakin ortam, anne kucağında, nazik muayene. Ağlamamasına dikkat!</p>
            </div>
            <div className="bg-white bg-opacity-70 rounded-lg p-4 border border-green-100 shadow-sm">
              <h3 className="font-bold text-green-900 mb-2">🧒 2-6 yaş (Küçük Çocuk)</h3>
              <p className="text-green-800 text-sm">Oyun haline getirin, kooperasyon sağlayın. "Doktor oyunu" yapın!</p>
            </div>
            <div className="bg-white bg-opacity-70 rounded-lg p-4 border border-green-100 shadow-sm">
              <h3 className="font-bold text-green-900 mb-2">👦 6-18 yaş (Büyük Çocuk)</h3>
              <p className="text-green-800 text-sm">Açıklama yapın, mahremiyet, sistematik muayene yapın.</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-100">
        <h2 className="text-2xl font-bold text-teal-950 mb-4 flex items-center gap-2">
          <span>💡</span> En Önemli Püf Noktaları
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-teal-900 flex items-start gap-2 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span>Çocuğu korkutmayın - önce oyuncakla gösterin</span>
            </p>
            <p className="text-teal-900 flex items-start gap-2 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span>Ağlıyor mu? Önce sakinleştirin, sonra muayene edin</span>
            </p>
            <p className="text-teal-900 flex items-start gap-2 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span>Ebeveynin endişelerini ciddiye alın</span>
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-teal-900 flex items-start gap-2 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span>Normal bulgular yaşa göre değişir - tablolara bakın</span>
            </p>
            <p className="text-teal-900 flex items-start gap-2 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span>İlk bakışınız çok önemli - genel görünüm kaydın</span>
            </p>
            <p className="text-teal-900 flex items-start gap-2 text-sm">
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
  const {
    selectedTechniqueId,
    setSelectedTechniqueId,
    systemActiveTab,
    setSystemActiveTab
  } = useMedicalStore();

  // Find stored technique, fallback to first if not matches
  const selectedTechnique = examination.techniques.find((t: any) => t.id === selectedTechniqueId) || examination.techniques[0];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-100 rounded-xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{examination.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{examination.name}</h1>
              <p className="text-slate-600 mt-1">{examination.description}</p>
            </div>
          </div>
          <Link to="/systems" className="bg-white hover:bg-slate-50 text-teal-600 hover:text-teal-700 px-4 py-2 rounded-lg font-medium border border-teal-200 shadow-sm transition-colors text-center md:text-left self-start">
            ← Sistem Listesine Dön
          </Link>
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
                  onClick={() => setSelectedTechniqueId(technique.id)}
                  className="p-4 h-auto flex flex-col items-center gap-2 text-center"
                >
                  <span className="text-2xl">
                    {technique.id === 'inspection' && '👁️'}
                    {technique.id === 'palpation' && '✋'}
                    {technique.id === 'percussion' && '👊'}
                    {technique.id === 'auscultation' && '🩺'}
                    {technique.id === 'urinalysis' && '🧪'}
                    {technique.id === 'special_tests' && '⚙️'}
                    {technique.id === 'mental_status' && '🧠'}
                    {technique.id === 'cranial_nerves' && '👁️'}
                    {technique.id === 'motor_system' && '💪'}
                    {technique.id === 'reflexes' && '⚡'}
                    {technique.id === 'range_of_motion' && '🏃‍♂️'}
                  </span>
                  <span className="text-xs font-semibold">{technique.name.replace(/ \(.*\)/, '')}</span>
                </Button>
              ))}
            </div>

            {/* Seçili Teknik */}
            <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-xl p-6 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">
                  {selectedTechnique.id === 'inspection' && '👁️'}
                  {selectedTechnique.id === 'palpation' && '✋'}
                  {selectedTechnique.id === 'percussion' && '👊'}
                  {selectedTechnique.id === 'auscultation' && '🩺'}
                  {selectedTechnique.id === 'urinalysis' && '🧪'}
                  {selectedTechnique.id === 'special_tests' && '⚙️'}
                  {selectedTechnique.id === 'mental_status' && '🧠'}
                  {selectedTechnique.id === 'cranial_nerves' && '👁️'}
                  {selectedTechnique.id === 'motor_system' && '💪'}
                  {selectedTechnique.id === 'reflexes' && '⚡'}
                  {selectedTechnique.id === 'range_of_motion' && '🏃‍♂️'}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{selectedTechnique.name}</h3>
              </div>
              
              <p className="text-base text-gray-700 mb-6 leading-relaxed bg-white bg-opacity-80 p-4 rounded-lg border border-slate-200">
                {selectedTechnique.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-100 rounded-lg p-5">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>📋</span> Uygulama Adımları
                  </h4>
                  <ol className="space-y-3">
                    {selectedTechnique.steps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <span className="bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-slate-700 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white border border-slate-100 rounded-lg p-5">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span>👶</span> Yaşa Göre İpuçları
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(selectedTechnique.ageSpecific).map(([ageRange, description]) => (
                      <div key={ageRange} className="border-l-4 border-teal-500 pl-3 py-1 bg-teal-50 rounded-r-lg">
                        <div className="font-bold text-teal-900 text-xs mb-1">
                          {ageRange === '0-2' && '👶 0-2 yaş (Bebek)'}
                          {ageRange === '2-6' && '🧒 2-6 yaş (Küçük Çocuk)'}
                          {ageRange === '6-18' && '👦 6-18 yaş (Büyük Çocuk/Ergen)'}
                        </div>
                        <div className="text-teal-800 text-xs leading-relaxed">{String(description)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Normal vs Anormal Bulgular */}
          <Card className="bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>📊</span> Bulgu Değerlendirmesi
              </h2>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setSystemActiveTab('normal')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    systemActiveTab === 'normal'
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ✅ Normal Bulgular
                </button>
                <button
                  onClick={() => setSystemActiveTab('abnormal')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    systemActiveTab === 'abnormal'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚠️ Anormal Bulgular
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(
                systemActiveTab === 'normal' ? examination.normalFindings : examination.abnormalFindings
              ).map(([category, findings]) => (
                <div key={category} className={`rounded-xl p-5 border ${
                  systemActiveTab === 'normal' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <h3 className={`font-bold mb-3 text-sm flex items-center gap-1.5 border-b pb-2 ${
                    systemActiveTab === 'normal' ? 'text-green-950 border-green-200' : 'text-red-950 border-red-200'
                  }`}>
                    {getCategoryTitle(category)}
                  </h3>
                  <ul className="space-y-2">
                    {(findings as string[]).map((finding: string, index: number) => (
                      <li key={index} className={`text-sm flex items-start gap-2 leading-relaxed ${
                        systemActiveTab === 'normal' ? 'text-green-900' : 'text-red-900'
                      }`}>
                        <span className={`font-extrabold mt-0.5 ${
                          systemActiveTab === 'normal' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {systemActiveTab === 'normal' ? '✓' : '✗'}
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
                <p className="text-yellow-800">İnspeksiyon → Palpasyon → Perküsyon → Oskültasyon sırası</p>
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