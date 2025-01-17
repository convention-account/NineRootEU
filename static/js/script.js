document.addEventListener('DOMContentLoaded', function () {
    // Плавная прокрутка к секции с каруселями
    document.getElementById('btnTry').addEventListener('click', function () {
        document.getElementById('carouselContainer').scrollIntoView({ behavior: 'smooth' });
    });

    // Функция для отображения текста и карточек при прокрутке
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('.parallax-text, .parallax-card').forEach(element => {
        observer.observe(element);
    });

    // Обработчики для стрелок карусели
    const handleArrowClick = (e) => {
        const direction = e.target.getAttribute('data-direction');
        const carouselRow = e.target.parentElement;
        const cards = carouselRow.querySelectorAll('.card');
        const firstCard = cards[0];
        const lastCard = cards[cards.length - 1];

        if (direction === 'left') {
            carouselRow.insertBefore(lastCard, firstCard);
            lastCard.classList.add('entering');
        } else {
            carouselRow.appendChild(firstCard);
            firstCard.classList.add('entering');
        }

        // Удаление класса entering после завершения анимации
        setTimeout(() => {
            firstCard.classList.remove('entering');
            lastCard.classList.remove('entering');
        }, 500);

        // Перемещение карточек с плавной анимацией
        cards.forEach(card => {
            card.style.transition = 'none';
            card.style.transform = 'translateX(100%)';
            requestAnimationFrame(() => {
                card.style.transition = '';
                card.style.transform = '';
            });
        });
    };

    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.addEventListener('click', handleArrowClick);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const newsSlider = document.getElementById('newsSlider');
    const newsItems = Array.from(newsSlider.getElementsByClassName('news-item'));
    const navDots = Array.from(document.getElementsByClassName('news-nav-dot'));
    let currentSlide = 0;
    const totalSlides = newsItems.length;

    function showSlide(index) {
        newsSlider.style.transform = `translateX(-${index * 100}%)`;
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const nextSlide = (currentSlide + 1) % totalSlides;
        showSlide(nextSlide);
    }

    function prevSlide() {
        const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevSlide);
    }

    // Show the first slide
    showSlide(currentSlide);

    // Auto-slide every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Stop auto-slide on hover
    newsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // Resume auto-slide on mouse leave
    newsSlider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Add event listeners for navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.news-item');
const totalSlides = slides.length;
const slider = document.querySelector('.news-slider');
const dots = document.querySelectorAll('.news-nav-dot');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

function goToSlide(slideIndex) {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots[currentSlide].classList.remove('active');
    dots[slideIndex].classList.add('active');
    currentSlide = slideIndex;
}
