import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { vitalSignsData } from '../../data/vitalSignsData';
import { VitalSignsData } from '../../types/medical';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Select } from '../ui/Input';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VitalSignsChartProps {
  className?: string;
}

export const VitalSignsChart: React.FC<VitalSignsChartProps> = ({ className }) => {
  const [selectedAgeIndex, setSelectedAgeIndex] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<VitalSignsData>(vitalSignsData[0]);

  useEffect(() => {
    setSelectedData(vitalSignsData[selectedAgeIndex]);
  }, [selectedAgeIndex]);

  const ageOptions = vitalSignsData.map((data, index) => ({
    value: index.toString(),
    label: data.age
  }));

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Yaşa Göre Normal Vital Sınırlar - ${selectedData.age}`
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const unit = context.dataIndex === 0 ? 'atım/dk' : 'soluk/dk';
            return `${label}: ${value} ${unit}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Değer (atım/dk veya soluk/dk)'
        }
      }
    }
  };

  const chartData = {
    labels: [
      `Kalp Hızı (${selectedData.age})`,
      `Solunum Sayısı (${selectedData.age})`
    ],
    datasets: [
      {
        label: 'Minimum Değer',
        data: [selectedData.hr_min, selectedData.rr_min],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Maksimum Değer',
        data: [selectedData.hr_max, selectedData.rr_max],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Yaş Gruplarına Göre Normal Vital Bulgular</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <Select
            label="Yaş Grubu Seçin:"
            options={ageOptions}
            value={selectedAgeIndex.toString()}
            onChange={(e) => setSelectedAgeIndex(parseInt(e.target.value))}
            className="max-w-xs"
          />
        </div>

        <div className="chart-container">
          <Bar options={chartOptions} data={chartData} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Kalp Hızı</h4>
            <p className="text-blue-700">
              {selectedData.hr_min} - {selectedData.hr_max} atım/dk
            </p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-pink-800 mb-2">Solunum Sayısı</h4>
            <p className="text-pink-700">
              {selectedData.rr_min} - {selectedData.rr_max} soluk/dk
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-semibold text-slate-800 mb-2">Klinik Notlar</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Vital bulguları değerlendirirken çocuğun yaşı ve genel durumu dikkate alınmalıdır</li>
            <li>• Ateş, ağrı, korku gibi faktörler vital bulguları etkileyebilir</li>
            <li>• Trend takibi tek bir ölçümden daha değerlidir</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}; 