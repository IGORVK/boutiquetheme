<?php /* Add to themes/[theme]/woocommerce/loop/pagination.php */
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $wp_query;

if( $_GET['view'] === 'all' ) { ?>
<div class="text-center">
	<div class="woo-pagination wg-view-less"><a href=".">View Less</a></div>
</div>
<?php }

if ( $wp_query->max_num_pages <= 1 )
	return;
?>

<div class="text-center">




    <?php function custom_pagination() {

    global $wp_query;

    $pages = paginate_links( apply_filters( 'woocommerce_pagination_args', array(
		'base'          => str_replace( 999999999, '%#%', get_pagenum_link( 999999999 ) ),
		'format'        => '?paged=%#%',
		'current'       => max( 1, get_query_var('paged') ),
		'total'         => $wp_query->max_num_pages,
        'show_all'      => true,
        'prev_next' => true,
		'prev_text'     => '&larr;',
		'next_text'     => '&rarr;',
		'type'          => 'array',
		'end_size'      => 2,
		'mid_size'      => 1
	) ) );

        if( is_array( $pages ) ) {
            $paged = ( get_query_var('paged') == 0 ) ? 1 : get_query_var('paged');
            echo '<ul class="pagination-custom">';
            foreach ( $pages as $page ) {
                echo "<li>$page</li>";
            }
            echo '</ul>';
        }
    }
    echo custom_pagination();
	?>
    <?php if (is_paged()) : ?>
        <div class="button wg-view-all wg-view-right"><a href="../../?view=all">View All</a></div>
    <?php else: ?>
        <div class="wg-view-all wg-view-right"><a href="?view=all">View All</a></div>
    <?php endif; ?>
</div>