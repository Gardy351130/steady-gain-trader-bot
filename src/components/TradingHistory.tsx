
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const trades = [
  { id: 1, symbol: "AAPL", type: "BUY", quantity: 10, price: 150.25, pnl: 125.50, status: "closed", time: "2 hours ago" },
  { id: 2, symbol: "MSFT", type: "SELL", quantity: 5, price: 320.80, pnl: -45.20, status: "closed", time: "4 hours ago" },
  { id: 3, symbol: "GOOGL", type: "BUY", quantity: 3, price: 2750.00, pnl: 89.75, status: "open", time: "6 hours ago" },
  { id: 4, symbol: "TSLA", type: "BUY", quantity: 8, price: 245.60, pnl: 67.80, status: "closed", time: "1 day ago" },
  { id: 5, symbol: "NVDA", type: "SELL", quantity: 15, price: 425.30, pnl: -23.10, status: "closed", time: "1 day ago" },
];

export function TradingHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
        <CardDescription>Your latest trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {trade.type === "BUY" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium">{trade.symbol}</span>
                </div>
                <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>
                  {trade.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {trade.quantity} @ ${trade.price}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`font-medium ${trade.pnl > 0 ? "text-green-600" : "text-red-600"}`}>
                  {trade.pnl > 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                </span>
                <Badge variant={trade.status === "open" ? "outline" : "secondary"}>
                  {trade.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{trade.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
