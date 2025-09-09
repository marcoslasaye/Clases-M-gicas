
import { SpanishLevel, LearningStyle } from './types';

export const SPANISH_LEVEL_OPTIONS: { value: SpanishLevel; label: string }[] = [
  { value: SpanishLevel.A1, label: "Básico (A1)" },
  { value: SpanishLevel.A2, label: "Intermedio (A2)" },
  { value: SpanishLevel.B1, label: "Intermedio (B1)" },
  { value: SpanishLevel.B2, label: "Intermedio-Avanzado (B2)" },
  { value: SpanishLevel.C1, label: "Avanzado (C1)" },
  { value: SpanishLevel.C2, label: "Nativo/C2" },
];

export const LEARNING_STYLE_OPTIONS: { value: LearningStyle; label: string }[] = [
  { value: LearningStyle.VISUAL, label: "Visual" },
  { value: LearningStyle.AUDITORY, label: "Auditivo" },
  { value: LearningStyle.KINESTHETIC, label: "Kinestésico" },
  { value: LearningStyle.LINGUISTIC, label: "Lingüístico" },
  { value: LearningStyle.MUSICAL, label: "Musical" },
  { value: LearningStyle.INTERPERSONAL, label: "Interpersonal" },
];

export const DEFAULT_USER_PROFILE: import('./types').UserProfile = {
    age: "15",
    level: SpanishLevel.A1,
    interests: "Videojuegos (especialmente RPG de fantasía como Genshin Impact), anime (shonen como Boku no Hero Academia), música pop (k-pop y latina), TikTok.",
    difficulties: "Problemas de atención y concentración (TDAH), se aburre fácilmente con clases tradicionales (libros de texto), le cuesta memorizar vocabulario nuevo si no es relevante.",
    style: LearningStyle.VISUAL,
};
