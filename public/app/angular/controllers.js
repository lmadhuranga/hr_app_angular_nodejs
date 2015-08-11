 
var current_user = '1'; 

var AdminModule =  angular.module('Admin.controllers',['AdminUsers.services','ngCookies','ngRoute'])
AdminModule.controller('AdminLoginController', function($scope,AdminUser,$location, $cookies,api){
	// check loginis  
	if(!$cookies.get('member_id'))
	{
		$scope.AdminUser = new AdminUser();
		
		
		$scope.adminLogin = function(){		
			$scope.AdminUser.$login(function(){ 
				if ($scope.AdminUser.query_status=='success')
				{
					// Menu_nav.first_name = 
					var token = $scope.AdminUser.token;
					var member_id = $scope.AdminUser.user.member_id;
					var member_code = $scope.AdminUser.user.member_code;
					
					api.init(token,member_id,member_code);
					// set values in cokies
					$cookies.put('token',token); 
					$cookies.put('member_id',member_id); 
					$cookies.put('member_code',member_code);  
					$location.path('/appreciation/list'); 
				}
				else
				{ 
					//$scope.AdminUser = new User();
					$scope.err_msg = "Authentication fail";
					console.log('authentication faile'); 
				}
			});
			 
		}
	}
	else
	{
		// user logged to system redirect to appreciation list
		$location.path('/appreciation/list');
	}
	
})


var MemberModule =  angular.module('Members.controllers',['Members.services','Appreciations.services'])

//TODO:: add a memeber
MemberModule.controller('MembersAddController', function($scope,Members)
{

})

// list all members
MemberModule.controller('AppreciationsListController', function($scope,Members)
{
	// get members list from service
	$scope.Members = Members.query();
})

MemberModule.controller('MemberViewController', function($scope,AppreciationsByUser,Member,$routeParams)
{
	 // get cusotmer 
    $scope.Member = Member.get({memberid:$routeParams.memberid/*,token:token*/});
    // get apprecition list
    $scope.AppreciationsByUser = AppreciationsByUser.get_byuser({memberid:$routeParams.memberid/*,token:token*/});
    
})
 

var AppreciationsModule =  angular.module('Appreciations.controllers',['Appreciations.services'])

// add a memeber
AppreciationsModule.controller('AppreciationAddController', function($scope,$location,$routeParams,Member,Appreciations)
{
	$scope.Appreciation =  new Appreciations();
	$scope.Member = Member.get({memberid:$routeParams.appreciated_to/*,token:token*/});
	$scope.appreciation_add = function()
	{    
		// set values from session  
		$scope.Appreciation.appreciated_by = current_user;

		// add ajax send
		$scope.Appreciation.$create(function(){
			// redirect to home page 
             $location.path('/member/view/'+$routeParams.appreciated_to);
        })
	}
}) 


// add a memeber
AppreciationsModule.controller('AppreciationWithIdAddController', function($scope,$location,$routeParams,Member,Appreciations,$cookies )
{
	$scope.Appreciation =  new Appreciations();
	$scope.Member = Member.get({memberid:$routeParams.appreciated_to/*,token:token*/});
	$scope.appreciation_add = function()
	{  
		// set values from session 
		$scope.Appreciation.appreciated_to = $routeParams.appreciated_to;
		$scope.Appreciation.appreciated_by = $cookies.get('member_id'); 

		// add ajax send
		$scope.Appreciation.$create(function(){
			// redirect to home page  
            $location.path('member/view/'+$routeParams.appreciated_to);
        })
	}
}) 


 
//  log out user
AppreciationsModule.controller('AdminLogoutController', function($scope,$location,$routeParams,Member,Appreciations,$cookies )
{
	console.log('AdminLogoutController')
	 if(!$cookies.get('member_id'))
	 {
	 	// clear the cokies
	 	$cookies.remove('token'); 
		$cookies.remove('member_id'); 
		$cookies.remove('member_code');
		// redicrect to login page
		$location.path('/admin/login/');
	 }
	 else
	 {
	 	// user already log outed
	 	$location.path('/admin/login/');
	 }
}) 

//  Appreciation delte
AppreciationsModule.controller('AppreciationDeleteController', function($scope,$location,$routeParams,Appreciation,$cookies  )
{
	//debugger;
	console.log("delte ")
	console.log("delte "+$routeParams.id)
	// delte the appreciation
	 var Appreciation = new Appreciation();
	 
 	Appreciation.$delete({id:$routeParams.id},function(){
		// redirect user appreciations 
         $location.path('/member/view/'+$routeParams.user_id);
    })
}) 

