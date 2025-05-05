
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { PiggyBank, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout, user } = useAppContext();

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="dpk-container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <PiggyBank className="h-8 w-8 text-dpk-purple" />
          <span className="text-xl font-bold bg-gradient-to-r from-dpk-purple to-dpk-blue bg-clip-text text-transparent">
            Duit Pintar Kids
          </span>
        </Link>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-gray-600">
              Halo, <span className="font-medium">{user?.name}</span>!
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Keluar</span>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/about">
              <Button variant="ghost" size="sm">
                Tentang
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" size="sm">
                Kontak
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
