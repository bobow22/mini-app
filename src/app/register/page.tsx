'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '../components/Navbar';

function RegisterPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password, username } = user;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password) {
        setError('Please fill in all inputs!');
        return;
      }
      const response = await axios.post('/api/register', user);
      console.log('Sign up successfully', response.data);

      router.push('/login');
    } catch (error: any) {
      console.log('Sign up failed', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className='bg-gray-900 '>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white'>
                Create new account
              </h1>
              <form className='space-y-4 md:space-y-6'>
                {error && (
                  <div className='w-fit text-sm text-red-500 py-2  rounded-md mt-2'>
                    {error}
                  </div>
                )}
                <div>
                  <label
                    htmlFor='username'
                    className='block mb-2 text-sm font-medium  text-white'
                  >
                    Username
                  </label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    className='bg-gray-50 border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='username'
                    value={username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium  text-white'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='name@company.com'
                    value={email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium  text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className=' border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    value={password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  onClick={handleRegister}
                  type='submit'
                  className='w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800'
                >
                  Sign up
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{' '}
                  <a
                    href='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
