import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'

class BookSearch extends Component {
    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        searchResult: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        onClearSearchResult: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query })
        if (query) {
            this.props.onSearchBook(query)
        }
    }

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
                    {JSON.stringify(" Result: " + searchResult.length)}
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