<?php

function fetch_wp_plugins( $query = '' ) {
	$url = 'http://api.wordpress.org/plugins/info/1.0/';
	$fields = array(
		'action' => 'query_plugins',
		'request' => serialize( (object) array(
			'search'   => $query,
			'page'     => 1,
			'per_page' => 4,
		)),
	);

	// url-ify the data for the POST
	$fields_string = array();

	foreach ( $fields as $key => $value ) {
		$fields_string[] .= "{$key}={$value}";
	}

	$fields_string = implode( '&', $fields_string );

	// Open connection
	$ch = curl_init();

	// Set the url, number of POST vars, POST data
	curl_setopt( $ch, CURLOPT_URL, $url );
	curl_setopt( $ch, CURLOPT_POST, count( $fields ) );
	curl_setopt( $ch, CURLOPT_POSTFIELDS, $fields_string );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );

	// Execute post
	$result = curl_exec( $ch );

	// Close connection
	curl_close( $ch );

	$result = unserialize( $result );

	$numResults = count( $result->plugins );

	$json = '{';

	$i = 0;

	foreach ( $result->plugins as $result ) {
		$i++;

		$json .= '"' . $result->name . '": {"version": "' . $result->version . '", "slug": "' . $result->slug . '"}';

		if ( $i < $numResults ) {
			$json .= ',';
		}
	}

	$json .= '}';

	echo $json;
}
