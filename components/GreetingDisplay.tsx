
import React from 'react';
import { GreetingInfo } from '../types';

interface GreetingDisplayProps {
  info: GreetingInfo;
}

export const GreetingDisplay: React.FC<GreetingDisplayProps> = ({ info }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-indigo-100/50 border border-white/50 backdrop-blur-sm max-w-2xl w-full mx-auto transform transition-all hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-between items-start mb-10">
        <div>
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wider uppercase rounded-lg mb-3">
            {info.language}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
            {info.translation}
          </h2>
        </div>
        <div className="text-indigo-200">
          <i className="fas fa-quote-right text-4xl opacity-50"></i>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <div>
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
            <i className="fas fa-volume-up text-indigo-400"></i>
            Pronunciation
          </h3>
          <p className="text-2xl text-slate-700 italic font-medium">
            "{info.pronunciation}"
          </p>
        </div>

        <div className="h-px bg-slate-100 w-full"></div>

        <div>
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
            <i className="fas fa-lightbulb text-amber-400"></i>
            Linguistic Insight
          </h3>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <p className="text-slate-600 leading-relaxed text-lg italic">
              {info.funFact}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-end">
        <button className="text-slate-400 hover:text-indigo-600 transition-colors p-2">
          <i className="fas fa-share-nodes text-lg"></i>
        </button>
      </div>
    </div>
  );
};
