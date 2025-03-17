import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LandingPage, Home, Collection, LoginSignup, Quizzes, Results, CreateQuizPage} from "./Pages/Pages";
import { Navbar } from './Components/Components'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<LandingPage />}/>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/login' element={<LoginSignup />}/>
					<Route path='' element={<Navbar/>}>
							<Route path='home' element={<Home />}/>
							<Route path='collection' element={<Collection/>}/>
					</Route>
					<Route path='/results' element={<Results />}/>
					<Route path='/quizzes' element={<Quizzes />}/>
					<Route path='/createquizpage' element={<CreateQuizPage />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App