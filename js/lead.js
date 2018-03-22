

function stat01(){

  var x1 = x2 = x3 = x4 = 0;

  $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/stat01/",
   dataType: "json"
 })
  .done(function(result) {

   $.each(result, function(i, n) {

    if(result[i].status == "151"){
      $("#cuadro01_cantidad").text( result[i].cantidad );
      x1 = result[i].cantidad;
    }


    if(result[i].status == "152"){
      $("#cuadro02_cantidad").text( result[i].cantidad );
      x2 = result[i].cantidad;

    }

/*
    if(result[i].status == "157"){
      $("#cuadro03_cantidad").text( result[i].cantidad );
      x3 = result[i].cantidad;

    }
*/
    if(result[i].status == "155"){
      $("#cuadro04_cantidad").text( result[i].cantidad );
      x4 = result[i].cantidad;

    }


    if(result[i].status == "153"){
      $("#cuadro05_cantidad").text( result[i].cantidad );
      x4 = result[i].cantidad;

    }



    var pieChart = c3.generate({
      bindto: '#pie-chart',
      data: {
        columns: [
        ['Prospectos', x1],
        ['Aplicantes', x2],
        ['Deudores', x3],
        ['Abandonados', x4]
        ],
        type : 'pie'
      }
    });



  });


 });

}




function statPorContrato(){

  $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/TotalPorContrato/",
   dataType: "json"
 })
  .done(function(result) {

    $.each(result, function(i, n) {
      $("#cuadro31_cantidad").text( result[i].cantidad );
    });
  });

}



function statPorConsignar(){

  $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/TotalPorConsignar/",
   dataType: "json"
 })
  .done(function(result) {

    $.each(result, function(i, n) {
      $("#cuadro32_cantidad").text( result[i].cantidad );
    });
  });

}






function statPorPagar(){

  $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/TotalPorPagar/",
   dataType: "json"
 })
  .done(function(result) {

    $.each(result, function(i, n) {
      $("#cuadro33_cantidad").text( result[i].cantidad );
      $("#cuadro03_cantidad").text( result[i].cantidad );
    });
  });



}


function statEnProceso(){

  $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/TotalenProceso/",
   dataType: "json"
 })
  .done(function(result) {

    $.each(result, function(i, n) {
      $("#cuadro06_cantidad").text( result[i].cantidad );
    });
  });



}


function reenviarContrato(){


$.ajax({
  url: API()+"Cliente/4000.php/"+getAccess()+"/05/" + getApp(),
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("actualizando informacion del prestamo...");
 },
 success: function(response) {

  swal({
    title: "",
    text: "El Contrato ha sido Reenviado",
    type: "success",
    confirmButtonClass: "btn-success"
  });

  $("#modal-20").removeClass("md-show");
}
})
}


function stat02(){

  var x1 = x2 = x3 = x4 = 0;

  $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/stat02/",
   dataType: "json"
 })
  .done(function(result) {


   $.ajax({
     method: "GET",
     url: API()+"lead.php/"+getAccess()+"/stat03/",
     dataType: "json"
   })
   .done(function(result2) {





     var lineChart = c3.generate({
      bindto: '#line-chart',
      data: {
        columns: [
        ['Prospectos', result[7].cantidad, result[6].cantidad, result[5].cantidad, result[4].cantidad, result[3].cantidad, result[2].cantidad , result[1].cantidad, result[0].cantidad],
        ['Aplicaciones', result2[7].cantidad, result2[6].cantidad, result2[5].cantidad, result2[4].cantidad, result2[3].cantidad, result2[2].cantidad , result2[1].cantidad, result2[0].cantidad]  ],
        axes: {
                data2: 'y2' // ADD
              }
            },
            axis: {
              y2: {
                show: true // ADD
              }
            }
          });
   });



 });


}



function statusStatFilter(x) {

  texto = "Filtrado por "+x;

  setFilterData(x);
  if(x=="all"){
    $(".filterText").text(" Filtrado por Contactos Recientes");
  }else{
    $(".filterText").text(texto);
  }
  create_datatableLeads();
}



function statusStatFilterEspecial(x) {

  texto = "Filtrado por "+x;

  setFilterData(x);
  if(x=="all"){
    $(".filterText").text(" Filtrado por Contactos Recientes");
  }else{
    $(".filterText").text(texto);
  }
  create_datatableLeadsEspecial();
}





function newLead() {

  $(".alertaModal").text("");

  if($("#firstname").val()==""){

    $(".alertaModal").text("Disculpe el Primer nombre no puede estar Vacio");

  }else if($("#email").val()==""){

    $(".alertaModal").text("Disculpe el Email nombre no puede estar Vacio");

  }else{


   var parametros = {

    "firstname": $("#firstname").val(),
    "lastname": $("#lastname").val(),
    "email": $("#email").val(),
    "phone": $("#phone").val(),
  };

  $.ajax({
    data: parametros,
    url: API()+"lead.php/"+getAccess()+"/new/"+ getCode(),
            type: 'post', //método de envio
            beforeSend: function() {
             console.log("wait..");
           },
           success: function(response) {
             create_datatableLeads();
           }
         });

  swal({
    title: "Buen Trabajo",
    text: "El contacto ha sido creado!",
    type: "success",
    confirmButtonClass: "btn-success"
  });

  $("#modal-1").removeClass("md-show");

}







}


