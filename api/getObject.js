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



// ---------- get ----------
export async function getObject() {
    try {
        const res = await s3.getObject(S3_BUCKET_NAME, "ref-03.gif");
        //console.log(`⬇️ Downloaded: ref-6.gif, size=${res.Body.length} bytes`);
        return res;
    } catch (err) {
        console.error(`GetObject error: ${err}`);
    }
}




