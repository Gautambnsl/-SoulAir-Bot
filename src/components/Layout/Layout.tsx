import Image from 'next/image';
import MainPage from '../MainPage/MainPage';
import Navbar from '../Navbar/Navbar';
import Background from '../../assets/images/background.png';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Image
        src={Background}
        alt="Background Image"
        layout="fill"
        quality={100}
        className="-z-10"
      />
      <Navbar />
      <MainPage />
    </div>
  );
}
