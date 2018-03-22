function uploadAvatarAgent() {
 Dropzone.options.myAwesomeDropzone = {
  maxFilesize: 1,
  //addRemoveLinks: true,
  dictResponseError: 'Server not Configured',
  //acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
  init: function() {
   var self = this;

   //self.options.addRemoveLinks = true;
   //self.options.dictRemoveFile = "Delete";

   self.on("addedfile", function(file) {
    console.log('new file added ', file);
  });

   self.on("sending", function(file) {
    console.log('upload started', file);
    $('.meter').show();
  });

   self.on("totaluploadprogress", function(progress) {

    swal({
      title: "Buen Trabajo!",
      text: "",
      type: "success",
      confirmButtonClass: "btn-success",
      confirmButtonText: "Continuar"
    });


    $("#modal-1").removeClass("md-show");

    //loadFile();

    //$('.roller').width(progress + '%');
  });

   self.on("queuecomplete", function(progress) {
    $('.meter').delay(999).slideUp(999);
    loadAgent()
  });

   self.on("removedfile", function(file) {
    console.log(file);
  });
 }
};
}


function uploadAvatarProfile() {


 Dropzone.options.myAwesomeDropzone = {
  maxFilesize: 1,
  //addRemoveLinks: true,
  dictResponseError: 'Server not Configured',
  //acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
  init: function() {
   var self = this;

   self.on("addedfile", function(file) {
    console.log('new file added ', file);
  });

   self.on("sending", function(file) {
    console.log('upload started', file);
    $('.meter').show();
  });

   self.on("totaluploadprogress", function(progress) {

    swal({
      title: "Buen Trabajo!",
      text: "",
      type: "success",
      confirmButtonClass: "btn-success",
      confirmButtonText: "Continuar"
    });

    $("#modal-1").removeClass("md-show");

  });

   self.on("queuecomplete", function(progress) {
    $('.meter').delay(999).slideUp(999);
    loadProfile();
  });

   self.on("removedfile", function(file) {
    console.log(file);
  });
 }
};
}


function  newAgent() {


  $(".alertaModal").text("");

  if($("#name").val()==""){

    $(".alertaModal").text("Disculpe el Nombre no puede estar Vacio");

  }else if($("#email").val()==""){

    $(".alertaModal").text("Disculpe el Email nombre no puede estar Vacio");

  }else{


    var parametros = {

      "name": $("#name").val(),
      "role": $("#role").val(),
      "email": $("#email").val(),
      "phone": $("#phone").val()
    };

    $.ajax({
      data: parametros,
      url: API()+"agent.php/1/new",
          type: 'post', //método de envio
          beforeSend: function() {
           console.log("wait..");
         },
         success: function(response) {
           create_datatableAgents();


           swal({
            title: "Importante!",
            text: "Las credenciales de acceso para "+$("#name").val()+" son las siguientes: \n Login: "+$("#email").val()+" \n Password: default",
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "Continuar"
          });

           $("#modal-1").removeClass("md-show");


         }
       });


  }



}


function loadAgents() {
  loading();

  $.ajax({
   method: "GET",
   url: API()+"config.php/1/event/agent/",
   dataType: "json"
 })
  .done(function(result) {
    complete();
    $('#agentSelect').append("<option value=\"all\"  data-content=\"All\">ALL</option>");

    $.each(result, function(i, n) {
      $('#agentSelect').append("<option value=\"" + n.id + "\"  data-content=\"<span class=&quot;user-item&quot;><img src=&quot;" + n.avatar + "&quot;/>" + n.name + "</span>\">" + n.name + "</option>");
    });


    $('.bootstrap-select-agent').selectpicker({
      style: '',
      width: '100%',
      size: 8
    });



  });
}


function loadProfile() {
 loading();
 $.ajax({
   method: "GET",
   url: API()+"agent.php/1/" + getCode() + "",
   dataType: "json"
 })
 .done(function(n) {

   n = n[0];

   $("#id").val(n.id);
   $(".name").val(n.name);
   $(".email").val(n.email);
   $(".password").val(n.password);
   $(".avatar").val(n.avatar);
   $(".archived").val(n.archived);
   $(".estatu").val(n.estatu);
   $(".role").val(n.role);
   $(".phone2").val(n.phone2);
   $(".genre").val(n.genre);
   $(".address").val(n.address);
   $(".education").val(n.education);
   $(".about").val(n.about);
   $(".birthdate").val(n.birthdate);
   $(".phone").val(n.phone);
   $(".extra1").val(n.extra1);
   $(".extra2").val(n.extra2);
   $(".extra3").val(n.extra3);
   $(".extra4").val(n.extra4);
   $(".extra5").val(n.extra5);
   $(".created").val(n.created);

   $(".name").text(n.name);
   $(".email").text(n.email);
   $(".password").text(n.password);
   $(".avatar").text(n.avatar);
   $(".archived").text(n.archived);
   $(".estatu").text(n.estatu);
   $(".role").text(n.role);
   $(".phone2").text(n.phone2);
   $(".genre").text(n.genre);
   $(".address").text(n.address);
   $(".education").text(n.education);
   $(".about").text(n.about);
   $(".birthdate").text(n.birthdate);
   $(".phone").text(n.phone);
   $(".extra1").text(n.extra1);
   $(".extra2").text(n.extra2);
   $(".extra3").text(n.extra3);
   $(".extra4").text(n.extra4);
   $(".extra5").text(n.extra5);
   $(".created").text(n.created);

   /*VISUALIZAR IMGENES*/
   $(".img-view").attr('src', n.avatar);

   /* CARGAR SELECTS*/
   $("#roleSelect option[value='" + n.role + "'] ").remove();
   $("#roleSelect").append("<option value=" + n.role + " selected>" + n.role + "</option>");

   $("#genreSelect option[value='" + n.genre + "'] ").remove();
   $("#genreSelect").append("<option value=" + n.genre + " selected>" + n.genre + "</option>");
   //$(".save_lead").attr('disabled','disabled');

   complete();
 });
}


