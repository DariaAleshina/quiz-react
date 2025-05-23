import { useState } from 'react';
import CompleteView from './CompleteView';
import Timer from './Timer';
import QUESTIONS from '../questions';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = QUESTIONS.length === activeQuestionIndex;
  if (quizIsComplete) {
    return <CompleteView />;
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(
    () => Math.random() - 0.5
  );
  const handleAnswerClick = function (selectedAnswer) {
    setUserAnswers(prevAnswers => {
      return [...prevAnswers, selectedAnswer];
    });
  };

  return (
    <div id="quiz">
      <div id="question">
        <h2>
          {QUESTIONS[activeQuestionIndex].id.toUpperCase() +
            ': ' +
            QUESTIONS[activeQuestionIndex].text}
        </h2>
        <ul id="answers">
          {shuffledAnswers.map(answer => (
            <li key={answer} className="answer">
              <button onClick={() => handleAnswerClick(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
