
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TestTube, BookOpen, Brain } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          🧠 Welcome to GrumpyBum — The Safe Place to Learn Trading
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          No hype. No pressure. Learn at your own pace, and trade when you're ready.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="grid gap-6 md:gap-8 max-w-4xl w-full md:grid-cols-3">
          {/* Try Paper Trading */}
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" 
                onClick={() => navigate("/paper-progress")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <TestTube className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">🧪 Try Paper Trading</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Practice with fake money first — no risks, just learning.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Learn Here First */}
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" 
                onClick={() => navigate("/dashboard?tab=education")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">📘 Learn Here First</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Short tutorials to explain how all this works.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Take the Quiz */}
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group" 
                onClick={() => navigate("/quiz")}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">🧠 Take the Quiz</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Let's see what you already know — it only takes 1 minute.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-12 px-4">
        <p className="text-lg text-slate-600 italic">
          "This isn't about getting rich. It's about getting smart."
        </p>
      </div>
    </div>
  );
}
