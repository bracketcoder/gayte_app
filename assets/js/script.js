(function ($) {
    "use strict";
    $(".main-slider").owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        smartSpeed: 900,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: ["<i class='fa fa-arrow-left' aria-hidden='true'></i>", "<i class='fa fa-arrow-right' aria-hidden='true'></i>"]
    });

    /** Swiper Slider Used for The Screenshots Section **/
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        loop: true,
        centeredSlides: true,
        slidesPerView: 2,
        initialSlide: 1,
        disableAutoResize: false,
        keyboardControl: true,
        mousewheelControl: true,
        lazyLoading: true,
        preventClicks: true,
        preventClicksPropagation: true,
        coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 2,
            slideShadows: true
        }
    });

    $(".owl-carousel").owlCarousel({
        items: 1,
        margin: 0,
        stagePadding: 0,
        smartSpeed: 450
    });

    /** Function that forces reload of the banner svg animation **/
    function reloadSVG(){
        setTimeout(function(){
            const $activeSVG = $(".owl-carousel").find('.owl-item.active .banner_logo_1')
            if ($activeSVG.length){
                const originalSRC = $activeSVG.attr('src').split('?')[0]
                $activeSVG.attr('src', originalSRC + '?t=' + Date.now());
            }
        }, 100); 
    }

    /** Checks for any change in owl carousel then calls function to reload svg **/
    $(".owl-carousel").on('change.owl.carousel', function(){
        reloadSVG();
    })

    /** Checks for manual navigation then calls the reload svg function **/
    $(".owl-carousel").on('click', '.owl-prev', 'owl-next' , function(){
        setTimeout(reloadSVG, 200);
    })

    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('open');

        // Toggle menu-open class on body
        if ($(this).hasClass('open')) {
            // Store current scroll position and prevent body scroll
            var scrollTop = $(window).scrollTop();
            $('body').addClass('menu-open').css('top', -scrollTop + 'px').data('scroll-position', scrollTop);
        } else {
            // Restore body scroll and scroll position instantly
            var scrollPosition = $('body').data('scroll-position') || 0;
            var html = $('html');
            var originalScrollBehavior = html.css('scroll-behavior');
            
            // Temporarily disable smooth scrolling
            html.css('scroll-behavior', 'auto');
            
            $('body').removeClass('menu-open').css('top', '');
            $(window).scrollTop(scrollPosition);
            
            // Restore original scroll behavior after a tiny delay
            setTimeout(function() {
                html.css('scroll-behavior', originalScrollBehavior);
            }, 50);
        }

        // Toggle logo visibility on mobile
        $('.navbar-brand.logo-hide-mobile').toggleClass('hidden');
    });

    // Handle menu link clicks to close mobile menu
    $('[data-scroll]').on('click', function () {
        var $navbarCollapse = $('.navbar-collapse');
        var $navbarToggler = $('.navbar-toggler');

        if ($navbarCollapse.hasClass('show')) {
            $navbarCollapse.removeClass('show');
            $navbarToggler.removeClass('open');
            
            // Restore body scroll and scroll position instantly
            var scrollPosition = $('body').data('scroll-position') || 0;
            var html = $('html');
            var originalScrollBehavior = html.css('scroll-behavior');
            
            // Temporarily disable smooth scrolling
            html.css('scroll-behavior', 'auto');
            
            $('body').removeClass('menu-open').css('top', '');
            $(window).scrollTop(scrollPosition);
            
            // Restore original scroll behavior after a tiny delay
            setTimeout(function() {
                html.css('scroll-behavior', originalScrollBehavior);
            }, 50);

            $('.navbar-brand.logo-hide-mobile').removeClass('hidden');

            // Add delay for smooth transition
            setTimeout(function() {
                $navbarCollapse.css({
                    'height': '0',
                    'overflow': 'hidden'
                });
            }, 300);
        }
    });

    // Handle window resize to ensure proper state
    $(window).on('resize', function () {
        if ($(window).width() > 991) {
            $('body').removeClass('menu-open');
            $('.navbar-toggler').removeClass('open');
        }
    });

    $('.zero-scrolltop').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        return false;
    });

  
    /**navbar sticky **/
    $(window).on('scroll', function () {
        var winTop = $(window).scrollTop();
        if (winTop >= 100) {
            $(".navbar-sticky").addClass("sticky-active");
        } else {
            $(".navbar-sticky").removeClass("sticky-active");
        }
        //back to top
        if ($(this).scrollTop() > 500) {
            $('.zero-scrolltop').fadeIn();
        } else {
            $('.zero-scrolltop').fadeOut();
        }

    });

    /**preloader **/
    $(window).on('load', function () {
        $('#preloader').addClass('d-none');
    });
    

    /**animation**/
    window.wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    });
    window.wow.init();

    /**smooth scroll**/
    var scroll = new SmoothScroll('[data-scroll]', {
        // Selectors
        ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
        header: '.navbar', // Selector for fixed headers (must be a valid CSS selector)
        // Speed & Easing
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        offset: 80, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
        easing: 'easeInOutCubic', // Easing pattern to use
        customEasing: function (time) {}, // Function. Custom easing pattern

        // Callback API
        before: function () {}, // Callback to run before scroll
        after: function () {} // Callback to run after scroll
    });

    document.addEventListener("DOMContentLoaded", function () {
        // Get all FAQ toggle checkboxes and their corresponding text elements
        const faqToggles = document.querySelectorAll('.faq-toggle');
        const faqTexts = document.querySelectorAll('.faq-text');

        // Hide all FAQ texts initially
        faqTexts.forEach(function (text) {
            text.style.display = "none";
        });

        faqToggles.forEach(function (toggle) {
            toggle.addEventListener('change', function () {
                // Get the corresponding FAQ text for the clicked toggle
                const faqText = this.nextElementSibling.querySelector('.faq-text');

                if (this.checked) {
                    // Show the clicked FAQ text
                    faqText.style.display = "block";

                    // Hide all other FAQ texts
                    faqTexts.forEach(function (text) {
                        if (text !== faqText) {
                            text.style.display = "none";
                        }
                    });
                } else {
                    // Hide the clicked FAQ text
                    faqText.style.display = "none";
                }
            });
        });
    });

    // // Disable copying
    // document.addEventListener('copy', function (e) {
    //     e.preventDefault();
    // });

    // // Disable printing
    // window.addEventListener('beforeprint', function () {
    //     document.body.classList.add('no-print');
    // });

    // window.addEventListener('afterprint', function () {
    //     document.body.classList.remove('no-print');
    // });

    // Get the menu icon element
    var menuIcon = document.querySelector('.navbar-toggler');

    // Get the navbar element
    var navbar = document.getElementById('navbar');

    // Add a click event listener to the menu icon only if navbar exists
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function () {
            // Toggle the 'expanded' class on the navbar
            navbar.classList.toggle('expanded');
        });
    }
}(jQuery));

    // Declare subjectSelect variable globally
