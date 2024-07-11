
'use strict!'


const acc1 ={

    username:"Abhay jaggi",
    userid:"null",
    pin:"0000",
    movements:[2000 , 500 , -1000 , 1000 , -1200 , -180 , 600 , -455 ,1000.89],
    date :["01/01/2024","01/01/2024","01/05/2024","01/08/2024","01/10/2024","01/12/2024","01/25/2024","01/27/2024","01/28/2024" ],
    total_bal:0,
    in_bal:0,
    out_bal:0,
    interest:0,
    calc_bal:function(){
        
    
        this.total_bal=this.movements.reduce((acc,mov)=>acc+mov).toFixed(2);
        this.in_bal=this.movements.filter(mov => mov>0).reduce((acc,mov) => acc+mov).toFixed(2);
        this.out_bal=Math.abs(this.movements.filter(mov => mov<0).reduce((acc,mov) => acc+mov)).toFixed(2);
        this.interest=this.movements.filter(mov => mov>0).map(deposit => deposit*1.2/100).reduce((acc,r)=>acc+r).toFixed(2) ;
    },

    calc_id:function(){

        this.userid=this.username.split(" ").map(val => val[0]).join("").toLowerCase();
        
    }

};

const calcbal = acc1.calc_bal;
const calcid = acc1.calc_id;


const acc2 ={

    username:"Swapnil Dhiman",
    userid:"null",
    pin:"1111",
    movements:[2000 , 500 ,5000 , -20 , -12 , -18],
    date :["01/08/2024","01/10/2024","01/12/2024","01/15/2024","01/15/2024","01/19/2024"],
    total_bal:0,
    in_bal:0,
    out_bal:0,
    interest:0
};

const acc3 ={

    username:"Rawatinder singh",
    userid:"null",
    pin:"2222",
    movements:[200 , 500 , 13000 , -100 , -360],
    date :["01/05/2024","01/08/2024","01/15/2024","01/15/2024","01/19/2024" ],
    total_bal:0,
    in_bal:0,
    out_bal:0,
    interest:0
};

const acc4 ={

    username:"Manas Joshi",
    userid:"null",
    pin:"3333",
    movements:[1000 , 500 , -210 , -61 , 1000],
    date :["01/01/2024","01/01/2024","01/05/2024","01/08/2024", "01/24/2024" ],
    total_bal:0,
    in_bal:0,
    out_bal:0,
    interest:0
};

//allaccounts

const accounts = [acc1 , acc2 ,acc3 ,acc4 ];

//calcing id for all accounts
accounts.forEach((acc , i) => {  calcid.call(acc);}  )

//dom elements

    //head
    const loglabel = document.querySelector(".loglabel");
    const loginbtn = document.querySelector(".loginbtn");
    const idinput = document.querySelector(".userid");
    const pininput= document.querySelector(".pin");

    //main
    const mainapp = document.querySelector(".main");

    //display
    const container = document.querySelector(".container");
    const crntbalance= document.querySelector(".crntbalance");
    const inamount = document.querySelector(".inamount");
    const outamount =document.querySelector(".outamount");
    const intamount = document.querySelector(".intamount");

    //transfer
    const trbtn =document.querySelector(".trbtn");
    const pi1 =document.querySelector(".pi1");
    const pi2 =document.querySelector(".pi2");

    //request loan

    const rmbtn = document.querySelector(".rmbtn");
    const loanamount = document.querySelector(".lam");

    //close acc

    const confuser = document.querySelector(".clid");
    const confpin =document.querySelector(".clpin");
    const closebtn =document.querySelector(".clbtn");


    //sort btn
    const sortbtn =document.querySelector(".sortbtn");

    //as of date
    const maindate =document.querySelector(".asofdate");

    //countdown
    const lgtime =document.querySelector(".lgtime");
mainapp.style.opacity =0;

