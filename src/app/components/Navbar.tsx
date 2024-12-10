'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getUsernameFromToken = () => {
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find((cookie: any) =>
        cookie.startsWith('token=')
      );
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        try {
          const decoded: any = jwtDecode(token);
          setUsername(decoded.username);
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      }
    };

    getUsernameFromToken();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/logout');

      // TODO: หรือจะไปหน้าอื่น
      router.push('/');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <nav className='w-full bg-[#303857] text-white p-5'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <ul className='flex'>
            <li className='mx-5'>
              <Link href='/'>Home</Link>
            </li>
            <li className='mx-5'>
              <Link href='/fruit'>Fruit</Link>
            </li>
          </ul>
          <ul className='flex'>
            {username ? (
              <>
                <li className='mx-5'>
                  <span>Welcome, {username}</span>
                </li>
                <li className='mx-5'>
                  <a
                    onClick={logout}
                    className='bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer transition duration-300'
                  >
                    Log out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className='mx-5'>
                  <Link href='/login'>Sign In</Link>
                </li>
                <li className='mx-5'>
                  <Link href='/register'>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