function datatableLeads_load() {
 datatablex = $('#example__').DataTable({
  order: [[ 0, "desc" ]],
  paging: true,
  lengthMenu: [[ 25, 50, -1], [ 25, 50, "All"]],
  language: {
   searchPlaceholder: 'Buscar',
   sSearch: '',
   sLengthMenu: 'Show _MENU_',
   sLength: 'dataTables_length',
   oPaginate: {
    sFirst: '<i class=\'fa fa-angle-double-left\'></i>',
    sPrevious: '<i class=\'fa fa-angle-double-left\'></i>',
    sNext: '<i<i class=\'fa fa-angle-double-right\'></i>',
    sLast: '<i <i class=\'fa fa-angle-double-right\'></i>'
  }
}
});

 $('.dataTables_length select').addClass('browser-default');

}


function create_datatableLeads() {

 // $('.loadTable').css("display" , "block");
 $('#example table').remove();
 $('#example #datatableLocations___filter').remove();
 $('#example #datatableLocations___info').remove();
 $("#example").append("<table id='example__' class='display datatable-example'><thead><tr>\
  <th class=' displayField_01  displayField07'><span class='DataTableHeader_07' ></span></th>\
  <th class=' displayField_03  displayField03'><span class='DataTableHeader_03' ></span></th>\
  <th class=' displayField_01  displayField01'><span class='DataTableHeader_01' ></span></th>\
  <th class=' displayField_02  displayField02'><span class='DataTableHeader_02' ></span></th>\
  <th class=' displayField_02  displayField06'><span class='DataTableHeader_06' ></span></th>\
  <th class=' displayField_05  displayField05'><span class='DataTableHeader_05' ></span></th>\
  <th></th>\
  </tr></thead><tbody class='tbodydata' ></tbody></table>");



 $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/"+getFilterData()+"/",
   dataType: "json"
 })
 .done(function(result) {

  if(result[0].msj=="tokeninvalido"){
    location.href="https://qreatech.com/capitalalinstante/";
  }

  $('#example div').remove(card);
  $('#example__ td').remove();

  console.log(result);
  var row = "";
  var card = "";


  console.log(result);

  
  $.each(result, function(i, n) {

    fecha      = moment(n.created ,"YYYY-MM-DD HH:mm:ss");   
    n.desde    = fecha.fromNow(true);
    n.registro =  fecha.format("YYYY-MM-DD");
    n.dia      =  fecha.format('llll');




    row = row + "<tr>\
    <td class='DataTableField_01 displayField_07'><a  href=\"contacto.html\" onclick=\"setApp(" + n.id + ")\" ><span class='code'>" + n.code + "</span></a> </td>\
    <td class='DataTableField_03 displayField_03'><img  class='miniavatar' src=\"" + n.status_fk.avatar + "\"></td>\
    <td class='DataTableField_01 displayField_01' style=\"text-transform:uppercase\" ><b>" + n.firstname + " " + n.lastname + "<b><br>CC: "+n.documentid+" <br><small>Solicito "+n.approveme+"</small> </td>\
    <td class='DataTableField_02 displayField_02'> " + n.email + "</td>\
    <td class='DataTableField_06 displayField_06'> <span style=\"text-transform:capitalize\"><b>" + n.mode + "</b></span></td>\
    <td class='DataTableField_05 displayField_05'> "+n.registro+"<br><small>"+n.dia+"</small></td>\
    <td style='width:100px;text-align:center' class='mobile action-table'>\
    <a href=\"contacto.html\"  onclick=\"setApp(" + n.id + ")\" class=\"btn-floating btn-small   transparent-icon nvl01 \"><i class=\"fa fa-edit editar-icon\"></i></a>\
    <a href=\"javascript:archivedLead("+ n.id +")\" onclick=\"setApp(" + n.id + ")\" class=\"btn-floating btn-small  transparent-icon nvl01\"><i  class=\"fa fa-trash basura-icon \"></i></a>\
    </td></tr>"; 


  });

  $('#example__ tbody').append(row);
  inicializacion();
  datatableLeads_load();
  ajx();

  stat01();
  statEnProceso();
  statPorContrato();
  statPorConsignar();
  statPorPagar();
  // stat02();

  /* visibilidad de los campos en el DAtatable */
  $(' #example__ .displayField_01').css('display', 'table-cell');
  $(' #example__ .displayField_07').css('display', 'table-cell');
  $(' #example__ .displayField_02').css('display', 'table-cell');
  $(' #example__ .displayField_03').css('display', 'table-cell');
  $(' #example__ .displayField_05').css('display', 'table-cell');
  $(' #example__ .displayField_06').css('display', 'table-cell');
  $('#example__').css("width", "100% !important");
  $(".DataTableHeader_01 ").text("Nombre Completo");
  $(".DataTableHeader_02 ").text('Email');
  $(".DataTableHeader_04 ").text('Estado');
  $(".DataTableHeader_03 ").text('Estado');
  $(".DataTableHeader_05 ").text('Fecha ');
  $(".DataTableHeader_06 ").text('Tipo');
  $(".DataTableHeader_07 ").text('Codigo');

  $('#example__').css("width", "100% !important");

});
}












