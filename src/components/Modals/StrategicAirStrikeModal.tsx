import React from 'react';
import { Plane, X, AlertTriangle, Target } from 'lucide-react';
import type { Player, Territory } from '../../types/war';

interface Props {
  isOpen: boolean;
  player: Player;
  source: Territory | null;
  target: Territory | null;
  onClose: () => void;
  onConfirm: (committed: number) => void;
}

export default function StrategicAirStrikeModal({ isOpen, player, source, target, onClose, onConfirm }: Props) {
  const [committed, setCommitted] = React.useState(20);
  React.useEffect(() => { if (isOpen) setCommitted(20); }, [isOpen]);
  if (!isOpen || !source || !target) return null;
  const operationCost = Math.floor(committed / 2);
  const battleForce = committed - operationCost;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3"><Plane className="text-cyan-400"/><h2 className="text-xl font-bold">Ataque Aéreo Estratégico</h2></div>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="space-y-3 text-sm">
          <p><b>Origem:</b> {source.name} ({source.armies} exércitos)</p>
          <p><b>Alvo:</b> {target.name} ({target.armies} exércitos)</p>
          <div className="rounded-lg bg-slate-800 p-4"><div className="flex items-center gap-2"><Target className="h-4 w-4"/> Escolha de 20 até {source.armies} exércitos.</div></div>
          <input type="range" min={20} max={source.armies} value={committed} onChange={e => setCommitted(Number(e.target.value))} className="w-full" />
          <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-red-950/40 p-3"><div>Custo da operação</div><strong>{operationCost}</strong></div><div className="rounded-lg bg-emerald-950/40 p-3"><div>Força na batalha</div><strong>{battleForce}</strong></div></div>
          <div className="flex gap-2 rounded-lg bg-amber-950/40 p-3 text-amber-200"><AlertTriangle className="h-5 w-5 shrink-0"/> A carta não garante a vitória. A batalha usa as regras normais de dados.</div>
        </div>
        <div className="mt-6 flex justify-end gap-3"><button onClick={onClose} className="rounded-lg px-4 py-2 bg-slate-700">Cancelar</button><button onClick={() => onConfirm(committed)} className="rounded-lg px-4 py-2 bg-cyan-600 font-bold">Iniciar ataque</button></div>
      </div>
    </div>
  );
}
