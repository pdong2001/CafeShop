function openTabSpace(evt, id, className, linkName = 'tablink') {
    $('.' + className).removeClass('active');
    $('body,html').scrollTop(60);
    $('body').css('padding-bottom', $('footer').height());
    $('#' + id).addClass('active');
    if (linkName != '') {
        $('.' + linkName).removeClass('active');
        evt.currentTarget.classList.add('active');
    }
}

function getParent(el, index) {
    var parent = el;
    for (var i = 0; i < index; i++) {
        parent = el.parent();
    }
    return parent;
}

function moneyFormat(val) {
    var strVal = String(val).replaceAll('.', '');
    for (var index = strVal.length - 3; index > 0; index -= 3) {
        strVal = [strVal.slice(0, index), '.', strVal.slice(index)].join('');
    }
    return strVal;
}


function updateCart() {
    var Total = 0;
    document.querySelectorAll('.c-products .price').forEach(elem => {
        Total += Number(elem.innerHTML.replaceAll('.', ''));
    });
    var rs = moneyFormat(Total);
    $('.bill .Total-price').text(rs);
}
$(document).ready(function() {
    $('input[type=number]').val('1');
    $('input[type=number]').change(function() {
        if (Number($(this).val()) < 1) {
            $(this).val('1');
        }
        var price = Number($(this).parent().parent().find('.dp').text().replaceAll('.', '')) * $(this).val();
        $(this).parent().parent().find('span.price').text(moneyFormat(price));
        updateCart();
    });
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
        if ($(this).width() > 1080) {
            $('.nav-btn').hide();
            $('#menu-left').hide();
        } else {
            $('.nav-btn').show();
        }
        var pdBottom = $('.about .content').height() - $('.about').height();
        if (pdBottom > 0) {
            $('.about').css('padding-bottom', pdBottom + 'px');
        }
    });
    $('.nav-btn button').click(function() {
        $('#menu-left').slideToggle();
    });
    $('.add-to-cart').click(function() {
        var newProduct = $('.product.temp').clone(true);
        newProduct.removeClass('temp');
        var productAdd = $(this).parent().parent();
        newProduct.find('img').attr('src', productAdd.find('img').attr('src'));
        newProduct.find('.dp').text(productAdd.find('.dp').text());
        newProduct.find('.price').text(moneyFormat(Number(productAdd.find('span.dp').text().replaceAll('.', '')) * productAdd.find('input').val()));
        newProduct.find('.info span').text(productAdd.find('.info span').text());
        newProduct.find('input').val(productAdd.find('input').val());
        newProduct.find('a').click(function() {
            $(this).parent().parent().remove();
            $('.cart span').text(Number($('.cart span').text()) - 1);
            updateCart();
        });
        newProduct.appendTo($('#cart-page .c-products'));
        updateCart();
        $('.cart span').text(Number($('.cart span').text()) + 1);
    });
    $('.bill button').click(function() {
        var value = $('.bill input').filter(function() {
            return this.value == '';
        });
        if ($('.c-products .product').length < 1) {
            alert("Không có gì trong giỏ hàng.");
        } else if (value.length > 0) {
            alert("Vui lòng điền đầy đủ thông tin đặt hàng.");
        } else {
            alert("Đặt hàng thành công.");
        }
    });

    $('.product img, .product .info span').click(function() {
        $('.tabspace').removeClass('active');
        $('body,html').scrollTop(60);
        $('body').css('padding-bottom', $('footer').height());
        $('#d-product-page').addClass('active');
    });
});