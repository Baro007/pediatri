import React, { useState } from 'react';
import { milestoneData } from '../../data/milestoneData';
import { AgeGroup, MilestoneData } from '../../types/medical';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Select } from '../ui/Input';
import { RedFlag, ClinicalPearl } from '../ui/MedicalAlert';

interface DevelopmentTrackerProps {
  className?: string;
}

export const DevelopmentTracker: React.FC<DevelopmentTrackerProps> = ({ className }) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('3m');
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneData>(milestoneData['3m']);

  const ageOptions = Object.keys(milestoneData).map(age => ({
    value: age,
    label: milestoneData[age as AgeGroup].title.replace(' Gelişim Basamakları', '')
  }));

  const handleAgeChange = (age: string) => {
    const ageGroup = age as AgeGroup;
    setSelectedAge(ageGroup);
    setSelectedMilestone(milestoneData[ageGroup]);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>👶 Gelişim Takibi</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <Select
            label="Yaş Seçin:"
            options={ageOptions}
            value={selectedAge}
            onChange={(e) => handleAgeChange(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-slate-700 mb-4">
            {selectedMilestone.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-slate-800 mb-3 flex items-center gap-2">
                <span>🎯</span> Gelişim Basamakları
              </h4>
              {selectedMilestone.milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border-2 bg-blue-50 border-blue-200"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">
                      {index % 4 === 0 && '🏃‍♂️'}
                      {index % 4 === 1 && '✋'}
                      {index % 4 === 2 && '🗣️'}
                      {index % 4 === 3 && '🧠'}
                    </span>
                    <div>
                      <h5 className="font-medium text-slate-700 mb-1">
                        {selectedMilestone.categories[index % selectedMilestone.categories.length]}
                      </h5>
                      <p className="text-slate-600 text-sm">
                        {milestone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-red-800 mb-3 flex items-center gap-2">
                  <span>🚨</span> Kırmızı Bayraklar
                </h4>
                <div className="space-y-2">
                  {selectedMilestone.redFlags.map((flag, index) => (
                    <RedFlag key={index} message={flag} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg text-blue-800 mb-3 flex items-center gap-2">
                  <span>💡</span> Gelişim Destekleme İpuçları
                </h4>
                <div className="space-y-2">
                  {selectedMilestone.tips.map((tip, index) => (
                    <ClinicalPearl key={index} message={tip} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <span>🎯</span> Gelişim Değerlendirmesi İpuçları
          </h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Her çocuk kendi hızında gelişir; yaş aralıkları yaklaşıktır</li>
            <li>• Bir alanda gecikme varsa diğer alanları da değerlendirin</li>
            <li>• Premature doğan bebeklerde düzeltilmiş yaş kullanın</li>
            <li>• Şüpheli durumlarda çocuk gelişimi uzmanına yönlendirin</li>
            <li>• Aile kaygılarını ciddiye alın</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span>⚡</span> Erken Müdahale Önemi
          </h4>
          <p className="text-blue-700 text-sm">
            Gelişimsel gecikmelerin erken tanısı ve müdahalesi, çocuğun uzun vadeli 
            prognozunu önemli ölçüde iyileştirebilir. Şüpheli durumları göz ardı etmeyiniz.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}; 