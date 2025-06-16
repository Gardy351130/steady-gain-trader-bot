import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, DollarSign, Bot, BarChart3, Play, Pause, Smartphone, Monitor, Tablet } from "lucide-react";
import { PerformanceChart } from "@/components/PerformanceChart";
import { TradingHistory } from "@/components/TradingHistory";
import { BotStatus } from "@/components/BotStatus";
import { MarketOverview } from "@/components/MarketOverview";
import { TradeTemplates } from "@/components/TradeTemplates";
import { PaperTradingPanel } from "@/components/PaperTradingPanel";
import { RiskControlsPanel } from "@/components/RiskControlsPanel";
import { EducationPanel } from "@/components/EducationPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export function TradingDashboard() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("education");
  
  const switchToPaperTrading = () => {
    setActiveTab("paper-trading");
  };
  
  return (
    <div className="flex-1 space-y-4 p-2 pt-4 md:p-4 md:pt-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Trading Dashboard</h2>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Monitor className="h-4 w-4" />
            <span>Works on all devices</span>
            <Smartphone className="h-4 w-4" />
            <Tablet className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="touch-manipulation">
            <Pause className="mr-2 h-4 w-4" />
            Pause Bot
          </Button>
          <Button size={isMobile ? "sm" : "default"} className="touch-manipulation">
            <Play className="mr-2 h-4 w-4" />
            Start Bot
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 h-auto gap-1' : 'grid-cols-4 lg:grid-cols-8'}`}>
          <TabsTrigger value="education" className="text-xs sm:text-sm touch-manipulation">
            {isMobile ? "Learn" : "Learn to Trade"}
          </TabsTrigger>
          <TabsTrigger value="overview" className="text-xs sm:text-sm touch-manipulation">
            Overview
          </TabsTrigger>
          <TabsTrigger value="paper-trading" className="text-xs sm:text-sm touch-manipulation">
            {isMobile ? "Paper" : "Paper Trading"}
          </TabsTrigger>
          <TabsTrigger value="risk-controls" className="text-xs sm:text-sm touch-manipulation">
            {isMobile ? "Risk" : "Risk Controls"}
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm touch-manipulation">
            {isMobile ? "Chart" : "Performance"}
          </TabsTrigger>
          <TabsTrigger value="trades" className="text-xs sm:text-sm touch-manipulation">
            {isMobile ? "History" : "Trade History"}
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-xs sm:text-sm touch-manipulation">
            Templates
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm touch-manipulation">
            {isMobile ? "Bot" : "Bot Settings"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="education" className="space-y-4">
          <EducationPanel onSwitchToPaperTrading={switchToPaperTrading} />
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="touch-manipulation">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">$12,234.56</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="touch-manipulation">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's P&L</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-green-600">+$156.78</div>
                <p className="text-xs text-muted-foreground">
                  +1.3% from yesterday
                </p>
              </CardContent>
            </Card>
            
            <Card className="touch-manipulation">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">
                  3 winning, 4 pending
                </p>
              </CardContent>
            </Card>
            
            <Card className="touch-manipulation">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold">73.2%</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <PerformanceChart />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Bot Status</CardTitle>
                <CardDescription>
                  Current trading bot configuration and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BotStatus />
              </CardContent>
            </Card>
          </div>
          
          <MarketOverview />
        </TabsContent>
        
        <TabsContent value="paper-trading">
          <PaperTradingPanel />
        </TabsContent>
        
        <TabsContent value="risk-controls">
          <RiskControlsPanel />
        </TabsContent>
        
        <TabsContent value="performance">
          <PerformanceChart />
        </TabsContent>
        
        <TabsContent value="trades">
          <TradingHistory />
        </TabsContent>
        
        <TabsContent value="templates">
          <TradeTemplates />
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Bot Configuration</CardTitle>
              <CardDescription>Configure your trading bot settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Bot settings panel coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
