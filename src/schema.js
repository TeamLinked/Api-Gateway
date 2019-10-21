import {makeExecutableSchema} from "graphql-tools"
import {resolvers} from "./resolvers";

//RUTAS DEL SERVIDOR
const typeDefs=`
    type Query{
        getUsuarios:[Usuario]
        getOrgUsuario(id:Int):[String]



        
        Publicaciones:pub


        Messages: [Message]
        FindMessajes(id1:String,id2:String):[Message]









        Relaciones:[Relacion]
        RelacionU(id:String):[Relacion]
    }
    type Mutation{
        putUsuario(body:inputUsuario):Usuario
        delUsuario(id:Int):Usuario
        actUsuario(id:Int, body:inputUsuario):Usuario




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

    type pub{
            data:data

    }
    type data{
        Publicaciones:[Publicacion]
    }


    type Publicacion{
        id: ID,
        titulo: String,
        contenido: String,
        categoria: String,
        fechaCreacion: String
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

