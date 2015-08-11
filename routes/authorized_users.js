var express = require('express');
var router = express.Router();
var validator = require('validator');
var dateFormat = require('dateformat'); 
var now = new Date();



/* GET users listing. */
router.get('/', function(req, res, next) {	
	var connection = req.connection;
		// console.log('index :'+req.index_r);
	connection.query('SELECT * FROM tbl_authorized_users',function(err,rows){ 
	
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else{
			res.json(rows);
			// res.render('customers',{page_title:"Customers - Node.js",data:rows});
		}

	});
});



/* POST user login. */
router.post('/login/:id', function(req, res, next) {
	var id = req.params.id
	var connection = req.connection;

	//TODO:: loging using api tpro 
 	connection.query('SELECT member_id  FROM tbl_authorized_users WHERE enable="1" AND member_id="'+id+'"',function(err,row)
	{
		if(err)
		{
			console.log("Error Selecting : %s ",err );	 
		}
		else
		{
			if (row.length>=1)
			{
				res.json(row);
			}
			else
			{	

				res.json({error:'Not Found'});
			}
			 
		}

	});
});




/* POST user login. */
router.post('/login/', function(req, res, next) { 

	var connection = req.connection;

	var username = req.body.username;
	var password = req.body.password; 

	// check values assign
	if ((validator.isNull(username)||validator.isNull(password)))
	{ 
		return res.json({error:"Missing Parameters",/*para:req.body,*/ username:username,password:password});
	}
	else
	{
		var connection = req.connection;
	 	var request = require('request');
		var now_fomated = dateFormat(now, "yyyy-mm-dd hh:MM:ss");
		var formData = {
			username: username,
			password: password 
			// username: 'madhuranga',
			// password: 'demodemo' 

		};
		request.post({url:'http://tpro.openarc.lk/index.php/api/mobileapi/apiLogin', formData: formData}, function optionalCallback(err, httpResponse, body) {
			
			if (err) {
				return console.error('err', err);
			}

			// check login success - 200
			var jsonObject = JSON.parse(body);  
			if (jsonObject.query_status=='success')
			{  
				// new create the token
				var new_token = "new_token2";
				// check exist user
				connection.query('SELECT member_id  FROM tbl_authorized_users WHERE member_id="'+jsonObject.user.member_id+'"',function(err,member){
					if (member.length==0)
					{
						console.log('new_mmeber');
						// insert to the table with default user_role
						connection.query("INSERT INTO `tbl_authorized_users`(`member_id`, `auth_type`, `token`, `enable`, `created`, `modified`) VALUES ("+jsonObject.user.member_id+",'emp','new_token','1','"+now_fomated+"','"+now_fomated+"');",function(err,result){
							console.log('new member inserted');
							jsonObject.token = new_token;
							return res.json(jsonObject)
						});
					}
					else
					{
						// update with new token
						connection.query("UPDATE `tbl_authorized_users` SET `token` = '"+new_token+" ' WHERE `tbl_authorized_users`.`id` = '"+member.id+"';",function(err,result){
							console.log('update the member with new token');
							jsonObject.token = new_token;
							return res.json(jsonObject);
						});
					}
				});  
			}
			else
			{ 
				// return the json error
				console.log('err','ln124');
				res.json(jsonObject);
			}
			
		});
	}



});




module.exports = router;