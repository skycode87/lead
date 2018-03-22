
function logout(){

  $.ajax({
   method: "POST",
   url:   "https://qreatech.com/API/agent.php/"+sessionStorage.getItem("access")+"/logout", 
   dataType: "json"
 }).done(function(result) {


 });


 sessionStorage.setItem("access","");
 sessionStorage.setItem("lsd","");
 sessionStorage.setItem("role","");
 sessionStorage.setItem("code","");

}



function login07(){

  logout();

  var parametros = {
          //  "name" : $("#status-select").val(),
          "login" : $("#email").val(),
          "password" : $("#password").val()
        };


        $.ajax({
         data: parametros,
         method: "POST",
         url:   'https://qreatech.com/API/agent.php/1/login'
       }).done(function(result) {
        result = $.trim(result);

        if( result !== "error"){


         jsonData = jQuery.parseJSON(result);

         if(jsonData[0].id>0){
           $("#password").val("");
           console.log(jsonData[0]['access']);
           sessionStorage.setItem("lsd", JSON.stringify(result));
           uss = jQuery.parseJSON(sessionStorage.getItem("lsd"));
           sessionStorage.setItem("filterData","all");
           sessionStorage.setItem("code",uss[0].id);
           sessionStorage.setItem("avatar",uss[0].avatar);
           sessionStorage.setItem("access",uss[0].access);
           sessionStorage.setItem("login",uss[0].email);
           sessionStorage.setItem("token",uss[0].token);
           sessionStorage.setItem("role",uss[0].role); 
           location.href="inicio.html";
         }


       }else{
        console.log("Error en API");
        swal({title: "Datos incorrecto",text:"Verifique y vuelvalo a intentar "});
       }





    });





     }

