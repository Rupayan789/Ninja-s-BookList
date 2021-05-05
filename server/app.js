const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const schema=require('./schema/schema')
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const env=require('dotenv');
env.config();

app.use(cors())
const url='mongodb+srv://Rupayan:'+process.env.PASSWORD+'@cluster0.u4rcc.mongodb.net/BookSelect?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.once('open',()=>console.log("database connected"));

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))
app.listen(4000,()=>console.log("Server started"));