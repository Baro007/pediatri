import React, { useState } from 'react';
import { clinicalScenarios } from '../data/clinicalScenarios';
import { ClinicalScenario } from '../types/medical';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { RedFlag, ClinicalPearl } from '../components/ui/MedicalAlert';
import { useMedicalStore } from '../store/medicalStore';
import {
  abdominalPainByAge,
  abdominalExamTechniques,
  rashDistributionMapping,
  rashData
} from '../data/medicalScenarios';
import { clsx } from 'clsx';

const ClinicalScenariosPage: React.FC = () => {
  const { selectedScenarioId, setSelectedScenarioId } = useMedicalStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Abdominal Pain custom state
  const [abdominalActiveTab, setAbdominalActiveTab] = useState<'general' | 'ageGroups' | 'examTechniques'>('general');
  const [selectedAbdominalAgeIndex, setSelectedAbdominalAgeIndex] = useState(0);
  const [selectedAbdominalExamIndex, setSelectedAbdominalExamIndex] = useState(0);

  // Rash Evaluation custom state
  const [rashActiveTab, setRashActiveTab] = useState<'general' | 'bodyRegions' | 'diseases'>('general');
  const [selectedRashRegionIndex, setSelectedRashRegionIndex] = useState(0);

  const selectedScenario = clinicalScenarios.find(s => s.id === selectedScenarioId) || null;
  const setSelectedScenario = (scenario: ClinicalScenario | null) => {
    setSelectedScenarioId(scenario ? scenario.id : null);
    // Reset custom sub-tabs when switching scenarios
    setAbdominalActiveTab('general');
    setSelectedAbdominalAgeIndex(0);
    setSelectedAbdominalExamIndex(0);
    setRashActiveTab('general');
    setSelectedRashRegionIndex(0);
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case 'common': return 'bg-teal-50 text-teal-700 border border-teal-200';
      case 'uncommon': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'rare': return 'bg-red-50 text-red-700 border border-red-200';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const filteredScenarios = clinicalScenarios.filter(scenario =>
    scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scenario.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CUSTOM DETAIL VIEW FOR ABDOMINAL PAIN (Faz 2)
  if (selectedScenario && selectedScenario.id === 'abdominal-pain') {
    const currentAgeData = abdominalPainByAge[selectedAbdominalAgeIndex];
    const currentExamData = abdominalExamTechniques[selectedAbdominalExamIndex];

    return (
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedScenario(null)}
              className="shrink-0"
            >
              ← Geri Dön
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedScenario.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h1>
                <p className="text-gray-600 text-sm mt-0.5">{selectedScenario.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setAbdominalActiveTab('general')}
            className={clsx(
              "py-3 px-6 font-bold text-sm border-b-2 transition-all whitespace-nowrap",
              abdominalActiveTab === 'general'
                ? "border-teal-600 text-teal-600 bg-teal-50/30"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            📋 Genel Yaklaşım
          </button>
          <button
            onClick={() => setAbdominalActiveTab('ageGroups')}
            className={clsx(
              "py-3 px-6 font-bold text-sm border-b-2 transition-all whitespace-nowrap",
              abdominalActiveTab === 'ageGroups'
                ? "border-teal-600 text-teal-600 bg-teal-50/30"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            👶 Yaş Gruplarına Göre Nedenler
          </button>
          <button
            onClick={() => setAbdominalActiveTab('examTechniques')}
            className={clsx(
              "py-3 px-6 font-bold text-sm border-b-2 transition-all whitespace-nowrap",
              abdominalActiveTab === 'examTechniques'
                ? "border-teal-600 text-teal-600 bg-teal-50/30"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            🩺 Özel Fizik Muayene
          </button>
        </div>

        {/* TAB 1: GENERAL APPROACH */}
        {abdominalActiveTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Initial Assessment */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 İlk Değerlendirme</h2>
                <div className="space-y-4">
                  {selectedScenario.initialAssessment.map((step, index) => (
                    <div key={index} className="border-l-4 border-teal-500 pl-4 py-1">
                      <h3 className="font-semibold text-gray-900 text-base">{step.step}</h3>
                      <p className="text-gray-600 text-xs my-1">{step.description}</p>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {step.keyPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Differential Diagnosis */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Ayırıcı Tanı</h2>
                <div className="space-y-4">
                  {selectedScenario.differentialDiagnosis.map((diagnosis, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 shadow-sm bg-slate-50">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-slate-800 text-base">{diagnosis.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getLikelihoodColor(diagnosis.likelihood)}`}>
                          {diagnosis.likelihood === 'common' ? 'Sık' : 
                           diagnosis.likelihood === 'uncommon' ? 'Nadir' : 'Çok Nadir'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <h4 className="font-bold text-slate-700 text-xs mb-2">Anahtar Bulgular:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {diagnosis.keyFeatures.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        {diagnosis.workup && (
                          <div className="bg-white p-3 rounded-lg border border-slate-100">
                            <h4 className="font-bold text-slate-700 text-xs mb-2">Önerilen Tetkikler:</h4>
                            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                              {diagnosis.workup.map((test, i) => (
                                <li key={i}>{test}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Workup */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🧪 Tetkik Algoritması</h2>
                <div className="space-y-4">
                  {selectedScenario.workup.map((category, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                      <h3 className="font-bold text-teal-800 border-b pb-2 mb-3 text-sm">{category.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Testler:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {category.tests.map((test, i) => (
                              <li key={i}>{test}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Endikasyonlar:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {category.indications.map((indication, i) => (
                              <li key={i}>{indication}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Disposition */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Hasta Yönetimi ve Taburculuk</h2>
                <div className="space-y-4">
                  {selectedScenario.disposition.map((option, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                      <h3 className="font-bold text-teal-900 border-b pb-2 mb-3 text-sm">{option.level}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Kriterler:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {option.criteria.map((criterion, i) => (
                              <li key={i}>{criterion}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Aksiyon ve Öneriler:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {option.actions.map((action, i) => (
                              <li key={i}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Scenario Info */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Senaryo Bilgileri</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-700 text-sm block">Sık Görülen Yaş:</span>
                    <p className="text-slate-600 text-sm mt-0.5">{selectedScenario.commonAge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 text-sm block mb-1">Aciliyet Düzeyi:</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border text-center ${getUrgencyColor(selectedScenario.urgencyLevel)}`}>
                      {selectedScenario.urgencyLevel === 'critical' ? '🔴 Kritik / Acil Resüsitasyon' :
                       selectedScenario.urgencyLevel === 'high' ? '🟠 Yüksek Öncelikli' :
                       selectedScenario.urgencyLevel === 'medium' ? '🟡 Orta Öncelikli' : '🟢 Düşük Öncelikli'}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Red Flags */}
              <Card className="bg-red-50 border border-red-200">
                <h2 className="text-lg font-bold text-red-950 mb-4 flex items-center gap-2">
                  <span>🚨</span> Red Flags (Kırmızı Bayraklar)
                </h2>
                <div className="space-y-2">
                  {selectedScenario.redFlags.map((flag, index) => (
                    <RedFlag key={index} message={flag} />
                  ))}
                </div>
              </Card>

              {/* Clinical Pearls */}
              <Card className="bg-blue-50 border border-blue-200">
                <h2 className="text-lg font-bold text-blue-950 mb-4 flex items-center gap-2">
                  <span>💎</span> Klinik İnciler
                </h2>
                <div className="space-y-2">
                  {selectedScenario.clinicalPearls.map((pearl, index) => (
                    <ClinicalPearl key={index} message={pearl} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: AGE GROUP GUIDE */}
        {abdominalActiveTab === 'ageGroups' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Age groups selection */}
              <div className="flex gap-2 flex-wrap bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {abdominalPainByAge.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAbdominalAgeIndex(idx)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-xs font-bold transition-all flex-1 text-center whitespace-nowrap",
                      selectedAbdominalAgeIndex === idx
                        ? "bg-teal-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {item.ageGroup.replace(/ \(.*\)/, '')}
                  </button>
                ))}
              </div>

              {/* Main age details card */}
              <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-3">
                  <span>👶</span> {currentAgeData.ageGroup} Karın Ağrısı Kılavuzu
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Sık Görülenler */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-green-950 text-sm border-b border-green-200 pb-2 mb-2">🟢 Sık Görülenler</h3>
                    <ul className="list-disc list-inside text-xs text-green-900 space-y-1.5 leading-relaxed">
                      {currentAgeData.commonCauses.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>

                  {/* Daha Nadir */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-yellow-950 text-sm border-b border-yellow-200 pb-2 mb-2">🟡 Daha Nadir</h3>
                    <ul className="list-disc list-inside text-xs text-yellow-900 space-y-1.5 leading-relaxed">
                      {currentAgeData.lessCommon.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>

                  {/* Nadir / Acil */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
                    <h3 className="font-bold text-red-950 text-sm border-b border-red-200 pb-2 mb-2">🔴 Nadir / Acil Nedenler</h3>
                    <ul className="list-disc list-inside text-xs text-red-900 space-y-1.5 leading-relaxed">
                      {currentAgeData.rare.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Clinical Tips */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <span>💡</span> Yaşa Özel Pratik İpuçları
                  </h3>
                  <div className="space-y-2">
                    {currentAgeData.clinicalTips.map((tip, i) => (
                      <ClinicalPearl key={i} message={tip.replace('💡 ', '')} />
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar Red Flags for Age */}
            <div className="space-y-6">
              <Card className="bg-red-50 border border-red-200 shadow-sm">
                <h2 className="text-lg font-bold text-red-950 mb-4 flex items-center gap-2">
                  <span>🚨</span> {currentAgeData.ageGroup} Kırmızı Bayraklar
                </h2>
                <div className="space-y-2">
                  {currentAgeData.redFlags.map((flag, idx) => (
                    <RedFlag key={idx} message={flag} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 3: PHYSICAL EXAM TECHNIQUES */}
        {abdominalActiveTab === 'examTechniques' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Techniques selector grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {abdominalExamTechniques.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAbdominalExamIndex(idx)}
                    className={clsx(
                      "px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-center flex-1 h-12 flex items-center justify-center border",
                      selectedAbdominalExamIndex === idx
                        ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {item.name.replace(' Testi', '').replace(' (Blumberg)', '').replace(' Sign', '')}
                  </button>
                ))}
              </div>

              {/* Technique details card */}
              <Card>
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span>🩺</span> {currentExamData.name}
                  </h2>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{currentExamData.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nasıl Yapılır */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-800 text-sm mb-3">📋 Muayene Tekniği (Adım Adım)</h3>
                    <ol className="space-y-3">
                      {currentExamData.technique.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-700">
                          <span className="bg-teal-600 text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Bulgular ve Yorumlama */}
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
                      <h3 className="font-bold text-green-950 text-xs mb-2 flex items-center gap-1">
                        <span>✅</span> Pozitif Bulgular:
                      </h3>
                      <ul className="list-disc list-inside text-xs text-green-900 space-y-1 leading-relaxed">
                        {currentExamData.positiveFindings.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm">
                      <h3 className="font-bold text-blue-950 text-xs mb-1 flex items-center gap-1">
                        <span>🎯</span> Klinik Anlamı:
                      </h3>
                      <p className="text-xs text-blue-900 leading-relaxed font-semibold">{currentExamData.clinicalSignificance}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar age specific tips */}
            <div className="space-y-6">
              <Card>
                <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-1.5 border-b pb-2">
                  <span>👶</span> Yaşa Göre Muayene İpuçları
                </h2>
                <div className="space-y-3">
                  {currentExamData.ageSpecificTips.map((tip, idx) => (
                    <div key={idx} className="border-l-4 border-teal-500 pl-3 py-2 bg-teal-50 rounded-r-lg text-xs text-teal-800 leading-relaxed font-medium">
                      {tip}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    );
  }

  // CUSTOM DETAIL VIEW FOR RASH EVALUATION (Faz 3)
  if (selectedScenario && selectedScenario.id === 'rash-evaluation') {
    const currentRegionData = rashDistributionMapping[selectedRashRegionIndex];

    return (
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedScenario(null)}
              className="shrink-0"
            >
              ← Geri Dön
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedScenario.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h1>
                <p className="text-gray-600 text-sm mt-0.5">{selectedScenario.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setRashActiveTab('general')}
            className={clsx(
              "py-3 px-6 font-bold text-sm border-b-2 transition-all whitespace-nowrap",
              rashActiveTab === 'general'
                ? "border-teal-600 text-teal-600 bg-teal-50/30"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            📋 Genel Yaklaşım
          </button>
          <button
            onClick={() => setRashActiveTab('bodyRegions')}
            className={clsx(
              "py-3 px-6 font-bold text-sm border-b-2 transition-all whitespace-nowrap",
              rashActiveTab === 'bodyRegions'
                ? "border-teal-600 text-teal-600 bg-teal-50/30"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            🗺️ Vücut Bölgelerine Göre
          </button>
          <button
            onClick={() => setRashActiveTab('diseases')}
            className={clsx(
              "py-3 px-6 font-bold text-sm border-b-2 transition-all whitespace-nowrap",
              rashActiveTab === 'diseases'
                ? "border-teal-600 text-teal-600 bg-teal-50/30"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            🦠 Döküntülü Hastalıklar
          </button>
        </div>

        {/* TAB 1: GENERAL APPROACH */}
        {rashActiveTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Initial Assessment */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 İlk Değerlendirme</h2>
                <div className="space-y-4">
                  {selectedScenario.initialAssessment.map((step, index) => (
                    <div key={index} className="border-l-4 border-teal-500 pl-4 py-1">
                      <h3 className="font-semibold text-gray-900 text-base">{step.step}</h3>
                      <p className="text-gray-600 text-xs my-1">{step.description}</p>
                      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        {step.keyPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Differential Diagnosis */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Ayırıcı Tanı</h2>
                <div className="space-y-4">
                  {selectedScenario.differentialDiagnosis.map((diagnosis, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 shadow-sm bg-slate-50">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-slate-800 text-base">{diagnosis.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getLikelihoodColor(diagnosis.likelihood)}`}>
                          {diagnosis.likelihood === 'common' ? 'Sık' : 
                           diagnosis.likelihood === 'uncommon' ? 'Nadir' : 'Çok Nadir'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <h4 className="font-bold text-slate-700 text-xs mb-2">Anahtar Bulgular:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {diagnosis.keyFeatures.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        {diagnosis.workup && (
                          <div className="bg-white p-3 rounded-lg border border-slate-100">
                            <h4 className="font-bold text-slate-700 text-xs mb-2">Önerilen Tetkikler:</h4>
                            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                              {diagnosis.workup.map((test, i) => (
                                <li key={i}>{test}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Workup */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🧪 Tetkik Algoritması</h2>
                <div className="space-y-4">
                  {selectedScenario.workup.map((category, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                      <h3 className="font-bold text-teal-800 border-b pb-2 mb-3 text-sm">{category.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Testler:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {category.tests.map((test, i) => (
                              <li key={i}>{test}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Endikasyonlar:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {category.indications.map((indication, i) => (
                              <li key={i}>{indication}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Disposition */}
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Hasta Yönetimi ve Taburculuk</h2>
                <div className="space-y-4">
                  {selectedScenario.disposition.map((option, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                      <h3 className="font-bold text-teal-900 border-b pb-2 mb-3 text-sm">{option.level}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Kriterler:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {option.criteria.map((criterion, i) => (
                              <li key={i}>{criterion}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 text-xs mb-2">Aksiyon ve Öneriler:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {option.actions.map((action, i) => (
                              <li key={i}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Scenario Info */}
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Senaryo Bilgileri</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-slate-700 text-sm block">Sık Görülen Yaş:</span>
                    <p className="text-slate-600 text-sm mt-0.5">{selectedScenario.commonAge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 text-sm block mb-1">Aciliyet Düzeyi:</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border text-center ${getUrgencyColor(selectedScenario.urgencyLevel)}`}>
                      {selectedScenario.urgencyLevel === 'critical' ? '🔴 Kritik / Acil Resüsitasyon' :
                       selectedScenario.urgencyLevel === 'high' ? '🟠 Yüksek Öncelikli' :
                       selectedScenario.urgencyLevel === 'medium' ? '🟡 Orta Öncelikli' : '🟢 Düşük Öncelikli'}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Red Flags */}
              <Card className="bg-red-50 border border-red-200">
                <h2 className="text-lg font-bold text-red-950 mb-4 flex items-center gap-2">
                  <span>🚨</span> Red Flags (Kırmızı Bayraklar)
                </h2>
                <div className="space-y-2">
                  {selectedScenario.redFlags.map((flag, index) => (
                    <RedFlag key={index} message={flag} />
                  ))}
                </div>
              </Card>

              {/* Clinical Pearls */}
              <Card className="bg-blue-50 border border-blue-200">
                <h2 className="text-lg font-bold text-blue-950 mb-4 flex items-center gap-2">
                  <span>💎</span> Klinik İnciler
                </h2>
                <div className="space-y-2">
                  {selectedScenario.clinicalPearls.map((pearl, index) => (
                    <ClinicalPearl key={index} message={pearl} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: BODY REGION MAPPING */}
        {rashActiveTab === 'bodyRegions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Regions selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {rashDistributionMapping.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRashRegionIndex(idx)}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-xs font-bold transition-all text-center flex-1 border h-11 flex items-center justify-center gap-1.5",
                      selectedRashRegionIndex === idx
                        ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.bodyRegion.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Region detail list card */}
              <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-3">
                  <span>{currentRegionData.icon}</span> {currentRegionData.bodyRegion} Bölgesel Döküntüleri
                </h2>

                <div className="space-y-4">
                  {currentRegionData.commonRashes.map((rash, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-800 text-base">{rash.name}</h3>
                        <span className={clsx(
                          "px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                          rash.frequency === 'very-common' ? 'bg-green-100 text-green-800 border-green-200' :
                          rash.frequency === 'common' ? 'bg-teal-100 text-teal-800 border-teal-200' :
                          rash.frequency === 'uncommon' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        )}>
                          {rash.frequency === 'very-common' ? 'Çok Sık' :
                           rash.frequency === 'common' ? 'Sık' :
                           rash.frequency === 'uncommon' ? 'Nadir' : 'Çok Nadir'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed mb-3">{rash.description}</p>
                      <div className="bg-white p-3 rounded-lg border border-slate-100 text-xs text-slate-700 leading-relaxed font-semibold">
                        🔑 Klinik İpucu: {rash.clinicalClue}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Region Pearls */}
                {currentRegionData.clinicalPearls && currentRegionData.clinicalPearls.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-slate-100 mt-6">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <span>💎</span> Bölgeye Özel İnciler
                    </h3>
                    <div className="space-y-2">
                      {currentRegionData.clinicalPearls.map((pearl, i) => (
                        <ClinicalPearl key={i} message={pearl.replace('💎 ', '')} />
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar red flags for region */}
            <div className="space-y-6">
              <Card className="bg-red-50 border border-red-200 shadow-sm">
                <h2 className="text-lg font-bold text-red-950 mb-4 flex items-center gap-2">
                  <span>🚨</span> Bölgesel Kırmızı Bayraklar
                </h2>
                <div className="space-y-2">
                  {currentRegionData.redFlags.map((flag, idx) => (
                    <RedFlag key={idx} message={flag} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 3: DISEASES DETAILS (exanthematous) */}
        {rashActiveTab === 'diseases' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
            {rashData.map((d, idx) => (
              <Card key={idx} className="flex flex-col justify-between hover:shadow-lg transition-shadow border-2 hover:border-teal-200">
                <div>
                  <div className="border-b border-slate-100 pb-2 mb-3">
                    <h3 className="font-bold text-slate-800 text-base">{d.name}</h3>
                  </div>
                  <div className="space-y-3 text-xs leading-relaxed text-slate-600 mb-4">
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">🟢 Prodrom Belirtileri:</span>
                      <p>{d.prodrome}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">🔺 Döküntü Özellikleri:</span>
                      <p>{d.rash}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-teal-50 border border-teal-100 text-teal-900 rounded-xl p-3 text-xs leading-relaxed font-bold mt-auto">
                  🔑 Ayırıcı İpucu: {d.clue}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // STANDARD SCENARIOS DETAIL VIEW
  if (selectedScenario) {
    return (
      <div className="space-y-6 fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedScenario(null)}
            className="shrink-0"
          >
            ← Geri Dön
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedScenario.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h1>
              <p className="text-gray-600 text-sm mt-0.5">{selectedScenario.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Initial Assessment */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 İlk Değerlendirme</h2>
              <div className="space-y-4">
                {selectedScenario.initialAssessment.map((step, index) => (
                  <div key={index} className="border-l-4 border-teal-500 pl-4 py-1">
                    <h3 className="font-semibold text-gray-900 text-base">{step.step}</h3>
                    <p className="text-gray-600 text-xs my-1">{step.description}</p>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                      {step.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* Differential Diagnosis */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Ayırıcı Tanı</h2>
              <div className="space-y-4">
                {selectedScenario.differentialDiagnosis.map((diagnosis, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-4 shadow-sm bg-slate-50">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-slate-800 text-base">{diagnosis.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getLikelihoodColor(diagnosis.likelihood)}`}>
                        {diagnosis.likelihood === 'common' ? 'Sık' : 
                         diagnosis.likelihood === 'uncommon' ? 'Nadir' : 'Çok Nadir'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-slate-100">
                        <h4 className="font-bold text-slate-700 text-xs mb-2">Anahtar Bulgular:</h4>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                          {diagnosis.keyFeatures.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      {diagnosis.workup && (
                        <div className="bg-white p-3 rounded-lg border border-slate-100">
                          <h4 className="font-bold text-slate-700 text-xs mb-2">Önerilen Tetkikler:</h4>
                          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                            {diagnosis.workup.map((test, i) => (
                              <li key={i}>{test}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Workup */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🧪 Tetkik Algoritması</h2>
              <div className="space-y-4">
                {selectedScenario.workup.map((category, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                    <h3 className="font-bold text-teal-800 border-b pb-2 mb-3 text-sm">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-700 text-xs mb-2">Testler:</h4>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                          {category.tests.map((test, i) => (
                            <li key={i}>{test}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-700 text-xs mb-2">Endikasyonlar:</h4>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                          {category.indications.map((indication, i) => (
                            <li key={i}>{indication}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Disposition */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Hasta Yönetimi ve Taburculuk</h2>
              <div className="space-y-4">
                {selectedScenario.disposition.map((option, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                    <h3 className="font-bold text-teal-900 border-b pb-2 mb-3 text-sm">{option.level}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-700 text-xs mb-2">Kriterler:</h4>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                          {option.criteria.map((criterion, i) => (
                            <li key={i}>{criterion}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-700 text-xs mb-2">Aksiyon ve Öneriler:</h4>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                          {option.actions.map((action, i) => (
                            <li key={i}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Scenario Info */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Senaryo Bilgileri</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-slate-700 text-sm block">Sık Görülen Yaş:</span>
                  <p className="text-slate-600 text-sm mt-0.5">{selectedScenario.commonAge}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-700 text-sm block mb-1">Aciliyet Düzeyi:</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border text-center ${getUrgencyColor(selectedScenario.urgencyLevel)}`}>
                    {selectedScenario.urgencyLevel === 'critical' ? '🔴 Kritik / Acil Resüsitasyon' :
                     selectedScenario.urgencyLevel === 'high' ? '🟠 Yüksek Öncelikli' :
                     selectedScenario.urgencyLevel === 'medium' ? '🟡 Orta Öncelikli' : '🟢 Düşük Öncelikli'}
                  </div>
                </div>
              </div>
            </Card>

            {/* Red Flags */}
            <Card className="bg-red-50 border border-red-200">
              <h2 className="text-lg font-bold text-red-950 mb-4 flex items-center gap-2">
                <span>🚨</span> Red Flags (Kırmızı Bayraklar)
              </h2>
              <div className="space-y-2">
                {selectedScenario.redFlags.map((flag, index) => (
                  <RedFlag key={index} message={flag} />
                ))}
              </div>
            </Card>

            {/* Clinical Pearls */}
            <Card className="bg-blue-50 border border-blue-200">
              <h2 className="text-lg font-bold text-blue-950 mb-4 flex items-center gap-2">
                <span>💎</span> Klinik İnciler
              </h2>
              <div className="space-y-2">
                {selectedScenario.clinicalPearls.map((pearl, index) => (
                  <ClinicalPearl key={index} message={pearl} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT LIST VIEW
  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏥 Klinik Senaryolar</h1>
          <p className="text-gray-600 mt-2">
            Acil serviste ve poliklinikte sık karşılaşılan pediatrik durumlar ve sistematik algoritmalar.
          </p>
        </div>
      </div>

      <div className="max-w-md bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <Input
          placeholder="🔍 Senaryo ara (Örn: ateş, öksürük, topallama)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="border-none focus:ring-0"
        />
      </div>

      {filteredScenarios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-teal-300 flex flex-col justify-between"
              onClick={() => setSelectedScenario(scenario)}
            >
              <div className="text-center p-4">
                <div className="text-5xl mb-4 transform hover:scale-110 transition-transform duration-200">{scenario.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{scenario.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{scenario.description}</p>
              </div>
              <div className="flex justify-between items-center text-xs border-t pt-3 mt-auto">
                <span className="text-slate-400 font-medium">🧒 {scenario.commonAge}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold border ${getUrgencyColor(scenario.urgencyLevel)}`}>
                  {scenario.urgencyLevel === 'critical' ? 'Kritik' :
                   scenario.urgencyLevel === 'high' ? 'Yüksek' :
                   scenario.urgencyLevel === 'medium' ? 'Orta' : 'Düşük'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-4xl">🔍</span>
          <p className="text-slate-500 font-medium mt-4">Arama kriterlerinize uygun klinik senaryo bulunamadı.</p>
        </div>
      )}

      <div className="mt-8 p-6 bg-teal-50 border border-teal-100 rounded-xl">
        <h2 className="text-lg font-bold text-teal-900 mb-3 flex items-center gap-2">
          <span>💡</span> Nasıl Kullanılır?
        </h2>
        <div className="text-teal-800 space-y-2 text-sm">
          <p>• Her senaryo, pediatrik hastaya yönelik kanıta dayalı sistematik bir yaklaşım sunar.</p>
          <p>• İlk değerlendirme adımlarından ayırıcı tanıya kadar aşama aşama kılavuzluk eder.</p>
          <p>• Kırmızı bayraklar acil sevk veya müdahale gerektiren hayati alarm bulgularını öne çıkarır.</p>
          <p>• Tetkik ve taburculuk kriterleri hekimin klinik karar verme sürecini hızlandırır.</p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalScenariosPage;