import React, { useMemo, useState } from 'react';
import { Plane, X, ShieldAlert, Users, ArrowRight } from 'lucide-react';

interface StrategicAirStrikeModalProps {
  sourceName: string;
  availableArmies: number;
  targetName: string;
  onConfirm: (committedArmies: number) => void;
  onClose: () => void;
}

export const StrategicAirStrikeModal: React.FC<StrategicAirStrikeModalProps> = ({
  sourceName,
  availableArmies,
  targetName,
  onConfirm,
  onClose
}) => {
  const [committedArmies, setCommittedArmies] = useState(Math.min(20, availableArmies));
  const operationCost = Math.floor(committedArmies / 2);
  const battleArmies = committedArmies - operationCost;
  const summary = useMemo(() => ({
    cost: operationCost,
    battle: battleArmies,
    originAfterCost: availableArmies - operationCost
  }), [availableArmies, operationCost, battleArmies]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-sky-500/30 bg-slate-900 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Plane className="w-6 h-6 text-sky-400" />
            <div>
              <h2 className="text-lg font-black text-white">Ataque Aéreo Estratégico</h2>
              <p className="text-xs text-slate-400">Defina o tamanho da operação antes da batalha.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="rounded-xl border border-sky-500/20 bg-sky-950/20 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-sky-300">Origem</p>
              <p className="mt-1 text-sm font-bold text-white">{sourceName}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500" />
            <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-red-300">Alvo</p>
              <p className="mt-1 text-sm font-bold text-white">{targetName}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">Exércitos comprometidos</span>
              <span className="text-2xl font-black font-mono text-sky-400">{committedArmies}</span>
            </div>
            <input type="range" min={20} max={availableArmies} value={committedArmies} onChange={e => setCommittedArmies(Number(e.target.value))} className="w-full accent-sky-500 cursor-pointer" />
            <div className="flex justify-between mt-1 text-[10px] text-slate-500"><span>mínimo 20</span><span>máximo {availableArmies}</span></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-3"><ShieldAlert className="w-4 h-4 mx-auto text-red-400" /><p className="text-[10px] text-slate-400 mt-1">Custo da operação</p><p className="font-black text-red-300">-{summary.cost}</p></div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3"><Users className="w-4 h-4 mx-auto text-amber-400" /><p className="text-[10px] text-slate-400 mt-1">Força de batalha</p><p className="font-black text-amber-300">{summary.battle}</p></div>
            <div className="rounded-xl border border-slate-700 bg-slate-950 p-3"><Users className="w-4 h-4 mx-auto text-slate-400" /><p className="text-[10px] text-slate-400 mt-1">Origem após custo</p><p className="font-black text-slate-200">{summary.originAfterCost}</p></div>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">A carta não garante a vitória. A força de batalha será resolvida pelos dados normais. Se você vencer, os sobreviventes ocupam o alvo. Se perder, os sobreviventes retornam à origem; o custo da operação continua perdido.</p>
          <button onClick={() => onConfirm(committedArmies)} className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black text-sm transition flex items-center justify-center gap-2"><Plane className="w-4 h-4" />Iniciar batalha</button>
        </div>
      </div>
    </div>
  );
};
