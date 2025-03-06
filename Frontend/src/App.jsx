import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* <Route index element=> {}/> */}
					<Route path='/home' element={<Home />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App