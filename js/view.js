function navegacion(){


	$(".nav ul").remove();



	if(getRole()=="SUPERVISOR"){

		$("nav").append("<ul class='side-menu-list'>\
			<li class='green'>\
			<a  class='go_principal' >\
			<i class='font-icon font-icon-users'></i>\
			<span class='lbl'>Contactos</span>\
			</a>\
			</li>\
			</ul>");


		$("#botonesAcciones").hide();


	}else{


		$("nav").append("<ul class='side-menu-list'>\
			<li class='green'>\
			<a  class='go_principal' >\
			<i class='font-icon font-icon-users'></i>\
			<span class='lbl'>Contactos</span>\
			</a>\
			</li>\
			<li class='blue ' >\
			<a  class='go_users' >\
			<i class='fa fa-tags'></i>\
			<span class='lbl'>Usuarios</span>\
			</a>\
			</li>\
			<li class='magenta ' style='display:none'>\
			<a class='go_password' >\
			<i class='fa fa-lock'></i>\
			<span class='lbl'>Password</span>\
			</a>\
			</li>\
			<li class='magenta' style='display:none'>\
			<a class='go_profile' >\
			<i class='font-icon font-icon-user'></i>\
			<span class='lbl'>Mi Perfil</span>\
			</a>\
			</li>\
			<li class='magenta' style='display:none'>\
			<a href='#'>\
			<i class='font-icon font-icon-notebook'></i>\
			<span class='lbl'>Tasks</span>\
			</a>\
			</li>\
			<li class='magenta' style='display:none'>\
			<a href='#'>\
			<i class='font-icon font-icon-zigzag'></i>\
			<span class='lbl'>Activity</span>\
			</a>\
			</li>-->\
			</ul>");











	}

}




function usermenu(){

	$(".user-menu button").remove();
	$(".user-menu div").remove();

	$(".user-menu").append("<button class=\"dropdown-toggle\" id=\"dd-user-menu\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\
		<img src=\""+getAvatar()+"\" alt=\"\">\
		</button>\
		<div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"dd-user-menu\">\
		<a class=\"dropdown-item\" href=\"myprofile.html\"><span class=\"font-icon glyphicon glyphicon-user\"></span>Mi Perfil </a>\
		<a class=\"dropdown-item\" href=\"password.html\"><span class=\"font-icon glyphicon glyphicon-cog\"></span>Password</a>\
		<div class=\"dropdown-divider\"></div>\
		<a class=\"dropdown-item\" href=\"sign-in.html\"><span class=\"font-icon glyphicon glyphicon-log-out\"></span>Salir del Sistema</a>\
		</div> ");
	console.log("cargando menu superior");

}



function ajx(){

	if(getRole()=="SUPERVISOR"){
		$(".nvl01").remove();
		$(".form-control").attr("readonly","");
		$(".btn-ajx").hide();
	}else if(getRole()=="AGENTE"){
		$(".nvl01").remove();
	}else{
		
	}


}
