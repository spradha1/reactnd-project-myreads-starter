import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import './App.css'
import AllShelves from './components/AllShelves'
import SearchPage from './components/SearchPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  }

  componentDidMount = () => {
    this.refresh();
  }

  refresh = () => {
    BooksAPI.getAll().then( (allBooks) => {
      this.setState({
        books: allBooks
      });
    });
  }

  switchShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then( (response) => {
      let updatedBooks = this.state.books.slice(0);
      const found = updatedBooks.filter( (entry) => book.id === entry.id);

      if (found.length) {
        book.shelf = shelf;
      }
      else {
        updatedBooks.push(book);
      }
      this.setState({
        books: updatedBooks
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route 
          exact path='/'
          render={(() => (
            <AllShelves books={this.state.books} onRefresh={this.refresh} onSwitchShelf={this.switchShelf} />
          ))} />
        
        <Route
          path='/search'
          render={(() => (
            <SearchPage books={this.state.books} onSwitchShelf={this.switchShelf} />
          ))} />
      </div>
    ) 
  }
}

export default BooksApp;