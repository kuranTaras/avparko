
document.addEventListener("DOMContentLoaded", () => {
    var numbers = [
        '$100-$500',
        '$500-$1000',
        '$1100-$2500',
        '$2500-$5000'
    ];
    var option = '';
    for (var i = 0; i < numbers.length; i++) {
        option += '<li><span><span>' + numbers[i] + '</span></span></li>';
    }
    $('#lists-ul').append(option);

    $(".open-nav").on("click", function (){
        $(".burger-nav").toggleClass("active");
        $(".mobile-nav").toggleClass("active");
    });

    $("#sbmt").on('click', function () {
        if ($("#checkbox").is(":checked")) {
            window.location.href = '/get-started/?v1=08606b1e-ebd4-4860-b3a3-3c44d126f5e2';
            $('.alert-form').hide();
        } else {
            $('.alert-form').show();
        }
    });


    $(".get-started__btn").on('click', function () {

        window.location.href = '/get-started/?v1=08606b1e-ebd4-4860-b3a3-3c44d126f5e2';

    });

    $(".get-started__btn-header").on('click', function () {

        window.location.href = '/get-started/?v1=08606b1e-ebd4-4860-b3a3-3c44d126f5e2';

    });





    $('#checkbox').change(function () {
        if (this.checked) {
            $('.alert-form').hide();
        }

    });

    $("#ao-btn").on('click', function () {
        if ($("#checkbox-2").is(":checked")) {
            window.location.href = '/get-started/?v1=08606b1e-ebd4-4860-b3a3-3c44d126f5e2';
            $('.alert-form').hide();

        } else {
            $('.alert-form').show();

        }
    });

    $("#footer-btn").on('click', function () {
        if ($("#checkbox-3").is(":checked")) {
            window.location.href = '/get-started/?v1=08606b1e-ebd4-4860-b3a3-3c44d126f5e2';
            $('.alert-form').hide();
        } else {
            $('.alert-form').show();
        }
    });

    $('#checkbox-2').change(function () {
        console.log('asd')
        if (this.checked) {
            $('.alert-form').hide();
            $("#ao-btn1").removeClass("disabled");
        }
        else {
            $("#ao-btn1").addClass("disabled");
        }

    });

    $('#checkbox-3').change(function () {
        if (this.checked) {
            $('.alert-form').hide();
            $("#footer-btn").removeClass("disabled");
        }
        else {
            $("#footer-btn").addClass("disabled");
        }

    });


    $('.slider-range').each(function (e) {
        var $el = $(this);

        $el.slider({
            range: true,
            min: 100,
            max: 1000,
            step: 50,
            values: [0, 250],
            slide: function (event, ui) {
                $('#value').text(ui.value);
            },
        });
        $('#value').text($el.slider('value') + 150);
    });


    $(".faq-list__item-title").on('click', function (e) {
        e.preventDefault();

        let $this = $(this);
        let parent = $this.parents(".faq-list__item");

        if (parent.hasClass("active-faq")) {
            parent.removeClass("active-faq");
        } else {
            parent.addClass("active-faq")
        }

    })

    const mySlider2 = document.getElementById("my-slider2");
    const sliderValue2 = document.getElementById("slider-value2");

    function slider2() {
        valPercent = (mySlider2.value / mySlider2.max) * 100;
        mySlider2.style.background = `linear-gradient(to right, #0b9a40 ${valPercent}%, #d5d5d5 ${valPercent}%)`;
        sliderValue2.textContent = mySlider2.value;
    }

    if (mySlider2) {
        slider2();
    }

    $('#my-slider2').on('input', () => {
        slider2();
    })


    // month slider

    $('.slider-range.monthly').each(function (e) {
        var $el = $(this);

        $el.slider({
            range: true,
            min: 100,
            max: 1000,
            step: 50,
            values: [0, 250],
            slide: function (event, ui) {
                $('#value').text(ui.value);
            },
        });
        $('#value').text($el.slider('value') + 150);
    });

    const mySlider3 = document.getElementById("my-slider3");
    const sliderValue3 = document.getElementById("slider-value3");

    function slider3() {
        if (mySlider3.value > 40) {
            valPercent2 = (mySlider3.value / mySlider3.max) * 92
        } else if (mySlider3.value < 41) {
            valPercent2 = (mySlider3.value / mySlider3.max) * 81;
            if (mySlider3.value < 27) {
                valPercent2 = (mySlider3.value / mySlider3.max) * 65;
                if (mySlider3.value < 19) {
                    valPercent2 = (mySlider3.value / mySlider3.max) * 40;
                }
            }
        }
        mySlider3.style.background = `linear-gradient(to right, #0b9a40 ${valPercent2}%, #d5d5d5 ${valPercent2}%)`;
        sliderValue3.textContent = mySlider3.value;
    }

    if (mySlider3) {
        slider3();
    }

    $('#my-slider3').on('input', () => {
        slider3();
    })




// $(".max").change(function() {
//     $(".slider-range").slider('values', 1, $(this).val());
//     if (!$('.min').val()) {
//         $(".min").val(0)
//     }
// });




    $(".show-popup").on("click", function (e) {
        ;
        e.preventDefault()

        var id = $(this).attr("data-id");
        $(".pop").each(function () {
            $(this).removeClass("show");
            if ($(this).attr("id") == id) {
                $(this).addClass("show");
            }
        });
    });
    $(".close").on("click", function (e) {
        e.preventDefault();
        $(this).parents(".pop").removeClass("show");
    });




    $(".the-content").each(function(e) {
        let $this = $(this);
        let p = $this.children().length;


        if(p > 30) {
            $this.addClass("parent-content")
        }
        else {
            $this.removeClass("parent-content")
        }



    })
});


document.addEventListener("DOMContentLoaded", () => {
    const pop = document.getElementById('pop')
    const contactsBtn = document.getElementById('pop-close-btn')
    const bg = document.getElementById('pop-bg')
    const close = document.getElementById('pop-close')
    const body = document.querySelector('body')

    document.addEventListener( 'wpcf7mailsent', function( event ) {
        pop.classList.add('active')
        body.classList.add('scroll')
    }, false );


    pop.addEventListener('click', () => {
        body.classList.remove('scroll')
        pop.classList.remove('active')
    })
    close.addEventListener('click', () => {
        body.classList.remove('scroll')
        pop.classList.remove('active')
    })
    bg.addEventListener('click', () => {
        body.classList.remove('scroll')
        pop.classList.remove('active')
    })

});