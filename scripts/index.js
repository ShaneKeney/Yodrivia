$(document).ready(function () {

    //call the function when load the page (prevent see the back of the card "anwsers")
    flipcard();

    // Put all necessary Event Listeners below here //
    //////////////////////////////////////////////////

    //bind functionality to sidebar
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
    }, false);

    //event click on question card controlling the flip
    $(".card-question").click(function(){
        flipcard();
    })   

    //TODO: Add event listener for clicking radio button for user and 
    //      dynamically show or hide correct answer container
    $(document).on("click", ".questionTypeRadio", renderAnswerInputs)
});

//function to flip the question card
function flipcard() {
    $(".card-question").flip({ axis: 'x' });
}

var autoExpand = function (field) {

	// Reset field height
	field.style.height = 'inherit';

	// Get the computed styles for the element
	var computed = window.getComputedStyle(field);

	// Calculate the height
	var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

	field.style.height = height + 'px';

};

function renderAnswerInputs() {
    if($(this).attr("data-questionType") === "trueFalse") {
        $("#trueFalseAnswers").removeClass("d-none");
        $("#userMultipleChoiceAnswers").addClass("d-none")
    } else if($(this).attr("data-questionType") === "multipleChoice") {
        $("#trueFalseAnswers").addClass("d-none");
        $("#userMultipleChoiceAnswers").removeClass("d-none")
    } else if($(this).attr("data-questionType") === "openEnded") {
        
    } 
};

//function to flip the question card
function flipcard (){
    $(".card-question").flip({
        axis: 'x',
    });
};

//funtion to call Trivia DB
function triviaDB (){

    var numOfQuestion = 10;
    var triviaURL = "https://opentdb.com/api.php?amount=" + numOfQuestion; 
    //ajax trivia call to get the answers generated by Trivia DB
    $.ajax({
        url: triviaURL,
        method: "GET"
        }).then(function(response){
    
        // looping through the response stored in "response function"
        for (i=0; i<1; i++){
            //defining variable and storing a question to the variable
            var question = response.results[i].question;
            var answersArr = [];
            //looping through the answers and stroing into "answersArr"
                for(j=0; j<3; j++){
                    var option = response.results[i].incorrect_answers[j];
                    if (option != undefined) {
                        answersArr.push(option);                    
                    } 
                }
            // storing correct answer into answersArr and shuffling it to place answer randomly into the arra
            var correctAns = response.results[i].correct_answer;
            answersArr.push(correctAns);
            console.log(answersArr);
            if (answersArr.length == 2){
                answersArr.sort();
                answersArr.reverse();
                console.log(answersArr);
            
            }else{
                answersArr.sort(function(a,b){return 0.5-Math.random()});
                console.log(answersArr);            
            }
            

        }
                    
    });
        
}

triviaDB ();

    
