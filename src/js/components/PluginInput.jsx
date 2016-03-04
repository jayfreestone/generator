/**
 * Plugin Input
 * The form that allows a new plugin to be added
 */
import React from 'react'
import AutocompleteItem from './AutocompleteItem.jsx'

class PluginInput extends React.Component {
	constructor() {
		super();
		this.state = {
			searchResults: [],
			autocompleteIsOpen: false
		}
	}
	handleSubmit(event) {
		event.preventDefault();
		this.props.addItem(this.refs.plugin.value, this.refs.version.value);
		this.refs.plugin.value = '';
		this.refs.version.value = '';
	}
	handleNav(event) {
		switch (event.keyCode) {
			// Up arrow
			case 38:
				event.preventDefault();
				break;
			// Down arrow
			case 40:
				event.preventDefault();
				$('.plugin-form__autocomplete li:first-child').focus();
				break;
		}
	}
	fetchData() {
		var inputValue = this.refs.plugin.value;

		if (inputValue.length > 2 ) {
			$.ajax({
				type: 'GET',
				url: 'app.php?type=search',
				data: 'search=' + inputValue,
				dataType: 'json',
				success: function(data) {
					this.setState({searchResults: data});
					this.setState({autocompleteIsOpen: true});
				}.bind(this)
			});
		} else {
			this.setState({searchResults: ''});
			this.setState({autocompleteIsOpen: false});
		}
	}
	populateFields(slug, version) {
		this.refs.plugin.value = slug;
		this.refs.version.value = version;
		this.setState({autocompleteIsOpen: false});
		console.log('populatin');
	}
	resetFocus() {
		$('.plugin-form .plugin-form__group:first-child input').focus();
	}
	render() {
		return (
			<form className="plugin-form" onSubmit={this.handleSubmit.bind(this)}>
				<div className="plugin-form__group">
					<label>Plugin Name</label>
					<input required onChange={this.fetchData.bind(this)} onKeyDown={this.handleNav} ref="plugin" type="text" placeholder="Yoast SEO" />

					<div className={this.state.autocompleteIsOpen ? "plugin-form__autocomplete plugin-form__autocomplete--is-open" : "plugin-form__autocomplete"}>
						<ul>
							{Object.keys(this.state.searchResults).map(function(plugin, index){
								return ( <AutocompleteItem populateFields={this.populateFields.bind(this)} key={index} name={plugin} data={this.state.searchResults[plugin]} /> );
							}.bind(this))}
						</ul>
					</div>
				</div>

				<div className="plugin-form__group">
					<label>Version</label>
					<input ref="version" type="text" placeholder="*" />
				</div>

				<button onClick={this.resetFocus} onKeyDown={this.resetFocus}>Add Plugin</button>
			</form>
		)
	}
}

export default PluginInput;
