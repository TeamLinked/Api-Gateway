//CONTROLADORES
import graphqlHTTP from "express-graphql";
import request from 'request-promise-native';
import axios from "axios";
import fetch from 'node-fetch';
import { generalRequest, getRequest } from './utilities';
import { applyResultTransforms } from "graphql-tools/dist/transforms/transforms";

const query = 'query{publicaciones{id titulo categoria fechaCreacion} }';

const opts = {
    method: "POST",
    headers: {
        'Accept': 'application/json',
    'Content-Type': 'application/json'
},
    body: JSON.stringify({ query })
  };
const hola= () => generalRequest(`http://35.198.21.214:8000/graphql/`,'POST',{"query":"query{publicaciones{id titulo categoria fechaCreacion} }"});
console.log(hola);
export const resolvers={
    Query:{
        //Microservicio de usuarios
        getUsuarios: () => getRequest('http://35.198.21.214:4000/api/usuarios',''),

        getOrgUsuario: (id) => generalRequest(`http://35.198.21.214:4000/api/organizacions/${id}`,''),

        
        //Microservicio Foros

        Publicaciones:() => generalRequest(`http://35.198.21.214:8000/graphql/`,'POST',{"query":"query{publicaciones{id titulo categoria fechaCreacion} }"}),

        //Microservicio Chats
        Messages: () => getRequest('http://35.198.21.214:3020',''),

        FindMessajes:(_,{id1,id2}) =>
        generalRequest(`http://35.198.21.214:3020/find/${id1}/${id2}`, 'GET'),


        //microservicio de MiREd
        Relaciones: () => getRequest('http://35.198.21.214:3010',''),

        RelacionU:(_,{id})=> generalRequest(`http://35.198.21.214:3010/edit/${id}`,'GET')
        
    },
    Mutation:{  
       
        //microservicio de Usuarios

        putUsuario:(_,{body}) =>
        generalRequest(`http://35.198.21.214:4000/api/usuarios/`, 'POST',body),



        delUsuario:(_,{id}) =>
        generalRequest(`http://35.198.21.214:4000/api/usuarios/${id}`, 'DELETE'),


        actUsuario:(_,{id,body}) =>
        generalRequest(`http://35.198.21.214:4000/api/usuarios/${id}`, 'PUT', body),



        //microservicio de chats

        SendMessage:(_,{input}) =>
        generalRequest(`http://35.198.21.214:3020/add`, 'POST', input),

        deleteMensaje:(_,{idmensaje}) =>
        generalRequest(`http://35.198.21.214:3020/deletemess/${idmensaje}`, 'DELETE'),

        deleteMensajes:(_,{id1,id2}) =>
        generalRequest(`http://35.198.21.214:3020/delete/${id1}/${id2}`, 'DELETE'),

         //microservicio de MiREd
        InRelacion:(_,{input}) =>
        generalRequest(`http://35.198.21.214:3010/add`, 'POST', input),
        
        addfriend:(_,{id1,id2}) =>
        generalRequest(`http://35.198.21.214:3010/addfriend/${id1}/${id2}`, 'POST'),

        addReq:(_,{id1,id2}) =>
        generalRequest(`http://35.198.21.214:3010/addReq/${id1}/${id2}`, 'POST'),

        delfriend:(_,{id1,id2}) =>
        generalRequest(`http://35.198.21.214:3010/delfriend/${id1}/${id2}`, 'POST'),

        delReq:(_,{id1,id2}) =>
        generalRequest(`http://35.198.21.214:3010/delReq/${id1}/${id2}`, 'POST'),

        deleteRelacion:(_,{id}) =>
        generalRequest(`http://35.198.21.214:3010/delete/${id}`, 'DELETE')



    }
}