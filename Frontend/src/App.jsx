import { Route, Routes, BrowserRouter } from "react-router-dom";
import {Home, Landing, Login} from "./Pages/Pages";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* <Route index element=> {}/> */}
					<Route index path='/' element={<Landing />}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/home' element={<Home />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App