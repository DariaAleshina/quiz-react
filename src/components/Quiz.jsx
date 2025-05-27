import { useState, useCallback } from 'react';
import CompleteView from './CompleteView';
import Timer from './Timer';
import Answers from './Answers';
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
          key={activeQuestionIndex}
          timeout={TIMER_DURATION}
          onTimeout={handleTimeoutExpire}
        />
        <h2>
          {QUESTIONS[activeQuestionIndex].id.toUpperCase() +
            ': ' +
            QUESTIONS[activeQuestionIndex].text}
        </h2>
        <Answers
          key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onAnswerSelect={handleAnswerClick}
        />
      </div>
    </div>
  );
}
