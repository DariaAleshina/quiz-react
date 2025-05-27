import Timer from './Timer';
import Answers from './Answers';
import { useState } from 'react';
const TIMER_DURATION = 10000;
import QUESTIONS from '../questions';

export default function Question({ questionIndex, onTimeout, onAnswerSelect }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  const question = QUESTIONS[questionIndex];

  const handleSelectAnswer = function (answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: question.answers[0] === answer,
      });

      setTimeout(() => {
        onAnswerSelect(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';
  if (answer.selectedAnswer) {
    answerState = 'answered';
    if (answer.isCorrect !== null)
      answerState = answer.isCorrect ? 'correct' : 'wrong';
  }
  return (
    <div id="question">
      <Timer onTimeout={onTimeout} timeout={TIMER_DURATION} />
      <h2>{question.id.toUpperCase() + ': ' + question.text}</h2>
      <Answers
        answers={question.answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
