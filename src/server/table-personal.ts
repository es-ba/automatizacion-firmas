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
            { name: 'titular', typeName: 'text' },
            { name: 'division', typeName: 'text' },
            { name: 'departamento', typeName: 'text' },
            { name: 'direccion', typeName: 'text' },
            { name: 'subdireccion', typeName: 'text' },
            { name: 'director_general', typeName: 'text' },
            { name: 'direccion_general', typeName: 'text' },
            { name: 'telefono', typeName: 'text' },
            { name: 'postal1', typeName: 'text' },
            { name: 'dir_postal2', typeName: 'text' },
            { name: 'mail', typeName: 'text' },
            { name: 'firma_generada_html', typeName: 'text' },
        ],
        primaryKey: ['cuit'],
        foreignKeys: [{ references: "modelos_firma", fields: ["modelo"] },
        ]
    };
}