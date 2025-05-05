
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-12">
      <div className="dpk-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Duit Pintar Kids</h3>
            <p className="text-sm text-gray-600">
              Platform edukatif untuk membantu anak-anak belajar tentang literasi keuangan 
              dengan cara yang menyenangkan dan interaktif.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-dpk-purple">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-dpk-purple">
                  Tentang Program
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-dpk-purple">
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
            <p className="text-sm text-gray-600">
              Email: info@duitpintarkids.id
              <br />
              Telepon: (021) 1234-5678
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Duit Pintar Kids. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
