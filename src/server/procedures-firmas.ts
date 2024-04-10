"use strict";

import { FieldDefinition } from "backend-plus";
import { CoreFunctionParameters, ProcedureContext, ProcedureDef } from "backend-plus";
import { personal } from "./table-personal";

// import { ProcedureDef } from './types-firmas';

export const ProceduresFirmas: ProcedureDef[] = [
    {
        action: 'firmas_generar',
        parameters: [],
        coreFunction: async (context: ProcedureContext, _params: CoreFunctionParameters) => {
            const personalTableDef = personal(context)
            let replacers = personalTableDef.fields.reduce((query , currentField:FieldDefinition, currentIndex )=>{
                return `REPLACE(${currentIndex==0? 'mf.template_html': query}, '$$${currentField.name}$$',COALESCE(p.${currentField.name}::text,''))`
            },`''`)
            await context.client.query(`
                UPDATE personal p
                    SET firma_generada_html = nullif(${replacers},'')
                    FROM modelos_firma mf
                    where p.modelo=mf.modelo;
            `).execute()
            return 'ok'
        }
    }
];