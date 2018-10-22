import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import './App.css'
import AllShelves from './components/AllShelves'
import SearchPage from './components/SearchPage'

class BooksApp extends React.Component {
  state = {

  }

  componentDidMount = () => {
    this.refresh();
  }

  // getting all the books on the shelves in case of changes
  refresh = () => {
    BooksAPI.getAll().then( (allBooks) => {
      this.setState({
        books: allBooks
      });
    });
  }

  // function to change shelves
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

  // renders either main or search page
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