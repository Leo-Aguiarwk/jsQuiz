let currentQuestion = 0;
let correctAnswer = 0;
interval = '';

//Events
document.querySelector('.btn-comecar').addEventListener('click',startQuiz );
document.querySelector('.btn-restart').addEventListener('click', reset);


// Functions
function startQuiz() {
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    showQuestions();
    timer();
}
//// pegando as questoes no json e mostrando na tela
function showQuestions() {
    
    if(questions[currentQuestion]) {
        progress();
        document.querySelector('.question').innerHTML = questions[currentQuestion].question;
        
        setOptions = '';
        for(let i in questions[currentQuestion].options) {
            setOptions += `<div data-op="${i}" class="option" ><span>${parseInt(i)+1}</span>${questions[currentQuestion].options[i]}</div>`;
        }
        document.querySelector('.area-options').innerHTML = setOptions;

        
        document.querySelectorAll('.option').forEach(item => {
            item.addEventListener('click', clickAnswer);
        });
    } else {
        finsh();
    }
}

function timer() {

    let seconds = 15;
    interval = setInterval(()=>{
        document.querySelector('.timer').innerHTML = seconds;
        seconds--;

        if(seconds <= 5){
            document.querySelector('.timer').style.backgroundColor = 'red';
        } else {
            document.querySelector('.timer').style.backgroundColor = 'green';
        }

        if(seconds ===  -1 ) {
            console.log(seconds);
            currentQuestion++;
            clearTimer(interval);
            showQuestions();
        }
    },1000);
}
//funcao ao clicar nas opcoes 
function clickAnswer(e) {
    clearTimer(interval);
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    if(clickOption === questions[currentQuestion].answer) {
        correctAnswer++;
    }
    currentQuestion++;
    showQuestions();
}
//funcao para de limpar e iniciar timer novamente
function clearTimer(interval) {
    clearInterval(interval);
    timer();
}

function progress() {
    let pct = Math.floor((currentQuestion / questions.length) * 100);

    document.querySelector('.bar--progress').style.width = `${pct}%`; 
}

//funcao ao finalizar de responder
function finsh() {
    document.querySelector('.bar--progress').style.width = `100%`
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.quiz').style.display = 'none';
    document.querySelector('.score').style.display = 'block';
    clearInterval(interval);


    let points = Math.floor((correctAnswer / questions.length) * 100);

    document.querySelector('.text-2').innerHTML = `Você respondeu ${currentQuestion} e acertou ${correctAnswer}`;
    document.querySelector('.pct').innerHTML = `Você acertou ${points}%`;

    if( points < 50  ) {
        document.querySelector('.text-1').innerHTML = 'Ruim, estude mais';
        document.querySelector('.pct').style.color = 'red';
     } else if( points >= 50 && points <80 ) {
        document.querySelector('.text-1').innerHTML = 'Bom, mas precisa estudar mais.';
        document.querySelector('.pct').style.color = '#ffff00';
     } else {
        document.querySelector('.text-1').innerHTML = 'Parabéns';
        document.querySelector('.pct').style.color = 'green';
     }
}

//funcao para resetar do comeco
function reset() {
    currentQuestion = 0;
    correctAnswer = 0;

    document.querySelector('.home').style.display = 'block';
    document.querySelector('.quiz').style.display = 'none';
    document.querySelector('.score').style.display = 'none';
}

