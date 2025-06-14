
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, ShoppingCart } from "lucide-react";
import { usePaperTrading } from "@/hooks/usePaperTrading";
import { useMarketData } from "@/hooks/useMarketData";

export function PaperTradingPanel() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  
  const { portfolio, buyStock, resetPortfolio } = usePaperTrading();
  const { data: marketData } = useMarketData(['SPY', 'QQQ', 'IWM', 'AAPL', 'MSFT', 'GOOGL', 'TSLA']);

  const handleBuy = () => {
    try {
      setError('');
      const stockData = marketData?.find(stock => stock.symbol === symbol.toUpperCase());
      if (!stockData) {
        setError('Stock not found or market data unavailable');
        return;
      }
      
      buyStock(symbol.toUpperCase(), quantity, stockData.price);
      setSymbol('');
      setQuantity(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Trade failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Paper Trading Portfolio
          </CardTitle>
          <CardDescription>
            Practice trading with virtual money - No real money at risk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Available Cash</p>
              <p className="text-2xl font-bold">${portfolio.cash.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <p className="text-2xl font-bold">${portfolio.totalValue.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total P&L</p>
              <p className={`text-2xl font-bold ${portfolio.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.totalPnL >= 0 ? '+' : ''}${portfolio.totalPnL.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Place Order
          </CardTitle>
          <CardDescription>
            Buy stocks with your virtual money
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="symbol">Stock Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., AAPL"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="uppercase"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label>Current Price</Label>
              <div className="h-10 flex items-center px-3 bg-gray-50 border rounded-md">
                {symbol && marketData?.find(s => s.symbol === symbol)?.price 
                  ? `$${marketData.find(s => s.symbol === symbol)?.price.toFixed(2)}`
                  : 'Enter symbol'
                }
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleBuy} 
              disabled={!symbol || quantity < 1}
              className="flex-1"
            >
              Buy Stock
            </Button>
            <Button 
              variant="outline" 
              onClick={resetPortfolio}
            >
              Reset Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Positions */}
      {portfolio.positions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Positions</CardTitle>
            <CardDescription>Current holdings in your paper portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portfolio.positions.map((position) => (
                <div key={position.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{position.symbol}</p>
                      <p className="text-sm text-muted-foreground">
                        {position.quantity} shares @ ${position.buyPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(position.currentPrice * position.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      {position.pnl >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <Badge variant={position.pnl >= 0 ? "default" : "destructive"} className="text-xs">
                        {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
