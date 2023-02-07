document.getElementById('btnTobegin').addEventListener('click', function () {   
    document.querySelector('.title-page').classList.add('hidden');              
    document.querySelector('.value-range').classList.remove('hidden');          
    document.querySelector('.valueRange').classList.remove('hidden');          
    document.querySelector('.form-inline').classList.remove('hidden');         
    document.querySelector('#btnTobegin').classList.add('hidden');              // Кнопка НАЧАТЬ ИГРУ 
    document.querySelector('#btnProceed').classList.remove('hidden');           // Кнопка ПРОДОЛЖИТЬ 
})

document.getElementById('btnProceed').addEventListener('click', function () {   
    document.querySelector('.value-range').classList.add('hidden');            
    document.querySelector('.terms').classList.remove('hidden');                // Условия 
    document.querySelector('.valueRange').classList.add('hidden');              
    document.querySelector('.form-inline').classList.add('hidden');            
    document.querySelector('.guessNumber').classList.remove('hidden');          // Фраза Загадайте любое целое число 
    document.querySelector('#btnProceed').classList.add('hidden');              // Кнопка ПРОДОЛЖИТЬ 
    document.querySelector('#btnPlay').classList.remove('hidden');              // Кнопка ИГРАТЬ 
    minValue = parseInt(document.querySelector('#formInputMin').value);
    maxValue = parseInt(document.querySelector('#formInputMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; // Значения меняются местами если max меньше min.
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})

// Клик по кнопке ИГРАТЬ
document.getElementById('btnPlay').addEventListener('click', function () {     
    document.querySelector('.terms').classList.add('hidden');                   
    document.querySelector('.question').classList.remove('hidden');           
    document.querySelector('.guessNumber').classList.add('hidden');            
    document.querySelector('.no-gutters').classList.remove('hidden');          
    document.querySelector('#btnPlay').classList.add('hidden');                
    document.querySelector('#btnLess').classList.remove('hidden');            
    document.querySelector('#btnEqual').classList.remove('hidden');             
    document.querySelector('#btnOver').classList.remove('hidden');              
    document.querySelector('.btn-link').classList.remove('hidden');             

    let answerNumber = Math.floor((minValue + maxValue) / 2); 
    let orderNumber = 1; 
    let gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField'); 
    const answerField = document.getElementById('answerField');

    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    function numberToText() 
    { 
        let number = Math.abs(answerNumber);
        let text = '';

        if (number == 0) {
            text = 'ноль';
            return text;
        }

        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }

        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }

        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }

        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    function numberToTextHundreds() 
    {
        let unitsTeensDozens = Math.abs(answerNumber) % 100;

        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }

        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }

        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }

    orderNumberField.innerText = orderNumber; // Вопрос № 1
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;

    document.getElementById('btnLess').addEventListener('click', function () { // Код для кнопки «Меньше».
        if (gameRun) 
        {
            if (minValue === maxValue || minValue == answerNumber) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали неправильное число!\n`
                        break;

                    case 1:
                        answerPhrase = `Вы забыли, какое число загадали?\n`
                        break;

                    case 2:
                        answerPhrase = `Вы ошиблись с числом!\n`
                        break;

                    case 3:
                        answerPhrase = `Не жульничайте!\n`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                maxValue = answerNumber - 1; // Изменение верхней границы поискового диапазона.
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // Генерируется случайное число от 0 до 4.
                switch (phraseRandom) {
                    case 1:
                        answerPhrase = `Наверное, это число `
                        break;

                    case 2:
                        answerPhrase = `Возможно `
                        break;

                    case 3:
                        answerPhrase = `Это число `
                        break;

                    case 4:
                        answerPhrase = `Скорее всего это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnOver').addEventListener('click', function () { // Код для кнопки «Больше».
        if (gameRun) {
            if (minValue === maxValue) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали неправильное число!\n`
                        break;

                    case 1:
                        answerPhrase = `Играйте честно\n`
                        break;

                    case 2:
                        answerPhrase = `Вы ошиблись с числом!\n`
                        break;

                    case 3:
                        answerPhrase = `Не жульничайте!\n`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber + 1; // Изменение нижней границы поискового диапазона.
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // Генерируется случайное число от 0 до 4.
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Вы загадали число `
                        break;

                    case 1:
                        answerPhrase = `Не згаю, но это число `
                        break;

                    case 2:
                        answerPhrase = `Скорее всего `
                        break;

                    case 3:
                        answerPhrase = `Это число `
                        break;

                    case 4:
                        answerPhrase = `Скорее всего это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnEqual').addEventListener('click', function () { // Код для кнопки "Верно".
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Я угадал!\n`
                    break;

                case 1:
                    answerPhrase = `Вот так! \n`
                    break;

                case 2:
                    answerPhrase = `Супер!!!\n`
                    break;

                case 3:
                    answerPhrase = `Я выиграл!\n`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
    })
})

document.getElementById('btnRetry').addEventListener('click', function () {    
    document.querySelector('.question').classList.toggle('hidden');             
    document.querySelector('.value-range').classList.toggle('hidden');         
    document.querySelector('.no-gutters').classList.toggle('hidden');           
    document.querySelector('.valueRange').classList.toggle('hidden');           
    document.querySelector('.form-inline').classList.toggle('hidden');          
    document.querySelector('#btnEqual').classList.toggle('hidden');             // Кнопка Верно! 
    document.querySelector('#btnOver').classList.toggle('hidden');              // Кнопка больше 
    document.querySelector('.btn-link').classList.toggle('hidden');             // Кнопка Заново 
    document.querySelector('#btnLess').classList.toggle('hidden');              // Кнопка меньше 
    document.querySelector('#btnProceed').classList.toggle('hidden');           // Кнопка Продолжить 
    document.querySelector('#formInputMax').value = '';
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;

             if (maxValue < minValue) {
                     [maxValue, minValue] = [minValue, maxValue]; 
                }
            if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
                      minValue = 0;
                      maxValue = 100;
                }

    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

    document.getElementById('btnProceed').addEventListener('click', function () {            
        document.querySelector('.value-range').classList.add('hidden');             
        document.querySelector('.terms').classList.remove('hidden');               
        document.querySelector('.valueRange').classList.add('hidden');              
        document.querySelector('.form-inline').classList.add('hidden');             
        document.querySelector('.guessNumber').classList.remove('hidden');         
        document.querySelector('#btnProceed').classList.add('hidden');                    // Кнопка ПРОДОЛЖИТЬ 
        document.querySelector('#btnPlay').classList.remove('hidden');                   // Кнопка ИГРАТЬ
    })
})