import React, { useContext, Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { data } from '../quizData';
import { auth } from '../firebase';
import { FirebaseContext } from '../components/auth/context';

const Home = () => {
	const { logOut, userInfo } = useContext(FirebaseContext);

	const isAuthenticated = localStorage.getItem('isAuthenticated');
	console.log(isAuthenticated);

	return (
		<Fragment>
			<Helmet>
				<title>Quiz App - Home</title>
			</Helmet>
			<div id='home'>
				<section>
					<div style={{ textAlign: 'center' }}>
						<span className='mdi mdi-cube-outline cube' />
					</div>
					<h1>Quiz App</h1>
					{isAuthenticated ? (
						<div className='play-button-container'>
							<ul>
								<li>
									<Link className='exams-button' to='/exams'>
										Exams
									</Link>
								</li>
							</ul>
							<div className='auth-container'>
								<a href='/' className='logout-button' onClick={logOut}>
									Log Out
								</a>
							</div>
						</div>
					) : (
						<div className='auth-container'>
							<Link to='/login' className='auth-buttons' id='login-button'>
								Login
							</Link>
							<Link to='/signup' className='auth-buttons' id='signup-button'>
								Register
							</Link>
						</div>
					)}
				</section>
			</div>;
		</Fragment>
	);
};

export default Home;
