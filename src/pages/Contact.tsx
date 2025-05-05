
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.");
  };

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
          
          <h1 className="dpk-heading">Hubungi Kami</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nama
                  </label>
                  <Input id="name" placeholder="Masukkan nama Anda" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subjek
                  </label>
                  <Input id="subject" placeholder="Subjek pesan" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Pesan
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit">Kirim Pesan</Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Pendidikan No. 123<br />
                    Jakarta Selatan, 12345<br />
                    Indonesia
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@duitpintarkids.id</p>
                  <p className="text-gray-600">support@duitpintarkids.id</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Telepon</h3>
                  <p className="text-gray-600">+62 21 1234-5678</p>
                  <p className="text-gray-600">+62 812 3456 7890</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Jam Operasional</h3>
                  <p className="text-gray-600">
                    Senin - Jumat: 08:00 - 17:00<br />
                    Sabtu: 09:00 - 14:00<br />
                    Minggu: Tutup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
