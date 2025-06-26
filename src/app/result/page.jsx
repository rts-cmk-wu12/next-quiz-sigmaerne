"use client";

import { use, useEffect, useState } from "react";
import Confetti from "react-confetti";
import Link from "next/link";

export default function ResultPage({ searchParams }) {
  // ✅ Unwrap the searchParams Promise
  const unwrappedParams = use(searchParams);
  const correct = unwrappedParams.correct;
  const total = unwrappedParams.total;

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Only show confetti on client
    setShowConfetti(true);
  }, []);

  return (
    <main className='min-h-screen bg-bg text-text flex items-center justify-center px-4 py-12 font-main relative overflow-hidden'>
      {showConfetti && (
        <Confetti className='w-full h-screen z-[-1] fixed top-0 left-0' />
      )}

      <div className='text-center flex flex-col items-center gap-6 z-10'>
        <h1 className='text-4xl text-primary breath-blue'>
          🥳 Quiz færdig! 🎉
        </h1>
        <p className='text-2xl text-center'>
          Du fik <span className='text-green-500 breath-green'>{correct}</span>{" "}
          ud af <span className='text-red-500 breath-red'>{total}</span> rigtige
        </p>
        <Link
          href='/'
          className='mt-4 bg-primary hover:bg-accent hover:text-primary transition-colors duration-300 text-white py-2 px-6 rounded-full text-lg'
        >
          En quiz mere?
        </Link>
      </div>
    </main>
  );
}
