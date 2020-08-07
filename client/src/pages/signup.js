import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
	form: {
		display: 'flex',
		alignContent: 'center'
	},
	containerForm: {
		textAlign: 'center'
	},
	TextField: {
		margin: 5
	},
	image: {},
	pageTitle: {},
	button: { margin: 10 },
	progress: { margin: 5 }
};

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			userName: '',
			errors: {}
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.userName
		};
		this.props.signupUser(newUserData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	render() {
		const {
			classes,
			UI: { loading }
		} = this.props;
		const { errors } = this.state;
		return (
			<Grid container justify="center" className={classes.form}>
				<Grid container item sm={3} className={classes.containerForm}>
					<Grid>
						<img src={AppIcon} alt="monkey" className={classes.image} />
						<Typography variant="h4" className={classes.pageTitle}>
							Sign up
						</Typography>
						<form noValidate onSubmit={this.handleSubmit}>
							<TextField
								id="email"
								name="email"
								type="email"
								label="Email"
								className={classes.TextField}
								value={this.state.email}
								helperText={errors.email}
								error={errors.email ? true : false}
								onChange={this.handleChange}
								inputProps={styles.TextField}
								variant="outlined"
								fullWidth
							/>
							<TextField
								id="password"
								name="password"
								type="password"
								label="Pssword"
								className={classes.TextField}
								value={this.state.password}
								helperText={errors.password}
								error={errors.password ? true : false}
								onChange={this.handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								label="Confirm Password"
								className={classes.TextField}
								value={this.state.confirmPassword}
								helperText={errors.confirmPassword}
								error={errors.confirmPassword ? true : false}
								onChange={this.handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								id="userName"
								name="userName"
								type="text"
								label="User Name"
								className={classes.TextField}
								value={this.state.userName}
								error={errors.handle ? true : false}
								helperText={errors.handle}
								onChange={this.handleChange}
								variant="outlined"
								fullWidth
							/>
							{errors.general && (
								<Typography variant="body4" color="error" className={classes.customError}>
									{errors.general}
								</Typography>
							)}
							<Button
								size="medium"
								type="submit"
								variant="contained"
								color="primary"
								className={classes.button}
								disabled={loading}
							>
								SIGN UP
								{loading && <CircularProgress size={15} className={classes.progress} />}
							</Button>
							<br />
							<small>
								Already have an account ? login <Link to="/login">here</Link>
							</small>
						</form>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
