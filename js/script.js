function generate() {
    var dfd = $.Deferred();
    html2canvas(document.querySelector("#capture"), {
        scale: 1,
    }).then(function (canvas) {
        var url = canvas.toDataURL("image/jpeg");
        dfd.resolve(url);
    });
    return dfd.promise();
}

var fontList = [
    'Bungee Hairline',
    'Charmonman',
    'Srisakdi',
    'Hepta Slab',
    'Kodchasan',
    'Baloo Tamma',
    'Baloo Da',
    'Literata',
    'Farsan',
    'K2D',
    'Charm',
    'Chonburi',
    'Faustina',
    'Spectral SC',
    'IBM Plex Sans Condensed',
    'Judson',
    'Mali',
    'Encode Sans Condensed',
    'Alegreya SC',
    'Noto Serif SC',
    'Sarabun',
    'Sigmar One',
    'Lalezar',
    'IBM Plex Serif',
    'Barlow Semi Condensed',
    'Alfa Slab One',
    'Fira Sans Extra Condensed',
    'Lobster',
    'Anton',
    'Josefin Sans',
    'Fira Sans',
];

function initEvent() {
    $("#switch").click(function () {
        $("#panel_menu #panel_container").toggleClass("d-none");
        var flag = $("#panel_menu #panel_container").hasClass("d-none");
        if (flag) {
            $(this).removeClass('fa-chevron-circle-down');
            $(this).addClass('fa-chevron-circle-up');
            $(this).css('color', 'green');
        } else {
            $(this).removeClass('fa-chevron-circle-up');
            $(this).addClass('fa-chevron-circle-down');
            $(this).css('color', 'red');
        }
    })

    $("#content *").bind("tap", tapHandler);

    $("#export").click(function () {
        var attr = $("*").attr('contenteditable');
        if (typeof attr !== typeof undefined && attr !== false) {
            $("*").attr('contenteditable', 'false');
        }
        $("html, body").animate({scrollTop: 0}, 0);
        var url = generate();
        url.done(function (url) {
            $('#myModal').modal()
            $('#myModal').on('shown.bs.modal', function () {
                $('#img_download').attr('src', url);
                $('#link_caopho').attr('href', url);
            })
        })
    })

    $("#download").click(function () {
        jQuery('#link_caopho')[0].click();
    });

    $("#file").change(function () {
        readURL(this);
    });

    $("#rotate").bind("tap", tapRotateHandler);

    $('#font1').fontselect({
        placeholder: 'Chọn font chữ',
        fonts: fontList,
    }).change(function () {
        var font = $(this).val().replace(/\+/g, ' ');
        font = font.split(':');
        var class_selected = $("#graph").val();
        $('.' + class_selected).css('font-family', font[0]);
    });

    $("#bg").css('min-height', $( window ).height() + "px");

}

function tapRotateHandler(event) {
    var rotate = $("#avatar").attr('rotate');
    rotate = parseInt(rotate) + 10;
    $("#avatar").attr('rotate', rotate);
    $("#avatar").css('transform', "rotate(" + rotate + "deg)");
}

function tapHandler(event) {
    $("*").attr('contenteditable', 'false');
    $(event.target).attr('contenteditable', 'true');
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#avatar").css('background-image', 'url(' + e.target.result + ')');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function () {
    initEvent();
});