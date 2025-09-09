
import React, { useState, useCallback } from 'react';
import type { UserProfile, ClassIdea } from './types';
import { DEFAULT_USER_PROFILE } from './constants';
import { generateClassIdeas } from './services/geminiService';
import ProfileForm from './components/ProfileForm';
import ClassIdeasDisplay from './components/ClassIdeasDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { WandSparklesIcon } from './components/icons/WandSparklesIcon';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [classIdeas, setClassIdeas] = useState<ClassIdea[] | null>(null);

  const handleGenerateIdeas = useCallback(async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setClassIdeas(null);
    try {
      const ideas = await generateClassIdeas(profile);
      setClassIdeas(ideas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <WandSparklesIcon className="h-10 w-10 text-indigo-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
              Clases Mágicas
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Genera ideas de clases de español personalizadas y divertidas con IA.
          </p>
        </header>

        <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700">
          <ProfileForm
            initialProfile={DEFAULT_USER_PROFILE}
            onSubmit={handleGenerateIdeas}
            isLoading={isLoading}
          />
        </section>

        <section className="mt-10">
          {isLoading && (
             <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
                <LoadingSpinner />
                <p className="text-lg">Creando clases mágicas...</p>
             </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p className="font-bold">¡Oh no! Algo salió mal.</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {classIdeas && <ClassIdeasDisplay ideas={classIdeas} />}
          {!isLoading && !error && !classIdeas && (
            <div className="text-center text-slate-500 py-10">
                <p>Completa el perfil y presiona el botón mágico para comenzar.</p>
            </div>
          )}
        </section>
      </main>
      <footer className="text-center mt-12 text-slate-600 text-sm">
        <p>Desarrollado con React, Tailwind CSS y la magia de Gemini AI.</p>
      </footer>
    </div>
  );
};

export default App;
