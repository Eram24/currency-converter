const baseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const btn= document.querySelector(".btn");
const amount=document.querySelector("form input");
const msg =document.querySelector(".msg");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const dropdowns= document.querySelectorAll(".dropdown select");



for(let select of dropdowns){
    for(let currCode in countryList ){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="From" && currCode==='USD'){
            newOption.selected="selected";
        }
        else if(select.name==="To" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        
        select.addEventListener("change",(evt)=>{
           updateFlag(evt.target);
        });

    }
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let image=element.parentElement.querySelector("img");
    image.src=newSrc;
}

btn.addEventListener("click", (evt)=>{
evt.preventDefault();
getVal();
});

const getVal= async ()=>{
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<0){
        amtVal=1;
        amount.value="1";
    }
    
    const URL=`${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    const response= await fetch(URL);
    const rate= await response.json();
    console.log(rate);
    const conversionRate= rate[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(conversionRate);
    
    const finalAmt=conversionRate*amtVal;
    console.log(finalAmt);
    
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmt} ${toCurr.value}`;
}

window.addEventListener("load",getVal);

