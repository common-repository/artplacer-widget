<?php
//if(!defined('ABSPATH')) {
//die('You are not allowed to call this page directly.');
//}
//$post_type = isset($_GET['post_type']) ? sanitize_key($_GET['post_type']) : '';
//if (!in_array($post_type, get_post_types())) { die('Invalid post type.'); }
$post_type = 'product';
?>
<!DOCTYPE html>
<html>
<head>
    <title><?php _e('ArtPlacer Widget', 'artplacerwidget'); ?></title>
    <meta http-equiv="Content-Type"
          content="<?php bloginfo('html_type'); ?>; charset=<?php echo get_option('blog_charset'); ?>"/>
    <base target="_self"/>
    <link type="text/css" rel="stylesheet" href="<?php echo WP_ARTPLACER_WIDGET_URL . 'assets/css/tippy.css' ?>"/>
    <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@5.2.1/dist/styles.css">
    <style> body {
            font-size: 13px;
            letter-spacing: 0.3px;
            background-color: #f1f1f1;
            padding: 0 16px !important;
        }

        h1 {
            text-align: center;
            margin-bottom: 0;
        }

        input[type=text] {
            height: 20px;
            line-height: 20px;
            font-size: 11px !important;
            text-indent: 3px;
        }

        h3 {
            margin-bottom: 3px !important;
            text-transform: uppercase;
            font-size: 14px;
            letter-spacing: 1px;
            color: #0a0a0a !important;
        }

        header p {
            margin: 0 0 10px 0;
            text-align: center;
            font-size: 11px;
            letter-spacing: 0;
            font-style: italic;
            color: #4a4a4a;
        }

        .panel header p, .acf p, .fixed p {
            text-align: left;
            font-style: italic;
            font-size: 13px;
            color: #4a4a4a;
        }

        .data_source {
            margin-top: 20px;
        }

        .data_source.woocommerce p {
            margin: 0 0 10px 0;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            padding: 3px 6px;
            border: #E0233C 1px solid;
            background-color: #ffffff;
            color: #4a4a4a;
            text-align: center;
        }

        header {
            margin-bottom: 12px;
        }

        .panel {
            margin-bottom: 20px;
        }

        .data_source:after,
        .panel:after {
            content: "";
            display: block;
            overflow: hidden;
            clear: both;
        }

        .data_source, .sample, .client {
            display: none;
        }

        .visible {
            display: block;
        }

        div.field {
            overflow: hidden;
            float: left;
            margin-right: 19px;
            height: 29px;
        }

        label {
            font-style: italic;
        }

        label.title {
            font-style: normal;
            font-weight: bold;
            color: #0a0a0a !important;
        }

        button {
            background-color: #E0233C;
            color: #ffffff;
            display: block;
            width: 100%;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            border: 0;
            height: 28px;
            line-height: 28px;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 13px;
            cursor: pointer;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            letter-spacing: 1px;
        }

        button:hover {
            background-color: #E0233C;
            opacity: 0.7;
        }
    </style>
</head>
<body>
<div>
    <div class="panel-holder">
        <header>
            <h1><img src="<?php echo WP_ARTPLACER_WIDGET_URL . 'assets/images/logo-white.png' ?>"></h1>
            <p>Enter the required information to insert the widget in your website!</p>
        </header>
        <div class="panel widget-type">
            <header><h3>General</h3></header>
            <div class="form">
                <div class="">
                    <label class="title">Add Widget HTML Code *</label>
                    <textarea maxlength="12" title="Get it from the Gallery section in your ArtPlacer dashboard."
                              type="text" name="gallery" style="    width: 100%;min-height: 200px;"
                              class="tooltip required"> </textarea>
                </div>
                <div class="field tabs">
                    <label class="title">Widget Type*</label>
                    <input type="radio" id="widget_type_1" data-ref="client" name="widget_type" value="1"
                           checked="checked"><label for="widget_type_1">Dynamic</label>
                    <input type="radio" id="widget_type_2" data-ref="sample" name="widget_type" value="2"><label
                            for="widget_type_2">Not specified</label>
                </div>
            </div>
        </div>
        <div class="panel">
            <header><h3>Settings</h3></header>
            <div class="form">
                <div class="field">
                    <label class="title">Position</label>
                    <select>
                        <option>Before Description</option>
                        <option>After Description</option>
                        <option>Floating Sidebar</option>
                    </select>
                </div>
            </div>
        </div>
        <div>
            <button class="submit">insert widget</button>
        </div>
    </div>
