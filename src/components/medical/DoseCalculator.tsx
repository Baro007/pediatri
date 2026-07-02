import React, { useState } from 'react';
import { drugData } from '../../data/drugData';
import { DrugData, DoseCalculationResult } from '../../types/medical';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MedicalTable } from '../ui/Table';
import { LegalWarning } from '../ui/MedicalAlert';
import { useMedicalStore } from '../../store/medicalStore';

interface DoseCalculatorProps {
  className?: string;
}

export const DoseCalculator: React.FC<DoseCalculatorProps> = ({ className }) => {
  const { weight, setWeight, results, setResults } = useMedicalStore();
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateDose = (drug: DrugData, patientWeight: number): string => {
    const doseRange = Array.isArray(drug.dose) ? drug.dose : [drug.dose];
    let calculatedDose = '';

    if (drug.unit.includes('mg/kg')) {
      const minDose = (patientWeight * doseRange[0]).toFixed(1);
      const maxDose = doseRange.length > 1 ? ` - ${(patientWeight * doseRange[1]).toFixed(1)}` : '';
      calculatedDose = `${minDose}${maxDose} ${drug.unit.replace('/kg', '')}`;

      if (drug.concentration) {
        const minMl = (parseFloat(minDose) / drug.concentration).toFixed(1);
        const maxMl = doseRange.length > 1 ? ` - ${(parseFloat(maxDose.replace(' - ', '')) / drug.concentration).toFixed(1)}` : '';
        calculatedDose += ` (${minMl}${maxMl} ml)`;
      }
    } else if (drug.name.includes('Desloratadin')) {
      if (patientWeight <= 5) calculatedDose = '1 mg/gün';
      else if (patientWeight <= 15) calculatedDose = '1.25 mg/gün (2.5 ml)';
      else if (patientWeight <= 30) calculatedDose = '2.5 mg/gün (5 ml)';
      else calculatedDose = '5 mg/gün';
    } else if (drug.dose && drug.dose.length > 0) {
      // Budesonid, Vitamin D vb. kiloya bağlı olmayan ilaçlar için
      const minDose = drug.dose[0];
      const maxDose = drug.dose.length > 1 ? ` - ${drug.dose[1]}` : '';
      calculatedDose = `${minDose}${maxDose} ${drug.unit}`;
    } else {
      calculatedDose = drug.unit;
    }

    return calculatedDose;
  };

  const handleCalculate = async () => {
    const patientWeight = parseFloat(weight);
    
    if (isNaN(patientWeight) || patientWeight <= 0) {
      setError('Lütfen geçerli bir ağırlık giriniz.');
      setResults([]);
      return;
    }

    if (patientWeight > 150) {
      setError('Ağırlık 150 kg\'dan fazla olamaz.');
      setResults([]);
      return;
    }

    setIsCalculating(true);
    setError('');
    
    // Simulate loading for UX
    await new Promise(resolve => setTimeout(resolve, 400));

    try {
      const calculationResults: DoseCalculationResult[] = drugData.map(drug => ({
        drug,
        calculatedDose: calculateDose(drug, patientWeight),
        weight: patientWeight
      }));

      setResults(calculationResults);
    } catch (err) {
      setError('Hesaplama sırasında bir hata oluştu.');
      setResults([]);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleClear = () => {
    setWeight('');
    setResults([]);
    setError('');
  };

  const tableHeaders = ['İlaç', 'Kategori', 'Hesaplanan Doz', 'Notlar'];
  const tableData = results.map(result => [
    result.drug.name,
    result.drug.category,
    <span className="font-semibold text-teal-700">{result.calculatedDose}</span>,
    <span className="text-sm">{result.drug.notes}</span>
  ]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>💊 Hızlı Doz Hesaplayıcı</CardTitle>
        {weight && (
          <button 
            onClick={handleClear} 
            className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Temizle
          </button>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col sm:flex-row items-end gap-4 mb-6">
          <div className="w-full sm:w-auto flex-1 max-w-xs">
            <Input
              type="number"
              placeholder="Örn: 15"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyPress={handleKeyPress}
              label="Hasta Ağırlığı (kg):"
              error={error}
              min="0"
              max="150"
              step="0.1"
            />
          </div>
          <Button
            onClick={handleCalculate}
            loading={isCalculating}
            disabled={!weight.trim()}
            className="w-full sm:w-auto h-[42px] mb-[1px]"
          >
            Hesapla
          </Button>
        </div>

        <LegalWarning className="mb-6">
          <p>
            Bu araç yalnızca bir rehberdir ve profesyonel tıbbi yargının veya güncel resmi ürün bilgilerinin (KÜB/KT) yerini alamaz. 
            Reçeteleme sorumluluğu tamamen hekime aittir.
          </p>
        </LegalWarning>

        {results.length > 0 && (
          <div className="fade-in">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">
              {weight} kg Hasta İçin Hesaplanan Dozlar
            </h4>
            
            {/* Desktop View */}
            <div className="hidden sm:block">
              <MedicalTable
                headers={tableHeaders}
                data={tableData}
                className="bg-white"
              />
            </div>

            {/* Mobile View - Card based layout */}
            <div className="block sm:hidden space-y-4">
              {results.map((result, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-800 text-base">{result.drug.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      {result.drug.category}
                    </span>
                  </div>
                  <div className="flex flex-col text-sm bg-white p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-medium">Hesaplanan Doz:</span>
                    <span className="font-bold text-teal-700 text-base">{result.calculatedDose}</span>
                  </div>
                  {result.drug.notes && (
                    <div className="text-xs text-slate-600 pt-1">
                      <span className="font-semibold text-slate-500 block mb-0.5">Önemli Notlar:</span>
                      {result.drug.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};