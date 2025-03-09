import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LandingPage, Home, Login} from "./Pages/Pages";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<LandingPage />}/>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/home' element={<Home />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App