
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Copy, Star, Calendar, DollarSign } from "lucide-react";

const successfulTrades = [
  {
    id: 1,
    name: "AAPL Morning Breakout",
    symbol: "AAPL",
    entryPrice: 150.25,
    exitPrice: 155.75,
    profit: 550.00,
    profitPercent: 3.66,
    date: "2024-06-10",
    timeHeld: "2h 15m",
    conditions: "Market open + RSI oversold + Volume spike",
    strategy: "Momentum breakout",
    rating: 4.8
  },
  {
    id: 2,
    name: "MSFT Support Bounce",
    symbol: "MSFT",
    entryPrice: 320.80,
    exitPrice: 328.50,
    profit: 385.00,
    profitPercent: 2.40,
    date: "2024-06-08",
    timeHeld: "1h 45m",
    conditions: "Support level + Bullish divergence",
    strategy: "Support/Resistance",
    rating: 4.5
  },
  {
    id: 3,
    name: "GOOGL Earnings Play",
    symbol: "GOOGL",
    entryPrice: 2750.00,
    exitPrice: 2840.25,
    profit: 271.50,
    profitPercent: 3.28,
    date: "2024-06-05",
    timeHeld: "4h 30m",
    conditions: "Pre-earnings + Call flow + Low IV",
    strategy: "Earnings momentum",
    rating: 4.9
  },
  {
    id: 4,
    name: "TSLA Gap Fill",
    symbol: "TSLA",
    entryPrice: 245.60,
    exitPrice: 252.40,
    profit: 544.00,
    profitPercent: 2.77,
    date: "2024-06-03",
    timeHeld: "3h 20m",
    conditions: "Gap up + Volume confirmation",
    strategy: "Gap trading",
    rating: 4.2
  },
  {
    id: 5,
    name: "NVDA AI Rally",
    symbol: "NVDA",
    entryPrice: 425.30,
    exitPrice: 445.80,
    profit: 1025.00,
    profitPercent: 4.82,
    date: "2024-05-28",
    timeHeld: "6h 15m",
    conditions: "Sector rotation + News catalyst",
    strategy: "Sector momentum",
    rating: 4.7
  }
];

export function TradeTemplates() {
  const handleReplicateTrade = (trade: typeof successfulTrades[0]) => {
    console.log("Replicating trade:", trade.name);
    // This would trigger the bot to set up a similar trade
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Trade Templates</h2>
          <p className="text-muted-foreground">
            Successful trades that can be replicated to maximize winning potential
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulTrades.length}</div>
            <p className="text-xs text-muted-foreground">
              Available for replication
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87.3%</div>
            <p className="text-xs text-muted-foreground">
              When replicated
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,775.50</div>
            <p className="text-xs text-muted-foreground">
              From these templates
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Successful Trade Templates</CardTitle>
          <CardDescription>
            Click "Replicate" to set up your bot to execute similar trades when conditions match
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Strategy</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {successfulTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{trade.name}</div>
                      <div className="text-sm text-muted-foreground">{trade.conditions}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{trade.symbol}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{trade.strategy}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-green-600">+${trade.profit.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">+{trade.profitPercent}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{trade.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{trade.date}</div>
                      <div className="text-xs text-muted-foreground">{trade.timeHeld}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      onClick={() => handleReplicateTrade(trade)}
                      className="w-full"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Replicate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
