<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>

<?php
	/**
	 * woocommerce_before_single_product hook.
	 *
	 * @hooked wc_print_notices - 10
	 */
	 do_action( 'woocommerce_before_single_product' );

	 if ( post_password_required() ) {
	 	echo get_the_password_form();
	 	return;
	 }
?>
<div class="grid">
	<div class="grid__item">
		<div itemscope itemtype="<?php echo woocommerce_get_product_schema(); ?>" id="product-<?php the_ID(); ?>" <?php post_class(); ?>>
            <meta itemprop="url" content="<?php esc_url(the_permalink()); ?>" />
            <div class="product-single">
				<div class="grid product-single__hero">



	<?php
		/**
		 * woocommerce_before_single_product_summary hook.
		 *
		 * @hooked woocommerce_show_product_sale_flash - 10
		 * @hooked woocommerce_show_product_images - 20
		 */
		do_action( 'woocommerce_before_single_product_summary' );
	?>


	<div class="grid__item post-large--five-twelfths product-description-wrapper">
        <div class="inner-form">

                    <?php
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
                        do_action( 'woocommerce_single_product_summary' );
                    ?>
                        <hr>
                        <div class="product-additional-info">
                            <a class="btn info" href="/contact-us" target="_blank">Contact</a><a class="btn info" href="/delivery" target="_blank">Delivery</a>
                            <a class="btn share" onclick="toggle_visibility('social-share');">Share</a>
                            <div id="social-share">
                                <div class="social-sharing normal" data-permalink="<?php esc_url(the_permalink());?>&amp;t=<?php the_title(); ?>">
                                    <a href="http://www.facebook.com/sharer.php?u=<?php esc_url(the_permalink());?>&amp;t=<?php the_title(); ?>"  title="Share this post on Facebook!" onclick="window.open(this.href); return false;" target="_blank" class="share-facebook">
                                        <span class="icon icon-facebook"></span>
                                        <span class="share-title">Share</span>
                                    </a>
                                    <a href="http://twitter.com/home?status=Reading: <?php esc_url(the_permalink()); ?>" title="Share this post on Twitter!" target="_blank" class="share-twitter">
                                        <span class="icon icon-twitter"></span>
                                        <span class="share-title">Tweet</span>
                                        <span class="share-count">0</span>
                                    </a>

                                    <a target="_blank" href="http://pinterest.com/pin/create/button/?url=<?php esc_url(the_permalink());?>&amp;media=<?php echo wp_get_attachment_url( get_post_thumbnail_id($post->ID) );?>&description=<?php the_title();?> on <?php bloginfo('name'); ?> <?php echo site_url()?>" class="share-pinterest" count-layout="horizontal" title="<?php _e('Share on Pinterest','cryst4l') ?>">
                                        <span class="icon icon-pinterest"></span>
                                        <span class="share-title">Pin it</span>
                                        <span class="share-count is-loaded">1</span>
                                    </a>

                                    <a target="_blank" href="//fancy.com/fancyit?ItemURL=<?php esc_url(the_permalink());?>&amp;Title=<?php the_title(); ?>&amp;Category=Other&amp;ImageURL=<?php echo wp_get_attachment_url( get_post_thumbnail_id($post->ID) );?>" class="share-fancy">
                                        <span class="icon icon-fancy"></span>
                                        <span class="share-title">Fancy</span>
                                    </a>
                                    <a  href="https://plus.google.com/share?url=<?php esc_url(the_permalink()); ?>" target="_blank"class="share-google">
                                        <!-- Cannot get Google+ share count with JS yet -->
                                        <span class="icon icon-google"></span>
                                        <span class="share-count is-loaded">+1</span>
                                    </a>

                                </div>
                            </div>
                        </div>

                    <hr class="return-to-collection-hr">
                    <a href="javascript:history.go(-1)" class="alt-font return-to-collection text-center">RETURN TO COLLECTION</a>
        </div>
    </div><!-- .summary -->
                <script type="text/javascript">
                    <!--
                    function toggle_visibility(id) {
                        var e = document.getElementById(id);
                        if(e.style.display == 'block')
                            e.style.display = 'none';
                        else
                            e.style.display = 'block';
                    }
                    //-->
                </script>
	<?php
		/**
		 * woocommerce_after_single_product_summary hook.
		 *
		 * @hooked woocommerce_output_product_data_tabs - 10
		 * @hooked woocommerce_upsell_display - 15
		 * @hooked woocommerce_output_related_products - 20
		 */
  		/*do_action( 'woocommerce_after_single_product_summary' );*/
	?>



</div></div></div></div></div><!-- #product-<?php the_ID(); ?> -->

<?php do_action( 'woocommerce_after_single_product' ); ?>
