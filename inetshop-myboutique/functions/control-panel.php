<?php
class ControlPanel {
// set default values
    var $default_settings = array(
        'phone' => '+38 455 587 175',
        'address' => '1100 Chestnut St, VVVancouver, BC V6J 3J9',
        'googlemaps' => 'https://www.google.ca/maps/place/H.+R.+MacMillan+Space+Centre,+1100+Chestnut+St,+Vancouver,+BC+V6J+3J9/@49.2758893,-123.1439784,17z',
        'facebook' =>'http://facebook.com',
        'twitter' =>'http://twitter.com',
        'pinterest' =>'http://pinterest.com',
        'instagram' =>'http://instagram.com',
        'metrika' =>'Owner&#39;s Record',
    );
    var $options;

    function ControlPanel() {
        add_action('admin_menu', array(&$this, 'add_menu'));
        if (!is_array(get_option('themadmin')))
            add_option('themadmin', $this->default_settings);
        $this->options = get_option('themadmin');
    }

    function add_menu() {
        add_theme_page('WP Theme Options', 'Theme InetShop-MyBoutique Options', 8, "themadmin", array(&$this, 'optionsmenu'));
    }

    // save options
    function optionsmenu() {
        if ($_POST['ss_action'] == 'save') {
            $this->options["phone"] = $_POST['cp_phone'];
            $this->options["address"] = $_POST['cp_address'];
            $this->options["googlemaps"] = $_POST['cp_googlemaps'];
            $this->options["facebook"] = $_POST['cp_facebook'];
            $this->options["twitter"] = $_POST['cp_twitter'];
            $this->options["pinterest"] = $_POST['cp_pinterest'];
            $this->options["instagram"] = $_POST['cp_instagram'];
            $this->options["metrika"] = $_POST['cp_metrika'];
            update_option('themadmin', $this->options);
            echo '<div class="updated fade" id="message" style="background-color: rgb(255, 251, 204); width: 400px; margin-left: 17px; margin-top: 17px;"><p>Settings<strong> saved</strong>.</p></div>';
        }
        // Create form options
        echo '<form action="" method="post" class="themeform">';
        echo '<input type="hidden" id="ss_action" name="ss_action" value="save">';

        print '<div class="cptab"><br />
 <b>Theme Company Options</b>
 <br />
 <h3>Contacts</h3>
 <p><input placeholder="Phone" style="width:300px;" name="cp_phone" id="cp_phone" value="'.$this->options["phone"].'"><label> - phone</label></p>
 <p><input placeholder="Address" style="width:300px;" name="cp_address" id="cp_address" value="'.$this->options["address"].'"><label> - address</label></p>
 <p><input placeholder="Link Google Maps" style="width:300px;" name="cp_googlemaps" id="cp_googlemaps" value="'.$this->options["googlemaps"].'"><label> - googlemaps</label></p>
 <h3>Social</h3>
 <p><input placeholder="Link Facebook" style="width:300px;" name="cp_facebook" id="cp_facebook" value="'.$this->options["facebook"].'"><label> - facebook</label></p>
 <p><input placeholder="Link Twitter" style="width:300px;" name="cp_twitter" id="cp_twitter" value="'.$this->options["twitter"].'"><label> - twitter</label></p>
 <p><input placeholder="Link pinterest" style="width:300px;" name="cp_pinterest" id="cp_pinterest" value="'.$this->options["pinterest"].'"><label> - pinterest</label></p>
 <p><input placeholder="Link instagram" style="width:300px;" name="cp_instagram" id="cp_instagram" value="'.$this->options["instagram"].'"><label> - instagram</label></p>
 <h3>Code in the footer.php</h3>
 <p><textarea placeholder="You can register counter codes or additional scripts" style="width:300px;" name="cp_metrika" id="cp_metrika">'.stripslashes($this->options["metrika"]).'</textarea><label> - You can register counter codes or additional scripts</label></p>

 </div><br />';
        echo '<input class="button button-primary" type="submit" value="Save Changes" name="cp_save" class="dochanges" />';
        echo '</form>';
    }
}
$cpanel = new ControlPanel();
$mytheme = get_option('themadmin');
?>
