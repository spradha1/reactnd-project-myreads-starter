import React, {Component} from 'react'

class Updater extends Component {
    state = {
        currentShelf: this.props.book.shelf || "None"
    }

    switchShelf = (book, shelf) => {
        this.setState({ currentShelf: shelf});
        this.props.onSwitchShelf(book, shelf);
    }

    componentWillReceiveProps = (props) => {
        this.props = props;
        this.setState({currentShelf: this.props.book.shelf});
    }

    render () {
        return (
            <div className="book-shelf-changer">
                <select
                    value={this.state.currentShelf} 
                    onChange={(event) => this.switchShelf(this.props.book, event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default Updater;