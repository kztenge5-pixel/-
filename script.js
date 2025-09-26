document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    
    const bgOptions = document.querySelectorAll('.bg-option');
    let selectedBg = 'bear.jpg';

    // Выбор фона
    bgOptions.forEach(option => {
        option.addEventListener('click', function() {
            bgOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedBg = this.getAttribute('data-bg');
        });
    });

    // Генерация мема
    generateBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Братишка, напиши текст сначала!');
            return;
        }

        const bgImage = new Image();
        
        // Разрешаем кросс-оригин для изображений
        bgImage.crossOrigin = "Anonymous";
        
        bgImage.onload = function() {
            canvas.width = bgImage.width;
            canvas.height = bgImage.height;
            
            // Очищаем canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Рисуем фон
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            
            // Настраиваем текст
            ctx.font = 'bold 48px "Arial Black", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            
            // Позиция текста
            const x = canvas.width / 2;
            const y = 20;
            
            // Рисуем текст с обводкой
            ctx.strokeText(text, x, y);
            ctx.fillText(text, x, y);
            
            // Показываем результат
            canvas.style.display = 'block';
            downloadBtn.style.display = 'inline-block';
        };

        bgImage.onerror = function() {
            alert('Ошибка загрузки фона! Проверь названия файлов.');
        };
        
        bgImage.src = selectedBg;
    });

    // Скачивание мема
    downloadBtn.addEventListener('click', function() {
        if (canvas.width === 0) {
            alert('Сначала сгенерируй мем!');
            return;
        }

        try {
            // Создаем временную ссылку
            const link = document.createElement('a');
            link.download = 'russian-power-meme.png';
            link.href = canvas.toDataURL('image/png');
            
            // Добавляем ссылку в документ и кликаем
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка скачивания! Попробуй другой браузер.');
        }
    });

    // Автовыбор первого фона при загрузке
    if (bgOptions.length > 0) {
        bgOptions[0].click();
    }
});