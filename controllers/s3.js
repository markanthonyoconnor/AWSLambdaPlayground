const AWS = require('aws-sdk');

AWS.config.apiVersions = {
  s3: '2006-03-01',
  // other service API versions
};

AWS.config.update({region: 'eu-west-1'});
const s3 = new AWS.S3();

const getObject = (bucket, key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket,
      Key: key
     };

     s3.getObject(params,(err, data) => {
       if (err) {
         reject(err);
       } // an error occurred
       else {
         resolve(data);           // successful response
       }
    });
 });
}

const putObject = (body, bucket, key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Body: body,
      Bucket: bucket,
      Key: key
     };

     s3.putObject(params,(err, data) => {
       if (err) {
         reject(err);
       } // an error occurred
       else {
         resolve(data);           // successful response
       }
    });
 });
}

module.exports = {
  putObject,
  getObject
};
