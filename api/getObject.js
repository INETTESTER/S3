import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';

// กำหนด config S3
const awsConfig = new AWSConfig({
    region: "us-east-1",
    accessKeyId: "xfJm1oGpEdvNHVx0pNXr",
    secretAccessKey: "unEcVjXtmSpLUwDCobG5zKV1vLD4d6lmbUK7i8t3",
    endpoint: "https://inet-s3-object-gw-c.inet.co.th",
    forcePathStyle: true,
});

const s3 = new S3Client(awsConfig);


// ---------- get ----------
export async function getObject() {
    try {
        const res = await s3.getObject("test-zte", "ref-6.gif");
        //console.log(`⬇️ Downloaded: ${objectKey}, size=${res.Body.length} bytes`);
        return res;
    } catch (err) {
        console.error(`GetObject error: ${err}`);
    }
}




