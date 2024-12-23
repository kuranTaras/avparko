// header languages

$('.header__languages-top').on('click', () => {
    $('.header__languages').toggleClass('active')
})

// sliders
const swiperOur = new Swiper('.our__slider', {
    slidesPerView: 2,
    spaceBetween: 16,
    pagination: {
        el: '.our .swiper-pagination',
        clickable: true
    },
    breakpoints: {
        760: {
            spaceBetween: 20,
            slidesPerView: 2,
        },
        1000: {
          spaceBetween: 0,
          slidesPerView: 4,
        }
    }
});
console.log(swiperOur)
const swiperComp = new Swiper('.comp__slider', {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
        el: '.comp .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        760: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});
//hover comp__item
// $('.comp__item').each(function () {
//     $(this).hover(() => {
//         $('.comp__item').removeClass('active not-active')
//         $('.comp__item').addClass('not-active')
//         $(this).addClass('active')
//     }, () => {
//         $('.comp__item').removeClass('not-active active')
//     })
//
// })

// fade in animation
function fadeIn (item) {
    $(item).each(function () {
        if ($(window).width > 999) {
            if ($(window).scrollTop() >= $(this).offset().top - $(window).height() + 200) {
                $(this).addClass('fade-out')
            }
        } else {
            if ($(window).scrollTop() >= $(this).offset().top - $(window).height() + 50) {
                $(this).addClass('fade-out')
            }
        }
    })
}
$(window).on('scroll', () => {
    fadeIn('.fade-in')
})
fadeIn('.fade-in')


// phone mask
var elements = document.querySelectorAll('.input-phone');
elements.forEach((item, index) => {
    var maskOptions = {
        mask: '+38 (000) 00-00-000'
    };
    var mask = IMask(item, maskOptions);
})

// about block animation
gsap.utils.toArray(".panel").forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "100%",
        pin: true,
        pinSpacing: false
    });
});
if ($(window).width() >= 1000) {
    gsap.utils.toArray(".row-animation").forEach((panel, i) => {
        ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "100%",
            pin: true,
            pinSpacing: false
        });
    });
}

// anchors animation
$('a[href^="#"]').click(function () {
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 25
    }, 1000);
    return false;
});

// hero animation
(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

})();


// plants hover
$('.plants__cube:first-child').hover(() => {
    $('.plants__plants .plants__plant').addClass('active')
}, () => {
    $('.plants__plants .plants__plant').removeClass('active')
})
$('.plants__cube:nth-child(2)').hover(() => {
    $('.plants__right .plants__plant').addClass('active')
}, () => {
    $('.plants__right .plants__plant').removeClass('active')
})
$('.plants__cube:nth-child(3)').hover(() => {
    $('.plants__left .plants__plant').addClass('active')
}, () => {
    $('.plants__left .plants__plant').removeClass('active')
})
$('.plants__cube:nth-child(4)').hover(() => {
    $('.plants__bot .plants__plant').addClass('active')
}, () => {
    $('.plants__bot .plants__plant').removeClass('active')
})

// open pop-1

$('.open-pop-1').on('click', () => {
    $('body').addClass('scroll')
    $('.pop-1').addClass('active')
})

// open pop-2

$('.open-pop-2').on('click', () => {
    $('body').addClass('scroll')
    $('.pop-2').addClass('active')
})

// open pop-3
$('.btn-open-pop-3').on('click', () => {
    $('body').addClass('scroll')
    $('.pop-3').addClass('active')
})

//close pop

$('.pop-bg, .pop-close, .pop-close-btn').on('click', () => {
    $('body').removeClass('scroll')
    $('.pop').removeClass('active')
})

// cursor

// $(window).on('mousemove', (e) => {
//     const x = e.offsetX
//     const y = e.offsetY
//     console.log(x)
//     console.log(y)
//     $('#cursor').css({left: x+'px', top: y+'px'})
// })

document.addEventListener('mousemove', function(ev){
    document.getElementById('cursor').style.top = (ev.clientY-60)+'px';
    document.getElementById('cursor').style.left = (ev.clientX-60)+'px';
},false);

$('.our__slider').hover(() => {
    $('#cursor').addClass('active')
    $('body').addClass('cursor-hidden')
}, () => {
    $('#cursor').removeClass('active')
    $('body').removeClass('cursor-hidden')
})

