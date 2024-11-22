const words = [
    { word: 'pen', translation: 'ручка', checked: false },
    { word: 'chair', translation: 'стілець', checked: false },
    { word: 'milk', translation: 'молоко', checked: false },
    { word: 'road', translation: 'дорога', checked: false },
    { word: 'cat', translation: 'кіт', checked: false },
    { word: 'sun', translation: 'сонце', checked: false },
    { word: 'car', translation: 'авто', checked: false },
    { word: 'money', translation: 'гроші', checked: false },
    { word: 'development', translation: 'розробка', checked: false },
    { word: 'tree', translation: 'дерево', checked: false }
];

let shuffledWords = [...words].sort(() => Math.random() - 0.5);
let total = shuffledWords.length;
let currentIndex = 0;
let correct = 0;
let incorrect = 0;

function updateStats() {
    $('#count').text(`${currentIndex + 1}/${total}`);
    $('.correct').text(correct);
    $('.incorrect').text(incorrect);
}

function reset() {
    currentIndex = 0;
    correct = 0;
    incorrect = 0;
    shuffledWords.forEach(word => {
        word.checked = false;
    });
    shuffledWords = [...words].sort(() => Math.random() - 0.5);
    updateCard();
    updateStats();
}

function updateCard() {
    const word = shuffledWords[currentIndex];
    $('#cardWord').text(word.word);
    $('#translate').val('');
}

function showModal() {
    const level = correct >= 8 ? 'Високий' : correct >= 5 ? 'Середній' : 'Низький';
    $('#resultMessage').text(`Ваш рівень знань: ${level}`);
    $('#modalOverlay').fadeIn();
}

function resultTranslate() {
    const word = shuffledWords[currentIndex];
    if (word.checked === true) {
        alert("Це слово вже було перекладене")
        return;
    }
    else {
        const userTranslation = $('#translate').val().trim().toLowerCase();
        if (userTranslation === word.translation) {
            correct++;
            alert('Вірно!');
        }
         else {
            incorrect++;
            alert(`Невірно. Правильна відповідь: ${word.translation}`);
        }
        currentIndex++;
        word.checked = true;
        if (correct + incorrect === total) {
            showModal();
        } else if (currentIndex >= total) {
            currentIndex = 0;
        }
        updateCard();
        updateStats();
    }
}
$('#translateButt').on('click', resultTranslate);
$('#next').on('click', function () {
    currentIndex = (currentIndex + 1) % total;
    updateCard();
    updateStats();
});

$('#previous').on('click', function () {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCard();
    updateStats();
});

$('#closeModal').on('click', function () {
    $('#modalOverlay').fadeOut();
});

$('#reset').on('click', function () {
    $('#modalOverlay').fadeOut();
    reset();
});

$(document).keydown(function (event) {
    switch (event.keyCode) {                
        case 37: {
            currentIndex = (currentIndex - 1 + total) % total;
            updateCard();
            updateStats();
        }
            break;
        case 39: {
            currentIndex = (currentIndex + 1) % total;
            updateCard();
            updateStats();
        }
            break;
        case 13: {
            resultTranslate();
        }
            break;
    }
});

updateStats();
updateCard();
