import React from 'react'
import {gql } from 'apollo-boost'
import {graphql} from 'react-apollo'
import {getBookQuery} from '../query/query'
import BookDetails from './book.details.component'
class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selected:null
        }
    }
    componentWillUnmount(){
        this.state.selected=false;
    }
    displayBooks(){
        console.log(this.props)
        var data=this.props.data;
        if(data.loading)
        return (<div>Loading...</div>)
        else
        return data.books.map((book)=><li key={book.id} onClick={e=>{this.setState({selected:book.id})}}>{book.name}</li>)
    }
    render(){
        console.log(this.props)
        return <div>
            <ul id="Booklist">
            {
                this.displayBooks()
            }
            </ul>
            <BookDetails bookId={this.state.selected}/>
             
        </div>
    }
}
export default graphql(getBookQuery)(BookList);