function create_datatableLeadsEspecial() {

 // $('.loadTable').css("display" , "block");
 $('#example table').remove();
 $('#example #datatableLocations___filter').remove();
 $('#example #datatableLocations___info').remove();
 $("#example").append("<table id='example__' class='display datatable-example'><thead><tr>\
  <th class=' displayField_01  displayField07'><span class='DataTableHeader_07' ></span></th>\
  <th class=' displayField_03  displayField03'><span class='DataTableHeader_03' ></span></th>\
  <th class=' displayField_01  displayField01'><span class='DataTableHeader_01' ></span></th>\
  <th class=' displayField_02  displayField06'><span class='DataTableHeader_06' ></span></th>\
  <th>Documentos</th>\
  </tr></thead><tbody class='tbodydata' ></tbody></table>");



 $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/"+getFilterData()+"/",
   dataType: "json"
 })
 .done(function(result) {

  if(result[0].msj=="tokeninvalido"){
    location.href="https://qreatech.com/capitalalinstante/";
  }

  $('#example div').remove(card);
  $('#example__ td').remove();

  console.log(result);
  var row = "";
  var card = "";


  console.log(result);

  
  $.each(result, function(i, n) {

    fecha      = moment(n.created ,"YYYY-MM-DD HH:mm:ss");   
    n.desde    = fecha.fromNow(true);
    n.registro =  fecha.format("YYYY-MM-DD");
    n.dia      =  fecha.format('llll');




    row = row + "<tr>\
    <td class='DataTableField_01 displayField_07'><a  href=\"contacto.html\" onclick=\"setApp(" + n.id + ")\" ><span class='code'>" + n.code + "</span></a> </td>\
    <td class='DataTableField_03 displayField_03'><img  class='miniavatar' src=\"" + n.status_fk.avatar + "\"></td>\
    <td class='DataTableField_01 displayField_01' style=\"text-transform:uppercase\" ><b>" + n.firstname + " " + n.lastname + "<b><br>CC: "+n.documentid+" <br><small>Solicito "+n.approveme+"</small> </td>\
    <td class='DataTableField_06 displayField_06'> <span style=\"text-transform:capitalize\"><b>" + n.mode + "</b></span></td>\
    <td style='width:200px;text-align:left' class='mobile action-table'>\
    <a class='link10' href='https://qreatech.com/API/public/Contrato-Capital-al-Instante.php?code="+n.id_fk.token+"'> Descargar Contrato </a> <br> <a  class='link10' href='https://qreatech.com/API/public/Pagare-Capital-al-Instante.php?code="+n.id_fk.token+"'> Descargar Pagare </a>\
    </td></tr>"; 


  });

  $('#example__ tbody').append(row);
  inicializacion();
  datatableLeads_load();
  ajx();

  stat01();
  statEnProceso();
  statPorContrato();
  statPorConsignar();
  // stat02();

  /* visibilidad de los campos en el DAtatable */
  $(' #example__ .displayField_01').css('display', 'table-cell');
  $(' #example__ .displayField_07').css('display', 'table-cell');
  $(' #example__ .displayField_03').css('display', 'table-cell');
  $(' #example__ .displayField_06').css('display', 'table-cell');
  $('#example__').css("width", "100% !important");
  $(".DataTableHeader_01 ").text("Nombre Completo");
  $(".DataTableHeader_04 ").text('Estado');
  $(".DataTableHeader_03 ").text('Estado');
  $(".DataTableHeader_06 ").text('Tipo');
  $(".DataTableHeader_07 ").text('Codigo');

  $('#example__').css("width", "100% !important");

});
}










function statusSelectFilter() {
 var statu = "statu" + $("#statusSelect").val();
 var agent = "agent" + $("#agentSelect").val();
 var mode  = "mode" + $("#modeSelect").val();

 console.log(mode);
 console.log(agent);
 console.log(statu);

 if ((agent == "agentall") && (statu == "statuall") && (mode == "modeall")) {

  $("#example__ tbody tr ").show();

} else if ((statu == "statuall")&&(mode != "modeall")&&(agent != "agentall")) {

  $("#example__ tbody tr ").hide();
  $("#example__ tbody tr." + agent + "." + mode + "").show("slow");

} else if ((agent == "agentall")&&(mode != "modeall")&&(statu != "statuall")) {

  $("#example__ tbody tr ").hide();
  $("#example__ tbody tr." + statu + "." + mode + "").show("slow");

} else if ((mode == "modeall")&&(agent != "agentall")&&(statu != "statuall")) {

  $("#example__ tbody tr ").hide();
  $("#example__ tbody tr." + agent + "." + statu + "").show("slow");

}else if ((mode == "modeall")&&(agent == "agentall")&&(statu != "statuall")) {

  $("#example__ tbody tr ").hide();
  $("#example__ tbody tr."+ statu +"").show("slow");

}else if ((mode != "modeall")&&(agent == "agentall")&&(statu == "statuall")) {

  $("#example__ tbody tr ").hide();
  $("#example__ tbody tr."+ mode +"").show("slow");

}else if ((mode == "modeall")&&(agent != "agentall")&&(statu == "statuall")) {

  $("#example__ tbody tr ").hide();
  $("#example__ tbody tr."+ agent +"").show("slow");

}else {

  $("#example__ tbody tr ").hide();
  $("#example__ tbody tr." + statu + "." + agent + "." + mode +"").show("slow");

}


}




function calculos(){


 var parametros = {
  "days": $("#requesteddays").val(), 
  "amount":$("#approveme").val(),
  "mode": sessionStorage.getItem("modeLead")
};

$.ajax({
  data: parametros,
  method: "POST",
  url: API()+"Cliente/7000.php/"+getAccess()+"/03/",
  dataType: "json"
})
.done(function(n) {


  $(".intereses").val(fNumber.go(n.intereses, "$"));
  $(".pago").val(fNumber.go(n.pago, "$"));
  $(".gastosadministrativos").val(fNumber.go(n.gastosadministrativos, "$"));
  $(".plataforma").val(fNumber.go(n.plataforma, "$"));
  $(".seguro").val(fNumber.go(n.seguro, "$"));
  $(".iva").val(fNumber.go(n.iva, "$"));
  $(".mode").text(n.mode);


});


}








