import { TableDefinition } from "backend-plus";

export function firmas(): TableDefinition // (context: TableContext)
{
    const td: TableDefinition = {
        name: 'firmas',
        fields: [
            {name: 'firma',typeName:"integer",nullable:false,isPk: 1},
            {name: 'nombre',typeName: "text",nullable: false},
            {name: 'direccion', typeName: "text"}
        ] ,
        primaryKey: ["firma"]
    };

    return td
}