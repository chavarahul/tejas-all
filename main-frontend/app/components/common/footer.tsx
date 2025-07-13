import Image from 'next/image';
import Logo from '@/app/assets/logosaas.png'; 
import Link from 'next/link';
import SocailX from '@/app/assets/social-x.svg';
import SocialInsta from '@/app/assets/social-insta.svg';
import SocailLinkedin from '@/app/assets/social-linkedin.svg';

const Footer = () => {
  return (
    <footer className='bg-black text-[#BCBCBC] text-sm py-10 text-center'>
      <div className="px-5">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:h-full before:w-full
        before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute before:blur" >
          <Image src={Logo} alt='Staar AI Logo' height={40} className='relative' />
        </div>
        <nav className='flex flex-col md:flex-row md:justify-center gap-6 mt-6'>
          <Link href="/">About</Link>
          <Link href="/">Features</Link>
          <Link href="/">Download</Link>
          <Link href="/">Support</Link>
          <Link href="/">Contact</Link>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <SocailX />
          <SocailLinkedin />
          <SocialInsta />
        </div>
        <p className='mt-6'>© 2025 Staar AI. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;