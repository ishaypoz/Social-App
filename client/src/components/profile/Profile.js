import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import EditDetails from './EditDetails.js';
//redux
import { connect } from 'react-redux';
//mui
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import ToolTip from '@material-ui/core/Tooltip';
//icons
import IconButton from '@material-ui/core/IconButton';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import dayjs from 'dayjs';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
	button: {
		float: 'right'
	},
	paper: {
		padding: 10
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				size: 'small',
				top: '175px',
				left: '185px'
			}
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			border: 'double 1em transparent',
			borderRadius: '30px',
			backgroundOrigin: 'border-box'
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: '#00bcd4'
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		}
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px'
		}
	}
});

class Profile extends Component {
	handleImageChange = () => {
		this.props.logoutUser();
	};
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	};
	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};
	handleLogout = () => {
		this.props.logoutUser();
	};
	render() {
		const {
			classes,
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				loading,
				authenticated
			}
		} = this.props;
		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="image-wrapper">
							<img src={imageUrl} alt="profile" className="profile-image" />
							<input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
							<ToolTip title="Edit profile picture" placement="bottom">
								<IconButton onClick={this.handleEditPicture} className="button">
									<ImageSearchRoundedIcon color="default" />
								</IconButton>
							</ToolTip>
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
								{handle}
							</MuiLink>
							<hr />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<hr />
							{location && (
								<Fragment>
									<LocationOn color="primary" /> <span>{location}</span>
									<hr />
								</Fragment>
							)}
							{website && (
								<Fragment>
									<LinkIcon color="primary" />
									<a href={website} target="_blank" rel="noopener noreferrer">
										{' '}
										{website}
									</a>
									<hr />
								</Fragment>
							)}
							<CalendarToday color="primary" /> <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
						</div>
						<div className="editExit">
							<Tooltip title="Logout" placement="top">
								<IconButton onClick={this.handleLogout}>
									<KeyboardReturn color="primary" />
								</IconButton>
							</Tooltip>
							<EditDetails />
						</div>
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						No profile found, please login again
					</Typography>
					<div className={classes.buttons}>
						<Button variant="contained" color="primary" component={Link} to="/login">
							Login
						</Button>
						<Button variant="contained" color="secondary" component={Link} to="/signup">
							Signup
						</Button>
					</div>
				</Paper>
			)
		) : (
			<p>loading...</p>
		);
		return profileMarkup;
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
