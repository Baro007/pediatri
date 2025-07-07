import React, { useState } from 'react';
import { assessmentFundamentals, getAssessmentFundamentalById } from '../data/assessmentFundamentals';
import { AssessmentFundamental } from '../types/medical';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';

const AssessmentFundamentalsPage: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentFundamental | null>(null);

  if (selectedAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedAssessment(null)}
            className="shrink-0"
          >
            ← Geri
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedAssessment.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedAssessment.title}</h1>
              <p className="text-gray-600">{selectedAssessment.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Principles */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📚 Temel Prensipler</h2>
              <div className="space-y-6">
                {selectedAssessment.principles.map((principle, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{principle.title}</h3>
                    <p className="text-gray-700 mb-3">{principle.description}</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {principle.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* Age-Specific Approaches */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">👶 Yaş Gruplarına Göre Yaklaşım</h2>
              <div className="space-y-4">
                {Object.entries(selectedAssessment.ageSpecific).map(([ageRange, approaches]) => (
                  <div key={ageRange} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-blue-700">
                      {ageRange} Yaş Grubu
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {approaches.map((approach, i) => (
                        <li key={i}>{approach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* Assessment Tools */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🛠️ Değerlendirme Araçları</h2>
              <div className="space-y-6">
                {selectedAssessment.tools.map((tool, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                    <p className="text-gray-700 mb-4">{tool.purpose}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Uygulama Adımları:</h4>
                        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                          {tool.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Sonuç Yorumlama:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {tool.interpretation.map((interpretation, i) => (
                            <li key={i}>{interpretation}</li>
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
            {/* Quick Reference */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">⚡ Hızlı Referans</h2>
              <div className="space-y-4">
                {selectedAssessment.id === 'triage' && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-800">Triage Seviyeleri</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Level 1: Resüsitasyon</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Level 2: Çok Acil</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Level 3: Acil</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Level 4: Daha Az Acil</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Level 5: Elektif</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedAssessment.id === 'pain' && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-800">Ağrı Skorlama</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm">0-3: Hafif ağrı</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">4-6: Orta ağrı</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm">7-10: Şiddetli ağrı</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedAssessment.id === 'developmental' && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-800">Gelişim Alanları</h3>
                    <div className="space-y-2 text-sm">
                      <div>• Motor gelişim</div>
                      <div>• Dil gelişimi</div>
                      <div>• Sosyal-duygusal</div>
                      <div>• Kognitif gelişim</div>
                      <div>• Adaptif beceriler</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Clinical Tips */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">💡 Klinik İpuçları</h2>
              <div className="space-y-3 text-sm text-gray-600">
                {selectedAssessment.id === 'triage' && (
                  <>
                    <p>• İlk bakış çok önemli: "Genel görünüm" değerlendirmesi</p>
                    <p>• Ebeveyn endişesi ciddiye alınmalı</p>
                    <p>• Yaşamsal bulgular yaşa göre yorumlanmalı</p>
                    <p>• Kültürel farklılıkları göz önünde bulundur</p>
                  </>
                )}
                {selectedAssessment.id === 'pain' && (
                  <>
                    <p>• Ağrı subjektif: Çocuğun ifadesine öncelik ver</p>
                    <p>• Davranışsal değişiklikler önemli ipuçları</p>
                    <p>• Ebeveyn gözlemi değerli bilgi sağlar</p>
                    <p>• Yaşa uygun skorlama araçları kullan</p>
                  </>
                )}
                {selectedAssessment.id === 'developmental' && (
                  <>
                    <p>• Her çocuk kendine özgü bir gelişim hızına sahip</p>
                    <p>• Regresyon her zaman patolojik</p>
                    <p>• Erken müdahale çok önemli</p>
                    <p>• Aile endişelerini ciddiye al</p>
                  </>
                )}
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
        <h1 className="text-3xl font-bold text-gray-900">📋 Değerlendirme Esasları</h1>
        <p className="text-gray-600 mt-2">
          Pediatrik hastalarda sistematik değerlendirme prensipleri ve temel yaklaşımlar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentFundamentals.map((assessment) => (
          <Card
            key={assessment.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedAssessment(assessment)}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{assessment.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{assessment.title}</h3>
              <p className="text-gray-600 mb-4">{assessment.description}</p>
              <div className="text-sm text-gray-500">
                {assessment.principles.length} temel prensip •{' '}
                {Object.keys(assessment.ageSpecific).length} yaş grubu •{' '}
                {assessment.tools.length} değerlendirme aracı
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🎯 Temel Yaklaşımlar</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• <strong>Sistematik değerlendirme:</strong> ABC öncelikli yaklaşım</p>
            <p>• <strong>Yaş spesifik:</strong> Her yaş grubuna özel normlar</p>
            <p>• <strong>Holistik bakış:</strong> Tıbbi + psikososyal değerlendirme</p>
            <p>• <strong>Aile merkezli:</strong> Ebeveyn gözlemi ve endişeleri</p>
            <p>• <strong>Kanıta dayalı:</strong> Güncel rehberler ve skorlama araçları</p>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Kritik Noktalar</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• <strong>İlk bakış:</strong> Genel görünüm değerlendirmesi kritik</p>
            <p>• <strong>Vital bulgular:</strong> Yaşa göre normal değerleri bil</p>
            <p>• <strong>Red flags:</strong> Acil müdahale gerektiren durumlar</p>
            <p>• <strong>Tekrarlı değerlendirme:</strong> Dinamik süreç</p>
            <p>• <strong>Multidisipliner:</strong> Ekip çalışması önemli</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentFundamentalsPage; 