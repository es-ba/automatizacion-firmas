//import {html} from "js-to-html";
my.clientSides.mostrarFirma = {
    update: function (_depot, _fieldName) {
    },
    prepare: function (depot, fieldName) {
        console.log(depot, fieldName);
        /* var td = depot.rowControls[fieldName];
        td.innerHTML='';
        var boton = html.button('ver planificación').create();
        td.appendChild(boton);
        boton.onclick=function(){
            window.open(depot.row.url_plan, '_mostrar_firma')
        } */
        return ''
    },
};