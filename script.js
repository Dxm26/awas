    const header = document.getElementById('header');

    const headerLogo = document.getElementById('headerLogo');

    const contentLogo = document.getElementById('contentLogo');

    const sections = document.querySelectorAll('section');

    // Intersection Observer for section animations

    const secobserver = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          setTimeout(()=>{
            
           entry.target.classList.add('active');
          },260);


        } else {

          entry.target.classList.remove('active');

        }

      });

    });

    sections.forEach((section) => {

      secobserver.observe(section);

    });

    // Scroll-triggered logo blending

    window.addEventListener('scroll', () => {

      const scrollY = window.scrollY;

      const contentLogoRect = contentLogo.getBoundingClientRect();

      // Blend content logo with header logo

      if (contentLogoRect.top < 55) {

        contentLogo.classList.add('hidden');

        header.classList.add('scrolled');

        headerLogo.style.opacity = 1;

      } else {

        contentLogo.classList.remove('hidden');

        header.classList.remove('scrolled');

        headerLogo.style.opacity = 0;

      }

    });

    // Hide header logo on preload

    document.addEventListener('DOMContentLoaded', () => {

      headerLogo.style.opacity = 0;
      serviceCardAnim();
      setupSlider('sliderContainer1', 'slider1', 'before1');
      setupSlider('sliderContainer2', 'slider2', 'before2');
      carouselSlide();

    });


//service card animations on sceen viewpoint 
function serviceCardAnim(){
  const cards = document.querySelectorAll('.service-card');

            function checkVisibility() {

                const windowHeight = window.innerHeight;

                cards.forEach(card => {

                    const rect = card.getBoundingClientRect();

                    if (rect.top < windowHeight * 0.8) {

                        card.classList.add('visible');

                    } else {

                        card.classList.remove('visible'); // Remove class when out of view

                    }

                });

            }

            window.addEventListener('scroll', checkVisibility);

            

            checkVisibility(); // Initial check on page load
}

//Stats Animation
function animateStats(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.stat-number');

                    stats.forEach(stat => {
                        const target = +stat.dataset.target;
                        let count = 0;
                        const increment = Math.ceil(target / 100);
                        const plusSign = stat.querySelector(".plus-sign");

                        function updateCount() {
                            count += increment;
                            if (count >= target) {
                                stat.childNodes[0].textContent = target;
                                if (plusSign) {
                                    plusSign.style.opacity = "1";
                                    plusSign.style.transform = "translateX(0) scale(1)";
                                }
                            } else {
                                stat.childNodes[0].textContent = count;
                                requestAnimationFrame(updateCount);
                            }
                        }

                        // Reset before starting animation
                        stat.childNodes[0].textContent = "0";
                        if (plusSign) {
                            plusSign.style.opacity = "0";
                            plusSign.style.transform = "translateX(-5px) scale(0.8)";
                        }

                        updateCount();
                    });
                }
            });
        }

        const statobserverOptions = {
            root: null, // viewport
            threshold: 0.3 // Trigger when 30% of the stats section is visible
        };

        const statsWrapper = document.querySelector('.stats-wrapper');
        const statobserver = new IntersectionObserver(animateStats, statobserverOptions);
        statobserver.observe(statsWrapper);

// Footer Year
document.getElementById("footeryear").textContent = new Date().getFullYear();

// Before After Image Slider

function setupSlider(containerId, sliderId, beforeId) {
            const slider = document.getElementById(sliderId);
            const beforeImage = document.getElementById(beforeId);
            const container = document.getElementById(containerId);
            
            let isDragging = false;
            
            const startDragging = () => isDragging = true;
            const stopDragging = () => isDragging = false;
            
            const moveSlider = (e) => {
                if (!isDragging) return;
                let rect = container.getBoundingClientRect();
                let position = ((e.clientX - rect.left) / rect.width) * 100;
                position = Math.max(0, Math.min(100, position));
                beforeImage.style.width = position + '%';
                slider.style.left = position + '%';
            };
            
            slider.addEventListener('mousedown', startDragging);
            window.addEventListener('mouseup', stopDragging);
            window.addEventListener('mousemove', moveSlider);
            
            container.addEventListener('click', (e) => {
                let rect = container.getBoundingClientRect();
                let position = ((e.clientX - rect.left) / rect.width) * 100;
                position = Math.max(0, Math.min(100, position));
                beforeImage.style.width = position + '%';
                slider.style.left = position + '%';
            });
        }
