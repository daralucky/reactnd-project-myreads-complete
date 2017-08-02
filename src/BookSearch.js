import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'

class BookSearch extends Component {
    static propTypes = {
        onGetBookShelf: PropTypes.func.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        bookSearchResult: []
    }

    updateQuery = (query) => {
        this.setState({ query })
        if (query) {
            this.searchBook(query)
        }
    }

    searchBook(query) {
        //console.log("query: " + query)
        BooksAPI.search(query).then((books) => {
            if (books.error) {
                //console.log("Search Error: " + books.error)
                this.setState({ bookSearchResult: [] })
            } else {
                //console.log("Search Result: " + books.length)
                //console.log("raw result: " + JSON.stringify(books))
                this.setState({ bookSearchResult: books.sort(sortBy('title')) })
            }
        })
    }

    render() {

        const { query, bookSearchResult } = this.state
        const { onChangeShelf, onGetBookShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid
                        books={bookSearchResult}
                        isCheckShelf={true}
                        onGetBookShelf={(bookId) => onGetBookShelf(bookId)}
                        onChangeShelf={(bookAndShelf) => { onChangeShelf(bookAndShelf) }}
                    />
                </div>
            </div>
        )
    }
}

export default BookSearch