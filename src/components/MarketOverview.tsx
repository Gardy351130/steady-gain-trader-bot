
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const marketData = [
  { symbol: "SPY", price: 445.67, change: 2.34, changePercent: 0.53 },
  { symbol: "QQQ", price: 378.92, change: -1.45, changePercent: -0.38 },
  { symbol: "IWM", price: 198.34, change: 0.87, changePercent: 0.44 },
  { symbol: "VIX", price: 18.23, change: -0.92, changePercent: -4.82 },
];

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {marketData.map((item) => (
            <div key={item.symbol} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{item.symbol}</span>
                {item.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">${item.price}</div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${item.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}
                  </span>
                  <Badge variant={item.changePercent > 0 ? "default" : "destructive"} className="text-xs">
                    {item.changePercent > 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
