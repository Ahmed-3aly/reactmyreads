import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import PropTypes from 'prop-types'
import BookShelfGrid from './BookShelfGrid.js'

class BookSearch extends Component
{
	static propTypes = {
		parser: PropTypes.func.isRequired,
		onMove: PropTypes.func.isRequired,
		shelves: PropTypes.array.isRequired,
	}
	state = {
		books: [],
		query: ''
	}
	onQuery = (v) => {
		this.setState({
			query: v
		})
		const query = this.state.query
		if (query.trim() === '') {
			this.setState({
				books: []
			})
			return;
		}
		BooksAPI.search(query).then((books) => {
			const parsed = this.props.parser(books)
			this.setState({
				books: parsed
			})
		})
	}	
	render() {
		const { books, query } = this.state
		const onMove = this.props.onMove
		const shelves = this.props.shelves
		return (
			<div>
				<div
					className='book-search-bar'
				>
					<Link
						className='book-back'
						to='/'
					></Link>
					<input
						className='book-search-input'
						type="text"
						placeholder="Search by title or author"
						value={query}
						onChange={(event) => this.onQuery(event.target.value)}
					/>
				</div>
				<div
					className='book-search-margin'
				></div>
				<BookShelfGrid
					onMove={onMove}
					books={books}
					shelves={shelves}
				/>
			</div>
		)
	}
}

export default BookSearch
