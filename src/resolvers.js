//CONTROLADORES
import graphqlHTTP from "express-graphql";
import request from 'request-promise-native';
import { generalRequest, getRequest } from './utilities';
import { applyResultTransforms } from "graphql-tools/dist/transforms/transforms";

export const resolvers={
    Query:{

        Login:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8086/login`,'POST',body),

        //Microservicio de Empleos
        getEmpleos: () => getRequest('http://34.94.59.230:8001/empleos',''),

        getUsuariosEmpleo: () => getRequest('http://34.94.59.230:8001/usuarios',''),

        getCategorias: () => getRequest('http://34.94.59.230:8001/categorias',''),

        getPostulaciones: () => getRequest('http://34.94.59.230:8001/postulaciones',''),

        getClasEmpleo: () => getRequest('http://34.94.59.230:8001/clasificacionempleos',''),


        //Microservicio de usuarios
        getUsuarios: () => getRequest('http://34.94.59.230:4000/api/usuarios',''),

        getUsuarioByEmail:(_,{body}) =>
        generalRequest(`http://34.94.59.230:4000/api/usuarioByMail`,'GET',body),

        getOrgUsuario: (_,{id}) => generalRequest(`http://34.94.59.230:4000/api/organizaciones/${id}`,''),

        getUsuario: (_,{id}) => generalRequest(`http://34.94.59.230:4000/api/usuario/${id}`,''),

        getOrganizaciones: () => getRequest(`http://34.94.59.230:4000/api/organizaciones`,''),

        //Microservicio Foros

        Foros:() => generalRequest(`http://34.94.59.230:8000/foros/`,'GET'),

        findForo:(_,{id}) =>
        generalRequest(`http://34.94.59.230:8000/foros/${id}`, 'GET'),

        //Microservicio Chats
        Messages: () => getRequest('http://34.94.59.230:3020',''),

        FindMessajes:(_,{id1,id2}) =>
        generalRequest(`http://34.94.59.230:3020/find/${id1}/${id2}`, 'GET'),


        //microservicio de MiREd
        Relaciones: () => getRequest('http://34.94.59.230:3010',''),

        RelacionU:(_,{id})=> generalRequest(`http://34.94.59.230:3010/edit/${id}`,'GET')
        
    },
    Mutation:{  
        //Microservicio de Empleos
        Register:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8086/add`,'POST',body),

        DeleteUser:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8086/delete`,'DELETE',body),


        inputEmpleo:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8001/empleos/`,'POST',body),

        inputUsuarioEmpleo:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8001/usuarios/`,'POST',body),

        inputCategoria:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8001/categorias/`,'POST',body),

        inputPostulacion:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8001/postulaciones/`,'POST',body),

        inputClasEmpleo:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8001/clasificacionempleos/`,'POST',body),



        editEmpleo:(_,{id,body}) =>
        generalRequest(`http://34.94.59.230:8001/empleos/${id}`,'PUT',body),

        editCategoria:(_,{id,body}) =>
        generalRequest(`http://34.94.59.230:8001/categorias/${id}`,'PUT',body),

        editClasEmpleo:(_,{id,body}) =>
        generalRequest(`http://34.94.59.230:8001/clasificacionempleos/${id}`,'PUT',body),



        delUsuarioEm:(_,{id}) =>
        generalRequest(`http://34.94.59.230:8001/usuarios/${id}`,'DELETE'),

        delEmpleo:(_,{id}) =>
        generalRequest(`http://34.94.59.230:8001/empleos/${id}`,'DELETE'),

        delCategoria:(_,{id}) =>
        generalRequest(`http://34.94.59.230:8001/categorias/${id}`,'DELETE'),

        delPostulacion:(_,{id}) =>
        generalRequest(`http://34.94.59.230:8001/postulaciones/${id}`,'DELETE'),

        delClasEmpleo:(_,{id}) =>
        generalRequest(`http://34.94.59.230:8001/clasificacionempleos/${id}`,'DELETE'),





        //Microservicio de foros
        inputForo:(_,{body}) =>
        generalRequest(`http://34.94.59.230:8000/foros/`,'POST',body),

        editForo:(_,{id,body}) =>
        generalRequest(`http://34.94.59.230:8000/foros/${id}`,'PUT',body),

        delForo:(_,{id}) =>
        generalRequest(`http://34.94.59.230:8000/foros/${id}`,'DELETE'),

        

       
        //microservicio de Usuarios

        putUsuario:(_,{body}) =>
        generalRequest(`http://34.94.59.230:4000/api/usuarios/`, 'POST',body),



        delUsuario:(_,{id}) =>
        generalRequest(`http://34.94.59.230:4000/api/usuarios/${id}`, 'DELETE'),


        actUsuario:(_,{id,body}) =>
        generalRequest(`http://34.94.59.230:4000/api/usuarios/${id}`, 'PUT', body),


        putOrganizacion: (_,{body}) => generalRequest(`http://34.94.59.230:4000/api/organizaciones`,'POST',body),
        actOrganizacion: (_,{id,body}) => generalRequest(`http://34.94.59.230:4000/api/organizaciones/${id}`,'PUT',body),
        delOrganizacion: (_,{id}) => generalRequest(`http://34.94.59.230:4000/api/organizaciones/${id}`,'DELETE'),

        //microservicio de chats

        SendMessage:(_,{input}) =>
        generalRequest(`http://34.94.59.230:3020/add`, 'POST', input),

        deleteMensaje:(_,{idmensaje}) =>
        generalRequest(`http://34.94.59.230:3020/deletemess/${idmensaje}`, 'DELETE'),

        deleteMensajes:(_,{id1,id2}) =>
        generalRequest(`http://34.94.59.230:3020/delete/${id1}/${id2}`, 'DELETE'),

         //microservicio de MiREd
        InRelacion:(_,{input}) =>
        generalRequest(`http://34.94.59.230:3010/add`, 'POST', input),
        
        addfriend:(_,{id1,id2}) =>
        generalRequest(`http://34.94.59.230:3010/addfriend/${id1}/${id2}`, 'POST'),

        addReq:(_,{id1,id2}) =>
        generalRequest(`http://34.94.59.230:3010/addReq/${id1}/${id2}`, 'POST'),

        delfriend:(_,{id1,id2}) =>
        generalRequest(`http://34.94.59.230:3010/delfriend/${id1}/${id2}`, 'POST'),

        delReq:(_,{id1,id2}) =>
        generalRequest(`http://34.94.59.230:3010/delReq/${id1}/${id2}`, 'POST'),

        deleteRelacion:(_,{id}) =>
        generalRequest(`http://34.94.59.230:3010/delete/${id}`, 'DELETE')



    }
}