
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { SPANISH_LEVEL_OPTIONS, LEARNING_STYLE_OPTIONS } from '../constants';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface ProfileFormProps {
  initialProfile: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile, onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleChange = <T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,>(
    e: React.ChangeEvent<T>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const formRowClasses = "grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-4";
  const labelClasses = "text-slate-400 font-medium pt-2 text-sm md:text-right";
  const inputContainerClasses = "md:col-span-3";
  const baseInputClasses = "w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-slate-500";
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={formRowClasses}>
        <label htmlFor="age" className={labelClasses}>Edad</label>
        <div className={inputContainerClasses}>
            <input type="number" id="age" name="age" value={profile.age} onChange={handleChange} className={baseInputClasses} required />
        </div>
      </div>
      
      <div className={formRowClasses}>
        <label htmlFor="level" className={labelClasses}>Nivel de Español</label>
         <div className={inputContainerClasses}>
            <select id="level" name="level" value={profile.level} onChange={handleChange} className={baseInputClasses} required>
                {SPANISH_LEVEL_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
      </div>

       <div className={formRowClasses}>
        <label htmlFor="style" className={labelClasses}>Estilo de Aprendizaje</label>
         <div className={inputContainerClasses}>
            <select id="style" name="style" value={profile.style} onChange={handleChange} className={baseInputClasses} required>
                 {LEARNING_STYLE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
      </div>

      <div className={formRowClasses}>
        <label htmlFor="interests" className={labelClasses}>Intereses y Hobbies</label>
         <div className={inputContainerClasses}>
            <textarea id="interests" name="interests" value={profile.interests} onChange={handleChange} className={`${baseInputClasses} h-24`} required />
        </div>
      </div>

       <div className={formRowClasses}>
        <label htmlFor="difficulties" className={labelClasses}>Dificultades</label>
         <div className={inputContainerClasses}>
            <textarea id="difficulties" name="difficulties" value={profile.difficulties} onChange={handleChange} className={`${baseInputClasses} h-24`} required />
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-3 px-8 py-3 font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? 'Generando...' : 'Activar Botón Mágico'}
          {!isLoading && <MagicWandIcon className="h-5 w-5" />}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
