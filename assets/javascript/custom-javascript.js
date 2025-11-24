
/* -------------------- Browser Zoom Setting -------------------- */

window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
},
{
    passive: false
});

//window.addEventListener('keydown', function (e) {
//    if (e.ctrlKey) {
//        if (['+', '-', '=', '0', 'numpadAdd', 'numpadSubtract', 'numpad0'].includes(e.key) ||
//            e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 48) {
//            e.preventDefault();
//        }
//    }
//});

/* -------------------- Cursor Setting -------------------- */

const cursorDefault = new MouseFollower({
    skewing: 1,
    speed: 0.5,
});

const targets = document.querySelectorAll('[data-cursor]');

targets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursorDefault.show();
    });

    target.addEventListener('mouseleave', () => {
        cursorDefault.hide();
    });
});

/* -------------------- Loader Setting -------------------- */

function disableWheelScroll() {
    window.addEventListener('wheel', preventWheel, { passive: false });
}

function enableWheelScroll() {
    window.removeEventListener('wheel', preventWheel);
}

function preventWheel(e) {
    e.preventDefault();
}

// Page Transition

$(window).on('load', function () {
    gsap.fromTo("body",
        { opacity: 0 },
        { opacity: 1, duration: 0.75, ease: "cubic-bezier(0.625, 0.05, 0, 1)" }
    );

    $("a[href]").on("click", function (e) {
        const href = $(this).attr("href");

        if (!href || href === "#" || href.startsWith("javascript:void")) return;

        e.preventDefault();
        gsap.to("body", {
            opacity: 0,
            duration: 0.75,
            ease: "cubic-bezier(0.625, 0.05, 0, 1)",
            onComplete: () => window.location.href = href
        });
    });
});

// Page Loader

$(window).on('load', function () {
    setTimeout(function () {
        disableWheelScroll();
    }, 0);

    // Start Loader - Loading //

    setTimeout(function () {
        $('body .content').addClass('page-load-start-1');

        // Loader - Loading

        let loaderLoadingNumber = { value: 0 };

        gsap.to(loaderLoadingNumber, {
            value: 100,
            duration: 5,
            ease: "power1.out",
            onUpdate: function () {
                $('#loadingNumber').text( Math.floor(loaderLoadingNumber.value) + '%' );
            },
        });
    }, 1000);
    setTimeout(function () {
        $('body .content').addClass('page-load-progress-1');
    }, 2000);
    setTimeout(function () {
        $('body .content').addClass('page-load-progress-2');
    }, 2500);
    setTimeout(function () {
        $('body .content').addClass('page-load-progress-3');
    }, 3000);
    setTimeout(function () {
        $('body .content').addClass('page-load-progress-4');
    }, 3500);
    setTimeout(function () {
        $('body .content').addClass('page-load-progress-5');
    }, 4000);
    setTimeout(function () {
        $('body .content').addClass('page-load-progress-6');
    }, 4500);
    setTimeout(function () {
        $('body .content').addClass('page-load-progress-7');
    }, 5000);
    setTimeout(function () {
        $('body .content').addClass('page-load-start-2');
    }, 6500);

    // End Loader - Loading //

    // Start Loader - Logo //

    setTimeout(function () {
        $('body .content').addClass('page-load-start-3');
    }, 8000);
    setTimeout(function () {
        $('body .content').addClass('page-load-start-4');
    }, 10000);
    setTimeout(function () {
        $('body .content').addClass('page-load-start-5');
    }, 11000);

    // End Loader - Logo //

    setTimeout(function () {
        $('body .content').addClass('page-load-complete');

        var interval = 6000;
        var transitionTime = 2000;

        $('.section-carousel').each(function () {
            var $carousel = $(this);
            var $cells = $carousel.find('.carousel-cell');
            var current = 0;
            var carouselInterval;
            var isPaused = false;

            $cells.eq(current).addClass('active');

            function startCarousel() {
                if (carouselInterval) clearInterval(carouselInterval);

                carouselInterval = setInterval(function () {
                    var $currentCell = $cells.eq(current);

                    current = (current + 1) % $cells.length;
                    var $nextCell = $cells.eq(current);

                    $currentCell.removeClass('active').addClass('leaving');
                    $nextCell.addClass('active');

                    setTimeout(function () {
                        $currentCell.removeClass('leaving');
                    }, transitionTime);

                }, interval);
            }

            startCarousel();

            $(document).on('visibilitychange', function () {
                if (document.hidden) {
                    clearInterval(carouselInterval);
                    isPaused = true;
                } else {
                    startCarousel();
                    isPaused = false;
                }
            });
        });
    }, 11500);
    setTimeout(function () {
        $('body .content').removeClass().addClass('content page-load page-load-complete');
        enableWheelScroll();
    }, 13500);

    // setTimeout(function () {
    //     $('body .content').removeClass().addClass('content page-load page-load-complete');
    //     enableWheelScroll();
    // }, 1000);
});

/* -------------------- Navbar Setting -------------------- */

$(window).scroll(function () {
    $(".navbar").toggleClass("scroll", $(this).scrollTop() > 1)
    $("#scroll-top").toggleClass("scroll", $(this).scrollTop() > 1)
});

/* -------------------- Custom Split Text Setting -------------------- */

