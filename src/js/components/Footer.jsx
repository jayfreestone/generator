/**
 * Footer
 */
import React from 'react'

class Footer extends React.Component {
	render() {
		return (
			<footer className="site-footer">
				This small tool eases the creation of new WordPress projects built using <a target="_blank" href="https://getcomposer.org/">Composer</a> (and <a target="_blank" href="https://wpackagist.org/">WordPress Packagist</a> for dependencies). Unlike WordPress Packagist, plugins can be queried by their name (and not just slug), making it easy to quickly build out the composer file for a new project.
			</footer>
		)
	}
}

export default Footer;
