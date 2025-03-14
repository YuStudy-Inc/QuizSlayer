import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LandingPage, Home, LoginSignup, Results} from "./Pages/Pages";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<LandingPage />}/>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/login' element={<LoginSignup />}/>
					<Route path='/home' element={<Home />}/>
					<Route path='/results' element={<Results />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App