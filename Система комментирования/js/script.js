/* делегирование событий которое обрабатывает события для новых элементов, добавленных на страницу динамически + добавление в избранное + изменение рейтинга */
document.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.favorite-block')) {
        const favoriteBlock = target.closest('.favorite-block');
        const favoriteImage = favoriteBlock.querySelector('.favorite-img');
        const favoriteText = favoriteBlock.querySelector('.favorite-text');

        if (favoriteImage.getAttribute('src') === '../images/svg/hollow-heart.svg') {
            favoriteImage.setAttribute('src', '../images/svg/favorite-heart.svg');
            favoriteText.textContent = 'В избранном';
        } else {
            favoriteImage.setAttribute('src', '../images/svg/hollow-heart.svg');
            favoriteText.textContent = 'В избранное';
        }
    }

    if (target.closest('.rating-block')) {
        const ratingBlock = target.closest('.rating-block');
        const decreaseButton = ratingBlock.querySelector('.rating-button_decrease');
        const increaseButton = ratingBlock.querySelector('.rating-button_increase');
        const ratingNumber = ratingBlock.querySelector('.rating-number');
        let currentNumber = parseInt(ratingNumber.textContent);

        if (target === decreaseButton) {
            --currentNumber;
        } else if (target === increaseButton) {
            ++currentNumber;
        }

        ratingNumber.textContent = currentNumber;
        updateColor(ratingNumber, currentNumber);
    }

    const commentFooter = document.querySelector('.comment-footer');
    const originalContext = commentFooter.innerHTML;

    if (target.closest('.respond-block')) {
        const currentCommentFooter = target.closest('.comment-footer');
        const currentCommentWrapper = target.closest('.comment-wrapper');

        currentCommentFooter.innerHTML = `
            <input class="respond-input">
            <button type="button" class="respond-button">Отправить</button>
            <button type="button" class="respond-deny-button">Отменить</button>
        `

        const respondInput = document.querySelector('.respond-input');
        const respondButton = document.querySelector('.respond-button');
        const respondDenyButton = document.querySelector('.respond-deny-button');

        respondInput.addEventListener('input', () => {
            updateButtonsColor(respondInput.value, respondButton, counterSpan);
        });

        function addReply() {
            const reply = `
            <div class="respond-comment-wrapper">
                    <img src="${userImg}" alt="${name}" class="user-comment__img">
                    <div class="comment">
                        <div class="comment-header">
                            <span class="username">${name}</span>
                            <img src="../images/svg/respond-arrow.svg" alt="стрелка влево">
                            <span class="answered-comment__username">Алексей_1994b</span>
                            <span class="date">${date}</span>
                        </div>
                        <p class="comment-text">${text}</p>
                        <div class="comment-footer">
                            <div class="favorite-block">
                                <img src="../images/svg/hollow-heart.svg" alt="пустое сердечко" class="favorite-img">
                                <span class="favorite-text">В избранное</span>
                            </div>
                            <div class="rating-block">
                                <img src="../images/svg/rating-button_decrease.svg" alt="кружок с минусом" class="rating-button_decrease">
                                <span class="rating-number">0</span>
                                <img src="../images/svg/rating-button_increase.svg" alt="кружок с плюсом" class="rating-button_increase">
                            </div>
                        </div>
                    </div>
                </div>
            `
            currentCommentWrapper.innerHTML += reply;
            currentCommentWrapper.querySelector('.comment-footer').innerHTML = originalContext
        }

        respondButton.addEventListener('click', function() {
            addReply(userImg, name, date, text = respondInput.value)
        })
    }

    if (target.closest('.respond-deny-button')) {
        target.closest('.comment-footer').innerHTML = originalContext;
    }
});

function updateColor(ratingNumber, currentNumber) {
    if (currentNumber < 0) {
        ratingNumber.style.color = '#FF0000';
    } else if (currentNumber > 0) {
        ratingNumber.style.color = '#8AC540';
    } else {
        ratingNumber.style.color = '';
    }
}

/* Клик на блок в header увеличивает его в размере и меняет цвет + добавляет второму блоку другую картинку + выпадающий список */
const blocks = document.querySelectorAll('.header-block');

