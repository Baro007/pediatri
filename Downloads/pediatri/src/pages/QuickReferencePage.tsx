import React, { useState } from 'react';
import { quickReferences, getQuickReferenceById } from '../data/quickReferences';
import { QuickReference } from '../types/medical';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MedicalTable } from '../components/ui/Table';
import { Input } from '../components/ui/Input';

const QuickReferencePage: React.FC = () => {
  const [selectedReference, setSelectedReference] = useState<QuickReference | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vital-signs': return 'bg-blue-100 text-blue-800';
      case 'medications': return 'bg-green-100 text-green-800';
      case 'procedures': return 'bg-purple-100 text-purple-800';
      case 'calculations': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTables = selectedReference 
    ? selectedReference.tables.filter(table =>
        table.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        table.headers.some(header => header.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  if (selectedReference) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedReference(null)}
            className="shrink-0"
          >
            ← Geri
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedReference.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedReference.title}</h1>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedReference.category)}`}>
                {selectedReference.category === 'vital-signs' ? 'Vital Bulgular' :
                 selectedReference.category === 'medications' ? 'İlaçlar' :
                 selectedReference.category === 'procedures' ? 'Prosedürler' : 'Hesaplamalar'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Tablo ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="space-y-8">
          {filteredTables.map((table, index) => (
            <Card key={index}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{table.title}</h2>
              
              <div className="overflow-x-auto">
                <MedicalTable
                  headers={table.headers}
                  data={table.rows}
                  className="min-w-full"
                />
              </div>

              {table.notes && table.notes.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="font-medium text-yellow-800 mb-2">⚠️ Önemli Notlar:</h3>
                  <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    {table.notes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredTables.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500">Arama kriterlerinize uygun sonuç bulunamadı.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">⚡ Hızlı Başvuru Tabloları</h1>
        <p className="text-gray-600 mt-2">
          Klinik pratikte sık kullanılan değerler, dozlar ve hesaplama formülleri
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickReferences.map((reference) => (
          <Card
            key={reference.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedReference(reference)}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{reference.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{reference.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(reference.category)}`}>
                    {reference.category === 'vital-signs' ? 'Vital Bulgular' :
                     reference.category === 'medications' ? 'İlaçlar' :
                     reference.category === 'procedures' ? 'Prosedürler' : 'Hesaplamalar'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {reference.tables.length} farklı tablo içerir
                </p>
                <div className="space-y-1">
                  {reference.tables.slice(0, 3).map((table, i) => (
                    <div key={i} className="text-sm text-gray-500">
                      • {table.title}
                    </div>
                  ))}
                  {reference.tables.length > 3 && (
                    <div className="text-sm text-gray-400">
                      ... ve {reference.tables.length - 3} tablo daha
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card className="text-center">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900">Vital Bulgular</h3>
          <p className="text-sm text-gray-600">Yaşa göre normal değerler</p>
        </Card>
        <Card className="text-center">
          <div className="text-2xl mb-2">💊</div>
          <h3 className="font-semibold text-gray-900">İlaç Dozları</h3>
          <p className="text-sm text-gray-600">Acil ve rutin dozlar</p>
        </Card>
        <Card className="text-center">
          <div className="text-2xl mb-2">🔧</div>
          <h3 className="font-semibold text-gray-900">Prosedürler</h3>
          <p className="text-sm text-gray-600">Teknik rehberler</p>
        </Card>
        <Card className="text-center">
          <div className="text-2xl mb-2">🧮</div>
          <h3 className="font-semibold text-gray-900">Hesaplamalar</h3>
          <p className="text-sm text-gray-600">Formüller ve örnekler</p>
        </Card>
      </div>

      <Card className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">💡 Nasıl Kullanılır?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Hızlı Erişim</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Kategorilere göre organize edilmiş tablolar</li>
              <li>• Arama fonksiyonu ile hızlı bulma</li>
              <li>• Mobil cihazlarda kolay kullanım</li>
              <li>• Offline erişim imkanı</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Güvenli Kullanım</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dozlar hastanın kilosuna göre hesaplanmalı</li>
              <li>• Kontrendikasyonlar kontrol edilmeli</li>
              <li>• Güncel rehberler takip edilmeli</li>
              <li>• Şüpheli durumlarda uzman danışmanı</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuickReferencePage; 