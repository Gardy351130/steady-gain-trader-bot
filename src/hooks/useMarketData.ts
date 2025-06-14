
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

// Check if Supabase credentials are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export interface MarketDataItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const fetchMarketData = async (symbols: string[]): Promise<MarketDataItem[]> => {
  console.log('Fetching market data for symbols:', symbols);
  
  if (!supabase) {
    console.warn('Supabase not configured - using mock data');
    // Return mock data when Supabase is not available
    return symbols.map(symbol => ({
      symbol,
      price: Math.random() * 500 + 100,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 10
    }));
  }

  const { data, error } = await supabase.functions.invoke('fetch-market-data', {
    body: { symbols }
  });

  if (error) {
    console.error('Supabase function error:', error);
    throw new Error(`Failed to fetch market data: ${error.message}`);
  }

  console.log('Market data response:', data);
  return data.data || [];
};

export const useMarketData = (symbols: string[]) => {
  return useQuery({
    queryKey: ['market-data', symbols],
    queryFn: () => fetchMarketData(symbols),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
};
