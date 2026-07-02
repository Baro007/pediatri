import React from 'react';
import { milestoneData } from '../data/milestoneData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { RedFlag, ClinicalPearl } from '../components/ui/MedicalAlert';
import { useMedicalStore } from '../store/medicalStore';
import { MilestoneCheck } from '../types/medical';
import { clsx } from 'clsx';

const DevelopmentTrackingPage: React.FC = () => {
  const {
    childAge,
    setChildAge,
    selectedAgeGroup,
    setSelectedAgeGroup,
    milestoneChecks,
    setMilestoneChecks,
    showAssessment,
    setShowAssessment,
    resetPatientData
  } = useMedicalStore();

  const ageGroups = Object.keys(milestoneData);

  const handleAgeGroupChange = (ageGroup: string) => {
    setSelectedAgeGroup(ageGroup);
    
    if (ageGroup) {
      const existingChecks = milestoneChecks[ageGroup];
      if (!existingChecks) {
        const selectedData = milestoneData[ageGroup];
        if (selectedData) {
          const initialChecks: MilestoneCheck[] = selectedData.milestones.map(milestone => ({
            milestone,
            achieved: false
          }));
          setMilestoneChecks(ageGroup, initialChecks);
        }
      }
    }
    setShowAssessment(false);
  };

  const handleMilestoneChange = (index: number, field: keyof MilestoneCheck, value: any) => {
    if (!selectedAgeGroup) return;
    const currentChecks = milestoneChecks[selectedAgeGroup] || [];
    const newChecks = [...currentChecks];
    newChecks[index] = { ...newChecks[index], [field]: value };
    setMilestoneChecks(selectedAgeGroup, newChecks);
  };

  const performAssessment = () => {
    setShowAssessment(true);
  };

  const getAssessmentResult = () => {
    if (!selectedAgeGroup) return null;
    const currentChecks = milestoneChecks[selectedAgeGroup] || [];
    if (currentChecks.length === 0) return null;

    const achievedCount = currentChecks.filter(check => check.achieved).length;
    const totalCount = currentChecks.length;
    const percentage = (achievedCount / totalCount) * 100;

    let result = {
      level: 'normal',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      message: '',
      recommendations: [] as string[]
    };

    if (percentage >= 80) {
      result.level = 'normal';
      result.color = 'text-green-600';
      result.bgColor = 'bg-green-50';
      result.borderColor = 'border-green-200';
      result.message = 'Gelişim normal sınırlarda';
      result.recommendations = [
        'Çocuğunuzun gelişimi yaşına uygun görünüyor.',
        'Mevcut destekleyici aktivitelere devam edin.',
        'Düzenli çocuk hekimi kontrollerine devam edin.'
      ];
    } else if (percentage >= 60) {
      result.level = 'borderline';
      result.color = 'text-yellow-600';
      result.bgColor = 'bg-yellow-50';
      result.borderColor = 'border-yellow-200';
      result.message = 'Gelişim yakın takip gerektirir';
      result.recommendations = [
        'Çocuğunuzun gelişimini evde destekleyici oyunlarla yakından takip edin.',
        'Milestone alanlarına yönelik aktiviteleri artırın.',
        '1-2 ay sonra kontrol listesini yeniden değerlendirin.',
        'Belirgin gecikme hissederseniz uzman hekime danışın.'
      ];
    } else {
      result.level = 'delayed';
      result.color = 'text-red-600';
      result.bgColor = 'bg-red-50';
      result.borderColor = 'border-red-200';
      result.message = 'Gelişim gecikmesi riski (Değerlendirme Önerilir)';
      result.recommendations = [
        'Çocuk Sağlığı ve Gelişimi uzmanına başvurun.',
        'Erken müdahale programları ve destekleyici terapileri değerlendirin.',
        'Detaylı Denver II veya AGTE gelişimsel testi talep edin.',
        'Aile hekiminiz veya çocuk hekiminiz ile görüşün.'
      ];
    }

    return result;
  };

  const selectedData = selectedAgeGroup ? milestoneData[selectedAgeGroup] : null;
  const currentChecks = selectedAgeGroup ? (milestoneChecks[selectedAgeGroup] || []) : [];
  const assessmentResult = getAssessmentResult();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👶 Gelişim Takibi</h1>
          <p className="text-gray-600 mt-2">
            Çocukların yaş gruplarına göre gelişim basamaklarını interaktif değerlendirin.
          </p>
        </div>
        {(childAge || selectedAgeGroup || Object.keys(milestoneChecks).length > 0) && (
          <Button 
            variant="danger" 
            size="sm" 
            onClick={resetPatientData}
            className="self-start sm:self-center"
          >
            🗑️ Muayeneyi Sıfırla
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📝</span> Değerlendirme Formu
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Çocuğun Yaşı / Adı
                </label>
                <Input
                  placeholder="Örn: 18 ay, Ayşe"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Değerlendirme Dönemi
                </label>
                <Select
                  value={selectedAgeGroup}
                  onChange={(e) => handleAgeGroupChange(e.target.value)}
                >
                  <option value="">Yaş grubu seçin</option>
                  {ageGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </Select>
              </div>
            </div>

            {selectedData && currentChecks.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  🎯 {selectedAgeGroup} Milestone Kontrol Listesi
                </h3>
                <p className="text-xs text-slate-400 mb-2">
                  * Kazanılan becerileri işaretlemek için satırın üzerine tıklayın.
                </p>
                <div className="space-y-3">
                  {selectedData.milestones.map((milestone, index) => {
                    const check = currentChecks[index] || { achieved: false };
                    return (
                      <div 
                        key={index} 
                        className={clsx(
                          "border rounded-xl p-4 transition-all duration-200 cursor-pointer select-none",
                          check.achieved ? "bg-teal-50 border-teal-200" : "bg-white border-slate-200 hover:border-slate-300"
                        )}
                        onClick={() => handleMilestoneChange(index, 'achieved', !check.achieved)}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className={clsx(
                              "w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                              check.achieved ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300 bg-white"
                            )}
                          >
                            {check.achieved && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          
                          <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                            <span 
                              className={clsx(
                                "text-sm font-medium transition-colors cursor-pointer block",
                                check.achieved ? "text-teal-900" : "text-slate-700"
                              )}
                              onClick={() => handleMilestoneChange(index, 'achieved', !check.achieved)}
                            >
                              {milestone}
                            </span>
                            
                            {check.achieved && (
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 fade-in">
                                <Input
                                  placeholder="Kazanma yaşı (örn: 10 ay)"
                                  value={check.ageAchieved || ''}
                                  onChange={(e) => handleMilestoneChange(index, 'ageAchieved', e.target.value)}
                                  className="text-xs bg-white py-1"
                                />
                                <Input
                                  placeholder="Klinik notlar..."
                                  value={check.notes || ''}
                                  onChange={(e) => handleMilestoneChange(index, 'notes', e.target.value)}
                                  className="text-xs bg-white py-1"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  onClick={performAssessment}
                  className="w-full mt-4 h-11"
                  disabled={currentChecks.length === 0}
                >
                  Değerlendirme Yap
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          {/* Assessment Result */}
          {showAssessment && assessmentResult && (
            <Card className={`${assessmentResult.bgColor} ${assessmentResult.borderColor} border-2 fade-in`}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span> Değerlendirme Sonucu
              </h2>
              
              <div className="space-y-4">
                <div className={`text-lg font-bold ${assessmentResult.color}`}>
                  {assessmentResult.message}
                </div>
                
                <div className="text-sm text-slate-700 font-semibold bg-white bg-opacity-60 p-3 rounded-lg border border-slate-200">
                  Başarı oranı: %{Math.round((currentChecks.filter(c => c.achieved).length / currentChecks.length) * 100)}
                  {' '}({currentChecks.filter(c => c.achieved).length}/{currentChecks.length} milestone)
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📋 Öneriler:</h3>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    {assessmentResult.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* Age Group Information */}
          {selectedData && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ℹ️ {selectedAgeGroup} Dönem Bilgileri
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">🎨 Gelişim Alanları:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedData.categories.map((category, i) => (
                      <span key={i} className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-full font-medium">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">⚠️ Dikkat Edilmesi Gerekenler:</h3>
                  <div className="space-y-2">
                    {selectedData.redFlags.map((flag, i) => (
                      <RedFlag key={i} message={flag} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">💡 Gelişim Destekleme İpuçları:</h3>
                  <div className="space-y-2">
                    {selectedData.tips.map((tip, i) => (
                      <ClinicalPearl key={i} message={tip} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* General Development Guidelines */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📚 Gelişim Kontrol Sıklığı</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🕐 Değerlendirme Sıklığı:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 0-1 yaş: Aylık kontrol</li>
                  <li>• 1-2 yaş: 2-3 ayda bir</li>
                  <li>• 2-5 yaş: 6 ayda bir</li>
                  <li>• 5+ yaş: Yılda bir</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🚨 Hemen Değerlendirme:</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-red-700">
                  <li>• Kazanılan becerilerin kaybı</li>
                  <li>• Yaşına göre 2+ ay gecikme</li>
                  <li>• Sosyal etkileşimde azalma</li>
                  <li>• Ebeveyn endişesi</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📞 Uzman Desteği:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Çocuk Gelişimi Uzmanı / Pediatrist</li>
                  <li>• Çocuk Ergen Psikiyatristi</li>
                  <li>• Dil ve Konuşma Terapisti</li>
                  <li>• Erken Müdahale Programları (fizik tedavi vb.)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentTrackingPage;