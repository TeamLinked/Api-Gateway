import {makeExecutableSchema} from "graphql-tools"
import {resolvers} from "./resolvers";

//RUTAS DEL SERVIDOR
const typeDefs=`
    type Query{

        valtoken(header: inputToken):String

        Login(body: inputLogin):resLogin

        getEmpleos:[Empleo]
        getUsuariosEmpleo:[UsuarioEmpleo]
        getCategorias:[Categoria]
        getPostulaciones:[Postulacion]
        getClasEmpleo:[ClasEmpleo]
        getMisEmpleosPublicados(ofertante_id: String): [Empleo]
        getMisEmpleosAplicados(postulante_id: String): [EmpleoPos]
        getEmpleosByCategoria(nombre_categoria: String): [Empleo]
        getEmpleo(id: Int): Empleo



        getUsuarios:[Usuario]
        getUsuario(id: Int):user
        getUsuarioByEmail(body: inputUsuarioByEmail):user
        getOrgUsuario(id:Int):Organizacion
        getOrganizaciones:[Organizacion]
        Foros:[Foro]
        findForo(id:Int):Foro
        findForoCreador(creador:Int):[Foro]
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
        inputCategoriaForo(body: inputCategoria): categoriaForo
        inputForoCal(body: inputForoCal): foroCal
        inputComentarioForos(body: inputComentarioForo):comentarioForo
        editForo(id: Int, body:inputForo):Foro
        delForo(id: Int):String

        putUsuario(body:inputUsuario):Usuario
        delUsuario(id:Int):Usuario
        actUsuario(id:Int, body:inputUsuario):Usuario
        inputUsuarioTag(id:String,body: inputTag): Tag
        delUsuarioTag(id: String):String
        inputOrganizaciones(id:String, body: inputTag): usuariosOrg
        delUsuarioOrg(id: String): String

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
    
    input inputCategoria{
        nombre: String
    }

    type categoriaForo{
        id: Int,
        nombre: String
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

    input inputToken{
        token: String
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
            id_creador: Int
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

    type usuariosOrg{
        usuarioId: Int
        organizacionId: Int
        createdAt: String
        updatedAt: String
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
        image: String,
        nacionalidad:String,
        fecha_nac:String,
        perf_profesional:String,
        perf_personal:String,
        createdAt:String,
        updatedAt:String
        organizacions: [organizacions]
        usuarioTags: [usuarioTags]
        
    }
    type organizacions{
        id: Int
        nombre: String
        id_usuario_admin: Int
        descripcion: String
        createdAt:String
        updatedAt:String
        usuario_organizacion: usuario_organizacion
    }

    type usuario_organizacion{
        createdAt:String,
        updatedAt:String
        organizacionId: Int
        usuarioId: Int
    }

    type usuarioTags{
        id: Int
        nombre: String
        createdAt:String
        updatedAt:String
        tag_usuario: tag_usuario
    }

    type tag_usuario{
        createdAt:String
        updatedAt:String
        tagId: Int
        usuarioId: Int
    }


    type Foro{
        id: Int
        titulo: String
        contenido: String
        categoria: String
        fecha_creacion: String
        imagen:String
        id_creador: Int
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
        id_ofertante:String,
        categoria: String
    }

    type EmpleoPos{
        id: Int,
        id_postulante: String,
        id_empleo: Empleo
        fechaAplicacion: String
    }

    type Empleo{
        id: Int,
        titulo: String,
        descripcion: String,
        fechaPublicacion:String,
        fechaVencimiento:String,
        id_ofertante:String,
        categoria: String
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

    type foroCal{
        id: Int
        id_categoria: Int
        id_foro: Int
    }

    input inputForoCal{
        id_categoria: Int
        id_foro: Int
    }

    input inputComentarioForo{
        id_participante: Int
        id_foro: Int
        comentario: String
    }

    type comentarioForo{
        id: Int
        comentario: String
        fecha_creacion: String
        id_participante: Int
        id_foro: Int
    }

    type Tag{
        usuarioId: Int
        tagId: Int
        createdAt: String
        updatedAt: String
    }

    input inputTag{
        id: Int
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
        id: Int,
        id_postulante: String,
        id_empleo: Empleo
        fechaAplicacion: String
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

