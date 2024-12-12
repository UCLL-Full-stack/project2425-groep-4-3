import Link from 'next/link';
import Language from './language/Language';
import { User } from '@types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
  
    if (!loggedInUser) {
      return;
    }
    setLoggedInUser(JSON.parse(loggedInUser));
  }, []);

  const handleClicklogout = () => {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setLoggedInUser(undefined);
    setTimeout(() => {
      router.push("/");
    }, 0);
  };

  const handleClicklogin = () => {
    setTimeout(() => {
      router.push("/login");
    }, 0);
  };

  return (
    <header className="p-3 mb-3 border-b bg-[#84BD00]">
      <a className="text-2xl flex justify-center mb-2 mb-lg-0 text-white">
        PedaLenen
      </a>
      <nav className="flex justify-center">
        <Link href="/" className="px-4 text-lg text-white">
          Home
        </Link>
        {loggedInUser && (
          <Link href="/bikes" className="px-4 text-lg text-white">
            Bikes
          </Link>
        )}
        {loggedInUser && (
          <Link href="/rents" className="px-4 text-lg text-white">
            Rents
          </Link>
        )}
        <Link href="/users" className="px-4 text-lg text-white">
          Users
        </Link>
        {loggedInUser && (
          <Link href="/accessories" className="px-4 text-lg text-white">
            Accessories
          </Link>
        )}
        {loggedInUser ? (
          <>
            <div className="px-4 text-lg text-white">
              Welcome, {loggedInUser.name}
            </div>
            <button
              onClick={handleClicklogout}
              className="px-4 text-lg text-white bg-transparent border-none"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleClicklogin}
            className="px-4 text-lg text-white bg-transparent border-none"
          >
            Login
          </button>
        )}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
