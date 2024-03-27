"use strict";

import { CoreFunctionParameters, ProcedureContext, ProcedureDef } from "backend-plus";

// import { ProcedureDef } from './types-firmas';

export const ProceduresFirmas: ProcedureDef[] = [
    {
        action: 'firmas_generar',
        parameters: [],
        coreFunction: async (context: ProcedureContext, _params: CoreFunctionParameters) => {
            const modelo = await context.client.query(`
                UPDATE personal p
                SET firma_generada_html = 
                REPLACE(mf.template_html,'$$telefono',COALESCE(p.telefono::text,''))
                FROM modelos_firma mf
                where p.modelo=mf.modelo;
            `).execute()
            return 'ok'
        }
    }
];