
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PiggyBank, Book, Award, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const { isAuthenticated, login } = useAppContext();
  const [username, setUsername] = useState("");
  const [loginRole, setLoginRole] = useState<"student" | "teacher" | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !loginRole) return;
    login(username, loginRole);
  };

  if (isAuthenticated) {
    return <Link to="/dashboard">Redirecting to dashboard...</Link>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="dpk-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="text-dpk-purple">Literasi</span> Keuangan untuk
                  <span className="text-dpk-blue"> Anak-anak</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Bantu anak-anak belajar mengelola keuangan lewat permainan
                  dan aktivitas menyenangkan sejak dini.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => setLoginRole("student")}
                    size="lg"
                    variant={loginRole === "student" ? "default" : "outline"}
                    className="rounded-full"
                  >
                    Masuk sebagai Siswa
                  </Button>
                  <Button
                    onClick={() => setLoginRole("teacher")}
                    size="lg"
                    variant={loginRole === "teacher" ? "default" : "outline"}
                    className="rounded-full"
                  >
                    Masuk sebagai Guru
                  </Button>
                </div>
                
                {loginRole && (
                  <form onSubmit={handleLogin} className="space-y-4 animate-fade-in">
                    <Input 
                      placeholder="Masukkan namamu..." 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      className="rounded-full"
                    />
                    <Button 
                      type="submit" 
                      disabled={!username}
                      className="dpk-button-primary"
                    >
                      Mulai Belajar
                    </Button>
                  </form>
                )}
              </div>
              
              <div className="relative">
                <img
                  src="/lovable-uploads/b418a9a5-f5de-4e5f-92a5-67743e394c31.png"
                  alt="Financial Education"
                  className="rounded-2xl shadow-xl max-w-full mx-auto animate-float"
                />
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-xl shadow-lg animate-bounce-slow">
                  <span className="text-4xl">💰</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="dpk-container">
            <h2 className="dpk-heading text-center">Fitur Utama</h2>
            <p className="dpk-subheading text-center mb-12">
              Belajar keuangan jadi menyenangkan dengan berbagai fitur interaktif
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="dpk-card text-center">
                <div className="bg-dpk-lightPurple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-8 h-8 text-dpk-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Modul Interaktif</h3>
                <p className="text-gray-600">
                  Belajar konsep keuangan dasar melalui modul yang menyenangkan
                </p>
              </div>
              
              <div className="dpk-card text-center">
                <div className="bg-dpk-lightBlue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-dpk-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Kuis Seru</h3>
                <p className="text-gray-600">
                  Uji pemahaman dengan kuis interaktif dan kumpulkan poin
                </p>
              </div>
              
              <div className="dpk-card text-center">
                <div className="bg-dpk-lightGreen w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="w-8 h-8 text-dpk-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Celengan Digital</h3>
                <p className="text-gray-600">
                  Latihan menabung dengan celengan digital yang menyenangkan
                </p>
              </div>
              
              <div className="dpk-card text-center">
                <div className="bg-dpk-lightYellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-dpk-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Badge & Reward</h3>
                <p className="text-gray-600">
                  Dapatkan badge dan penghargaan saat mencapai target
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-dpk-purple to-dpk-blue text-white">
          <div className="dpk-container text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Siap Mulai Belajar?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Bergabunglah sekarang dan bantu anak-anak memahami literasi keuangan dengan cara yang menyenangkan
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-dpk-purple hover:bg-gray-100 rounded-full px-8 py-6 text-lg"
              onClick={() => setLoginRole("student")}
            >
              Mulai Sekarang
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
