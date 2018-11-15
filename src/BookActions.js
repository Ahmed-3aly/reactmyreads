import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookActions extends Component
{
	static propTypes = {
		onMove: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired,
		shelves: PropTypes.array.isRequired,
	}
	onChange(shelfId) {
		const onMove = this.props.onMove
		const book = this.props.book
		onMove(book.Id, parseInt(shelfId))
	}
	render() {
		const { onMove, book, shelves } = this.props
		const shelfIds = shelves.map(x => x.Id)
		const shelfId = book.ShelfId
		//
        const shelfIdx = shelfIds.indexOf(shelfId)
		const noUp = shelfIdx === 0
		const idUp = noUp ? -1 : shelfIds[shelfIdx - 1];
		const noDown = shelfIdx === 2
		const idDown = noDown ? -1 : shelfIds[shelfIdx + 1];
		//
		const removeLink = '/remove/' + book.Id.toString()
		return (
			<ol
				className='book-actions'
			>
				<li
					key='ac1'
				>
					<div className="book-action-move" >
						<select
							onChange={(e) => this.onChange(e.target.value)}
							value={shelfId}
						>
							<option key="-1" value="-1" disabled>Move to...</option>
							{shelves.map(x => (
								<option
									key={x.Id}
									value={x.Id}
								>
									{x.Name}
								</option>
							))}
						</select>
					</div>
				</li>
				<Route
					exact path='/'
					render={() => (
						<li
							key='ac2'
						>
							<Link
								className="book-action-remove"
								to={removeLink}
							/>
						</li>
					)}
				/>
				<Route
					exact path='/'
					render={() => (
						<li
							key='ac3'
						>
							<button
								className="book-action-Up"
								disabled={noUp}
								onClick={() => onMove(book.Id, idUp)}
							></button>
						</li>
					)}
				/>
				<Route
					exact path='/'
					render={() => (
						<li
							key='ac4'
						>
							<button
								className="book-action-Down"
								disabled={noDown}
								onClick={() => onMove(book.Id, idDown)}
							></button>
						</li>
					)}
				/>
			</ol>
		)
	}
}

export default BookActions
