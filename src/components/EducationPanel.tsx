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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Trading Education Hub
          </CardTitle>
          <CardDescription>
            Learn the basics of safe trading before you start. Knowledge is your best protection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              Start with paper trading (virtual money) to practice without risk. Only trade with real money when you understand the basics.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="basics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basics">Trading Basics</TabsTrigger>
          <TabsTrigger value="paper-trading">Why Paper Trading</TabsTrigger>
          <TabsTrigger value="safety">Stay Safe</TabsTrigger>
          <TabsTrigger value="platform">Using This App</TabsTrigger>
          <TabsTrigger value="glossary">Key Terms</TabsTrigger>
        </TabsList>

        {/* Trading Basics */}
        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                What is Stock Trading?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Buying Stocks</h4>
                  <p className="text-sm text-muted-foreground">
                    When you buy stock, you own a tiny piece of a company. If the company does well, your stock value goes up. If it struggles, the value goes down.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Making Money</h4>
                  <p className="text-sm text-muted-foreground">
                    You make money by selling stocks for more than you paid. You lose money if you sell for less than you paid.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">The Golden Rule</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Never invest money you can't afford to lose.</strong> Stock prices can go down as well as up.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Why Paper Trading Matters */}
        <TabsContent value="paper-trading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-green-600" />
                Why Paper Trading Matters
              </CardTitle>
              <CardDescription>
                Learn why practicing with virtual money is the smartest way to start your trading journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Learn Without Risk</h4>
                  <p className="text-sm text-blue-700">
                    Paper trading lets you practice buying and selling stocks with virtual money. You can make mistakes and learn from them without losing real money.
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Build Confidence</h4>
                  <p className="text-sm text-green-700">
                    As you practice and see your virtual portfolio grow, you'll gain confidence in your trading decisions before using real money.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Test Your Strategy</h4>
                  <p className="text-sm text-purple-700">
                    Try different trading approaches and see what works best for you. This helps you find your trading style safely.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Understand Market Emotions</h4>
                  <p className="text-sm text-orange-700">
                    Even with fake money, you'll experience the emotions of winning and losing trades. This prepares you for real trading psychology.
                  </p>
                </div>
              </div>
              
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Important:</strong> Most successful traders recommend practicing for at least 3-6 months with paper trading before using real money. There's no rush - take your time to learn.
                </AlertDescription>
              </Alert>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Getting Started with Paper Trading</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                How to Trade Safely
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Start Small</h4>
                    <p className="text-sm text-green-700">Begin with small amounts until you understand how trading works.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Set Limits</h4>
                    <p className="text-sm text-green-700">Decide how much you're willing to lose before you start trading.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Stick to Known Companies</h4>
                    <p className="text-sm text-green-700">Trade stocks of companies you know and understand.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">Avoid These Mistakes</h4>
                    <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                How to Use This Trading App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50">Step 1</Badge>
                    <h4 className="font-medium">Start with Paper Trading</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Go to the "Paper Trading" tab to practice with virtual money. This is completely safe and helps you learn.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50">Step 2</Badge>
                    <h4 className="font-medium">Set Your Risk Controls</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Visit "Risk Controls" to set limits on how much you can trade. These protect you from big losses.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50">Step 3</Badge>
                    <h4 className="font-medium">Watch the Market</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Check the "Overview" tab to see how different stocks are performing before making decisions.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-50">Step 4</Badge>
                    <h4 className="font-medium">Start Trading (When Ready)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Only trade with real money after you're comfortable with paper trading and understand the risks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Glossary */}
        <TabsContent value="glossary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
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
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-0.5">{item.term}</Badge>
                      <p className="text-sm text-muted-foreground flex-1">{item.definition}</p>
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
