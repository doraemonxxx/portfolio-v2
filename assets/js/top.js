$(function () {

    $('.cursel-center-img').delay(5500).queue(function () {
        $(this).addClass('load');
    });
    $('.cursel-center-tit h2').delay(5800).queue(function () {
        $(this).addClass('load');
    });
    $('#count').delay(6000).queue(function () {
        $(this).addClass('load');
    });
    $('#logo,#job,nav,#cr').delay(5800).queue(function () {
        $(this).addClass('load');
    });
    $('.cursel-up h2,.cursel-under h2').delay(6000).queue(function () {
        $(this).addClass('load');
    });
    $('.hover-delay').delay(7400).queue(function () {
        $(this).addClass('load');
    });
});


// hover

$(function () {
    $(".link-hover").hover(function () {
        if ($(".cursel-center-img-before").hasClass("is_active")) {
            $(".cursel-center-img-before").removeClass("is_active");
            $(".cursel-center-img-after").removeClass("is_active");
            $(".cursel-center-tit").removeClass("is_active");
            $(".cursel-center-tit-base").removeClass("is_active");
            $("body").removeClass("on");
        } else {
            $(".cursel-center-img-before").addClass('is_active');
            $(".cursel-center-img-after").addClass('is_active');
            $(".cursel-center-tit").addClass('is_active');
            $(".cursel-center-tit-base").addClass('is_active');
            $("body").addClass("on");
        }
    });
});


// click-menu

$(function () {
    $("#menu_about").click(function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $("#about").removeClass('is_active');
            $(this).text("ABOUT");
        } else {
            $(this).addClass('on');
            $(this).addClass("on");
            $("#about").addClass('is_active');
            $(this).text("CLOSE");
        }
    });
});

// one page

