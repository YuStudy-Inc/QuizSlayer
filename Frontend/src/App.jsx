import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LandingPage, Home, LoginSignup} from "./Pages/Pages";
import { Navbar } from "./Components/Components"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<LandingPage />}/>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/login' element={<LoginSignup />}/>
					{/* <Route path='/home' element={<Home />}/> */}
					<Route path='' element = {<Navbar />}>
						<Route path='home' element={<Home />}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App