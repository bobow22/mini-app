import Navbar from '@/app/components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
        <h3 className='text-3xl my-3'>Welcome User</h3>
        <hr className='my-3' />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quo.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia officiis
          odio distinctio voluptas aperiam! Quos quae in dolores vel tenetur
          aspernatur. Beatae assumenda a, dolor inventore est fugit corrupti
          repellat itaque. Eligendi cumque eum quasi culpa tempore et pariatur
          recusandae rerum repudiandae corporis. Eligendi maxime, sequi dolore
          cumque facilis eos.
        </p>
      </div>
    </div>
  );
}
