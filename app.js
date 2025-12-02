      
        //Dark mode toggle
        
  var dark=document.getElementById("drkM");
  var page= document.querySelector(".page-container");
  var calc = document.querySelector(".calc-box");
  var tri = document.querySelector(".tri-box");
  var conv = document.querySelector(".conv-box");
  var lbl= document.querySelector("label");
  
  dark.addEventListener("click", () => {
      page.classList.toggle("dar");
      calc.classList.toggle("dar");
      tri.classList.toggle("dar");
      conv.classList.toggle("dar");
      lbl.classList.toggle("dar");
  });
      
      
      //Triangle Area 
      
var sidea = document.getElementById("sideA");
var sideb = document.getElementById("sideB");
var sidec = document.getElementById("sideC");
var triOut = document.getElementById("triOutput");
        
 function findArea() {
    let a = +sidea.value;
    let b = +sideb.value;
    let c = +sidec.value;
    
    //If the sides cannot build a triangle, leave the fxn.

    if (a+b<=c || a+c<=b || b+c<=a) {
        triOut.textContent="Triangle doesn\'t exist!!";
             return;
    }
    let s = (a + b + c) / 2;
    let triAreaBig= (s * (s - a) * (s - b) * (s - c));
    let triArea = Math.sqrt(triAreaBig);
    triOut.textContent = "Triangle Area = " + triArea.toFixed(4);
         
         
 };
      
      
 function clearTri() {
          triOut.textContent ="";
          sidea.value="";
          sideb.value="";
          sidec.value="";
 };
        
        
        //Tools Toggle fxns
        
      function toggleCalc() {
        const overlay = document.getElementById("calcOverlay");
            overlay.classList.toggle("show");
        }
        
      function toggleTri() {
        const triOvl = document.getElementById("triOverlay");
            triOvl.classList.toggle("show");
        }
        
              
      function toggleConv() {
        const convOvl = document.getElementById("convOverlay");
            convOvl.classList.toggle("show");
        }
        
        
        
        
//Calculator Input/Output
        
      const calcOut= document.getElementById("calcOut");
      const rmvTx = document.getElementById("rmvTx");
      
      const numPads=document.querySelectorAll(".numPads");
      const zero= document.getElementById("zer");
      const pt= document.getElementById("pt");
      const oprt=document.querySelectorAll(".operators");
      
      numPads.forEach(num => {
       num.addEventListener("click", (e) => {
        calcOut.textContent+= e.target.value;
          });
      });
      
      zero.addEventListener("click", () => {
          
          calcOut.textContent+= "0";
      });
      
      pt.addEventListener("click", () => {
          
          calcOut.textContent+= ".";
      });
      
      
      oprt.forEach(opr => {
       opr.addEventListener("click", (e) => {
        calcOut.textContent+= e.target.value;
          });
      });
        
        
        
      
    //Shunting Yard Method
        
        
        
        //1. Input to Token
        
function tokenize(expr) {
            
    return expr.match(/(\d+(\.\d+)?)|[()+\-*/]/g);
}




       
        //2. Token to RPN
        
function toRPN(tokens) {
    
 const output = []; 
 const ops = [];    
 const prec = { "+": 1, "-": 1, "*": 2, "/": 2 };
    
 tokens.forEach(t => {
        
// CASE 1: If token is a number
 if (!isNaN(t)) {
    output.push(t);
 }
        
// CASE 2: If token is + - * /
 else if (t in prec) {
            
   while (ops.length && prec[ops[ops.length - 1]] >= prec[t]) {
        output.push(ops.pop());
   }
           
   ops.push(t);
 }
        
 // CASE 3: Opening parenthesis
 else if (t === "(") {
   ops.push(t);
 }
        
// CASE 4: Closing parenthesis
 else if (t === ")") {
   while (ops.length && ops[ops.length - 1] !== "(") {
    output.push(ops.pop());
    }
   ops.pop(); 
 }
 });
    
    
 while (ops.length) {
      output.push(ops.pop());
 }
    
  return output;
}




        //3. Evaluate RPN
        
