import express from 'express';
import { createQuestions, editQuestions, deleteQuestions, createQuestionsFromPDF } from '../controllers/questionController.js';
import multer from 'multer'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024*1024*10
  }
});
//module.exports = upload;
//router.use(express.raw({type: 'application/octet-stream', limit: '10mb'}));
/* router.get('/getQuestions', getQuestionsFromQuizID) */
router.post('/createQuestionsFromPDF', (req,res,next) => {
  upload.single('file')(req,res, (err) => {
    createQuestionsFromPDF(err,req,res);
  })
});
router.post('/createQuestions', createQuestions)
router.put('/editQuestions', editQuestions)
router.delete('/deleteQuestions', deleteQuestions)
router.get('/', (req, res) => {
    res.send('Users route works!');
  });
export default router;