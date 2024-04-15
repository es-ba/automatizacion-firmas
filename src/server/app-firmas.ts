"use strict";
import { AppBackend, Context, Request, Express,
    ClientModuleDefinition, OptsClientPage, MenuDefinition, MenuInfoBase
} from "backend-plus";
import { staticConfigYaml } from "./def-config";
import {usuarios} from "./table-usuarios"
import {modelos_firma} from "./table-modelos_firma"
import { personal } from "./table-personal";
import { ProceduresFirmas } from "./procedures-firmas";
import * as miniTools from "mini-tools";
export class AppFirmas extends AppBackend {

    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(staticConfigYaml);
    }

    override addSchrödingerServices(mainApp:Express, baseUrl:string){
        let be=this;
        super.addSchrödingerServices(mainApp, baseUrl);

        const getHtml = async (be:any, req:any)=>
            await be.inDbClient(req, async function(client:any){
                if(!req.query.cuit){
                    throw Error (`no se ingresó cuit en parámetro` )
                }
                const html = (await client.query(`
                    select firma_generada_html 
                        from personal 
                        where cuit = $1`,
                    [req.query.cuit]).fetchUniqueValue()).value;
                if(!html){
                    throw Error (`no hay firma generada para el cuit ${req.query.cuit}` )
                }
                return html;
            });

        mainApp.get(baseUrl+'/menu/firma-descargar',async function(req,res,next){
            try{
                const fileData = await getHtml(be,req);
                const mailUser = (<string>req.query.mail).split('@')[0]
                const fileName = 'firma-'+mailUser+'.html'
                const fileType = 'text/html'
                res.writeHead(200, {
                    'Content-Disposition': `attachment; filename="${fileName}"`,
                    'Content-Type': fileType,
                })
                const download = Buffer.from(fileData)
                res.end(download)
            }catch(err){
                console.log(err);
                miniTools.serveErr(req, res, next);
            }
        });

        mainApp.get(baseUrl+'/menu/firma-mostrar',async function(req,res,next){
            try{
                const html = await getHtml(be,req);
                miniTools.serveText(html, 'html')(req,res);
            }catch(err){
                console.log(err);
                miniTools.serveErr(req, res, next);
            }
        });
        
    }

    clientIncludes(req:Request|null, opts:OptsClientPage):ClientModuleDefinition[]{
        const menuedResources:ClientModuleDefinition[]=req && opts && !opts.skipMenu ? [
            { type:'js' , src:'client.js' },
        ]:[
            {type:'js' , src:'unlogged.js' },
        ];
        const list: ClientModuleDefinition[] = [
            ...super.clientIncludes(req, opts),
            { type: 'css', file: 'menu.css' },
            ... menuedResources
        ] satisfies ClientModuleDefinition[];
        return list;
    }

    getMenu(_context:Context):MenuDefinition{
        var menuContent:MenuInfoBase[]=[];
        menuContent.push(
            {menuType:'table', name:'personal'  },
            {menuType:'proc',  name:'firmas_generar', label:'generar firmas'},
            {menuType: 'menu', name:'config'        , label:'configurar', menuContent:[
                {menuType:'table', name:'usuarios'  },
                {menuType:'table', name:'modelos_firma'  },
                
            ]},
        )
        return {menu:menuContent};
    }

    prepareGetTables(){
        super.prepareGetTables();
        this.getTableDefinition={
            ... this.getTableDefinition, 
            usuarios,  
            modelos_firma,
            personal,
        }
    }

    async getProcedures(){
        const parentProc = await super.getProcedures();
        return parentProc.concat(ProceduresFirmas);
    }
    
    
}