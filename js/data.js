
function access(){

}




function inicializacion(){

     $.ajax({
      method: "GET",
      url: "data/lead.json",
      dataType: "json"
     })
     .done(function(n) {
      $("a.go_principal").attr("href",n.principal);
      $("a.go_user").attr("href",n.user);
      $("a.go_users").attr("href",n.users);
      $("a.go_client").attr("href",n.client);
      $("a.go_login").attr("href",n.login);
      $("a.go_logout").attr("href",n.logout);
      $("a.go_password").attr("href",n.password);
      $("a.go_profile").attr("href",n.profile);
    });



}


function API(){
     return "https://qreatech.com/API/";
}


function setApp(x){
     sessionStorage.setItem("idApp",x);
}


function getApp(){
     return  sessionStorage.getItem("idApp");
}


function profile() {
     uss = jQuery.parseJSON(sessionStorage.getItem("lsd"));
     sessionStorage.setItem("code",uss[0].id);
     sessionStorage.setItem("avatar",uss[0].avatar);
     sessionStorage.setItem("access",uss[0].access);
     sessionStorage.setItem("login",uss[0].email);
     sessionStorage.setItem("token",uss[0].token);
     sessionStorage.setItem("role",uss[0].role);
     return uss;
}


   function getCode() {
     return sessionStorage.getItem("code");
   }



   function getAvatar() {
     return sessionStorage.getItem("avatar");
   }


   function getAccess() {
     return sessionStorage.getItem("access");
   }

   function getLogin() {
     return sessionStorage.getItem("login");
   }

   function getToken() {
     return sessionStorage.getItem("token");
   }

   function getRole(){
    return sessionStorage.getItem("role");
   }


   function getFilterData(){
     return sessionStorage.getItem("filterData");
  }

  function setFilterData(x){
     return sessionStorage.setItem("filterData",x);
  }

function  
