import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookDetails extends Component
{
	static propTypes = {
		book: PropTypes.object.isRequired,
	}
	render() {
		const { book } = this.props
		return (
			<div
				className='book-details'
			>
				<div
					className="book-details-pic"
					style={{
						backgroundImage: `url(${book.PicURL})`
					}}
				></div>
				<div
					className="book-details-name"
				>
					{book.Name}
				</div>
				{book.Authors && book.Authors.length > 0 && book.Authors.map(x => (
					<div
						key={x}
						className="book-details-author"
					>
						{x}
					</div>
				))}
			</div>
		)
	}
}

export default BookDetails
