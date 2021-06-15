
 let funcDotsM1EX =[]
 let funcDotsM2EX =[]
 let funcDotsM1NM =[]
 let funcDotsM2NM =[]
 export {funcDotsM1EX,funcDotsM1NM,funcDotsM2EX,funcDotsM2NM}
export default function getAnswer(args ){
    fetch("http://localhost:8082/lab6/getAnswer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            selectedFunction: args.chosenFunction,
            leftBorder: args.left,
            rightBorder: args.right,
            ynull: args.yInput,
            step: args.step,
        })
    }).then(response => {
        return response.json();
    }).then((answer) => {
        prepareAnswer(answer.answers)
    });
}
function prepareAnswer(answer) {
    let m1 = {
        name: answer[0].methodName,
        xS: answer[0].exactSolution,
        nS: answer[0].numberSolution
    }
    let m2 = {
        name: answer[1].methodName,
        xS: answer[1].exactSolution,
        nS: answer[1].numberSolution
    }

    funcDotsM1EX =[]
    funcDotsM2EX =[]
    funcDotsM1NM =[]
    funcDotsM2NM =[]
    for( let i = 0; i < m1.xS.length; i++){
        let dot = {
            x: m1.xS[i].x,
            y: m1.xS[i].y
        }
        funcDotsM1EX.push(dot)
    }
    for( let i = 0; i < m1.nS.length; i++){
        let dot = {
            x: m1.nS[i].x,
            y: m1.nS[i].y
        }
        funcDotsM1NM.push(dot)
    }
    for( let i = 0; i < m2.xS.length; i++){
        let dot = {
            x: m2.xS[i].x,
            y: m2.xS[i].y
        }
        funcDotsM2EX.push(dot)
    }
    for( let i = 0; i < m2.nS.length; i++){
        let dot = {
            x: m2.nS[i].x,
            y: m2.nS[i].y
        }
        funcDotsM2NM.push(dot)
    }

    let answerDiv = document.getElementById("answer")
    answerDiv.innerHTML="";
    answerDiv.style.backgroundColor = "rgba(255,255,255,0.5)"
    let lable1 = document.createElement("label")
    let lable2 = document.createElement("label")
    let lable3 = document.createElement("label")
    let lable4 = document.createElement("label")
    lable1.innerText = m1.name + " точный"
    lable1.style.backgroundColor = "rgba(255,112,0,1)"
    lable1.style.whiteSpace ="nowrap";
    lable2.innerText = m1.name + " численный"
    lable2.style.backgroundColor = "rgba(255,0,0,1)"
    lable2.style.whiteSpace ="nowrap";
    lable3.innerText = m2.name + " точный"
    lable3.style.backgroundColor = "rgba(100,100,255,1)"
    lable3.style.whiteSpace ="nowrap";
    lable4.innerText = m2.name + " численный"
    lable4.style.backgroundColor = "rgba(0,0,255,1)"
    lable4.style.whiteSpace ="nowrap";
    answerDiv.append(lable1, lable2, lable3, lable4)
}
