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

  changeBookShelf(bookAndShelf) {
    console.log("onChangeShelf | BookId:" + bookAndShelf.book.id + " New Shelf: " + bookAndShelf.newShelf)
    BooksAPI.update(bookAndShelf.book, bookAndShelf.newShelf).then(() => {
      this.getCurrentBooksOnShelves()
    })
  }

  searchBook(query) {
    console.log("query: " + query)
    BooksAPI.search(query).then((books) => {
      if (books.error) {
        console.log("Search Error: " + books.error)
        this.setState({ bookSearchResult: [] })
      } else {
        console.log("Search Result: " + books.length)
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
            onChangeShelf={(bookAndShelf) => { this.changeBookShelf(bookAndShelf) }}
          />

        )} />

        <Route exact path="/search" render={() => (
          <BookSearch
            myBooks={this.state.booksOnShelves}
            searchResult={this.state.bookSearchResult}
            onSearchBook={(query) => {
              this.searchBook(query)
            }}
            onChangeShelf={(bookAndShelf) => { this.changeBookShelf(bookAndShelf) }}
            onClearSearchResult={this.clearSearchResult}
          />
        )} />
      </div >
    )
  }
}

export default BooksApp
