import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import AddBooks from './AddBooks'


class BooksApp extends React.Component {
  state = {
    books:[],
    searchedBooks:[]

  }

  constructor(){
    super();
    
    BooksAPI.getAll().then ((books)=>{
      this.setState ({books: books });
    })
    this.changeShelf=this.changeShelf.bind(this);
    this.searchBooks=this.searchBooks.bind(this);

  }

  componentDidMount(){
    //BooksAPI.getAll().then((books) => console.log(books))
    BooksAPI.getAll().then ((books)=>{
      this.setState ({books: books })
    }).then (console.log(this.state.books));
  }

  changeShelf(book,shelf){
    BooksAPI.update(book,shelf).then(
    BooksAPI.getAll().then ((books)=>{
      this.setState ({books: books })
    }));
  }

  searchBooks(query,maxResults){
    BooksAPI.search(query,maxResults).then((books)=>{
       books && (books.constructor===Array) && this.setState({searchedBooks: books});
    });
  }
  

  render() {
    return (
      <div className="app">
        <Route exact path="/"  render={() => {
          return(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf 
                  title="Currently Reading" 
                  selectedBooks={this.state.books.filter((book)=> book.shelf ==="currentlyReading")}
                  onChangeShelf = {this.changeShelf}
                />
              </div>
              <div>
                <Bookshelf 
                  title="Want to Read" 
                  selectedBooks={this.state.books.filter((book)=> book.shelf ==="wantToRead")}
                  onChangeShelf = {this.changeShelf}
                />
              </div> 
              <div>
                <Bookshelf 
                  title="Read" 
                  selectedBooks={this.state.books.filter((book)=> book.shelf ==="read")}
                  onChangeShelf = {this.changeShelf}
                />                
              </div>
            </div>
            <div className="open-search">
              <Link className="open-search-link" to="/search">Add a book</Link>
            </div>
          </div>
        )}}/>
        <Route path="/search"  render={(history) => {
          return(
              <AddBooks
                onSearchBooks={this.searchBooks}
                onChangeShelf = {this.changeShelf}
                searchedBooks={this.state.searchedBooks}
              />
  
          )
        }} />
       

      </div>
    )
  }
}

export default BooksApp
