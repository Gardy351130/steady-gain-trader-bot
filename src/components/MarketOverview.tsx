
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Loader2, AlertCircle } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";

const DEFAULT_SYMBOLS = ["SPY", "QQQ", "IWM", "VIX"];

export function MarketOverview() {
  const { data: marketData, isLoading, error } = useMarketData(DEFAULT_SYMBOLS);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading market data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <span className="ml-2">Failed to load market data. Please check your API configuration.</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {marketData?.map((item) => (
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
                <div className="text-2xl font-bold">${item.price.toFixed(2)}</div>
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
