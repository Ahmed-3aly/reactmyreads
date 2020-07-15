import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import BookCreate from './BookCreate.js'
import BookDelete from './BookDelete.js'
import BookSearch from './BookSearch.js'
import BookGrid from './BookGrid.js'

const Shelves = [
	{
		Id: 1,
		Name: 'Currently Reading',
		ShortName: 'currentlyReading',
	},
	{
		Id: 2,
		Name: 'Want To Read',
		ShortName: 'wantToRead',
	},
	{
		Id: 3,
		Name: 'Read',
		ShortName: 'read',
	},
	{
		Id: 0,
		Name: 'None',
		ShortName: 'none',
	},
];

class App extends Component {
	state = {
		books: [],
	}
	refresh() {
		BooksAPI.getAll().then((books) => {
			const parsed = this.mapBooks(books)
			this.setState({
				books: parsed
			})
		})
	}
    onMove = (bookId, shelfId) => {
        const { books } = this.state
        const appendBook = books.find(x => x.Id === bookId)
        if (appendBook) {
            const appendState = books.filter(x => x.Id !== bookId)
            appendBook.ShelfId = shelfId
            appendState.push(appendBook)
            this.setState({
                books: appendState
            })
        }
        //
		const shelf = Shelves.find(x => x.Id === shelfId)
		const book = {
			id: bookId
		}
		BooksAPI.update(book, shelf.ShortName).then(() => this.refresh())
	}
    onRemove = (bookId) => {
        this.onMove(bookId, 0)
	}
	appendBook = (book) => {
		alert('BooksAPI does not support adding')
	}
	mapBooks(books, cache) {
		if (!books) {
			return []
		}
		try {
			const result = books.map(x => {
				var picLink = ""
				var shelfId = 0;
				if (x.shelf) {
					var shelf = Shelves.find(y => y.ShortName.toLowerCase() === x.shelf.toLowerCase())
					if (shelf) {
						shelfId = shelf.Id
					}
				}
				else if (cache) {
					const found = cache.find(y => y.Id === x.id)
					if (found) {
						shelfId = found.ShelfId
					}
				}
				if (x.imageLinks) {
					if (x.imageLinks.thumbnail) {
						picLink = x.imageLinks.thumbnail
					}
					else if (x.imageLinks.smallthumbnail) {
						picLink = x.imageLinks.smallthumbnail
					}
				}
				return {
					Id: x.id,
					Name: x.title,
					ShelfId: shelfId,
					PicURL: picLink,
					Authors: x.authors,
				}
			})
			return result
		}
		catch(e) { return [] }
	}
	componentDidMount() {
		this.refresh()
	}
	render() {
		const { books } = this.state
		return (
			<div>
				<Route exact path='/' render={() => (
					<div>
						<div className="books-header" >
							<h1>My Reads</h1>
							<Link
								className="book-header-button book-header-search"
								to='/search'
							></Link>
							<Link
								className="book-header-button book-header-add"
								to='/create'
							></Link>
						</div>
						<div
							className='book-app'
						>
							<BookGrid
								onMove={this.onMove}
								books={books}
								shelves={Shelves}
							/>
						</div>
					</div>
				)} />
				<Route
					path='/create'
					render={({history}) => (
						<BookCreate
							onSubmit={(data) => {
								history.push('/')
								this.appendBook(data)
							}}
						/>
					)}
				/>
				<Route
					path='/search'
					render={({history}) => (
						<BookSearch
							cache={books}
							parser={this.mapBooks}
							onMove={this.onMove}
							shelves={Shelves}
						/>
					)}
				/>
				<Route
					path='/remove/:bookId'
					render={({history}) => (
						<BookDelete
							books={books}
							onCancel={(data) => {
								history.push('/')
							}}
							onConfirm={(data) => {
								this.onRemove(data)
								history.push('/')
							}}
						/>
					)}
				/>
			</div>
		);
	}
}

export default App;
