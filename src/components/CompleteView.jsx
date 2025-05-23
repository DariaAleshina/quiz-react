import completeImage from '../assets/quiz-complete.png';

export default function CompleteView() {
  return (
    <div id="summary">
      <img src={completeImage} />
      <h2>Quiz Completed</h2>
    </div>
  );
}
