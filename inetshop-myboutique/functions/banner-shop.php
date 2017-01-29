<?php
/*
    =================================
       WIDGET banners
    =================================
*/
add_action('widgets_init', 'banner_shop_register_widgets');

function banner_shop_register_widgets() {


    register_widget('banner_shop_banner_widget');


    $banner_shop_sidebars = array (  'sidebar-ourbanner' => 'sidebar-ourbanner' );

    /* Register sidebars */
    foreach ( $banner_shop_sidebars as $banner_shop_sidebar ):

        if( $banner_shop_sidebar == 'sidebar-ourbanner' ):

            $banner_shop_name = __('Banner for page of goods category ', 'banner_shop');

        else:

            $banner_shop_name = $banner_shop_sidebar;

        endif;

        register_sidebar(
            array (
                'name'          => $banner_shop_name,
                'id'            => $banner_shop_sidebar,
                'before_widget' => '',
                'after_widget'  => '',
                'before_title'  => '<h2 class="widget-title">',
                'after_title'   => '</h2>'
            )
        );

    endforeach;

}



/**
 * Add default widgets
 */
add_action('after_switch_theme', 'company_register_default_ourbanner_widgets');

function company_register_default_ourbanner_widgets() {

    $company_sidebars = array ( 'sidebar-ourbanner' => 'sidebar-ourbanner' );

    $active_widgets = get_option( 'sidebars_widgets' );


    /**
     * Default Our ourbanner widgets
     */
    if ( empty ( $active_widgets[ $company_sidebars['sidebar-ourbanner'] ] ) ):

        $company_counter = 1;

        /* our ourbanner widget #1 */
        $active_widgets[ 'sidebar-ourbanner' ][0] = 'banner_shop_banner-widget-' . $company_counter;
        $ourbanner_content[ $company_counter ] = array ( 'name' => 'PRÊT-À-PORTER',  'description' => 'In order to offer some jewellery more suitable for daily wear, Ornella has created some ‘Prêt-à-Porter’ collections linked to her \'Fine Art Jewellery\' lines. While keeping the distinctiveness of Ornella\'s signature style, these pieces are made to be worn and enjoyed in any occasions.', 'url_link' => '/shop/', 'image_uri' => get_template_directory_uri()."/img/banner_PAP.jpg" );
        update_option( 'widget_banner_shop_banner-widget', $ourbanner_content );
        $company_counter++;



        update_option( 'sidebars_widgets', $active_widgets );

    endif;

}
?>
<?php
/****************************/
/****** banner  widget **/
/***************************/

add_action('admin_enqueue_scripts', 'banner_shop_banner_widget_scripts');

function banner_shop_banner_widget_scripts() {

    wp_enqueue_media();

    wp_enqueue_script('banner_shop_banner_widget_script', get_template_directory_uri() . '/js/adpic_banner.js', array(),'1.0.0', true);

}

class banner_shop_banner_widget extends WP_Widget {

    public function __construct() {
        parent::__construct('banner_shop_banner-widget',	__( 'Banner  widget', 'banner_shop' ));
    }

    function widget( $args, $instance ) {

        extract( $args );

        echo $before_widget;

       if(is_product_category($instance['name'])):
           ?>

            <div class="rte rte--header" id="collection-banner">
                <a href="<?php if ( ! empty( $instance['url_link'] ) ): ?>
                 <?php echo apply_filters( 'widget_title', $instance['url_link'] ); ?>
                 <?php endif; ?>"
                    <?php
                    $banner_shop_banner_target = '_self';
                    if ( ! empty( $instance['open_new_window'] ) ):
                        $banner_shop_banner_target = '_blank';
                    endif;
                    ?> target="<?php echo $banner_shop_banner_target; ?>" class="block" title="Read more">

                <?php if ( ! empty( $instance['image_uri'] ) && ( $instance['image_uri'] != 'Upload Image' ) ) { ?>

                        <img src="<?php echo esc_url( $instance['image_uri'] ); ?>"alt="<?php _e( 'Uploaded image', 'banner_shop' ); ?>"/>

                    <?php
                }
                ?>




                <div id="collection-text" class="white">
                    <p></p>
                    <meta charset="utf-8"><meta charset="utf-8">
                    <h1><span style="color: #ffffff;"><span>
                <?php if ( ! empty( $instance['name'] ) ): ?>

                        <?php echo apply_filters( 'widget_title', $instance['name'] ); ?>

                <?php endif; ?></span></span></h1>

                    <p><span style="color: #ffffff;"> <?php if ( ! empty( $instance['description'] ) ): ?>

                    <?php echo htmlspecialchars_decode( apply_filters( 'widget_title', $instance['description'] ) ); ?>

                    <?php endif; ?></span></p>
                    <p>&nbsp;</p>
                </div>
                </a>
            </div>

        <?php endif;

        echo $after_widget;

    }