//display
const dayspassed = (date1 ,date2 )=>Math.trunc((date1-date2)/(1000*60*60*24));
const calctimestring =function(z)
{
    
const days = dayspassed(new Date , z);
//console.log(days);

if(days === 0)
return "TODAY";

else if(days === 1)
return "YESTERDAY";

else if(days<=7)
return `${days} DAYS AGO`;

else{

    // const d=`${z.getDate()}`.padStart(2,'0');
    // //console.log(z.getMonth());
    // const m =`${z.getMonth()+1}`.padStart(2,'0');
    // const y=z.getFullYear();
    
    
    return new Intl.DateTimeFormat('en-IN').format(z);
}

}
function displaybal(acc , sort = false)
{



    container.innerHTML="";


    let movs = sort ? acc.movements.slice().sort((a,b) => a-b) : acc.movements;
    //console.log(movs);

    movs.forEach(function(mov,i)
    {
        const z = new Date(currentacc.date[i]);
        //console.log(z);
        

        const numberopt ={

            style : 'currency',
            currency : 'INR'
        };
        const amount = new Intl.NumberFormat('en-IN',numberopt).format(mov.toFixed(2));
        let timestring = calctimestring(z);
        const type= mov>0? "deposit" : "withdrawal";
        const html=`<div class="row">
                        <div class="td">

                            <div class="type ${type}">${i+1} ${type.toUpperCase()}</div>
                            <div class="date">${timestring}</div>
                        </div>
        
                        <div class="amnt">${amount}</div>
                    </div>`;

        // console.log(html);
        container.insertAdjacentHTML("afterbegin",html);
    })

    
    calcbal.call(acc);
    const numberopt ={

        style : 'currency',
        currency : 'INR'
    };
   
    crntbalance.textContent= new Intl.NumberFormat('en-IN',numberopt).format(acc.total_bal);
    inamount.textContent=new Intl.NumberFormat('en-IN',numberopt).format(acc.in_bal);
    outamount.textContent=new Intl.NumberFormat('en-IN',numberopt).format(acc.out_bal);
    intamount.textContent=new Intl.NumberFormat('en-IN',numberopt).format(acc.interest);


}

//date

const datecalc = function(acc){

    const x = new Date;

    const date=`${x.getDate()}`.padStart(2,'0');
    const month =`${x.getMonth()+1}`.padStart(2,'0');
    const year=x.getFullYear();
    acc.date.push(`${month}/${date}/${year}`);
    //console.log(currentacc.date);
    // const hour =`${x.getHours()}`.padStart(2,'0');
    // const minute =`${x.getMinutes()}`.padStart(2,'0');
    // const string = `As of ${date}/${month}/${year}, ${hour}:${minute}`;
    // console.log(string);
    const opt ={
        
        hour : 'numeric',
        minute : 'numeric',
        day :'numeric',
        month : 'long',
        year : 'numeric',
        weekday : 'long'
        
    };
    const date1 = new Intl.DateTimeFormat('en-US',opt).format(x);
    maindate.textContent = `As of ${date1}`;
    // console.log(intl);

}
//countdowntimer


const starttimer = function(m,r){

    let sec=0;
    let min=m;

    const tick = function(){

        let timestr = `${`${min}`.padStart(2,'0')}:${`${sec}`.padStart(2,'0')}`;
            lgtime.textContent = timestr;
            //console.log(timestr);
            if(sec === 0 )
            {   
                min--;
                sec = 60;
            }
            if(min>=0 && sec>0)
            sec--;
    
            
            

            else
            {
               
                console.log("Timer stopped!");
                clearInterval(countdown);
                mainapp.style.opacity=0;
            }
            // console.log(min , sec);
            


    }

    tick();
    const countdown = setInterval(tick, 1000 );

    return countdown;

}


//login

let currentacc,logtime;

loginbtn.addEventListener('click',function(e){


    e.preventDefault();

    if(logtime)
    clearInterval(logtime);


    logtime=starttimer(5);
    const user= idinput.value;
    
    currentacc =accounts.find(acc => acc.userid === user);

    if(currentacc && currentacc.pin === pininput.value)
    {
        pininput.value = idinput.value = "";
        loglabel.textContent=`Welcome back , ${currentacc.username} `;
        mainapp.style.opacity = 100;

        const opt ={
        
            hour : 'numeric',
            minute : 'numeric',
            day :'numeric',
            month : 'numeric',
            year : 'numeric',
           //weekday : 'long'
            
        };
        const locale = navigator.language;
        console.log(locale);
        const x= new Date(currentacc.date.slice(-1));
        const date = new Intl.DateTimeFormat(locale,opt).format(x);
        maindate.textContent = `As of ${date}`;
        displaybal(currentacc);
    }
    
});

