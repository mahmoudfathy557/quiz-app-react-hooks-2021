import React from 'react';
import axios from 'axios';

const McqsInputs = (props) => {
	return props.mcqs.map((val, idx) => {
		let QuestionId = `question-${idx}`,
			mcqsId = `mcqs-${idx}`;
		return (
			<div className='container2'>
				<div key={idx}>
					<div>
						<label htmlFor={QuestionId}>{`Question #${idx + 1}:`}</label>

						<textarea
							type='text'
							name={QuestionId}
							data-id={idx}
							id={QuestionId}
							value={props.mcqs[idx].question}
							className='question'
						/>
					</div>
					<div>
						<label htmlFor={mcqsId}>Mcqs</label>
						<div className='list-group'>
							<input
								type='text'
								name={mcqsId}
								data-id={idx}
								id={mcqsId}
								value={props.mcqs[idx].choice_a}
								placeholder='first choice'
								className='choice_a'
							/>

							<input
								type='text'
								name={mcqsId}
								data-id={idx}
								id={mcqsId}
								value={props.mcqs[idx].choice_b}
								placeholder='second choice'
								className='choice_b'
							/>

							<input
								type='text'
								name={mcqsId}
								data-id={idx}
								id={mcqsId}
								value={props.mcqs[idx].choice_c}
								placeholder='third choice'
								className='choice_c'
							/>

							<input
								type='text'
								name={mcqsId}
								data-id={idx}
								id={mcqsId}
								value={props.mcqs[idx].choice_d}
								placeholder='fourth choice'
								className='choice_d'
							/>

							<input
								type='number'
								pattern='[0-9]*'
								name={mcqsId}
								data-id={idx}
								id={mcqsId}
								value={props.mcqs[idx].answer}
								placeholder='answer number'
								className='answer'
							/>
						</div>
					</div>
				</div>
			</div>
		);
	});
};

/*
  --data "{
    \"subject\": \"testing2\",
    \"time\": 2,
    \"category\": \"testing\",
    \"mcqs\": [
        {\"question\": \"is that working\", \"choice_a\": \"yes, it's working.\", \"choice_b\":\"no, it's not\", \"answer\":0},
        {\"question\": \"is this working\", \"choice_a\": \"yes, it's working.\", \"choice_b\":\"no, it's not\", \"answer\":1}]
}
"
*/
class CreateExam extends React.Component {
	state = {
		mcqs: [ { question: '', choice_a: '', choice_b: '', choice_c: '', choice_d: '', answer: '' } ],
		subject: '',
		time: '',
		category: '',
	};
	handleChange = (e) => {
		if ([ 'question', 'choice_a', 'choice_b', 'choice_c', 'choice_d', 'answer' ].includes(e.target.className)) {
			let mcqs = [ ...this.state.mcqs ];
			mcqs[e.target.dataset.id][e.target.className] = e.target.value;
			this.setState({ mcqs }, () => console.log(this.state.mcqs));
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
		console.log(this.state);
	};
	addMcq = (e) => {
		this.setState((prevState) => ({
			mcqs: [
				...prevState.mcqs,
				{ question: '', choice_a: '', choice_b: '', choice_c: '', choice_d: '', answer: '' },
			],
		}));
	};
	handleSubmit = (e) => {
		e.preventDefault();

		console.log(localStorage.getItem('token'));
		// axios.post('https://elshafeay.pythonanywhere.com/api/v2/exams/',
		//   {headers:
		//     {
		//       'Content-Type': 'application/json',
		//       'Authorization':'Token '+localStorage.getItem("token")
		//     },
		//     data:
		//     this.state
		//   }
		// )
		axios({
			method: 'post',
			url: 'https://elshafeay.pythonanywhere.com/api/v2/exams/',
			data: this.state,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Token ' + localStorage.getItem('token'),
			},
		})
			.then((res) => {
				console.log(res);
				this.setState({ dataSet: res.data });
			})
			.catch((err) => {
				console.log('auth failed' + err);
				console.log(err);
			});
	};
	render() {
		let { subject, time, category, mcqs } = this.state;
		return (
			<div className='container2  pt-5 mt-5'>
				<form className='form-style' onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<div>
						<label htmlFor='subject'>Subject</label>
						<input type='text' name='subject' id='subject' value={subject} />
					</div>

					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='number'
							pattern='[0-9]*'
							placeholder='enter time in hours'
							name='time'
							id='time'
							value={time}
						/>
					</div>

					<div>
						<label htmlFor='category'>Category</label>
						<input type='text' name='category' id='category' value={category} />
					</div>

					<button id='button' onClick={this.addMcq}>
						Add new Mcq
					</button>
					<McqsInputs mcqs={mcqs} />
					<input type='submit' value='Submit' id='button' />
				</form>
			</div>
		);
	}
}
export default CreateExam;
