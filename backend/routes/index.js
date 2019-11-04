var express = require('express');
var router = express.Router();
var pictureModel =  require('../models/picture')

var cloudinary = require('cloudinary');
const request = require('request');

cloudinary.config({
  cloud_name:'epozecloud',
  api_key: 283252459172732,
  api_secret:'s5OTCt2zjkr7o3N3QYzNv6P3WcE'
});

const subscriptionKey = '34225faa68aa470bbb7c6ec40687687f';

const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST home page. */
router.post('/upload', function(req, res, next) {

var randomName = Math.floor(Math.random() * 1000000)

var photoPath = `/Users/arthurgamby/desktop/picture-${randomName}.jpg`;

console.log('Dans mon back-end -->',req.files.photo)

    req.files.photo.mv(photoPath,
      function(err) {
        if (err) {
          res.json({result: false, message: err} );
        } else {
    
        cloudinary.v2.uploader.upload(photoPath,
          function(error, result){
            if(result){

              console.log('This the result -->',result)

              // RAJOUT DEPUIS DEBUG
              const imageUrl = 'http://res.cloudinary.com/epozecloud/image/upload/v1571751021/'+result.public_id + '.jpg'

             // API AI

             // Request parameters.
              const params = {
                'returnFaceId': 'true',
                'returnFaceLandmarks': 'false',
                'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
                    'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
              };

              // API AI
              const options = {
                uri: uriBase,
                qs: params,
                body: '{"url": ' + '"' + imageUrl + '"}',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key' : subscriptionKey
                }
            };

            request.post(options,(error,response,body) =>{

              if (error) {
                console.log('Error: ', error);
                return;
              }

              let jsonResponse = JSON.parse(body);
              console.log(jsonResponse);

              if (jsonResponse.length > 0) {
                console.log("Face detected!")

                console.log('Age ---> ', jsonResponse[0].faceAttributes.age )

                var newPicture = new pictureModel({
                  url: result.secure_url,
                  name: result.original_filename,
                  age: jsonResponse[0].faceAttributes.age,
                  gender: jsonResponse[0].faceAttributes.gender
                })

                newPicture.save(function(error, picture){
                  console.log("PICTURE SAVED IN MY DATABASE --> "+ picture)
                  res.json({result: true, data: picture })
                })

              } else {
                console.log("No Face Detected")
                res.json({result: false, data: "No face detected" })
              }

            })
   

            } else {

              console.log('this is the error --->',error)
              res.json({result: false, message: 'File not uploaded!'} );

            }
          })

        }  
      }
    );
});

module.exports = router;
