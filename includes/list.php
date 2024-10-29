<?php global $wpdb;
$table_name = $wpdb->prefix . "artplacer";
$arts = $wpdb->get_results("SELECT * FROM $table_name");

$nonce = wp_create_nonce('artplacer_del');

// Generate the URL
$delete_url = add_query_arg(array(
    'action' => 'artplacer_del',
    'nonce' => $nonce,
), admin_url('admin-ajax.php'));
?>
<style>
    header.log {
        margin-top: 20px;
    }

    div.shortcode-main {
        margin: 0 10px;
        font-weight: bold;
        cursor: pointer;
    }

    .position_main.sec_Shortcode {
        display: flex;
        min-height: 22px;
    }

    .tooltip {
        position: relative;
        display: inline-block;

    }

    div.shortcode-main:hover {
        border-bottom: 1px solid;
        max-width: 220px;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 300px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 7px 30px;
        position: absolute;
        z-index: 9;
        left: 0;
        right: 0;
        top: -50px;
        font-weight: normal;
        letter-spacing: normal;
        font-size: 14px;
        line-height: 18px;
    }

    .tooltip .tooltiptext:before {
        content: "";
        width: 15px;
        height: 15px;
        display: inline-block;
        position: absolute;
        bottom: -7px;
        background: #000;
        transform: rotate(45deg);
        z-index: -1;
        left: 11px;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .Polaris-ResourceItem__Container {
        padding: 3.2rem 2rem !important;
    }
</style>
<link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@5.2.1/dist/styles.css">
<header class="log">
    <h1><img src="<?php echo WP_ARTPLACER_WIDGET_URL . 'assets/images/logo-white.png' ?>"></h1>
    <p></p>
</header>
<main role="main">
    <input type="hidden" id="delete_url" value="<?php echo $delete_url?>" />
    <div id="load" style="visibility: visible;"></div>
    <div id="app" style="visibility: visible;">
        <div class="Polaris-Page">
            <div class="Polaris-Page-Header">
                <div class="Polaris-Page-Header__MainContent">
                    <div class="Polaris-Page-Header__TitleActionMenuWrapper">
                        <div>
                            <div class="Polaris-Header-Title__TitleAndSubtitleWrapper">
                                <div class="Polaris-Header-Title"><h1
                                            class="Polaris-DisplayText Polaris-DisplayText--sizeLarge">Installed
                                        Widgets</h1></div>
                            </div>
                        </div>
                    </div>
                    <div class="Polaris-Page-Header__PrimaryActionWrapper"><a
                                href="<?php echo site_url(); ?>/wp-admin/admin.php?page=add-art-placer"
                                class="Polaris-Button addwidget"><span class="Polaris-Button__Content"><span
                                        class="Polaris-Button__Text">Start Creating Widgets</span></span></a></div>
                </div>
            </div>
            <div class="Polaris-Page__Content">
                <div class="Polaris-Card">
                    <div class="Polaris-Card__Section">
                        <div class="Polaris-ResourceList__ResourceListWrapper">
                            <ul aria-live="polite" class="Polaris-ResourceList">
                                <?php if (count($arts) <= 0) { ?>
                                    <li class="Polaris-ResourceList__ItemWrapper">
                                        <div class="Polaris-ResourceItem" data-href="">
                                            <div class="Polaris-ResourceItem__Container">
                                                No widgets installed.
                                            </div>
                                        </div>
                                    </li>
                                <?php } else {
                                    foreach ($arts as $art) { ?>
                                        <li class="Polaris-ResourceList__ItemWrapper">
                                            <div data-href="" class="Polaris-ResourceItem">
                                                <div id="widget.id" class="Polaris-ResourceItem__Container">
                                                    <div class="Polaris-ResourceItem__Owned">
                                                        <div class="Polaris-ResourceItem__Media"><a
                                                                    href="<?php echo site_url(); ?>/wp-admin/admin.php?page=edit-art-placer&id=<?php echo $art->id; ?>"><span
                                                                        aria-label="Mae Jemison" role="img"
                                                                        class="Polaris-Avatar Polaris-Avatar--sizeMedium"><span
                                                                            class="Polaris-Avatar__Initials"><i
                                                                                class="zmdi zmdi-puzzle-piece"></i></span></span></a>
                                                        </div>
                                                    </div>
                                                    <div class="Polaris-ResourceItem__Content">
                                                        <a href="<?php echo site_url(); ?>/wp-admin/admin.php?page=edit-art-placer&id=<?php echo $art->id; ?>">
                                                            <h3>
                                                                <span class="Polaris-TextStyle--variationStrong title"><?php echo esc_attr($art->name); ?></span>
                                                            </h3>
                                                            <div class="position_main sec_<?= $art->position; ?>"><?= $art->position; ?>
                                                                <?php if ($art->position == "Shortcode") { ?>:
                                                                <div class="shortcode-main tooltip" data-id="artcode_<?= $art->id; ?>">
                                                                    <b id="artcode_<?= $art->id; ?>">[artplacer_widget id="<?= $art->id; ?>"]</b>
                                                                    <span class="tooltiptext">Copy and paste Shortcode on your Elementor editor.</span>
                                                                </div>
                                                                <?php } ?>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div class="icons_div del" data-id="<?php echo $art->id; ?>">
                                                        <i class="zmdi zmdi-delete delet_button"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    <?php }
                                } ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
    document.querySelectorAll('.shortcode-main').forEach(function(element){
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            const containerid = element.dataset.id;
            const tooltip = document.getElementById(containerid).parentElement.querySelector('.tooltiptext');

            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(document.getElementById(containerid));
                range.select().createTextRange();
                document.execCommand("copy");
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNode(document.getElementById(containerid));
                window.getSelection().addRange(range);
                document.execCommand("copy");
            }

            if (tooltip){
                const tooltip_text = tooltip.innerText;
                tooltip.innerHTML = 'Copied!';
                setTimeout(function(){
                    tooltip.innerText = tooltip_text;
                }, 2500);
            }
        });
    });
</script>