import "../../Styles/Pages/MainMenu/CreateQuizPage.css"
import { plus, download } from "../../assets/Pictures.js";
import {Ring} from 'ldrs/react';
import 'ldrs/react/Ring.css';
import { FlashCard, FlashCardCreationOverlay, Alert} from "../../Components/Components.js";
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
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [showCardCreationOverlay, setShowCardCreationOverlay] = useState(false)
	const [showAIAlert, setAIAlert] = useState(false)
	const [questions, setQuestions] = useState([])
	const [isBusy, setBusy] = useState(false);
	const [aiCreations, setAICreations] = useState(-1);
	const [usedMaxCreations, setUsedMaxCreations] = useState(false);

	useEffect(async () => {
		setBusy(true);
		try{
			const response = await axios.get(`${URI}users/getAICreations`, {withCredentials:true})
			setAICreations(response.AICreations);

			if(response.AICreations >= 2) {
				setUsedMaxCreations(true);
			}
		} catch (e) {
			console.error("couldn't get AI creations", e)
		}
		setBusy(false);
	}, [aiCreations])
		

	const navigate = useNavigate()

	const handleQuizCreation = async () => {
		if(isBusy) return;
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
			
			const quizId = quizResponse.data.quiz._id

			const updatedQuestionsWithNewId = questions.map(question => ({
				...question,
				quizId: quizId
			}))

			console.log(updatedQuestionsWithNewId)

            const questionsResponse = await axios.post(`${URI}questions/createQuestions`, {
				questions: updatedQuestionsWithNewId,
			},
			{
				withCredentials: true
			})

            if (questionsResponse.status === 200) {
                console.log("successfully created Quiz Questions")
            }
            navigate('/quizzes')
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

	const sleep = (ms) => new Promise(resolve =>setTimeout(resolve,ms));
	const handleFileChange = (event) => {
		setBusy(true);

		if (event.target.files.length > 0) {
			console.log("File input event:", event.target.files); // Debugging
			setFileName(event.target.files[0].name); // Display selected file name
			setFile(event.target.files[0]);
		}

		setAIAlert(true); 
	}

	const declineCreation = () => {
		setAIAlert(false);
		setFileName("");
		setFile(null);
		setBusy(false);
	}

	const acceptCreation = () => {

		setAIAlert(false);
		if(aiCreations >= 2) {
			setAIAlert(false);
			setBusy(false);
			return;
		}
		const formData = new FormData();
		formData.append('file', file)
		axios.post(`${URI}questions/createQuestionsFromPDF`, formData, 
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			},
			{
				withCredentials: true
			}
			).then(async response => {
			console.log('Success:', response.data)
			setAICreations(aiCreations + 1);
			for(const question of response.data.questions) {
				await sleep(1);
				const tempId = Date.now()
				setQuestions((questions) => [...questions, {
					_id: tempId,
					questionPrompt: question.question,
					answer: question.answer, 
				}])
			}
			setBusy(false);
		})
		.catch(error => {
			console.error('Error: ', error);
			setBusy(false);
		});
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
								{isBusy ?
									<div className = "loading-ring">
										<Ring size ="50" stroke = "6" color = "white"/> 
									</div>
									:
									<button className="create-card-button" onClick={createCard}>
										<img src = {plus} alt = ""/>
									</button>
								}
							</div>
						</div>
						<div className="right-side">
							<div className="create-ai-title">
								<h1>Create Using AI</h1>
							</div>
							{ isBusy ?
								<div className = "selected-file-zone">
									{fileName ? (<p>Loading file: `{fileName}`</p>) : (<Ring size ="50" stroke = "6" color = "white"/> )}
								</div>
								:
								<div className="drop-zone" onClick={handleDropZoneClick}>
									{/* Display file name or default text */}
									{fileName ? (<p>Selected file: `{fileName}`</p>) : (<img src={download} />)}

									{/* Hidden File Input */}
									<input
										type="file"
										id="file-upload"
										className="file-input"
										onChange={handleFileChange}
									/>
								</div>
							}	
						</div>
					</div>
				</div>
				<div className="create-that-quiz">
					<button className="create-that-quiz-button" onClick={handleQuizCreation}>
						<h1>Create</h1>
					</button>
				</div>
				{
					usedMaxCreations ? 
					<Alert 
						text={`You have used your maximum number of AI Creations for today!`}
						subtitle={`Remaining creations: ${aiCreations}`}
						buttonOneText={`Okay`}
						functionButtonOne={declineCreation}
						show={showAIAlert}
					/> :
					<Alert 
						text={`Create flashcards with the selected file: ${fileName}`}
						subtitle={`Remaining creations: ${aiCreations}`}
						buttonOneText={`Decline`}
						buttonTwoText={`Create`}
						functionButtonOne={declineCreation}
						functionButtonTwo={acceptCreation}
						show={showAIAlert}
					/>
				}
				{showCardCreationOverlay && (
					<FlashCardCreationOverlay makeNewCard={setQuestions} close={(handleCardCreationClose)}/>
				)}
			</div>
		</>
	)
}
export default CreateQuizPage