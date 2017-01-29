<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package inetshop-myboutique
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php
		if ( is_single() ) :
			if (!is_category($category) ) :
			else : the_title( '<h1 class="entry-title">', '</h1>' );
			endif;
		else :
		if ( is_home() && ! is_front_page() ) :
			the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		endif;
		endif;

		if ( 'post' === get_post_type() ) :
		if( is_category( $category ) ): ?>
		<div class="entry-meta">
			<?php inetshop_myboutique_posted_on(); ?>
		</div><!-- .entry-meta -->
			<?php endif;
			if( is_category( $category ) ):?>
			<p class="blog-date">
				<time datetime="<?php the_time('Y-m-j'); ?>"><?php the_time('F j, Y'); ?> </time>
			</p>

		<?php endif;
		endif; ?>
	</header><!-- .entry-header -->


	<div class="entry-content">
		<?php
		if(!is_category('Events')||!is_category('News')):
			the_content( sprintf(
				/* translators: %s: Name of current post. */
				wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'inetshop-myboutique' ), array( 'span' => array( 'class' => array() ) ) ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'inetshop-myboutique' ),
				'after'  => '</div>',
			) );
		endif;

		if(is_category('Events')):
			echo
			the_post_thumbnail( 'spec_thumb' );
		endif;
		if(is_category('News')):
			echo
			the_post_thumbnail();
		endif;

		?>
	</div><!-- .entry-content -->

	<!-- <footer class="entry-footer">
		<?php /*inetshop_myboutique_entry_footer(); */?>
	</footer>.entry-footer -->
</article><!-- #post-## -->
