import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    searchResultBooks: [],
    myBooksOnShelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooksOnShelves: books })
      console.log(this.state.myBooksOnShelves)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
             <ListBooks
              myBooks={this.state.myBooksOnShelves}
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
