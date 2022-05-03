const exploreButton = document.getElementById('explore-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const questions = [
  {
    question: 'In honor of the iconic Top Gun volleyball scene, which sport is played in Top Gun: Maverick? ',
    answers: [
      { text: 'A. Volleyball', correct: false },
      { text: 'B. Soccer',     correct: false },
      { text: 'C. Football',   correct: true},
      { text: 'D. Baseball',   correct: false },
    ]
  },
  {
    question: 'Which Top Gun song won the Academy Award for Best Original Song? ',
    answers: [
      { text: 'A. "Take My Breath Away" by Berlin', correct: true },
      { text: 'B. "Danger Zone" by Kenny Loggins',  correct: false },
      { text: 'C. “You’ve Lost That Lovin’ Feelin’” by The Righteous Brothers', correct: false },
      { text: 'D. "Mighty Wings" by Cheap Trick',   correct: false }
    ]
  },
  {
    question: 'What inspired filmmakers to make Top Gun?',
    answers: [
      { text: 'A. A book',             correct: false },
      { text: 'B. A magazine article', correct: true },
      { text: 'C. A song',             correct: false },
      { text: 'D. A music video',      correct: false }
    ]
  },
  {
    question: 'How many IMAX cameras were placed in each cockpit while filming Top Gun: Maverick?',
    answers: [
      { text: 'A. 2', correct: false },
      { text: 'B. 4', correct: false },
      { text: 'C. 6', correct: true },
      { text: 'D. 8', correct: false }
    ]
  },
  {
    question: 'Where is the flight school located in Top Gun: Maverick?',
    answers: [
      { text: 'A. NAS Miramar, California', correct: false },
      { text: 'B. NAS Key West, Florida',   correct: false },
      { text: 'C. NAS Fallon, Nevada',      correct: true },
      { text: 'D. NAS Corpus Christi, Texas', correct: false }
    ]
  },
  {
    question: 'Finish the line: “It’s classified. I could tell you, but _________.”',
    answers: [
      { text: 'A. “the mission would be compromised.”', correct: false },
      { text: 'B. “then I’d have to kill you.”',        correct: true },
      { text: 'C. “you can’t handle the truth.”',      correct: false },
      { text: 'D. “I’ve got to go to buzz the tower.”', correct: false }
    ]
  },
  {
    question: 'Where did the actors sleep while filming a portion of Top Gun: Maverick?',
    answers: [
      { text: 'A. Aircraft carrier',  correct: true },
      { text: 'B. Airplane hanger',   correct: false },
      { text: 'C. Military barracks', correct: false },
      { text: 'D. Tents',             correct: false }
    ]
  },
  {
    /* End game section with explore button */
    question: '',
    answers: []
  }
]

let Questions, currentQuestionIndex

startGame()
nextButton.addEventListener('click', () => {
  currentQuestionIndex++

  if (currentQuestionIndex === Questions.length -1){
      setNextQuestion()
      nextButton.classList.add('hide')
      exploreButton.classList.remove('hide')
      questionElement.innerHTML = 'And that’s it! <br><br> Now click below to enjoy some exclusive <br> behind-the-scenes <br> content from <br> Top Gun: Maverick!'
        exploreButton.addEventListener('click', () => {
          window.location.href = 'https://www.google.com'
        })
  } else {
      setNextQuestion()
  }
})

function startGame() {
  exploreButton.classList.add('hide')
  Questions = questions
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(Questions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct) {
    selectedButton.classList.add('correct')
  } else {
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
      console.log(answerButtonsElement.children)
      selectedButton.classList.add('wrong')
    })     
  }
  unclickableOptions()
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } 
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function unclickableOptions(){
  const optionLen = answerButtonsElement.children.length
  for(let i=0; i<optionLen; i++){
    answerButtonsElement.children[i].classList.add('already-answered')
  } 
}