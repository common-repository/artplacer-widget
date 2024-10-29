function updateArtPlacerWidget(variation){
    const main_attribute = Object.keys(variation.attributes)[0];
    const size = variation.attributes[main_attribute].replaceAll('-', ' ').replaceAll('_', ' ').replaceAll('by', 'x');
    const total_widgets = ArtPlacer.getTotalWidgets();
    const dimensions = size.replaceAll('"','').split('x');
    const price = variation.display_price + ' ' + document.querySelector('.woocommerce-Price-currencySymbol').innerText;
    var data, height, width;

    for (var i = 0; i < total_widgets; i++){
        data = ArtPlacer.getData(i);
        if (data.dimensions_standard && data.dimensions_standard.toLowerCase() == 'wxh'){
            height = parseFloat(dimensions[1]);
            width = parseFloat(dimensions[0]);
        } else {
            height = parseFloat(dimensions[0]);
            width = parseFloat(dimensions[1]);
        }

        if (isNaN(height) || height <= 0) {
            console.error('Height is NaN');
            console.log({size})
            return;
        }
        ArtPlacer.changeData(i, height, size, price || null, width);
    }
    console.log('ArtPlacer widgets updated with size and price', size, price);
}

if (typeof jQuery !== 'undefined') {
    jQuery(window).on('artplacer_widgets_ready', function(){
        if (document.querySelector('#ar_available_product_variations')){
            try{
                const jsonVariations = JSON.parse(document.querySelector('#ar_available_product_variations').value);
                if (Array.isArray(jsonVariations)){
                    updateArtPlacerWidget(jsonVariations[0]);
                }
            }catch (e) {
                console.error(e);
            }
        }
    })

    jQuery( '.single_variation_wrap' ).on( 'show_variation', function( event, variation ) {
        try{
            updateArtPlacerWidget(variation);
        }catch (e) {
            console.error(e);
        }
    });
}else{
    console.warn('jQuery not installed');
}