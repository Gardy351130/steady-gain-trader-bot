
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, ArrowLeft, Brain, BookOpen } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is a paper trade?",
    options: [
      "A real trade using small amounts of money",
      "A test trade using fake money",
      "A type of trading report"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is a stop loss?",
    options: [
      "A limit you set to automatically sell to avoid big losses",
      "A bonus when a stock hits a high",
      "A tool to increase your trade size"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "How much should you risk on one trade?",
    options: [
      "As much as you can afford to lose",
      "No more than 1–2% of your total capital",
      "Half your account for bigger gains"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What should you do after a losing streak?",
    options: [
      "Double your trade size to win it back",
      "Take a break and review what went wrong",
      "Keep trading fast to recover"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What's the goal of GrumpyBum Steady Gain?",
    options: [
      "Make fast profits",
      "Learn slowly and protect your money",
      "Copy professional day traders"
    ],
    correctAnswer: 1
  }
];

export function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const handleLearnFirst = () => {
    navigate("/dashboard?tab=education");
  };

  const handleStartTrading = () => {
    navigate("/dashboard?tab=paper-trading");
  };

  if (showResult) {
    const passed = score >= 4;
    
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
                passed ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {passed ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-orange-600" />
                )}
              </div>
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">
                You scored {score} out of {quizQuestions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Badge 
                  variant={passed ? "default" : "secondary"} 
                  className={`text-lg px-4 py-2 ${
                    passed ? 'bg-green-600 hover:bg-green-700' : ''
                  }`}
                >
                  {passed ? '✅ Passed!' : '🔁 Try Again'}
                </Badge>
                
                {passed ? (
                  <p className="mt-4 text-slate-600 text-lg">
                    <strong>Nice work, legend.</strong> You're cleared to start trading with real money.
                  </p>
                ) : (
                  <p className="mt-4 text-slate-600 text-lg">
                    <strong>Not quite there yet.</strong> Go through the Learn section, then come back.
                  </p>
                )}
              </div>

              <div className="text-center space-y-4">
                {passed ? (
                  <Button 
                    onClick={handleStartTrading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  >
                    Start Paper Trading
                  </Button>
                ) : (
                  <Button 
                    onClick={handleLearnFirst}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learn Here First
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={resetQuiz}
                  className="w-full"
                >
                  Try Quiz Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

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
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Let's See What You Know Before You Start Trading</CardTitle>
            <CardDescription className="text-lg">
              Don't worry — this is just to make sure you're ready. You only need 4 out of 5 to pass.
            </CardDescription>
            <div className="flex items-center justify-center mt-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-6 text-center">{question.question}</h3>
              
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4 text-lg"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
