import React, { useState } from 'react';
import { data } from '../quizData';
const Quiz = () => {
	const exams = data.response;
	const [ currentQuestion, setCurrentQuestion ] = useState(0);
	const [ showResult, setShowResult ] = useState(false);
	const [ correctAnswers, setCorrectAnswers ] = useState(0);
	let exam = data.response[currentQuestion];
	exam['response'] = '';
	const prevBtn = () => {
		setCurrentQuestion(currentQuestion - 1);
	};
	const nextBtn = (e) => {
		if (e.target.textContent === 'next') {
			setCurrentQuestion(currentQuestion + 1);
		} else if (e.target.textContent === 'finish') {
			// console.log(exams);

			setShowResult(true);
		}
	};

	const handleResponse = (e) => {
		e.target.style.background = 'red';
		console.log(e.target);
		exam.response = e.target.textContent;
		console.log(exams);
	};

	if (!showResult) {
		return (
			<div className='app'>
				<h1>Quiz app</h1>
				{exam && (
					<div className='quiz' key={exam.quizNumber}>
						<h3 className='question'>
							Q{exam.quizNumber}: {exam.question}
						</h3>
						<div className='answers'>
							<div className='option1' onClick={(e) => handleResponse(e)}>
								{exam.option1}
							</div>
							<div className='option2' onClick={(e) => handleResponse(e)}>
								{exam.option2}
							</div>
							<div className='option3' onClick={(e) => handleResponse(e)}>
								{exam.option3}
							</div>
							<div className='option4' onClick={(e) => handleResponse(e)}>
								{exam.option4}
							</div>
						</div>
					</div>
				)}

				<div className='btns'>
					<button className='prev' onClick={prevBtn} disabled={currentQuestion === 0 ? true : false}>
						prev
					</button>
					<button className='next' onClick={(e) => nextBtn(e)}>
						{currentQuestion === exams.length - 1 ? 'finish' : 'next'}
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Results</h1>
				<p>{`Your Result is ${correctAnswers} of ${exams.length} `}</p>
			</div>
		);
	}
};

export default Quiz;
