import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'


class BookSearch extends Component {
    state = {
        myStateBooks: [],
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query })
    }


    searchBook() {
        if (this.state.query) {
            BooksAPI.search(this.state.query, 20).then((books) => {
                this.setState({ myStateBooks: books })
                console.log(books)
            })
        } else {
            this.setState({ myStateBooks: []})
        }

    }


    render() {

        const { query } = this.state



        if (query) {
            this.searchBook()

        }


        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {JSON.stringify("query: " + query)}
                    {JSON.stringify(" myStateBooks: " + this.state.myStateBooks)}
                    <ol className="books-grid">
                        {this.state.myStateBooks.length !== 0 && (this.state.myStateBooks.map(book => (
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
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors.join(", ")}</div>
                                </div>
                            </li>
                        ))
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch