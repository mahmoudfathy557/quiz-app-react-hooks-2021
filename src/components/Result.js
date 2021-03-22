import React from 'react';
import CircularLabel from '../components/CircularLabel';
import { data } from '../quizData';

const Result = ({ state, propsState }) => {
	// console.log(taken);
	console.log(propsState, 'before');

	let { questions, correctAnswers, wrongAnswers } = state;

	for (let question of questions) {
		if (question.answer.trim().toLowerCase() === question.userResponse.trim().toLowerCase()) {
			correctAnswers++;
		} else {
			wrongAnswers++;
		}
	}

	let percentageResult = correctAnswers / questions.length * 100;

	propsState.taken = true;
	propsState.grade = percentageResult;

	console.log(propsState, 'after');
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