//transfer money

trbtn.addEventListener("click" , function(e){

    e.preventDefault();

    clearInterval(logtime);


    logtime=starttimer(5);
    const truser = accounts.find(acc => acc.userid === pi1.value);
    const tramount =Number(pi2.value);
    
    // console.log(tramount,truser);

    pi1.value="";
    pi2.value="";

    if(currentacc.total_bal > tramount && 
        truser &&
        truser !== currentacc &&
        tramount>0 )
        {

            console.log(tramount);
            truser.movements.push(tramount);
            currentacc.movements.push(-tramount);
            datecalc(truser);
            datecalc(currentacc);    
            displaybal(currentacc);
        }


})


//request loan

rmbtn.addEventListener("click",function(e){

    e.preventDefault();
  
    clearInterval(logtime);


    logtime=starttimer(5);

    setTimeout(() => {
        
        const loan = Math.floor(loanamount.value);
        console.log(loan);
    
        loanamount.value="";
        if(currentacc.movements.some(mov => mov > loan/10))
        {
            currentacc.movements.push(loan);
            
    
            datecalc(currentacc);
            displaybal(currentacc);
        }
    },3000);
    
})


//close account

closebtn.addEventListener("click" , function(e){

    e.preventDefault();
    const clu = confuser.value;
    const clp = confpin.value;
    if(currentacc.userid === clu && currentacc.pin === clp)
    {
        const index= accounts.findIndex(acc => currentacc);
        // console.log(index);
        accounts.splice(index,1);
        mainapp.style.opacity = 0
        loglabel.textContent = "log in to get started";

        confuser.value = confpin.value ="";
    }

})

let sorted = false;
sortbtn.addEventListener("click", function(e){

    e.preventDefault();
    displaybal(currentacc,!sorted);
    sorted =!sorted;



})







//consoling


let x = Array.from({length:100},(_,i)=>Math.trunc(Math.random()*6)+1);
console.log(x);
let i=0;

console.log(x.filter(c => c===6).length);
console.log(x.filter(c => c===5).length);
console.log(x.filter(c => c===4).length);
console.log(x.filter(c => c===3).length);
console.log(x.filter(c => c===2).length);
console.log(x.filter(c => c===1).length);

const tag = "hello my name is abhay";

const convert = function(line)
{

    line.split(" ").slice(1,2).join(" ");

    return line
}


const res=convert(tag);


console.log(res);
console.log(Number.parseInt("2004asdasd"));
console.log(Number.isFinite(20));



const d = new Date;
const d1 =new Date(2024, 0 ,27);

console.log(d.getMonth());
console.log(d.toISOString().split("T"));
console.log(d.getTimezoneOffset());
console.log(d.toTimeString());
console.log(d.toString());
console.log(d.toUTCString());
console.log(d.toJSON());



console.log(d1);


console.log(dayspassed(d,d1));

//settimeout

let sent = "Hello abhay go stop  ";
const timer = setTimeout(() => {

    console.log(sent);
    
}, 3000);

console.log("waiting......");
if(sent.split(" ").includes("stop"))
{
    clearTimeout(timer);
}

// setinterval
const timeonly ={

    hour :'numeric',
    minute : 'numeric',
    second :'numeric'
};


let min = 0;
let sec = 0;
const countdown = setInterval(
    () =>{

       

        console.log(`${`${min}`.padStart(2,'0')}:${`${sec}`.padStart(2,'0')}`)
        
        if(sec === 0 )
        {   
            min--;
            sec = 60;
        }
        if(min>=0 && sec>0)
        sec--;

        
        
        else
        {
            console.log("Timer stopped!");
            clearInterval(countdown);
        }
        // console.log(min , sec);
        
        
    }
 , 1000 );



