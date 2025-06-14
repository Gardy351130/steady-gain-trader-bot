
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface MarketDataItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const fetchMarketData = async (symbols: string[]): Promise<MarketDataItem[]> => {
  console.log('Fetching market data for symbols:', symbols);
  
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
