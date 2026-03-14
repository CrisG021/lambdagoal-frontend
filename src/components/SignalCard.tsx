'use client';

interface SignalProps {
  game: {
    match_id?: string;
    model_over_2_5_prob?: number;
    home_team?: string;
    away_team?: string;
  };
}

export default function SignalCard({ game }: SignalProps) {
  // Tratamento de dados: Se for null, exibimos "CALIBRANDO"
  const hasData = game.model_over_2_5_prob !== null && game.model_over_2_5_prob !== undefined;
  const probValue = hasData ? (game.model_over_2_5_prob as number) * 100 : 0;
  const probOver = hasData ? probValue.toFixed(1) : "---";
  
  const edgeValue = hasData ? probValue - 52.5 : -52.5;
  const edge = edgeValue.toFixed(1);
  
  return (
    <div className="group bg-[#050505] border border-slate-900 hover:border-green-500/50 transition-all duration-500 p-6 mb-4 rounded-none shadow-none relative overflow-hidden">
      {/* Indicador Lateral Alpha */}
      <div className={`absolute left-0 top-0 h-full w-1 ${hasData && probValue > 65 ? 'bg-green-500' : 'bg-slate-800'}`} />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-white font-light text-lg tracking-tighter uppercase flex items-center gap-3">
            <span className="font-black text-green-500">●</span>
            {game.home_team || "ANALISANDO"} <span className="text-slate-700 font-thin">/</span> {game.away_team || "EQUIPA"}
          </h3>
          <p className="text-slate-700 text-[8px] mt-2 font-mono tracking-widest uppercase opacity-50">NODE_ID: {game.match_id?.substring(0,18)}...</p>
        </div>
        <div className="text-right">
          <span className={`font-mono font-bold text-[10px] tracking-widest px-2 py-1 border ${parseFloat(edge) > 0 ? 'border-green-500 text-green-500' : 'border-slate-800 text-slate-600'}`}>
            {parseFloat(edge) > 0 ? `+${edge}%` : `${edge}%`} ALPHA_EDGE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="border-l border-slate-900 pl-4">
          <p className="text-slate-600 text-[8px] uppercase tracking-[0.2em] mb-1 font-bold">PROBABILITY</p>
          <p className="text-white font-mono text-xl font-light">{probOver}<span className="text-[10px] text-slate-500">%</span></p>
        </div>
        
        <div className="border-l border-slate-900 pl-4">
          <p className="text-slate-600 text-[8px] uppercase tracking-[0.2em] mb-1 font-bold">VERDICT</p>
          <p className={`text-xs font-black tracking-tighter ${hasData && probValue > 65 ? 'text-green-400' : 'text-slate-500'}`}>
            {hasData && probValue > 65 ? 'SIGNAL_ACTIVE' : 'STAND_BY'}
          </p>
        </div>

        <div className="flex items-center justify-end">
          <a 
            href="https://www.premierbet.co.ao/" 
            target="_blank" 
            className="group/btn relative px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-colors"
          >
            EXECUTE_BET
          </a>
        </div>
      </div>
    </div>
  );
}