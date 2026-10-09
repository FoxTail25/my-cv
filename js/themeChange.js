// Ждем полную загрузку DOM-дерева перед выполнением скрипта
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Находим нужные элементы в DOM
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // 2. Функция для установки темы и обновления иконки на кнопке
    const setTheme = (theme) => {
        if (theme === 'dark') {
            bodyElement.classList.add('dark-theme');
            themeToggleBtn.textContent = '☀️'; // Меняем луну на солнце
            themeToggleBtn.setAttribute('aria-label', 'Включить светлую тему');
        } else {
            bodyElement.classList.remove('dark-theme');
            themeToggleBtn.textContent = '🌙'; // Меняем солнце на луну
            themeToggleBtn.setAttribute('aria-label', 'Включить тёмную тему');
        }
    };

    // 3. Проверяем сохраненную тему пользователя при первой загрузке страницы
    const savedTheme = localStorage.getItem('portfolio-foxtail25-theme');

    if (savedTheme) {
        // Если пользователь уже заходил и выбрал тему — ставим её
        setTheme(savedTheme);
    } else {
        // Если темы в localStorage нет, проверяем системные настройки ОС (Media Query)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // 4. Обработчик клика по кнопке-переключателю
    themeToggleBtn.addEventListener('click', () => {
        // Проверяем текущее состояние: есть ли сейчас класс тёмной темы
        const isDarkNow = bodyElement.classList.contains('dark-theme');
        
        // Меняем тему на противоположную
        const newTheme = isDarkNow ? 'light' : 'dark';
        
        // Применяем изменения
        setTheme(newTheme);
        
        // Сохраняем выбор в localStorage, чтобы он не сбросился при перезагрузке страницы
        localStorage.setItem('portfolio-foxtail25-theme', newTheme);
    });

});