// End of Image Slider

// Top Left Text Reveal 
const columnbox = document.getElementById("responsiveBox");

    // Soft vibration pattern

    const vibrate = (pattern) => {

      if (navigator.vibrate) {

        navigator.vibrate(pattern);

      }

    };

    // Activate transition with vibration

    const activateTransition = () => {

      vibrate([5, 10, 5]); // Softer pattern

      columnbox.classList.add("active");

    };

    // Deactivate transition with vibration

    const deactivateTransition = () => {

      columnbox.classList.remove("active");

      setTimeout(() => vibrate([5, 10, 5]), 500);

    };

    // Event listeners for hover (desktop)

    columnbox.addEventListener("mouseenter", activateTransition);

    columnbox.addEventListener("mouseleave", deactivateTransition);

    // Event listeners for touch (mobile)

    columnbox.addEventListener("touchstart", (event) => {

      event.preventDefault();

      activateTransition();

    });

    columnbox.addEventListener("touchend", (event) => {

      event.preventDefault();

      deactivateTransition();

    });

// End of Left Text Reveal

// 5 Carousels Slides
function carouselSlide(){
        const slides = document.querySelector('.slides');
            const indicatorsContainer = document.querySelector('.indicators');
            const totalSlides = document.querySelectorAll('.slide').length;
            let currentIndex = 0;
            let loopCount = 0;
            let maxLoops = 2;
            let startX = 0;
            let isSwiping = false;
            
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                });
                indicatorsContainer.appendChild(indicator);
            }
            
            function updateCarousel() {
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                document.querySelectorAll('.indicator').forEach((ind, i) => {
                    ind.classList.toggle('active', i === currentIndex);
                });
            }
            
            function autoSlide() {
                if (loopCount >= maxLoops) return;
                currentIndex = (currentIndex + 1) % totalSlides;
                if (currentIndex === 0) loopCount++;
                updateCarousel();
            }
            
            let slideInterval = setInterval(autoSlide, 3000);
            
            slides.addEventListener("touchstart", (e) => {
                startX = e.touches[0].clientX;
                isSwiping = true;
            });
            
            slides.addEventListener("touchmove", (e) => {
                if (!isSwiping) return;
                let moveX = e.touches[0].clientX;
                let diff = startX - moveX;
                if (diff > 50) {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    isSwiping = false;
                    updateCarousel();
                } else if (diff < -50) {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    isSwiping = false;
                    updateCarousel();
                }
            });
            
            slides.addEventListener("touchend", () => {
                isSwiping = false;
            });
      }
// End of Carousels

// Testimonials
 let currentIndex = 0;

        let autoSlideCount = 0;

        const maxLoops = 2;

        const testimonials = document.querySelectorAll('.testimonial');

        const dots = document.querySelectorAll('.dot');

        function showTestimonial(index) {

            testimonials.forEach((testimonial, i) => {

                testimonial.classList.toggle('active', i === index);

                dots[i].classList.toggle('active', i === index);

            });

        }

        function changeTestimonial(index) {

            currentIndex = index;

            showTestimonial(index);

        }

        function nextTestimonial() {

            currentIndex = (currentIndex + 1) % testimonials.length;

            showTestimonial(currentIndex);

        }

        function prevTestimonial() {

            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;

            showTestimonial(currentIndex);

        }

        function autoSlide() {

            if (autoSlideCount >= maxLoops * testimonials.length) return;

            nextTestimonial();

            autoSlideCount++;

        }

        let autoSlideInterval = setInterval(autoSlide, 5000);

        // Swipe Support

        let touchStartX = 0;

        let touchEndX = 0;

        document.querySelector('.testimonial-section').addEventListener('touchstart', (e) => {

            touchStartX = e.touches[0].clientX;

        });

        document.querySelector('.testimonial-section').addEventListener('touchend', (e) => {

            touchEndX = e.changedTouches[0].clientX;

            handleSwipe();

        });

        function handleSwipe() {

            if (touchStartX - touchEndX > 50) {

                nextTestimonial();

            } else if (touchEndX - touchStartX > 50) {

                prevTestimonial();

            }

        }

// End of Testimonials