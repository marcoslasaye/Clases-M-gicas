
import { GoogleGenAI, Type } from "@google/genai";
import type { UserProfile, ClassIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(profile: UserProfile): string {
  return `
**Rol:** Actúa como un arquitecto de software experto en diseño de aplicaciones de aprendizaje de idiomas, con un profundo conocimiento en pedagogía, gamificación y neurociencia aplicada a la educación. Tu misión es desarrollar un concepto detallado para una aplicación digital de aprendizaje de español, enfocándote en una arquitectura superoptimizada, con propuestas para un código limpio y estructurado, que no sea demasiado grande o complicada, y que esté diseñada para ser altamente atractiva y efectiva para distintos tipos de usuarios.

**Objetivo Central:** Proponer 3 ideas diferentes para clases de español de 1 hora cada una, adaptadas a un perfil de alumno específico, considerando su personalidad, gustos, dificultades y estilo de aprendizaje.

**Principios para la Generación de Ideas de Clase:**
Las 3 ideas de clase deben ser distintivas entre sí y diseñadas para:
1.  **Potenciar la Diversión y el Engagement:** Incorporar elementos de gamificación y actividades que generen curiosidad.
2.  **Ofrecer Contenido Altamente Personalizado:** Seleccionar temas y vocabulario relacionados con los intereses del alumno.
3.  **Facilitar la Memorización Efectiva:** Integrar técnicas de repetición espaciada y mnemotécnicos.
4.  **Promover la Práctica Oral y la Interacción:** Incluir role-playing, simulaciones o grabaciones.
5.  **Adaptar el Contenido al Nivel:** Asegurar que el material esté "ligeramente por encima" del nivel actual.
6.  **Fomentar la Inmersión Cultural:** Introducir el idioma en un contexto cultural auténtico.
7.  **Gestionar la "Tolerancia a la Ambigüedad":** Diseñar actividades que guíen al alumno a enfocarse en la comprensión general.

**Formato de Salida para Cada Idea de Clase (Total 3 ideas):**
*   **Título de la Clase:** (Ej., "Explora Reinos de Fantasía en Español: Tu Aventura con el Vocabulario RPG")
*   **Descripción Breve:** (Concepto, objetivos, y por qué es divertida).
*   **Actividades Propuestas (duración estimada para 1 hora):** Lista de actividades con descripción, duración en minutos, y habilidades practicadas. La suma de duraciones debe ser 60 minutos.
*   **Recursos Necesarios:** Lista de recursos.

---
**Perfil del Alumno para esta Solicitud:**

*   **Edad:** ${profile.age} años
*   **Nivel de español:** ${profile.level}
*   **Intereses y hobbies:** ${profile.interests}
*   **Dificultades de aprendizaje identificadas:** ${profile.difficulties}
*   **Estilo de aprendizaje preferido:** ${profile.style}
---

Por favor, genera las 3 ideas de clase en el formato JSON especificado.
`;
}

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "Título de la Clase",
      },
      description: {
        type: Type.STRING,
        description: "Descripción breve del concepto, objetivos y por qué es divertida.",
      },
      activities: {
        type: Type.ARRAY,
        description: "Lista de actividades propuestas para una clase de 1 hora.",
        items: {
          type: Type.OBJECT,
          properties: {
            activity: {
              type: Type.STRING,
              description: "Descripción de la actividad.",
            },
            duration: {
              type: Type.NUMBER,
              description: "Duración estimada en minutos.",
            },
            skills: {
              type: Type.ARRAY,
              description: "Habilidades lingüísticas practicadas (ej. Escuchar, Hablar, Leer, Escribir).",
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ["activity", "duration", "skills"],
        },
      },
      resources: {
        type: Type.ARRAY,
        description: "Recursos necesarios para la clase.",
        items: {
          type: Type.STRING,
        },
      },
    },
    required: ["title", "description", "activities", "resources"],
  },
};

export const generateClassIdeas = async (profile: UserProfile): Promise<ClassIdea[]> => {
  try {
    const prompt = buildPrompt(profile);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });
    
    const jsonText = response.text.trim();
    const classIdeas: ClassIdea[] = JSON.parse(jsonText);
    
    return classIdeas;
  } catch (error) {
    console.error("Error generating class ideas:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate class ideas: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating class ideas.");
  }
};
