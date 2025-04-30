import "../Styles/Pages/Settings.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { pencil } from "../assets/Pictures"
import axios from "axios"
import { Alert } from "../Components/Components"

const AWS_BUCKET_NAME = import.meta.env.VITE_APP_AWS_S3_BUCKET_NAME
const AWS_REGION = import.meta.env.VITE_APP_AWS_REGION

const Settings = () => {
	const userId = JSON.parse(localStorage.getItem('id'));
	const user = JSON.parse(localStorage.getItem('user'));
	const settingsOptions = ["Profile", "Password", "Account"]
	const [whichSettings, setWhichSettings] = useState(0)
	const [username, setUsername] = useState(user.username || '');
	const [description, setDescription] = useState(user.description || '');
	const [profilePic, setProfilePic] = useState(user.pfp || null);
	const [showAlert, setShowAlert] = useState(false)
	const [alertText, setAlertText] = useState('')
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordAgain, setNewPasswordAgain] = useState('');
	const URI = import.meta.env.VITE_APP_URI || '';
	const navigate = useNavigate()

	const routeHomePage = () => {
		navigate('/')
	}

	const closeAlert = () => {
		setShowAlert(false);
	};

	const handleLeftSettings = () => {
		const optionRightNow = whichSettings
		if (optionRightNow !== 0) {
			setWhichSettings(optionRightNow - 1)
			toggleActive(`${settingsOptions[optionRightNow - 1].toLowerCase()}-settings`)
		}
	}

	const handleRightSettings = () => {
		const optionRightNow = whichSettings
		if (optionRightNow !== 2) {
			setWhichSettings(optionRightNow + 1)
			toggleActive(`${settingsOptions[optionRightNow + 1].toLowerCase()}-settings`)
		}
	}

	const toggleActive = (whichSettings) => {
		document.querySelector(".active-settings")?.classList.toggle("active-settings")
		document.querySelector(`.${whichSettings}`)?.classList.toggle("active-settings")
	}

	//Settings saving
	const onSaveProfile = async () => {
		const ImageURL = await uploadPfp();

		axios({
			method: "put",
			url: `${URI}users/editUser/${userId}`,
			data: {
				username: username,
				description: description,
				pfp: ImageURL
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			console.log("Update Success:", response.data);
			// alert("It worked")
			setAlertText(response.data.message || "Request successful!");
			setShowAlert(true);
			// Update local storage or UI with new user data if needed
			localStorage.setItem('user', JSON.stringify(response.data));
		})
		.catch((error) => {
			const response = error.response;
			// alert("It did not work")
			setAlertText(error.response?.data?.message || "Something went wrong.");
			setShowAlert(true);
			if (response) {
				console.log(response.data);
				console.log(response.status);
				console.log(response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
	}

	const onPasswordSave = async () => {
		axios({
			method: "put",
			url: `${URI}users/editUser/password/${userId}`,
			data: {
				oldPassword,
				newPassword,
				newPasswordAgain
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			setAlertText(response.data.message || "Request successful!");
			setShowAlert(true);
			console.log("Update Success:", JSON.stringify(response.data));
		})
		.catch((error) => {
			const response = error.response;
			setAlertText(error.response?.data?.message || "Something went wrong.");
			setShowAlert(true);
			// alert("It did not work")
			if (response) {
				console.log(response.data);
				console.log(response.status);
				console.log(response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
	}

	const deleteAccount = async () => {
		axios({
			method: "delete",
			url: `${URI}users/deleteUser/${userId}`,
			data: {
			},
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			setAlertText(response.data.message || "Request successful!");
			setShowAlert(true);
			console.log("Update Success:", JSON.stringify(response.data));
			routeHomePage()
		})
		.catch((error) => {
			const response = error.response;
			setAlertText(error.response?.data?.message || "Something went wrong.");
			setShowAlert(true);
			if (response) {
				console.log(response.data);
				console.log(response.status);
				console.log(response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
	}

	const uploadPfp = async () => {
		const fileName = profilePic.name
		const fileType = profilePic.type

		const response = await axios.post(`${url}users/presignedPfpURL/${userId}`, {
			fileName,
			fileType
		})

		const { uploadURL, key } = response.data

		// 2. Upload the file directly to S3
		await axios.put(uploadURL, file, {
			headers: {
				'Content-Type': fileType
			}
		})

		// 3. Save the image URL to your user in MongoDB
		const imageURL = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`

		setProfilePic(profilePic)
		return imageURL
	}

	return (
		<>
			{showAlert && (
				<Alert
					text={alertText}
					buttonOneText="OK"
					functionButtonOne={closeAlert}
				/>
			)}
			<div className="settings-container">
				<div className="back">
					<button className="back-button" onClick={() => navigate('/home')}>
						<h1>&lt;</h1>
					</button>
				</div>
				<div className="container-options">
					<div className="settings-title">
						<h1>Settings</h1>
					</div>
					<div className="settings-contents">
						<div className="left-options">
							<button onClick={() => toggleActive("profile-settings")}><h1>Profile</h1></button>
							<button onClick={() => toggleActive("password-settings")}><h1>Password</h1></button>
							<button onClick={() => toggleActive("account-settings")}><h1>Account</h1></button>
						</div>
						<div className="left-options-mobile">
							<button onClick={handleLeftSettings} className={`settings-button-nav ${whichSettings === 0 ? "hidden" : ""}`}><h1>&lt;</h1></button>
							<h1>{settingsOptions[whichSettings]}</h1>
							<button onClick={handleRightSettings} className={`settings-button-nav ${whichSettings === 2 ? "hidden" : ""}`}><h1>&gt;</h1></button>
						</div>
						<div className="divider-settings"></div>
						<div className="right-changing-options">
							<div className="profile-settings active-settings ">
								<div className="profile-picture-edit move">
									<img className="pencil-profile-pic" src={pencil} alt="" />
									<div className="black-overlay-for-the-profile-pic"></div>
									<img className="profile-picture-rn" src={profilePic} alt="" />
									<input className="new-pfp" type="file" />
								</div>
								<div className="username-edit move">
									<h1>username</h1>
									<input
										className="new-username"
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div className="description-edit move">
									<h1>Description</h1>
									<textarea
										className="new-description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
								<button className="submit-profile-edit move" onClick={onSaveProfile}>Save Changes</button>
							</div>
							<div className="password-settings">
								<div className="old-password move">
									<h1>Old Password</h1>
									<input
										className="old-password"
										type="password"
										onChange={(e) => setOldPassword(e.target.value)}
									/>
								</div>
								<div className="password-edit move">
									<h1>New Password</h1>
									<input className="new-password"
										type="password"
										onChange={(e) => setNewPassword(e.target.value)}
									/>
								</div>
								<div className="password-edit-again move">
									<h1>Retype New Password</h1>
									<input
										className="new-password-again"
										type="password"
										onChange={(e) => setNewPasswordAgain(e.target.value)}
									/>
								</div>
								<button className="submit-password-edit move" onClick={onPasswordSave}>Save Changes</button>
							</div>
							<div className="account-settings">
								<button className="submit-logout-account move" onClick={routeHomePage}>Logout</button>
								<button className="submit-delete-account move" onClick={deleteAccount}>Delete Account</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Settings