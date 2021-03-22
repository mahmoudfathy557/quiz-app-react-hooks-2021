import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	Box: {
		marginTop: '7rem',
	},
	Typography: {
		fontSize: '1.4rem',
	},
});

function CircularProgressWithLabel(props) {
	const classes = useStyles();
	return (
		<Box position='relative' display='inline-flex' className={classes.Box}>
			<CircularProgress size={100} variant='determinate' {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position='absolute'
				display='flex'
				alignItems='center'
				justifyContent='center'>
				<Typography
					variant='caption'
					component='div'
					color='textSecondary'
					className={classes.Typography}>{`${props.value}%`}</Typography>
			</Box>
		</Box>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
	value: PropTypes.number.isRequired,
};

export default function CircularStatic({ percentageResult }) {
	console.log(percentageResult.toFixed(2));

	const progress = parseFloat(percentageResult.toFixed(2));

	return <CircularProgressWithLabel value={progress} />;
}