function loadSelectFilterAgent() {


 $.ajax({
   method: "GET",
   url: API()+"config.php/"+getAccess()+"/event/agent/",
   dataType: "json"
 })
 .done(function(result) {

   $('#agentSelect').append("<option value=\"all\"  data-content=\"Seleccione un Agente\">Seleccione un Agente</option>");
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



function loadSelectFilterStatus() {


 $.ajax({
   method: "GET",
   url: API()+"config.php/"+getAccess()+"/status/",
   dataType: "json"
 })
 .done(function(result) {

   $('#statusSelect').append("<option value=\"all\"  data-content=\"Seleccione un Estatus\">Seleccione un Estatus</option>");

   $.each(result, function(i, n) {

    $('#statusSelect').append("<option value=\"" + n.id + "\"  data-content=\"" + n.name + "\">" + n.name + "</option>");





  });


   $('.bootstrap-select-status').selectpicker({
    style: '',
    width: '100%',
    size: 8
  });


 });
}


function loadSelectFilterMode() {


  $('#modeSelect').append("<option value=\"all\"  data-content=\"Seleccione un  Tipo\">Seleccione un  Tipo</option>");
  $('#modeSelect').append("<option value=\"nomina\"  data-content=\"nomina\">Nomina</option>");
  $('#modeSelect').append("<option value=\"personal\"  data-content=\"personal\">Personal</option>");

  $('.bootstrap-select-mode').selectpicker({
    style: '',
    width: '100%',
    size: 8
  });


}




function loadModeSelectAsign() {


 $.ajax({
   method: "GET",
   url: API()+"config.php/"+getAccess()+"/mode/",
   dataType: "json"
 })
 .done(function(result) {

   $.each(result, function(i, n) {
    if(sessionStorage.getItem("modeLead")==n.name){
      $('#mode').append("<option value=\"" + n.name + "\" selected >" + n.name + "</option>");
    }else{
      $('#mode').append("<option value=\"" + n.name + "\"  >" + n.name + "</option>");
    }
  });

 });

}






function loadAgentSelectAsign() {


 $.ajax({
   method: "GET",
   url: API()+"config.php/"+getAccess()+"/event/agent/",
   dataType: "json"
 })
 .done(function(result) {


   $('#agentSelect').append("<option value=\"0\"  data-content=\"<span class=&quot;user-item&quot;>Assign Lead to Agent</span>\"></option>");


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



function loadStatusSelectAsign() {

  $(".section-status button").remove();

  opacity = "";

  $.ajax({
   method: "GET",
   url: API()+"config.php/"+getAccess()+"/status/",
   dataType: "json"
 })
  .done(function(result) {


   $.each(result, function(i, n) {

    $('#statusSelect').append("<option value=\"" + n.id + "\"  data-content=\"" + n.name + "\">" + n.name + "</option>");
    opacity = "1";
    if(sessionStorage.getItem("statusLead")== n.id){
      border = "border:0px;";

    }else{
      border ="none";
      opacity = ".3";
    }


    $(".section-status").append(" <button style=\"opacity: "+opacity+" ; border:none; background:"+n.color+"; "+border+" color:#fff\" onclick=\"cambiarStatus('"+n.id+"')\" class=\"btn btn-inline btn-lg \"  >\
      &nbsp;"+ n.name +"\
      </button> ");



  });


   $('.bootstrap-select-status').selectpicker({
    style: '',
    width: '100%',
    size: 8
  });


 });

}


function fileRemoveConfirm(id) {

 var parametros = {
  "id": id
};

$.ajax({
  data: parametros,
  url: API()+"file.php/"+getAccess()+"/fileRemove/",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {
   loadFile();
 }


})
}


function fileEditConfirm(id, name) {

 var parametros = {
  "id": id,
  "name": name
};

$.ajax({
  data: parametros,
  url: API()+"file.php/"+getAccess()+"/fileEdit/",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {
   loadFile();
 }


})
}




function paymentRegister(type) {

 swal({
   title: "Confirma el Pago ",
   text: "por "+$("#amount_payment").val(),
   type: "warning",
   showCancelButton: true,
   cancelButtonClass: "btn-default",
   confirmButtonClass: "btn-warning",
   confirmButtonText: "Lo confirmo!",
   closeOnConfirm: false
 },
 function() {

   if (type == "agent-to-lead") {
    paymentConfirm();
  }

  if (type == "lead-to-agent") {
    payment2Confirm();
  }


  loadLead();

});
}


function paymentConfirm() {

 var parametros = {
  "entity": $("#entity_payment").val(),
  "mode": $("#mode_payment").val(),
  "amount": $("#amount_payment").val(),
  "observation": $("#observation_payment").val(),
  "date": $("#date_payment").val(),
  "code": $("#code_payment").val()
};

$.ajax({
  data: parametros,
  url: API()+"Cliente/7000.php/"+getAccess()+"/00/" + getApp(),
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("Registrando el Pago....");
 },
 success: function(response) {
  swal({
    title: "",
    text: "El pago ha sido registrado!",
    type: "success",
    confirmButtonClass: "btn-success"
  });

}
})
}


function payment2Confirm() {

 var parametros = {
  "entity": $("#entity_payment2").val(),
  "mode": $("#mode_payment2").val(),
  "amount": $("#amount_payment2").val(),
  "observation": $("#observation_payment2").val(),
  "date": $("#date_payment2").val(),
  "code": $("#code_payment2").val()
};

$.ajax({
  data: parametros,
  url: API()+"payment.php/"+getAccess()+"/lead-to-agent/" + getApp(),
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("Registrando el Pago Lead - to - Agent ....");
 },
 success: function(response) {
  swal({
    title: "",
    text: "El pago ha sido registrado!",
    type: "success",
    confirmButtonClass: "btn-success"
  });

}
})
}





function amountRegister() {

 swal({
   title: "Advertencia",
   text: "Los datos serán modificados",
   type: "warning",
   showCancelButton: true,
   cancelButtonClass: "btn-default",
   confirmButtonClass: "btn-warning",
   confirmButtonText: "Continuar",
   closeOnConfirm: false
 },
 function() {

   amountConfirm();


   swal({
    title: "Excelente!",
    text: "Los cambios han sido actualizados!",
    type: "success",
    confirmButtonClass: "btn-success"
  });


 });
}



function amountConfirm() {

 var parametros = {
  "amount": $("#amount").val(),
  "days": $("#days").val(),
  "approveme": $("#approveme").val(),
  "requesteddays": $("#requesteddays").val(),
  "mode": $("#mode").val()
};



$.ajax({
  data: parametros,
  url: API()+"Cliente/7000.php/"+getAccess()+"/02/" + getApp(),
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("actualizando informacion del prestamo...");
 },
 success: function(response) {

  loadLead();

}
})
}




function aprovemmeRegister() {
 aprovemmeConfirm();
}

function aprovemmeConfirm() {

 user = profile();

 var parametros = {
   "agent_id": user[0].id,
   "client_id": getApp(),
   "code_id": sessionStorage.getItem("codeid"),
   "token": getToken(),
   "access": getAccess(),
   "email": user[0].email,
   "amount": $("#approveme_amount").val(),
   "days": $("#approveme_days").val(),
   "approveme": $("#approveme_aprovemme").val(),
 };



 $.ajax({
  data: parametros,
  url: API()+"Cliente/4000.php/"+getAccess()+"/00/" + getApp(),
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("actualizando informacion del prestamo...");
 },
 success: function(response) {

  console.log(response);


  swal({
    title: "Genial",
    text: "El Credito ha sido Aprobado!",
    type: "success",
    confirmButtonClass: "btn-success"
  });

  loadLead();

}
})
}

function noaprovemmeRegister() {

 swal({
   title: "Estas seguro?",
   text: "No es posible deshacer esta opción!",
   type: "warning",
   showCancelButton: true,
   cancelButtonClass: "btn-default",
   confirmButtonClass: "btn-warning",
   confirmButtonText: "Estoy Seguro!",
   closeOnConfirm: false
 },
 function() {

   noaprovemmeConfirm();

 });
}

function noaprovemmeConfirm() {


 var text;

 if ($('#noapproveme01').is(':checked')) {
  text = $("#noapproveme01").val();
}

if ($('#noapproveme02').is(':checked')) {
  text += $("#noapproveme02").val();
}

if ($('#noapproveme03').is(':checked')) {
  text += $("#noapproveme03").val();
}


var parametros = {
  "observation": $("#noapproveme_observation").val() + text
};



$.ajax({
  data: parametros,
  url: API()+"Cliente/6000.php/"+getAccess()+"/00/" + getApp(),
  type: 'post', //método de envio
  beforeSend: function() {
  },
  success: function(response) {
   loadLead();

   swal({
    title: "",
    text: "El Crédito ha sido Rechazado!",
    type: "success",
    confirmButtonClass: "btn-success"
  });

 }
})
}

function fileRemove(id) {

 swal({
   title: "Esta seguro que desea borrar este Documento?",
   text: "Esta acción no se puede deshacer",
   type: "warning",
   showCancelButton: true,
   cancelButtonClass: "btn-default",
   confirmButtonClass: "btn-warning",
   confirmButtonText: " Estoy seguro ",
   closeOnConfirm: false
 },
 function() {
   swal({
    title: "",
    text: "El Documento ha sido borrado!",
    type: "success",
    confirmButtonClass: "btn-success"
  });

   fileRemoveConfirm(id);

 });
}

function fileEdit(id) {


 swal({
  title: "Cambiar nombre",
  text: " Nuevo nombre ",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  inputPlaceholder: ""
}, function(inputValue) {
  if (inputValue === false) return false;

  if (inputValue === "") {
   swal.showInputError("Debe escribir un nombre!");
   return false
 }



 fileEditConfirm(id, inputValue);
 swal("Buen Trabajo!", "El nombre es: " + inputValue, "success");


});
}

function loadStatus() {

 $("#status-select .select ").remove();
 $("#status-select").append("<option class='select' selected>Change Status</option>");

 $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/" + getApp() + "",
   dataType: "json"
 })
 .done(function(n) {



 });
}

