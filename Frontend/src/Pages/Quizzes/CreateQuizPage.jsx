import "../../Styles/Pages/CreateQuizPage.css"
import plus from "../../assets/Quizzes/plus.png"
import download from "../../assets/Quizzes/download.png"
import FlashCard from "../../Components/FlashCard.jsx";
import { useState } from 'react';

const CreateQuizPage = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [fileName, setFileName] = useState("");
	const handleDropZoneClick = () => {
		document.getElementById("file-upload").click();
	};
	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			console.log("File input event:", event.target.files); // Debugging
			setFileName(event.target.files[0].name); // Display selected file name
		}
	};
	return (
		<>
			<div className="create-quiz-container">
				<div className="back">
					<button className="back-button">
						<h1>&lt;</h1>
					</button>
				</div>
				<div className="creation-of-flash-cards">

					<div className="title-section">
						<h1>Create Quiz</h1>
					</div>
					<div className="two-side-container">
						<div className="left-side">
							<label>
								<p>Title</p>
								<span><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></span>
							</label>
							<label>
								<p>Description</p>
								<span><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></span>
							</label>
							<div className="card-section">
								<p>Cards</p>
							</div>
							<div className="flash-cards-create-container">
								<div className="flash-cards">
									{/* flash card components go here */}
									<FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
									<FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
									<FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
									<FlashCard questionInput={"what is 1 + 1"} answerInput={"2"} />
								</div>
								<div className="create-card">
									<button className="create-card-button">
										<img src={plus} alt="" />
									</button>
								</div>
							</div>
						</div>
						<div className="right-side">
							<h1>Create Using AI</h1>
							<div className="drop-zone" onClick={handleDropZoneClick}>
								{/* Display file name or default text */}
								{fileName ? (<p>`Selected file:${fileName}`</p>) : (<img src={download} />)}

								{/* Hidden File Input */}
								<input
									type="file"
									id="file-upload"
									className="file-input"
									onChange={handleFileChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default CreateQuizPage