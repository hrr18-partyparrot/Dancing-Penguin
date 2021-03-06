// services go here

angular.module("crowdcart.services",[])

.factory("Auth", function($http, $location, $window) {

  // signin
  var signin = function(email) {

    //return is used to check when it finishes sending the mail
    return $http({
      method: "POST",
      url: "/sendtoken",
      data: JSON.stringify({user: email})
    })
    .then(function(res) {
      return res.data
    })
  }

  // signup
  var signup = function(user) {
    console.log(user)
    return $http({
      method: "POST",
      url: "/api/signup",
      // clarify on data format
      data: JSON.stringify(user)
    })
    .then(function(res) {
      return res.data
    })
  }

  var isAuthenticated = function () {
    // check local to see if passwordless has authenticated the user
    // by teh existence of crowdcartuser
    return !!$window.localStorage.getItem("crowdcartuser")
  }

  var signout = function () {
    $window.localStorage.removeItem("crowdcarttoken");
    $window.localStorage.removeItem("crowdcartuser");
    $window.localStorage.removeItem("crowdcartuserstreet");
    $window.localStorage.removeItem("crowdcartusercity");
    $window.localStorage.removeItem("crowdcartuserstate");
    $window.localStorage.removeItem("crowdcartuserzip");
    $http({
      'method': 'GET',
      'url': '/api/logout'
    })
  }

  return {
    signin: signin,
    signup: signup,
    isAuthenticated: isAuthenticated,
    signout: signout
  }


})

.factory("Lists", function($http) {
  // used to send buyer a status if job was taken
  var addJobStatus = function(list) {
    console.log('Im inside the add status factor!!!!');
    $http({
      method: "POST",
      url: "/api/addJobStatus",
      data: list
    })
  }

  // get all lists for specific user; since with routing to decide if that's the right meaning
  var getLists = function (id) {
    // console.log("getting all lists for", id)
    var user = {userid: id}
    // console.log(JSON.stringify(user))
    return $http({
      method: "GET",
      url: "/api/lists/" + id
      // data: JSON.stringify(user)
    })
    .then(function(res) {
      // console.log('lists: ', res.data)
      return res.data;
    })
  }

  // get one list when given listid
  var getOneList = function(listid) {
    return $http({
      method: "GET",
      url: "/api/list/" + listid
    })
    .then(function(res) {
      return res.data
    })
  }

  //get all lists in system
  var getAllList = function() {
    return $http({
      method: "GET",
      url: "/api/crowd"
    })
    .then(function(res){
      // console.log('ALL LISTS: ', res.data);
      return res.data;
    })
  }

  // posting a new lists
  var newList = function (list) {
    return $http({
      method: "POST",
      url: "/api/lists",
      data: list
    });
  }

  var deleteList = function (listid) {
    return $http({
      method: "DELETE",
      url: "/api/lists/" + listid
    })
  }

  // added because server route looks to handle, not sure if we will need it
  var updateStatus = function (listId, status) {
    return $http({
      method: "POST",
      url: "api/status",
      // need to decide on format for this call
      data: listId, status
    })
  }

  // Used when Updating Job Deliverer_id
  var updateList = function (list) {
    return $http({
      method: "PUT",
      url: "/api/lists",
      data: list
    })
  }

  // Modifies a list
  var modifyList = function (list) {
    return $http({
      method: "PUT",
      url: "/api/modify",
      data: list
    })
  }

  return {
    getLists: getLists,
    getAllList: getAllList,
    getOneList: getOneList,
    newList: newList,
    updateStatus: updateStatus,
    newList: newList,
    updateList: updateList,
    deleteList: deleteList,
    modifyList: modifyList,
    addJobStatus: addJobStatus
  }

})
.factory("Jobs", function($http) {
  var addCancelStatus = function(list) {
    $http({
      method: "POST",
      url: "/api/addCancelStatus",
      data: list
    })
  }

  var addCompleteStatus = function(list) {
    $http({
      method: "POST",
      url: "/api/addCompleteStatus",
      data: list
    })
  }

  // get all jobs for specific user
  var getJobs = function (id) {
    var user = {userid: id}
    return $http({
      method: "GET",
      url: "/api/jobs/" + id,
      data: JSON.stringify(user)
    })
    .then(function (res) {
      return res.data
    })
  }

  // update job status when task complete
  var updateJobStatus = function (listId, status) {
    return $http({
      method: "POST",
      url: "api/jobs",
      data: listId, status
    })
  }

  // maybe mvp
  var deleteJob = function (list) {
    return $http({
      method: "DELETE",
      url: "/api/jobs",
      data: list /*id*/
    })
  }

  return {
    getJobs: getJobs,
    updateJobStatus: updateJobStatus,
    deleteJob: deleteJob,
    addCancelStatus: addCancelStatus,
    addCompleteStatus: addCompleteStatus
  }

})