function loadAssignmentAgent() {

 var parametros = {
  "lead": getApp()
};

$.ajax({
 data: parametros,
 method: "GET",
 url: API()+"event.php/"+getAccess()+"/assignAgent",
 dataType: "json"
})
.done(function(n) {

  n.fecha =  n.created.substring(0,10);
  n.fecha = n.fecha.replace("-","");
  n.fecha = n.fecha.replace("-","");
  n.fecha_registro = moment(n.fecha, "YYYYMMDD").fromNow();




  $("#assignAgentCard img").attr("src", n.agent_avatar);
  $("#assignAgentCard p a").text(n.agent_name);
  $("#assignAgentCard .tbl-cell-status").text(n.fecha_registro);

});
}

function loadAssignmentStatus() {

 var parametros = {
  "lead": getApp()
};

$.ajax({
 data: parametros,
 method: "GET",
 url: API()+"event.php/"+getAccess()+"/assignStatus",
 dataType: "json"
})
.done(function(n) {

 $(".status").text(n.status_name);
 $(".btn-status").css("background", n.status_color);
 $(".btn-status").css("border", "none");

});
}

function loadtimelineLead() {

 var row = "";
 $(".activity-line article").remove();

 var parametros = {
  "lead": getApp()
};

$.ajax({
 data: parametros,
 method: "GET",
 url: API()+"event.php/"+getAccess()+"/timelineLead",
 dataType: "json"
})
.done(function(result) {


 $.each(result, function(i, n) {


 // n.fecha =  n.created.substring(0,10);
 /* n.fecha = n.fecha.replace("-","");
  n.fecha = n.fecha.replace("-","");
  n.fecha_registro = moment(n.fecha).format("dddd, MMMM Do YYYY, h:mm:ss a");*/


  $(".activity-line").append("<article class=\"activity-line-item box-typical\">\
   <div class=\"activity-line-date\">\
   <img style=\"width:50px\"  src=\"" + n.agent_avatar + "\" alt=\"\">\
   </div>\
   <header class=\"activity-line-item-header\" >\
   <div class=\"activity-line-item-user\" style=\"padding:0px\">\
   <div class=\"activity-line-item-user-name\">" + n.type + " :: " + n.agent_name + " "+ n.description+"</div>\
   <div class=\"activity-line-item-user-status\"><i>" +  n.created + " </i> </div>\
   </div>\
   </header>\
   </article>\ ");

});

});
}

