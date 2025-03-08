import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<LandingPage />}/>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/home' element={<Home />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App