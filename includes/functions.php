<?php ob_start();
function artplacer_ajax_del()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'artplacer';
    
    if (isset($_GET['nonce']) && wp_verify_nonce($_GET['nonce'], 'artplacer_del') && isset($_REQUEST['id']) && ctype_digit($_REQUEST['id'])) {
        $wpdb->delete($table_name, array('id' => $_REQUEST['id']));
    }
    die();
}

add_action('wp_ajax_artplacer_del', 'artplacer_ajax_del');
function wpdocs_register_my_custom_menu_page()
{
    add_menu_page(
        __('ArtPlacer', 'textdomain'),
        'ArtPlacer',
        'manage_options',
        'art-placer',
        'art_placer_menu_list',
        plugins_url('artplacer-widget/assets/images/artplacer-menu-icon.png'),
        6
    );
    add_submenu_page('art-placer', 'Add', 'Add',
        'manage_options', 'add-art-placer', 'art_placer_menu_add',
        0,
        6);
    add_submenu_page('art-placer', 'Add', '',
        'manage_options', 'edit-art-placer', 'art_placer_menu_edit',
        1,
        6);
}

add_action('admin_menu', 'wpdocs_register_my_custom_menu_page');

function get_value_between($start, $end, $string)
{
    $ini = strpos($string, $start);
    if ($ini === false) return;

    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

function addUpdateParameter($attribute_name, $value, $string, $replace = false)
{
    $attribute_exists = str_contains($string, $attribute_name . '="');
    if ($attribute_exists && $replace) {
        $current_value = get_value_between($attribute_name . '="', '"', $string);
        return str_replace($attribute_name . '="' . $current_value . '"', $attribute_name . '="' . $value . '"', $string);
    }else if (!$attribute_exists){
        $tag = str_contains($string, '<artplacer') ? '<artplacer' : '[artplacer';
        return str_replace($tag, $tag . ' ' . $attribute_name . '="' . $value . '"', $string);
    }
    return $string;
}

function removeParameter($attribute_name, $string)
{
    $current_value = get_value_between($attribute_name . '="', '"', $string);
    return str_replace(' ' . $attribute_name . '="' . $current_value . '"', '', $string);
}

function shortcodeToHTML($code){
    $shortcode_tag = '[artplacer';

    $first_part = str_replace($shortcode_tag, '<artplacer', substr($code, 0, strlen($shortcode_tag)));
    $last_part = str_replace(']', '></artplacer>', substr($code, -1));
    return $first_part . substr($code, strlen($shortcode_tag), -1) . $last_part;
}

function getArtPlacerWidgetCode($code, $widget = NULL)
{
	$script = shortcodeToHTML($code);
    $product = function_exists('wc_get_product') ? wc_get_product(get_the_ID()) : NULL;

    if ($product && (is_null($widget) || $widget->type == 'dynamic')) {
        $artwork_url = wp_get_attachment_url($product->get_image_id());
        $height = $product->get_height();
        $width = $product->get_width();
        $title = get_the_title();
        $price = $product->get_price();

        $script = addUpdateParameter('artwork', '', $script, true);
        $script = addUpdateParameter('height', $height, $script, true);
        $script = addUpdateParameter('width', $width, $script, true);
        $script = addUpdateParameter('artwork_url', $artwork_url, $script, true);
        $script = addUpdateParameter('title', $title, $script, true);

        if (strpos($script, 'type="1"') != false) {
            $script = removeParameter('space', $script);

            //Add Update Price
            if ($price > 0){
                if (is_null($widget) || $widget->show_price == 'yes') {
                    $script = addUpdateParameter('price', strip_tags(wc_price($price)), $script);
                }
            }

            //Add Update Size
            if (!empty($height)) {
                $get_dimensions_standard = strtolower(get_value_between('dimensions_standard="', '"', $script));
                if ($get_dimensions_standard == "wxh" || (!is_null($widget) && $widget->dimensions == 1))
                    $size = $width . "x" . $height;
                else
                    $size = $height . "x" . $width;
                $script = addUpdateParameter('size', $size, $script);
            }
        }
    }
    else
    {
        $get_size = get_value_between('size="', '"', $script);
        $script = str_replace('size="' . $get_size . '"', '', $script);
        $get_price = get_value_between('price="', '"', $script);
        $script = str_replace('price="' . $get_price . '"', '', $script);
        $get_title = get_value_between('title="', '"', $script);
        $script = str_replace('title="' . $get_title . '"', '', $script);
        $get_url = get_value_between('artwork_url="', '"', $script);
        $script = str_replace('artwork_url="' . $get_url . '"', '', $script);
        $get_height = get_value_between('height="', '"', $script);
        $script = str_replace('height="' . $get_height . '"', '', $script);
    }

    //Remove placement
    $script = addUpdateParameter('placement', '', $script, true);

    //Add Unit if unit it's not already present
    $script = addUpdateParameter('unit', get_option('woocommerce_dimension_unit'), $script);

    //If old Dimensions Standard is set to WxH and new dimensions_standard is not set, add it
    if (!is_null($widget) && $widget->dimensions == 1){
        $script = addUpdateParameter('dimensions_standard', 'WxH', $script);
    }

    $script = preg_replace('/\s+/', ' ', $script);

    if ($widget && $widget->position == 'Floating Sidebar') {
        $script = addUpdateParameter('placement', 'floating', $script, true);
    }

    return $script;
}

function hasArtPlacerWidgets($arts){
    return count($arts) > 0;
}

add_action('woocommerce_after_single_product_summary', 'below_description', 11);
function below_description()
{
    global $wpdb;
    $table_name = $wpdb->prefix . "artplacer";
    $arts = $wpdb->get_results("SELECT * FROM $table_name where position = 'Below Description'");
    if (!hasArtPlacerWidgets($arts)) return;

    echo '<div style="display: block; width: 100%; clear: both">';
    print_widgets($arts);
    echo '</div>';
}

add_action('woocommerce_before_single_product_summary', 'above_description', 5);
function above_description()
{
    global $wpdb;
    $table_name = $wpdb->prefix . "artplacer";
    $arts = $wpdb->get_results("SELECT * FROM $table_name where position = 'Above Description'");
    if (!hasArtPlacerWidgets($arts)) return;

    echo '<div style="display: block; width: 100%; clear: both">';
    print_widgets($arts);
    echo '</div>';
}

add_action('woocommerce_after_add_to_cart_button', 'after_addtocart', 5);
function after_addtocart()
{
    global $wpdb;
    $table_name = $wpdb->prefix . "artplacer";
    $arts = $wpdb->get_results("SELECT * FROM $table_name where position = 'Below Add to cart'");
    if (!hasArtPlacerWidgets($arts)) return;

    echo '<div style="display: block; width: 100%; clear: both">';
    print_widgets($arts);
    echo '</div>';
}

add_action('woocommerce_after_single_product', 'floating');
function floating()
{
    global $wpdb;
    $table_name = $wpdb->prefix . "artplacer";
    $arts = $wpdb->get_results("SELECT * FROM $table_name where position = 'Floating Sidebar'");
    if (!hasArtPlacerWidgets($arts)) return;

    echo '<div class="floating_widget">';
    print_widgets($arts);
    echo '</div>';
}

add_shortcode('artplacer_widget', 'wpdocs_placeart_func');
function wpdocs_placeart_func($atts)
{
    $id = $atts['id'];
    global $wpdb;
    $table_name = $wpdb->prefix . "artplacer";
    $arts = $wpdb->get_results("SELECT * FROM $table_name where id = '$id' and position = 'Shortcode'");
    if (!hasArtPlacerWidgets($arts)) return;

    print_widgets($arts);
}

function print_widgets($widgets){
    $terms = get_the_terms(get_the_ID(), 'product_cat');

    foreach ($widgets as $widget) {
        $excluded_ids = explode(',', $widget->categories);
        foreach ($terms as $term) {
            if (in_array($term->term_id, $excluded_ids)) return;
        }
        echo getArtPlacerWidgetCode($widget->code, $widget);
    }
}

ob_flush();