var subjectSelect = document.getElementById("subject");

window.onload = function() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    turnstile.render('#turnstile-widget', {
        sitekey: 'YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY',
        size: isMobile ? 'normal' : 'normal',
        theme: 'dark',
        callback: function(token) {
            console.log('Turnstile token:', token);
            // Handle successful verification
        },
        'error-callback': function(errorCode) {
            console.error('Turnstile error:', errorCode);
        }
    });
};

// Declare subjectSelect variable globally
function updateSubjectOptions() {
    var mainSubjectSelect = document.getElementById("main_subject");

    // Clear existing options
    subjectSelect.innerHTML = "";

    // Add options based on the selected main subject
    switch (mainSubjectSelect.value) {
        case "advertising":
            addOption("");
            addOption("Inquires");
            break;
        case "legal":
            addOption("");
            addOption("Copyright");
            addOption("Data Protection");
            addOption("Privacy Policy");
            addOption("Terms of Service");
            break;
        case "press":
            addOption("");
            addOption("Inquiries");
            break;
        case "support":
            addOption("");
            addOption("Account");
            addOption("Claim");
            addOption("Information");
            addOption("Login");
            addOption("Other Technical Issues");
            break;
    }
}

function addOption(value) {
    var option = document.createElement("option");
    if (value == ""){
            option.disabled = true
            option.selected = true
            option.value = value;
            option.text = "Select one";
            subjectSelect.appendChild(option);
        return
    }
    option.value = value;
    option.text = value;
    subjectSelect.appendChild(option);
}

