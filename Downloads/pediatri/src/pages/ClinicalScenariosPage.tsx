import React, { useState } from 'react';
import { clinicalScenarios, getClinicalScenarioById } from '../data/clinicalScenarios';
import { ClinicalScenario } from '../types/medical';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RedFlag, ClinicalPearl } from '../components/ui/MedicalAlert';

const ClinicalScenariosPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ClinicalScenario | null>(null);

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case 'common': return 'bg-blue-100 text-blue-800';
      case 'uncommon': return 'bg-yellow-100 text-yellow-800';
      case 'rare': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedScenario) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedScenario(null)}
            className="shrink-0"
          >
            ← Geri
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedScenario.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h1>
              <p className="text-gray-600">{selectedScenario.description}</p>
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
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">{step.step}</h3>
                    <p className="text-gray-700 text-sm mb-2">{step.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
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
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{diagnosis.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLikelihoodColor(diagnosis.likelihood)}`}>
                        {diagnosis.likelihood === 'common' ? 'Sık' : 
                         diagnosis.likelihood === 'uncommon' ? 'Nadir' : 'Çok Nadir'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Anahtar Bulgular:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {diagnosis.keyFeatures.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      {diagnosis.workup && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Tetkikler:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
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
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Testler:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {category.tests.map((test, i) => (
                            <li key={i}>{test}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Endikasyonlar:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Hasta Yönetimi</h2>
              <div className="space-y-4">
                {selectedScenario.disposition.map((option, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{option.level}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Kriterler:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {option.criteria.map((criterion, i) => (
                            <li key={i}>{criterion}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Aksiyon:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
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
                  <span className="font-medium text-gray-700">Sık Görülen Yaş:</span>
                  <p className="text-gray-600">{selectedScenario.commonAge}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Aciliyet Düzeyi:</span>
                  <div className={`mt-1 px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(selectedScenario.urgencyLevel)}`}>
                    {selectedScenario.urgencyLevel === 'critical' ? 'Kritik' :
                     selectedScenario.urgencyLevel === 'high' ? 'Yüksek' :
                     selectedScenario.urgencyLevel === 'medium' ? 'Orta' : 'Düşük'}
                  </div>
                </div>
              </div>
            </Card>

            {/* Red Flags */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🚨 Red Flags</h2>
              <div className="space-y-2">
                {selectedScenario.redFlags.map((flag, index) => (
                  <RedFlag key={index} message={flag} />
                ))}
              </div>
            </Card>

            {/* Clinical Pearls */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">💎 Klinik İnci</h2>
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🏥 Klinik Senaryolar</h1>
        <p className="text-gray-600 mt-2">
          Acil serviste sık karşılaşılan pediatrik durumlar ve sistematik değerlendirme yaklaşımları
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicalScenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedScenario(scenario)}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{scenario.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{scenario.title}</h3>
              <p className="text-gray-600 mb-4">{scenario.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{scenario.commonAge}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(scenario.urgencyLevel)}`}>
                  {scenario.urgencyLevel === 'critical' ? 'Kritik' :
                   scenario.urgencyLevel === 'high' ? 'Yüksek' :
                   scenario.urgencyLevel === 'medium' ? 'Orta' : 'Düşük'}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">💡 Nasıl Kullanılır?</h2>
        <div className="text-blue-800 space-y-2">
          <p>• Her senaryo, sistematik bir yaklaşım sunar</p>
          <p>• İlk değerlendirmeden tanıya kadar adım adım rehberlik eder</p>
          <p>• Red flags ve klinik inciler önemli noktalara dikkat çeker</p>
          <p>• Ayırıcı tanı ve tetkik algoritmaları karar vermeyi kolaylaştırır</p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalScenariosPage; 