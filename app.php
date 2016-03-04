<?php

require_once 'includes/fetch-wp-plugins.php';
require_once 'includes/api-connect.php';

$type = isset( $_GET['type'] ) ? $_GET['type'] : '';

switch ( $type ) {
	// Gets latest version details of WordPress
	case 'core':
		$url = 'http://api.wordpress.org/core/version-check/1.7/';
		header( 'Content-type: application/json' );
		echo api_connect( $url );
		break;

	// Searches WordPress Plugins API
	case 'search':
		header( 'Content-type: application/json' );
		fetch_wp_plugins( $_GET['search'] );
		break;
}
