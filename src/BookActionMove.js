import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookActionMove extends Component
{
    static propTypes = {
        selectedShelfId: PropTypes.number.isRequired,
        shelf: PropTypes.object.isRequired,
	}
    render() {
        const { selectedShelfId, shelf } = this.props
        if (shelf.Id === selectedShelfId) {
            return (
                <option
                    key={shelf.Id}
                    value={shelf.Id}
                    disabled
                >
                    {shelf.Name}
                </option>
            )
        }
        return (
            <option
                key={shelf.Id}
                value={shelf.Id}
            >
                {shelf.Name}
            </option>
        )
	}
}

export default BookActionMove
