
function login(){

    var parametros = {
        "login" : $("#login").val(),
        "password" : $("#password").val()
    };

    $.ajax({
        data:  parametros, 
        url:   'https://qreatech.com/API/user.php/1/login', 
                type:  'post', //método de envio
                beforeSend: function () {
                    console.log("wait..");
                },
                success:  function (response) { 

                    $("#password").val("");

                    if(response.trim()=="error"){
                      swal({
                        title: "Datos incorrecto",
                        text: " Verifique y vuelvalo a intentar "
                    });


                  }else{

                    sessionStorage.setItem("profile", JSON.stringify(response));
                    window.location.href = "list-users.html";

                }



            }
        }); 



}
