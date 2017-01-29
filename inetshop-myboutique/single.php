<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package inetshop-myboutique
 */

if( in_category('Events', $post ) ){
	include 'single-events.php';
}elseif (in_category('News', $post)){
	include 'single-news.php';
}
else {
	get_header(); ?>


	<?php
	//get_sidebar();
	get_footer();
}



