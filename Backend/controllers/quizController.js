export const createQuiz = async(req, res) => {
    try {
        const { title, description } = req.body
    
        if (!title || !description || title === "" || description === "")
            return res.status(404).json({ message: "Not all fields filled out" })
    
        const newQuiz = new Quiz({
            title,
            description,
            questions: [] // list of question objects

        })
        await newQuiz.save()
        res.status(200).json({
            "message": "Quiz Created Successfully",
            "quiz": newQuiz
        })
    } 
    catch (e) {
        console.error("error creating quiz: ", e)
        res.status(500).json({"message": "Error creating quiz", "e": e})
    }
}

export const editQuiz = async (req,res) => {
    try {
        const quizId = req.params.id
        
        //Only changes the parameter that was included in the json req
        const result = await Quiz.findOneAndUpdate({_id: quizId}, {$set: req.body}, {new: true})
        if(result == null){
            res.status(404).json({error: 'No Quiz with that ID'})
            return;
        }
        
        console.log(result);
        res.status(200).json({
            message: 'Quiz edited successfullly',
            object: result
        }) 

    } catch (e) {
        res.status(500).json({error: "Quiz not modified"})
        console.log(e)
    }
}

export const deleteQuiz = async(req, res)=>{
    const{id} = req.params;
    try{
        const deletedQuiz = await Quiz.findByIdAndDelete(id);
        if(!deletedQuiz){
            console.log("Quiz was not found")
            return;
        }
        console.log("Quiz deleted successfully!")
    }
    catch(err){
        console.log("An error occured while connecting to the database: ");
        console.log(err)
    }
}

//need a get all quizzes from user id