import { Route, Routes, BrowserRouter } from "react-router-dom";
import {Home, Landing} from "./Pages/Pages";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* <Route index element=> {}/> */}
					<Route index path='/' element={<Landing />}/>
					<Route path='/home' element={<Home />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App