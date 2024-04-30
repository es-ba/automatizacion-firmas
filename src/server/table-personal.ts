"use strict";

import { TableContext, TableDefinition } from "backend-plus";

export function personal(context: TableContext): TableDefinition {
    const admin = context.user.rol === 'admin';
    return {
        name: 'personal',
        title: 'Personal',
        editable: admin,
        fields: [
            { name: 'cuit', typeName: 'bigint', nullable: false },
            { name: 'modelo', typeName: 'text', nullable: false },
            { name: 'titular', typeName: 'text', nullable: false },
            { name: 'acciones',             inTable:false, typeName:'text'      , editable:false  , clientSide:'accionesFirma'},
            { name: 'division', typeName: 'text' },
            { name: 'departamento', typeName: 'text' },
            { name: 'direccion', typeName: 'text' },
            { name: 'subdireccion', typeName: 'text' },
            { name: 'director_general', typeName: 'text' },
            { name: 'direccion_general', typeName: 'text' },
            { name: 'prefijo_telefono', typeName: 'text' },
            { name: 'telefono', typeName: 'text' },
            { name: 'dir_postal1', typeName: 'text' },
            { name: 'prefijo_espacio', typeName: 'text' },
            { name: 'espacio', typeName: 'text' },
            { name: 'dir_postal2', typeName: 'text' },
            { name: 'mail', typeName: 'text', nullable: false },
            { name: 'firma_generada_html', typeName: 'text' },
        ],
        primaryKey: ['cuit'],
        hiddenColumns: ['firma_generada_html'],
        foreignKeys: [{ references: "modelos_firma", fields: ["modelo"] },
        ]
    };
}