function loadFile() {


 var banktbl;

 $.ajax({
   method: "GET",
   url: API()+"file.php/"+getAccess()+"/bankstatements/" + getApp() + "",
   dataType: "json"
 })
 .done(function(result) {

   console.log(result);
   $(".banktbl tr").remove();
   $.each(result, function(i, n) {



    if(n.type=="Private"){

      n.archivo  =  n.reference;

    }else{

      n.archivo  =  "https://qreatech.com/lead/"+n.reference;


    }


    $(".banktbl").append("<tr>\
     <td>" + n.name + "</td>\
     <td>" + n.date + "</td>\
     <td>\
     <a  href=\""+n.archivo+"\" target=\"_blank\" id=\"file1\"> <i   class=\"fa fa-eye editar-icon\"></i></a> <a style='margin-left:10px; text-decoration:none' id=\"file1\"  href=\"javascript:fileEdit(" + n.id + ")\" > <i style=\"color:blue\" class=\"fa fa-edit editar-icon\"></i><a style='text-decoration:none; margin-left:10px' id=\"file1\"  href=\"javascript:fileRemove(" + n.id + ")\" > <i style=\"color:red\" class=\"fa fa-trash basura-icon\"></i> </a> \
     </td>\
     </tr>\
     ");

  });

 });
}

function loadPayment() {

 var paymenttbl;

 $.ajax({
   method: "POST",
   url: API()+"Cliente/7000.php/"+getAccess()+"/01/" + getApp() + "",
   dataType: "json"
 })
 .done(function(result) {

   console.log(result);
   $(".paymenttbl tr").remove();
   $(".paymenttbl tr").remove();
   $.each(result, function(i, n) {


    if(n.type=="agent-to-lead"){
      n.name  = "Consignación";

    }

    $(".paymenttbl").append("<tr>\
      <td>" + n.name + "</td>\
      <td>" + n.entity + "</td>\
      <td>" + n.created + "</td>\
      <td style='text-align:right'>" + fNumber.go(n.amount, "$") + "</td>\
      </tr>\
      ");

  });

 });
}


function OpenStatusPayment(x) {

 $("#modal-8").addClass("md-show");
 $("#idPayment").val(x);
}




function assignStatusPayment() {

 var parametros = {
  "id": $("#idPayment").val(),
  "observation": $("#observationPayment").val(),
  "lead": getApp()
};

$.ajax({
  data: parametros,
  url: API()+"payment.php/"+getAccess()+"/confirmed/" + $("#idPayment").val(),
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {

   swal({
    title: "Buen Trabajo!",
    text: "El pago ha sido Confirmado!",
    type: "success",
    confirmButtonClass: "btn-success",
    confirmButtonText: "Continuar"
  });

   loadLead();
 }


})
}


function void_campo(x) {

 $(x).keyup(function() {

  if ($(x).text().length < 2) {

   $(x).css("padding", "2px 100px");
   $(x).css("border-bottom", "1px solid red");


 } else {

   $(x).css("padding", "2px");
   $(x).css("border", "none");
   $(x).css("background", "transparent");
   $(x).css("border", "none");
   $(x).css("border-radius", "0px");

 }


});
}


function update_lead() {

 var parametros = {

  "firstname": $(".firstname").val(),
  "lastname": $(".lastname").val(),
  "email": $(".email").val(),
  "phone": $(".phone").val(),
  "address": $(".address").val(),
  "address2": $(".address2").val(),
  "city": $(".city").val(),
  "estate": $(".estate").val(),
  "Country": $(".Country").val(),
  "zipcode": $(".zipcode").val(),
  "businessownership": $(".businessownership").val(),
  "datebirth": $(".datebirth").val(),
  "ssn": $(".ssn").val(),
  "company_name": $(".company_name").val(),
  "doingname": $(".doingname").val(),
  "tax": $(".tax").val(),
  "startdate": $(".startdate").val(),
  "companyaddress1": $(".companyaddress1").val(),
  "companyaddress2": $(".companyaddress2").val(),
  "companycity": $(".companycity").val(),
  "companyestate": $(".companyestate").val(),
  "companycountry": $(".companycountry").val(),
  "companyzipcode": $(".companyzipcode").val(),
  "type": $(".type").val(),
  "industry": $(".industry").val(),
  "monthlysales": $(".monthlysales").val(),
  "months": $(".months").val(),
  "amount": $(".amount").val(),
  "referencia": $(".referencia").val(),
  "secondname" : $(".secondname").val(),
  "secondlastname" : $(".secondlastname").val(),
  "documentid" : $(".documentid").val(),
  "gender" : $(".gender").val(),
  "maritalstatus" : $(".maritalstatus").val(),
  "education" : $(".education").val(),
  "cellphone" : $(".cellphone").val(),
  "employmenttype" : $(".employmenttype").val(),
  "laborreferralfn" : $(".laborreferralfn").val(),
  "laborreferralln" : $(".laborreferralln").val(),
  "laborreferralp" : $(".laborreferralp").val(),
  "personalreferralfn" : $(".personalreferralfn").val(),
  "personalreferralln" : $(".personalreferralln").val(),
  "personalreferralp" : $(".personalreferralp").val(),
  "monthlyincome" : $(".monthlyincome").val(),
  "dependants" : $(".dependants").val(),
  "monthlyoutcome" : $(".monthlyoutcome").val(),
  "bank" : $(".bank").val(),
  "accounttype" : $(".accounttype").val(),
  "accountnumber" : $(".accountnumber").val(),
  "id": getApp()

};

$.ajax({
  data: parametros,
  url: API()+"lead.php/"+getAccess()+"/update",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {

   swal({
    title: "Buen Trabajo!",
    text: "Los datos han sido actualizados",
    type: "success",
    confirmButtonClass: "btn-success",
    confirmButtonText: "Continuar"
  });


   console.log(response);
   loadLead();

 }
});
}


