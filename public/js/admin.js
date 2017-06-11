/*删除功能*/

$('.del').click(function(e){
    var id = $(e.target).attr('data-id');

    $.ajax({
        type: 'DELETE',
        url: '/admin/moive/list',
        data:{
            id: id
        }
    })
        .done(function(results){/*results为响应体*/
        if(results.success){
            $('.item-id-'+id).remove();
        }
    });
});

