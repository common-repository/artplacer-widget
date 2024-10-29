(function() {
    tinymce.create('tinymce.plugins.artplacerwidget', {
        init : function(ed, url) {
            ed.addButton('artplacerwidget', {
                title : 'ArtPlacer Widget',
                image : url + '/../images/wp-artplacer-ico.png',
                onclick : function() {
                    ed.windowManager.open({
                        file: ajaxurl + '?action=artplacer_widget_modal&post_type=' + document.querySelector('#post_type').value,
                        width: 670,
                        height: 660,
                        inline: 1
                    }, {
                        plugin_url: url
                    })
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "ArtPlacer Widget",
                author : 'ArtPlacer',
                authorurl : 'https://www.artplacer.com',
                infourl: 'http://wordpress.org/plugins/wp-artplacer-widget/',
                version : "1.0"
            }
        }
    });
    tinymce.PluginManager.add('artplacerwidget', tinymce.plugins.artplacerwidget);
})();