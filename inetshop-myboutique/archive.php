<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package inetshop-myboutique
 */
		get_header();

if(is_category('Events')):

		if ( have_posts() ) : ?>

			<div class="grid">
			<div class="grid__item">


			<header class="section-header">

				<?php if(!is_page('shop')){ the_archive_title( '<h1 class="section-header__title page-title">', '</h1>' );}?>

			</header><!-- .page-header -->

			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post();?>


				<div class="grid__item one-half medium--one-whole small--one-whole">

					<?php the_title(  sprintf('<h2><a href="%s">', esc_url(get_permalink())),'</a></h2>'  ); ?>

					<?php echo sprintf('<a href="%s">', esc_url(get_permalink())) ; ?><?php the_post_thumbnail('spec_thumb'); ?></a>

			<!--		/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */-->


				<p><?php echo sprintf('<a href="%s">', esc_url(get_permalink())) ; ?>Read more →</a></p>
				<hr>
				</div>
				<?php endwhile;

			//the_posts_navigation();

		/*else :

			get_template_part( 'template-parts/content', 'none' );*/

		endif;


	?>



	</div>
	</div>
	<?php endif; ?>


<?php	if(is_category('News')):?>

	<div class="grid">
      <div class="grid__item">

        <header class="section-header">

			<?php  the_archive_title( '<h1 class="section-header__title page-title">', '</h1>' );?>

		</header>


	<?php
	/* Start the Loop */
	while ( have_posts() ) : the_post();?>


		<div class="grid__item one-half medium--one-whole small--one-whole">
			<div class="rte news">
				<p><?php echo sprintf('<a href="%s">', esc_url(get_permalink())) ; ?><?php the_post_thumbnail(); ?></a></p>
			</div>
		</div>

		<div class="grid__item one-half medium--one-whole small--one-whole">
			<?php the_title(  sprintf('<h2><a href="%s">', esc_url(get_permalink())),'</a></h2>'  ); ?>
			<p class="blog-date">
				<time datetime="<?php the_time('Y-m-j'); ?>"><?php the_time('F j, Y'); ?> </time>
			</p>

				<?php the_excerpt(); ?>
			<p><?php echo sprintf('<a href="%s">', esc_url(get_permalink())) ; ?>Read more →</a></p>


		</div>

			<hr>

			<?php		/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
			//get_template_part( 'template-parts/content', get_post_format() );?>



	<?php endwhile;

//the_posts_navigation();

/*else :

	get_template_part( 'template-parts/content', 'none' );*/

 ?>

      </div>
    </div>
<?php endif; ?>




<?php
//get_sidebar();
get_footer();
