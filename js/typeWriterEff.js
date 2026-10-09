// Ждем полную загрузку DOM-дерева перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ (TYPEWRITER EFFECT)
    // ==========================================================================
    
    // Массив фраз, которые будут по очереди печататься на экране
    const phrases = [
        'Fullstack-разработчик',
        'Laravel & React Developer',
        'Vue & TypeScript Engineer',
        'Специалист по оптимизации кода'
    ];

    // Находим элемент, внутри которого будем менять текст
    // В нашем HTML макете это параграф с классом .typewriter
    const typewriterText = document.querySelector('.typewriter');
    
    let phraseIndex = 0; // Индекс текущей фразы в массиве
    let characterIndex = 0; // Индекс текущего символа в фразе
    let isDeleting = false; // Флаг: печатаем мы сейчас или стираем текст

    const typeEffect = () => {
        // Получаем текущую фразу целиком
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Если мы стираем текст: уменьшаем количество символов на 1
            typewriterText.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
        } else {
            // Если мы печатаем текст: увеличиваем количество символов на 1
            typewriterText.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
        }

        // Определяем скорость (задержку) анимации
        // Стирание текста должно происходить быстрее, чем его печать
        let typingSpeed = isDeleting ? 50 : 100;

        // Если фраза напечатана полностью
        if (!isDeleting && characterIndex === currentPhrase.length) {
            // Делаем паузу в конце фразы, чтобы пользователь успел её прочитать
            typingSpeed = 2000; 
            isDeleting = true; // Переключаемся в режим стирания
        } 
        // Если фраза стёрта полностью
        else if (isDeleting && characterIndex === 0) {
            isDeleting = false; // Переключаемся в режим печати
            phraseIndex++; // Переходим к следующей фразе в массиве
            
            // Если дошли до конца массива — возвращаемся к первой фразе
            if (phraseIndex === phrases.length) {
                phraseIndex = 0;
            }
            // Небольшая пауза перед началом печати новой фразы
            typingSpeed = 500;
        }

        // Запускаем функцию рекурсивно через setTimeout с рассчитанной скоростью
        setTimeout(typeEffect, typingSpeed);
    };

    // Запускаем эффект печатной машинки, если элемент найден на странице
    if (typewriterText) {
        typeEffect();
    }
});