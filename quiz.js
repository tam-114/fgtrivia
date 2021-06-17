(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = '#00cc00';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = '#ff5c33';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What is Peter's actual first name? (S13:E10)",
      answers: {
        a: "Julius",
        b: "Jason",
        c: "Justin",
        d: "Jackson"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the name of the beer company Peter works for? (S4:E13)",
      answers: {
        a: "Pawbucket Brewery",
        b: "The Brewery",
        c: "The Clam",
        d: "Pawtucket Brewery"
      },
      correctAnswer: "d"
    },
    {
      question: "Who is Stewie's arch enemy? (S4:E22)",
      answers: {
        a: "Brian",
        b: "Evil Stewie",
        c: "Bertram",
        d: "Meg"
      },
      correctAnswer: "c"
    },
    {
      question: "What is Specimen Z that Carter kept secret from the public? (S11:E3)",
      answers: {
        a: "End to world hunger",
        b: "Cure for cancer",
        c: "Alien life-form",
        d: "Immortality"
      },
      correctAnswer: "b"
    },
    {
      question: "When did Peter and Lois start dating? (S18:E6)",
      answers: {
        a: "High school",
        b: "College",
        c: "At work",
        d: "Never officially dated"
      },
      correctAnswer: "a"
    },
    {
      question: "What is Quagmire's job?",
      answers: {
        a: "Police Officer",
        b: "Deli shop owner",
        c: "Train conductor",
        d: "Pilot"
      },
      correctAnswer: "d"
    },
    {
      question: "What was the requirement for Peter to be able to ride the rollercoaster? (S10:E7)",
      answers: {
        a: "Cannot look hilarious on a miniature scooter",
        b: "Cannot be over the weight limit",
        c: "Cannot bring beer on the ride",
        d: "Cannot wear green pants"
      },
        correctAnswer: "a"
    }
  ];

  //Images

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  //On mobile event listeners
  //testing for any phone
  // /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  //or for 1 device (currently)
  //navigator.userAgent.match(/Android/i)


  if(navigator.userAgent.match(/Android/i) ){
    submitButton.addEventListener("touchstart", showResults);
    previousButton.addEventListener("touchstart", showPreviousSlide);
    nextButton.addEventListener("touchstart", showNextSlide);
  } else {
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  }

  // Event listeners
  
})();
