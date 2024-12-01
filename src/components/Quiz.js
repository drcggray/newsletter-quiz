import React, { useState } from 'react';
import { generateCertificate } from '../certificateGenerator';

const questions = [
  {
    question: "According to the primary care study, people with mental health conditions were:",
    options: [
      "3.6% more likely to report problems accessing appointments",
      "7.1% more likely to report problems accessing appointments",
      "21% more likely to report problems accessing appointments",
      "28.8% more likely to report problems accessing appointments"
    ],
    correctAnswer: 1  // b) 7.1% more likely
  },
  {
    question: "The Healthy Homes Initiative evaluation showed:",
    options: [
      "A 507% return on investment through healthcare savings",
      "A reduction in hospitalizations of 28.8%",
      "Support for over 200,000 people",
      "Improved health outcomes for 18.6% of participants"
    ],
    correctAnswer: 0  // a) A 507% return on investment
  },
  {
    question: "Daily vaping rates in New Zealand have increased from:",
    options: [
      "3.5% in 2019/20 to 26.5% in 2023/24",
      "11.1% in 2019/20 to 28.8% in 2023/24",
      "3.5% in 2019/20 to 11.1% in 2023/24",
      "11.1% in 2019/20 to 26.5% in 2023/24"
    ],
    correctAnswer: 2  // c) 3.5% in 2019/20 to 11.1% in 2023/24
  },
  {
    question: "In the ventilation study of New Zealand buildings:",
    options: [
      "All spaces exceeded recommended CO2 thresholds",
      "About one-third of spaces showed good air quality",
      "99% of buildings required improvement",
      "800 rooms were studied across 31 buildings"
    ],
    correctAnswer: 1  // b) About one-third of spaces showed good air quality
  },
  {
    question: "The Commonwealth Fund's Mirror, Mirror 2024 report found that:",
    options: [
      "The UK had the highest healthcare spending",
      "Australia had the poorest health outcomes",
      "The USA spent over 16% of GDP on healthcare",
      "The Netherlands had the lowest administrative efficiency"
    ],
    correctAnswer: 2  // c) The USA spent over 16% of GDP on healthcare
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(1);
  const [firstAttemptScore, setFirstAttemptScore] = useState(0);
  const [userName, setUserName] = useState('');

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setFirstAttemptScore(score);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizAttempt(2);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Kawakawa Māori Health Research Quiz</h1>
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>Question {currentQuestion + 1} of {questions.length}</div>
            <div>Score: {score}/{questions.length}</div>
          </div>
          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => handleAnswer(index)}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
              </div>
            ))}
          </div>
          {showFeedback && (
            <div className={`mt-4 p-4 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md`}>
              {isCorrect ? (
                <p className="font-semibold">Correct!</p>
              ) : (
                quizAttempt === 1 ? (
                  <p>That's not correct. Please try the next question.</p>
                ) : (
                  <p>That's not correct. The right answer is: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}</p>
                )
              )}
            </div>
          )}
          <div className="mt-6">
            {!showFeedback ? (
              <button 
                onClick={handleSubmit} 
                disabled={selectedAnswer === null}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={handleNext} 
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Next Question
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          {quizAttempt === 1 ? (
            <>
              <p className="text-xl mb-4">Your pre-reading score: {score}/{questions.length}</p>
              <p className="mb-4">Well done on completing the first round. We encourage you to read the newsletter for a deeper understanding of these topics. Feel free to retake the quiz afterwards to gauge your learning progress.</p>
              <button 
                onClick={resetQuiz}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Retake Quiz
              </button>
            </>
          ) : (
            <>
              <p className="text-xl mb-2">Your pre-reading score: {firstAttemptScore}/{questions.length}</p>
              <p className="text-xl mb-4">Your post-reading score: {score}/{questions.length}</p>
              {score > firstAttemptScore && (
                <p className="text-green-600 font-semibold mb-4">
                  Great job! You've improved your score after reading the newsletter.
                </p>
              )}
              <p className="mt-4 text-gray-600">Thank you for engaging with our newsletter content. We hope you found it informative and valuable.</p>
              <p className="mt-2 text-gray-600">Please enter your name if you'd like to download a certificate for your professional development records</p>
              <input
                type="text"
                placeholder="Enter your first name and last name"
                value={userName}
                onChange={handleNameChange}
                className="w-full p-2 border rounded mt-4"
              />
              <button 
                onClick={() => {
                  console.log("Certificate button clicked");
                  generateCertificate(userName, firstAttemptScore, score)
                    .then(() => console.log("Certificate generated successfully"))
                    .catch(error => {
                      console.error("Failed to generate certificate:", error);
                      alert("Failed to generate certificate. Please check the console for details.");
                    });
                }}
                disabled={!userName}
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                Download Certificate
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