document.addEventListener("DOMContentLoaded", () => {

    // Split Text

    document.querySelectorAll(".text-mask-reveal").forEach((el) => {
        const start = el.dataset.start || "top 75%";
        const splitText = SplitText.create(el, {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
                gsap.set(self.lines, { yPercent: 100 });
                ScrollTrigger.create({
                    trigger: el,
                    start: start,
                    markers: false,
                    onEnter: () => {
                        gsap.to(self.lines, {
                            duration: 1.5,
                            yPercent: 0,
                            stagger: 0.065,
                            ease: "expo.out",
                        });
                    },
                });
            }
        });
    });

    // Splitting Text - General - Character

    document.querySelectorAll('.split-char').forEach(textSpan => {
        const innerText = textSpan.textContent.trim();
        let charSpans = '';

        innerText.split('').forEach(char => {
            charSpans += `<span>${char}</span>`;
        });

        textSpan.innerHTML = `<span>${charSpans}</span>`;
    });

    // Splitting Text - Title

    document.querySelectorAll('.text-title').forEach(title => {

        const textSpan = title.querySelector('.text');

        if (textSpan) {
            const text = textSpan.textContent.trim();
            let charSpans = '';

            text.split('').forEach(char => {
                charSpans += `<span>${char}</span>`;
            });

            textSpan.innerHTML = `
                        <span>${charSpans}</span>
                    `;
        }
    });

    // Splitting Text - Link - Navbar

    document.querySelectorAll('.link-default').forEach(link => {

        const textSpan = link.querySelector('.text');

        if (textSpan) {
            const text = textSpan.textContent.trim();
            let charSpans = '';

            text.split('').forEach(char => {
                charSpans += `<span>${char}</span>`;
            });

            textSpan.innerHTML = `
                        <span>${charSpans}</span>
                        <span>${charSpans}</span>
                    `;
        }
    });

    // Splitting Text - Button

    document.querySelectorAll('.btn-default').forEach(btn => {

        const textSpan = btn.querySelector('.text');

        if (textSpan) {
            const text = textSpan.textContent.trim();
            let charSpans = '';

            text.split('').forEach(char => {
                charSpans += `<span>${char}</span>`;
            });

            textSpan.innerHTML = `
                        <span>${charSpans}</span>
                        <span>${charSpans}</span>
                    `;
        }
    });

    document.querySelectorAll('.btn-default').forEach(btn => {

        const textSpan = btn.querySelector('.time');

        if (textSpan) {
            const text = textSpan.textContent.trim();
            let charSpans = '';

            text.split('').forEach(char => {
                charSpans += `<span>${char}</span>`;
            });

            textSpan.innerHTML = `
                        <span>${charSpans}</span>
                        <span>${charSpans}</span>
                    `;
        }
    });

    // Splitting Text - Text Mask

    document.querySelectorAll(".text-mask").forEach((el) => {
        const splitText = SplitText.create(el, {
            type: "chars,words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
        });
    });

    // Splitting Text - Title Special

    $('.text-title-special').each(function () {
        const $textSpan = $(this).find('.text');

        $textSpan.each(function () {
            const $this = $(this);
            const text = $.trim($this.text());
            let charSpans = '';

            text.split('').forEach(function (char) {
                if (char === ' ') {
                    charSpans += `<span class="char space"> </span>`;
                    return;
                }

                let extrudeSpans = '';
                for (let i = 0; i < 20; i++) {
                    extrudeSpans += `<span>${char}</span>`;
                }

                charSpans += `
                        <span class ="char">
                            <span class ="overlap">${char}</span>
                            <span class ="base">${char}</span>
                            <span class ="extrude">
                                ${extrudeSpans}
                            </span>
                        </span>
                        `;
            });

            $this.html(charSpans);
        });
    });
});

/* -------------------- Button Setting -------------------- */

// Button Magentic

var magnets = document.querySelectorAll('.btn-magnetic')
var strength = 20

magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', moveMagnet);
    magnet.addEventListener('mouseout', function (event) {
        TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut })
    });
});

function moveMagnet(event) {
    var magnetButton = event.currentTarget
    var bounding = magnetButton.getBoundingClientRect()

    TweenMax.to(magnetButton, 1, {
        x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
        y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
        ease: Power4.easeOut
    })
}

/* -------------------- Flickty Setting -------------------- */

document.querySelectorAll('.carousel-parallax').forEach(function (carouselElem) {
    var flkty = new Flickity(carouselElem, {
        imagesLoaded: true,
        percentPosition: false,
        freeScroll: true,
        contain: true,
        prevNextButtons: false,
        pageDots: false
    });

    var imgs = carouselElem.querySelectorAll('.carousel-cell img');
    var docStyle = document.documentElement.style;
    var transformProp = typeof docStyle.transform === 'string' ? 'transform' : 'WebkitTransform';

    flkty.on('scroll', function () {
        flkty.slides.forEach(function (slide, i) {
            var img = imgs[i];
            if (img) {
                var x = (slide.target + flkty.x) * -1 / 5;
                img.style[transformProp] = 'translateX(' + x + 'px)';
            }
        });
    });
});

$('.carousel-single').flickity({
    draggable: false,
    autoPlay: true,
});

$('.carousel-triple').flickity({
    draggable: true,
    contain: true,
    wrapAround: true,
});
