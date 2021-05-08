function openTabSpace(evt, id, className) {
    $('.' + className).removeClass('active');
    $('#' + id).addClass('active');
    $('.tablink').removeClass('active');
    evt.currentTarget.classList.add('active');
    $('body').css('padding-bottom', $('footer').height());
}
$(document).ready(function() {
    $('.show-more').click(function() {
        $('#tab-product').click();
        $('html, body').scrollTop();
    });
    $(window).resize(function() {
        var left = $('#main-menu .menu:first-child').height();
        var right = $('#main-menu .menu:last-child').height();
        $('#main-menu .menu').css('height', 'fit-content');
        if (left < right) {
            $('#main-menu .menu:first-child')
                .height($('#main-menu .menu:last-child').height());
            $('body').css('padding-bottom', $('footer').height());
        } else {
            $('#main-menu .menu:last-child')
                .height($('#main-menu .menu:first-child').height());
            $('body').css('padding-bottom', $('footer').height());
        }
    });
    $('body').css('padding-bottom', $('footer').height());
});