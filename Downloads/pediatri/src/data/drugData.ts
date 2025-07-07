import { DrugData } from '../types/medical';

export const drugData: DrugData[] = [
  {
    name: 'Parasetamol',
    category: 'Antipiretik',
    dose: [10, 15],
    unit: 'mg/kg/doz',
    notes: '4-6 saatte bir. Maks: 75 mg/kg/gün.'
  },
  {
    name: 'İbuprofen (100mg/5ml)',
    category: 'Antipiretik',
    dose: [5, 10],
    unit: 'mg/kg/doz',
    concentration: 100/5,
    notes: '6-8 saatte bir. Maks: 40 mg/kg/gün. < 6 ay önerilmez.'
  },
  {
    name: 'Amoksisilin-Klavulanat (457mg/5ml)',
    category: 'Antibiyotik',
    dose: [45, 90],
    unit: 'mg/kg/gün (Amok.)',
    concentration: 457/5,
    notes: '2 doza bölünerek. Yüksek doz (90) dirençli AOM/Pnömoni için.'
  },
  {
    name: 'Klaritromisin (125mg/5ml)',
    category: 'Antibiyotik',
    dose: [15],
    unit: 'mg/kg/gün',
    concentration: 125/5,
    notes: '2 doza bölünerek. Atipik pnömoni.'
  },
  {
    name: 'Sefdinir (125mg/5ml)',
    category: 'Antibiyotik',
    dose: [14],
    unit: 'mg/kg/gün',
    concentration: 125/5,
    notes: '1 veya 2 doza bölünerek.'
  },
  {
    name: 'Azitromisin (200mg/5ml)',
    category: 'Antibiyotik',
    dose: [10],
    unit: 'mg/kg/gün (ilk gün)',
    concentration: 200/5,
    notes: 'Sonraki 4 gün 5 mg/kg/gün. Toplam 5 gün.'
  },
  {
    name: 'Setirizin (5mg/5ml)',
    category: 'Antihistaminik',
    dose: [0.25],
    unit: 'mg/kg/doz',
    concentration: 5/5,
    notes: '>6 ay. Günde 1 veya 2 kez.'
  },
  {
    name: 'Desloratadin (2.5mg/5ml)',
    category: 'Antihistaminik',
    dose: [1.25, 2.5],
    unit: 'mg/gün',
    concentration: 2.5/5,
    notes: 'Yaşa göre. 1-5 yaş: 1.25mg, 6-11 yaş: 2.5mg.'
  },
  {
    name: 'Prednizolon (15mg/5ml)',
    category: 'Steroid',
    dose: [1, 2],
    unit: 'mg/kg/gün',
    concentration: 15/5,
    notes: 'Astım atağı, krup. Genellikle 1-2 dozda.'
  },
  {
    name: 'Budesonid (0.25mg/ml nebül)',
    category: 'Steroid',
    dose: [2],
    unit: 'mg',
    notes: 'Orta-ağır krup için tek doz nebül.'
  },
  {
    name: 'Vitamin D (400 IU/damla)',
    category: 'Vitamin',
    dose: [1],
    unit: 'damla/gün',
    notes: 'Sağlıklı bebeklerde profilaksi için.'
  }
]; 