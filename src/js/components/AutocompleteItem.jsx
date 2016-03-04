/**
 * Autocomplete Item
 * A single autocomplete result
 */
import React from 'react'
import ReactDom from 'react-dom'

class AutocompleteItem extends React.Component {
	handleNav(event) {
		var currentItem = ReactDom.findDOMNode(this);

		switch (event.keyCode) {
			// Enter
			case 13:
				event.preventDefault();
				this.handleClick();
				$('.plugin-form button').focus();
				break;
			// Up arrow
			case 38:
				event.preventDefault();
				$(currentItem).prev('li').focus();
				break;
			// Down arrow
			case 40:
				event.preventDefault();
				$(currentItem).next('li').focus();
			break;
		}
	}
	handleClick() {
		this.props.populateFields(this.props.data.slug, this.props.data.version);
	}
	render() {
		return (
			<li tabIndex="0" onClick={this.handleClick.bind(this)} onKeyDown={this.handleNav.bind(this)} className="plugin-form__autocomplete__list-item">{this.props.name} | {this.props.data.version}</li>
		)
	}
}

export default AutocompleteItem;
