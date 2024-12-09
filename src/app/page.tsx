import Navbar from '@/app/components/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1 className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        Welcome
      </h1>
    </main>
  );
}
