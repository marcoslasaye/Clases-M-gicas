
import React from 'react';
import type { ClassIdea } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { PuzzlePieceIcon } from './icons/PuzzlePieceIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';

interface ClassIdeasDisplayProps {
  ideas: ClassIdea[];
}

const ClassIdeasDisplay: React.FC<ClassIdeasDisplayProps> = ({ ideas }) => {
  return (
    <div className="space-y-8">
      {ideas.map((idea, index) => (
        <div key={index} className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 transition-all duration-300 hover:shadow-indigo-500/20 hover:border-indigo-600/50">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-indigo-400 mb-3 flex items-center gap-3">
              <BookOpenIcon className="h-7 w-7" />
              {idea.title}
            </h2>
            <p className="text-slate-400 mb-6">{idea.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <PuzzlePieceIcon className="h-5 w-5" />
                Actividades Propuestas
              </h3>
              <ul className="space-y-3">
                {idea.activities.map((activity, actIndex) => (
                  <li key={actIndex} className="bg-slate-900/50 p-3 rounded-md border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start">
                      <p className="flex-1 text-slate-300 pr-4">{activity.activity}</p>
                      <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-1 rounded">{activity.duration} min</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activity.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-xs bg-indigo-900/70 text-indigo-300 px-2 py-0.5 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <WrenchScrewdriverIcon className="h-5 w-5" />
                Recursos Necesarios
              </h3>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                {idea.resources.map((resource, resIndex) => (
                  <li key={resIndex}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassIdeasDisplay;
