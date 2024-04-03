"use strict";

import { CoreFunctionParameters, ProcedureContext, ProcedureDef } from "backend-plus";

// import { ProcedureDef } from './types-firmas';

export const ProceduresFirmas: ProcedureDef[] = [
    {
        action: 'firmas_generar',
        parameters: [],
        coreFunction: async (context: ProcedureContext, _params: CoreFunctionParameters) => {
            function replaceField(replaceList: {target:string, source:string}[]): string{
                const currentElem = replaceList.pop()
                return `REPLACE(${replaceList.length==0? 'mf.template_html': replaceField(replaceList)}, '$$${currentElem!.target}',COALESCE(p.${currentElem!.source}::text,''))`
            }
            
            let fieldsToReplace: {target:string, source:string}[] = [
                {target:'direccion_postal1', source:'dir_postal1'}, 
                {target:'telefono', source:'telefono'},
                {target:'direccion_postal2', source:'dir_postal2'}
            ];

            await context.client.query(`
                UPDATE personal p
                    SET firma_generada_html = 
                    ${replaceField(fieldsToReplace)}
                    FROM modelos_firma mf
                    where p.modelo=mf.modelo;
            `).execute()

            return 'ok'
        }
    }
];