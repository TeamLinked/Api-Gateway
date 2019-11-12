import {makeExecutableSchema} from "graphql-tools"
import {resolvers} from "./resolvers";

//RUTAS DEL SERVIDOR
const typeDefs=`
    type Query{

        Login(body: inputLogin):resLogin

        getEmpleos:[Empleo]
        getUsuariosEmpleo:[UsuarioEmpleo]
        getCategorias:[Categoria]
        getPostulaciones:[Postulacion]
        getClasEmpleo:[ClasEmpleo]






        getUsuarios:[Usuario]
        getUsuario(id: Int):user
        getUsuarioByEmail(body: inputUsuarioByEmail):user
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

        Register(body: inputRegister):resRegister
        DeleteUser(body: inputDelUser):String


        inputEmpleo(body: InputEmpleo):Empleo
        inputUsuarioEmpleo(body:InputUsuarioEmpleo):UsuarioEmpleo
        inputCategoria(body:InputCategoria): Categoria
        inputPostulacion(body:InputPostulacion):Postulacion
        inputClasEmpleo(body:InputClasEmpleo):ClasEmpleo


        editEmpleo(id:Int,body:InputEmpleo): Empleo
        editCategoria(id:Int, body:InputCategoria):Categoria
        editClasEmpleo(id:Int, body:InputClasEmpleo):ClasEmpleo


        delUsuarioEm(id: String):String
        delEmpleo(id: Int):String
        delCategoria(id: Int):String
        delPostulacion(id: Int):String
        delClasEmpleo(id: Int):String



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

    input inputUsuarioByEmail{
        email: String
    }

    type resRegister{
        answer: String
    }

    type resLogin{
        token: String
    }

    input inputRegister{
        cn: String,
        sn: String,
        givenName: String,
        objectclass: String,
        userPassword: String
    }

    input inputLogin{
        username:String,
        password:String
    }

    input inputDelUser{
        user:String
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
        fecha_creacion: String,
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

    input InputEmpleo{
        titulo: String,
        descripcion: String,
        fechaVencimiento:String,
        id_ofertante:String
    }


    type Empleo{
        id: Int,
        titulo: String,
        descripcion: String,
        fechaPublicacion:String,
        fechaVencimiento:String,
        id_ofertante:String
    }

    type UsuarioEmpleo{
        id_usuario:String
    }

    input InputUsuarioEmpleo{
        id_usuario:String
    }

    type Categoria{
        id: Int,
        nombre: String
    }

    input InputCategoria{
        nombre: String
    }

    type ClasEmpleo{
        id: Int
        id_categoria: Int
        id_empleo: Int
    }

    input InputClasEmpleo{
        id_categoria: Int
        id_empleo: Int
    }

    type Postulacion{
        id: Int
        fechaAplicacion: String
        id_postulante: String
        id_empleo: Int
    }

    input InputPostulacion{
        id_postulante: String
        id_empleo: Int
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

