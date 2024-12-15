document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    // 创建导航点
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // 更新导航点
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // 切换到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    // 下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    // 上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    }

    // 添加按钮事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // 自动播放
    let autoplayInterval = setInterval(nextSlide, 3000);

    // 鼠标悬停时暂停自动播放
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 3000);
    });

    // 触摸事件支持
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // 最小滑动距离
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
});