</div>
<script type="text/javascript" src="<?php echo site_url(); ?>/wp-includes/js/jquery/jquery.js"></script>
<script type="text/javascript" src="<?php echo site_url(); ?>/wp-includes/js/tinymce/tiny_mce_popup.js"></script>
<script type="text/javascript" src="<?php echo site_url(); ?>/wp-includes/js/tinymce/utils/form_utils.js"></script>
<script type="text/javascript" src="<?php echo WP_ARTPLACER_WIDGET_URL; ?>assets/js/tippy.js"></script>
<script>
    jQuery(document).ready(function () {
        tippy('.tooltip', {
            arrow: true,
            arrowType: 'sharp',
            animation: 'scale',
            placement: 'bottom',
            zIndex: 9999991
        });
        jQuery('input[type=radio]').bind('change', function (e) {
            jQuery('.' + this.name + '.visible').removeClass('visible');
            jQuery('.' + jQuery(this).data('ref')).addClass('visible')
        });

        jQuery('input[name="data_source"]:first').attr('checked', true).trigger('change');

        jQuery('input.integer').bind('keydown', function (e) {
            var controlKeys = [8, 37, 39, 46],
                keyCode = e.which || e.keyCode;
            return controlKeys.indexOf(keyCode) > -1 || isInteger(e.key);
        });
        jQuery('button').bind('click', function () {
            var galleryId = document.querySelector('input[name=gallery]').value,
                spaceId = document.querySelector('input[name=space]').value,
                widgetType = document.querySelector('input[name=widget_type]:checked').value,
                dataSource = jQuery('input[name=data_source]:checked').val(),
                height = document.querySelector('input[name=height]').value,
                height_field = jQuery('select[name=height_field]').val(),
                ready = isInteger(galleryId)
                    && (widgetType == '1' || isInteger(spaceId))
                    && (dataSource == 'woocommerce' || (dataSource == 'acf' && height_field) || isInteger(height));
            if (ready) {
                insert(widgetType, dataSource);
                return;
            }
            if (!isInteger(galleryId)) {
                alert('Please enter your gallery id.');
                document.querySelector('input[name=gallery]').focus();
                return;
            }
            if (widgetType == '2' && !isInteger(spaceId)) {
                alert('Please enter a space id.');
                document.querySelector('input[name=space]').focus();
                return;
            }
            if (dataSource == 'acf' && !height_field) {
                alert('Please select an ACF height field.');
                document.querySelector('select[name=height_field]').focus();
                return;
            }
            if (dataSource == null && !isInteger(height)) {
                alert('Please enter a height for your artwork in inches.');
                document.querySelector('input[name=height]').focus();
            }
        });

        function isInteger(value) {
            return parseInt(value) > 0
        }

        function insert(widget_type, data_source) {
            var required = ' gallery="' + document.querySelector('input[name=gallery]').value + '" type="' + widget_type + '"',
                price = document.querySelector('input[name=price]').value,
                size = document.querySelector('input[name=size]').value,
                height = document.querySelector('input[name=height]').value,
                text = document.querySelector('input[name=text]').value,
                classname = document.querySelector('input[name=classname]').value,
                lang = document.querySelector('select[name=lang]').value,
                resizable = document.querySelector('input[name=resizable]:checked').value,
                frames = document.querySelector('input[name=frames]:checked').value,
                catalog = document.querySelector('input[name=catalog]:checked').value,
                height_field = jQuery('select[name=height_field]').val(),
                price_field = jQuery('select[name=price_field]').val(),
                size_field = jQuery('select[name=size_field]').val(),
                optional = '', shortcode;
            optional += data_source ? ' source="' + data_source + '"' : '';
            optional += widget_type == '2' ? ' space="' + document.querySelector('input[name=space]').value + '"' : '';
            optional += widget_type == '1' && price ? ' price="' + price + '"' : '';
            optional += widget_type == '1' && size ? ' size="' + size + '"' : '';
            optional += data_source == 'acf' ? ' height_field="' + height_field + '"' : '';
            optional += data_source == 'acf' && size_field ? ' size_field="' + size_field + '"' : '';
            optional += data_source == 'acf' && price_field ? ' price_field="' + price_field + '"' : '';
            optional += height ? ' height="' + height + '"' : '';
            optional += text ? ' text="' + text + '"' : '';
            optional += classname ? ' classname="' + classname + '"' : '';
            optional += lang ? ' lang="' + lang + '"' : '';
            optional += resizable ? ' resizable="' + resizable + '"' : '';
            optional += frames ? ' frames="' + frames + '"' : '';
            optional += catalog ? ' catalog="' + catalog + '"' : '';
            shortcode = '[artplacer' + required + optional + ']';
            if (window.tinyMCE) {
                var tmce_ver = window.tinyMCE.majorVersion;
                if (tmce_ver >= "4") {
                    window.tinyMCE.execCommand('mceInsertContent', false, shortcode);
                } else {
                    window.tinyMCE.execInstanceCommand(window.tinyMCE.activeEditor.id, 'mceInsertContent', false, shortcode);
                }
                tinyMCEPopup.editor.execCommand('mceRepaint');
                tinyMCEPopup.close();
            }
        }
    })
</script>
</body>
</html>