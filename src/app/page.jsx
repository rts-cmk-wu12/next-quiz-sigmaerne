"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [amount, setAmount] = useState("5");
  const [showError, setShowError] = useState(false);
  const [highlightCategory, setHighlightCategory] = useState(false);

  
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  const handleStartQuiz = (e) => {
    if (!selectedCategory) {
      e.preventDefault();
      setShowError(true);
      setHighlightCategory(true);
      setTimeout(() => {
        setShowError(false);
        setHighlightCategory(false);
      }, 1000);
    }
  };

  return (
    <main className='flex items-center justify-center min-h-screen border-l border-r border-primary p-8'>
      <section className='flex justify-center flex-col w-full max-w-xl px-4'>
        <header className='mb-22 text-center'>
          <h1 className='text-9xl text-primary font-main'>Qu!zme</h1>
        </header>

        <div>
          <div className='flex flex-row gap-2 mb-8 relative'>
            {/* Category */}
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`custom-scroll w-full p-2 border rounded outline-none transition-colors ${
                highlightCategory ? "border-red-500 ring-2 ring-red-300" : ""
              }`}
            >
              <option value=''>Vælg kategori</option>
              {categories.map((cat) => (
                <option className='text-primary' key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Difficulty */}
            <select
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
              className='w-full p-2 border rounded outline-none'
            >
              <option className='text-primary' value='easy'>
                Let
              </option>
              <option className='text-primary' value='medium'>
                Mellem
              </option>
              <option className='text-primary' value='hard'>
                Svær
              </option>
            </select>

            {/* Amount */}
            <select
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className='w-full p-2 border rounded outline-none'
            >
              {[5, 10, 15, 20].map((num) => (
                <option className='text-primary' key={num} value={num}>
                  {num} spørgsmål
                </option>
              ))}
            </select>

            {/* Error */}
            {showError && (
              <p className='text-red-500 text-sm mb-4 text-center absolute bottom-[45px] left-1/2 -translate-x-1/2'>
                Du skal vælge en kategori.
              </p>
            )}
          </div>

          {/* ✅ Link-based navigation with validation */}
          <Link
            href={`/quiz/${selectedCategory}/${difficulty}/${amount}`}
            onClick={handleStartQuiz}
            className='block text-center bg-primary text-white w-full py-2 rounded hover:bg-accent/80 transition-colors ring-1 ring-primary/50 hover:ring-accent/50 hover:text-primary'
          >
            Start Quiz
          </Link>
        </div>
      </section>
    </main>
  );
}