function loadAgent(){
 //loading();

 $.ajax({
  method: "GET",
  url: API()+"agent.php/1/"+getApp()+"",
  dataType: "json"
})
 .done(function(n) {
  n = n[0];


  $("#id").val(n.id);
  $("#name2").val(n.name);
  $(".name").text(n.name);
  $(".email").val(n.email);
  $(".password").val("");
  $(".avatar").val(n.avatar);
  $(".archived").val(n.archived);
  $(".estatu").val(n.estatu);
  $(".role").val(n.role);
  $(".phone2").val(n.phone2);
  $(".genre").val(n.genre);
  $(".address").val(n.address);
  $(".education").val(n.education);
  $(".about").val(n.about);
  $(".birthdate").val(n.birthdate);
  $(".phone").val(n.phone);
  $(".extra1").val(n.extra1);
  $(".extra2").val(n.extra2);
  $(".extra3").val(n.extra3);
  $(".extra4").val(n.extra4);
  $(".extra5").val(n.extra5);
  $(".created").val(n.created);

  $(".email").text(n.email);
  $(".password").text(n.password);
  $(".avatar").text(n.avatar);
  $(".archived").text(n.archived);
  $(".estatu").text(n.estatu);
  $(".role").text(n.role);
  $(".phone2").text(n.phone2);
  $(".genre").text(n.genre);
  $(".address").text(n.address);
  $(".education").text(n.education);
  $(".about").text(n.about);
  $(".birthdate").text(n.birthdate);
  $(".phone").text(n.phone);
  $(".extra1").text(n.extra1);
  $(".extra2").text(n.extra2);
  $(".extra3").text(n.extra3);
  $(".extra4").text(n.extra4);
  $(".extra5").text(n.extra5);
  $(".created").text(n.created);
  $(".img-view").attr('src',n.avatar);

  $("#roleSelect option[value='" + n.role + "'] ").remove();
  $("#roleSelect").append("<option value="+n.role+" selected>"+n.role+"</option>");

  $("#genreSelect option[value='" + n.genre + "'] ").remove();
  $("#genreSelect").append("<option value="+n.genre+" selected>"+n.genre+"</option>"); 
  //complete();


});
}



function create_datatableAgents() {
  console.log("Cargando datable Agents");

 // $('.loadTable').css("display" , "block");
 $('#example table').remove();

 $(".card-user-grid div").remove();

 $('#example #datatableLocations___filter').remove();
 $('#example #datatableLocations___info').remove();
 $("#example").append("<table id='example__' class='display datatable-example'><thead><tr>\
  <th class=' displayField_01  displayField01'><i class='fa fa-user'></i> <span class='DataTableHeader_01' ></span></th>\
  <th class=' displayField_02  displayField02'><i class='fa fa-envelope'></i> <span class='DataTableHeader_02' ></span></th>\
  <th class=' displayField_03  displayField02'><i class='fa fa-check'></i> <span class='DataTableHeader_03' ></span></th>\
  <th></th>\
  </tr></thead><tbody class='tbodydata' ></tbody></table>");

 $.ajax({
   method: "GET",
   url: API()+"agent.php/1/all/"+getCode(),
   dataType: "json"
 })
 .done(function(result) {

   $('#example div').remove(card);
   $('#example__ td').remove();

   console.log(result);
   var row = "";
   var card = "";
   $.each(result, function(i, n) {


    $(".card-user-grid").append("<div class='col-sm-6 col-md-4 col-xl-3'>\
      <article class='card-user box-typical'>\
      <div class='card-user-photo'>\
      <img src='" + n.avatar + "' alt=''>\
      </div>\
      <div class='card-user-name'>" + n.name + "</div>\
      <div class='card-user-status'><i class=\"fa fa-envelope\" ></i> " + n.email + "</div>\
      <div class='card-user-status'><i class=\" fa fa-phone \"></i> " + n.phone + "</div>\
      <a  onclick=\"setApp(" + n.id + ")\" class='btn btn-primary-outline btn-sm go_user '>Más Detalles</a>\
      </article>\
      </div> ");

    row = row + "<tr>\
    <td class='DataTableField_01 displayField_01'>" + n.name + " </td>\
    <td class='DataTableField_02 displayField_02'>" + n.email + "</td>\
    <td class='DataTableField_03 displayField_03'>" + n.role + "</td>\
    <td style='width:100px' class='mobile action-table'>\
    <a href=\"user.html\" onclick=\"setApp(" + n.id + ")\" class=\"btn-floating btn-small  transparent-icon \"><i class=\"material-icons blue-text \">edit</i></a>\
    </td></tr>";


  });

   $('#example__ tbody').append(row);
   inicializacion();
   datatable_loadAgents();
   /* visibilidad de los campos en el DAtatable */
   $(' #example__ .displayField_01').css('display', 'table-cell');
   $(' #example__ .displayField_02').css('display', 'table-cell');
   $(' #example__ .displayField_03').css('display', 'table-cell');
   $('#example__').css("width", "100% !important");
   $(".DataTableHeader_01 ").text("Full Name");
   $(".DataTableHeader_02 ").text('Email');
   $(".DataTableHeader_03 ").text('Role');

   $('#example__').css("width", "100% !important");
   console.log("Cargando datable Agents- Finalizado");

 });
}

