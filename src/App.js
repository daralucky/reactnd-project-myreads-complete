import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import OpenSearch from './OpenSearch'
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
            <OpenSearch/>
          </div>
        )}/>

        <Route exact path="/search" component={BookSearch}/>
      </div >
    )
  }
}

export default BooksApp
