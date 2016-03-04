/**
 * App
 */
import React from 'react'
import ReactDom from 'react-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PluginInput from './components/PluginInput.jsx'
import PluginList from './components/PluginList.jsx'
import ComposerFile from './components/ComposerFile.jsx'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			packagist: [],
			composerJson: require('../../default-composer.json')
		}
	}
	componentDidMount(){
		// We store 'this' since it can get confusing in nested AJAX calls
		var that = this;

		// Updates the WP Core version number to the latest
		$.ajax({
			type: 'GET',
			url: 'app.php?type=core',
			dataType: 'json',
			success: function(data) {
				this.state.composerJson.require['johnpbloch/wordpress'] = data.offers[0].current;
				this.setState({composerJson: this.state.composerJson});
			}.bind(this)
		});

		// Updates generic composer repos to the latest version number
		var composerRepos = this.state.composerJson.require;
		for (var repo in composerRepos) {
			if (repo.indexOf('overture') && repo.indexOf('wpackagist') && repo.indexOf('johnpbloch/wordpress')) {
				var repoName = repo;

				$.ajax({
					type: 'GET',
					url: 'https://api.github.com/repos/' + repo + '/tags',
					dataType: 'json',
					success: function(data) {
						var latestTag = data[0].name;
						composerRepos[repoName] = latestTag;
						that.setState({composerJson: that.state.composerJson});
					}
				});
			}
		}

		this.highlight();
	}
	componentDidUpdate(){
		// Reload Highlight.js syntax highlighting
		this.highlight();
	}
	highlight(){
		// Initialize Highlight.js syntax highlighting
		$('.result pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	}
	addItem(item, version) {
		// Add wp-packagist plugins to state
		this.state.composerJson.require['wpackagist-plugin/' + item] = version;
		this.setState({composerJson: this.state.composerJson});
	}
	removeItem(item) {
		// Remove plugins from state
		delete this.state.composerJson.require[item];
		this.setState({composerJson: this.state.composerJson});
	}
	render() {
		return (
				<div>
					<Header />
					<main className="panel-wrapper">
						<div className="panel panel--pad panel--flex">
							<h3>WP Packagist Plugins</h3>
							<PluginInput addItem={this.addItem.bind(this)} />
							<PluginList composerJson={this.state.composerJson} removeItem={this.removeItem.bind(this)} />
							<Footer />
						</div>
						<div className="panel">
							<ComposerFile composerJson={this.state.composerJson} />
						</div>
					</main>
				</div>
		)
	}
}

ReactDom.render(<App />, document.querySelector('.site-content'));
