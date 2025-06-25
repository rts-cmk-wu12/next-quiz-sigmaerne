"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Quiz({ params }) {
  const { category, difficulty, amount } = use(params);
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await res.json();
        if (!data?.results || data.results.length === 0) {
          setError(true);
          return;
        }
        setQuestions(data.results);
        shuffleAnswers(data.results[0]);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError(true);
      }
    };

    fetchQuestions();
  }, [category, difficulty, amount]);

  const shuffleAnswers = (question) => {
    const shuffled = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    setAnswers(shuffled);
    setSelected(null);
  };

  const handleAnswer = (answer) => {
    if (selected) return;
    setSelected(answer);
    if (answer === questions[index].correct_answer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      shuffleAnswers(questions[nextIndex]);
    } else {
      router.push(`/result?correct=${correctCount}&total=${amount}`);
    }
  };

  const current = questions[index];

  return (
    <main className='min-h-screen bg-bg text-text flex items-center justify-center px-4 py-12 font-main'>
      {error ? (
        <p className='text-red-500 text-center text-xl'>
          Kunne ikke hente spørgsmål. Prøv igen senere.
        </p>
      ) : current ? (
        <div className='flex flex-col items-center gap-8 w-full max-w-xl'>
          <h1 className='text-4xl text-primary text-center'>
            {current.category}
          </h1>

          <p
            className='text-lg text-center max-w-prose'
            dangerouslySetInnerHTML={{ __html: current.question }}
          />

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
            {answers.map((answer, idx) => {
              const isCorrect = answer === current.correct_answer;
              const isSelected = answer === selected;

              let style =
                "rounded-md py-3 px-4 text-center transition-all text-white";

              if (!selected) {
                style += " bg-primary hover:bg-accent hover:text-primary";
              } else {
                if (isCorrect) {
                  style += " bg-green-500";
                } else if (isSelected) {
                  style += " bg-red-500";
                } else {
                  style += " bg-red-300";
                }
              }

              return (
                <button
                  key={idx}
                  className={style}
                  onClick={() => handleAnswer(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className={`mt-4 bg-primary hover:bg-accent text-white py-2 px-6 rounded-full text-lg transition-opacity duration-300 ${
              selected
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            Næste
          </button>
        </div>
      ) : (
        <p className='text-center text-lg text-primary'>
          Indlæser spørgsmål...
        </p>
      )}
    </main>
  );
}
