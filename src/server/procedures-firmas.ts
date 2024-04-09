"use strict";

import { CoreFunctionParameters, ProcedureContext, ProcedureDef } from "backend-plus";

// import { ProcedureDef } from './types-firmas';

export const ProceduresFirmas: ProcedureDef[] = [
    {
        action: 'firmas_generar',
        parameters: [],
        coreFunction: async (context: ProcedureContext, _params: CoreFunctionParameters) => {
            let fieldsToReplace: {target:string, source:string}[] = [
                {target:'titular', source:'titular'},
                {target:'director_general', source:'director_general'},
                {target:'direccion_general', source:'direccion_general'},
                {target:'departamento', source:'departamento'},
                {target:'subdireccion', source:'subdireccion'},
                {target:'division', source:'division'},
                {target:'telefono', source:'telefono'},
                {target:'direccion_postal1', source:'dir_postal1'},
                {target:'direccion_postal2', source:'dir_postal2'},
                {target:'direccion', source:'direccion'},
                {target:'mail', source:'mail'}
            ];
            let replacers = fieldsToReplace.reduce((query , currentElem, currentIndex )=>{
                return `REPLACE(${currentIndex==0? 'mf.template_html': query}, '$$${currentElem.target}$$',COALESCE(p.${currentElem.source}::text,''))`
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