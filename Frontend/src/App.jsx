import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Collection, LandingPage, LoginSignup} from "./Pages/Pages";
import { Navbar } from "./Components/Components"

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<LandingPage />}/>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/login' element={<LoginSignup />}/>
					<Route path='' element = {<Navbar />}>
						<Route path='home' element={<Home />}/>
						<Route path='collection' element={<Collection/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App