/**
 * Plugin List
 * The list of currently enabled Composer dependencies/plugins
 */
import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import PluginListItem from './PluginListItem.jsx';

class PluginList extends React.Component {
	render() {
		// The 'require' part of the composer.json file, where the plugins are listed
		var require = this.props.composerJson.require;

		return (
			<div className="plugin-list">
				<h3>Current</h3>
				<ul>
					<ReactCSSTransitionGroup transitionName="remove" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
						{Object.keys(require).map(function(dependency, i){
							return <PluginListItem key={dependency} dependency={dependency} removeRequire={this.props.removeItem} />;
						}.bind(this))}
					</ReactCSSTransitionGroup>
				</ul>
			</div>
		)
	}

}

export default PluginList;
