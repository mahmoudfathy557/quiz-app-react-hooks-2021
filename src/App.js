import './App.css';
// import QuizPage from './pages/QuizPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizPage from './pages/QuizPage';
function App() {
	return (
		<Router>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/exams'>
				<QuizPage />
			</Route>
		</Router>
	);
}

export default App;
