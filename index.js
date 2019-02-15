const sharp = require('sharp');
const fs = require('fs');
const s3 = require('./controllers/s3');


exports.handler = (event, context) => {

  // Source bucket
  const srcBucket  = event.Records[0].s3.bucket.name

// Destination Bucket
  const dstBucket = `${srcBucket}-resize`

  // Key
  const key = event.Records[0].s3.object.key

  s3.getObject(srcBucket, "mrRobot.jpg")
      .then((data) =>{

        sharp('mrRobot.jpg')
          .resize({ width: 100 })
          .toBuffer((err, data) => {
          //.toFile('mrRobot-resize.jpg', (err) => {

            if (err){
              context.fail(err);
            }
            else {

                s3.putObject(data, dstBucket, key)
                .then((err) =>{
                    context.done(null, "Complete");
                })
                .catch((err) => {
                  context.fail(err);
                })

            }

          })
      })
}
