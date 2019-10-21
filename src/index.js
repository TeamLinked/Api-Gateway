import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./schema"
import axios from "axios";
const app = express();


app.use('/graphql',graphqlHTTP({
    graphiql: true,
    schema:schema    
}));
app.listen(3050,()=> console.log('Server on port 3050'));