$(function () {
    var ANIMATION_DELAY = 1000 //  time for scrolling next
    var IMAGE_CHANGE_DELAY = 400 // time for switching images
    var LOADING_DELAY = 700 // time for deleting load class and assigning
    var IMAGE_DIR = 'assets/img/work_main/'

    var $countNum = $('#count-num')
    var $maxNum = $('#max-num')
    var $cursel = $('#cursel')
    var $link = $('#cursel .link-hover')
    var $centerImg = $('.cursel-center-img')
    var $before = $('.cursel-center-img-before')
    var $beforeImg = $('.cursel-center-img-before img')
    var $after = $('.cursel-center-img-after')
    var $afterImg = $('.cursel-center-img-after img')
    var $centerTitH2 = $('.cursel-center-tit h2')
    var $curselUpH2 = $('.cursel-up h2')
    var $curselUnderH2 = $('.cursel-under h2')

    var TITLES = [
        ['TWICE<br>LANDING PAGE', 'work_details/twice'],

        ['IZONE<br>LANDING PAGE', 'work_details/izone'],

        ['LOTTE<br>LANDING PAGE', 'work_details/lotte'],

        ['FUKUOKA<br>WEBSITE', 'work_details/fukuoka'],

        ['ELLE PUPA<br>WEBSITE', 'javascript:void(0)'],

        ['ANNI PHOTOS<br>WEBSITE', 'javascript:void(0)'],

        ['NAGOYA<br>WEBSITE', 'javascript:void(0)'],

        ['BALIKBAYAN<br>XMAS EDIDTION', 'javascript:void(0)'],

        ['CHAMELEON CLUB<br>WEBSITE', 'javascript:void(0)'],

        ['CSI RECRUIT<br>WEBSITE', 'javascript:void(0)'],

        ['DJ WORLD<br>WEBSITE', 'javascript:void(0)'],

        ['NPO<br>WEBSITE 2019', 'javascript:void(0)'],

        ['RYUGAKU<br>WEBSITE', 'javascript:void(0)'],

        ['MOKOSUKU<br>WEBSITE', 'javascript:void(0)'],

        ['VIRTUAL<br>PIANO', 'javascript:void(0)'],

        ['PX TO VW<br>CONVERTER', 'javascript:void(0)'],

    ]
    var IMAGES = [
        ['twice_01.gif', 'twice.png'],
        ['izone_01.gif', 'izone.png'],
        ['lotte_01.gif', 'lotte.jpg'],
        ['fukuoka_01.gif', 'fukuoka.jpg'],
        ['elle-pupa_01.gif', 'elle-pupa.jpg'],
        ['anni-photos_01.gif', 'anni-photos.jpg'],
        ['nagoya_01.gif', 'nagoya.png'],
        ['balikbayan_01.gif', 'balikbayan.png'],
        ['chameleon_club_01.gif', 'chameleon_club.png'],
        ['csi_recruit_01.gif', 'csi_recruit.png'],
        ['dj_world_01.gif', 'dj_world.png'],
        ['npo_01.gif', 'npo.png'],
        ['ryugaku_01.gif', 'ryugaku.png'],
        ['mokosuku_01.gif', 'mokosuku.png'],
        ['virtual_piano_01.gif', 'virtual_piano.png'],
        ['converter_01.gif', 'converter_white_01.png'],
    ]

    var itemCount = TITLES.length
    var clientY = 0
    var isAnimating = false
    var currentIndex = 0

    var setScrollEvents = function () {
        $(window).on('touchstart', function (ev) {
            clientY = ev.originalEvent.changedTouches[0].clientY
        })

        $(window).on('wheel mousewheel', function (ev) {
            var deltaY = ev.originalEvent.deltaY
            var direction = (deltaY < 0) ? 'up' : 'down'
            tryMove(direction)
        })

        $(window).on('touchmove', function (ev) {
            var nextClientY = ev.originalEvent.changedTouches[0].clientY
            var direction = (clientY < nextClientY) ? 'up' : 'down'
            clientY = nextClientY
            tryMove(direction)
        })
    }

    // image preload
    var preloadImage = function (path) {
        var img = new Image
        img.src = IMAGE_DIR + path
    }

    var preloadImages = function () {
        IMAGES.forEach(function (item) {
            preloadImage(item[0])
            preloadImage(item[1])
        })
    }

    // 2 digits fit
    var z2 = function (num) {
        return ('0' + num).slice(-2)
    }

    // Event handling ⇛ Call move
    var tryMove = function (direction /* up | down */ ) {
        if (isAnimating || (direction !== 'up' && direction !== 'down')) return
        isAnimating = true

        switch (direction) {
            case 'up':
                currentIndex -= 1
                if (currentIndex < 0) {
                    currentIndex = itemCount - 1
                }
                // console.log('up')
                break;
            case 'down':
                currentIndex += 1
                if (currentIndex >= itemCount) {
                    currentIndex = 0
                }
                // console.log('down')
                break;
            default:
                return
        }

		if(!$("#about").hasClass("is_active")){
			move(direction)
		}
		
        setTimeout(function () {
            isAnimating = false
        }, ANIMATION_DELAY)
    }

    // Page navigation
    var move = function (direction) {
        // Start animation
        $cursel.addClass('stop ' + direction)
        $cursel.offset()
        $cursel.removeClass('stop')
        $cursel.addClass('start')
        $centerImg.removeClass('load')

        // Text change processing
        updateNum()
        updateTitle()

        // Image switching timeout
        setTimeout(function () {
            $beforeImg.attr('src', IMAGE_DIR + IMAGES[currentIndex][0])
            $afterImg.attr('src', IMAGE_DIR + IMAGES[currentIndex][1])
        }, IMAGE_CHANGE_DELAY)

        // End of animation timeout
        setTimeout(function () {
            $cursel.removeClass('start ' + direction)
            $centerImg.addClass('load')
        }, LOADING_DELAY)
    }

    // Counter update
    var updateNum = function () {
        var num = z2(currentIndex + 1)
        $countNum.text(num)
    }

    // Title and link 
    var updateTitle = function () {
        var prevIndex = currentIndex - 1
        var nextIndex = currentIndex + 1

        if (prevIndex < 0) {
            prevIndex = itemCount - 1
        }
        if (nextIndex >= itemCount) {
            nextIndex = 0
        }

        $centerTitH2.html(TITLES[currentIndex][0])
        $link.attr('href', TITLES[currentIndex][1])
        $curselUpH2.html(TITLES[prevIndex][0])
        $curselUnderH2.html(TITLES[nextIndex][0])
    }

    // Initialization process
    preloadImages()
    updateNum()
    updateTitle()
    $maxNum.text(z2(itemCount))

    // Scroll event setting after xxxx seconds
    setTimeout(setScrollEvents, 6000)
})

var cnsl_bg_image = document.URL+'assets/img/nyan_cat.gif';
(function(url) {
	var image = new Image();
	image.onload = function() {
	  var style = [
		'font-size: 1px;',
		'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px',
		'background-size: cover',
		'width : 70px', 
		'height : 70px',
		'background: url('+ url +')'
	   ].join(';');
  
		console.log('%c ', style);

		console.log('%c Hello beautiful motherf*cker, what are you doing here? Hire me! ', 'font-size:40px; color: #202c2d; background: #FFFFFF; text-shadow: 0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93, -2px 1px #cdd2d5, -2px 3px #808d93, -3px 2px #cdd2d5, -3px 4px #808d93, -4px 3px #cdd2d5, -4px 5px #808d93, -5px 4px #cdd2d5, -5px 6px #808d93, -6px 5px #cdd2d5, -6px 7px #808d93, -7px 6px #cdd2d5, -7px 8px #808d93, -8px 7px #cdd2d5; color: #202c2d;');
		
		const style1 = 'color:#ffffff; font-size:24px; font-weight: bold; background-color: #c75142; padding: 20px; border: 1px dashed #000000;'
		console.log('%c Contact me No Name ', style1);
	};
	image.src = url;
})(cnsl_bg_image);


  