function assignLead() {

 var parametros = {
  "agent_id": $("#agentSelect").val(),
  "id": getApp()
};

$.ajax({
  data: parametros,
  url:  API()+"/event.php/"+getAccess()+"/assignLead/",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {


   swal({
    title: "Genial!",
    text: "El Contacto tiene una nueva asignación!",
    type: "success",
    confirmButtonClass: "btn-success",
    confirmButtonText: "Continuar"
  });



   loadLead();
 }


})
}



function cambiarStatus(id){
 swal({
   title: "Importante!",
   text: "Confirmas el cambio de estatus?",
   type: "warning",
   showCancelButton: true,
   cancelButtonClass: "btn-default",
   confirmButtonClass: "btn-warning",
   confirmButtonText: "Lo confirmo",
   closeOnConfirm: false
 },
 function() {
   assignStatusId(id);
   swal({
    title: "Perfecto!",
    text: "El cambio de estatus ha sido Exitoso",
    type: "success",
    confirmButtonClass: "btn-success"
  });
 });
}



function assignStatusId(id) {

 var parametros = {
  "status_id": id,
  "id": getApp()
};

$.ajax({
  data: parametros,
  url: API()+"event.php/"+getAccess()+"/assignStatus/",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("wait..");
 },
 success: function(response) {
   loadLead();
 }

})
}


function archivedLead(id) {

 swal({
   title: "Esta seguro que desea eliminar este contacto?",
   text: "",
   type: "warning",
   showCancelButton: true,
   cancelButtonClass: "btn-default",
   confirmButtonClass: "btn-warning",
   confirmButtonText: "Continuar",
   closeOnConfirm: false
 },
 function() {
   archivedLeadConfirm(id);
   swal({
    title: "Genial",
    text: "El contacto ha sido eliminado!",
    type: "success",
    confirmButtonClass: "btn-success"
  });

 });
}


function archivedLeadConfirm(id) {

  var parametros = {
    "id": getApp()
  };

  $.ajax({
    data: parametros,
    url: API()+"lead.php/"+getAccess()+"/archived/"+id,
        type: 'post', //método de envio
        beforeSend: function() {
         console.log("wait..");
       },
       success: function(response) {
        create_datatableLeads();
      }

    })
}





function assignStatus() {

 var parametros = {
  "status_id": $("#statusSelect").val(),
  "id": getApp()
};

$.ajax({
  data: parametros,
  url: API()+"event.php/"+getAccess()+"/assignStatus/",
    type: 'post', //método de envio
    beforeSend: function() {
     console.log("wait..");
   },
   success: function(response) {


     swal({
      title: "Buen Trabajo!",
      text: "El Contacto se la modificado el estado",
      type: "success",
      confirmButtonClass: "btn-success",
      confirmButtonText: "Continuar"
    });

     loadLead();

   }

 })
}



function assignPayment(type) {

 var parametros = {
  "type": type,
  "id": getApp()
};

$.ajax({
  data: parametros,
  url: API()+"event.php/"+getAccess()+"/assignPayment/",
  type: 'post', //método de envio
  beforeSend: function() {
   console.log("Asignando el Pago");
 },
 success: function(response) {
   loadLead();
 }


})
}