function datatable_loadAgents() {

 datatablex = $('#example__').DataTable({
  paging: false,
  language: {
   searchPlaceholder: 'Search records',
   sSearch: '',
   sLengthMenu: 'Show _MENU_',
   sLength: 'dataTables_length',
   oPaginate: {
    sFirst: '<i class="material-icons">chevron_left</i>',
    sPrevious: '<i class="material-icons">chevron_left</i>',
    sNext: '<i class="material-icons">chevron_right</i>',
    sLast: '<i class="material-icons">chevron_right</i>'
  }
}
});

 $('.dataTables_length select').addClass('browser-default');

}

function updateAgent() {


 var parametros = {
  "name": $("#name2").val(),
  "email": $("#email").val(),
  "phone2": $("#phone2").val(),
  "genre": $("#genreSelect").val(),
  "address": $("#address").val(),
  "education": $("#education").val(),
  "about": $("#about").val(),
  "phone": $("#phone").val(),
  "role": $("#roleSelect").val(),
  "id": getApp()
  //"avatar" : $("#avatar").val(),
  //"archived" : $("#archived").val(),
  //"estatu" : $("#estatu").val(),
  //"birthdate" : $("#birthdate").val(),
  //"extra1" : $("#extra1").val(),
  //"extra2" : $("#extra2").val(),
  //"extra3" : $("#extra3").val(),
  //"extra4" : $("#extra4").val(),
  //"extra5" : $("#extra5").val(),
  //"created" : $("#created").val(),
};


$.ajax({
  data: parametros,
  url: API()+"agent.php/1/update",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {

   swal({
    title: "Buen Trabajo!",
    text: "",
    type: "success",
    confirmButtonClass: "btn-success",
    confirmButtonText: "Continuar"
  });
   loadAgent();

 }
});
}



function updateProfile() {
 //loading();

 var parametros = {
  "name": $("#name2").val(),
  "email": $("#email").val(),
  "role": $("#roleSelect").val(),
  "phone2": $("#phone2").val(),
  "genre": $("#genreSelect").val(),
  "address": $("#address").val(),
  "education": $("#education").val(),
  "about": $("#about").val(),
  "phone": $("#phone").val(),
  //"avatar" : $("#avatar").val(),
  //"archived" : $("#archived").val(),
  //"estatu" : $("#estatu").val(),
  //"birthdate" : $("#birthdate").val(),
  //"extra1" : $("#extra1").val(),
  //"extra2" : $("#extra2").val(),
  //"extra3" : $("#extra3").val(),
  //"extra4" : $("#extra4").val(),
  //"extra5" : $("#extra5").val(),
};


$.ajax({
  data: parametros,
  url: API()+"agent.php/1/update/" + getCode(),
  type: "post", //método de envio
  beforeSend: function() {},
  success: function(response) {
   complete();
   swal({
    title: "Buen Trabajo!",
    type: "success",
    confirmButtonClass: "btn-success",
    confirmButtonText: "Continuar"
  });


   console.log(response);
   loadInfo();

 }
});
}



function updatePasswordAgent() {


 var parametros = {
  "password": $("#password").val(),
  "id": getApp()
};


$.ajax({
  data: parametros,
  url: API()+"agent.php/1/updatePasswordAgent",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {
   swal({
    title: "Buen Trabajo!",
    text: "",
    type: "success",
    confirmButtonClass: "btn-success",
    confirmButtonText: "Continuar"
  });
   loadAgent();

 }
});
}
