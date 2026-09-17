(function () {
    "use strict";

    /* ================= HERO TEXT CHARACTER ANIMATION ================= */
    function splitTextIntoChars(container, baseDelay) {
        var root = container || document;
        var startDelay = typeof baseDelay === 'number' ? baseDelay : 0.8;
        var splitTexts = root.querySelectorAll('.split-text[data-text]');
        splitTexts.forEach(function (el) {
            var text = el.getAttribute('data-text') || el.textContent;
            el.innerHTML = '';
            el.setAttribute('aria-label', text);
            for (var i = 0; i < text.length; i++) {
                var span = document.createElement('span');
                span.className = 'char';
                span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
                span.style.animationDelay = (startDelay + i * 0.02) + 's';
                el.appendChild(span);
            }
        });
    }
    splitTextIntoChars(document, 0.25);

    /* ================= HERO LINE DRAW ================= */
    function animateHeroLine() {
        var heroLine = document.querySelector('.hero-line');
        if (heroLine) {
            setTimeout(function () {
                heroLine.classList.add('in');
            }, 1200);
        }
    }
    animateHeroLine();

    /* ================= GALLERY IMAGE REVEAL ================= */
    var galleryRevealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var items = entry.target.querySelectorAll('.gallery-item');
                items.forEach(function (item, i) {
                    setTimeout(function () {
                        item.classList.add('revealed');
                    }, i * 120);
                });
                galleryRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    var galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryRevealObserver.observe(galleryGrid);
    }

    /* ================= STAT CARD GLOW ON SCROLL ================= */
    var statCardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('glow-pulse');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(function (el) {
        statCardObserver.observe(el);
    });

    /* ================= SCROLL-TRIGGERED REVEAL LINE ================= */
    var revealLineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealLineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.reveal-line').forEach(function (el) {
        revealLineObserver.observe(el);
    });

    /* ================= REVEAL LINE WRAP ================= */
    var revealWrapObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var line = entry.target.querySelector('.reveal-line');
                if (line) {
                    setTimeout(function () { line.classList.add('in'); }, 200);
                }
                revealWrapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.reveal-line-wrap').forEach(function (el) {
        revealWrapObserver.observe(el);
    });

    /* ================= STAGGER CHILDREN OBSERVER ================= */
    var staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stagger-children').forEach(function (el) {
        staggerObserver.observe(el);
    });

    /* ================= PAGE LOADER ================= */
    var loader = document.getElementById('page-loader');
    function hideLoader() {
        if (!loader || loader.classList.contains('loaded')) return;
        loader.classList.add('loaded');
        document.body.style.overflow = '';
        setTimeout(function () {
            if (loader) loader.style.display = 'none';
        }, 400);
        if (typeof wow !== 'undefined' && wow && typeof wow.sync === 'function') {
            wow.sync();
        }
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(hideLoader, 200);
    } else {
        window.addEventListener('DOMContentLoaded', function () {
            setTimeout(hideLoader, 200);
        });
        window.addEventListener('load', function () {
            hideLoader();
        });
        // Safety timeout so page never gets stuck on preloader
        setTimeout(hideLoader, 1000);
    }

    /* ================= SCROLL PROGRESS ================= */
    var progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });

    /* ================= BACK TO TOP ================= */
    var backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ================= TOAST NOTIFICATION ================= */
    var toast = document.getElementById('toast');
    var toastMsg = document.getElementById('toast-msg');
    var toastTimeout;

    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(function () {
            toast.classList.remove('show');
        }, 2000);
    }

    /* ================= FLOATING PARTICLES ================= */
    var particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (var i = 0; i < 20; i++) {
            var p = document.createElement('div');
            p.className = 'particle';
            var size = Math.random() * 3 + 1;
            var isGold = Math.random() > 0.6;
            p.style.cssText =
                'width:' + size + 'px;height:' + size + 'px;' +
                'left:' + (Math.random() * 100) + '%;' +
                'bottom:-10px;' +
                'background:' + (isGold ? 'rgba(201,162,75,0.4)' : 'rgba(185,169,201,0.2)') + ';' +
                'animation-duration:' + (Math.random() * 10 + 8) + 's;' +
                'animation-delay:' + (Math.random() * 8) + 's;';
            particlesContainer.appendChild(p);
        }
    }

    /* ================= NAV SCROLL ================= */
    var siteHeader = document.getElementById('site-header');
    var nav = document.getElementById('site-nav');

    function onScroll() {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ================= MOBILE MENU ================= */
    var toggle = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    var iconOpen = document.getElementById('icon-open');
    var iconClose = document.getElementById('icon-close');

    toggle.addEventListener('click', function () {
        var isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(isHidden));
    });

    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* ================= WOW.JS SCROLL ANIMATIONS ================= */
    var wow;
    if (typeof WOW === 'function') {
        wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 50,
            mobile: true,
            live: false,
            callback: function (box) {
                box.setAttribute('data-wow-animated', 'true');
            }
        });
        wow.init();
    }

    /* ================= SCROLL ANIMATION SAFETY OBSERVER ================= */
    if ('IntersectionObserver' in window) {
        var wowFallbackObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    if (!el.hasAttribute('data-wow-animated')) {
                        el.setAttribute('data-wow-animated', 'true');
                        el.style.visibility = 'visible';
                        if (!el.classList.contains('animated')) {
                            el.classList.add('animated');
                            var cleanEnd = function () {
                                el.classList.remove('animated');
                                el.removeEventListener('animationend', cleanEnd);
                            };
                            el.addEventListener('animationend', cleanEnd);
                        }
                    }
                    wowFallbackObserver.unobserve(el);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        document.querySelectorAll('.wow').forEach(function (el) {
            wowFallbackObserver.observe(el);
        });
    }

    /* ================= FADE UP FALLBACK OBSERVER ================= */
    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) {
        fadeObserver.observe(el);
    });

    /* ================= ANIMATED COUNTERS ================= */
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(function (el) {
        counterObserver.observe(el);
    });

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);

            if (target >= 1000) {
                el.textContent = current.toLocaleString('en-US') + '+';
            } else {
                el.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target >= 1000 ? target.toLocaleString('en-US') + '+' : target;
            }
        }

        requestAnimationFrame(step);
    }

    /* ================= SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = siteHeader.offsetHeight + 20;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ================= BANGLADESH TIME & KITCHEN STATUS ================= */
    function getBDTime() {
        // Bangladesh is UTC+6
        var now = new Date();
        var utc = now.getTime() + now.getTimezoneOffset() * 60000;
        var bdTime = new Date(utc + 6 * 3600000);
        return bdTime;
    }

    function isKitchenOpen(bdTime) {
        var day = bdTime.getDay(); // 0=Sun, 4=Thu, 5=Fri, 6=Sat
        var h = bdTime.getHours();
        var m = bdTime.getMinutes();
        var totalMinutes = h * 60 + m;

        // Friday: 12:30 PM - 11:30 PM
        if (day === 5) {
            return totalMinutes >= 750 && totalMinutes < 1410;
        }
        // Thu / Sat: 12:00 PM - 11:30 PM
        if (day === 4 || day === 6) {
            return totalMinutes >= 720 && totalMinutes < 1410;
        }
        // Mon-Wed, Sun: 12:00 PM - 11:00 PM
        return totalMinutes >= 720 && totalMinutes < 1380;
    }

    function formatBDTime(bdTime) {
        var h = bdTime.getHours();
        var m = bdTime.getMinutes();
        var ampm = h >= 12 ? 'PM' : 'AM';
        var h12 = h % 12 || 12;
        return h12 + ':' + (m < 10 ? '0' + m : m) + ' ' + ampm + ' BD';
    }

    function updateKitchenStatus() {
        var bdTime = getBDTime();
        var open = isKitchenOpen(bdTime);
        var timeStr = formatBDTime(bdTime);

        // Nav desktop
        var dot = document.getElementById('kitchen-dot');
        var text = document.getElementById('kitchen-text');
        // Nav mobile
        var dotMob = document.getElementById('kitchen-dot-mob');
        var textMob = document.getElementById('kitchen-text-mob');
        // Footer
        var footerDot = document.getElementById('footer-kitchen-dot');
        var footerText = document.getElementById('footer-kitchen-text');

        var statusText = open ? (' Kitchen Open · ' + timeStr) : (' Kitchen Closed · ' + timeStr);

        if (dot && text) {
            dot.className = 'w-1.5 h-1.5 rounded-full flex-shrink-0 ' + (open ? 'kitchen-open' : 'kitchen-closed');
            text.textContent = statusText;
            text.style.color = open ? '#4ade80' : 'var(--muted)';
        }
        if (dotMob && textMob) {
            dotMob.className = 'w-1.5 h-1.5 rounded-full ' + (open ? 'kitchen-open' : 'kitchen-closed');
            textMob.textContent = statusText;
            textMob.style.color = open ? '#4ade80' : 'var(--muted)';
        }
        if (footerDot && footerText) {
            footerDot.className = 'w-2 h-2 rounded-full flex-shrink-0 ' + (open ? 'kitchen-open' : 'kitchen-closed');
            footerText.textContent = open ? 'Kitchen is currently open ✓' : 'Kitchen is currently closed';
            footerText.style.color = open ? '#4ade80' : 'var(--muted)';
        }
    }

    updateKitchenStatus();
    setInterval(updateKitchenStatus, 60000); // update every minute

    /* ================= HOURS DATA ================= */
    var hours = [
        { day: 'Monday', time: '12:00 PM – 11:00 PM', note: 'Lunch & Dinner' },
        { day: 'Tuesday', time: '12:00 PM – 11:00 PM', note: 'Lunch & Dinner' },
        { day: 'Wednesday', time: '12:00 PM – 11:00 PM', note: 'Lunch & Dinner' },
        { day: 'Thursday', time: '12:00 PM – 11:30 PM', note: 'Extended Dinner Service' },
        { day: 'Friday', time: '12:30 PM – 11:30 PM', note: 'Weekend Lunch & Dinner' },
        { day: 'Saturday', time: '12:00 PM – 11:30 PM', note: 'Weekend Lunch & Dinner' },
        { day: 'Sunday', time: '12:00 PM – 11:00 PM', note: 'Lunch & Dinner' }
    ];

    // Use BD time for "today"
    var bdNow = getBDTime();
    var todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][bdNow.getDay()];
    var hoursBody = document.querySelector('#hours-table tbody');

    hours.forEach(function (row) {
        var isToday = row.day === todayName;
        var tr = document.createElement('tr');
        tr.className = 'py-4';
        tr.innerHTML =
            '<td class="py-4 pr-4 ' + (isToday ? 'text-goldsoft font-medium' : 'text-parchment') + '">' +
            row.day + (isToday ? ' <span class="text-[10px] tracking-widest2 align-middle text-gold ml-1">TODAY</span>' : '') +
            '</td>' +
            '<td class="py-4 pr-4 text-parchment/90">' + row.time + '</td>' +
            '<td class="py-4 text-muted text-right md:text-left">' + row.note + '</td>';
        hoursBody.appendChild(tr);
    });

    /* ================= MENU DATA ================= */
    // Dietary flags: halal=true by default for all, specific veg/spicy/chef marks
    var menuData = {
        "Appetizer": [
            { name: "Truffle Parmesan Fries", price: 480, desc: "Double-fried Russet potatoes tossed in Italian black truffle oil, 24-month Parmigiano-Reggiano, and sea salt, with roast garlic and black garlic aioli.", veg: true, spicy: false, chef: true },
            { name: "Burrata with Heirloom Tomatoes", price: 1250, desc: "Pugliese burrata over marinated heirloom tomatoes and compressed basil, finished with Modena balsamic and crushed pine nuts.", veg: true, spicy: false, chef: false },
            { name: "Gambas al Ajillo", price: 1150, desc: "Jumbo tiger prawns flash-seared in olive oil, garlic, and chili flakes, served with sourdough.", veg: false, spicy: true, chef: true },
            { name: "Crispy Calamari Rings", price: 850, desc: "Lightly dusted and flash-fried, served with tartar sauce and lemon.", veg: false, spicy: false, chef: false },
            { name: "Korean Wings", price: 380, desc: "6 pcs, glazed in a sweet and savory Korean sauce.", veg: false, spicy: true, chef: false },
            { name: "Chicken Tacos", price: 380, desc: "", veg: false, spicy: false, chef: false },
            { name: "Nori Beef Tacos", price: 460, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken Wings", price: 360, desc: "Deep-fried, baked, or grilled and coated in sauce.", veg: false, spicy: false, chef: false },
            { name: "Prawn Tempura", price: 520, desc: "6 pcs, lightly battered and deep-fried.", veg: false, spicy: false, chef: false },
            { name: "Fried Calamari", price: 480, desc: "Battered squid ring, deep-fried to golden.", veg: false, spicy: false, chef: false },
            { name: "Garlic Mushroom", price: 460, desc: "Sautéed in fresh garlic, butter, herbs, and pepper.", veg: true, spicy: false, chef: false },
            { name: "Thai Mixed Vegetable", price: 380, desc: "Stir-fried with basil and a light oyster sauce.", veg: true, spicy: true, chef: false },
            { name: "Mixed Vegetable", price: 150, desc: "Prepared with mixed vegetables and spices.", veg: true, spicy: false, chef: false }
        ],
        "Soup & Salad": [
            { name: "Creamy Seafood Chowder", price: 750, desc: "Prawns, calamari, white fish, potatoes, and sweet corn, with crispy crostini.", veg: false, spicy: false, chef: true },
            { name: "Classic Caesar Salad", price: 680, desc: "Romaine, garlic croutons, shaved parmesan, house dressing, grilled chicken.", veg: false, spicy: false, chef: false },
            { name: "Japanese Sesame Seafood Salad", price: 890, desc: "Organic greens, avocado, poached prawns, crab stick, roasted sesame dressing.", veg: false, spicy: false, chef: true },
            { name: "Seafood Salad", price: 520, desc: "Mixed seafood and fresh vegetable in a spicy Korean dressing.", veg: false, spicy: true, chef: false },
            { name: "Chef's Special Salad", price: 560, desc: "Prawn and chicken with garden fresh vegetable.", veg: false, spicy: false, chef: true },
            { name: "Thai Thick Soup", price: 450, desc: "Hot and sour, with chicken, prawn, mushroom, lemongrass, and galangal.", veg: false, spicy: true, chef: false }
        ],
        "Sushi, Maki & Dumpling": [
            { name: "Salmon Nigiri & Sashimi Platter", price: 1650, desc: "Norwegian salmon with pickled ginger, wasabi, and soy.", veg: false, spicy: false, chef: true },
            { name: "Dragon Maki Roll", price: 1280, desc: "Tempura prawn, avocado, spicy mayo, unagi sauce.", veg: false, spicy: true, chef: true },
            { name: "Steamed Chicken Shumai", price: 580, desc: "Minced chicken and shiitake, chili-soy dip.", veg: false, spicy: false, chef: false },
            { name: "Pan-Seared Prawn Dumplings", price: 690, desc: "Gyoza-style, crispy bottom, spiced prawn filling.", veg: false, spicy: false, chef: false },
            { name: "Titan California", price: 550, desc: "8 pcs — fried crab stick, cucumber, avocado, tobiko, crispy flake.", veg: false, spicy: false, chef: false },
            { name: "Crispy Tori Maki", price: 690, desc: "Crispy chicken maki roll with house seasoning.", veg: false, spicy: false, chef: false },
            { name: "Crazy Dragon", price: 670, desc: "Specialty dragon roll topped with avocado and signature sauces.", veg: false, spicy: true, chef: false },
            { name: "Zesty Chicken Shumai", price: 380, desc: "", veg: false, spicy: false, chef: false },
            { name: "Creamy Chicken Shumai", price: 420, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chili Jiaozi", price: 360, desc: "5 pcs — spicy chili oil, sesame oil, spring onion, firm tofu, turmeric.", veg: false, spicy: true, chef: false }
        ],
        "Ramen & Noodles": [
            { name: "Chef's Special Ramen", price: 580, desc: "House specialty broth with curated toppings.", veg: false, spicy: false, chef: true },
            { name: "Kyoto Beef Ramen", price: 560, desc: "Savory beef broth, ramen noodles, sliced beef.", veg: false, spicy: false, chef: false },
            { name: "Seafood Ramen", price: 580, desc: "Seafood broth with prawn, squid, and fish.", veg: false, spicy: false, chef: false },
            { name: "Kyoto Chicken Ramen", price: 510, desc: "Rich chicken broth with tender chicken.", veg: false, spicy: false, chef: false },
            { name: "Spicy Beef Tonkotsu-Style Ramen", price: 1150, desc: "Sliced beef, ajitsuke egg, wood ear mushroom, bamboo shoot.", veg: false, spicy: true, chef: true },
            { name: "Chicken Yaki Soba", price: 820, desc: "Stir-fried wheat noodles with chicken, cabbage, carrot.", veg: false, spicy: false, chef: false },
            { name: "Seafood Hakka Noodles", price: 780, desc: "Prawn and calamari tossed in garlic chili paste.", veg: false, spicy: true, chef: false },
            { name: "Tako Chicken Yaki", price: 480, desc: "", veg: false, spicy: false, chef: false }
        ],
        "Chicken, Fish, Beef & Kebab": [
            { name: "Grilled Ribeye Steak", price: 2850, desc: "300g prime grain-fed ribeye, rosemary-garlic butter, peppercorn sauce, roast potato.", veg: false, spicy: false, chef: true },
            { name: "Pan-Seared Salmon Fillet", price: 2250, desc: "Dill-infused herb emulsion, buttered asparagus, potato purée.", veg: false, spicy: false, chef: true },
            { name: "Chicken Tikka & Butter Gravy", price: 980, desc: "Charcoal-grilled thigh in tomato, cashew, and butter gravy.", veg: false, spicy: false, chef: false },
            { name: "Smoky Beef Reshmi Kebab", price: 1100, desc: "Ember-grilled skewers, mint-coriander chutney, pickled onion.", veg: false, spicy: false, chef: true },
            { name: "Beef With Chili Lime", price: 680, desc: "Stir-fried with red chili, lime, garlic, and herbs.", veg: false, spicy: true, chef: false },
            { name: "Chicken Tangri Kebab With Naan", price: 480, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken Reshmi Kebab With Naan", price: 460, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken Tikka Kebab With Naan", price: 450, desc: "", veg: false, spicy: false, chef: false },
            { name: "Kashmiri Chicken Boti Kebab With Naan", price: 510, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken Afghani Kebab With Naan", price: 670, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken Hariyali Kebab With Naan", price: 510, desc: "", veg: false, spicy: false, chef: false },
            { name: "Korean Drumstick", price: 440, desc: "", veg: false, spicy: true, chef: false },
            { name: "White Dori", price: 460, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken & Ginger Mushroom", price: 460, desc: "Stir-fry with fresh ginger and mushroom.", veg: false, spicy: false, chef: false },
            { name: "Chicken Nanban", price: 560, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken Katsu", price: 520, desc: "Panko-breaded cutlet with tonkatsu sauce.", veg: false, spicy: false, chef: false },
            { name: "Teriyaki Chicken", price: 510, desc: "Grilled and glazed in sweet teriyaki sauce.", veg: false, spicy: false, chef: false }
        ],
        "Rice, Naan & Platters": [
            { name: "Garlic Butter Naan", price: 180, desc: "Brushed with roasted garlic oil and clarified butter.", veg: true, spicy: false, chef: false },
            { name: "Butter Naan", price: 80, desc: "1 pc.", veg: true, spicy: false, chef: false },
            { name: "Plain Naan", price: 70, desc: "1 pc.", veg: true, spicy: false, chef: false },
            { name: "Garlic Naan", price: 100, desc: "1 pc, with chopped garlic and coriander.", veg: true, spicy: false, chef: false },
            { name: "Seafood Fried Rice", price: 750, desc: "Jasmine rice with prawn, crab meat, egg, and vegetable.", veg: false, spicy: false, chef: false },
            { name: "Mixed Grill & Seafood Platter", price: 3450, desc: "Tiger prawn, calamari, beef kebab, grilled chicken, garlic naan, dips.", veg: false, spicy: false, chef: true },
            { name: "Beef Cashewnut Fried Rice", price: 670, desc: "", veg: false, spicy: false, chef: false },
            { name: "Chicken Fried Rice", price: 550, desc: "1:2 — with egg and vegetable.", veg: false, spicy: false, chef: false },
            { name: "Seafood Fried Rice (1:2)", price: 690, desc: "Mixed seafood, egg, diced vegetable.", veg: false, spicy: false, chef: false },
            { name: "Chicken Oyakodon", price: 490, desc: "Fried rice, boneless BBQ curry, mushroom, sautéed vegetable.", veg: false, spicy: false, chef: false },
            { name: "Seafood Platter", price: 560, desc: "Prawn tempura, dory fish curry, fried calamari, mixed vegetable.", veg: false, spicy: false, chef: false },
            { name: "Special Platter", price: 590, desc: "Chicken fried rice, wings, chili curry, dory fry, mixed vegetable.", veg: false, spicy: false, chef: false }
        ]
    };

    var categories = Object.keys(menuData);
    var tabsEl = document.getElementById('cat-tabs');
    var gridEl = document.getElementById('menu-grid');
    var noResults = document.getElementById('menu-no-results');
    var currentCategory = categories[0];
    var currentFilter = 'all';
    var currentSearch = '';

    function fmt(n) { return '\u09F3' + n.toLocaleString('en-US'); }

    function buildDietaryBadges(item) {
        var badges = '';
        badges += '<span class="dietary-badge halal"><i class="fa-solid fa-circle-check text-[9px]"></i>Halal</span>';
        if (item.veg) badges += '<span class="dietary-badge veg"><i class="fa-solid fa-leaf text-[9px]"></i>Veg</span>';
        if (item.spicy) badges += '<span class="dietary-badge spicy"><i class="fa-solid fa-pepper-hot text-[9px]"></i>Spicy</span>';
        if (item.chef) badges += '<span class="dietary-badge chef"><i class="fa-solid fa-star text-[9px]"></i>Chef\'s Pick</span>';
        return badges;
    }

    function itemMatchesFilter(item) {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'halal') return true; // all items halal
        if (currentFilter === 'veg') return item.veg;
        if (currentFilter === 'spicy') return item.spicy;
        if (currentFilter === 'chef') return item.chef;
        return true;
    }

    function itemMatchesSearch(item) {
        if (!currentSearch) return true;
        var q = currentSearch.toLowerCase();
        return item.name.toLowerCase().includes(q) || (item.desc && item.desc.toLowerCase().includes(q));
    }

    function renderCategory(cat) {
        currentCategory = cat;
        gridEl.innerHTML = '';
        var frag = document.createDocumentFragment();
        var items = menuData[cat] || [];
        var filtered = items.filter(function (item) {
            return itemMatchesFilter(item) && itemMatchesSearch(item);
        });

        if (filtered.length === 0) {
            noResults.classList.remove('hidden');
            gridEl.classList.add('hidden');
        } else {
            noResults.classList.add('hidden');
            gridEl.classList.remove('hidden');

            filtered.forEach(function (item, index) {
                var wrap = document.createElement('div');
                wrap.className = 'pb-6 border-b border-white/8 menu-item-enter';
                wrap.style.transitionDelay = (index * 0.03) + 's';
                var safeName = item.name.replace(/"/g, '&quot;');

                wrap.innerHTML =
                    '<div class="flex items-baseline">' +
                    '<span class="font-display text-xl text-parchment hover:text-goldsoft transition-colors cursor-default">' + item.name + '</span>' +
                    '<span class="leader"></span>' +
                    '<span class="text-goldsoft text-sm font-medium">' + fmt(item.price) + '</span>' +
                    '</div>' +
                    (item.desc ? '<p class="text-muted text-sm mt-1.5 leading-relaxed pr-2">' + item.desc + '</p>' : '') +
                    '<div class="mt-2 flex flex-wrap gap-1.5">' + buildDietaryBadges(item) + '</div>' +
                    '<div class="mt-3 flex items-center gap-3">' +
                    '<button type="button" class="qty-btn cart-decr" data-name="' + safeName + '" aria-label="Remove one ' + safeName + '"><i class="fa-solid fa-minus text-[10px]"></i></button>' +
                    '<span class="cart-qty text-sm w-5 text-center text-parchment font-medium" data-name="' + safeName + '">0</span>' +
                    '<button type="button" class="qty-btn cart-incr" data-name="' + safeName + '" data-price="' + item.price + '" aria-label="Add ' + safeName + ' to order"><i class="fa-solid fa-plus text-[10px]"></i></button>' +
                    '<span class="text-xs text-muted ml-1">add to order</span>' +
                    '</div>';

                frag.appendChild(wrap);
            });

            gridEl.appendChild(frag);

            requestAnimationFrame(function () {
                gridEl.querySelectorAll('.menu-item-enter').forEach(function (el, i) {
                    setTimeout(function () {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, i * 30);
                });
            });
        }

        syncQtyDisplays();
    }

    function renderTabs() {
        tabsEl.innerHTML = '';
        categories.forEach(function (cat, i) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cat-btn pb-2 whitespace-nowrap' + (i === 0 ? ' active' : '');
            btn.textContent = cat;
            btn.addEventListener('click', function () {
                tabsEl.querySelectorAll('.cat-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                renderCategory(cat);
            });
            tabsEl.appendChild(btn);
        });
    }

    renderTabs();

    /* ================= MENU SEARCH ================= */
    var menuSearch = document.getElementById('menu-search');
    if (menuSearch) {
        var searchDebounce;
        menuSearch.addEventListener('input', function () {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(function () {
                currentSearch = menuSearch.value.trim();
                // When searching, look across all categories
                if (currentSearch) {
                    renderAllCategoriesSearch();
                } else {
                    renderCategory(currentCategory);
                }
            }, 200);
        });
    }

    function renderAllCategoriesSearch() {
        gridEl.innerHTML = '';
        var frag = document.createDocumentFragment();
        var totalFound = 0;

        categories.forEach(function (cat) {
            var items = menuData[cat] || [];
            var filtered = items.filter(function (item) {
                return itemMatchesFilter(item) && itemMatchesSearch(item);
            });

            if (filtered.length > 0) {
                var catHeader = document.createElement('div');
                catHeader.className = 'col-span-full';
                catHeader.innerHTML = '<p class="text-goldsoft text-xs tracking-widest2 mb-2 mt-6 first:mt-0">' + cat.toUpperCase() + '</p>';
                frag.appendChild(catHeader);

                filtered.forEach(function (item, index) {
                    var wrap = document.createElement('div');
                    wrap.className = 'pb-6 border-b border-white/8 menu-item-enter';
                    var safeName = item.name.replace(/"/g, '&quot;');
                    wrap.innerHTML =
                        '<div class="flex items-baseline">' +
                        '<span class="font-display text-xl text-parchment hover:text-goldsoft transition-colors cursor-default">' + item.name + '</span>' +
                        '<span class="leader"></span>' +
                        '<span class="text-goldsoft text-sm font-medium">' + fmt(item.price) + '</span>' +
                        '</div>' +
                        (item.desc ? '<p class="text-muted text-sm mt-1.5 leading-relaxed pr-2">' + item.desc + '</p>' : '') +
                        '<div class="mt-2 flex flex-wrap gap-1.5">' + buildDietaryBadges(item) + '</div>' +
                        '<div class="mt-3 flex items-center gap-3">' +
                        '<button type="button" class="qty-btn cart-decr" data-name="' + safeName + '" aria-label="Remove one"><i class="fa-solid fa-minus text-[10px]"></i></button>' +
                        '<span class="cart-qty text-sm w-5 text-center text-parchment font-medium" data-name="' + safeName + '">0</span>' +
                        '<button type="button" class="qty-btn cart-incr" data-name="' + safeName + '" data-price="' + item.price + '" aria-label="Add to order"><i class="fa-solid fa-plus text-[10px]"></i></button>' +
                        '<span class="text-xs text-muted ml-1">add to order</span>' +
                        '</div>';
                    frag.appendChild(wrap);
                    totalFound++;
                });
            }
        });

        gridEl.appendChild(frag);

        if (totalFound === 0) {
            noResults.classList.remove('hidden');
            gridEl.classList.add('hidden');
        } else {
            noResults.classList.add('hidden');
            gridEl.classList.remove('hidden');
            requestAnimationFrame(function () {
                gridEl.querySelectorAll('.menu-item-enter').forEach(function (el, i) {
                    setTimeout(function () { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 25);
                });
            });
        }

        syncQtyDisplays();
    }

    /* ================= DIETARY FILTER BUTTONS ================= */
    var dietFilters = document.querySelectorAll('.diet-filter');
    dietFilters.forEach(function (btn) {
        btn.addEventListener('click', function () {
            dietFilters.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            if (currentSearch) {
                renderAllCategoriesSearch();
            } else {
                renderCategory(currentCategory);
            }
        });
    });

    /* ================= ORDER CART ================= */
    var CART_KEY = 'segreto-cart-v2';
    var cart = {};

    function loadCart() {
        try {
            var raw = localStorage.getItem(CART_KEY);
            if (raw) { cart = JSON.parse(raw) || {}; }
        } catch (e) { cart = {}; }
    }

    function saveCart() {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
    }

    function cartCount() {
        var n = 0;
        Object.keys(cart).forEach(function (k) { n += cart[k].qty; });
        return n;
    }

    function cartTotal() {
        var t = 0;
        Object.keys(cart).forEach(function (k) { t += cart[k].qty * cart[k].price; });
        return t;
    }

    function syncQtyDisplays() {
        gridEl.querySelectorAll('.cart-qty').forEach(function (span) {
            var name = span.getAttribute('data-name');
            span.textContent = cart[name] ? cart[name].qty : 0;
        });
    }

    var cartLauncher = document.getElementById('cart-launcher');
    var cartBadge = document.getElementById('cart-badge');
    var cartTotalLabel = document.getElementById('cart-launcher-total');
    var cartOverlay = document.getElementById('cart-overlay');
    var cartDrawer = document.getElementById('cart-drawer');
    var cartItemsEl = document.getElementById('cart-items');
    var cartEmptyEl = document.getElementById('cart-empty');
    var cartSubtotalEl = document.getElementById('cart-subtotal');
    var cartWhatsappBtn = document.getElementById('cart-whatsapp');

    function renderCartDrawer() {
        var names = Object.keys(cart);
        cartItemsEl.innerHTML = '';

        if (names.length === 0) {
            cartEmptyEl.classList.remove('hidden');
        } else {
            cartEmptyEl.classList.add('hidden');
            names.forEach(function (name) {
                var line = cart[name];
                var row = document.createElement('div');
                row.className = 'flex items-center justify-between gap-3 py-3 border-b border-white/10';
                row.innerHTML =
                    '<div class="min-w-0">' +
                    '<div class="text-sm text-parchment truncate">' + name + '</div>' +
                    '<div class="text-xs text-muted">' + fmt(line.price) + ' each</div>' +
                    '</div>' +
                    '<div class="flex items-center gap-2 shrink-0">' +
                    '<button type="button" class="qty-btn drawer-decr" data-name="' + name.replace(/"/g, '&quot;') + '" aria-label="Remove one"><i class="fa-solid fa-minus text-[10px]"></i></button>' +
                    '<span class="text-sm w-5 text-center font-medium">' + line.qty + '</span>' +
                    '<button type="button" class="qty-btn drawer-incr" data-name="' + name.replace(/"/g, '&quot;') + '" data-price="' + line.price + '" aria-label="Add one"><i class="fa-solid fa-plus text-[10px]"></i></button>' +
                    '</div>';
                cartItemsEl.appendChild(row);
            });
        }

        cartSubtotalEl.textContent = fmt(cartTotal());
        var count = cartCount();
        cartBadge.textContent = count;
        cartBadge.classList.toggle('hidden', count === 0);
        cartTotalLabel.textContent = count > 0 ? fmt(cartTotal()) : 'Order';
        cartWhatsappBtn.classList.toggle('opacity-50', count === 0);
        cartWhatsappBtn.classList.toggle('pointer-events-none', count === 0);
    }

    function addToCart(name, price) {
        if (!cart[name]) { cart[name] = { price: price, qty: 0 }; }
        cart[name].qty += 1;
        saveCart();
        syncQtyDisplays();
        renderCartDrawer();

        cartBadge.classList.remove('pop');
        void cartBadge.offsetWidth;
        cartBadge.classList.add('pop');

        showToast(name + ' added to order');
    }

    function removeFromCart(name) {
        if (!cart[name]) return;
        cart[name].qty -= 1;
        if (cart[name].qty <= 0) { delete cart[name]; }
        saveCart();
        syncQtyDisplays();
        renderCartDrawer();
    }

    gridEl.addEventListener('click', function (e) {
        var incr = e.target.closest('.cart-incr');
        var decr = e.target.closest('.cart-decr');
        if (incr) { addToCart(incr.getAttribute('data-name'), Number(incr.getAttribute('data-price'))); }
        if (decr) { removeFromCart(decr.getAttribute('data-name')); }
    });

    cartItemsEl.addEventListener('click', function (e) {
        var incr = e.target.closest('.drawer-incr');
        var decr = e.target.closest('.drawer-decr');
        if (incr) { addToCart(incr.getAttribute('data-name'), Number(incr.getAttribute('data-price'))); }
        if (decr) { removeFromCart(decr.getAttribute('data-name')); }
    });

    function openDrawer() {
        cartOverlay.classList.add('open');
        cartDrawer.classList.add('open');
        cartLauncher.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        cartOverlay.classList.remove('open');
        cartDrawer.classList.remove('open');
        cartLauncher.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    cartLauncher.addEventListener('click', openDrawer);
    cartOverlay.addEventListener('click', closeDrawer);
    document.getElementById('cart-close').addEventListener('click', closeDrawer);

    document.getElementById('cart-clear').addEventListener('click', function () {
        cart = {};
        saveCart();
        syncQtyDisplays();
        renderCartDrawer();
    });

    cartWhatsappBtn.addEventListener('click', function (e) {
        if (cartCount() === 0) { e.preventDefault(); return; }
        var lines = Object.keys(cart).map(function (name) {
            var l = cart[name];
            return '- ' + name + ' x' + l.qty + ' (' + fmt(l.price * l.qty) + ')';
        });
        var text = "Hi Segreto! 🍽️ I'd like to order:\n" + lines.join('\n') +
            '\nSubtotal: ' + fmt(cartTotal()) +
            '\n\nName: \nDelivery address: \nPayment: ';
        cartWhatsappBtn.setAttribute('href', 'https://wa.me/8801977197254?text=' + encodeURIComponent(text));
    });

    loadCart();
    renderCategory(categories[0]);
    renderCartDrawer();

    /* ================= GALLERY LIGHTBOX ================= */
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var galleryItems = document.querySelectorAll('.gallery-item');
    var lightboxIndex = 0;

    var galleryImages = [];
    galleryItems.forEach(function (item) {
        var img = item.querySelector('img');
        var caption = item.getAttribute('data-caption') || '';
        galleryImages.push({ src: img.src, alt: img.alt, caption: caption });
    });

    function openLightbox(index) {
        lightboxIndex = index;
        var item = galleryImages[index];
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightboxCaption.textContent = item.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(dir) {
        lightboxIndex = (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
        var item = galleryImages[lightboxIndex];
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        setTimeout(function () {
            lightboxImg.src = item.src;
            lightboxImg.alt = item.alt;
            lightboxCaption.textContent = item.caption;
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 200);
    }

    galleryItems.forEach(function (item, i) {
        item.addEventListener('click', function () { openLightbox(i); });
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function () { navigateLightbox(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { navigateLightbox(1); });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Lightbox swipe
    var lbTouchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) { lbTouchStartX = e.changedTouches[0].screenX; }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
        var diff = lbTouchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) { diff > 0 ? navigateLightbox(1) : navigateLightbox(-1); }
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    /* ================= TESTIMONIALS CAROUSEL ================= */
    var testiTrack = document.getElementById('testimonials-track');
    var testiSlides = document.querySelectorAll('.testimonial-slide');
    var testiDotsContainer = document.getElementById('testi-dots');
    var testiPrev = document.getElementById('testi-prev');
    var testiNext = document.getElementById('testi-next');
    var testiCurrentIndex = 0;
    var testiAutoTimer = null;
    var testiSlidesPerView = window.innerWidth >= 768 ? 3 : 1;
    var testiTotalSlides = testiSlides.length;
    var testiMaxIndex = Math.max(0, testiTotalSlides - testiSlidesPerView);

    function buildTestiDots() {
        testiDotsContainer.innerHTML = '';
        var numDots = testiMaxIndex + 1;
        for (var i = 0; i <= testiMaxIndex; i++) {
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            (function (idx) {
                dot.addEventListener('click', function () { goToTestiSlide(idx); });
            })(i);
            testiDotsContainer.appendChild(dot);
        }
    }

    function goToTestiSlide(index) {
        testiCurrentIndex = Math.max(0, Math.min(index, testiMaxIndex));
        var slideWidth = testiSlidesPerView > 1 ? (100 / testiSlidesPerView) : 100;
        var offset = testiCurrentIndex * (100 / testiSlidesPerView);
        testiTrack.style.transform = 'translateX(-' + offset + '%)';

        testiDotsContainer.querySelectorAll('button').forEach(function (d, i) {
            d.classList.toggle('active', i === testiCurrentIndex);
        });

        resetTestiTimer();
    }

    function nextTestiSlide() {
        goToTestiSlide(testiCurrentIndex >= testiMaxIndex ? 0 : testiCurrentIndex + 1);
    }

    function startTestiAutoPlay() {
        clearInterval(testiAutoTimer);
        testiAutoTimer = setInterval(nextTestiSlide, 5000);
    }

    function resetTestiTimer() {
        clearInterval(testiAutoTimer);
        startTestiAutoPlay();
    }

    if (testiPrev) testiPrev.addEventListener('click', function () { goToTestiSlide(testiCurrentIndex - 1); });
    if (testiNext) testiNext.addEventListener('click', nextTestiSlide);

    // Set initial slide widths
    testiSlides.forEach(function (slide) {
        slide.style.width = (100 / testiSlidesPerView) + '%';
    });

    buildTestiDots();
    startTestiAutoPlay();

    // Testimonials touch swipe
    var testiTouchStartX = 0;
    var testiTrackOuter = document.getElementById('testimonials-track-outer');
    if (testiTrackOuter) {
        testiTrackOuter.addEventListener('touchstart', function (e) { testiTouchStartX = e.changedTouches[0].screenX; }, { passive: true });
        testiTrackOuter.addEventListener('touchend', function (e) {
            var diff = testiTouchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) { diff > 0 ? nextTestiSlide() : goToTestiSlide(testiCurrentIndex - 1); }
        }, { passive: true });
        testiTrackOuter.addEventListener('mouseenter', function () { clearInterval(testiAutoTimer); });
        testiTrackOuter.addEventListener('mouseleave', startTestiAutoPlay);
    }

    /* ================= SOCIAL PROOF TICKER ================= */
    var socialProofMessages = [
        '🔥 47 people are viewing this restaurant right now',
        '✅ 12 reservations made today',
        '⭐ "Best fine dining in Dhaka" — Tanvir K., 2 hours ago',
        '🍽️ Table bookings filling fast this weekend',
        '📱 8 orders placed via WhatsApp in the last hour',
        '🎉 3 birthday dinners celebrated here today',
        '💬 "Absolutely loved the Ribeye!" — Sabrina A., 1 hour ago',
        '🟢 Kitchen is open — perfect time to visit!'
    ];
    var proofIndex = 0;
    var proofEl = document.getElementById('social-proof-text');

    function rotateSocialProof() {
        if (!proofEl) return;
        proofEl.style.opacity = '0';
        setTimeout(function () {
            proofEl.textContent = socialProofMessages[proofIndex % socialProofMessages.length];
            proofEl.style.opacity = '1';
            proofIndex++;
        }, 500);
    }

    if (proofEl) {
        proofEl.textContent = socialProofMessages[0];
        proofIndex = 1;
        setInterval(rotateSocialProof, 4000);
    }

    /* ================= TILT EFFECT ON CARDS ================= */
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.tilt-card').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = (y - centerY) / centerY * -4;
                var rotateY = (x - centerX) / centerX * 4;
                card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    /* ================= MAGNETIC BUTTONS ================= */
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.magnetic').forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
            });
        });
    }

    /* ================= PARALLAX ORBS ================= */
    var parallaxOrbs = document.querySelectorAll('.parallax-orb');
    if (parallaxOrbs.length && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            parallaxOrbs.forEach(function (orb) {
                var speed = parseFloat(orb.getAttribute('data-speed')) || 0.02;
                var scrolled = window.pageYOffset;
                orb.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
            });
        }, { passive: true });
    }

    /* ================= HERO CAROUSEL ================= */
    var heroCarousel = document.getElementById('hero-carousel');
    var slides = heroCarousel ? heroCarousel.querySelectorAll('.hero-slide') : [];
    var currentSlide = 0;
    var slideInterval = 6000;
    var autoTimer = null;
    var isPaused = false;

    function goToSlide(index) {
        if (!slides.length || index === currentSlide) return;

        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');

        var titleEl = document.getElementById('hero-title');
        var descEl = document.getElementById('hero-desc');
        var targetSlide = slides[currentSlide];

        if (titleEl && descEl && targetSlide) {
            var newTitle = targetSlide.getAttribute('data-title');
            var newDesc = targetSlide.getAttribute('data-desc');

            if (newTitle && newDesc) {
                titleEl.classList.add('text-swapping');
                descEl.classList.add('text-swapping');

                setTimeout(function () {
                    titleEl.innerHTML = newTitle;
                    descEl.textContent = newDesc;
                    splitTextIntoChars(titleEl, 0.04);
                    titleEl.classList.remove('text-swapping');
                    descEl.classList.remove('text-swapping');
                }, 350);
            }
        }

        resetTimer();
    }

    function nextSlide() {
        if (!slides.length) return;
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        if (!slides.length) return;
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoPlay() {
        clearInterval(autoTimer);
        autoTimer = setInterval(function () {
            if (!isPaused) nextSlide();
        }, slideInterval);
    }

    function resetTimer() {
        clearInterval(autoTimer);
        startAutoPlay();
    }

    if (heroCarousel && slides.length > 0) {
        heroCarousel.addEventListener('mouseenter', function () { isPaused = true; });
        heroCarousel.addEventListener('mouseleave', function () { isPaused = false; });

        var touchStartX = 0;
        var touchEndX = 0;
        heroCarousel.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        heroCarousel.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
            }
        }, { passive: true });

        startAutoPlay();
    }

    /* ================= RESERVATION FORM ================= */
    var form = document.getElementById('reserve-form');
    var status = document.getElementById('form-status');
    var submitBtn = document.getElementById('reserve-submit');

    // Set min date to today
    var rDate = document.getElementById('r-date');
    if (rDate) {
        var bdToday = getBDTime();
        var yyyy = bdToday.getFullYear();
        var mm = String(bdToday.getMonth() + 1).padStart(2, '0');
        var dd = String(bdToday.getDate()).padStart(2, '0');
        rDate.setAttribute('min', yyyy + '-' + mm + '-' + dd);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            status.textContent = 'Please fill in all required fields.';
            status.className = 'text-sm text-red-300';
            return;
        }
        var name = document.getElementById('r-name').value.trim();
        var phone = document.getElementById('r-phone').value.trim();
        var guests = document.getElementById('r-guests').value;
        var date = document.getElementById('r-date').value;
        var time = document.getElementById('r-time').value;
        var occasion = document.getElementById('r-occasion').value;
        var note = document.getElementById('r-note').value.trim();

        // Build WhatsApp pre-fill message
        var waText = 'Hi Segreto! 🎉 I\'d like to make a reservation:\n' +
            'Name: ' + name + '\n' +
            'Phone: ' + phone + '\n' +
            'Date: ' + date + '\n' +
            'Time: ' + (time || 'Flexible') + '\n' +
            'Guests: ' + guests + '\n' +
            (occasion ? 'Occasion: ' + occasion + '\n' : '') +
            (note ? 'Notes: ' + note : '');

        status.className = 'text-sm text-goldsoft';
        status.textContent = 'Thank you, ' + name + '! We\'ll call ' + phone + ' to confirm. Or click WhatsApp below.';

        // Update the WhatsApp link
        var waLink = form.querySelector('a[href*="wa.me"]');
        if (waLink) {
            waLink.setAttribute('href', 'https://wa.me/8801977197254?text=' + encodeURIComponent(waText));
        }

        form.reset();
    });

    /* ================= NEWSLETTER FORM ================= */
    var nlForm = document.getElementById('newsletter-form');
    var nlStatus = document.getElementById('nl-status');

    if (nlForm) {
        nlForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = document.getElementById('nl-email').value.trim();
            if (!email || !email.includes('@')) {
                nlStatus.textContent = 'Please enter a valid email address.';
                nlStatus.className = 'text-sm mt-4 text-red-300';
                return;
            }
            nlStatus.textContent = '✓ You\'re on the list! Watch for exclusive Segreto offers.';
            nlStatus.className = 'text-sm mt-4 text-goldsoft';
            nlForm.reset();
        });
    }

    /* ================= FOOTER YEAR ================= */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ================= SMOOTH SECTION REVEALS ================= */
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('section').forEach(function (section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    var heroSection = document.getElementById('top');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'none';
    }

    /* ================= ACTIVE NAV LINK ================= */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        var scrollY = window.pageYOffset + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    document.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    /* ================= FAQ SMOOTH ANIMATION ================= */
    document.querySelectorAll('#faq-container details').forEach(function (detail) {
        var summary = detail.querySelector('summary');
        if (!summary) return;
        summary.addEventListener('click', function () {
            setTimeout(function () {
                var content = detail.querySelector('.text-muted');
                if (content) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-5px)';
                    content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    requestAnimationFrame(function () {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    });
                }
            }, 50);
        });
    });

    /* ================= FESTIVE BANNER CLOSE ================= */
    var banner = document.getElementById('festive-banner');
    var bannerClose = document.getElementById('banner-close');
    if (banner && bannerClose) {
        bannerClose.addEventListener('click', function () {
            banner.classList.add('hidden');
            try { localStorage.setItem('segreto-banner-hidden', '1'); } catch (e) { /* ignore */ }
        });
        try {
            if (localStorage.getItem('segreto-banner-hidden') === '1') {
                banner.classList.add('hidden');
            }
        } catch (e) { /* ignore */ }
    }

    /* ================= SMOOTH HOVER EFFECTS ================= */
    document.querySelectorAll('.card-plum').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    /* ================= FORM INPUT ANIMATIONS ================= */
    document.querySelectorAll('#reserve-form input, #reserve-form textarea, #reserve-form select').forEach(function (input) {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });

    /* ================= WHATSAPP BUBBLE SHOW/HIDE ================= */
    var waBubble = document.getElementById('whatsapp-bubble');
    // Show after scrolling a bit
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            if (waBubble) waBubble.style.opacity = '1';
        }
    }, { passive: true });

    /* ================= KEYBOARD NAVIGATION (hero) ================= */
    document.addEventListener('keydown', function (e) {
        if (lightbox && lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

})();
