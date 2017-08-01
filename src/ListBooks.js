import React from 'react'
import PropTypes from 'prop-types'
import OpenSearch from './OpenSearch'
import BooksGrid from './BooksGrid'

const ListBooks = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <BooksGrid
                                isCheckShelf={false}
                                books={props.myBooks.filter(book => book.shelf === "currentlyReading")}
                                onChangeShelf={(bookAndShelf) => props.onChangeShelf(bookAndShelf)}
                            />
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <BooksGrid
                                isCheckShelf={false}
                                books={props.myBooks.filter(book => book.shelf === "wantToRead")}
                                onChangeShelf={(bookAndShelf) => props.onChangeShelf(bookAndShelf)}
                            />
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <BooksGrid
                                isCheckShelf={false}
                                books={props.myBooks.filter(book => book.shelf === "read")}
                                onChangeShelf={(bookAndShelf) => {props.onChangeShelf(bookAndShelf)} }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <OpenSearch />
        </div>
    )
}

ListBooks.propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default ListBooks