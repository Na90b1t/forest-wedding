// Галлерея
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const images = document.querySelectorAll('.gallery-image');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    let currentIndex = 0;
    const totalImages = images.length;
    
    // Получаем вычисленные стили для точного расчета ширины
    function getImageWidth() {
        const computedStyle = window.getComputedStyle(images[0]);
        const width = images[0].offsetWidth;
        const marginLeft = parseFloat(computedStyle.marginLeft) || 0;
        const marginRight = parseFloat(computedStyle.marginRight) || 0;
        return width + marginLeft + marginRight;
    }
    
    function updatePosition() {
        const imageWidth = getImageWidth();
        const translateX = -currentIndex * imageWidth;
        galleryContainer.style.transform = `translateX(${translateX}px)`;
        galleryContainer.style.transition = 'transform 0.5s ease-in-out';
    }
    
    function nextSlide() {
        if (currentIndex < totalImages - 3) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updatePosition();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalImages - 3;
        }
        updatePosition();
    }
    
    // Инициализация
    updatePosition();
    
    // Обработчики событий
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Обновляем позицию при изменении размера окна
    window.addEventListener('resize', updatePosition);
});

// Дресс-код
const sliderGallery1 = document.getElementById('slider-gallery-1');
const sliderGallery2 = document.getElementById('slider-gallery-2');

const toggleClass = () => {
    sliderGallery1.classList.toggle('track');
    sliderGallery2.classList.toggle('track');
}

// Наши желания
const sliderWish1 = document.getElementById('slider-wish-1');
const sliderWish2 = document.getElementById('slider-wish-2');
const contWish1 = document.getElementById('arrow-wish-1');
const contWish2 = document.getElementById('arrow-wish-2');

const toggleClass1 = () => {
    sliderWish1.classList.toggle('track');
    sliderWish2.classList.toggle('track');
    contWish1.classList.toggle('hide');
    contWish2.classList.toggle('hide');
}

// Форма
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Отменяем стандартную отправку

    // Собираем значения
    const name = document.querySelector('input[type="text"]').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value || '';
    const drink = document.querySelector('input[name="drink"]:checked')?.value || '';

    // Проверка: имя обязательно
    if (!name) {
        alert("Пожалуйста, введите Ваше имя \u{1F98B}");
        return;
    }

    // Отправляем через fetch
    fetch('send.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            attendance: attendance,
            drink: drink
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('data', data, typeof data);
        
        alert('Благодарим Вас за ответ \u{1F438}'); // Показываем ответ от сервера
        // Очищаем форму
        // document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert("Произошла ошибка при отправке \u{1F41E}");
    });
});