import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component {
    state = {

    }

    render () {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelf.shelfName}</h2>
                <div className="bookshelf-books">
                    <ul className="books-grid">
                    {this.props.shelf.books.map( (book) => (
                        <li key={book.id}>
                            <Book 
                                book={book}
                                onSwitchShelf={this.props.onSwitchShelf} />
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default BookShelf;