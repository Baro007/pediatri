import React, { useState } from 'react';
import { milestoneData } from '../data/milestoneData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { RedFlag, ClinicalPearl } from '../components/ui/MedicalAlert';

interface MilestoneCheck {
  milestone: string;
  achieved: boolean;
  ageAchieved?: string;
  notes?: string;
}

const DevelopmentTrackingPage: React.FC = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [childAge, setChildAge] = useState('');
  const [milestoneChecks, setMilestoneChecks] = useState<MilestoneCheck[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);

  const ageGroups = Object.keys(milestoneData);

  const handleAgeGroupChange = (ageGroup: string) => {
    setSelectedAgeGroup(ageGroup);
    const selectedData = milestoneData[ageGroup];
    if (selectedData) {
      const initialChecks: MilestoneCheck[] = selectedData.milestones.map(milestone => ({
        milestone,
        achieved: false
      }));
      setMilestoneChecks(initialChecks);
      setShowAssessment(false);
    }
  };

  const handleMilestoneChange = (index: number, field: keyof MilestoneCheck, value: any) => {
    const newChecks = [...milestoneChecks];
    newChecks[index] = { ...newChecks[index], [field]: value };
    setMilestoneChecks(newChecks);
  };

  const performAssessment = () => {
    setShowAssessment(true);
  };

  const getAssessmentResult = () => {
    if (!selectedAgeGroup || milestoneChecks.length === 0) return null;

    const achievedCount = milestoneChecks.filter(check => check.achieved).length;
    const totalCount = milestoneChecks.length;
    const percentage = (achievedCount / totalCount) * 100;

    let result = {
      level: 'normal',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      message: '',
      recommendations: []
    };

    if (percentage >= 80) {
      result.level = 'normal';
      result.color = 'text-green-600';
      result.bgColor = 'bg-green-50';
      result.borderColor = 'border-green-200';
      result.message = 'Gelişim normal sınırlarda';
      result.recommendations = [
        'Çocuğunuzun gelişimi yaşına uygun',
        'Mevcut aktivitelere devam edin',
        'Düzenli kontrollere devam edin'
      ];
    } else if (percentage >= 60) {
      result.level = 'borderline';
      result.color = 'text-yellow-600';
      result.bgColor = 'bg-yellow-50';
      result.borderColor = 'border-yellow-200';
      result.message = 'Gelişim takip gerektirir';
      result.recommendations = [
        'Çocuğunuzun gelişimini yakından takip edin',
        'Gelişim destekleyici aktiviteler yapın',
        '1-2 ay sonra yeniden değerlendirin',
        'Gerekirse uzman değerlendirmesi alın'
      ];
    } else {
      result.level = 'delayed';
      result.color = 'text-red-600';
      result.bgColor = 'bg-red-50';
      result.borderColor = 'border-red-200';
      result.message = 'Gelişim gecikmesi olabilir';
      result.recommendations = [
        'Çocuk gelişim uzmanına başvurun',
        'Erken müdahale programlarını değerlendirin',
        'Aile hekimi ile görüşün',
        'Destekleyici terapi seçeneklerini araştırın'
      ];
    }

    return result;
  };

  const selectedData = selectedAgeGroup ? milestoneData[selectedAgeGroup] : null;
  const assessmentResult = getAssessmentResult();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">👶 Gelişim Takibi</h1>
        <p className="text-gray-600 mt-2">
          Çocuğunuzun gelişimini takip edin ve yaşına uygun milestone'ları değerlendirin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Değerlendirme Formu</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Çocuğun Yaşı
              </label>
              <Input
                placeholder="Örn: 18 ay, 2 yaş"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Değerlendirme Yaş Grubu
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

            {selectedData && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  🎯 {selectedAgeGroup} Milestone Kontrol Listesi
                </h3>
                <div className="space-y-3">
                  {selectedData.milestones.map((milestone, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={milestoneChecks[index]?.achieved || false}
                          onChange={(e) => handleMilestoneChange(index, 'achieved', e.target.checked)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">{milestone}</span>
                          {milestoneChecks[index]?.achieved && (
                            <div className="mt-2 space-y-2">
                              <Input
                                placeholder="Kaç yaşında kazandı?"
                                value={milestoneChecks[index]?.ageAchieved || ''}
                                onChange={(e) => handleMilestoneChange(index, 'ageAchieved', e.target.value)}
                                className="text-sm"
                              />
                              <Input
                                placeholder="Notlarınız..."
                                value={milestoneChecks[index]?.notes || ''}
                                onChange={(e) => handleMilestoneChange(index, 'notes', e.target.value)}
                                className="text-sm"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={performAssessment}
                  className="w-full mt-4"
                  disabled={milestoneChecks.length === 0}
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
            <Card className={`${assessmentResult.bgColor} ${assessmentResult.borderColor} border-2`}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Değerlendirme Sonucu</h2>
              
              <div className="space-y-4">
                <div className={`text-lg font-semibold ${assessmentResult.color}`}>
                  {assessmentResult.message}
                </div>
                
                <div className="text-sm text-gray-600">
                  Başarı oranı: {Math.round((milestoneChecks.filter(c => c.achieved).length / milestoneChecks.length) * 100)}%
                  ({milestoneChecks.filter(c => c.achieved).length}/{milestoneChecks.length} milestone)
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📋 Öneriler:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
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
                  <div className="grid grid-cols-2 gap-2">
                    {selectedData.categories.map((category, i) => (
                      <span key={i} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📚 Gelişim Rehberi</h2>
            
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
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kazanılan becerilerin kaybı</li>
                  <li>• Yaşına göre 2+ ay gecikme</li>
                  <li>• Sosyal etkileşimde azalma</li>
                  <li>• Ebeveyn endişesi</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📞 Uzman Desteği:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Çocuk gelişim uzmanı</li>
                  <li>• Fizyoterapist</li>
                  <li>• Dil ve konuşma terapisti</li>
                  <li>• Erken müdahale programları</li>
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