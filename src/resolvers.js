//CONTROLADORES
import graphqlHTTP from "express-graphql";
import request from 'request-promise-native';
import { generalRequest, getRequest } from './utilities';
import { applyResultTransforms } from "graphql-tools/dist/transforms/transforms";




export const resolvers={
    Query:{
        valtoken:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8086/valtoken`,'POST',body),

        Login:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8086/login`,'POST',body),

        //Microservicio de Empleos
        getEmpleos: () => getRequest('http://34.94.208.170:8002/empleos',''),

        getUsuariosEmpleo: () => getRequest('http://34.94.208.170:8002/usuarios',''),

        getCategorias: () => getRequest('http://34.94.208.170:8002/categorias',''),

        getPostulaciones: () => getRequest('http://34.94.208.170:8002/verpostulaciones',''),

        getClasEmpleo: () => getRequest('http://34.94.208.170:8002/clasificacionempleos',''),

        getMisEmpleosPublicados: (_,{ofertante_id}) => generalRequest(`http://34.94.208.170:8002/empleos/?id_ofertante=${ofertante_id}`),

        getMisEmpleosAplicados: (_,{postulante_id}) => generalRequest(`http://34.94.208.170:8002/verpostulaciones/?id_postulante=${postulante_id}`),

        getEmpleosByCategoria: (_,{nombre_categoria}) => generalRequest(`http://34.94.208.170:8002/empleos/?categoria=${nombre_categoria}`),

        getEmpleo: (_,{id}) => generalRequest(`http://34.94.208.170:8002/empleos/${id}`),


        //Microservicio de usuarios
        getUsuarios: () => getRequest('http://35.215.69.224:4030/api/usuarios',''),

        getUsuarioByEmail:(_,{body}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuarioByMail`,'GET',body),

        getOrgUsuario: (_,{id}) => generalRequest(`http://35.215.69.224:4030/api/organizaciones/${id}`,''),

        getUsuario: (_,{id}) => generalRequest(`http://35.215.69.224:4030/api/usuario/${id}`,''),

        getOrganizaciones: () => getRequest(`http://35.215.69.224:4030/api/organizaciones`,''),

        //Microservicio Foros

        Foros:() => generalRequest(`http://35.215.69.224:8003/foros/`,'GET'),

        findForo:(_,{id}) =>
        generalRequest(`http://35.215.69.224:8003/foros/${id}`, 'GET'),

        findForoCreador:(_,{creador}) =>
        generalRequest(`http://35.215.69.224:8003/foros/?id_creador=${creador}`, 'GET'),

        //Microservicio Chats
        Messages: () => getRequest('http://35.235.64.211:3021',''),

        FindMessajes:(_,{id1,id2}) =>
        generalRequest(`http://35.235.64.211:3021/find/${id1}/${id2}`, 'GET'),

        //microservicio de MiREd
        Relaciones: () => getRequest('http://35.236.27.232:3011',''),

        RelacionU:(_,{id})=> generalRequest(`http://35.236.27.232:3011/edit/${id}`,'GET')        
    },
    Mutation:{  
        
        Register:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8086/add`,'POST',body),

        DeleteUser:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8086/delete`,'DELETE',body),

        //Microservicio de Empleos

        inputEmpleo:(_,{body}) =>
        generalRequest(`http://34.94.208.170:8002/empleos/`,'POST',body),

        inputUsuarioEmpleo:(_,{body}) =>
        generalRequest(`http://34.94.208.170:8002/usuarios/`,'POST',body),

        inputCategoria:(_,{body}) =>
        generalRequest(`http://34.94.208.170:8002/categorias/`,'POST',body),

        inputPostulacion:(_,{body}) =>
        generalRequest(`http://34.94.208.170:8002/postulaciones/`,'POST',body),

        inputClasEmpleo:(_,{body}) =>
        generalRequest(`http://34.94.208.170:8002/clasificacionempleos/`,'POST',body),



        editEmpleo:(_,{id,body}) =>
        generalRequest(`http://34.94.208.170:8002/empleos/${id}`,'PUT',body),

        editCategoria:(_,{id,body}) =>
        generalRequest(`http://34.94.208.170:8002/categorias/${id}`,'PUT',body),

        editClasEmpleo:(_,{id,body}) =>
        generalRequest(`http://34.94.208.170:8002/clasificacionempleos/${id}`,'PUT',body),



        delUsuarioEm:(_,{id}) =>
        generalRequest(`http://34.94.208.170:8002/usuarios/${id}`,'DELETE'),

        delEmpleo:(_,{id}) =>
        generalRequest(`http://35.236.27.232.224:8001/empleos/${id}`,'DELETE'),

        delCategoria:(_,{id}) =>
        generalRequest(`http://34.94.208.170:8002/categorias/${id}`,'DELETE'),

        delPostulacion:(_,{id}) =>
        generalRequest(`http://34.94.208.170:8002/postulaciones/${id}`,'DELETE'),

        delClasEmpleo:(_,{id}) =>
        generalRequest(`http://34.94.208.170:8002/clasificacionempleos/${id}`,'DELETE'),





        //Microservicio de foros
        inputForo:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8000/foros/`,'POST',body),

        editForo:(_,{id,body}) =>
        generalRequest(`http://35.215.69.224:8000/foros/${id}`,'PUT',body),

        delForo:(_,{id}) =>
        generalRequest(`http://35.215.69.224:8000/foros/${id}`,'DELETE'),

        inputCategoriaForo:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8000/categorias/`,'POST',body),

        inputForoCal:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8000/calificacionforos/`,'POST',body),

        inputComentarioForos:(_,{body}) =>
        generalRequest(`http://35.215.69.224:8000/comentarios/`,'POST',body),

       
        //microservicio de Usuarios

        putUsuario:(_,{body}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuarios/`, 'POST',body),



        delUsuario:(_,{id}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuarios/${id}`, 'DELETE'),


        actUsuario:(_,{id,body}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuarios/${id}`, 'PUT', body),


        putOrganizacion: (_,{body}) => generalRequest(`http://35.215.69.224:4030/api/organizaciones`,'POST',body),
        actOrganizacion: (_,{id,body}) => generalRequest(`http://35.215.69.224:4030/api/organizaciones/${id}`,'PUT',body),
        delOrganizacion: (_,{id}) => generalRequest(`http://35.215.69.224:4030/api/organizaciones/${id}`,'DELETE'),

        inputUsuarioTag:(_,{id,body}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuario/tags/${id}`, 'POST', body),

        delUsuarioTag:(_,{id}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuario/tags/${id}`, 'DELETE'),

        inputOrganizaciones:(_,{id,body}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuario/organizaciones/${id}`, 'POST', body),

        delUsuarioOrg:(_,{id}) =>
        generalRequest(`http://35.215.69.224:4030/api/usuario/organizaciones/${id}`, 'DELETE'),

        
        //microservicio de chats

        SendMessage:(_,{input}) =>
        generalRequest(`http://35.235.64.211:3021/add`, 'POST', input),

        deleteMensaje:(_,{idmensaje}) =>
        generalRequest(`http://35.235.64.211:3021/deletemess/${idmensaje}`, 'DELETE'),

        deleteMensajes:(_,{id1,id2}) =>
        generalRequest(`http://35.235.64.211:3021/delete/${id1}/${id2}`, 'DELETE'),

         //microservicio de MiREd
        InRelacion:(_,{input}) =>
        generalRequest(`http://35.236.27.232:3011/add`, 'POST', input),
        
        addfriend:(_,{id1,id2}) =>
        generalRequest(`http://35.236.27.232:3011/addfriend/${id1}/${id2}`, 'POST'),

        addReq:(_,{id1,id2}) =>
        generalRequest(`http://35.236.27.232:3011/addReq/${id1}/${id2}`, 'POST'),

        delfriend:(_,{id1,id2}) =>
        generalRequest(`http://35.236.27.232:3011/delfriend/${id1}/${id2}`, 'POST'),

        delReq:(_,{id1,id2}) =>
        generalRequest(`http://35.236.27.232:3011/delReq/${id1}/${id2}`, 'POST'),

        deleteRelacion:(_,{id}) =>
        generalRequest(`http://35.236.27.232:3011/delete/${id}`, 'DELETE')
    }
}