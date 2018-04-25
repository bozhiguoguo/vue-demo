/**
 * Created by zgg on 2018/4/12
 */
$(function(){
    $('button').on('click', () => {
        var username = $('[name = "username"]').val();
        var password = $('[name = "password"]').val();
        $.ajax({
            method:'get',
            url:'/api/logout',

            success: (resule) => {
                console.log(resule)
            }
        })
    })
})