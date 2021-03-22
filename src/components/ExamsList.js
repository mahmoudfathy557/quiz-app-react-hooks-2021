import React from 'react';
import { Link } from 'react-router-dom';
import { data } from '../quizData';
import { auth, firestore } from '../firebase';

const ExamsList = () => {
	console.log(data);
	// console.log(auth.currentUser);
	console.log(firestore);

	return (
		<div className='exams-list'>
			{data &&
				data.exams.map((exam, id) => {
					const grade = exam.grade;
					return (
						<div className='exam' key={id}>
							<h5>{exam.name}</h5>
							{exam.taken ? (
								<button className='exam-taken' disabled={true}>
									{grade + ' %'}
								</button>
							) : (
								<Link to={`/exams/${exam.name}`} className='link'>
									<button
										onClick={() => {
											exam.enrolledSutdents.push(auth.currentUser);
										}}>
										Take Test
									</button>
								</Link>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default ExamsList;
