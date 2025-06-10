import { useState, useCallback } from 'react';
import Question from './Question';
import QUESTIONS from '../questions';
import Summary from './Summary';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const handleAnswerClick = useCallback(
    function handleAnswerClick(selectedAnswer) {
      setUserAnswers(prevAnswers => {
        return [...prevAnswers, selectedAnswer];
      });
    },
    [activeQuestionIndex]
  );

  const handleTimeoutExpire = useCallback(() => handleAnswerClick(null), []);

  const quizIsComplete = QUESTIONS.length === activeQuestionIndex;
  if (quizIsComplete) return <Summary userAnswers={userAnswers} />;

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onAnswerSelect={handleAnswerClick}
        onTimeout={handleTimeoutExpire}
      />
    </div>
  );
}
