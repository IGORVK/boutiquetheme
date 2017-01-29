<?php
/**
 * inetshop-myboutique functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package inetshop-myboutique
 */



remove_action( 'wp_head', 'feed_links_extra', 3 ); // ссылки доп. фидов (на рубрики)
remove_action( 'wp_head', 'feed_links',       2 ); // ссылки фидов (основные фиды)
// <link rel="EditURI" type="application/rsd+xml" title="RSD" href="http://site.ru/xmlrpc.php?rsd" /> для публикации статей через сторонние сервисы
remove_action( 'wp_head', 'rsd_link'            );
// <link rel="wlwmanifest" type="application/wlwmanifest+xml" href="http://site.ru/wp-includes/wlwmanifest.xml" /> . Используется клиентом Windows Live Writer.
remove_action( 'wp_head', 'wlwmanifest_link'    );
//remove_action( 'wp_head', 'index_rel_link'      ); // не поддерживается с версии 3.3

add_filter('the_generator', '__return_empty_string'); // Убираем версию WordPress

// 3.0
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 ); // Ссылки на соседние статьи (<link rel='next'... <link rel='prev'...)
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10 );// Короткая ссылка - без ЧПУ <link rel='shortlink'

// 4.6
remove_action( 'wp_head', 'wp_resource_hints', 2); // Prints resource hints to browsers for pre-fetching, pre-rendering and pre-connecting to web sites.

//remove version wp from links
function wp_version_js_css($src) {
	if (strpos($src, 'ver=' . get_bloginfo('version')))
		$src = remove_query_arg('ver', $src);
	return $src;
}
add_filter('style_loader_src', 'wp_version_js_css', 9999);
add_filter('script_loader_src', 'wp_version_js_css', 9999);






if ( ! function_exists( 'inetshop_myboutique_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function inetshop_myboutique_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on inetshop-myboutique, use a find and replace
	 * to change 'inetshop-myboutique' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'inetshop-myboutique', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'inetshop_myboutique_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'inetshop_myboutique_setup' );



/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function inetshop_myboutique_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'inetshop_myboutique_content_width', 640 );
}
add_action( 'after_setup_theme', 'inetshop_myboutique_content_width', 0 );


/*
     ===================================
        Sidebar functions
     ===================================
 */
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function inetshop_myboutique_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'inetshop-myboutique' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'inetshop-myboutique' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'inetshop_myboutique_widgets_init' );


/*
     ===================================
        Include scripts
     ===================================
 */
function inetshop_myboutique_scripts() {
    //css
	wp_enqueue_style( 'inetshop-myboutique-style', get_stylesheet_uri() );

    //js
	wp_enqueue_script( 'inetshop-myboutique-navigation', get_template_directory_uri() . '/js/navigation.js', array(),'1.0.0', true );
	wp_enqueue_script( 'inetshop-myboutique-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(),'1.0.0', true );
	wp_deregister_script( 'jquery' );
	wp_register_script( 'jquery', get_template_directory_uri() . '/js/jquery.min.js',array(),'1.12.4', true );
	wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'inetshop-myboutique-js', get_template_directory_uri() . '/js/inetshop-myboutique.js',array('jquery'),'1.0.0', true );
    wp_enqueue_script( 'inetshop-myboutique-flexslider-js', get_template_directory_uri() . '/js/jquery.flexslider.min.js',array('jquery'),'2.2.2', true );
    wp_enqueue_script( 'inetshop-myboutique-slider-js', get_template_directory_uri() . '/js/slider.js',array('jquery'),'2.2.2', true );
    wp_enqueue_script( 'inetshop-myboutique-theme-js', get_template_directory_uri() . '/js/theme.js',array('jquery'),'1.5.1', true );


	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'inetshop_myboutique_scripts' );


/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';


/*
     ===================================
        Add function excerpt for Pages
     ===================================
*/
function add_excerpt_page(){
    add_post_type_support( 'page', 'excerpt' );
}
add_action('init', 'add_excerpt_page');


/*
     ===================================
        Add Visual Editor for excerpt
     ===================================
*/
function wph_create_excerpt_box() {
    global $post;
    $id = 'excerpt';
    $excerpt = wph_get_excerpt($post->ID);
    wp_editor($excerpt, $id);
}

function wph_get_excerpt($id) {
    global $wpdb;
    $row = $wpdb->get_row("SELECT post_excerpt FROM $wpdb->posts WHERE id = $id");
    return $row->post_excerpt;
}

function wph_replace_excerpt() {
    foreach (array("post", "page") as $type) {
        remove_meta_box('postexcerpt', $type, 'normal');
        add_meta_box('postexcerpt', __('Excerpt'), 'wph_create_excerpt_box', $type, 'normal');
    }
}
add_action('admin_init', 'wph_replace_excerpt');



/*
     ============================================
        Remove word "Category:" in archive.php
     ============================================
*/
add_filter( 'get_the_archive_title', function ($title) {

    if ( is_category() ) {

        $title = single_cat_title( '', false );

    } elseif ( is_tag() ) {

        $title = single_tag_title( '', false );

    } elseif ( is_author() ) {

        $title = '<span class="vcard">' . get_the_author() . '</span>' ;

    }

    return $title;

});


/*
     =============================================================
        Add specific image size for content.php and archive.php
     =============================================================
*/
add_image_size( 'spec_thumb', 480, 328, true );


/*
     =============================================================
       Register Nav Menus
     =============================================================
*/

/*	register_nav_menus( array(
'primary' => esc_html__( 'Primary', 'inetshop-myboutique' ),
) );*/

add_theme_support('menus');

register_nav_menus(
    array(
        'main_menu' => 'Main Menu',
        'footer_menu_1' => 'Footer Menu-1',
        'footer_menu_2' => 'Footer Menu-2',
        'footer_menu_3' => 'Footer Menu-3',
    )
);

/*
     ===================================
        Head function
     ===================================
 */

function awesome_remove_version(){
    return '';
}
add_filter('the_generator','awesome_remove_version');


/*
     =============================================================
       Include external files to functions.php
     =============================================================
*/
include('functions/walker-menu-mobile.php');
include('functions/walker-menu-header-shop.php');
include('functions/control-panel.php');
include('functions/slider-goods.php');
include('functions/services.php');
include('functions/banner-shop.php');
include('functions/woocommers-customisation.php');