function showFileName(input) {
    var fileName = input.value.split('\\').pop();  // Extract the file name from the full file path
    var filenameElement = document.querySelector('.filename');
    filenameElement.textContent = fileName;
}

// Perform token verification using Siteverify before form is submitted
function validateCaptcha() {
    const token = document.getElementsByName('cf-turnstile-response')[0].value
    const SECRET_KEY = 'YOUR_CLOUDFLARE_TURNSTILE_SECRET_KEY';

    let formData = new FormData();
    formData.append('secret', SECRET_KEY);
    formData.append('response', token);

    //Validate the token by calling the siteverify API.
    const result = fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        body: formData,
        method: 'POST',
    });
    return result.json();
}

var contactForm = document.querySelector('.contact_form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Perform form validation if needed
    var emailInput = document.getElementById('email');
    var mainSubjectInput = document.getElementById('main_subject');
    var subjectInput = document.getElementById('subject');
    var messageInput = document.getElementById('message');
    var fileInput = document.getElementById("file");
    var maxFileSize = 1024 * 1024; // 1Mb

    // Check if the required fields are filled
    if (emailInput.value === '' || mainSubjectInput.value === '' || subjectInput.value === '' || messageInput.value === '') {
        alert('Please fill in all required fields.');
        return;
    }
        // Check catpcha validation
    if (!validateCaptcha.success) {
        alert('The provided Turnstile token was not valid! \n' + JSON.stringify(outcome));
        return;
    }
    console.log(emailInput.value);
    console.log(mainSubjectInput.value);
    console.log(subjectInput.value);
    console.log(messageInput.value);
    console.log(fileInput.value);
    // Create a FormData object to store the form data
    // Create a FormData object to send the form data
    var formData = new FormData();
    formData.append('email', emailInput.value);
    formData.append('mainSubject', mainSubjectInput.value);
    formData.append('subject', subjectInput.value);
    formData.append('message', messageInput.value);
    // Check if a file is selected
    if (fileInput && fileInput.files.length > 0) {
        if (fileInput.files[0].size > maxFileSize){
            alert('File too large. Maximum size is 1MB.');
            return;
        }
        formData.append("attachment", fileInput.files[0]);
    } else {
        // Add a default attachment value if no file is selected
        formData.append("attachment", "default_attachment");
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', contactForm.action, true);

    // Handle successful response
    xhr.onload = function() {
    if (xhr.status === 200) {
        // Display success alert
        alert('Form submitted successfully!');
        contactForm.reset(); // Reset the form fields
    } else {
        // Display error alert
        alert('Error: ' + xhr.responseText);
    }
    };

    // Handle error
    xhr.onerror = function() {
        alert('Request failed. Status: ' + xhr.status + ', Response: ' + xhr.responseText);
    };

    // Send the form data
    xhr.send(formData);
});

document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const body = document.body;

    // Enable smooth scrolling
    html.style.scrollBehavior = "smooth";

    // Force scrolling to work
    html.style.overflow = "auto";
    body.style.overflow = "auto";

    // Hide scrollbars (pure JS way)
    html.style.overflowY = "scroll";   // ensures scroll space exists
    html.style.marginRight = "-17px";  // typical scrollbar width
    html.style.paddingRight = "17px";  // keep layout consistent

    // Detect actual scrollbar width dynamically
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
        console.log("---", scrollBarWidth)
        html.style.marginRight = `-${scrollBarWidth}px`;
        html.style.paddingRight = `${scrollBarWidth}px` ;
    }
});