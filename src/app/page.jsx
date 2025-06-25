'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [amount, setAmount] = useState('5');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('https://opentdb.com/api_category.php');
      const data = await res.json();
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);


  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="flex justify-center flex-col">
        <header className="mb-8 text-center">
          <h1 className=" text-9xl text-primary " >qu!zme</h1>
        </header>
        <div className="flex flex-row gap-2 mb-8">
          {/* Category */}
          <select onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border outline-none rounded ">
            <option value="">Vælg kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Difficulty */}
          <select onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border outline-none rounded">
            <option value="easy">Let</option>
            <option value="medium">Mellem</option>
            <option value="hard">Svær</option>
          </select>

          {/* Amount */}
          <select onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border outline-none rounded">
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>{num} spørgsmål</option>
            ))}
          </select>
        </div>
        <Link
          href={`/quiz/${selectedCategory}/${difficulty}/${amount}`}
          className="block text-center bg-primary text-white w-full py-2 rounded hover:bg-accent/80 transition-colors ring-1 ring-primary/50 hover:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none  "
        >
          Start Quiz
        </Link>

      </section>
    </main>
  );
}
