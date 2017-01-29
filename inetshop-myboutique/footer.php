<?php global $mytheme; ?>
<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package inetshop-myboutique
 */

?>
</main>
<div class="wrapper newsletter-wrapper">
	<div class="one-whole newsletter-section">
		<div class="one-half medium--one-whole small--one-whole inline newsletter-incentive">
			<p class="newsletter-section-alt-font">Sign up to our mailing list</p>
		</div><div class="one-half medium--one-whole small--one-whole inline">


			<form action="you have to registration-mailchimp" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" class="small--hide">
				<input type="email" value="" placeholder="Your email" name="EMAIL" id="mail" aria-label="Your email" autocorrect="off" autocapitalize="off">
				<input type="submit" class="btn" name="subscribe" id="subscribe" value="JOIN">
			</form>
			<form action="you have to registration-mailchimp" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" class="post-large--hide medium--hide input-group">
				<input type="email" value="" placeholder="Your email" name="EMAIL" id="mail" class="input-group-field" aria-label="Your email" autocorrect="off" autocapitalize="off">
				<span class="input-group-btn">
    <input type="submit" class="btn" name="subscribe" id="subscribe" value="JOIN">
  </span>
			</form>

		</div>
	</div>
</div>
</div><!-- #content -->
<footer class="site-footer small--text-center" role="contentinfo">

	<div class="wrapper transparent">

		<div class="grid-uniform ">

			<div class="grid__item post-large--one-fifth medium--one-half">

				<!--WP FOOTER MENU-1 -->
				<?php if ( has_nav_menu( 'footer_menu_1' ) ) : ?>
					<?php wp_nav_menu(
						array(
							'theme_location' => 'footer_menu_1',
							'menu_class'  => 'site-footer__links',
							'menu_id' => '',
							'container' => 'ul',
						) ); ?>
				<?php endif; ?>
				<!--EDN WP FOOTER MENU-1 -->

			</div>



			<div class="grid__item post-large--one-fifth medium--one-half">
				<!--WP FOOTER MENU-2 -->
				<?php if ( has_nav_menu( 'footer_menu_2' ) ) : ?>
					<?php wp_nav_menu(
						array(
							'theme_location' => 'footer_menu_2',
							'menu_class'  => 'site-footer__links',
							'menu_id' => '',
							'container' => 'ul',
						) ); ?>
				<?php endif; ?>
				<!--EDN WP FOOTER MENU-2 -->
			</div>



			<div class="grid__item post-large--one-fifth medium--one-half">
				<!--WP FOOTER MENU-3 -->
				<?php if ( has_nav_menu( 'footer_menu_3' ) ) : ?>
					<?php wp_nav_menu(
						array(
							'theme_location' => 'footer_menu_3',
							'menu_class'  => 'site-footer__links',
							'menu_id' => '',
							'container' => 'ul',
						) ); ?>
				<?php endif; ?>
				<!--EDN WP FOOTER MENU-1 -->
			</div>



			<div class="grid__item post-large--one-fifth medium--one-half">


				<ul class="inline-list social-icons">


					<li>
						<a target="_blank" class="icon-fallback-text" href="<?php echo $mytheme['pinterest']; ?>" title="Pinterest">
							<span class="icon icon-pinterest" aria-hidden="true"></span>
							<span class="fallback-text">Pinterest</span>
						</a>
					</li>



					<li>
						<a target="_blank" class="icon-fallback-text" href="<?php echo $mytheme['instagram']; ?>" title="Instagram">
							<span class="icon icon-instagram" aria-hidden="true"></span>
							<span class="fallback-text">Instagram</span>
						</a>
					</li>


					<li>
						<a target="_blank" class="icon-fallback-text" href="<?php echo $mytheme['twitter']; ?>" title="Twitter">
							<span class="icon icon-twitter" aria-hidden="true"></span>
							<span class="fallback-text">Twitter</span>
						</a>
					</li>


					<li>
						<a target="_blank" class="icon-fallback-text" href="<?php echo $mytheme['facebook']; ?>" title="Facebook">
							<span class="icon icon-facebook" aria-hidden="true"></span>
							<span class="fallback-text">Facebook</span>
						</a>
					</li>


				</ul>
			</div>



			<div class="grid__item post-large--one-fifth medium--one-half">
				<div>
					<img src="<?php bloginfo(template_url); ?>/img/awards.png" style="width: 50%">
				</div>
			</div>


		</div>

		<hr class="hr--small hr--clear">

		<div class="grid">
			<div class="grid__item">
				<p class="site-footer__links alt-font">Copyright © <?php echo date('Y'); ?>, <a href="/" title="">InetShop-MyBoutique</a>. <a href="" data-target="new-window">E-commerce by Me</a></p>
			</div>
		</div>



		<div class="grid">
			<div class="grid__item text-center">
				<ul class="inline-list payment-icons">

<!--					<li>
                   <span class="icon-fallback-text">
                     <span class="icon icon-american_express" aria-hidden="true"></span>
                     <span class="fallback-text">american express</span>
                   </span>
					</li>

					<li>
                   <span class="icon-fallback-text">
                     <span class="icon icon-apple_pay" aria-hidden="true"></span>
                     <span class="fallback-text">apple pay</span>
                   </span>
					</li>-->

					<li>
                   <span class="icon-fallback-text">
                     <span class="icon icon-master" aria-hidden="true"></span>
                     <span class="fallback-text">master</span>
                   </span>
					</li>

					<li>
                   <span class="icon-fallback-text">
                     <span class="icon icon-visa" aria-hidden="true"></span>
                     <span class="fallback-text">visa</span>
                   </span>
					</li>

				</ul>
			</div>
		</div>



	</div>

</footer>

<?php wp_footer(); ?>
</body>
</html>




