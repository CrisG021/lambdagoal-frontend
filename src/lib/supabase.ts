// Local: src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhlpnqxczihwhuufcdgp.supabase.co'; // Pegue no painel do Supabase
const supabaseAnonKey = 'sb_publishable_Bqk3oak-rJSN7yop3_viHQ_aDW1yjGL';    // Pegue no painel do Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);