import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';
import { AWS_ACCESS_KEY_ID, AWS_ENDPOINT_URL, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME } from './env.js';

const awsConfig = new AWSConfig({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    endpoint: AWS_ENDPOINT_URL,
    forcePathStyle: true,
});
const s3 = new S3Client(awsConfig);

// ---------- function listObjects ----------
export async function listObjects() {
    try {
        const res = await s3.listObjects(S3_BUCKET_NAME);
        //console.log(`Objects in ${bucketName}: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(`ListObjects error: ${err}`);
    }
}
