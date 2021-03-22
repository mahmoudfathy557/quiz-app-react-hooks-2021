import firebase, { auth, firestore } from '../../firebase';
import React, { useState, useEffect } from 'react';

const FirebaseContext = React.createContext();

const FirebaseProvider = ({ children }) => {
	const [ userInfo, setUserInfo ] = useState(null);
	const [ error, setError ] = useState(null);
	const [ isAuthenticated, setIsAuthenticated ] = useState('');

	const signUp = ({ email, password, firstName, lastName, student }) => {
		const promise = auth.createUserWithEmailAndPassword(email, password);
		promise
			.then((res) => {
				console.log(res);

				return firestore.collection('users').doc(res.user.uid).set({
					firstName,
					lastName,
					email,
					exams: [],
					student,
					displayName: `${firstName} ${lastName}`,
				});
			})
			.then(() => {
				console.log('signup success');
				getUser();
			})
			.catch((err) => {
				console.log('signup failed');
				setError(err.message);
			});
	};

	const signIn = ({ email, password }) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('singed in successfully');
				getUser();
			})
			.catch((err) => {
				console.log(err);
				setError(err.message);
			});
	};

	const logOut = () => {
		localStorage.removeItem('isAuthenticated');
		auth
			.signOut()
			.then(() => {
				console.log('logged out');
				console.log(auth.currentUser);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getUser = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				var uid = user.uid;
				localStorage.setItem('isAuthenticated', uid);
				console.log(user);
				let docRef = firestore.collection('users').doc(uid);
				docRef
					.get()
					.then((doc) => {
						if (doc.exists) {
							setUserInfo(doc.data());
							console.log('Document data:', doc.data());
						} else {
							// doc.data() will be undefined in this case
							console.log('No such document!');
						}
					})
					.catch((error) => {
						console.log('Error getting document:', error);
					});

				// ...
			} else {
				// User is signed out
				console.log('User is signed out');
				// ...
			}
		});
	};

	return (
		<FirebaseContext.Provider
			value={{
				userInfo,
				signIn,
				error,
				signUp,
				logOut,
				getUser,
			}}>
			{children}
		</FirebaseContext.Provider>
	);
};

export { FirebaseProvider, FirebaseContext };
