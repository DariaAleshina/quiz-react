import { useRef } from 'react';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onAnswerSelect,
}) {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswers.current.map(answer => {
        const isSelected = selectedAnswer === answer;
        let buttonStyling = '';
        if (isSelected) {
          if (answerState === 'answered') buttonStyling = 'selected';
          if (answerState === 'correct' || answerState === 'wrong')
            buttonStyling = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onAnswerSelect(answer)}
              className={buttonStyling}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
