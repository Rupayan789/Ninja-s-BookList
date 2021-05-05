import BookList from './components/book.component'
import  ApolloClient from 'apollo-boost'
import {ApolloProvider}  from 'react-apollo'
import AddBook from './components/addbook.component'

const client=new ApolloClient({
  uri:'http://localhost:4000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's Book List</h1>
          <BookList/>
          <AddBook/>
        </div>
    </ApolloProvider>
  );
}

export default App;
