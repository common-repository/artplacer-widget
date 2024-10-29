<?php
global $wpdb;

if (isset($_POST['save']) && wp_verify_nonce($_POST['nonce'], 'add')) {
    $title = $_POST['title'];
    $code = $_POST['code'];
    $position = $_POST['position'];

    if (isset($_POST['categories']) && is_array($_POST['categories'])) {
        $categories = implode(',', $_POST['categories']);
    } else {
        $categories = "";
    }

    $table_name = $wpdb->prefix . 'artplacer';
    $wpdb->insert(
        $table_name,
        array(
            'name' => wp_unslash($title),
            'type' => 'dynamic',
            'code' => wp_unslash($code),
            'inches' => '',
            'show_price' => 'Yes',
            'position' => $position,
            'categories' => $categories
        )
    );
    wp_redirect(site_url() . '/wp-admin/admin.php?page=art-placer');
    ?>
    <script>
        window.location.href = "<?php echo site_url(); ?>/wp-admin/admin.php?page=art-placer"; </script>
    <?php
    exit;
}
$dimension_unit = get_option('woocommerce_dimension_unit');

?>
<link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@5.2.1/dist/styles.css">
<div id="app" style="visibility: visible;">
    <div class="Polaris-Page">
        <div class="Polaris-Page-Header">
            <div class="Polaris-Page-Header__MainContent">
                <div class="Polaris-Page-Header__TitleActionMenuWrapper">
                    <div>
                        <div class="Polaris-Header-Title__TitleAndSubtitleWrapper">
                            <div class="Polaris-Header-Title"><h1
                                        class="Polaris-DisplayText Polaris-DisplayText--sizeLarge">Create Widget</h1>
                                <span class="Polaris-TextStyle--variationSubdued secondsection" style="">Generate the widget code with the Widget Generator in your ArtPlacer Dashboard and paste it in the box below.</span>
                                <p style="font-size: 13px">Don't have an account yet? <a href="https://www.artplacer.com/signup/"
                                                                 target="_blank" class="title">Click here</a></p>
                                <p style="font-size: 13px"><a href="https://help.artplacer.com/support/solutions/articles/65000180484-inserting-widgets-into-wordpress-woocommerce-"
                                            target="_blank">Need help? Check out this tutorial</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Polaris-Page-Header__PrimaryActionWrapper">
                    <a href="<?php echo site_url(); ?>/wp-admin/admin.php?page=art-placer" class="Polaris-Button Cancle">
                        <span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Cancel</span></span>
                    </a>
                </div>
            </div>
        </div>
        <div class="Polaris-Page__Content">
            <div class="Polaris-Card">
                <div class="Polaris-Card__Section">
                    <form method="post" action="">
                        <?php
                        $nonce = wp_create_nonce('add');
                        ?>
                        <input type="hidden" name="nonce" value="<?php echo $nonce; ?>" />
                        <div class="Polaris-FormLayout">
                            <div class="Polaris-FormLayout__Item">
                                <div class="firstsection" style="display: none;">
                                    <div class="Polaris-TextContainer">
                                        <h2 class="Polaris-Heading">Let's create new widget for your site.</h2>
                                        <p class="firstheading">Click on the button below to get started.</p>
                                    </div>
                                    <button type="button" class="Polaris-Button addwidget"><span
                                                class="Polaris-Button__Content"><span class="Polaris-Button__Text">Create New Widget</span></span>
                                    </button>
                                </div>
                            </div>
                            <div class="Polaris-FormLayout__Item secondsection" style="">
                                <div class="Polaris-Labelled__LabelWrapper">
                                    <div class="Polaris-Label">
                                        <label id="PolarisTextField9Label" for="PolarisTextField9"
                                               class="Polaris-Label__Text">Name</label>
                                    </div>
                                </div>
                                <div class="Polaris-Connected">
                                    <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                        <div class="Polaris-TextField">
                                            <input id="PolarisTextField9" type="text"
                                                   aria-labelledby="PolarisTextField8Label" name="title"
                                                   aria-invalid="false" aria-multiline="false" value=""
                                                   required="required" class="Polaris-TextField__Input">
                                            <div class="Polaris-TextField__Backdrop"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="Polaris-Labelled__LabelWrapper">
                                    <div class="Polaris-Label">
                                        <label id="PolarisTextField4Label"
                                               for="PolarisTextField4"
                                              class="Polaris-Label__Text">Button Code</label>
                                    </div>
                                </div>
                                <div class="Polaris-Connected">
                                    <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                        <div class="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline">
                                            <textarea name="code" id="PolarisTextField4"
                                                      aria-labelledby="PolarisTextField4Label" aria-invalid="false"
                                                      aria-multiline="true" required="required"
                                                      class="Polaris-TextField__Input"
                                                      style="height: 108px;"></textarea>&gt;
                                            <div class="Polaris-TextField__Backdrop"></div>
                                            <div aria-hidden="true" class="Polaris-TextField__Resizer">
                                                <div class="Polaris-TextField__DummyInput"><br></div>
                                                <div class="Polaris-TextField__DummyInput"><br><br><br><br></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a class="red" target="_blank" href="https://app.artplacer.com/widget/create?p=wordpress" style="display: flex;">What goes here?</a>
                                <input type="hidden" value="<?php echo is_plugin_active( 'elementor/elementor.php' ); ?>">
                                <?php
                                if (is_plugin_active( 'elementor/elementor.php' )) {
                                ?>
                                    <input type="hidden" name="position" value="Shortcode" />
                                <?php
                                }else{
                                ?>
                                    <div class="Polaris-Labelled__LabelWrapper">
                                        <div class="Polaris-Label">
                                            <label id="PolarisSelect3Label" for="PolarisSelect3"
                                                   class="Polaris-Label__Text">
                                                Widget Position</label></div>
                                    </div>
                                    <div class="Polaris-Select"><select id="PolarisSelect3" aria-invalid="false"
                                                                        class="Polaris-Select__Input" name="position">
                                            <option value="Above Description">Above Description</option>
                                            <option value="Below Description">Below Description</option>
                                            <option value="Below Add to cart">Below Add to cart</option>
                                            <option value="Floating Sidebar">Floating</option>
                                        </select>
                                        <div aria-hidden="true" class="Polaris-Select__Content"><span
                                                    class="Polaris-Select__SelectedOption selectposition">Above Description</span><span
                                                    class="Polaris-Select__Icon"><span class="Polaris-Icon"><svg
                                                            viewBox="0 0 20 20" focusable="false" aria-hidden="true"
                                                            class="Polaris-Icon__Svg"><path
                                                                d="M13 8l-3-3-3 3h6zm-.1 4L10 14.9 7.1 12h5.8z"
                                                                fill-rule="evenodd"></path></svg></span></span></div>
                                        <div class="Polaris-Select__Backdrop"></div>
                                    </div>
                                <?php
                                }
                                ?>
                                <div>
                                    <div class="Polaris-Labelled__LabelWrapper">
                                        <div class="Polaris-Label"><label id="PolarisOptionList"
                                                                          for="PolarisOptionList4-0"
                                                                          class="Polaris-Label__Text">Exclude
                                                collections</label></div>
                                    </div>
                                    <ul class="Polaris-OptionList">
                                        <?php $orderby = 'name';
                                        $order = 'asc';
                                        $hide_empty = false;


                                        global $sitepress;

                                        // remove WPML term filters
                                        remove_filter('get_terms_args', array($sitepress, 'get_terms_args_filter'));
                                        remove_filter('get_term', array($sitepress, 'get_term_adjust_id'));
                                        remove_filter('terms_clauses', array($sitepress, 'terms_clauses'));

                                        $cat_args = array(
                                            'orderby' => $orderby,
                                            'order' => $order,
                                            'hide_empty' => $hide_empty,
                                            'lang' => 'de',
                                        );
                                        $product_categories = get_terms('product_cat', $cat_args);
                                        // restore WPML term filters
                                        add_filter('terms_clauses', array($sitepress, 'terms_clauses'));
                                        add_filter('get_term', array($sitepress, 'get_term_adjust_id'));
                                        add_filter('get_terms_args', array($sitepress, 'get_terms_args_filter'));


                                        foreach ($product_categories as $key => $category) { ?>
                                            <li>
                                                <ul id="PolarisOptionList4-0" aria-multiselectable="true"
                                                    class="Polaris-OptionList__Options">
                                                    <li tabindex="-1" class="Polaris-OptionList-Option"><label
                                                                for="<?= $category->term_id; ?>"
                                                                class="Polaris-OptionList-Option__Label">
                                                            <div class="Polaris-OptionList-Option__Checkbox">
                                                                <div class="Polaris-OptionList-Checkbox"><input
                                                                            name="categories[]"
                                                                            id="<?= $category->term_id; ?>"
                                                                            type="checkbox" aria-checked="false"
                                                                            class="Polaris-OptionList-Checkbox__Input"
                                                                            value="<?= $category->term_id; ?>">
                                                                    <div class="Polaris-OptionList-Checkbox__Backdrop"></div>
                                                                    <div class="Polaris-OptionList-Checkbox__Icon"><span
                                                                                class="Polaris-Icon"><svg
                                                                                    viewBox="0 0 20 20"
                                                                                    focusable="false" aria-hidden="true"
                                                                                    class="Polaris-Icon__Svg"><path
                                                                                        d="M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.436.436 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path></svg></span>
                                                                    </div>
                                                                </div>
                                                            </div><?= $category->name; ?>
                                                        </label></li>
                                                </ul>
                                            </li>
                                        <?php } ?>
                                    </ul>
                                </div>
                                <button type="submit" name="save" class="Polaris-Button addwidget"><span
                                            class="Polaris-Button__Content"><span class="Polaris-Button__Text">Save Widget</span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
