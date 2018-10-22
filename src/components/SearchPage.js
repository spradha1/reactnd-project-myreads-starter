import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchPage extends Component {

    searchDelay = null;

    state = {
        query: '',
        searchedBooks: []
    }

    componentWillReceiveProps = (props) => {
        this.props = props;
        let correctedSearchList = this.setShelfInfo(this.props.books, this.state.searchedBooks);
        this.setState({ searchedBooks: correctedSearchList});
    }

    setShelfInfo = (booksOnShelf, searchedBooks) => {
        const hashTable = {};
        booksOnShelf.forEach( book => hashTable[book.id] = book.shelf);
        searchedBooks.forEach( book => {
            book.shelf = hashTable[book.id] || "none";
        });
        return searchedBooks;
    }

    updateQuery = (text) => {
        clearTimeout(this.searchDelay);
        this.setState({ query: text });
        this.searchDelay = setTimeout(this.search, 225);
    }

    search = () => {
        if (this.state.query === '') {
            this.setState({searchedBooks: []});
            return;
        }

        BooksAPI.search(this.state.query).then( (response) => {
            let searchedList = [];
            if (response && response.length) {
                searchedList = this.setShelfInfo(this.props.books, response);             
            }
            this.setState({ searchedBooks: searchedList});
        });
    }

    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            onChange={event => this.updateQuery(event.target.value)}
                            value={this.state.query.value} />
                    </div>
                </div>                
                <div className="search-books-results">
                    {!this.state.searchedBooks.length ? (
                        <p>No matches</p>
                    ) : (
                        <ol className="books-grid">
                            {this.state.searchedBooks && this.state.searchedBooks.map( (book) => (
                                <li key={book.id}>
                                    <Book 
                                        book={book}
                                        onSwitchShelf={this.props.onSwitchShelf} />
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchPage;