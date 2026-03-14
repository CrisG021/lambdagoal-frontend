'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SignalCard from '../components/SignalCard';

export default function Home() {
  const [sinais, setSinais] = useState<any[]>([]);

  // 1. Carrega dados da Vista Consolidada (com nomes de equipas)
  const carregarDados = async () => {
    const { data, error } = await supabase
      .from('matches_with_odds')
      .select('match_id, home_team, away_team, model_over_2_5_prob, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
      
    if (error) console.error("Erro na Arqueologia de Dados:", error);
    if (data) setSinais(data);
  };

  useEffect(() => {
    carregarDados();

    // 2. Realtime configurado para a tabela base (Update automático)
    const canal = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'predictions' },
        () => {
          carregarDados(); // Recarrega da vista quando houver novo sinal
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black p-6 sm:p-12 font-mono text-white">
      <div className="max-w-xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-black italic text-white uppercase">
            LAMBDAGOAL <span className="text-green-500">ALPHA</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase mt-2 tracking-[0.3em]">
            Elite Digital Archaeology & Performance
          </p>
        </header>

        <section className="space-y-6">
          {sinais.map((jogo) => (
            <SignalCard key={jogo.match_id} game={jogo} />
          ))}
        </section>
      </div>
    </main>
  );
}