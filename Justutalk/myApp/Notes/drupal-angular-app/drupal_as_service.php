<?php
/**
 * Created by PhpStorm.
 * User: temp
 * Date: 03/04/2015
 * Time: 01:26
 */

function myservice_menu()
{
	$items = array();

	$items['api/sessions'] = array(
		'title' => 'Session',
		'page callback' => 'myservice_api_session',
		'access callback' => TRUE
	);
	return $items;
}

function myservice_api_session(){
	$data = array();
	$data = db_select('node', 'node')
			->condition('type','session')
			->execute()
		->fetchAll();
	print drupal_json_encode($data);
	drupal_exit();
}








