<?php
get_header();
?>


<?php get_sidebar('slider-goods'); ?>

<?php get_sidebar('services'); ?>


    <h2 class="section-header events-alt-font"><i>Events</i></h2>
    <hr class="strikethrough">


<?php

    $args = array(
        'category_name' => 'Events',
        'posts_per_page' => 1,
        'post__in'  => get_option( 'sticky_posts' ),
        'ignore_sticky_posts' => 1
    );

    $query = new WP_Query($args);

// Цикл
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();?>


<?php echo sprintf('<a href="%s">', esc_url(get_permalink( $id, $leavename ))) ; ?>

      <div class="index-events-single-post one-whole">
        <div class="one-half medium--one-whole small--one-whole inline left">

            <?php    echo get_the_post_thumbnail();

echo '</div><div class="one-half medium--one-whole small--one-whole inline left">
            <p></p>
            <p style="text-align: left;">';

            the_excerpt();
            

echo '</p>
        </div>
      </div>
    </a>';
        }
    } else {
        // the posts haven't found
    }

    wp_reset_query();

?>


    
    </div>
    </div>


<?php
//get_sidebar();
get_footer();?>

