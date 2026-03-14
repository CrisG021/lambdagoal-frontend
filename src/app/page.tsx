'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SignalCard from '../components/SignalCard';

export default function Home() {
  const [sinais, setSinais] = useState<any[]>([]);

  // 1. Função para carregar dados iniciais
  const carregarDados = async () => {
    const { data } = await supabase
      .from('predictions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setSinais(data);
  };

  useEffect(() => {
    carregarDados();

    // 2. GATILHO REALTIME: Ouve a tabela e atualiza o ecrã instantaneamente
    const canal = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'predictions' },
        (payload) => {
          console.log('Novo sinal recebido!', payload.new);
          setSinais((prev) => [payload.new, ...prev]); // Adiciona o novo sinal no topo
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
          <h1 className="text-3xl font-black italic">LAMBDAGOAL <span className="text-green-500">ALPHA</span></h1>
          <p className="text-[10px] text-slate-500 uppercase mt-2">Streaming Live Predictions</p>
        </header>

        <section className="space-y-6">
          {sinais.map((jogo, i) => (
            <SignalCard key={jogo.id || i} game={jogo} />
          ))}
        </section>
      </div>
    </main>
  );
}