function evalRPN(rpn) {
    
 const stack = [];  
    // Holds numbers during evaluation
    
 rpn.forEach(t => {
        
    // If token is a number → push to stack
    
  if (!isNaN(t)) {
      stack.push(parseFloat(t));
  }
        
  else {
     const b = stack.pop(); 
        // Last number
     const a = stack.pop(); 
        // Second-last number
            
// Apply the operator based on t
   switch(t) {
    case "+": stack.push(a + b); break;
    case "-": stack.push(a - b); break;
    case "*": stack.push(a * b); break;
    case "/": stack.push(a / b); break;
     }
  }
 });
    
    // Final answer left on the stack
    return stack[0];
}
     
     
     
     
     //4. Implement RPN 
     
function safeCalculate(expr) {

    const tokens = tokenize(expr);   
    // Step 1: Break into pieces
    
    const rpn = toRPN(tokens);       
    // Step 2: Convert to RPN
    
    const result = evalRPN(rpn);     
    // Step 3: Evaluate safely
    
    return result;
}   




        //5. Apply SY on Calculator
        
var recent=[];//Recents memory(it'd be cool to walk through recent solutions)
      
function solution() {
 // get user input
 const expr = calcOut.textContent;
 // compute safely
 const resl = safeCalculate(expr);
 //print results 
 calcOut.textContent =  resl; 
    
  //Store results for retrieval
 recent.push(resl);
    
}



    //Access and display recents memory
    
const prev=document.getElementById("prev");
    
prev.addEventListener("click", () => {
 let i= recent.length - 2;
 let j= recent.length -3;
 let k= recent.length - 4;
 let l= recent.length -1;
 if (recent.length >= 2 && calcOut.textContent==recent[l]) {
  calcOut.textContent = recent[i];
  }
 else if (recent.length >= 3 && calcOut.textContent== recent[i]) {
  calcOut.textContent= recent[j];
  }
 else if (recent.length >= 4 && calcOut.textContent == recent[j]) {
  calcOut.textContent = recent[k];
  }
 else {
   calcOut.textContent = recent[l];
  }
 });
 
 
//Another retrieval method with input field for reversed index
//It allows me to retrieve every element of recent array instead of only the last 4.

/*
var indx= document.getElementById("indx");
function ret() {
    
    let d = +indx.value;   
    let cur= recent.length-d;
    
    rez.textContent = recent[cur];
};*/

      
      
function clearSheet() {
          calcOut.textContent = "";
 }
      
      
      //Backspace logic
      
      rmvTx.addEventListener("click", () => {
        let currentText = calcOut.textContent;
    calcOut.textContent = currentText.slice(0, -1);
        });
        
        

 
     //Converter Logic
     
     //Temperature
     
const cels= document.getElementById("cels");
const fahr= document.getElementById("fahr");
      
function findF() {
    let cl = +cels.value;
    fahr.value = (cl*1.8)+32;
}

function findC() {
    let fr= +fahr.value;
    cels.value = (fr-32)/1.8;
}

        
    //Length
      
const cmtr= document.getElementById("cmtr");
const inch= document.getElementById("inch");

function findInch() {
    let cm = +cmtr.value;
    inch.value = cm/2.54;
}

function findCm() {
    let inh = +inch.value;
    cmtr.value = inh*2.54;
}


//clock (to occupy extra space inside main page)
 function liveTime() {
  var clock= document.getElementById("clockView");
  var date = document.getElementById("dateView")
  let time = new Date();
  let hours = time.getHours();
  let m = String(time.getMinutes()).padStart(2, '0');
  let s = String(time.getSeconds()).padStart(2, '0');
  let dt=String(time.getDate()).padStart(2,'0');
  let mn=String(time.getMonth()).padStart(2,'0');
  let yr=String(time.getFullYear()).slice(-2);
  let day= time.getDay();
  let wkd=day===1 ? 'ሰኞ/Mn' : day===2 ? 'ማክ/Tu' : day===3 ? 'ረቡዕ/Wd' :  day===4 ? 'ሐሙስ/Th'  : day===5 ? 'ዓርብ/Fr' : day===6 ? 'ቅዳሜ/St' : day===7 ? 'እሁድ/Sn' : 'error';
  let period= hours>=12 ? "pm":"am";
  let h= hours % 12 || 12;
  
  let dateString = `${dt}/${mn}/${yr}`;
  let timeString= `${h}:${m}:${s}_${period}_`;
  clock.textContent= timeString + wkd;
  date.textContent = dateString;
 }
 setInterval(liveTime, 1000);
 liveTime();