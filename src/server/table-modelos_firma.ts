"use strict";

import { TableContext, TableDefinition } from "backend-plus";

export function modelos_firma(context: TableContext): TableDefinition {
    const admin = context.user.rol === 'admin';
    return {
        name: 'modelos_firma',
        title: 'Modelos de firma',
        editable: admin,
        fields: [
            { name: 'modelo'                , typeName: 'text', nullable: false },
            { name: 'nombre'                , typeName: 'text', nullable: false , isName: true},
            { name: 'con_titular'           , typeName: 'boolean' },
            { name: 'con_division'          , typeName: 'boolean' },
            { name: 'con_departamento'      , typeName: 'boolean' },
            { name: 'con_direccion'         , typeName: 'boolean' },
            { name: 'con_subdireccion'      , typeName: 'boolean' },          
            { name: 'con_director_general'  , typeName: 'boolean' },
            { name: 'con_direccion_general' , typeName: 'boolean' },
            { name: 'con_telefono'          , typeName: 'boolean' },
            { name: 'con_dir_postal1'       , typeName: 'boolean' },
            { name: 'con_dir_postal2'       , typeName: 'boolean' },
            { name: 'con_mail'              , typeName: 'boolean' },
            { name: 'template_html'         , typeName: 'text'    },
        ],
        primaryKey: ['modelo'],
    };
}