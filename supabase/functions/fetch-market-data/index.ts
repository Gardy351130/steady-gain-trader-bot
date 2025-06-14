
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { symbols } = await req.json()
    const apiKey = Deno.env.get('ALPHA_VANTAGE_API_KEY')
    
    if (!apiKey) {
      throw new Error('Alpha Vantage API key not configured')
    }

    const marketData = await Promise.all(
      symbols.map(async (symbol: string) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        )
        
        const data = await response.json()
        const quote = data['Global Quote']
        
        if (!quote) {
          console.error(`No data for symbol: ${symbol}`)
          return null
        }

        return {
          symbol,
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
        }
      })
    )

    return new Response(
      JSON.stringify({ data: marketData.filter(Boolean) }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error fetching market data:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    )
  }
})
