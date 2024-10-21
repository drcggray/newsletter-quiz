import React, { useState } from 'react';
import { generateCertificate } from '../certificateGenerator';

const questions = [
  {
    question: "What was the primary finding regarding the Māori-specific pathway within the national Healthline service?",
    options: [
      "Low uptake and satisfaction rates",
      "High uptake and satisfaction rates",
      "No significant difference from the general pathway",
      "Decreased use over time"
    ],
    correctAnswer: 1  // b) High uptake and satisfaction rates (index 1)
  },
  {
    question: "What factor was identified as a significant barrier to progression in bariatric surgery for Māori patients?",
    options: [
      "Lack of interest in the procedure",
      "Limited availability of surgeons",
      "Pre-operative weight loss requirements",
      "High cost of the surgery"
    ],
    correctAnswer: 2  // c) Pre-operative weight loss requirements (index 2)
  },
  {
    question: "What was the annual inflation rate for the year ending September 2024 in Aotearoa?",
    options: [
      "1.5%",
      "2.2%",
      "3.5%",
      "4.1%"
    ],
    correctAnswer: 1  // b) 2.2% (index 1)
  },
  {
    question: "Which therapy programme was customized for rangatahi and showed positive behavioral changes?",
    options: [
      "Cognitive Behavioral Therapy (CBT)",
      "Dialectical Behaviour Therapy (DBT)",
      "Psychodynamic Therapy",
      "Exposure Therapy"
    ],
    correctAnswer: 1  // b) Dialectical Behaviour Therapy (DBT) (index 1)
  },
  {
    question: "Who was featured by Time magazine as one of its Next Generation leaders?",
    options: [
      "Professor Rod Jackson",
      "Dr George Gray",
      "Hana-Rawhiti Maipi-Clarke",
      "Dr Miriama Wilson"
    ],
    correctAnswer: 2  // c) Hana-Rawhiti Maipi-Clarke (index 2)
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
