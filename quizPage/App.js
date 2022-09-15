
// Select Elements
let countSpan = document.querySelector('.count span');
let bulletsSpans = document.querySelector('.spans');
let bullets = document.querySelector('.bullets');
let questionArea = document.querySelector('.quiz-area');
let answerArea = document.querySelector('.answer-area');
let quizContainer = document.querySelector('.quiz-container');
let countdownContainer = document.querySelector('.countdown');
let submitAnswer = document.querySelector('.submit-answer');
let categoryArea = document.querySelector('.category');


let rightAnswer = 0;
let countdownInterval ;
let curentIndex = 0; 




function getQuestions() {
fetch(localStorage.getItem('categoryValue'))
.then(res => res.json())
.then(data => {

   let questionsCount = data.length;

// Create Bullets + Set Ouestions Count
   createBullets(questionsCount)

// Set DATA
   showData(data[curentIndex],questionsCount);

// Start Countdown
    countDown(60,questionsCount)


    submitAnswer.addEventListener('click',() => {
        let theRightAnswer = data[curentIndex].right_answer;

        // Increase Index
        curentIndex++;

        checkAnswer(theRightAnswer , questionsCount)

        // Remove Previous Question
        questionArea.innerHTML = '';
        answerArea.innerHTML = ''
    
        // Add Question Data
        showData(data[curentIndex],questionsCount);

        handelBullets();


        clearInterval(countdownInterval)
        countDown(60,questionsCount);


        showResult(questionsCount);



    })


})
}
getQuestions()

function createBullets(num) {
    countSpan.innerHTML = num;

    // Create Spans
    for(let i = 0; i < num ; i++) {
        let spanbullet = document.createElement('span');
        if(i === 0 ) spanbullet.className = 'active'
         bulletsSpans.appendChild(spanbullet);
    }
}

function showData(obj,count) {

    if(curentIndex < count) {
        categoryArea.textContent = `Category: ${localStorage.getItem('category')} `



    let questionTitle = document.createElement('h2');
    for(let i =0; i < count; i++) {
    if(obj["title"] === 'What will be the output of the following code snippet?') {
        questionTitle.textContent =`${obj["title"]} \n`
        let imgQues = document.createElement('img');
        imgQues.src = `/img/q${obj["id"]}.PNG`;
        questionTitle.appendChild(imgQues)

    } else {
        questionTitle.textContent =obj["title"]
    }
}
    
    questionArea.appendChild(questionTitle);
 

    for(let  i = 1; i <= 4; i++) {
        let answerDiv = document.createElement('div');
        answerDiv.className ='answer';
        let inputAnswer = document.createElement('input');
        inputAnswer.setAttribute('type','radio');
        inputAnswer.setAttribute('id',`answer_${i}`);
        inputAnswer.setAttribute('name','question');
        inputAnswer.dataset.answerCheck = obj[`answer_${i}`];
       
        let label = document.createElement('label');
        label.htmlFor = `answer_${i}`;
        label.textContent = obj[`answer_${i}`];

        answerDiv.appendChild(inputAnswer)
        answerDiv.appendChild(label);
        answerArea.appendChild(answerDiv)

    }
    }
    

}




function checkAnswer(rAnswer , count) {
    let answers = document.getElementsByName('question');
    let choosenAnswer;
    for(let i =0 ; i < answers.length; i++) {
        if(answers[i].checked) {
            choosenAnswer = answers[i].dataset.answerCheck;
        }
    }
   


   
    if( rAnswer === choosenAnswer) {
        rightAnswer++;
    }

}



function handelBullets() {
    let bulletSpan = document.querySelectorAll('.bullets .spans span');
    Array.from(bulletSpan).forEach((span,index) => {
        if(curentIndex === index) {
            span.className = 'active'
        }
    })
}
let resultContent = document.querySelector('.results')
function showResult(count) {
    let result ;

    if(curentIndex === count) {
        questionArea.remove();
        answerArea.remove();
        submitAnswer.remove();
        bullets.remove();


    if(rightAnswer > (count / 2) && rightAnswer < count) {
        result = `<span class='good'>${rightAnswer} From ${count}</span>, Is Good`;
    } else if(rightAnswer === count) {
        result = `<span class='perfect'>Perfect</span>,All Answers Is Good`;
    } else {
        result = `<span class='bad'>${rightAnswer} From ${count}</span>`;
    }
        resultContent.innerHTML = result;
        resultContent.style.backgroundColor = '#fff';
        resultContent.style.padding = '10px'
        resultContent.style.margin = '10px 0'

}
}

function countDown(duration,count) {
   if(curentIndex < count) {
    let minutes,seconds;
    countdownInterval = setInterval(function() {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
      
        minutes < 10 ? minutes = `0${minutes}`: minutes;
        seconds < 10 ? seconds = `0${seconds}`: seconds;

        countdownContainer.innerHTML = `${minutes}:${seconds}`;

        if(--duration < 0) {
            clearInterval(countdownInterval);
            submitAnswer.click()
        }
    },1000)

   }
}