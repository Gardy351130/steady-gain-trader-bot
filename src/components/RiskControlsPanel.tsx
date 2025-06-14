
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldAlert, AlertTriangle, RefreshCw } from "lucide-react";
import { useRiskControls } from "@/hooks/useRiskControls";

export function RiskControlsPanel() {
  const { 
    riskSettings, 
    dailyTradeCount, 
    dailyLoss, 
    updateRiskSettings, 
    resetToDefaults 
  } = useRiskControls();

  return (
    <div className="space-y-6">
      {/* Risk Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Risk Protection Status
          </CardTitle>
          <CardDescription>
            Your current risk protection settings and daily usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Daily Trades Used</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{dailyTradeCount}</p>
                <Badge variant={dailyTradeCount >= riskSettings.maxDailyTrades ? "destructive" : "default"}>
                  / {riskSettings.maxDailyTrades}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Daily Loss</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-red-600">${dailyLoss.toFixed(2)}</p>
                <Badge variant={dailyLoss >= riskSettings.dailyLossLimit ? "destructive" : "default"}>
                  / ${riskSettings.dailyLossLimit}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Protection Level</p>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-green-600" />
                <p className="text-lg font-semibold text-green-600">High</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Position Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Position & Trade Limits</CardTitle>
          <CardDescription>Control how much you can trade to prevent big losses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Maximum Position Size: ${riskSettings.maxPositionSize}</Label>
            <Slider
              value={[riskSettings.maxPositionSize]}
              onValueChange={(value) => updateRiskSettings({ maxPositionSize: value[0] })}
              min={100}
              max={5000}
              step={100}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              The most money you can put into a single stock
            </p>
          </div>

          <div className="space-y-2">
            <Label>Daily Trade Limit: {riskSettings.maxDailyTrades} trades</Label>
            <Slider
              value={[riskSettings.maxDailyTrades]}
              onValueChange={(value) => updateRiskSettings({ maxDailyTrades: value[0] })}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of trades you can make per day
            </p>
          </div>

          <div className="space-y-2">
            <Label>Daily Loss Limit: ${riskSettings.dailyLossLimit}</Label>
            <Slider
              value={[riskSettings.dailyLossLimit]}
              onValueChange={(value) => updateRiskSettings({ dailyLossLimit: value[0] })}
              min={100}
              max={2000}
              step={50}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Trading stops when you lose this much in one day
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Safety Features */}
      <Card>
        <CardHeader>
          <CardTitle>Safety Features</CardTitle>
          <CardDescription>Extra protection to keep your trading safe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Trade Confirmation</Label>
              <p className="text-xs text-muted-foreground">
                Ask "Are you sure?" before every trade
              </p>
            </div>
            <Switch
              checked={riskSettings.requireConfirmation}
              onCheckedChange={(checked) => updateRiskSettings({ requireConfirmation: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Stop Loss</Label>
              <p className="text-xs text-muted-foreground">
                Automatically sell if stock drops by {riskSettings.stopLossPercent}%
              </p>
            </div>
            <Switch
              checked={riskSettings.stopLossEnabled}
              onCheckedChange={(checked) => updateRiskSettings({ stopLossEnabled: checked })}
            />
          </div>

          {riskSettings.stopLossEnabled && (
            <div className="space-y-2 ml-4">
              <Label>Stop Loss Percentage: {riskSettings.stopLossPercent}%</Label>
              <Slider
                value={[riskSettings.stopLossPercent]}
                onValueChange={(value) => updateRiskSettings({ stopLossPercent: value[0] })}
                min={5}
                max={25}
                step={1}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Allowed Stocks */}
      <Card>
        <CardHeader>
          <CardTitle>Approved Trading List</CardTitle>
          <CardDescription>
            Only these safe, well-known stocks and ETFs are allowed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {riskSettings.allowedSymbols.map((symbol) => (
              <Badge key={symbol} variant="outline" className="text-sm">
                {symbol}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600">
              These are conservative investments chosen for safety. Contact support to modify this list.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <Card>
        <CardHeader>
          <CardTitle>Reset Controls</CardTitle>
          <CardDescription>Return all settings to safe defaults</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            onClick={resetToDefaults}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Safe Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
