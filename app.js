let categories = Array.from(document.querySelectorAll('.category'));
categories.forEach(cat => {
    cat.onclick = (e) => {
        localStorage.setItem('category', e.target.textContent);
        localStorage.setItem('categoryValue', e.target.dataset.value);
        e.target.href = './quizPage/index.html';
    }
})


