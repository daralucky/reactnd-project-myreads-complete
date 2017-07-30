import React, { Component } from 'react'
import { Route } from 'react-router-dom'
//import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <h1>Book List</h1>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )} />

        <Route exact path="/search" component={BookSearch} />

      </div >
    )
  }
}

export default BooksApp
