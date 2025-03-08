import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Pages/Landing.css';
function Landing() {

	let navigate = useNavigate();
	const updateRoute = (path) => {
		navigate(path)	
	};

	return (
		<div className="diagonal">
			<h1 className="header">Quiz Slayer</h1>
			<div className="button-container">
			<button className="btn" id="login" onClick={() => {updateRoute('login')}}>Login</button>
			<button className="btn">Sign up</button>
			</div>
		</div>
	)
}

export default Landing
