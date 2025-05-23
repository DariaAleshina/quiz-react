import { useState, useCallback } from 'react';
import CompleteView from './CompleteView';
import Timer from './Timer';
import QUESTIONS from '../questions';
const TIMER_DURATION = 5000;

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = QUESTIONS.length === activeQuestionIndex;
  if (quizIsComplete) {
    return <CompleteView />;
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(
    () => Math.random() - 0.5
  );

  const handleAnswerClick = useCallback(
    function handleAnswerClick(selectedAnswer) {
      setAnswerState('answered');
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);

      setUserAnswers(prevAnswers => {
        return [...prevAnswers, selectedAnswer];
      });
    },
    [activeQuestionIndex]
  );

  const handleTimeoutExpire = useCallback(
    () => handleAnswerClick(null),
    [handleAnswerClick]
  );

  return (
    <div id="quiz">
      <div id="question">
        <Timer
          key={QUESTIONS[activeQuestionIndex].id}
          timeout={TIMER_DURATION}
          onTimeout={handleTimeoutExpire}
        />
        <h2>
          {QUESTIONS[activeQuestionIndex].id.toUpperCase() +
            ': ' +
            QUESTIONS[activeQuestionIndex].text}
        </h2>
        <ul id="answers">
          {shuffledAnswers.map(answer => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let buttonStyling = '';
            if (isSelected) {
              if (answerState === 'answered') buttonStyling = 'selected';
              if (answerState === 'correct' || answerState === 'wrong')
                buttonStyling = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleAnswerClick(answer)}
                  className={buttonStyling}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
