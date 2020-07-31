function Quizbox(element, question, answers) {
    this.element = document.getElementById(element);
    this.question = question;
    this.answers = answers;
    this.chosen = [];
    this.single = true;
    var found_first = false;
    for (let index in this.answers) {
        this.chosen.push(false);
        if (this.answers[index].correct && found_first) {
            this.single = false;
        }
        if (this.answers[index].correct && !found_first) {
            found_first = true;
        }
    }
    
    /* Event handlers */
    this.choose = ( event ) => {
        // reset all previously chosen answers, if this is a single choice question
        if (this.single) {
            this.chosen.fill(false);
            this.answerElements.forEach(function (elem) {
                elem.classList.remove("quizbox-chosen");
            });
        }
        var target = event.target.closest(".quizbox-answer");
        var index = parseInt(target.dataset.index, 10);
        this.chosen[index] = !this.chosen[index];
        target.classList.toggle("quizbox-chosen");
        if (this.single) {
            this.check(target);
        }
    };
    
    this.clickcheck = ( event ) => {
        this.check(event.target);
        
    };
    
    this.check = (target) => {
        var correct = true;
        for (let index in this.answers) {
            if (this.single) {
                this.answerElements[index].classList.remove("quizbox-chosen");
                this.answerElements[index].classList.remove("quizbox-correct");
                this.answerElements[index].classList.remove("quizbox-wrong");
            }
            if (this.answers[index].correct != this.chosen[index]) {
                correct = false;
            }
        }
        if (correct) {
            target.classList.remove("quizbox-wrong");
            target.classList.add("quizbox-correct");
        } else {
            target.classList.remove("quizbox-correct");
            target.classList.add("quizbox-wrong");
        }
        this.noteElement.classList.remove("quizbox-note-hidden");
    }
    
    
    /* Question */
    this.questionElement = document.createElement("div");
    this.questionElement.classList.add("quizbox-question");
    this.questionTextElement = document.createElement("div");
    this.questionTextElement.classList.add("quizbox-question-text");
    this.questionTextElement.innerHTML = this.question.text;
    this.questionElement.appendChild(this.questionTextElement);
    if ("image" in this.question) {
        this.questionElement.classList.add("quizbox-question-has-image");
        this.questionImageElement = document.createElement("img");
        this.questionImageElement.classList.add("quizbox-question-image");
        this.questionImageElement.src = this.question.image;
        this.questionElement.appendChild(this.questionImageElement);
    }
    this.element.appendChild(this.questionElement);
    
    /* Answer */
    this.answerElements = [];
    for (let index in this.answers) {
        var answerElement = document.createElement("div");
        answerElement.classList.add("quizbox-answer");
        answerElement.dataset.index = index;
        if ("image" in this.answers[index]) {
            var answerImage = document.createElement("img");
            answerImage.classList.add("quizbox-answer-image");
            answerImage.src = this.answers[index].image;
            answerElement.classList.add("quizbox-answer-has-image");
            answerElement.appendChild(answerImage);
        }
        var answerText = document.createElement("div");
        answerText.classList.add("quizbox-answer-text");
        answerText.innerHTML = this.answers[index].text;
        answerElement.appendChild(answerText);
        answerElement.addEventListener("click", this.choose);
        this.element.appendChild(answerElement);
        this.answerElements.push(answerElement);
    }
    
    /* Check button */
    if (!this.single) {
        this.checkElement = document.createElement("div");
        this.checkElement.classList.add("quizbox-check");
        this.checkElement.innerHTML = "Check";
        this.checkElement.addEventListener("click", this.clickcheck);
        this.element.appendChild(this.checkElement);
    }
    
    /* Note */
    if ("note" in this.question) {
        this.noteElement = document.createElement("div");
        this.noteElement.classList.add("quizbox-note");
        this.noteElement.classList.add("quizbox-note-hidden");
        this.noteElement.innerHTML = this.question.note;
        this.element.appendChild(this.noteElement);
    }
}