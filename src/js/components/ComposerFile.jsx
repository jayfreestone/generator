/**
 * Composer File
 * The generated composer file / preview
 */
import React from 'react'

class ComposerFile extends React.Component {
	saveData(data, fileName) {
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";

			var json = JSON.stringify(data, null, 2),
			blob = new Blob([json], {type: "octet/stream"}),
			url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = fileName;
			a.click();

		    setTimeout(function(){
				window.URL.revokeObjectURL(url);
			}, 100);
	}
	handleClick() {
		this.saveData(this.props.composerJson, 'composer.json');
	}
	render(){
		return (
			<div className="result">
				<pre>
					<code className="json">
						{JSON.stringify(this.props.composerJson, null, 2)}
					</code>
				</pre>
				<button className="icon-button result__download" onClick={this.handleClick.bind(this)}><img src="dist/img/icon-save.svg" width="20" /></button>
			</div>
		)
	}
}

export default ComposerFile;