    function update( $new_instance, $old_instance ) {

        $instance = $old_instance;

        $instance['name']            = strip_tags( $new_instance['name'] );
        $instance['description']     = stripslashes( wp_filter_post_kses( $new_instance['description'] ) );
        $instance['url_link']         = strip_tags( $new_instance['url_link'] );
        $instance['image_uri']       = strip_tags( $new_instance['image_uri'] );
        $instance['open_new_window'] = strip_tags( $new_instance['open_new_window'] );
        $instance['custom_media_id'] = strip_tags( $new_instance['custom_media_id'] );

        return $instance;

    }

    function form( $instance ) {

        ?>

        <p>
            <label for="<?php echo $this->get_field_id( 'name' ); ?>"><?php _e( 'Name of category', 'banner_shop' ); ?></label><br/>
            <input type="text" name="<?php echo $this->get_field_name( 'name' ); ?>"
                   id="<?php echo $this->get_field_id( 'name' ); ?>"
                   value="<?php if ( ! empty( $instance['name'] ) ): echo $instance['name']; endif; ?>"
                   class="widefat"/>
        </p>
        <p>
            <label
                for="<?php echo $this->get_field_id( 'description' ); ?>"><?php _e( 'Description Of banner', 'banner_shop' ); ?></label><br/>
            <textarea class="widefat" rows="8" cols="20" name="<?php echo $this->get_field_name( 'description' ); ?>"
                      id="<?php echo $this->get_field_id( 'description' ); ?>"><?php
                if ( ! empty( $instance['description'] ) ): echo htmlspecialchars_decode( $instance['description'] ); endif;
                ?></textarea>
        </p>
        <p>
            <label
                for="<?php echo $this->get_field_id( 'url_link' ); ?>"><?php _e( 'Link http://example.com/page/', 'banner_shop' ); ?></label><br/>
            <input type="text" name="<?php echo $this->get_field_name( 'url_link' ); ?>"
                   id="<?php echo $this->get_field_id( 'url_link' ); ?>"
                   value="<?php if ( ! empty( $instance['url_link'] ) ): echo $instance['url_link']; endif; ?>"
                   class="widefat">

        </p>

        <p>
            <input type="checkbox" name="<?php echo $this->get_field_name( 'open_new_window' ); ?>"
                   id="<?php echo $this->get_field_id( 'open_new_window' ); ?>" <?php if ( ! empty( $instance['open_new_window'] ) ): checked( (bool) $instance['open_new_window'], true ); endif; ?> ><?php _e( 'Open links in new window?', 'banner_shop' ); ?>
            <br>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'image_uri' ); ?>"><?php _e( 'Image 1450x525', 'banner_shop' ); ?></label><br/>

            <?php

            if ( ! empty( $instance['image_uri'] ) ) :

                echo '<img class="custom_media_image_banner" src="' . $instance['image_uri'] . '" style="margin:0;padding:0;max-width:100px;float:left;display:inline-block" alt="' . __( 'Uploaded image', 'banner_shop' ) . '" /><br />';

            endif;

            if ( empty( $instance['image_uri'] ) ) :

                echo '<img class="custom_media_image_banner" src=" " style="margin:0;padding:0;max-width:100px;float:left;display:none" alt="' . __( 'Uploaded image', 'banner_shop' ) . '" /><br />';

            endif;

            ?>

            <input type="text" class="widefat custom_media_url_banner"
                   name="<?php echo $this->get_field_name( 'image_uri' ); ?>"
                   id="<?php echo $this->get_field_id( 'image_uri' ); ?>"
                   value="<?php if ( ! empty( $instance['image_uri'] ) ): echo $instance['image_uri']; endif;  ?>"
                   style="margin-top:5px;">
            <input type="button" class="button button-primary custom_media_button_banner" id="custom_media_button_banner"
                   name="<?php echo $this->get_field_name( 'image_uri' ); ?>"
                   value="<?php _e( 'Upload Image', 'banner_shop' ); ?>" style="margin-top:5px;">
        </p>

        <input class="custom_media_id" id="<?php echo $this->get_field_id( 'custom_media_id' ); ?>"
               name="<?php echo $this->get_field_name( 'custom_media_id' ); ?>" type="hidden"
               value="<?php if ( ! empty( $instance["custom_media_id"] ) ): echo $instance["custom_media_id"]; endif; ?>"/>

        <?php

    }

}?>