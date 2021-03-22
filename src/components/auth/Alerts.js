import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

export default function SimpleAlerts({ error, isUser, msg }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{error && <Alert severity='error'>{error}</Alert>}
			{isUser && <Alert severity='success'>{msg}</Alert>}
		</div>
	);
}
