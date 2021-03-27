import './App.css';
// import QuizPage from './pages/QuizPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizPage from './pages/QuizPage';
import SignIn from './components/auth/Login';
import SignUp from './components/auth/Signup';
import ExamsList from './components/ExamsList';
import CreateExam from './components/createExams/CreateExam';

function App() {
	return (
		<Router>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/exams'>
				<ExamsList />
			</Route>
			<Route exact path='/exams/:name' component={QuizPage} />
			<Route exact path='/create-exam' component={CreateExam} />

			<Route exact path='/signup'>
				<SignUp />
			</Route>
			<Route exact path='/login'>
				<SignIn />
			</Route>
		</Router>
	);
}

export default App;
