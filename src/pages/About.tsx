
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="dpk-container py-12">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
            </Button>
          </Link>
          
          <h1 className="dpk-heading">Tentang Duit Pintar Kids</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-600 mb-6">
              Duit Pintar Kids adalah platform literasi keuangan interaktif untuk anak-anak usia 7-12 tahun, 
              dirancang untuk mengajarkan prinsip dasar keuangan melalui konten yang menyenangkan dan edukatif.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Misi Kami</h2>
            <p>
              Mempersiapkan generasi muda Indonesia dengan keterampilan literasi keuangan yang kuat melalui 
              pembelajaran yang menyenangkan, interaktif, dan relevan dengan kehidupan sehari-hari mereka.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Fitur Utama Platform</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Modul Interaktif:</strong> Materi tentang kebutuhan vs keinginan, menabung, anggaran, dan risiko finansial
              </li>
              <li>
                <strong>Video Edukatif:</strong> Konten visual yang memudahkan pemahaman konsep keuangan
              </li>
              <li>
                <strong>Kuis Interaktif:</strong> Uji pemahaman melalui kuis menarik berbasis pilihan ganda
              </li>
              <li>
                <strong>Simulasi Celengan Digital:</strong> Anak-anak dapat membuat target tabungan dan melacak progres mereka
              </li>
              <li>
                <strong>Sistem Badge & Reward:</strong> Motivasi belajar dengan sistem penghargaan yang menarik
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Untuk Siapa Platform Ini?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-dpk-lightPurple p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Siswa (Anak-anak 7-12 tahun)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Belajar konsep keuangan dasar</li>
                  <li>Membangun kebiasaan menabung</li>
                  <li>Mengembangkan keterampilan membuat keputusan finansial</li>
                </ul>
              </div>
              <div className="bg-dpk-lightBlue p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Guru & Orang Tua</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Memantau kemajuan pembelajaran anak</li>
                  <li>Mendapatkan sumber daya untuk mengajarkan literasi keuangan</li>
                  <li>Melengkapi pendidikan di rumah/sekolah</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Manfaat Literasi Keuangan Sejak Dini</h2>
            <p>
              Mengajarkan literasi keuangan sejak usia dini dapat membantu anak-anak:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Memahami nilai uang dan pentingnya mengelola keuangan dengan baik</li>
              <li>Membedakan antara kebutuhan dan keinginan</li>
              <li>Mengembangkan kebiasaan menabung yang akan bermanfaat seumur hidup</li>
              <li>Mempersiapkan diri untuk membuat keputusan finansial yang lebih baik di masa depan</li>
              <li>Menumbuhkan sikap bertanggung jawab terhadap uang</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
