import React from 'react';
import CircularLabel from '../components/CircularLabel';
const Result = ({ state }) => {
	console.log(state);

	let { questions, correctAnswers, wrongAnswers } = state;

	for (let question of questions) {
		if (question.answer.trim().toLowerCase() === question.userResponse.trim().toLowerCase()) {
			correctAnswers++;
		} else {
			wrongAnswers++;
		}
	}
	console.log(correctAnswers, ' correctAnswers');
	console.log(wrongAnswers, ' wrongAnswers');
	let percentageResult = correctAnswers / questions.length * 100;
	// console.log(percentageResult);

	return (
		<div className='result'>
			<h1>User result</h1>
			<div className='result-answers'>
				<div className='correct-answers'>{`Correct Answers: ${correctAnswers}`}</div>
				<div className='wrong-answers'>{`Wrong Answers: ${wrongAnswers}`}</div>
			</div>
			<CircularLabel percentageResult={percentageResult} />
		</div>
	);
};

export default Result;
