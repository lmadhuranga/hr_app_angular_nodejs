<?php 
if (isset($_GET))
 { 
 	if ((!isset($_GET['user_name']) ) || (!isset($_GET['password']) ) ) {
 		echo  json_encode(array('Missing parameters'));
 		exit();
 	}
	$user_name = $_GET['user_name'];
	$password = $_GET['password'];

	$returnJson =array();
	if (($user_name=="admin")&&($password=='admin')) {
		$returnJson = array('login' =>true );
	}
	else{
		
		$returnJson = array('login' =>false);
	}

	echo json_encode($returnJson);
	exit(); 
}
else{
	echo  json_encode(array('Wrong METHOD'));
	exit();
}
	
 ?>