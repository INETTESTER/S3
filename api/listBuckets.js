import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';

// config เดียวกับ putObject
const awsConfig = new AWSConfig({
    region: "us-east-1",
    accessKeyId: "xfJm1oGpEdvNHVx0pNXr",
    secretAccessKey: "unEcVjXtmSpLUwDCobG5zKV1vLD4d6lmbUK7i8t3",
    endpoint: "https://inet-s3-object-gw-c.inet.co.th",
    forcePathStyle: true, // ✅ แนะนำใส่เวลาใช้ endpoint custom
});

const s3 = new S3Client(awsConfig);

export async function listBuckets() {
    try {
        const res = await s3.listBuckets();
        // console.log(JSON.stringify(res, null, 2)); // debug ได้ถ้าอยากดูละเอียด
        return res;
    } catch (err) {
        console.error(`ListBuckets error: ${err}`);
    }
}
