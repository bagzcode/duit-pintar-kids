
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";

const ModulePage = () => {
  const { moduleId } = useParams();
  const { modules, user, isAuthenticated, saveQuizAnswer, completeQuiz } = useAppContext();
  const navigate = useNavigate();
  const [showingResults, setShowingResults] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, user]);

  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    return <div>Module not found</div>;
  }

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    saveQuizAnswer(module.id, questionId, answerIndex);
  };

  const handleSubmitQuiz = () => {
    setShowingResults(true);
    completeQuiz(module.id);
  };

  const allQuestionsAnswered = module.quiz.questions.every(
    (q) => q.userAnswer !== undefined
  );

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg text-center">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <CheckCircle className="h-16 w-16 text-dpk-green animate-bounce-slow" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Selamat!</h1>
              <p className="text-gray-600 mb-4">
                Kamu telah menyelesaikan modul {module.title} dengan sukses!
              </p>
              
              {module.quiz.completed && (
                <div className="my-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Skor Kuis:</p>
                  <p className="text-2xl font-bold text-dpk-purple">
                    {module.quiz.score}%
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button onClick={() => navigate("/dashboard")}>
                Kembali ke Dashboard
              </Button>
            </CardFooter>
          </Card>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="dpk-container py-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
          </Button>
          
          <h1 className="text-3xl font-bold mb-6">{module.title}</h1>
          
          {/* Video Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Video Edukasi</h2>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-gray-500">
                  Video pembelajaran tentang {module.title.toLowerCase()}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  (Placeholder untuk video pembelajaran)
                </p>
              </div>
            </div>
          </div>
          
          {/* Quiz Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Kuis Interaktif</h2>
            <p className="text-gray-600 mb-6">
              Jawab pertanyaan berikut untuk menguji pemahamanmu!
            </p>
            
            <div className="space-y-6">
              {module.quiz.questions.map((question, qIndex) => (
                <Card key={question.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <p className="font-medium mb-4">
                      {qIndex + 1}. {question.text}
                    </p>
                    
                    <RadioGroup
                      value={
                        question.userAnswer !== undefined
                          ? question.userAnswer.toString()
                          : undefined
                      }
                      onValueChange={(value) =>
                        handleAnswerChange(question.id, parseInt(value))
                      }
                      className="space-y-3"
                      disabled={showingResults}
                    >
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 rounded-lg border p-4 ${
                            showingResults &&
                            question.userAnswer === index &&
                            question.correctAnswer === index
                              ? "bg-green-50 border-green-200"
                              : showingResults &&
                                question.userAnswer === index &&
                                question.correctAnswer !== index
                              ? "bg-red-50 border-red-200"
                              : showingResults && question.correctAnswer === index
                              ? "bg-green-50 border-green-200"
                              : ""
                          }`}
                        >
                          <RadioGroupItem
                            value={index.toString()}
                            id={`q${question.id}_${index}`}
                          />
                          <Label
                            htmlFor={`q${question.id}_${index}`}
                            className="w-full cursor-pointer"
                          >
                            {option}
                          </Label>
                          {showingResults && question.correctAnswer === index && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              {!showingResults ? (
                <Button
                  disabled={!allQuestionsAnswered}
                  onClick={handleSubmitQuiz}
                  size="lg"
                >
                  Selesaikan Kuis
                </Button>
              ) : (
                <Button
                  onClick={() => setCompleted(true)}
                  size="lg"
                >
                  Lihat Hasil
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ModulePage;
