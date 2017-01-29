<?php global $mytheme; ?>
<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package inetshop-myboutique
 */

?>


<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"  <?php language_attributes();?>> <![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"  <?php language_attributes();?>> <![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"  <?php language_attributes();?>> <![endif]-->
<!--[if IE 9 ]><html class="ie9 no-js"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html <?php language_attributes();?>  class="supports-js supports-touch supports-csstransforms supports-csstransforms3d supports-fontface wf-adobecaslonpro-n4-active wf-lato-i4-active wf-lato-n4-active wf-active" >
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<title><?php bloginfo('name'); ?><?php wp_title('|'); ?></title>
<meta name="description" content="<?php bloginfo('description'); ?>">

<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<meta content="utf-8" http-equiv="encoding">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>

</head>
<body <?php body_class(); ?>id="" class="template-index">

<div class="loader">
    <div class="loader_inner"></div>
</div>

<!--WP MOBILE NAV MENU-->
<div class="header-bar">
		<div class="wrapper medium-down--hide">
			<div class="post-large--display-table">

				<div class="header-bar__left post-large--display-table-cell">

				</div>

				<div class="header-bar__right post-large--display-table-cell">

				</div>
			</div>
		</div>
		<div class="wrapper mobile-header-bar post-large--hide">
			<button type="button" class="mobile-nav-trigger" id="MobileNavTrigger">
				<span class="icon icon-hamburger" aria-hidden="true"></span>
				Menu
			</button>
			<a href="/cart" class="cart-page-link mobile-cart-page-link">
				<span class="icon icon-cart header-bar__cart-icon" aria-hidden="true"></span>
				Cart <span class="cart-count hidden-count">0</span>
			</a>
		</div>
	<?php if ( has_nav_menu( 'main_menu' ) ) : ?>
		<?php wp_nav_menu(
			array(
				'theme_location' => 'main_menu',
				'menu_class'  => 'mobile-nav post-large--hide',
				'menu_id' => 'MobileNav',
				'container' => 'ul',
				'walker'=>  new MobileMenuWalker()
			) ); ?>
	<?php endif; ?>
</div>
<!--EDN WP MOBILE NAV MENU-->
<header class="site-header" role="banner">
	<div class="wrapper">
		<div class="grid--full">
			<div class="grid__item">
				<h1 class="site-header__logo">
					<a href="/" itemprop="url">
						<img src="<?php bloginfo('template_url'); ?>/img/logo1.png" alt="<?php bloginfo(name); ?>" itemprop="logo">
					</a>
					<div class="header-social">
						<ul class="inline-list social-icons">
							<li>
								<a target="_blank" class="icon-fallback-text" href="<?php echo $mytheme['pinterest']; ?>" title="Youtube">
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
				</h1>
			</div>
		</div>
	</div>
	<div class="wrapper transparent wrapper-banner">
		<div class="grid--full medium-down--hide">
			<div class="grid__item dropdown-wrapper">
<!--WP MAIN NAV MENU-->
				<?php if ( has_nav_menu( 'main_menu' ) ) : ?>
					<?php wp_nav_menu(
						array(
							'theme_location' => 'main_menu',
							'menu_id' => 'accessibleNav',
							'menu_class'  => 'site-nav',
							'container' => 'ul',
							'echo' => true,
							'walker'=>  new mainShopMenuWalker()
						) ); ?>
				<?php endif; ?>
<!--EDN WP MAIN NAV MENU-->
			</div>
		</div>
	</div>
</header><!-- #masthead -->
<?php ?>
	<?php get_sidebar('banner-shop'); ?>
<?php ?>
	<div id="content" class="site-content">
		<main class="wrapper main-content" role="main">
