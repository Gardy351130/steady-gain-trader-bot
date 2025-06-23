
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, ArrowLeft, Brain } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is paper trading?",
    options: [
      "Trading with real money but small amounts",
      "Trading with virtual money to practice",
      "Trading only with paper documents",
      "A type of investment in paper companies"
    ],
    correctAnswer: 1,
    explanation: "Paper trading lets you practice with virtual money, so you can learn without any financial risk."
  },
  {
    id: 2,
    question: "What should you do before investing real money?",
    options: [
      "Invest everything you have",
      "Learn and practice first",
      "Follow tips from social media",
      "Buy whatever is trending"
    ],
    correctAnswer: 1,
    explanation: "Always learn the basics and practice with paper trading before risking real money."
  },
  {
    id: 3,
    question: "What is a good rule for how much to risk on one trade?",
    options: [
      "Risk everything for maximum profit",
      "Never risk more than 1-2% of your total money",
      "Risk 50% to see big gains",
      "Risk as much as you can afford to lose"
    ],
    correctAnswer: 1,
    explanation: "Most successful traders never risk more than 1-2% of their total capital on a single trade."
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

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return "Perfect! You're ready to start practicing.";
    if (percentage >= 66) return "Great job! You have a good foundation.";
    if (percentage >= 33) return "Not bad! Some learning will help you improve.";
    return "No worries! Everyone starts somewhere. Let's learn together.";
  };

  const getRecommendation = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 66) {
      return {
        action: "Try Paper Trading",
        description: "You're ready to practice with virtual money!",
        onClick: () => navigate("/dashboard?tab=paper-trading")
      };
    } else {
      return {
        action: "Learn the Basics First",
        description: "Let's build your foundation with some quick lessons.",
        onClick: () => navigate("/dashboard?tab=education")
      };
    }
  };

  if (showResult) {
    const recommendation = getRecommendation();
    
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
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">
                You scored {score} out of {quizQuestions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {Math.round((score / quizQuestions.length) * 100)}%
                </Badge>
                <p className="mt-4 text-slate-600">{getScoreMessage()}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What you learned:</h3>
                {quizQuestions.map((question, index) => (
                  <div key={question.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      {answers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{question.question}</p>
                        <p className="text-xs text-slate-600 mt-1">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4">
                <Button 
                  onClick={recommendation.onClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {recommendation.action}
                </Button>
                <p className="text-sm text-slate-600">{recommendation.description}</p>
                
                <Button 
                  variant="outline" 
                  onClick={resetQuiz}
                  className="w-full"
                >
                  Take Quiz Again
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
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Quick Knowledge Check</CardTitle>
              <Badge variant="secondary">
                {currentQuestion + 1} of {quizQuestions.length}
              </Badge>
            </div>
            <CardDescription>
              Let's see what you already know — no pressure!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-700"
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
