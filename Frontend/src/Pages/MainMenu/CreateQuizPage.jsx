import "../../Styles/Pages/MainMenu/CreateQuizPage.css"
import { plus, download } from "../../assets/Pictures.js";
import { FlashCard, FlashCardCreationOverlay } from "../../Components/Components.js";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URI = import.meta.env.VITE_APP_URI
const userId = JSON.parse(localStorage.getItem('id'));

const CreateQuizPage = () => {
	const [quizData, setQuizData] = useState({
        title: "",
        description: "",
    })
	const [fileName, setFileName] = useState("");
	const [showCardCreationOverlay, setShowCardCreationOverlay] = useState(false)
	const [questions, setQuestions] = useState([])

	const navigate = useNavigate()

	const handleQuizCreation = async () => {
		try {
            const quizResponse = await axios.post(`${URI}quizzes/createQuiz`, {
				userId: userId,
				title: quizData.title,
				description: quizData.description,
				completed: false,
			},
			{
				withCredentials: true
			})
            if (quizResponse.status === 200) {
                console.log("successfully created Quiz")
            }

			const quizId = quizResponse.data.quiz.quizId

			const updatedQuestionsWithNewId = questions.map(question => ({
				...question,
				quizId: quizId
			}))

            const questionsResponse = await axios.post(`${URI}questions/createQuestions`, {
				questions: updatedQuestionsWithNewId,
			},
			{
				withCredentials: true
			})

            if (questionsResponse.status === 200) {
                console.log("successfully created Quiz Questions")
            }
            navigate(-1)
        }
        catch (e) {
            console.error("error saving changes to quiz", e)
        }
	}

	const handleChange = (e) => {
        setQuizData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
		console.log(quizData)
    }

	const createCard = () => {
		setShowCardCreationOverlay(true)
	}

	const handleCardCreationClose = () => {
		setShowCardCreationOverlay(false)
	}

	const handleDropZoneClick = () => {
		document.getElementById("file-upload").click();
	}

	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			console.log("File input event:", event.target.files); // Debugging
			setFileName(event.target.files[0].name); // Display selected file name
		}
	}

	return (
		<>
			<div className="create-quiz-container">
				<div className="back">
					<button className="back-button" onClick={() => navigate('/quizzes')}>
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
								<span><input type="text" name="title" onChange={handleChange} /></span>
							</label>

							<label>
								<p>Description</p>
								<span><input type="text" name="description" onChange={handleChange} /></span>
							</label>

							<div className="card-section">
								<p>Cards</p>
							</div>

							<div className="flash-cards-create-container">
								<div className="flash-cards">
									{questions.map((question) => (
                                        <FlashCard key={question._id} id={question._id} questionInput={question.questionPrompt} answerInput={question.answer} editing={false} onEdit={() => {}} />
                                    ))}
								</div>
							</div>
							<div className="create-card">
								<button className="create-card-button" onClick={createCard}>
									<img src={plus} alt="" />
								</button>
							</div>
						</div>
						<div className="right-side">
							<div className="create-ai-title">
								<h1>Create Using AI</h1>
							</div>
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
				<div className="create-that-quiz">
					<button className="create-that-quiz-button" onClick={handleQuizCreation}>
						<h1>Create</h1>
					</button>
				</div>
				{showCardCreationOverlay && (
					<FlashCardCreationOverlay makeNewCard={setQuestions} close={(handleCardCreationClose)}/>
				)}
			</div>
		</>
	)
}
export default CreateQuizPage