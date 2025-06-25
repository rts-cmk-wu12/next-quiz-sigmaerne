"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Confetti from "react-confetti";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const correct = searchParams.get("correct");
  const total = searchParams.get("total");

  return (
    <>
      <main className='min-h-screen bg-bg text-text flex items-center justify-center px-4 py-12 font-main'>
        <Confetti className='w-full h-screen' />

        <div className='text-center flex flex-col items-center gap-6 z-[2] fixed'>
          <h1 className='text-4xl text-primary'>🎉 Quiz færdig! 🎉</h1>
          <p className='text-2xl text-center'>
            Du fik{" "}
            <span className='text-green-500 animate-glow'>{correct}</span> ud af{" "}
            <span className='text-red-500 animate-glow'>{total}</span> rigtige
          </p>
          <Link
            href='/'
            className='mt-4 bg-primary hover:bg-accent hover:text-primary transition-colors duration-300 text-white py-2 px-6 rounded-full text-lg'
          >
            En quiz mere?
          </Link>
        </div>
      </main>
    </>
  );
}
