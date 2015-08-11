var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();
var _ = require('underscore-node');


/* GET users listing. */
router.get('/', function(req, res, next) {	
	var connection = req.connection;
	connection.query('SELECT * FROM tbl_appreciations  ORDER BY `id` DESC ',function(err,rows){
		
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else{
			res.json(rows)
			// res.render('customers',{page_title:"Customers - Node.js",data:rows});
		}

	});
});


/* POST add a appreciation. */
router.post('/', function(req, res, next) {	

	var connection = req.connection;
	console.log("INSERT INTO `tbl_appreciations`(`appreciation`, `appreciated_to`, `appreciated_by`,`created`, `modified`) VALUES ('"+req.body.appreciation+"','"+req.body.appreciated_to+"', '"+req.body.appreciated_by+"',  '2015-02-02', '2015-02-02')")
	connection.query("INSERT INTO `tbl_appreciations`(`appreciation`, `appreciated_to`, `appreciated_by`,`created`, `modified`) VALUES ('"+req.body.appreciation+"','"+req.body.appreciated_to+"', '"+req.body.appreciated_by+"',  '2015-02-02', '2015-02-02')",function(err,rows){
		
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else{
			res.json({status:'success'})
			// res.render('customers',{page_title:"Customers - Node.js",data:rows});
			// res.render('customers',{page_title:"Customers - Node.js",data:rows});
		}

	});
});



/* GET appreciation details. */
router.get('/byuser/:id', function(req, res, next) {
	var id = req.params.id; 
	var connection = req.connection;
	connection.query(" SELECT * FROM `tbl_appreciations` WHERE appreciated_to='"+id+"' ORDER BY `id` DESC ",function(err,rows){ 
		
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else
		{ 

			// get the members name from TPRO api
			if (rows.length>0) {

				// console.log("------------------------rows------------------------");
				// console.log(rows);
				// console.log("------------------------rows------------------------");
				var member_ids_list = [];
				var appreciations_list = [];
				// get all user names
				_.each(rows,function(row) { 
					// collect the member ids 
					// console.log("------------------------row------------------------");
					// console.log(row);
					// console.log("------------------------row------------------------");
					member_ids_list.push(row.appreciated_by);
					if (!appreciations_list[row.appreciated_by]) {
						appreciations_list[row.appreciated_by] = [];
					}
					appreciations_list[row.appreciated_by].push(row);
				});

				// console.log("---------------------------member_ids_list---------------------------");
				// console.log(member_ids_list);
				// console.log("---------------------------member_ids_list---------------------------");
				//get member name from TPRO api  
				var formData = {"member_id[]":member_ids_list}  
				request.post({url:'http://tpro.openarc.lk/index.php/api/mobileapi/apiMemeberName', formData: formData}, function optionalCallback(err, httpResponse, body) {
					if (err)
					{
						return console.error('err', err);
					}
					var jsonObject = JSON.parse(body);
					// console.log("---------------------------------jsonObject.members_data---------------------------------");
					// console.log(jsonObject.members_data);
					// console.log("---------------------------------jsonObject.members_data---------------------------------"); 
					var appreciation_with_names = [];

					_.each(jsonObject.members_data, function(member, key, list){ 
						// console.log(member);
						var appreciation_member_tmp = {}; 
						appreciation_member_tmp.member_id = member.member_id;
						appreciation_member_tmp.first_name = member.first_name;
						appreciation_member_tmp.last_name = member.last_name;
						appreciation_member_tmp.designation = member.designation;
						appreciation_member_tmp.division_code = member.division_code;
						appreciation_member_tmp.division = member.division;

						appreciation_with_names.push({appreciation_member_details:appreciation_member_tmp, appreciations:appreciations_list[member.member_id] });
					});
					// console.log(appreciation_with_names);
					return res.json(appreciation_with_names);	
				}) 

			}  
			else
			{
				res.json(404,{status:'not_found',err:'not_found'})
			}
		}

	});

}); 

/* GET appreciation details. */
router.get('/:id', function(req, res, next) {
	var id = req.params.id; 
	var connection = req.connection;
	connection.query(" SELECT * FROM `tbl_appreciations` WHERE id='"+id+"' ORDER BY `id` DESC  ",function(err,rows){ 
	
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else{
			res.json(rows);
		}

	});

}); 


/* Delete appreciation details. */
router.delete('/:id', function(req, res, next) {
	var id = req.params.id; 
	var connection = req.connection;
	connection.query(" DELETE  FROM `tbl_appreciations` WHERE id='"+id+"'  LIMIT 1 ",function(err,rows){ 
	
		if(err){
			console.log("Error Selecting : %s ",err );
		}
		else{ 
			res.json({msg:'Operation Success'});
		}

	});

}); 


module.exports = router;


