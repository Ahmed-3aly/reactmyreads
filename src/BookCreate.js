import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageInput from './ImageInput'

class BookCreate extends Component
{
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	}
	state = {
		Name: "",
		Author: "",
	}
	onName = (value) => {
		this.setState({
			Name: value
		})
	}
	onAuthor = (value) => {
		this.setState({
			Author: value
		})
	}
	invalid() {
		return this.state.Name.trim().length === 0;
	}
	onSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit({})
	}
	render() {
		const { Name, Author } = this.state
		return (
			<div
				className='book-create-page'
			>
				<form
					onSubmit={this.onSubmit}
					className='book-create-form'
				>
					<ImageInput
						className='book-create-pic'
						name='picURL'
						maxHeight={64}
					/>
					<input
						type='text'
						name='Name'
						placeholder='Name'
						value={Name}
						onChange={(e) => this.onName(e.target.value)}
						
					/>
					<input
						type='text'
						name='Author'
						placeholder='Author'
						value={Author}
						onChange={(e) => this.onAuthor(e.target.value)}
					/>
					<button
						disabled={this.invalid()}
					>Add Book</button>
				</form>
			</div>
		)
	}
}

export default BookCreate
