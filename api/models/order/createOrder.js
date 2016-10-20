// CREATE (POST) ORDER where id is given from request parameters
var paypal = require('paypal-rest-sdk');
var Hashids = require('hashids');
var hashids = new Hashids();

module.exports = function createOrder(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    var payment = {
        "intent" : "sale",
        "payer" : {
            "payment_method" : "paypal"
        },
        "redirect_urls" : {
            "return_url" : app.locals.baseurl + "/success",
            "cancel_url" : app.locals.baseurl + "/cancel"
        },
        "transactions": [{
            "amount" : {
                "total" : parseInt(req.body.orderInfo.amount),
                "currency" : req.body.orderInfo.currency
            },
            "description": req.body.orderInfo.description
        }]
    };

    // req.param is used for get methods
    req.body.userInfo.user_id = hashids.decode(req.body.userInfo.user_id);
    queryValues.push(req.body.userInfo);
    queryValues.push(req.body.orderInfo.amount);
    queryValues.push(req.body.orderInfo.description);
    console.log(queryValues);

    var createOrderQuery = {
        sql: "INSERT INTO gnomApp.order SET ?;",
        values: queryValues
    };
// http://stackoverflow.com/questions/27595796/paypal-integration-with-single-page-app
    paypal.payment.create(payment, function(error, payment) {
       if (error) {
           console.log(error);
       }  else {
           if(payment.payer.payment_method === 'paypal') {
               req.paymentId = payment.id;
               var redirectUrl;
               console.log("createOrder: Order has been successfully submitted to paypal: " + JSON.stringify(payment));
               for(var i = 0; i < payment.links.length; i++) {
                   var link = payment.links[i];
                   if (link.method === 'REDIRECT') {
                       redirectUrl = link.href;
                   }
               }

               console.log("createOrder: Order has been successfully submitted to paypal: " + JSON.stringify(payment));

               database.query(createOrderQuery, function(results) {
                   console.log("createOrder: Order has been saved to database: " + JSON.stringify(results));
                   res.status(200).json(results);
               });

               res.redirect(redirectUrl);
           }
       }
    });
};
