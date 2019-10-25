import {makeExecutableSchema} from "graphql-tools"
import {resolvers} from "./resolvers";

//RUTAS DEL SERVIDOR
const typeDefs=`
    type Query{
        getUsuarios:[Usuario]
        getUsuario(id: Int):user
        getOrgUsuario(id:Int):Organizacion
        getOrganizaciones:[Organizacion]



        
        Foros:[Foro]
        findForo(id:Int):Foro


        Messages: [Message]
        FindMessajes(id1:String,id2:String):[Message]









        Relaciones:[Relacion]
        RelacionU(id:String):[Relacion]
    }
    type Mutation{
        inputForo(body: inputForo):Foro
        editForo(id: Int, body:inputForo):Foro
        delForo(id: Int):String

        putUsuario(body:inputUsuario):Usuario
        delUsuario(id:Int):Usuario
        actUsuario(id:Int, body:inputUsuario):Usuario

        putOrganizacion(body: inputOrganizacion):Organizacion
        actOrganizacion(id:Int, body: inputOrganizacion):Organizacion
        delOrganizacion(id:Int): org



        SendMessage(input:InputMessage): Message
        deleteMensaje(idmensaje:String):Message
        deleteMensajes(id1:String,id2:String):Message







        InRelacion(input:InputRelacion): Relacion
        addfriend(id1:String,id2:String):Relacion
        addReq(id1:String,id2:String):Relacion
        delfriend(id1:String,id2:String):Relacion
        delReq(id1:String,id2:String):Relacion
        deleteRelacion(id:String):Relacion
    }

    type org{
        message: String
    }

    input inputOrganizacion{
        id: Int
        nombre: String
        descripcion: String
        id_usuario_admin: Int
    }

    type Organizacion{
        id: Int
        nombre: String
        descripcion: String
        id_usuario_admin: Int
    }

    input inputForo{
            id: Int
            titulo: String
            contenido: String
            categoria: String
            fecha_creacion: String
            imagen: String
    }

    type organizacion{
        id: Int
        nombre:String
        id_usuario_admin: Int
        descripcion: String
        usuarios:Usuario
    }
    input inputUsuario{
        nombre:String,
        apellido:String,
        email:String,
        password:String,
        identificacion:String,
        nacionalidad:String,
        fecha_nac:String,
        perf_profesional:String,
        perf_personal:String,
    }

    type user{
        user:Usuario
    }
    type Usuario{
        id:Int,
        nombre:String,
        apellido:String,
        email:String,
        password:String,
        identificacion:String,
        nacionalidad:String,
        fecha_nac:String,
        perf_profesional:String,
        perf_personal:String,
        createdAt:String,
        updatedAt:String
    }


    type Foro{
        id: ID,
        titulo: String,
        contenido: String,
        categoria: String,
        fechaCreacion: String,
        imagen:String
    }

    input InputMessage{
        transmitter: String,
        receiver: String,
        message: String
    }

    input InputRelacion{
        id:String,
        ciudad: String,
        profesion: String,
        institucion: String,
        friends:[String],
        friendsReq:[String]
    }

    type Message{
        _id: String,
        transmitter: String,
        receiver: String,
        message: String,
        date: String,
        _v: Int
    }

    type Relacion{
        id: String,
        ciudad: String,
        profesion: String,
        institucion: String,
        friends:[String],
        friendsReq:[String]
    }
`;

export default makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:resolvers
})

