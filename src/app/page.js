'use client'; 

import { useRouter } from 'next/navigation';

export default function ArrowToHome() {
  const router = useRouter();

  const goToHome = () => {
    router.push('/Home');
  };

  return (
    <div
      onClick={goToHome}
      className="flex flex-col items-center mt-20 cursor-pointer hover:scale-105 transition"
    >
      <p className="text-lg font-medium mb-1">Enter Details Press</p>
      <div className="text-3xl animate-bounce">⬇️</div>
    </div>
  );
}
