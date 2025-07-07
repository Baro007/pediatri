// Medical Types for Pediatric Semiology Application

export interface DrugData {
  name: string;
  category: 'Antipiretik' | 'Antibiyotik' | 'Antihistaminik' | 'Steroid' | 'Vitamin';
  dose: number[];
  unit: string;
  concentration?: number;
  notes: string;
}

export interface MilestoneData {
  title: string;
  categories: string[];
  milestones: string[];
  redFlags: string[];
  tips: string[];
}

export interface VitalSignsData {
  age: string;
  hr_min: number;
  hr_max: number;
  rr_min: number;
  rr_max: number;
}

export interface RashData {
  name: string;
  prodrome: string;
  rash: string;
  clue: string;
}

export interface LimpData {
  etiology: string;
  '1-3': string;
  '4-10': string;
  '11-15': string;
}

export interface DoseCalculationResult {
  drug: DrugData;
  calculatedDose: string;
  weight: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  subItems?: NavigationItem[];
}

export interface SystemExamination {
  id: string;
  name: string;
  icon: string;
  description: string;
  techniques: ExaminationTechnique[];
  normalFindings: ExaminationFindings;
  abnormalFindings: ExaminationFindings;
  redFlags: string[];
  clinicalPearls: string[];
}

export interface ExaminationTechnique {
  id: string;
  name: string;
  description: string;
  steps: string[];
  ageSpecific: {
    [ageRange: string]: string;
  };
}

export interface ExaminationFindings {
  [category: string]: string[];
}

export interface AgeRange {
  min: number;
  max: number;
  label: string;
}

export interface MedicalScenario {
  id: string;
  title: string;
  description: string;
  approach: string;
  redFlags: string[];
  algorithmSteps?: AlgorithmStep[];
}

export interface AlgorithmStep {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    nextStepId: string;
  }[];
  result?: string;
  type: 'question' | 'result';
}

export interface MedicalReference {
  id: string;
  title: string;
  category: string;
  source: string;
  url?: string;
  description: string;
}

export type AgeGroup = '3m' | '6m' | '9m' | '12m' | '18m' | '2y' | '3y' | '4y' | '5y';

export type SystemType = 
  | 'respiratory' 
  | 'cardiovascular' 
  | 'gi' 
  | 'gu' 
  | 'neuro' 
  | 'msk' 
  | 'derma';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'drug' | 'milestone' | 'system' | 'scenario' | 'reference';
  category: string;
  relevanceScore: number;
}

export interface ClinicalScenario {
  id: string;
  title: string;
  icon: string;
  description: string;
  commonAge: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  initialAssessment: AssessmentStep[];
  differentialDiagnosis: Diagnosis[];
  workup: WorkupStep[];
  redFlags: string[];
  disposition: DispositionOptions[];
  clinicalPearls: string[];
}

export interface AssessmentStep {
  step: string;
  description: string;
  keyPoints: string[];
}

export interface Diagnosis {
  name: string;
  likelihood: 'common' | 'uncommon' | 'rare';
  keyFeatures: string[];
  workup?: string[];
}

export interface WorkupStep {
  category: string;
  tests: string[];
  indications: string[];
}

export interface DispositionOptions {
  level: string;
  criteria: string[];
  actions: string[];
}

export interface QuickReference {
  id: string;
  title: string;
  icon: string;
  category: 'vital-signs' | 'medications' | 'procedures' | 'calculations';
  tables: ReferenceTable[];
}

export interface ReferenceTable {
  title: string;
  headers: string[];
  rows: string[][];
  notes?: string[];
}

export interface AssessmentFundamental {
  id: string;
  title: string;
  icon: string;
  description: string;
  principles: Principle[];
  ageSpecific: {
    [ageRange: string]: string[];
  };
  tools: AssessmentTool[];
}

export interface Principle {
  title: string;
  description: string;
  keyPoints: string[];
}

export interface AssessmentTool {
  name: string;
  purpose: string;
  steps: string[];
  interpretation: string[];
} 