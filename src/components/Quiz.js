import React, { useState } from 'react';
import { generateCertificate } from '../certificateGenerator';

const questions = [
  {
    question: "The PRISM-A tool for assessing chronic pain in Māori patients aims to improve which of the following outcomes?",
    options: [
      "Reduced waiting times for pain clinics",
      "Increased prescription of pain medication",
      "Improved patient-clinician relationships and communication",
      "Standardized pain scores across all ethnic groups"
    ],
    correctAnswer: 2  // c) Improved patient-clinician relationships and communication (index 2)
  },
  {
    question: "According to the 2023 Census, which is the largest iwi in Aotearoa New Zealand?",
    options: [
      "Ngāti Porou",
      "Ngāi Tahu/Kāi Tahu",
      "Ngāpuhi",
      "Te Arawa"
    ],
    correctAnswer: 2  // c) Ngāpuhi (index 2)
  },
  {
    question: "What percentage of people who recorded Māori descent in the 2023 Census did not know their iwi?",
    options: [
      "8.9%",
      "10.7%",
      "15.3%",
      "19.3%"
    ],
    correctAnswer: 2  // c) 15.3% (index 2)
  },
  {
    question: "According to the study on medical exams at the University of Otago, which of the following changes occurred after implementing a policy to include ethnicity in exam questions?",
    options: [
      "Stereotyping of Māori patients increased",
      "Māori patients were more likely to be portrayed as non-compliant",
      "Representation of socio-cultural factors in patient scenarios decreased",
      "Portrayal of Māori patients became more aligned with population demographics"
    ],
    correctAnswer: 3  // d) Portrayal of Māori patients became more aligned with population demographics (index 3)
  },
  {
    question: "According to Census 2023 data, what percentage of adult smokers (aged 15 years and older) was reported?",
    options: [
      "7.7%",
      "8.3%",
      "7.1%",
      "12.4%"
    ],
    correctAnswer: 0  // a) 7.7% (index 0)
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