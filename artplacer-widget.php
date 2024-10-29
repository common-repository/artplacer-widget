<?php
/*
Plugin Name: ArtPlacer
Plugin URI: https://wordpress.org/plugins/artplacer-widget/
Description: Display the ArtPlacer widget into your products or posts.
Version: 2.21.7
Author: ArtPlacer
Author URI: http://www.artplacer.com
*/
function artplacer_install()
{
    global $wpdb;
    global $jal_db_version;
    $table_name = $wpdb->prefix . 'artplacer';
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		type tinytext NOT NULL,
		name tinytext,
		code text NOT NULL,
		position tinytext NOT NULL,
		inches tinytext,
		show_price tinytext,
		dimensions mediumint(9),
		categories tinytext,
		PRIMARY KEY  (id)
	) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    add_option('jal_db_version', $jal_db_version);
}

function artplacer_update_db_check()
{
    global $jal_db_version;
    global $wpdb;
    $table_name = $wpdb->prefix . 'artplacer';
    $row = $wpdb->get_results("SELECT * FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name = '" . $table_name . "' AND column_name = 'show_price'");
    if (empty($row)) {
        $wpdb->query("ALTER TABLE " . $table_name . " ADD show_price tinytext NOT NULL DEFAULT 'yes'");
    }
    if (get_site_option('jal_db_version') != $jal_db_version) {
        artplacer_install();
    }
}

add_action('upgrader_process_complete', 'artplacer_update_db_check');
add_action('plugins_loaded', 'artplacer_update_db_check');

function artplacer_uninstall()
{
    //codes to perform during unistallation
    global $wpdb;
    global $jal_db_version;
    $table_name = $wpdb->prefix . 'artplacer';
    $wpdb->query("DROP TABLE IF EXISTS $table_name");
}

register_uninstall_hook(__FILE__, 'artplacer_uninstall');
register_activation_hook(__FILE__, 'artplacer_install');
add_action('admin_enqueue_scripts', 'callback_for_setting_up_scripts');
function callback_for_setting_up_scripts()
{
    wp_register_style('css1', 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css');
    wp_enqueue_style('css1');
    wp_register_style('custom_style', plugins_url('assets/css/style.css', __FILE__));
    wp_enqueue_style('custom_style');
    wp_register_script('custom_script', plugins_url('assets/js/custom.js', __FILE__));
    wp_enqueue_script('custom_script');
}

add_action('wp_enqueue_scripts', 'callback_for_setting_up_scripts_front');
function callback_for_setting_up_scripts_front()
{
    wp_register_style('custom_style', plugins_url('assets/css/front.css', __FILE__));
    wp_enqueue_style('custom_style');
    wp_enqueue_script('artplacer', 'https://widget.artplacer.com/js/script.js', [], false, true);
    wp_enqueue_script(
        'artplacer-widget-front',
        plugins_url('assets/js/artplacer-widget-front.js', __FILE__),
        ['artplacer'],
        false,
        true
    );
}

include(plugin_dir_path(__FILE__) . 'includes/functions.php');
function artplacer_widget_is_client_room($type)
{
    return $type == '1';
}

/**
 * Display a custom menu page
 */
function art_placer_menu_list()
{
    include(plugin_dir_path(__FILE__) . 'includes/list.php');
    die();
}

function art_placer_menu_add()
{
    include(plugin_dir_path(__FILE__) . 'includes/add.php');
    die();
}

function art_placer_menu_edit()
{
    include(plugin_dir_path(__FILE__) . 'includes/edit.php');
    die();
}

add_shortcode('artplacer', 'artplacer_shortcode');
function artplacer_shortcode($attrs){
    //todo: This should be the other way round: The HTML become an associative array
    $flattened = $attrs;
    array_walk($flattened, function(&$value, $key) {
        $value = "{$key}=\"{$value}\"";
    });
    $code = '<artplacer ' . implode(' ', $flattened) . '></artplacer>';

    return getArtPlacerWidgetCode($code);
}

global $woocommerce;

function add_artplacer_widget_plugin($plugin_array)
{
    $plugin_array['artplacerwidget'] = WP_ARTPLACER_WIDGET_URL . 'assets/js/artplacer-widget.js';
    return $plugin_array;
}

if (!function_exists('is_woocommerce_activated')) {
    function is_woocommerce_activated()
    {
        return class_exists('woocommerce');
    }
}

if (!function_exists('is_acf_activated')) {
    function is_acf_activated()
    {
        return class_exists('ACF');
    }
}

add_action('wp_footer', 'artplacer_product_variations');
function artplacer_product_variations(){
    global $product;
    if (is_woocommerce_activated() && is_single() && is_a($product, 'WC_Product_Variable')){
        $variations = $product->get_available_variations();
        echo '<input type="hidden" id="ar_available_product_variations" value="' . htmlspecialchars(json_encode($variations)) . '" />';
    }
}

define('WP_ARTPLACER_WIDGET_URL', plugin_dir_url(__FILE__));

?>