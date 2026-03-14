'use client';

interface SignalProps {
  game: {
    match_id?: string;
    model_over_2_5_prob?: number;
    home_team?: string; // Caso adicione o nome da equipa depois
    away_team?: string;
  };
}

export default function SignalCard({ game }: SignalProps) {
  // Tradução dos dados técnicos para o dashboard
  const probOver = game.model_over_2_5_prob ? (game.model_over_2_5_prob * 100).toFixed(1) : "0.0";
  const edge = (parseFloat(probOver) - 52.5).toFixed(1); // Exemplo de cálculo de valor (Edge)
  
  // Identificador Curto para o match_id
  const matchIdShort = game.match_id ? game.match_id.substring(0, 8) : "ID Desconhecido";

  return (
    <div className="bg-[#0a0a0a] border border-slate-800 border-l-4 border-l-green-500 p-5 mb-4 rounded-r-lg shadow-2xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-black text-sm tracking-widest uppercase">
            {game.home_team || "MATCH"} VS {game.away_team || matchIdShort}
          </h3>
          <p className="text-slate-600 text-[9px] mt-1 font-mono">UUID: {game.match_id}</p>
        </div>
        <div className="text-right">
          <span className="text-green-500 font-mono font-bold text-xs">+{edge}% ALPHA EDGE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-slate-900 pt-4">
        <div>
          <p className="text-slate-500 text-[9px] uppercase">Prob. Over 2.5</p>
          <p className="text-white font-mono font-bold">{probOver}%</p>
        </div>
        <div>
          <p className="text-slate-500 text-[9px] uppercase">Veredito</p>
          <p className={`text-[10px] font-black ${parseFloat(probOver) > 60 ? 'text-green-400' : 'text-yellow-500'}`}>
            {parseFloat(probOver) > 60 ? '🚀 EXECUTAR' : '⚠️ CAUTELA'}
          </p>
        </div>
        <div className="flex items-end">
          <a 
            href="https://www.premierbet.co.ao/" 
            target="_blank" 
            className="w-full bg-green-600 hover:bg-green-500 text-black text-center py-1.5 rounded text-[10px] font-black transition-all"
          >
            BET NOW
          </a>
        </div>
      </div>
    </div>
  );
}