<?php  global $phpmailer;

if( !empty( $_POST['comment'] ) || !empty( $_POST['message'] ) ) {
    exit;
}



// подключаем WP, можно конечно обойтись без этого, но зачем?
require( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php');

// следующий шаг - проверка на обязательные поля, у нас это емайл, имя и сообщение
if( !empty( $_POST['name'] )&&!empty( $_POST['phone'] ) && !empty( $_POST['email'] ) && is_email( $_POST['email'] ) && !empty( $_POST['wrapf2'] ) ) {
    //yзнаем IP
    $ip = $_SERVER['REMOTE_ADDR'];

    $txt = $_POST['wrapf2'];

    $message = wordwrap($txt, 80, "<br>\n");


    if (!is_object($phpmailer) || !is_a($phpmailer, 'PHPMailer')) { // проверяем, существует ли объект $phpmailer и принадлежит ли он классу PHPMailer
// если нет, то подключаем необходимые файлы с классами и создаём новый объект
        require_once ABSPATH . WPINC . '/class-phpmailer.php';
        require_once ABSPATH . WPINC . '/class-smtp.php';
        $phpmailer = new PHPMailer(true);
    }


    $phpmailer->ClearAttachments(); // если в объекте уже содержатся вложения, очищаем их
    $phpmailer->ClearCustomHeaders(); // то же самое касается заголовков письма
    $phpmailer->ClearReplyTos();
    $phpmailer->From = $_POST['email']; // от кого, Email
    $phpmailer->FromName = $_POST['name'] ;
    $phpmailer->Subject = 'Contact on ' . get_bloginfo('name'); // тема
    $phpmailer->SingleTo = true; // это означает, что если получателей несколько, то отображаться будет всё равно только один
    $phpmailer->ContentType = 'multipart/mixed'; // тип содержимого письма
    $phpmailer->IsHTML(true);
    $phpmailer->CharSet = 'utf-8'; // кодировка письма
    $phpmailer->ClearAllRecipients(); // очищаем всех получателей
    $phpmailer->AddAddress('' . get_bloginfo('admin_email')); // добавляем новый адрес получателя
    $phpmailer->Body = '<p>Company: ' . $_POST['company'] . '</p>' . '<br><p>Phone: ' . $_POST['phone'] . '</p>' . '<br><p>IP: ' . $ip . ' IP search:' .'<a href=http://whatismyipaddress.com/ip/' . $ip .'>http://whatismyipaddress.com/ip/</a></p>' . '<br><p>' . $message . '</p>';






    //$phpmailer->Send(); // отправка письма
    if($phpmailer->Send()){
        // echo "Ошибка отправки письма: " . $phpmailer->ErrorInfo;

        header('Location:' . get_bloginfo('wpurl')."/contact-us?msg=success" );
        exit;
    }

    header('Location:' . get_bloginfo('wpurl')."/contact-us?msg=error" );
    exit;

}else{
    header('Location:' . get_bloginfo('wpurl')."/contact-us?msg=error" );
    exit;
}

?>






















