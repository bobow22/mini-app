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
    const fetchUsernameFromToken = () => {
      const cookies = document.cookie.split('; '); // Get all cookies
      console.log('cookies =', cookies);
      const tokenCookie = cookies.find((cookie: any) =>
        cookie.startsWith('token=')
      );
      console.log('tokenCookie =', tokenCookie);

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1]; // Extract the token value
        console.log('token =', token);

        try {
          // Decode the token to get the username
          const decoded: any = jwtDecode(token);
          setUsername(decoded.username); // Replace 'username' with the actual key in your token
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      }
    };

    fetchUsernameFromToken();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/logout');

      // TODO: หรือจะไปหน้าอื่น
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <nav className='top-0 left-0 w-full bg-[#333] text-white p-5'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <div>
            <Link href='/'>Home</Link>
          </div>
          <ul className='flex'>
            {username ? (
              <>
                <li className='mx-3'>
                  <span>Welcome, {username}</span>
                </li>
                <li className='mx-3'>
                  <a
                    onClick={logout}
                    className='bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded'
                  >
                    Log out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className='mx-3'>
                  <Link href='/login'>Sign In</Link>
                </li>
                <li className='mx-3'>
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
