
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TestTube, BookOpen, Brain } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  const handlePaperTrading = () => {
    navigate("/dashboard?tab=paper-trading");
  };

  const handleLearnFirst = () => {
    navigate("/dashboard?tab=education");
  };

  const handleQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
            🧠 Welcome to GrumpyBum — The Safe Place to Learn Trading
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            No hype. No pressure. Learn at your own pace, and trade when you're ready.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid gap-6 w-full max-w-4xl md:grid-cols-3">
          {/* Paper Trading Card */}
          <Card 
            className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white border-2 hover:border-blue-200"
            onClick={handlePaperTrading}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <TestTube className="h-8 w-8 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800">🧪 Try Paper Trading</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Practice with fake money first — no risks, just learning.
                </p>
              </div>
              <Button 
                onClick={handlePaperTrading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
              >
                Start Practicing
              </Button>
            </div>
          </Card>

          {/* Learn First Card */}
          <Card 
            className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white border-2 hover:border-green-200"
            onClick={handleLearnFirst}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800">📘 Learn Here First</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Short tutorials to explain how all this works.
                </p>
              </div>
              <Button 
                onClick={handleLearnFirst}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3"
              >
                Start Learning
              </Button>
            </div>
          </Card>

          {/* Quiz Card */}
          <Card 
            className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white border-2 hover:border-purple-200"
            onClick={handleQuiz}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800">🧠 Take the Quiz</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Let's see what you already know — it only takes 1 minute.
                </p>
              </div>
              <Button 
                onClick={handleQuiz}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3"
              >
                Take Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 px-4">
        <p className="text-slate-500 text-sm italic">
          "This isn't about getting rich. It's about getting smart."
        </p>
      </footer>
    </div>
  );
}
