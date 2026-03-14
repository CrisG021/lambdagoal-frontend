'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SignalCard from '../components/SignalCard';

export default function Home() {
  const [sinais, setSinais] = useState<any[]>([]);

  const carregarDados = async () => {
    const { data } = await supabase
      .from('matches_with_odds')
      .select('match_id, home_team, away_team, model_over_2_5_prob, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setSinais(data);
  };

  useEffect(() => {
    carregarDados();
    const canal = supabase
      .channel('db-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'predictions' }, () => carregarDados())
      .subscribe();

    return () => { supabase.removeChannel(canal); };
  }, []);

  return (
    <main className="min-h-screen bg-[#000] p-4 sm:p-20 font-sans text-white selection:bg-green-500 selection:text-black">
      <div className="max-w-3xl mx-auto">
        <header className="mb-20">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <h1 className="text-2xl font-black tracking-tighter italic">
              LAMBDAGOAL <span className="text-green-500">ALPHA</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">Network_Online</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-700 uppercase mt-4 tracking-[0.5em] font-light">
            System Origin: Elite Digital Archaeology & Performance
          </p>
        </header>

        <section className="space-y-4">
          {sinais.length > 0 ? (
            sinais.map((jogo) => <SignalCard key={jogo.match_id} game={jogo} />)
          ) : (
            <div className="py-20 text-center border border-dashed border-slate-900">
              <p className="text-slate-800 font-mono text-[10px] uppercase tracking-widest">Scanning_Database...</p>
            </div>
          )}
        </section>

        <footer className="mt-20 pt-8 border-t border-slate-900 opacity-20 hover:opacity-100 transition-opacity">
          <p className="text-[8px] text-slate-500 font-mono text-center tracking-[0.3em] uppercase">
            Proprietary Architecture © 2026 Syndicate Alpha
          </p>
        </footer>
      </div>
    </main>
  );
}