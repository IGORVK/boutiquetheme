<?php
/*****************************************/
/******          WIDGET Services     *************/
/*****************************************/
add_action('widgets_init', 'inetshop_myboutique_register_widgets');

function inetshop_myboutique_register_widgets() {


    register_widget('inetshop_myboutique_service_widget');


    $inetshop_myboutique_sidebars = array (  'sidebar-ourservice' => 'sidebar-ourservice' );

    /* Register sidebars */
    foreach ( $inetshop_myboutique_sidebars as $inetshop_myboutique_sidebar ):

        if( $inetshop_myboutique_sidebar == 'sidebar-ourservice' ):

            $inetshop_myboutique_name = __('Service section page Home', 'inetshop_myboutique');

        else:

            $inetshop_myboutique_name = $inetshop_myboutique_sidebar;

        endif;

        register_sidebar(
            array (
                'name'          => $inetshop_myboutique_name,
                'id'            => $inetshop_myboutique_sidebar,
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
add_action('after_switch_theme', 'company_register_default_ourservice_widgets');

function company_register_default_ourservice_widgets() {

    $company_sidebars = array ( 'sidebar-ourservice' => 'sidebar-ourservice' );

    $active_widgets = get_option( 'sidebars_widgets' );


    /**
     * Default Our ourservice widgets
     */
    if ( empty ( $active_widgets[ $company_sidebars['sidebar-ourservice'] ] ) ):

        $company_counter = 1;

        /* our ourservice widget #1 */
        $active_widgets[ 'sidebar-ourservice' ][0] = 'inetshop_myboutique_service-widget-' . $company_counter;
        $ourservice_content[ $company_counter ] = array ( 'name' => 'New in',  'url_link' => '/new-in/', 'image_uri' => get_template_directory_uri()."/img/promo_image_1.jpg" );
        update_option( 'widget_inetshop_myboutique_service-widget', $ourservice_content );
        $company_counter++;

        /* our ourservice widget #2 */
        $active_widgets[ 'sidebar-ourservice' ][] = 'inetshop_myboutique_service-widget-' . $company_counter;
        $ourservice_content[ $company_counter ] = array ( 'name' => 'News',  'url_link' => '/category/news/',  'image_uri' => get_template_directory_uri()."/img/promo_image_2.jpg" );
        update_option( 'widget_inetshop_myboutique_service-widget', $ourservice_content );
        $company_counter++;

        /* our ourservice widget #3 */
        $active_widgets[ 'sidebar-ourservice' ][] = 'inetshop_myboutique_service-widget-' . $company_counter;
        $ourservice_content[ $company_counter ] = array ( 'name' => 'Shop',   'url_link' => '/shop/', 'image_uri' => get_template_directory_uri()."/img/promo_image_3.jpg" );
        update_option( 'widget_inetshop_myboutique_service-widget', $ourservice_content );
        $company_counter++;

        update_option( 'sidebars_widgets', $active_widgets );

    endif;

}
?>
<?php
/****************************/
/****** service  widget **/
/***************************/

add_action('admin_enqueue_scripts', 'inetshop_myboutique_service_widget_scripts');

function inetshop_myboutique_service_widget_scripts() {

    wp_enqueue_media();

    wp_enqueue_script('inetshop_myboutique_service_widget_script', get_template_directory_uri() . '/js/adpic_service.js', array(),'1.0.0', true);

}

class inetshop_myboutique_service_widget extends WP_Widget {

    public function __construct() {
        parent::__construct('inetshop_myboutique_service-widget',	__( 'Service  widget', 'inetshop_myboutique' ));
    }

    function widget( $args, $instance ) {

        extract( $args );

        echo $before_widget;

        ?>

        <div class="grid__item small--one-whole one-third">
            <a href="<?php if ( ! empty( $instance['url_link'] ) ): ?>
                     <?php echo apply_filters( 'widget_title', $instance['url_link'] ); ?>
                     <?php endif; ?>">

                        <?php if ( ! empty( $instance['image_uri'] ) && ( $instance['image_uri'] != 'Upload Image' ) ):  ?>
                        <img src="<?php echo esc_url( $instance['image_uri'] ); ?>" alt="<?php _e( 'Uploaded image', 'inetshop_myboutique' ); ?>">
                        <?php endif; ?>

                        <?php if ( ! empty( $instance['name'] ) ): ?>
                        <h4><?php echo apply_filters( 'widget_title', $instance['name'] ); ?></h4>
                        <?php endif; ?>
            </a>
        </div>


        <?php

        echo $after_widget;

    }

    function update( $new_instance, $old_instance ) {

        $instance = $old_instance;

        $instance['name']            = strip_tags( $new_instance['name'] );
        $instance['url_link']         = strip_tags( $new_instance['url_link'] );
        $instance['image_uri']       = strip_tags( $new_instance['image_uri'] );
        $instance['custom_media_id'] = strip_tags( $new_instance['custom_media_id'] );

        return $instance;

    }

    function form( $instance ) {

        ?>

        <p>
            <label for="<?php echo $this->get_field_id( 'name' ); ?>"><?php _e( 'Name of Service', 'inetshop_myboutique' ); ?></label><br/>
            <input type="text" name="<?php echo $this->get_field_name( 'name' ); ?>"
                   id="<?php echo $this->get_field_id( 'name' ); ?>"
                   value="<?php if ( ! empty( $instance['name'] ) ): echo $instance['name']; endif; ?>"
                   class="widefat"/>
        </p>
        <p>
            <label
                for="<?php echo $this->get_field_id( 'url_link' ); ?>"><?php _e( 'Link http://example.com/page/', 'inetshop_myboutique' ); ?></label><br/>
            <input type="text" name="<?php echo $this->get_field_name( 'url_link' ); ?>"
                   id="<?php echo $this->get_field_id( 'url_link' ); ?>"
                   value="<?php if ( ! empty( $instance['url_link'] ) ): echo $instance['url_link']; endif; ?>"
                   class="widefat">

        </p>
        <p>
            <label for="<?php echo $this->get_field_id( 'image_uri' ); ?>"><?php _e( 'Image 367x227', 'inetshop_myboutique' ); ?></label><br/>

            <?php

            if ( ! empty( $instance['image_uri'] ) ) :

                echo '<img class="custom_media_image_service" src="' . $instance['image_uri'] . '" style="margin:0;padding:0;max-width:100px;float:left;display:inline-block" alt="' . __( 'Uploaded image', 'inetshop_myboutique' ) . '" /><br />';

            endif;

            if ( empty( $instance['image_uri'] ) ) :

                echo '<img class="custom_media_image_service" src=" " style="margin:0;padding:0;max-width:100px;float:left;display:none" alt="' . __( 'Uploaded image', 'inetshop_myboutique' ) . '" /><br />';

            endif;

            ?>

            <input type="text" class="widefat custom_media_url_service"
                   name="<?php echo $this->get_field_name( 'image_uri' ); ?>"
                   id="<?php echo $this->get_field_id( 'image_uri' ); ?>"
                   value="<?php if ( ! empty( $instance['image_uri'] ) ): echo $instance['image_uri']; endif;  ?>"
                   style="margin-top:5px;">
            <input type="button" class="button button-primary custom_media_button_service" id="custom_media_button_service"
                   name="<?php echo $this->get_field_name( 'image_uri' ); ?>"
                   value="<?php _e( 'Upload Image', 'inetshop_myboutique' ); ?>" style="margin-top:5px;">
        </p>

        <input class="custom_media_id" id="<?php echo $this->get_field_id( 'custom_media_id' ); ?>"
               name="<?php echo $this->get_field_name( 'custom_media_id' ); ?>" type="hidden"
               value="<?php if ( ! empty( $instance["custom_media_id"] ) ): echo $instance["custom_media_id"]; endif; ?>"/>

        <?php

    }

}?>