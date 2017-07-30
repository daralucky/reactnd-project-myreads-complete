import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    searchResultBooks: [],
    booksOnShelves: []
  }

  componentDidMount() {
    this.getCurrentBooksOnShelves()
  }

  getCurrentBooksOnShelves() {
    BooksAPI.getAll().then((books) => {
      this.setState({ booksOnShelves: books })
      //console.log(this.state.booksOnShelves)
    })
  }

  changeBookShelf(bookAndShelf) {
    //console.log("onChangeShelf | BookId:" + bookAndShelf.book.id + " New Shelf: " + bookAndShelf.newShelf)
    BooksAPI.update(bookAndShelf.book, bookAndShelf.newShelf).then((book) => {
      this.getCurrentBooksOnShelves()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            myBooks={this.state.booksOnShelves}
            onChangeShelf={(bookAndShelf) => { this.changeBookShelf(bookAndShelf) }}
          />

        )} />

        <Route exact path="/search" render={() => (
          <BookSearch
            searchResultBooks={this.state.searchResultBooks}
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
          />
        )} />
      </div >
    )
  }
}

export default BooksApp
