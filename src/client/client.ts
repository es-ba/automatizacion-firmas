import {html} from "js-to-html";
myOwn.clientSides.mostrarFirma = {
    update: function (_depot, _fieldName) {
    },
    prepare: function (depot, fieldName) {
        var td = depot.rowControls[fieldName];
        td.innerHTML='';
        var boton = html.button('ver firma').create();
        td.appendChild(boton);
        boton.onclick=function(){
            window.open(depot.row.url_plan, '_mostrar_firma')
        }
        return ''
    },
};