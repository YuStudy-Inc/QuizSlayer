import aws from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config();

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3();
export default s3;


//bruh idk how to do this i need to keep researching