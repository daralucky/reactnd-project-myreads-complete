import React from 'react'
import PropTypes from 'prop-types'

const getAuthorsInRightFormat = (authors) => {
    if (Array.isArray(authors)) {
        return authors.join(", ")
    }
    return authors
}

const getBookShelf = (myBooks, book) => {
    let matchBook = myBooks.filter(b => b.id === book.id)

    if (matchBook.length === 1) {
        console.log("getBookShelf MATCH | id:" + book.id + ", title: " + matchBook[0].title + ", shelf: " + matchBook[0].shelf)
        return matchBook[0].shelf
    } else {
        return book.shelf
    }
}

const BooksGrid = (props) => {
    return (
        <ol className="books-grid">
            {props.books.map((book, index) => (
                <li key={index}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover"
                                style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks && (
                                        book.imageLinks.thumbnail
                                    )})`
                                }}>
                            </div>
                            <div className="book-shelf-changer">
                                <select
                                    value={getBookShelf(props.myBooks, book)}
                                    onChange={(event) => props.onChangeShelf({ book: book, newShelf: event.target.value })}
                                >
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                            {
                                getAuthorsInRightFormat(book.authors)
                            }
                        </div>
                    </div>
                </li>
            ))
            }
        </ol>

    )
}

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}




export default BooksGrid