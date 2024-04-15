import {html} from "js-to-html";

myOwn.clientSides.accionesFirma = {
    update: function (_depot, _fieldName) {
    },
    prepare: function (depot, fieldName) {
        const td = depot.rowControls[fieldName];
        td.innerHTML='';
        const botonMostrar = html.button('mostrar firma').create();
        const botonDescargar = html.button('descargar firma').create();
        td.appendChild(botonMostrar);
        td.appendChild(botonDescargar);
        botonMostrar.onclick=function(){
            window.open(`${location.origin}${location.pathname}/firma-mostrar?cuit=${depot.row.cuit}`, '_mostrar_firma')
        }
        botonDescargar.onclick=function(){
            window.open(`${location.origin}${location.pathname}/firma-descargar?cuit=${depot.row.cuit}`, '_descargar_firma')
        }
        return ''
    },
};