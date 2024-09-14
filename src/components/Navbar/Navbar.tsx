import { Button } from '../ui/button';
import { Package2 } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Package2 className="h-8 w-8 text-[#447cfb] hover:text-[#3569dd] transition duration-300 mr-2" />
          <span className="text-2xl font-bold text-[#3569dd] tracking-wider hover:text-[#447cfb] transition duration-300">
            NFT Creator
          </span>
        </div>
        <Button
          className="bg-[#447cfb] hover:bg-[#3569dd] text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
        >
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
