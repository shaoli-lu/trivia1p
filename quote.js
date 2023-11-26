let pic = document.getElementById('pic');
// Add event listeners to answer elements
document.querySelector('#correct_answer').addEventListener('click', checkAnswer);
document.querySelector('#ia1').addEventListener('click', checkAnswer);
document.querySelector('#ia2').addEventListener('click', checkAnswer);
document.querySelector('#ia3').addEventListener('click', checkAnswer);

let correctAnswer;

// Add this to your JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Fetch categories and populate the category selection options
    fetch("https://opentdb.com/api_category.php")
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.querySelector('#category-select');
            data.trivia_categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        });

    // Fetch a new question whenever the user changes their selection
    document.querySelector('#category-select').addEventListener('change', getQuote);
    document.querySelector('#difficulty-select').addEventListener('change', getQuote);

    getQuote();
})

function getQuote() {
    // Get the user's selections
    const categoryId = document.querySelector('#category-select').value;
    const difficulty = document.querySelector('#difficulty-select').value;

    // Construct the API URL based on the user's selections
    let url = "https://opentdb.com/api.php?amount=1";
    if (categoryId) url += "&category=" + categoryId;
    if (difficulty) url += "&difficulty=" + difficulty;

    // Fetch the question
    fetch(url).then(response => response.json()).then(data => {
        // ... rest of your code ...
         // let data = JSON.parse(decodeURIComponent(JSON.stringify(text)));
         document.querySelector('#question').innerHTML = '"' + data.results[0].question  + '"' ;  
         document.querySelector('#category').innerHTML = "Category - " +  data.results[0].category;  
     
         document.querySelector('#difficulty').innerHTML = "Difficulty: " +  capitalize(data.results[0].difficulty);  
       
         
         document.querySelector('#ia0').innerHTML = "Answers(Click to check):";
         // Assign correct answer to variable
         
         correctAnswer = decodeURIComponent(data.results[0].correct_answer);
 
      
         let randomizedAnswers = randomizeAnswers(data.results[0].correct_answer, data.results[0].incorrect_answers);
 
         document.querySelector('#correct_answer').innerHTML = "(1.) " + randomizedAnswers[0];
         document.querySelector('#ia1').innerHTML = "(2.) " + randomizedAnswers[1];
         document.querySelector('#ia2').innerHTML ='';
         if (randomizedAnswers[2] !== undefined)
         document.querySelector('#ia2').innerHTML = "(3.) " + randomizedAnswers[2];
         document.querySelector('#ia3').innerHTML = ''; 
         if (randomizedAnswers[3] !== undefined)
         document.querySelector('#ia3').innerHTML = "(4.) " + randomizedAnswers[3];    
             
  
    })
}
function checkAnswer() {
    // const decoder = new TextDecoder();
    // const decodedStringcorrectAnswer = decoder.decode(new Uint8Array(correctAnswer.split('').map(c => c.charCodeAt(0))));
    let decoded = document.createElement("div");
    decoded.innerHTML = correctAnswer;

    if (this.innerHTML.substring(5) ===  decoded.innerText) {
        alert('Correct! - Answer: ' + this.innerHTML.substring(5));
    } else {
        alert('Incorrect! - Answer: ' + this.innerHTML.substring(5));
    }
}

document.addEventListener('DOMContentLoaded', function() {
getQuote();

})

function capitalize(str){
    return str[0].toUpperCase()+str.slice(1)
}

function randomizeAnswers(correctAnswer, incorrectAnswers) {
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    let randomizedAnswers = [];
    
    while(allAnswers.length > 0) {
      let randomIndex = Math.floor(Math.random() * allAnswers.length);
      randomizedAnswers.push(allAnswers[randomIndex]);
      allAnswers.splice(randomIndex, 1);
    }
    
    return randomizedAnswers;
  }

  

pic.addEventListener('click', getQuote)

$(document).ready(function () {

    $('xdiv').hover(
    function () {
        $(this).stop().fadeOut(function () {
            var $temp = $(this).attr('src');
            $(this).attr('src', $(this).attr('data-alt-src'));
            $(this).attr('data-alt-src', $temp);
        });

        $(this).fadeIn();
    },

    function () {
        $(this).stop().fadeOut(function () {
            var $temp = $(this).attr('data-alt-src');
            $(this).attr('data-alt-src', $(this).attr('src'));
            $(this).attr('src', $temp);
        });

        $(this).fadeIn();

    });
});