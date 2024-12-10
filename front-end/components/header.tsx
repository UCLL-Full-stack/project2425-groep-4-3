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
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        PedaLenen
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        {loggedInUser && (
        <Link href="/bikes" className="nav-link px-4 fs-5 text-white">
          Bikes
        </Link>
        )}
        {loggedInUser && (
        <Link href="/rents" className="nav-link px-4 fs-5 text-white">   
          Rents
        </Link>
        )}

        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          Users
        </Link>

        {loggedInUser && (
        <Link href="/accessories" className="nav-link px-4 fs-5 text-white">
          Accessories
        </Link>
        )}

        {loggedInUser ? (
        <>
        <div className="nav-link px-4 fs-5 text-white">
                Welcome, {loggedInUser.name}
              </div><button
                onClick={() => {
                  handleClicklogout();
                } }
                className="nav-link px-4 fs-5 text-white"
              >
                  Logout
                </button>
                </>
        ) : (
          <button
          onClick={() => {
            handleClicklogin();
          } }
            className="nav-link px-4 fs-5 text-white"
          >
            Login
          </button>
        )}


        <Language/>

      </nav>
    </header>
  );
};

export default Header;
