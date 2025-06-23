
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Circle, ArrowLeft, TrendingUp, Trophy, Target } from "lucide-react";

const REQUIRED_TRADES = 5;
const STORAGE_KEY = 'paper-trading-progress';

export function PaperTradingProgress() {
  const navigate = useNavigate();
  const [completedTrades, setCompletedTrades] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, completedTrades.toString());
  }, [completedTrades]);

  const handlePaperTrade = () => {
    if (completedTrades < REQUIRED_TRADES) {
      setCompletedTrades(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCompletedTrades(0);
  };

  const handleStartRealTrading = () => {
    navigate("/dashboard?tab=paper-trading");
  };

  const progressPercentage = (completedTrades / REQUIRED_TRADES) * 100;
  const isComplete = completedTrades >= REQUIRED_TRADES;

  const getProgressMessage = () => {
    if (completedTrades === 0) {
      return "Let's start slow and steady.";
    } else if (completedTrades < REQUIRED_TRADES) {
      return "Nice one. Keep going — almost there.";
    } else {
      return "You're ready, legend. Real trading is now unlocked.";
    }
  };

  const renderCheckmarks = () => {
    return Array.from({ length: REQUIRED_TRADES }, (_, index) => (
      <div key={index} className="flex items-center justify-center">
        {index < completedTrades ? (
          <CheckCircle className="h-8 w-8 text-green-600 animate-scale-in" />
        ) : (
          <Circle className="h-8 w-8 text-gray-300" />
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="bg-white">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isComplete ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              {isComplete ? (
                <Trophy className="h-8 w-8 text-green-600" />
              ) : (
                <Target className="h-8 w-8 text-blue-600" />
              )}
            </div>
            <CardTitle className="text-2xl">Paper Trading Progress</CardTitle>
            <CardDescription className="text-lg">
              Complete 5 practice trades to unlock real trading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Progress Counter */}
            <div className="text-center">
              <p className="text-xl font-medium mb-4">
                You've completed <span className="font-bold text-blue-600">{completedTrades}</span> out of <span className="font-bold">{REQUIRED_TRADES}</span> paper trades.
              </p>
              
              {/* Progress Bar */}
              <div className="space-y-4">
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-slate-600">{Math.round(progressPercentage)}% Complete</p>
              </div>
            </div>

            {/* Visual Checkmarks */}
            <div className="flex justify-center space-x-4">
              {renderCheckmarks()}
            </div>

            {/* Progress Message */}
            <div className="text-center">
              <Badge 
                variant={isComplete ? "default" : "secondary"} 
                className={`text-lg px-4 py-2 ${
                  isComplete ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
              >
                {getProgressMessage()}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!isComplete ? (
                <Button 
                  onClick={handlePaperTrade}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  size="lg"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Make a Paper Trade
                </Button>
              ) : (
                <Button 
                  onClick={handleStartRealTrading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 animate-pulse"
                  size="lg"
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  ✅ Start Real Trading
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="w-full"
              >
                Reset Paper Progress
              </Button>
            </div>

            {/* Encouraging Footer */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-slate-600 italic">
                {isComplete 
                  ? "Congratulations! You've shown you understand the basics." 
                  : "Take your time. Each practice trade builds your confidence."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
