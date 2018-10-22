# MyReads Project

This my project for Udacity's "MyReads" project for Front-End Web Development Nanodegree program. I used the starter template provided by the course.

## Instructions

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Working
The App.js file is the main root whose state holds the shelved books, and the shelf changing mechanism as the 'switchShelf' method. The navigation is handled by routes between the main and the search pages.  

The AllShelves component is nested within the main app that loops three shelves, which is the BookShelf component. Each of those components loop through the books as single Book components. The books are passed down as props all the way from the main component. And, finally the Updater component rests inside each Book, listening for the changes in the shelves.  

The SearchPage uses the 'search' method which in turn uses the BooksApi's search method to get the valid books. For every successful search, the searched set of books are assigned "none" as their shelf is not present in the shelf already and displays a message, in case no books were found. The search function is delayed for 225 ms after query is stopped being typed into the search bar.  

## Contribution
Any feedback regarding the code will glady be acknowledged.