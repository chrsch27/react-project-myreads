import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
        this.state = {value: (this.props.book.shelf? this.props.book.shelf: "none") };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const newShelf=event.target.value;
        this.setState({value: newShelf});
        this.props.onChangeShelf(this.props.book,newShelf);
    }
    
    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ (this.props.book.imageLinks? this.props.book.imageLinks.thumbnail: "https://books.google.com/googlebooks/images/no_cover_thumb.gif")  +')' }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={this.state.value} onChange={this.handleChange}>
                    <option value="moveTo" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                {(this.props.book.authors?
                    this.props.book.authors.map((a,index)=>
                        <div key={index} className="book-authors">{a}</div>
                   ) : <div key="0" className="book-authors">NN</div> )}
            </div>

        )
    }
}

export default Book