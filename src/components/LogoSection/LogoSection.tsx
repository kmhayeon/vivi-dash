import Link from 'next/link';
import Logo from './Logo';


const LogoSection = () => {
  return (
      <Link href="/"> 
        <Logo />
      </Link>
  );
};

export default LogoSection;
