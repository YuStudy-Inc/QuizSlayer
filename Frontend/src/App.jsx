import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LandingPage, Home, Collection, Gacha, LoginSignup, Quizzes, Results, CreateQuizPage, EditQuizPage, Friends, Leaderboard, Settings, PageNotFound} from "./Pages/Pages";
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
							<Route path='/home' element={<Home />}/>
							<Route path='/collection' element={<Collection/>}/>
							<Route path='/friends' element={<Friends/>}/>
							<Route path='/quizzes' element={<Quizzes />}/>
							<Route path='/leaderboard' element={<Leaderboard />}/>
					</Route>
					<Route path='/createquiz' element={<CreateQuizPage />}/>
					<Route path='/editquiz/:quizId' element={<EditQuizPage />}/>
					<Route path='/gacha' element={<Gacha />}/>
					<Route path='/results' element={<Results />}/>
					<Route path='/settings' element={<Settings />}/>
					<Route path="*" element={<PageNotFound />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App