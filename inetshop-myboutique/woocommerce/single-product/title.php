<?php
/**
 * Single Product title
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/title.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see        https://docs.woocommerce.com/document/template-structure/
 * @author     WooThemes
 * @package    WooCommerce/Templates
 * @version    1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
global $post, $product;
$cat_count = sizeof( get_the_terms( $post->ID, 'product_cat' ) );

the_title( '<h1 itemprop="name" class="product-title-alt-font">', '</h1>' );
echo $product->get_categories( ', ', '<h3 class="product-type-heading product-type-alt-font">' . _n( '', '', $cat_count, 'woocommerce' ) . ' ', '</h3>' );
