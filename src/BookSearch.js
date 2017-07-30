import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'


class BookSearch extends Component {
    state = {
        allBooks: []
    }


    componentDidMount() {
        BooksAPI.search('Web Development', 1).then((books) => {
            this.setState({ allBooks: books })
            //console.log(books)
        })
    }

    render() {
        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.allBooks.map(book => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">${book.title}</div>
                                <div className="book-authors">{book.authors.join(", ")}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default BookSearch