
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, ShoppingCart, Shield } from "lucide-react";
import { usePaperTrading } from "@/hooks/usePaperTrading";
import { useMarketData } from "@/hooks/useMarketData";
import { useRiskControls } from "@/hooks/useRiskControls";
import { TradeConfirmationDialog } from "@/components/TradeConfirmationDialog";

export function PaperTradingPanel() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingTrade, setPendingTrade] = useState<{symbol: string; quantity: number; price: number} | null>(null);
  
  const { portfolio, buyStock, resetPortfolio } = usePaperTrading();
  const { data: marketData } = useMarketData(['SPY', 'QQQ', 'IWM', 'AAPL', 'MSFT', 'GOOGL', 'TSLA']);
  const { riskSettings, validateTrade, recordTrade } = useRiskControls();

  const handleBuyAttempt = () => {
    try {
      setError('');
      const stockData = marketData?.find(stock => stock.symbol === symbol.toUpperCase());
      if (!stockData) {
        setError('Stock not found or market data unavailable');
        return;
      }

      // Validate trade against risk controls
      const violations = validateTrade(symbol.toUpperCase(), quantity, stockData.price, portfolio.cash);
      
      if (riskSettings.requireConfirmation || violations.length > 0) {
        setPendingTrade({
          symbol: symbol.toUpperCase(),
          quantity,
          price: stockData.price
        });
        setShowConfirmation(true);
      } else {
        executeTrade(symbol.toUpperCase(), quantity, stockData.price);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Trade failed');
    }
  };

  const executeTrade = (tradeSymbol: string, tradeQuantity: number, tradePrice: number) => {
    try {
      buyStock(tradeSymbol, tradeQuantity, tradePrice);
      recordTrade(); // Record the trade for daily limits
      setSymbol('');
      setQuantity(1);
      setShowConfirmation(false);
      setPendingTrade(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Trade failed');
      setShowConfirmation(false);
      setPendingTrade(null);
    }
  };

  const currentPrice = symbol && marketData?.find(s => s.symbol === symbol)?.price;
  const violations = pendingTrade ? validateTrade(pendingTrade.symbol, pendingTrade.quantity, pendingTrade.price, portfolio.cash) : [];

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Paper Trading Portfolio
            <Shield className="h-4 w-4 text-green-600" />
          </CardTitle>
          <CardDescription>
            Practice trading with virtual money - Protected by risk controls
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
            Buy stocks with your virtual money (Risk controls active)
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
              {symbol && !riskSettings.allowedSymbols.includes(symbol) && (
                <p className="text-xs text-red-600">
                  This stock is not in your approved trading list
                </p>
              )}
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
                {currentPrice ? `$${currentPrice.toFixed(2)}` : 'Enter symbol'}
              </div>
            </div>
          </div>

          {/* Trade Value Warning */}
          {currentPrice && quantity > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">
                <strong>Trade Value:</strong> ${(currentPrice * quantity).toFixed(2)}
                {(currentPrice * quantity) > riskSettings.maxPositionSize && (
                  <span className="text-red-600 ml-2">
                    (Exceeds ${riskSettings.maxPositionSize} position limit)
                  </span>
                )}
              </p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              onClick={handleBuyAttempt} 
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

      {/* Trade Confirmation Dialog */}
      {pendingTrade && (
        <TradeConfirmationDialog
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          onConfirm={() => executeTrade(pendingTrade.symbol, pendingTrade.quantity, pendingTrade.price)}
          symbol={pendingTrade.symbol}
          quantity={pendingTrade.quantity}
          price={pendingTrade.price}
          violations={violations}
        />
      )}
    </div>
  );
}
