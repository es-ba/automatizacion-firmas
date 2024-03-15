import { AppBackend, Context, MenuDefinition, MenuInfoBase } from "backend-plus";
import { staticConfigYaml } from "./def-config";
import {firmas} from "./table-firmas"
import {usuarios} from "./table-usuarios"
export class AppFirmas extends AppBackend {

    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(staticConfigYaml);
    }

    getMenu(_context:Context):MenuDefinition{
        var menuContent:MenuInfoBase[]=[];
        menuContent.push(
            {menuType: 'menu', name:'config', label:'configurar', menuContent:[
                {menuType:'table', name:'usuarios'  },
            ]}
        )
        return {menu:menuContent};
    }

    prepareGetTables(){
        super.prepareGetTables();
        this.getTableDefinition={
            ... this.getTableDefinition,
            firmas  ,  
            usuarios,  
        }
    }
    
    
}