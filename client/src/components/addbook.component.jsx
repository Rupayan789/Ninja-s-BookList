import React from 'react';
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getAuthorsQuery, getBookQuery} from '../query/query'
import { addBookMutation} from '../query/query'

class Addbook extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            genre:"",
            authorId:""
        };
    }

    displayAuthor(){
        console.log(this.props)
        const data=this.props.getAuthorsQuery;
        if(data.loading)
        return <option disabled>Loading Author...</option>
        else
        return data.authors.map(author=><option key={author.id} value={author.id}>{author.name}</option>)
    }
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBookQuery}]
        });
    }
    render(){
        return (
          <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="fields">
                        <label>Book Name:</label>
                        <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
                </div>
                <div className="fields">
                    <label>Book Genre:</label>
                    <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
              </div>
              <div className="fields">
                    <label>Author:</label>
                    <select  onChange={(e)=>this.setState({authorId:e.target.value})}>
                        <option>select Author</option>
                        {this.displayAuthor()}
                    </select>
              </div>
              <button>+</button>
          </form>  
        )
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
        graphql(addBookMutation,{name:"addBookMutation"}))(Addbook);