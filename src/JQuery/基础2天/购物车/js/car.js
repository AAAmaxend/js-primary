//入口函数
$(function () {
    //jq属性操作

    //1.全选 全不选功能模块
    // 就是把全选按钮的状态赋值给三个小的按钮就可以了？？？
    $(".checkall").change(function () {
        // console.log($(this).prop("ckecked"));
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"))

        // 7、购物车选中商品添加背景
        if ($(this).prop("checked")) {
            // 如果checkall被选中，我们给它添加check-cart-item的样式
            $(".cart-item").addClass("check-cart-item")
        } else {
            $(".cart-item").removeClass("check-cart-item")
        }
    })

    /*
        1、全选思路：里面3个小的复选框按钮（j-checkbox）选中状态（checked）跟着全选按钮（checkall）走
        2、因为checked是复选框的固有属性，此时我们需要利用prop()方法获取和设置该属性
        3、把全选按钮状态赋值给3个小的复选框
        4、当我们每次点击小的复选框按钮，就来判断
        5、如果小复选框被选中该的个数等于3就应该把全选按钮选上，否则全选按钮不选
        6、查找被选中的选择器
    */
    //全选
    $(".j-checkbox").change(function () {
        // if (被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("check", true)
        } else {
            $(".checkall").prop("check", false)
        }

        if ($(this).prop("checked")) {
            // 如果checkall被选中，我们给当前商品添加check-cart-item的样式
            $(this).parents(".cart-item").addClass("check-cart-item")
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
    });

    //3、增减商品数量模块。 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框
    //涉及jq内容文本值。点击按钮修改&直接修改值

    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n)

        //4、计算小计模块 当商品数量增加时，根据文本框的值乘以当前商品价格就是总价
        //当前商品的价格
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1); //劫走￥

        var price = (p * n).toFixed(2);//保留两位小数

        // 看他们在html里面的层级关系
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);

        //调用方法
        getSum();
    })
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n <= 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n)

        //4、计算小计模块 当商品数量减少时，根据文本框的值乘以当前商品价格就是总价
        //当前商品的价格
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();

        // console.log(p);
        p = p.substr(1); //劫走￥

        // 看他们在html里面的层级关系
        $(this).parent().parent().siblings(".p-sum").html("￥" + (p * n).toFixed(2));

        //调用方法
        getSum();

    })

    //4、用户修改文本框的值 计算小计
    $(".itxt").change(function () {
        var n = $(this).val(); //拿到当前文本框商品的数量
        var p = $(this).parents(".p-num").siblings(".p-price").html();//拿到商品的单价
        p = p.substr(1); //截取￥
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2))
        getSum();
    })

    //考虑到一进网页就要增减总件数 总额
    getSum();

    //5、计算总件数、总额
    function getSum() {
        var count = 0; // 总件数
        var money = 0;//总额
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val()); //总件数相加，赋值给结算模块的第几件
        })
        $(".amount-sum em").text(count);

        $(".p-sum").each(function (i, ele) {
            money += parseInt($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + (money.toFixed(2)));
    }


    // 6、删除商品模块
    // 1）商品后面的删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })

    // 2）删除选中的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // 3）清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })





})



















