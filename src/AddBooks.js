import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


class AddBooks extends Component{
    static propTypes = {
        onSearchBooks: PropTypes.func.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        searchedBooks: PropTypes.array.isRequired
    }

    constructor(props){
        super(props);
        this.state = {query:''};
        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery = (query) => {
        console.log('updatequery', query)
        this.setState({query: query});
        this.props.onSearchBooks(query,5);
    }
    
    
    render() {
        console.log(this.props.searchedBooks);
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                      />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchedBooks.map((book)=>
                            <li key={book.id}>
                                <Book 
                                    book = {book}
                                    onChangeShelf= {this.props.onChangeShelf}
                                />
                            </li>
                        )}                       
                    </ol>
                </div>
            </div>
        )
    }
}

export default AddBooks