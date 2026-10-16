    // ==========================================================================
    // ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ (AJAX)
    // ==========================================================================
    const feedbackForm = document.getElementById('feedback-form');
    const formStatus = document.getElementById('form-status');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Предотвращаем перезагрузку страницы
            
            formStatus.textContent = 'Отправка...';
            formStatus.className = 'form-status';

            // Собираем данные из полей формы
            const formData = new FormData(feedbackForm);
            
            // Объект с данными для отправки
            const data = {
                name: formData.get('name'),
                contact: formData.get('contact'),
                message: formData.get('message')
            };

            try {
                // Временная имитация отправки для проверки интерфейса
                // На следующем шаге мы подставим сюда реальный URL шлюза (Telegram или Web3Forms)
                // await new Promise(resolve => setTimeout(resolve, 1000)); 

                // // Если отправка прошла успешно:
                // formStatus.textContent = '✨ Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.';
                // formStatus.classList.add('success');
                // feedbackForm.reset(); // Очищаем форму
                  // Отправляем данные на шлюз Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    formStatus.textContent = '✨ Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.';
                    formStatus.className = 'form-status success';
                    feedbackForm.reset(); // Очищаем поля формы
                } else {
                    throw new Error(result.message);
                }


            } catch (error) {
                // Если произошла ошибка сети
                formStatus.textContent = '❌ Ошибка при отправке. Пожалуйста, напишите мне напрямую на почту.';
                formStatus.classList.add('error');
            }
        });
    }
