import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DoseCalculationResult, MilestoneCheck } from '../types/medical';

interface MedicalState {
  // Dose Calculator State
  weight: string;
  results: DoseCalculationResult[];
  
  // Development Tracking State
  childAge: string;
  selectedAgeGroup: string;
  milestoneChecks: { [ageGroup: string]: MilestoneCheck[] };
  showAssessment: boolean;
  
  // Navigation/Context States
  selectedScenarioId: string | null;
  selectedSystemId: string | null;
  selectedTechniqueId: string | null;
  systemActiveTab: 'normal' | 'abnormal';
  
  // Actions
  setWeight: (weight: string) => void;
  setResults: (results: DoseCalculationResult[]) => void;
  setChildAge: (age: string) => void;
  setSelectedAgeGroup: (group: string) => void;
  setMilestoneChecks: (ageGroup: string, checks: MilestoneCheck[]) => void;
  setShowAssessment: (show: boolean) => void;
  setSelectedScenarioId: (id: string | null) => void;
  setSelectedSystemId: (id: string | null) => void;
  setSelectedTechniqueId: (id: string | null) => void;
  setSystemActiveTab: (tab: 'normal' | 'abnormal') => void;
  
  resetPatientData: () => void;
}

export const useMedicalStore = create<MedicalState>()(
  persist(
    (set) => ({
      // Initial States
      weight: '',
      results: [],
      childAge: '',
      selectedAgeGroup: '',
      milestoneChecks: {},
      showAssessment: false,
      selectedScenarioId: null,
      selectedSystemId: null,
      selectedTechniqueId: null,
      systemActiveTab: 'normal',
      
      // Actions
      setWeight: (weight) => set({ weight }),
      setResults: (results) => set({ results }),
      setChildAge: (childAge) => set({ childAge }),
      setSelectedAgeGroup: (selectedAgeGroup) => set({ selectedAgeGroup }),
      setMilestoneChecks: (ageGroup, checks) => 
        set((state) => ({
          milestoneChecks: {
            ...state.milestoneChecks,
            [ageGroup]: checks,
          }
        })),
      setShowAssessment: (showAssessment) => set({ showAssessment }),
      setSelectedScenarioId: (selectedScenarioId) => set({ selectedScenarioId }),
      setSelectedSystemId: (selectedSystemId) => set({ selectedSystemId }),
      setSelectedTechniqueId: (selectedTechniqueId) => set({ selectedTechniqueId }),
      setSystemActiveTab: (systemActiveTab) => set({ systemActiveTab }),
      
      resetPatientData: () => set({
        weight: '',
        results: [],
        childAge: '',
        selectedAgeGroup: '',
        milestoneChecks: {},
        showAssessment: false,
      }),
    }),
    {
      name: 'pediatri-medical-store', // Key for localStorage
    }
  )
);
