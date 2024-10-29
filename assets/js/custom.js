jQuery(document).ready(function () {
    jQuery("#load").css('visibility', 'hidden');

    jQuery('body ').on('click', '.icons_div.del', function (e) {
        e.preventDefault();
        jQuery("#load").css('visibility', 'visible');
        const delete_url = document.querySelector('#delete_url').value;
        if (confirm('Are you sure you want to delete this widget?')){
            var rml_post_id = jQuery(this).data('id');
            var obj = jQuery(this);
            jQuery.ajax({
                url: delete_url,
                type: 'post',
                data: {
                    id: rml_post_id
                },
                success: function (response) {
                    jQuery(obj).closest('li').remove();
                    jQuery("#load").css('visibility', 'hidden');
                }
            });
        }
    });

    jQuery('body ').on('change', '#PolarisSelect3', function (e) {
        jQuery(".selectposition").text(jQuery(this).val());
    });
});