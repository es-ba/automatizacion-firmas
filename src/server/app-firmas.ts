import { AppBackend, Context, MenuDefinition, MenuInfoBase } from "backend-plus";
import { staticConfigYaml } from "./def-config";
import {usuarios} from "./table-usuarios"
import {modelos_firma} from "./table-modelos_firma"
import { personal } from "./table-personal";
import { ProceduresFirmas } from "./procedures-firmas";
export class AppFirmas extends AppBackend {

    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(staticConfigYaml);
    }

    getMenu(_context:Context):MenuDefinition{
        var menuContent:MenuInfoBase[]=[];
        menuContent.push(
            {menuType: 'menu', name:'config', label:'Configurar', menuContent:[
                {menuType:'table', name:'usuarios'  },
                {menuType:'proc', name:'firmas_generar', label:'Generar firmas'},
            ]},
            {menuType: 'menu', name:'tablas', label:'Tablas', menuContent:[
                {menuType:'table', name:'modelos_firma'  },
                {menuType:'table', name:'personal'  },
            ]}
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