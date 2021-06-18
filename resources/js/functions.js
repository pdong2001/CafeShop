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

function ReplaceInStorages(index, item) {
    var list = getListCartItem();
    list.splice(index, 1, item);
    localStorage.removeItem('jwcafecart');
    localStorage.setItem('jwcafecart', JSON.stringify(list));
}

function addToCart(container, item) {
    item.appendTo(container);
}

function addToStorages(item) {
    var list = getListCartItem();
    list.push(item.toDictionary());
    localStorage.removeItem('jwcafecart');
    localStorage.setItem('jwcafecart', JSON.stringify(list));
}

function removeToStorages(index) {
    var list = getListCartItem();
    list.splice(index, 1);
    localStorage.removeItem('jwcafecart');
    localStorage.setItem('jwcafecart', JSON.stringify(list));
}

function getListCartItem() {
    var list = JSON.parse(localStorage.getItem('jwcafecart'));
    var listCartItem = list == null ? [] : list;
    return listCartItem;
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
    var listCartItem = getListCartItem();
    var Total = 0;
    var container = $('#cart-page .c-products');
    container.empty();
    for (var i = 0; i < listCartItem.length; i++) {
        var item = new CartItem(listCartItem[i].img, listCartItem[i].dp,
            listCartItem[i].info, listCartItem[i].amount, listCartItem[i].link);
        Total += Number(item.price);
        addToCart(container, item.toElement());
    }
    var rs = moneyFormat(Total);
    $('.bill .Total-price').text(rs);
    $('.cart span').text(listCartItem.length);

}

$(document).ready(function() {
    $('input[type=number]').val('1');
    $('input[type=number]').change(function() {
        if (Number($(this).val()) < 1) {
            $(this).val(1);
        }
    });
    $('#cart-page input[type=number]').change(function() {
        var product = $(this).parent().parent();
        var list = getListCartItem();
        var index = product.parent().children().index(product);
        list[index].amount = $(this).val();
        localStorage.removeItem('jwcafecart');
        localStorage.setItem('jwcafecart', JSON.stringify(list));
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

        var productAdd = $(this).parent().parent();
        var item = new CartItem(productAdd.find('img').attr('src'), productAdd.find('.dp').text(),
            productAdd.find('.info a').text(), productAdd.find('input').val(), ''
        )
        addToStorages(item);
        updateCart();
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
    updateCart();
    setInterval(function() {
        var list = getListCartItem();
        if (Number($('.cart .goods-count').html()) != list.length) {
            updateCart();
        }
    }, 500);
});

function CartItem(img, dp, info, amount, link) {
    this.img = img;
    this.info = info;
    this.amount = amount;
    this.link = link;
    this.dp = dp;
    this.price = Number(dp.replaceAll('.', '')) * this.amount;
    this.toElement = function() {
        var newProduct = $('.product.temp').clone(true);
        newProduct.removeClass('temp');
        newProduct.find('img').attr('src', this.img);
        newProduct.find('.dp').text(this.dp);
        newProduct.find('input[type=number]').val('' + this.amount);
        newProduct.find('.info div:last-child a').text(this.info);
        newProduct.find('.price').text(moneyFormat(this.price));
        newProduct.find('a.del').click(function() {
            var parent = $(this).parent().parent();
            removeToStorages(parent.parent().children().index(parent));
            updateCart();
        });
        return newProduct;
    };
    this.toDictionary = function() {
        var dict = {
            img: this.img,
            info: this.info,
            amount: this.amount,
            link: this.link,
            dp: this.dp,
        }
        return dict;
    }
}