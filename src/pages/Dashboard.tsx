
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Dashboard = () => {
  const { user, isAuthenticated, modules } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const { progress, savingsGoal, badges } = user;
  const savingsProgress = Math.round(
    (savingsGoal.currentAmount / savingsGoal.targetAmount) * 100
  );
  
  const firstIncompleteModule = modules.find(module => !module.completed);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gray-50 py-8">
          <div className="dpk-container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl md:text-4xl font-bold">
                Halo, <span className="text-dpk-purple">{user.name}</span>!
              </h1>
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
                <Award className="text-yellow-500 h-5 w-5" />
                <span className="font-semibold">{user.points} Poin</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="dpk-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Progress Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-dpk-blue" />
                    Progress Belajar
                  </CardTitle>
                  <CardDescription>
                    Lanjutkan belajarmu untuk mendapatkan lebih banyak poin dan badge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {modules.map((module) => (
                      <Link
                        to={`/module/${module.id}`}
                        key={module.id}
                        className={`p-4 rounded-lg border ${
                          module.completed
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-white"
                        } hover:shadow-md transition-all`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{module.title}</h3>
                          {module.completed && (
                            <span className="text-green-500 text-xs">✓ Selesai</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{module.description}</p>
                      </Link>
                    ))}
                  </div>

                  {firstIncompleteModule && (
                    <div className="mt-6">
                      <Link to={`/module/${firstIncompleteModule.id}`}>
                        <Button className="w-full">
                          {progress === 0 ? "Mulai Belajar" : "Lanjutkan Belajar"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Savings Goal Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-dpk-purple" />
                    Target Tabungan
                  </CardTitle>
                  <CardDescription>
                    {savingsGoal.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{savingsProgress}%</span>
                    </div>
                    <ProgressBar value={savingsProgress} />
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Target:</span>
                      <span className="font-medium">
                        Rp {savingsGoal.targetAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Terkumpul:</span>
                      <span className="font-medium text-dpk-purple">
                        Rp {savingsGoal.currentAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Menabung Mingguan:</span>
                      <span className="font-medium">
                        Rp {savingsGoal.weeklyContribution.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link to="/savings">
                      <Button className="w-full" variant="outline">
                        Kelola Tabungan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Badge Kamu</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex flex-col items-center p-4 rounded-lg border ${
                      badge.unlocked
                        ? "border-dpk-purple/20 bg-dpk-lightPurple"
                        : "border-gray-200 bg-gray-50 opacity-50"
                    }`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h3 className="font-medium text-center text-sm">{badge.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {badge.description}
                    </p>
                    {!badge.unlocked && (
                      <span className="text-xs text-gray-400 mt-2">Terkunci</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
