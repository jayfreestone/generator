/**
 * Header
 */
import React from 'react'

class Header extends React.Component {
	render() {
		return (
			<header className="site-header">
				<h1>WordPress Composer Generator</h1>
				<a href="https://github.com/jayfreestone/generator" target="_blank">
					<img width="30" src="dist/img/icon-github.svg" alt="Github Logo" />
				</a>
			</header>
		)
	}
}

export default Header;
