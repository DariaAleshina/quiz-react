import completeImage from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
export default function Summary({ userAnswers }) {
  // STATISTICS CALCULATION
  const calculatePercentage = function (selectedAnswers, totalAnswers) {
    return Math.round((selectedAnswers / totalAnswers) * 100);
  };
  const totalAnswers = userAnswers.length;
  const skippedAnswers = userAnswers.filter(answer => answer === null).length;
  const correctAnswers = userAnswers.filter(
    (answer, i) => answer === QUESTIONS[i].answers[0]
  ).length;

  const skippedAnswersShare = calculatePercentage(skippedAnswers, totalAnswers);
  const correctAnswersShare = calculatePercentage(correctAnswers, totalAnswers);
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={completeImage} alt="trophy icon" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>{' '}
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>{' '}
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, i) => {
          // styling  answer based on status
          let styling = 'user-answer';
          if (!answer) styling += ' skipped';
          if (answer && answer === QUESTIONS[i].answers[0])
            styling += ' correct';
          if (answer && answer !== QUESTIONS[i].answers[0]) styling += ' wrong';

          return (
            <li key={i}>
              <h3>{i + 1}</h3>
              <p className="question">{QUESTIONS[i].text}</p>
              <p className={styling}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
