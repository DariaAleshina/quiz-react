import Timer from './Timer';
import Answers from './Answers';
import { useState } from 'react';
import QUESTIONS from '../questions';

export default function Question({ questionIndex, onTimeout, onAnswerSelect }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  //   retrieving question information
  const question = QUESTIONS[questionIndex];

  //   setting timers
  let timer = 10000;
  answer.selectedAnswer && (timer = 1000);
  answer.isCorrect !== null && (timer = 2000); //moving to the next question

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
      <Timer
        key={timer}
        onTimeout={answer.selectedAnswer === '' ? onTimeout : null}
        timeout={timer}
        mode={answerState}
      />
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
