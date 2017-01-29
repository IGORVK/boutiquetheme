<?php
/*
    ================================
    Walker for Main Header menu SHOP
    ================================
*/
class mainShopMenuWalker extends Walker_Nav_Menu {


    /**
     * What the class handles.
     *
     * @since 3.0.0
     * @access public
     * @var string
     *
     * @see Walker::$tree_type
     */
    public $tree_type = array( 'post_type', 'taxonomy', 'custom' );

    /**
     * Database fields to use.
     *
     * @since 3.0.0
     * @access public
     * @todo Decouple this.
     * @var array
     *
     * @see Walker::$db_fields
     */
    public $db_fields = array( 'parent' => 'menu_item_parent', 'id' => 'db_id' );

    /**
     * Starts the list before the elements are added.
     *
     * @since 3.0.0
     *
     * @see Walker::start_lvl()
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param int    $depth  Depth of menu item. Used for padding.
     * @param array  $args   An array of wp_nav_menu() arguments.
     *
     *
     */
    public function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        if($depth==0) {
            $output .= "\n$indent<div class=\"site-nav--dropdown\"><div class=\"wrapper transparent\">\n";
        }
        if($depth>0) {
            $output .= "$indent\n";
        }

    }
    /**
     * Ends the list of after the elements are added.
     *
     * @since 3.0.0
     *
     * @see Walker::end_lvl()
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param int    $depth  Depth of menu item. Used for padding.
     * @param array  $args   An array of wp_nav_menu() arguments.
     */
    public function end_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        if($depth==0) {
            $output .= "$indent</div></div>\n";
        }
        if($depth==2) {
            $output .= "$indent</div>\n";
        }
    }

    /**
     * Starts the element output.
     *
     * @since 3.0.0
     * @since 4.4.0 The {@see 'nav_menu_item_args'} filter was added.
     *
     * @see Walker::start_el()
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param object $item   Menu item data object.
     * @param int    $depth  Depth of menu item. Used for padding.
     * @param array  $args   An array of wp_nav_menu() arguments.
     * @param int    $id     Current item ID.
     */


    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 )
    {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $classes = empty($item->classes) ? array() : (array)$item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        /**
         * Filters the arguments for a single nav menu item.
         *
         * @since 4.4.0
         *
         * @param array $args An array of arguments.
         * @param object $item Menu item data object.
         * @param int $depth Depth of menu item. Used for padding.
         */
        $args = apply_filters('nav_menu_item_args', $args, $item, $depth);

        /**
         * Filters the CSS class(es) applied to a menu item's list item element.
         *
         * @since 3.0.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array $classes The CSS classes that are applied to the menu item's `<li>` element.
         * @param object $item The current menu item.
         * @param array $args An array of wp_nav_menu() arguments.
         * @param int $depth Depth of menu item. Used for padding.
         */
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));

        /*
            =================================
                IF  has children
            =================================
        */

