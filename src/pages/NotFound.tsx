
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dpk-purple to-dpk-blue mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold mb-6">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman tersebut
          mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