blocks.forEach((block => {
    block.addEventListener('click', function() {
        blocks.forEach((b => {
            if(b !== this) {
                b.style.fontSize = '';
                b.style.color = '';
                b.style.borderBottom = '';
            }
        }))
        this.style.color = 'black';
        this.style.fontSize = '20px';
        this.style.borderBottom = '3px solid black';
    })

    const secondHeaderBlock = blocks[1];
    const imgElement = secondHeaderBlock.querySelector('.estimates-img');
    const unfoldingList = document.querySelector('.unfolding-list');
    const unfoldingListItems = document.querySelectorAll('.unfolding-list__item');

    secondHeaderBlock.addEventListener('click', () => {
        currentSrc = imgElement.getAttribute('src');
        newSrc = currentSrc === '../images/svg/треугольник.svg' ? '../images/svg/треугольник вниз.svg' : '../images/svg/треугольник.svg';
        imgElement.setAttribute('src', newSrc);

        if (unfoldingList.classList.contains('unfold') == true) {
            unfoldingList.classList.remove('unfold');
        } else {
            unfoldingList.classList.add('unfold');
        }
    })

    unfoldingListItems.forEach(item => {
        item.addEventListener('click', () => {
            const unfoldingListItemsImg = item.querySelector('.unfolding-list__item-img');

            document.querySelectorAll('.unfolding-list__item-img').forEach(img => {
                img.removeAttribute('src');
            });

            unfoldingListItemsImg.src = '../images/svg/галочка.svg';
            unfoldingListItemsImg.style.paddingLeft = '8px';
            unfoldingListItemsImg.style.paddingRight = '8px';
        });
    });
}))

/* Манипуляции с textarea */

const textArea = document.getElementById('user-comment__textarea');
const counterSpan = document.querySelector('.symbols-limit');
const sendButton = document.querySelector('.send-button');

function updateButtonsColor(textValue, sendingButton, changingSpan) {
    const textValueLength = textValue.length
    if (textValueLength > 1000) {
        changingSpan.textContent = textValueLength + '/1000 Слишком длинное сообщение';
        changingSpan.style.color = '#FF0000';
        sendingButton.disabled = true;
        sendingButton.style.backgroundColor = '#A1A1A1';
    } else {
        changingSpan.textContent = textValueLength + '/1000';
        if (textValueLength > 0) {
            sendingButton.disabled = false;
            sendingButton.style.backgroundColor = '#ABD873';
            sendingButton.style.color = 'black';
            sendingButton.style.cursor = 'pointer'
        } else {
            sendingButton.disabled = true;
            sendingButton.style.backgroundColor = '#A1A1A1';
        }
    }
}

textArea.addEventListener('input', () => {
    updateButtonsColor(textArea.value, sendButton, counterSpan);
});

/* Механизм добавления комментария */
const commentsContainer = document.getElementById('comments-container');
let userImg, name, date, text;

/* добавление случайного пользователя */
const userName = document.querySelector('.username')
const userImage = document.querySelector('.user-comment__img')

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://randomuser.me/api/', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            const userData = JSON.parse(xhr.responseText);
            userImg = userData.results[0].picture.large;
            name = `${userData.results[0].name.first} ${userData.results[0].name.last}`;
            date = new Date().toLocaleString();

            userName.innerHTML = name;
            userImage.setAttribute('src', `${userImg}`);
        } else {
            console.error('Ошибка при получении данных');
        }
    }
};
xhr.send();

sendButton.addEventListener('click', function() {
    addComment(userImg, name, date, text = textArea.value);
})

function addComment() {
    const newComment = `
    <div class="comment-wrapper">
        <div class="comment-block">
            <img src="${userImg}" alt="${name}" class="user-comment__img">
            <div class="comment">
                <div class="comment-header">
                    <span class="username">${name}</span>
                    <span class="date">${date}</span>
                </div>
                <p class="comment-text">${text}</p>
                <div class="comment-footer">
                    <div class="respond-block">
                        <img src="../images/svg/respond-arrow.svg" alt="стрелка влево" class="respond-img">
                        <span class="respond-text">Ответить</span>
                    </div>
                    <div class="favorite-block">
                        <img src="../images/svg/hollow-heart.svg" alt="пустое сердечко" class="favorite-img">
                        <span class="favorite-text">В избранное</span>
                    </div>
                    <div class="rating-block">
                        <img src="../images/svg/rating-button_decrease.svg" alt="кружок с минусом" class="rating-button_decrease">
                        <span class="rating-number">0</span>
                        <img src="../images/svg/rating-button_increase.svg" alt="кружок с плюсом" class="rating-button_increase">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    commentsContainer.innerHTML += newComment;
    textArea.value = '';
}