function loadLead() {



  ajx();

  $("#status-select .select ").remove();
  $("#status-select").append("<option class='select' selected>Change Status</option>");
  $(".section-status button").remove();
  $.ajax({
   method: "GET",
   url: API()+"lead.php/"+getAccess()+"/" + getApp() + "",
   dataType: "json"
 })
  .done(function(n) {

    n = n[0];

    var f = new Date();
    $("#date_payment").val(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    $("#amount_payment").val(n.approveme);

    $(".firstname").val(n.firstname);
    $(".lastname").val(n.lastname);
    $(".email").val(n.email);
    $(".password").val(n.password);
    $(".phone").val(n.phone);
    $(".address").val(n.address);
    $(".address2").val(n.address2);
    $(".city").val(n.city);
    $(".estate").val(n.estate);
    $(".Country").val(n.Country);
    $(".zipcode").val(n.zipcode);
    $(".businessownership").val(n.businessownership);
    $(".datebirth").val(n.datebirth);
    $(".ssn").val(n.ssn);
    $(".company_name").val(n.company_name);
    $(".doingname").val(n.doingname);
    $(".tax").val(n.tax);
    $(".startdate").val(n.startdate);
    $(".companyaddress1").val(n.companyaddress1);
    $(".companyaddress2").val(n.companyaddress2);
    $(".companycity").val(n.companycity);
    $(".companyestate").val(n.companyestate);
    $(".companycountry").val(n.companycountry);
    $(".companyzipcode").val(n.companyzipcode);
    $(".type").val(n.type);
    $(".industry").val(n.industry);
    $(".monthlysales").val(n.monthlysales);
    $(".months").val(n.months);
    $(".created").val(n.created);
    $(".archived").val(n.archived);
    $(".mode").val(n.mode);
    $(".agent_id").val(n.agent_id);
    $(".revenue").val(n.revenue);
    $(".referencia").val(n.referencia);
    $(".requesteddays").val(n.requesteddays);
    $(".days").val(n.days);
    $(".dropzone #id").val(n.id);


    $(".approveme").val(fNumber.go(n.approveme, "$"));
    $(".amount").val(fNumber.go(n.amount, "$"));


    $(".secondname").val(n.secondname);
    $(".secondlastname").val(n.secondlastname);
    $(".documentid").val(n.documentid);
    $(".gender").val(n.gender);
    $(".maritalstatus").val(n.maritalstatus);
    $(".education").val(n.education);
    $(".cellphone").val(n.cellphone);
    $(".employmenttype").val(n.employmenttype);
    $(".laborreferralfn").val(n.laborreferralfn);
    $(".laborreferralln").val(n.laborreferralln);
    $(".laborreferralp").val(n.laborreferralp);
    $(".personalreferralfn").val(n.personalreferralfn);
    $(".personalreferralln").val(n.personalreferralln);
    $(".personalreferralp").val(n.personalreferralp);
    $(".monthlyincome").val(n.monthlyincome);
    $(".dependants").val(n.dependants);
    $(".monthlyoutcome").val(n.monthlyoutcome);
    $(".bank").val(n.bank);
    $(".accounttype").val(n.accounttype);
    $(".accountnumber").val(n.accountnumber);


/*
    n.fecha =  n.created.substring(0,10);
    n.fecha = n.fecha.replace("-","");
    n.fecha = n.fecha.replace("-","");
    n.fecha_registro = n.created.;
    */
    sessionStorage.setItem("statusLead",n.status);
    sessionStorage.setItem("codeid",n.code);

    $("#modal-1").removeClass("md-show");
    $("#modal-2").removeClass("md-show");
    $("#modal-3").removeClass("md-show");
    $("#modal-4").removeClass("md-show");
    $("#modal-5").removeClass("md-show");
    $("#modal-6").removeClass("md-show");
    $("#modal-7").removeClass("md-show");
    $("#modal-8").removeClass("md-show");


    $(".firstname").text(n.firstname);
    $(".lastname").text(n.lastname);
    $(".email").text(n.email);
    $(".password").text(n.password);
    $(".phone").text(n.phone);
    $(".address").text(n.address);
    $(".days").text(n.days);
    $(".company_name").text(n.company_name);
    $(".fecha_registro").text(n.created);



    $(".approveme").text(fNumber.go(n.approveme, "$"));
    $(".intereses").val(fNumber.go(n.intereses, "$"));
    $(".pago").val(fNumber.go(n.pago, "$"));
    $(".gastosadministrativos").val(fNumber.go(n.gastosadministrativos, "$"));
    $(".plataforma").val(fNumber.go(n.plataforma, "$"));
    $(".seguro").val(fNumber.go(n.seguro, "$"));
    $(".iva").val(fNumber.go(n.iva, "$"));
    $(".mode").text(n.mode);

    $(".pago").text(fNumber.go(n.pago, "$"));
    $(".mode").text(n.mode);
    $(".days").text(n.requesteddays);



    sessionStorage.setItem("intereses",n.intereses);
    sessionStorage.setItem("pago",n.pago);
    sessionStorage.setItem("gastosadministrativos",n.gastosadministrativos);
    sessionStorage.setItem("plataforma",n.plataforma);
    sessionStorage.setItem("seguro",n.seguro);
    sessionStorage.setItem("iva",n.iva);
    sessionStorage.setItem("dias",n.days);
    sessionStorage.setItem("monto",n.approveme);
    sessionStorage.setItem("modeLead",n.mode);




    $("#assignLeadCard img").attr("src", n.status_fk.avatar);
    $("#assignLeadCard p a").text(n.firstname+" "+n.lastname);
    $("#assignLeadCard .tbl-cell-status").text(n.status_fk.name);


    $(".save_lead").attr('disabled', 'disabled');

    $(".task .btn-pago").hide();
    $(".task .btn-bank").hide();
    $(".task .btn-aprobacion").hide();
    $(".task .btn-noaprobacion").hide();
    $(".task .btn-consignar").hide();
    $(".task .btn-contrato").hide();
    $(".task .btn-pagare").hide();


    if(n.status_fk.id == "150" ){



    }else if(n.status_fk.id == "151" ){


    }else if(n.status_fk.id == "152" ){

     $(".task .btn-bank").show();

   }else if(n.status_fk.id == "153" ){

     $(".task .btn-aprobacion").show();
     $(".task .btn-noaprobacion").show();



   }else if(n.status_fk.id == "157" ){

     $(".task .btn-consignar").show();
     $(".task .btn-contrato").show();
     $(".task .btn-pagare").show();
     $(".task .btn-pago").show();
     $(".btn-pago").show();


   }


   $('#mode option').remove();

   loadAssignmentAgent();
   loadtimelineLead();
   loadModeSelectAsign();
   loadSelectFilterMode();
   loadStatusSelectAsign();
   loadPayment();
   loadFile();
   complete();


 });
}



/* si estatus en 001

prospecto ->  Asignar agente - cambiar estatus { }
Aplicante ->  Subir bank - asignar agente - cambiar estatus 
Evaluacion -> Asignar agente - Cambiar estatus - Aprobar Credito - rechazar prestamo 
aprobado -> aprobacion cliente Asignar agente - Cambiar estatus
declinado ->  Asignar agente - Cambiar estatus
consignado ->  realizar depositos - Asignar agente - Cambiar estatus
adeudado -> Registrar pagos - Subir Soportes  - Asignar agente - Cambiar estatus
solvente -> solo reporte. solicitar otro credito
abandonado -> 

 */