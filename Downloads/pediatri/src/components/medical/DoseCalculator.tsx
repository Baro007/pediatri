import React, { useState } from 'react';
import { drugData } from '../../data/drugData';
import { DrugData, DoseCalculationResult } from '../../types/medical';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MedicalTable } from '../ui/Table';
import { LegalWarning } from '../ui/MedicalAlert';

interface DoseCalculatorProps {
  className?: string;
}

export const DoseCalculator: React.FC<DoseCalculatorProps> = ({ className }) => {
  const [weight, setWeight] = useState<string>('');
  const [results, setResults] = useState<DoseCalculationResult[]>([]);
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
    await new Promise(resolve => setTimeout(resolve, 500));

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

  const tableHeaders = ['İlaç', 'Kategori', 'Hesaplanan Doz', 'Notlar'];
  const tableData = results.map(result => [
    result.drug.name,
    result.drug.category,
    <span className="font-semibold text-teal-700">{result.calculatedDose}</span>,
    <span className="text-sm">{result.drug.notes}</span>
  ]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>💊 Hızlı Doz Hesaplayıcı</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="w-full sm:w-auto">
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
            className="w-full sm:w-auto self-end"
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
            <MedicalTable
              headers={tableHeaders}
              data={tableData}
              className="bg-white"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 