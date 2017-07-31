import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'
//import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'


class BookSearch extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query })
        if (query) {
            this.props.onSearchBook(query)
        }
    }

    /*
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
    */

    render() {

        const { query } = this.state
        const { searchResult, onChangeShelf, onClearSearchResult, myBooks } = this.props


        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link to="/" className="close-search" onClick={onClearSearchResult}>Close</Link>
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

                    {JSON.stringify("query: " + query)}
                    {
                        JSON.stringify(" Result: " + searchResult.length)
                    }

                    <BooksGrid
                        myBooks={myBooks}
                        books={searchResult}
                        onChangeShelf={(bookAndShelf) => { onChangeShelf(bookAndShelf) }}
                    />
                </div>
            </div>
        )
    }
}

export default BookSearch