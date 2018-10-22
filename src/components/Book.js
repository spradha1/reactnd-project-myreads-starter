import React, {Component} from 'react'
import Updater from './Updater'

class Book extends Component {
    state = {
        currentShelf: this.props.book.shelf || "None"
    }

    render () {
        // getting only existent authors and url
        const authors = this.props.book.authors && this.props.book.authors.join(", ");
        const url = this.props.book.imageLinks && `url(${this.props.book.imageLinks.thumbnail})`;

        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={
                  {
                      width: 128,
                      height: 193,
                      backgroundImage: url
                  }
                }>
                </div>
                <Updater book={this.props.book} onSwitchShelf={this.props.onSwitchShelf}/>
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">{authors}</div>
            </div>
        )    
    }
}

export default Book;