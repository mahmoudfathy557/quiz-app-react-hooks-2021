import React from 'react';
import Quiz from '../components/Quiz';
import { data } from '../quizData';

const QuizPage = (props) => {
	const examName = props.match.params.name;
	console.log(examName);
	console.log(data);

	let exam = data.exams.filter((exam) => exam.name === examName)[0];
	console.log(exam);

	return (
		<div>
			<Quiz exam={exam} />
		</div>
	);
};

export default QuizPage;
