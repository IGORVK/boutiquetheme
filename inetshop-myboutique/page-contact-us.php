<?php get_header();?>

<main class="wrapper main-content" role="main">
    <div class="grid">
        <div class="grid__item">

          <div class="grid">

  <div class="grid__item post-large--two-thirds push--post-large--one-sixth">

    <div class="section-header">
      <h1 class="section-header--title">Contact Us</h1>
    </div>

    <div class="rte">
      <meta charset="utf-8"><meta charset="utf-8">
<div style="text-align: center;">Phone: <a href="tel:<?php echo $mytheme['phone']; ?>"><?php echo $mytheme['phone']; ?></a>
</div>
<div style="text-align: center;">Email: <a href="mailto:<?php bloginfo(admin_email ); ?>"><?php bloginfo(admin_email ); ?></a>
</div>
<div style="text-align: center;">
    <h3><?php bloginfo('name') ?></h3>
    <p><?php echo $mytheme['address']; ?></p>
</div>
<div style="text-align: center;">&nbsp;</div>
<div class="wpcf7">
<div class="screen-reader-response" style="text-align: center;"></div>

<h2 style="text-align: center;">YOUR PERSONAL DETAILS</h2>

</div>
    </div>

    <div>

      <form method="post" action="<?php bloginfo(template_url); ?>/send.php"   enctype="multipart/form-data" id="contact_form" class="contact-form" accept-charset="UTF-8">



        <label for="ContactFormName" class="label--hidden">Name</label>
        <input type="text" id="ContactFormName" name="name" placeholder="Name" autocapitalize="words" value=""  minlength="2" maxlength="30" title="Your Name" required="required">

        <label for="ContactFormEmail" class="label--hidden">Email</label>
        <input type="email" id="ContactFormEmail" name="email" placeholder="Email" pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"  autocorrect="off" autocapitalize="off" value="" maxlength="30"  title="Your E-mail: example@email.com"  required="required">


        <label for="ContactFormPhone" class="label--hidden">Phone Number</label>
        <input type="tel" id="ContactFormPhone" name="phone" placeholder="Phone Number" pattern="(\+?\d[- .]*){7,13}" value="" title="International, national or local telephone number" required="required">


        <label for="ContactFormMessage" class="label--hidden">Message</label>
          <textarea rows="10" name="comment" placeholder="Message"></textarea>
          <textarea rows="10" name="message" placeholder="Message"></textarea>
          <textarea rows="10" name="wrapf2"  placeholder="Message"></textarea>




          <div class="security-question">

              <?php
              /*
               * Тут мы будем обрабатывать ошибки и выводить соответствующие сообщения
               */
              if( isset( $_GET['msg'] ) ) {
                  // в случае успеха
                  if( $_GET['msg'] == 'success' )
                      echo '<span  class="msg-appear">Your message was sent successfully</span>';

                  // в случае ошибки
                  if( $_GET['msg'] == 'error' )
                      echo '<span class="msg-appear"><strong>Your message was not sent because the field Message hasn\'t been filled<strong></span>';
                  // вы сами можете добавить различные другие сообщения об ошибках

              }

              /*
               * Антиспам-трюк
               * у нас есть два фейковых поля, при заполнении которых прерывается выполнение скрипта
               * сделаем так, чтобы они были скрыты для пользователей при помощи CSS
               */
              echo '<style>textarea[name="comment"],textarea[name="message"]{display:none}</style>';
              ?>
              <input type="submit" class="btn right" value="Send">

          </div>

      </form>

   </div>
 </div>
</div>


        </div>
    </div>
  </main>


<?php get_footer(); ?>