<?php

/**
 * Declaration  woocommerce
 */

    add_theme_support( 'woocommerce' );



/*
 * Hooks woocommers
 * */

/*
======================================================
Removes the "shop" title on the main shop page
======================================================
*/

function woo_hide_page_title() {

    return false;

}
add_filter( 'woocommerce_show_page_title' , 'woo_hide_page_title' );



/*
 * content-product.php do_action( 'woocommerce_shop_loop_item_title' );
 * */

remove_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title');
add_action('woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title');


function woocommerce_template_loop_product_title() {


    global $post;
    $terms = get_the_terms( $post->ID, 'product_cat' );
    $nterms = get_the_terms( $post->ID, 'product_tag'  );
    foreach ($terms  as $term  ) {
        $product_cat_id = $term->term_id;
        $product_cat_name = $term->name;
        break;
    }
    echo '<p class="grid-link__title">' . get_the_title().'</p><p class="grid-link__type">'. $product_cat_name . '</p>';

}


/*
 * content-product.php add display category;
 * */
remove_action('woocommerce_shop_loop_item_category', 'woocommerce_template_loop_product_category', 10);

    /*
     * content-product.php add close after link block;
     * */


    remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
    add_action( 'woocommerce_before_shop_loop_item', 'template_loop_product_link_open', 10 );
    function template_loop_product_link_open(){
        echo '<a href="' . esc_url(get_the_permalink()) . '" class="grid-link woocommerce-LoopProduct-link">';
    }



    remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_close', 10 );
    remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_open', 5 );
    remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_category_link_close', 5 );

    remove_action	( 'woocommerce_after_shop_loop_item_title' , 'woocommerce_template_loop_rating',5) ;
    remove_action	( 'woocommerce_after_shop_loop_item_title' , 'woocommerce_template_loop_price',10) ;

    remove_action( 'woocommerce_after_shop_loop_item' , 'woocommerce_template_loop_add_to_cart', 10);


/*
 * Pagination
 *
 * */
/* Add to functions.php */
// If using Canvas: Replace WooCanvas Default Pagination with WooCommerce Pagination
add_action('init','alter_woo_hooks');

function alter_woo_hooks() {
    remove_action( 'woocommerce_after_main_content', 'canvas_commerce_pagination', 01, 0 );
}
add_action( 'woocommerce_pagination', 'woocommerce_pagination', 1 );
//add_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination', 1 );
// View All - Change No. Products to display
add_filter('loop_shop_per_page', 'wg_view_all_products', 20);

function wg_view_all_products($cols){
    if($_GET['view'] === 'all'){
        return '999';
    }

    else {
        return '3';
    }
}


/*
 * woocommerce content-single-product.php
 * */

/**
 * woocommerce_single_product_summary hook.
 *
 * @hooked woocommerce_template_single_title - 5
 * @hooked woocommerce_template_single_rating - 10
 * @hooked woocommerce_template_single_price - 10
 * @hooked woocommerce_template_single_excerpt - 20
 * @hooked woocommerce_template_single_add_to_cart - 30
 * @hooked woocommerce_template_single_meta - 40
 * @hooked woocommerce_template_single_sharing - 50
 */
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price' , 10 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt' , 20 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price' , 20 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt' , 10 );




?>