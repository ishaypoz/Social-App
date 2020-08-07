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
import { loginUser } from '../redux/actions/userActions';

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

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
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
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData, this.props.history);
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
							Login
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
								label="Password"
								className={classes.TextField}
								value={this.state.password}
								helperText={errors.password}
								error={errors.password ? true : false}
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
								LOGIN
								{loading && <CircularProgress size={15} className={classes.progress} />}
							</Button>
							<br />
							<small>
								dont have an account ? sign up <Link to="/signup">here</Link>
							</small>
						</form>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