/*                global $wpdb;
                $children_count = $wpdb->get_var(
                    $wpdb->prepare(
                        "SELECT COUNT(*) FROM $wpdb->postmeta
                          WHERE meta_key = %s
                          AND meta_value = %d
                        ", '_menu_item_menu_item_parent', $item->ID)
                    );

                if( $children_count > 0 )*/

                if($args->walker->has_children) {
                    // has children
                    $class_names = $class_names ? 'site-nav--has-dropdown' : '';

                }
        /*
            =================================
              End if  has children
            =================================
        */



        if($depth==0) {
            $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
        }
        if($depth==1) {
            $class_names = $class_names ? ' class="linklist-wrapper depth_'. $depth . ' "' : '';
        }
        if($depth==2) {
            $class_names = $class_names ?  ' class="depth_'. $depth . ' ' . esc_attr($class_names) . '"' : '';
        }

        /**
         * Filters the ID applied to a menu item's list item element.
         *
         * @since 3.0.1
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param string $menu_id The ID that is applied to the menu item's `<li>` element.
         * @param object $item    The current menu item.
         * @param array  $args    An array of wp_nav_menu() arguments.
         * @param int    $depth   Depth of menu item. Used for padding.
         */
        $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args, $depth );
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';
        if($depth==0){
            $output .= $indent . '<li' . $id . $class_names . 'aria-haspopup="true"' .'>';
        }
        if($depth==1){
            $output .= $indent . '<div' . $id . $class_names .'>';
        }
        /*    if($depth==2) {$indent . '<a' . $id . $class_names .'>';

            }*/

        $atts = array();
        $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
        $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
        $atts['href']   = ! empty( $item->url )        ? $item->url       : '';

        /**
         * Filters the HTML attributes applied to a menu item's anchor element.
         *
         * @since 3.6.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array $atts {
         *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
         *
         *     @type string $title  Title attribute.
         *     @type string $target Target attribute.
         *     @type string $rel    The rel attribute.
         *     @type string $href   The href attribute.
         * }
         * @param object $item  The current menu item.
         * @param array  $args  An array of wp_nav_menu() arguments.
         * @param int    $depth Depth of menu item. Used for padding.
         */
        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );
        if($depth==2) {
            $attributes = ' ';
        }
        if($depth==0) {
            $attributes = ' class="site-nav__link" ';
        }
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }




        /** This filter is documented in wp-includes/post-template.php */
        $title = apply_filters( 'the_title', $item->title, $item->ID );

        /**
         * Filters a menu item's title.
         *
         * @since 4.4.0
         *
         * @param string $title The menu item's title.
         * @param object $item  The current menu item.
         * @param array  $args  An array of wp_nav_menu() arguments.
         * @param int    $depth Depth of menu item. Used for padding.
         */
        $title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );


        $item_output = $args->before;
        $item_output .= ($depth==0)? '<a'. $attributes .'>': '';
        $item_output .= ($depth==1)? '<h4>': '';
        if($depth==2) {
            $prod_categories = get_terms( 'product_cat', array(
                'orderby'=> 'id',
                'order' => 'ASC',
                'slug' => $title,
                'hide_empty' => 0
            ));
                $cat_thumb_id = get_woocommerce_term_meta( $prod_categories[0]->term_id, 'thumbnail_id', true );
                $cat_thumb_url = wp_get_attachment_url($cat_thumb_id);

                wp_reset_query();

            $item_output .= '<a' . $attributes . '><img class="feature-image" src="' . $cat_thumb_url . '" ><img src="' . get_bloginfo(template_url) . '/img/meganav_arrow.svg"  class="feature-img-arrow" >';

        }
        $item_output .= $args->link_before . $title . $args->link_after;
        $item_output .= ($depth==0)? '</a>': '';
        $item_output .= ($depth==1)? '</h4>': '';
        $item_output .= ($depth==2)? '</a>': '';
        $item_output .= $args->after;

        /**
         * Filters a menu item's starting output.
         *
         * The menu item's starting output only includes `$args->before`, the opening `<a>`,
         * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
         * no filter for modifying the opening and closing `<li>` for a menu item.
         *
         * @since 3.0.0
         *
         * @param string $item_output The menu item's starting HTML output.
         * @param object $item        Menu item data object.
         * @param int    $depth       Depth of menu item. Used for padding.
         * @param array  $args        An array of wp_nav_menu() arguments.
         */
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
    /**
     * Ends the element output, if needed.
     *
     * @since 3.0.0
     *
     * @see Walker::end_el()
     *
     * @param string $output Passed by reference. Used to append additional content.
     * @param object $item   Page data object. Not used.
     * @param int    $depth  Depth of page. Not Used.
     * @param array  $args   An array of wp_nav_menu() arguments.
     */
    public function end_el( &$output, $item, $depth = 0, $args = array() ) {
        if($depth==0) {
            $output .= "</li>\n";
        }
        if($depth==1) {
            $output .= "</div>\n";
        }
        if($depth==2) {
            $output .= "</a>\n";
        }
    }
}
/*
    ====================================
    END Walker for Main Header menu SHOP
    ====================================
*/


