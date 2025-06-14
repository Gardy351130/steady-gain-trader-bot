
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Target,
  Lightbulb,
  CheckCircle,
  PlayCircle
} from "lucide-react";

export function EducationPanel() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-500" />
            Trading Education Hub
          </CardTitle>
          <CardDescription>
            Learn the basics of safe trading before you start. Knowledge is your best protection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="border-slate-200 bg-slate-50">
            <Lightbulb className="h-4 w-4 text-slate-600" />
            <AlertDescription className="text-slate-700">
              Start with paper trading (virtual money) to practice without risk. Only trade with real money when you understand the basics.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="basics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50">
          <TabsTrigger value="basics" className="text-sm">Trading Basics</TabsTrigger>
          <TabsTrigger value="paper-trading" className="text-sm">Why Paper Trading</TabsTrigger>
          <TabsTrigger value="safety" className="text-sm">Stay Safe</TabsTrigger>
          <TabsTrigger value="platform" className="text-sm">Using This App</TabsTrigger>
          <TabsTrigger value="glossary" className="text-sm">Key Terms</TabsTrigger>
        </TabsList>

        {/* Trading Basics */}
        <TabsContent value="basics" className="space-y-4">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-slate-500" />
                What is Stock Trading?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <h4 className="font-medium mb-2 text-slate-700">Buying Stocks</h4>
                  <p className="text-sm text-slate-600">
                    When you buy stock, you own a tiny piece of a company. If the company does well, your stock value goes up. If it struggles, the value goes down.
                  </p>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <h4 className="font-medium mb-2 text-slate-700">Making Money</h4>
                  <p className="text-sm text-slate-600">
                    You make money by selling stocks for more than you paid. You lose money if you sell for less than you paid.
                  </p>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <h4 className="font-medium mb-2 text-slate-700">The Golden Rule</h4>
                  <p className="text-sm text-slate-600">
                    <strong>Never invest money you can't afford to lose.</strong> Stock prices can go down as well as up.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Why Paper Trading Matters */}
        <TabsContent value="paper-trading" className="space-y-4">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-emerald-400" />
                Why Paper Trading Matters
              </CardTitle>
              <CardDescription>
                Learn why practicing with virtual money is the smartest way to start your trading journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 soft-blue border border-blue-100 rounded-lg">
                  <h4 className="font-medium mb-2">Learn Without Risk</h4>
                  <p className="text-sm">
                    Paper trading lets you practice buying and selling stocks with virtual money. You can make mistakes and learn from them without losing real money.
                  </p>
                </div>
                <div className="p-3 soft-green border border-emerald-100 rounded-lg">
                  <h4 className="font-medium mb-2">Build Confidence</h4>
                  <p className="text-sm">
                    As you practice and see your virtual portfolio grow, you'll gain confidence in your trading decisions before using real money.
                  </p>
                </div>
                <div className="p-3 soft-purple border border-purple-100 rounded-lg">
                  <h4 className="font-medium mb-2">Test Your Strategy</h4>
                  <p className="text-sm">
                    Try different trading approaches and see what works best for you. This helps you find your trading style safely.
                  </p>
                </div>
                <div className="p-3 soft-orange border border-orange-100 rounded-lg">
                  <h4 className="font-medium mb-2">Understand Market Emotions</h4>
                  <p className="text-sm">
                    Even with fake money, you'll experience the emotions of winning and losing trades. This prepares you for real trading psychology.
                  </p>
                </div>
              </div>
              
              <Alert className="soft-yellow border-amber-100">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription>
                  <strong>Important:</strong> Most successful traders recommend practicing for at least 3-6 months with paper trading before using real money. There's no rush - take your time to learn.
                </AlertDescription>
              </Alert>

              <div className="mt-4 p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                <h4 className="font-medium mb-2 text-slate-700">Getting Started with Paper Trading</h4>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Go to the "Paper Trading" tab in this app</li>
                  <li>Start with the virtual $100,000 we give you</li>
                  <li>Practice buying and selling stocks you know</li>
                  <li>Track your wins and losses</li>
                  <li>Only move to real money when you're consistently profitable</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety */}
        <TabsContent value="safety" className="space-y-4">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                How to Trade Safely
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 soft-green border border-emerald-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Start Small</h4>
                    <p className="text-sm">Begin with small amounts until you understand how trading works.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 soft-green border border-emerald-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Set Limits</h4>
                    <p className="text-sm">Decide how much you're willing to lose before you start trading.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 soft-green border border-emerald-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Stick to Known Companies</h4>
                    <p className="text-sm">Trade stocks of companies you know and understand.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 soft-red border border-red-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Avoid These Mistakes</h4>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Don't invest borrowed money</li>
                      <li>Don't put all your money in one stock</li>
                      <li>Don't make emotional decisions</li>
                      <li>Don't chase quick profits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Guide */}
        <TabsContent value="platform" className="space-y-4">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-slate-500" />
                How to Use This Trading App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="soft-blue border-blue-200">Step 1</Badge>
                    <h4 className="font-medium text-slate-700">Start with Paper Trading</h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Go to the "Paper Trading" tab to practice with virtual money. This is completely safe and helps you learn.
                  </p>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="soft-blue border-blue-200">Step 2</Badge>
                    <h4 className="font-medium text-slate-700">Set Your Risk Controls</h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Visit "Risk Controls" to set limits on how much you can trade. These protect you from big losses.
                  </p>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="soft-blue border-blue-200">Step 3</Badge>
                    <h4 className="font-medium text-slate-700">Watch the Market</h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Check the "Overview" tab to see how different stocks are performing before making decisions.
                  </p>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="soft-green border-emerald-200">Step 4</Badge>
                    <h4 className="font-medium text-slate-700">Start Trading (When Ready)</h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Only trade with real money after you're comfortable with paper trading and understand the risks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Glossary */}
        <TabsContent value="glossary" className="space-y-4">
          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-slate-500" />
                Trading Terms You Should Know
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {[
                  { term: "Stock", definition: "A share of ownership in a company" },
                  { term: "Buy", definition: "Purchase shares of a stock" },
                  { term: "Sell", definition: "Get rid of shares you own" },
                  { term: "Portfolio", definition: "All the stocks you currently own" },
                  { term: "P&L (Profit & Loss)", definition: "How much money you've made or lost" },
                  { term: "ETF", definition: "A fund that holds many different stocks (safer than individual stocks)" },
                  { term: "Stop Loss", definition: "Automatically sell if a stock drops too much" },
                  { term: "Position Size", definition: "How much money you put into one stock" },
                  { term: "Paper Trading", definition: "Practice trading with fake money" },
                  { term: "Risk Controls", definition: "Limits that protect you from losing too much money" }
                ].map((item, index) => (
                  <div key={index} className="p-3 border border-slate-200 rounded-lg bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5 border-slate-300 text-slate-600">{item.term}</Badge>
                      <p className="text-sm text-slate-600 flex-1">{item.definition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
