import { graphql } from 'react-apollo';
import React from 'react';
import {getBookDetailsQuery} from '../query/query'
class BookDetails extends React.Component{


    displayBookDetails(){
        const { book }=this.props.data;
        if(book)
        {
            return <div>
                <h2>{book.name}</h2>
                <p>Genre : {book.genre}</p>
                <p>Author : {book.author.name}</p>
                <p>All Books by this Author</p>
                <ul className="other-books">
                    {book.author.books.map(item=>{return (<li key={item.id}>{item.name}</li>)})}
                </ul>
            </div>
        }
        else
        {
            return <div>No Book selected</div>
        }
    }

    render(){
        console.log(this.props)
        return (<div className="bookDetails">
            {this.displayBookDetails()}
        </div>)
    }
}

export default graphql(getBookDetailsQuery,{
    options:(props)=>{
        return {
            variables:{id:props.bookId}
        }
    }
})(BookDetails) 