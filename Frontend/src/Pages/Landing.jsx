import { useState } from 'react'
import '../Styles/Pages/Landing.css';
function Login() {
	return (
		<div className="diagonal">
			<h1 className="header">Quiz Slayer</h1>
			<div className="button-container">
			<button className="btn">Login</button>
			<button className="btn">Sign up</button>
			</div>
		</div>
	)
}

export default Login
