var i = 0
var dragging = false
$('#dragbar').mousedown((e) => {
    e.preventDefault()

    dragging = true
    var main = $('#console')
    var dragbar = $('#dragbar')
    var ghostbar = $('<div>',
        {
            id: 'ghostbar',
            css: {
                height: dragbar.outerHeight(),
                width: dragbar.outerWidth(),
                top: main.offset().top,
                bottom: main.offset().bottom
            }
        }).appendTo('body')

    $(document).mousemove(function (e) {
        ghostbar.css('top', e.pageY + 2)
    })
})

$(document).mouseup((e) => {
    if (dragging) {
        $('#content').css('height', e.pageY + 2)
        $('#dragbar').css('top', e.pageY + 2)
        $('#ghostbar').remove()
        $(document).unbind('mousemove')
        dragging = false
    }
})