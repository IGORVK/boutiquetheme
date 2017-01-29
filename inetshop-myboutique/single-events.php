<?php get_header();?>

<div class="grid">
        <div class="grid__item">

<div class="grid">

      <article class="grid__item three-quarters" itemscope="" itemtype="">

        <header class="section-header">
          <h1 class="section-header__title"><?php  the_title(); ?></h1>
        </header>

            <p>
              <time datetime="<?php the_time('Y-m-j'); ?>"><?php the_time('F j, Y'); ?> </time>
            </p>

            <div class="rte" itemprop="articleBody">
                <?php  the_excerpt(); ?>

                <?php

                    while ( have_posts() ) : the_post();
                        echo get_the_post_thumbnail();
                        get_template_part( 'template-parts/content', get_post_format() );

                    endwhile; // End of the loop.


                ?>

            </div>

            <hr class="hr--small">

           <div class="social-sharing normal" data-permalink="">

              <a href="http://www.facebook.com/sharer.php?u=<?php esc_url(the_permalink());?>&amp;t=<?php the_title(); ?>"  title="Share this post on Facebook!" onclick="window.open(this.href); return false;" target="_blank" class="share-facebook">
                  <span class="icon icon-facebook"></span>
                  <span class="share-title">Share</span>
              </a>

              <a href="http://twitter.com/home?status=Reading: <?php esc_url(the_permalink()); ?>" title="Share this post on Twitter!" target="_blank" class="share-twitter">
                  <span class="icon icon-twitter"></span>
                  <span class="share-title">Tweet</span>
                  <span class="share-count">0</span>
              </a>

              <a  href="https://plus.google.com/share?url=<?php esc_url(the_permalink()); ?>" target="_blank"class="share-google">
                  <!-- Cannot get Google+ share count with JS yet -->
                  <span class="icon icon-google"></span>
                  <span class="share-count is-loaded">+1</span>
              </a>

          </div>

              <hr class="hr--small">

               <?php
;
               the_post_navigation( array(
                  'next_text' => '<span class="meta-nav right" aria-hidden="true">Newer Post →</span> ',
                  'prev_text' => '<span class="meta-nav left" aria-hidden="true">← Older Post</span> ',
                  'in_same_term' => true,
                  'screen_reader_text'=> 'A',) );


       ?>

      </article>

      <aside class="sidebar grid__item one-quarter">
          <h3>Recent Articles</h3>

          <?php

          if ( have_posts() ) :
          $id='events'; // ID заданной рубрики
          $n=5;   // количество выводимых записей
          $recent = new WP_Query("category_name=$id&showposts=$n");
          while($recent->have_posts()) : $recent->the_post();
              ?>
              <p><a href="<?php esc_url(the_permalink()); ?>"><?php the_title(); ?></a><br>
                  <time   datetime="<?php the_time('Y-m-j'); ?>"><em class="text-light"><?php the_time('F j, Y'); ?> </em></time>
              </p>
          <?php endwhile;
              endif;
          wp_reset_query(); ?>


      </aside>



        </div>
     </div>
</div>
<?php get_footer();?>
