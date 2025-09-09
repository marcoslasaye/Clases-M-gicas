
export enum SpanishLevel {
  A1 = "Básico (A1)",
  A2 = "Intermedio (A2)",
  B1 = "Intermedio (B1)",
  B2 = "Intermedio-Avanzado (B2)",
  C1 = "Avanzado (C1)",
  C2 = "Nativo/C2",
}

export enum LearningStyle {
  VISUAL = "Visual",
  AUDITORY = "Auditivo",
  KINESTHETIC = "Kinestésico",
  LINGUISTIC = "Lingüístico",
  MUSICAL = "Musical",
  INTERPERSONAL = "Interpersonal",
}

export interface UserProfile {
  age: string;
  level: SpanishLevel;
  interests: string;
  difficulties: string;
  style: LearningStyle;
}

export interface Activity {
  activity: string;
  duration: number;
  skills: string[];
}

export interface ClassIdea {
  title: string;
  description: string;
  activities: Activity[];
  resources: string[];
}
