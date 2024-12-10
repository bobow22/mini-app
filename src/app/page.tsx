import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen '>
      <Navbar />
      <div className='flex-grow relative bg-gray-800 flex items-center justify-center'>
        <div className='text-center text-white'>
          <h1 className='text-5xl font-extrabold mb-4'>Welcome User</h1>
          <p className='text-xl text-gray-400 mb-8'>
            Please sign in to see the data.
          </p>
        </div>
      </div>
    </div>
  );
}
