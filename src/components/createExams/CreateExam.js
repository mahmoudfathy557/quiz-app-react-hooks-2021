import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../../firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

const McqsInputs = () => {
	const classes = useStyles();

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<CreateIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Create Exam
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								required={true}
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								variant='outlined'
								required={true}
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
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
							/>
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
		</Container>
	);
};

const CreateExam = () => {
	return (
		<div>
			<McqsInputs />
		</div>
	);
};

export default CreateExam;
