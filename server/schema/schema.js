const graphql=require('graphql');

const Book=require('../Models/book.model');
const Author=require('../Models/author.model');
const {GraphQLObjectType , GraphQLString , GraphQLSchema ,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull}=graphql;
const _=require('lodash');


// var Books=[
//     {name:'Name of the Wind',genre:'Fantasy',id:'1',authorId:'1'},
//     {name:'The Final Empire',genre:'Fantasy',id:'2',authorId:'2'},
//     {name:'The Long Earth',genre:'Sci-Fi',id:'3',authorId:'3'},
//     {name:'The Hero of Ages',genre:'Fantasy',id:'4',authorId:'2'},
//     {name:'The Colour of Magic',genre:'Fantasy',id:'5',authorId:'3'},
//     {name:'The Light Fantastic',genre:'Fantasy',id:'6',authorId:'3'}
// ]
// var Authors=[
//     {name:'Patrick Rothfuss',age:44,id:"1"},
//     {name:'Brandon Sanderson',age:42,id:"2"},
//     {name:'Terry Pratchet',age:66,id:"3"}
// ]

// mongodb+srv://Rupayan:<password>@cluster0.zwupk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const BookType=new GraphQLObjectType({
    name:'book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
               return Author.findById(parent.authorId)
            }
        }

    })
})

const AuthorType=new GraphQLObjectType({
    name:'author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,id){
                return Book.find({
                    authorId:parent.id
                })
            }
        }
    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{ id : {type : GraphQLID}},
            resolve(parent,args){
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{ id : {type: GraphQLID}},
            resolve(parent,args){
                return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            args:{},
            resolve(parent,args){
                return Book.find({})
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            args:{},
            resolve(parent,args){
                return Author.find({})
            }
        }

    }
})
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author=new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports=new GraphQLSchema({query:RootQuery,mutation:Mutation});