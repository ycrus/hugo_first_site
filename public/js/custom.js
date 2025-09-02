
        $(document).ready(function() {
            console.log('🚀 Hugo Site JavaScript Loaded Successfully!');
            
            // Remove CSS loaded indicator after 3 seconds
            setTimeout(function() {
                $('.css-loaded').fadeOut();
            }, 3000);
            
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

            // Back to top button functionality
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

            // Mobile menu toggle
            $('.navbar-toggle').click(function() {
                $('.navbar-collapse').toggleClass('in');
            });

            // Close mobile menu when clicking on a link
            $('.navbar-nav a').click(function() {
                $('.navbar-collapse').removeClass('in');
            });

            // Active menu item highlight
            $(window).scroll(function() {
                var scrollDistance = $(window).scrollTop();
                
                $('section').each(function(i) {
                    if ($(this).position().top - 100 <= scrollDistance) {
                        $('.navbar-nav li.active').removeClass('active');
                        $('.navbar-nav li').eq(i).addClass('active');
                    }
                });
            });

            // Parallax effect for hero background
            $(window).scroll(function() {
                var scrolled = $(window).scrollTop();
                var parallax = $('.hero-background');
                var speed = scrolled * 0.2;
                
                parallax.css('transform', 'translateY(' + speed + 'px)');
            });
        });