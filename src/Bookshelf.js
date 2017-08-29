import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        selectedBooks: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }
    
  
    render() {
        console.log(this.props.title, this.props.selectedBooks)
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.selectedBooks.map((book)=>
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

export default Bookshelf