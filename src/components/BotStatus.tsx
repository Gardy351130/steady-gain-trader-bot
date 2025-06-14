
import { Badge } from "@/components/ui/badge";
import { Bot, Activity, DollarSign, Zap } from "lucide-react";

export function BotStatus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span className="font-medium">Trading Bot</span>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <Activity className="mr-1 h-3 w-3" />
          Active
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Strategy</span>
          <span className="text-sm font-medium">Momentum + Mean Reversion</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Risk Level</span>
          <Badge variant="outline">Moderate</Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Max Position</span>
          <span className="text-sm font-medium">$2,500</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Stop Loss</span>
          <span className="text-sm font-medium">-2%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Take Profit</span>
          <span className="text-sm font-medium">+5%</span>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex items-center space-x-2 text-sm">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-muted-foreground">Next scan in 2 minutes</span>
        </div>
      </div>
    </div>
  );
}
