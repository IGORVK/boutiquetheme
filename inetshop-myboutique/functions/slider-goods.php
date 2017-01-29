<?php
/*****************************************/
/******          WIDGET Goods     *************/
/*****************************************/
add_action('widgets_init', 'csw_register_widgets');

function csw_register_widgets() {


    register_widget('csw_goods_widget');


    $csw_sidebars = array (  'sidebar-ourgoods' => 'sidebar-ourgoods' );

    /* Register sidebars */
    foreach ( $csw_sidebars as $csw_sidebar ):

        if( $csw_sidebar == 'sidebar-ourgoods' ):

            $csw_name = __('Slider section page Home', 'csw');

        else:

            $csw_name = $csw_sidebar;

        endif;

        register_sidebar(
            array (
                'name'          => $csw_name,
                'id'            => $csw_sidebar,
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
add_action('after_switch_theme', 'company_register_default_ourgoods_widgets');

function company_register_default_ourgoods_widgets() {

    $company_sidebars = array ( 'sidebar-ourgoods' => 'sidebar-ourgoods' );

    $active_widgets = get_option( 'sidebars_widgets' );


    /**
     * Default Our ourgoods widgets
     */
    if ( empty ( $active_widgets[ $company_sidebars['sidebar-ourgoods'] ] ) ):

        $company_counter = 1;

        /* our ourgoods widget #1 */
        $active_widgets[ 'sidebar-ourgoods' ][0] = 'csw_goods-widget-' . $company_counter;
        $ourgoods_content[ $company_counter ] = array ('url_link' => '/overview/', 'image_uri' => get_template_directory_uri()."/img/slide_1.jpg" );
        update_option( 'widget_csw_goods-widget', $ourgoods_content );
        $company_counter++;

        /* our ourgoods widget #2 */
        $active_widgets[ 'sidebar-ourgoods' ][] = 'csw_goods-widget-' . $company_counter;
        $ourgoods_content[ $company_counter ] = array ('url_link' => '/bathroom-renovation-2/',  'image_uri' => get_template_directory_uri()."/img/slide_2.jpg" );
        update_option( 'widget_csw_goods-widget', $ourgoods_content );
        $company_counter++;

        /* our ourgoods widget #3 */
        $active_widgets[ 'sidebar-ourgoods' ][] = 'csw_goods-widget-' . $company_counter;
        $ourgoods_content[ $company_counter ] = array ('url_link' => '/kitchen-renovation-2/', 'image_uri' => get_template_directory_uri()."/img/slide_3.jpg" );
        update_option( 'widget_csw_goods-widget', $ourgoods_content );
        $company_counter++;

        /* our ourgoods widget #4 */
        $active_widgets[ 'sidebar-ourgoods' ][] = 'csw_goods-widget-' . $company_counter;
        $ourgoods_content[ $company_counter ] = array ('url_link' => '/basement-renovation-2/',  'image_uri' => get_template_directory_uri()."/img/slide_4.jpg" );
        update_option( 'widget_csw_goods-widget', $ourgoods_content );
        $company_counter++;

        /* our ourgoods widget #5 */
        $active_widgets[ 'sidebar-ourgoods' ][] = 'csw_goods-widget-' . $company_counter;
        $ourgoods_content[ $company_counter ] = array ('url_link' => '/full-home-renovation/',  'image_uri' => get_template_directory_uri()."/img/slide_5.jpg" );
        update_option( 'widget_csw_goods-widget', $ourgoods_content );
        $company_counter++;


        update_option( 'sidebars_widgets', $active_widgets );

    endif;

}
?>
<?php
/****************************/
/****** goods  widget **/
/***************************/

add_action('admin_enqueue_scripts', 'csw_goods_widget_scripts');

function csw_goods_widget_scripts() {

    wp_enqueue_media();

    wp_enqueue_script('csw_goods_widget_script', get_template_directory_uri() . '/js/adpic_goods.js', array(),'1.0.0', true);

}

class csw_goods_widget extends WP_Widget {

    public function __construct() {
        parent::__construct('csw_goods-widget',	__( 'Slide  widget', 'csw' ));
    }

    function widget( $args, $instance ) {

        extract( $args );

        echo $before_widget;

        ?>




    <li class="clone" aria-hidden="true" style="float: left; display: block; width: ;">
        <a href="<?php if ( ! empty( $instance['url_link'] ) ): ?>
                 <?php echo apply_filters( 'widget_title', $instance['url_link'] ); ?>
                 <?php endif; ?>" class="slide-link">

            <?php if ( ! empty( $instance['image_uri'] ) && ( $instance['image_uri'] != 'Upload Image' ) ) { ?>

                    <img src="<?php echo esc_url( $instance['image_uri'] ); ?>"alt="<?php _e( 'Uploaded image', 'csw' ); ?>"/>

                <?php
            }?>

             </a>
    </li>







        <?php

        echo $after_widget;

    }

    function update( $new_instance, $old_instance ) {

        $instance = $old_instance;


        $instance['url_link']         = strip_tags( $new_instance['url_link'] );
        $instance['image_uri']       = strip_tags( $new_instance['image_uri'] );
        $instance['custom_media_id'] = strip_tags( $new_instance['custom_media_id'] );

        return $instance;

    }

    function form( $instance ) {

        ?>


        <p>
            <label
                for="<?php echo $this->get_field_id( 'url_link' ); ?>"><?php _e( 'Link http://example.com/page/', 'csw' ); ?></label><br/>
            <input type="text" name="<?php echo $this->get_field_name( 'url_link' ); ?>"
                   id="<?php echo $this->get_field_id( 'url_link' ); ?>"
                   value="<?php if ( ! empty( $instance['url_link'] ) ): echo $instance['url_link']; endif; ?>"
                   class="widefat">

        </p>

        <p>
            <label for="<?php echo $this->get_field_id( 'image_uri' ); ?>"><?php _e( 'Image 1150x520 ', 'csw' ); ?></label><br/>

            <?php

            if ( ! empty( $instance['image_uri'] ) ) :

                echo '<img class="custom_media_image_goods" src="' . $instance['image_uri'] . '" style="margin:0;padding:0;max-width:100px;float:left;display:inline-block" alt="' . __( 'Uploaded image', 'csw' ) . '" /><br />';

            endif;

            if ( empty( $instance['image_uri'] ) ) :

                echo '<img class="custom_media_image_goods" src=" " style="margin:0;padding:0;max-width:100px;float:left;display:none" alt="' . __( 'Uploaded image', 'csw' ) . '" /><br />';

            endif;

            ?>

            <input type="text" class="widefat custom_media_url_goods"
                   name="<?php echo $this->get_field_name( 'image_uri' ); ?>"
                   id="<?php echo $this->get_field_id( 'image_uri' ); ?>"
                   value="<?php if ( ! empty( $instance['image_uri'] ) ): echo $instance['image_uri']; endif;  ?>"
                   style="margin-top:5px;">
            <input type="button" class="button button-primary custom_media_button_goods" id="custom_media_button_goods"
                   name="<?php echo $this->get_field_name( 'image_uri' ); ?>"
                   value="<?php _e( 'Upload Image', 'csw' ); ?>" style="margin-top:5px;">
        </p>

        <input class="custom_media_id" id="<?php echo $this->get_field_id( 'custom_media_id' ); ?>"
               name="<?php echo $this->get_field_name( 'custom_media_id' ); ?>" type="hidden"
               value="<?php if ( ! empty( $instance["custom_media_id"] ) ): echo $instance["custom_media_id"]; endif; ?>"/>

        <?php

    }

}?>