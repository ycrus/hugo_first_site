// Custom JavaScript for Hugo Site

$(document).ready(function() {
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Active menu item highlight
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();

        // Check each section
        $('section').each(function(i) {
            if ($(this).position().top - 100 <= scrollDistance) {
                $('.navbar-nav li.active').removeClass('active');
                $('.navbar-nav li').eq(i).addClass('active');
            }
        });
    });

    // Mobile menu toggle
    $('.navbar-toggle').click(function() {
        $('.navbar-collapse').toggleClass('in');
    });

    // Close mobile menu when clicking on a link
    $('.navbar-nav a').click(function() {
        $('.navbar-collapse').removeClass('in');
    });

    // Fade in animation for elements when scrolling
    function animateOnScroll() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    }

    // Run animation on scroll and page load
    $(window).on('scroll resize', animateOnScroll);
    $(window).trigger('scroll');

    // Parallax effect for hero background
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.hero-background');
        var speed = scrolled * 0.5;
        
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });

    // Counter animation (if you add counters)
    function animateCounters() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Typing effect for hero title (optional)
    function typeEffect(element, text, speed) {
        var i = 0;
        var timer = setInterval(function() {
            if (i < text.length) {
                $(element).append(text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Initialize typing effect if element exists
    if ($('.typing-effect').length) {
        var text = $('.typing-effect').text();
        $('.typing-effect').empty();
        typeEffect('.typing-effect', text, 100);
    }

    // Preloader (if you add one)
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    // Back to top button
    var backToTop = $('<button class="back-to-top"><i class="fas fa-chevron-up"></i></button>');
    $('body').append(backToTop);

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Form validation (if you have forms)
    $('form').submit(function(e) {
        var isValid = true;
        
        $(this).find('input[required], textarea[required]').each(function() {
            if ($(this).val().trim() === '') {
                $(this).addClass('error');
                isValid = false;
            } else {
                $(this).removeClass('error');
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });

    // Image lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Tooltip initialization (if using Bootstrap tooltips)
    $('[data-toggle="tooltip"]').tooltip();

    // Popover initialization (if using Bootstrap popovers)
    $('[data-toggle="popover"]').popover();

});

// Additional CSS for Back to Top button and animations
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 5px rgba(231, 76, 60, 0.3) !important;
        }
        
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
    `)
    .appendTo('head');