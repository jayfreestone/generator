/**
 * Plugin List Item
 * A single item/dependency in the Plugin List
 */
import React from 'react'

class PluginListItem extends React.Component {
	handleClick() {
		this.props.removeRequire(this.refs.name.innerHTML);
	}
	render() {
		return (
			<li className="plugin-list__item">
				<button className="icon-button" onClick={this.handleClick.bind(this)}>
					<img src="dist/img/icon-delete.svg" width="20" />
				</button>
				<span ref="name">{this.props.dependency}</span>
			</li>
		)
	}
}

export default PluginListItem;
