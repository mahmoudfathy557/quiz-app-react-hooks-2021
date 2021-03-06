import React, { useState, useContext } from 'react';
import { FirebaseContext } from './context';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alerts from './Alerts';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();

	const [ submitClicked, setSubmitClicked ] = useState(false);
	const { signUp, userInfo, error } = useContext(FirebaseContext);

	const [ user, setUser ] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		student: true,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		signUp(user);

		setSubmitClicked(true);

		setTimeout(() => {
			setSubmitClicked(false);
		}, 4000);
	};
	console.log(user);
	function Copyright() {
		return (
			<Typography variant='body2' color='textSecondary' align='center'>
				{'Copyright © '}
				<Link color='inherit' href='https://material-ui.com/'>
					Your Website
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	if (userInfo) return <Redirect to='/' />;
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								required={true}
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								value={user.firstName}
								onChange={(e) => {
									setUser({
										...user,
										firstName: e.target.value,
									});
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required={true}
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								value={user.lastName}
								onChange={(e) => {
									setUser({
										...user,
										lastName: e.target.value,
									});
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required={true}
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								value={user.email}
								onChange={(e) => {
									setUser({
										...user,
										email: e.target.value,
									});
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required={true}
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								value={user.password}
								onChange={(e) => {
									setUser({
										...user,
										password: e.target.value,
									});
								}}
							/>
						</Grid>
						<Grid item>
							<label className='checkbox'>
								Student:
								<Checkbox
									checked={user.student}
									onChange={(e) => {
										setUser({ ...user, student: e.target.checked });
									}}
								/>
							</label>
						</Grid>
					</Grid>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link href='/login' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
			{submitClicked && (
				<Box mt={5}>
					<Alerts error={error} userInfo={userInfo} msg={'You have signed up successfully!!'} />
				</Box>
			)}
		</Container>
	);
}
