let userName = "John"; //Change variable to print different results

function ifElse(){
    if (userName == "John"){
        console.log("Correct");
    } else{
        console.log("Incorrect");
    }
}

function ternaryOperator(){ //Simplifies one if-else Statement
    userName = userName === 'John' ? "Correct" : "Incorrect";
    console.log(userName);
}

function nestedTernaryOperator(){ //Don't use this, unnecessary complicated; use if-else instead
    userName = userName === 'John' ? 'Correct' : (userName === 'Peter' ? 'Almost correct' : 'Incorrect');
}