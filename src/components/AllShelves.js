import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class AllShelves extends Component {
    state = {

    }

    componentDidMount = () => {
        this.props.onRefresh();
    }

    // categorizing books to the shelves
    update = () => {
        const currently = {
            shelfName: "Currently Reading",
            books: this.props.books.filter( (book) => book.shelf === "currentlyReading")
        };

        const wantTo = {
            shelfName: "Want To Read",
            books: this.props.books.filter( (book) => book.shelf === "wantToRead")
        };

        const read = {
            shelfName: "Read",
            books: this.props.books.filter( (book) => book.shelf === "read")
        };

        return ([currently, wantTo, read]);
    }

    render() {
        let allShelves = [];
        if (this.props.books && this.props.books.length)
            allShelves = this.update();

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {allShelves && allShelves.map( (shelf, idx) => (<BookShelf
                        key={idx}
                        shelf={shelf}
                        onSwitchShelf={this.props.onSwitchShelf}
                    />))}
                </div>
                <div className="open-search">
                    <Link to='/search'>
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default AllShelves;