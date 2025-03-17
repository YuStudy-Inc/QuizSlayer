import "../../Styles/Pages/CreateQuizPage.css"
import { useState } from 'react';
const CreateQuizPage =() =>{
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
    return (<>
        <div className = "create-quiz-container">
        <div className="title-section">
        <h1>Create Quiz</h1>
        </div>
        <div className ="two-side-container">
            <div className = "left-side">
           <label>
                Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title here" />
      </label> 
   
      <br></br>
      <label>
                Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description here" />
      </label>
      </div>
        <div className="right-side">
        <h2>Create Using AI</h2>
        <div className="drop-zone" onClick={handleDropZoneClick}>
     {/* Display file name or default text */}
     <p>{fileName ? `Selected file: ${fileName}` : "Drag and drop files here or click to upload"}</p>
          
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
        <div className="card-section">
        <h2>Cards</h2>

        </div>
        </div>

    </>
    )
}
export default CreateQuizPage