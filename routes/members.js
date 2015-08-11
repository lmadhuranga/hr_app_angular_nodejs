var express = require('express');
var router = express.Router();
var request = require('request');
var request = require('request');
var _ = require('underscore-node');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var connection = req.connection;
		// console.log('index :'+req.index_r);
	connection.query(" SELECT `id`,`appreciated_to`, count('id') AS `appriciation_count` FROM `tbl_appreciations` GROUP BY `appreciated_to` ORDER BY `appriciation_count` DESC ",function(err,rows){ 
	
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else{

			var member_ids_list = [];
			var appreciation_list = [];

			// get all ids
			_.each(rows, function(member, key, list){
				appreciation_list[member.appreciated_to];

				member_ids_list.push(member.appreciated_to);

				appreciation_list[member.appreciated_to] =  member;

			});	

			var formData = {"member_id[]":member_ids_list} 
			request.post({url:'http://tpro.openarc.lk/index.php/api/mobileapi/apiMemeberName', formData: formData}, function optionalCallback(err, httpResponse, body) {
				if (err)
				{
					return console.error('err', err);
				}
				var jsonObject = JSON.parse(body); 
				res.json(jsonObject.members_data)
				// return res.json(jsonObject.members_data[0]);
				
			});
			 
		}

	});

}); 

/* GET user listing. */
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var connection = req.connection; 

	connection.query(" SELECT `id`,`appreciated_to`, count('id') AS `appriciation_count` FROM `tbl_appreciations` WHERE appreciated_to='"+id+"' GROUP BY `appreciated_to` ORDER BY `appriciation_count` DESC  LIMIT 1",function(err,rows){ 
	
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else{

			if (rows.length>0)
			{

				//get member name from TPRO api
				var member_ids_list = [rows[0].appreciated_to]; 
				var formData = {"member_id[]":member_ids_list} 
				request.post({url:'http://tpro.openarc.lk/index.php/api/mobileapi/apiMemeberName', formData: formData}, function optionalCallback(err, httpResponse, body) {
					if (err)
					{
						return console.error('err', err);
					}
					var jsonObject = JSON.parse(body); 
					return res.json(jsonObject.members_data[0]);
					
				})
				
			}
			else
			{
				res.statusCode = 404;
				return res.send('Error 404: Not found member');
			}
		}

	});

}); 

module.exports = router;