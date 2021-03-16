import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import { data } from '../quizData';
import isEmpty from '../utils/isEmpty';
import Result from './Result';

const Quiz = () => {
	const exam = data.response;
	const [ state, setState ] = useState({
		questions: [],
		currentQuestion: {},
		nextQuestion: {},
		prevQuestion: {},
		answer: '',
		numberOfQuestions: 0,
		currentQuestionIndex: 0,
		numberOfAnswerdQuestion: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
		score: 0,
	});

	const [ showResult, setShowResult ] = useState(false);

	const displayQuestions = (exam) => {
		let { currentQuestionIndex, currentQuestion, nextQuestion, prevQuestion, answer } = state;

		if (!isEmpty(exam)) {
			const questions = exam;
			currentQuestion = questions[currentQuestionIndex];
			nextQuestion = questions[currentQuestionIndex + 1];
			prevQuestion = questions[currentQuestionIndex - 1];
			answer = currentQuestion.answer;
			setState({
				...state,
				questions: questions,
				currentQuestion: currentQuestion,
				nextQuestion: nextQuestion,
				prevQuestion: prevQuestion,
				answer: answer,
			});
		}
	};

	useEffect(
		() => {
			displayQuestions(exam);
		},
		[ state.currentQuestionIndex ],
	);

	const nextBtn = (e) => {
		setState({ ...state, currentQuestionIndex: state.currentQuestionIndex + 1 });
	};

	const prevBtn = () => {
		setState({ ...state, currentQuestionIndex: state.currentQuestionIndex - 1 });
	};

	const colorizeUserResponse = () => {
		const prevElementId = state.currentQuestion.userResponse;
		const ElBeforeUpdating = document.getElementById(prevElementId);
		console.log(ElBeforeUpdating);
		if (ElBeforeUpdating) ElBeforeUpdating.classList.add('user-response');
	};

	const handleResponse = (e) => {
		// console.log(state.currentQuestion.userResponse, 'before updaing');
		const prevElementId = state.currentQuestion.userResponse;
		const ElBeforeUpdating = document.getElementById(prevElementId);
		if (ElBeforeUpdating) ElBeforeUpdating.classList.remove('user-response');

		console.log(ElBeforeUpdating, 'before update');
		const userResponse = e.target.innerHTML;
		state.currentQuestion['userResponse'] = userResponse;
		setState({
			...state,
		});

		if (e.target) e.target.classList.add('user-response');

		M.toast({
			html: 'Option Clicked',
		});
	};

	if (!showResult) {
		return (
			<Fragment>
				<Helmet>
					<title>Quiz App - Quiz</title>
				</Helmet>
				<div className='app'>
					<div className='quiz-container'>
						{state.currentQuestion && (
							<div className='quiz ' key={state.currentQuestion.quizNumber}>
								<div className='question'>
									Q{`${state.currentQuestion.quizNumber}/${state.questions.length}: ${state
										.currentQuestion.question}`}
								</div>
								<div className='answers'>
									<div
										className='option1'
										id={state.currentQuestion.option1 || 'none'}
										onClick={(e) => handleResponse(e)}>
										{state.currentQuestion.option1 || 'none'}
									</div>
									<div
										className='option2'
										id={state.currentQuestion.option2 || 'none'}
										onClick={(e) => handleResponse(e)}>
										{state.currentQuestion.option2 || 'none'}
									</div>
									<div
										className='option3'
										id={state.currentQuestion.option3 || 'none'}
										onClick={(e) => handleResponse(e)}>
										{state.currentQuestion.option3 || 'none'}
									</div>
									<div
										className='option4'
										id={state.currentQuestion.option4 || 'none'}
										onClick={(e) => handleResponse(e)}>
										{state.currentQuestion.option4 || 'none'}
									</div>
								</div>
							</div>
						)}
					</div>

					<div className='btns'>
						{state.currentQuestionIndex === 0 ? null : (
							<button className='prev' onClick={(e) => prevBtn(e)}>
								prev
							</button>
						)}

						{state.currentQuestionIndex === state.questions.length - 1 ? (
							<button
								className='show-result'
								onClick={() => {
									setShowResult(true);
								}}>
								Show Result
							</button>
						) : (
							<button className='next' onClick={nextBtn}>
								next
							</button>
						)}
					</div>
				</div>
			</Fragment>
		);
	} else {
		return <Result state={state} />;
	}
};

export default Quiz;
