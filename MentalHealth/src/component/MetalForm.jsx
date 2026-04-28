import React, { useState } from "react";
import { motion } from "framer-motion";
import { questions } from "./question";

const MentalForm = () => {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qid, points, type, exclusive = false) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      if (type === "multi") {
        updated[qid] = updated[qid] || [];
        if (exclusive) {
          // If exclusive option is selected, deselect others
          updated[qid] = [points];
        } else {
          // Remove exclusive option if other option selected
          updated[qid] = updated[qid].filter((p) => p !== 0);
          if (updated[qid].includes(points)) {
            updated[qid] = updated[qid].filter((p) => p !== points);
          } else {
            updated[qid].push(points);
          }
        }
      } else {
        updated[qid] = points;
      }
      return updated;
    });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((q) => {
      const ans = answers[q.id];
      if (q.type === "multi") {
        total += Array.isArray(ans) ? ans.reduce((a, b) => a + b, 0) : 0;
      } else {
        total += ans || 0;
      }
    });
    setScore(total);
    setShowResult(true);
  };

  const getMentalLevel = () => {
  if (score <= 5) 
    return { 
      level: "Minimal", 
      suggestion: "Keep up healthy routines, regular sleep, and exercise. For guidance, you can also reach out to iCall: +91 9152987821." 
    };
  if (score <= 10) 
    return { 
      level: "Mild", 
      suggestion: "Practice mindfulness, exercise, and talk to friends/family. You may contact Vandrevala Helpline: 1860 266 2345 if needed." 
    };
  if (score <= 15) 
    return { 
      level: "Moderate", 
      suggestion: "Consult a mental health professional and stay physically active. iCall: +91 9152987821, Vandrevala Helpline: 1860 266 2345." 
    };
  if (score <= 20) 
    return { 
      level: "Severe", 
      suggestion: "Seek professional help immediately. Physical activity may help reduce stress. Call iCall: +91 9152987821 or Vandrevala Helpline: 1860 266 2345." 
    };
  return { 
    level: "High Risk", 
    suggestion: "URGENT: Contact emergency services or a mental health hotline immediately. In India, you can reach iCall: +91 9152987821 or Vandrevala Helpline: 1860 266 2345." 
  };
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {!showResult ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="bg-gray-800 text-white p-8 rounded-3xl shadow-2xl w-full max-w-xl"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-200">
            Question {current + 1} of {questions.length}
          </h2>
          <p className="mb-6 text-gray-100 text-lg font-semibold">{questions[current].text}</p>
          <div className="space-y-3">
            {questions[current].options.map((opt, idx) => {
              const selected = questions[current].type === "multi" 
                ? (answers[questions[current].id] || []).includes(opt.points)
                : answers[questions[current].id] === opt.points;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(questions[current].id, opt.points, questions[current].type, opt.exclusive)}
                  className={`w-full text-left p-4 border rounded-xl text-gray-100 font-medium transition-all duration-200
                    ${selected ? "bg-purple-600 border-purple-400" : "bg-gray-700 border-gray-600 hover:bg-gray-600"}`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={nextQuestion}
              className="px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-700 font-semibold"
            >
              {current < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 text-white p-8 rounded-3xl shadow-2xl w-full max-w-xl text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Your Score: {score}</h2>
          <h3 className="text-xl font-semibold mb-2">{getMentalLevel().level}</h3>
          <p className="mb-4 text-gray-300">{getMentalLevel().suggestion}</p>
          {score >= 21 || answers[7] >= 2 || answers[8] >= 2 ? (
            <p className="text-red-500 font-bold">
              Emergency Contacts: Call 988 (US) or seek local help immediately.
            </p>
          ) : null}
          <button
            onClick={() => {
              setAnswers({});
              setCurrent(0);
              setShowResult(false);
              setScore(0);
            }}
            className="mt-6 px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-700 font-semibold"
          >
            Retake Quiz
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MentalForm;
