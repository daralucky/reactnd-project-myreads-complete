import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    bookSearchResult: [],
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

  updateBookShelf(bookAndShelf) {
    //console.log("onChangeShelf | BookId:" + bookAndShelf.book.id + " New Shelf: " + bookAndShelf.newShelf)
    BooksAPI.update(bookAndShelf.book, bookAndShelf.newShelf).then(() => {
      this.getCurrentBooksOnShelves()
    })
  }

  getBookShelf(bookId) {
    let myShelf = this.state.booksOnShelves.filter(book => book.id === bookId).map(book => book.shelf).toString()
    return myShelf ? myShelf : "none"
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
        this.setState({ bookSearchResult: books })
      }
    })
  }

  clearSearchResult() {
    this.setState({ bookSearchResult: [] })
  }

  render() {
    return (
      <div className="app" >
        <Route exact path="/" render={() => (
          <ListBooks
            myBooks={this.state.booksOnShelves}
            onChangeShelf={(bookAndShelf) => { this.updateBookShelf(bookAndShelf) }}
          />

        )} />

        <Route exact path="/search" render={() => (
          <BookSearch
            onGetBookShelf={(bookId) => this.getBookShelf(bookId)}
            searchResult={this.state.bookSearchResult}
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
            onChangeShelf={(bookAndShelf) => { this.updateBookShelf(bookAndShelf) }}
            onClearSearchResult={this.clearSearchResult}
          />
        )} />
      </div >
    )
  }
}

export default BooksApp
