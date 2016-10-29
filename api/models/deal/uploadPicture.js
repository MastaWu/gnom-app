var config = require('../../config/config');
var aws = require('aws-sdk');
var multer = require('multer');
var multers3 = require('multer-s3');
var imageName;

var s3 = new aws.S3();
s3.config.update({
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.secret_access_key
});

var upload = multer({
    storage: multers3({
        s3: s3,
        bucket: 'gnom-app',
        key: function (req, file, cb)
        {
            imageName = req.body.restaurantName + "_" + req.body.deal_name + "_" + Date.now() + ".jpg";
            req.body.imageName = imageName;
            cb(null, req.body.imageName);
        }
    })
});

exports.uploadImage = upload;
