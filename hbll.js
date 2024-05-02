let blncstatus = document.getElementById("blncstatus")
let diffinamount = document.getElementById("diffinamount")
let arrowup=document.getElementById("arrowup")
let arrowdown=document.getElementById("arrowdown")

let transactionel = document.getElementById("transaction")
let state={
     debit:0,
     credit:0,
     net:0,
     transactiondata:
     [
   
        ],
};
let send=state.transactiondata;

let calculatedata=(event)=>{
    event.preventDefault();

    let formdata = new FormData(transactionel);
    let data={};
    formdata.forEach((value,key)=>{
        data[key]=value;
        
    });

    let iscredit =event.submitter.id==="credit" ? true : false;

    const{text,number}=data;
    let transactions={
        id:Math.floor(Math.random()*10000),
        text:text,
        amount:+number,
        type:iscredit ? "credit" : "debit" ,
    
    }
    state.transactiondata.push(transactions)

    let rsult=()=>{

        let currblnc=0;

    let slip=document.querySelector(".slips");
    slip.innerHTML="";
    send.forEach((transactions)=>{

        const{id,amount,text,type}=transactions;
        const isdebit =type==="debit"? true:false
        let sign = isdebit? "-":"+";

        if(sign==="+"){
           currblnc +=amount;
        }else{
          currblnc-=amount;
        }
            blncstatus.innerHTML=`${currblnc}.00`
          
  if(sign==="+"){
    let slip1=`
    <div class="slip">
     <div class="arrow">
    <i id="arrowup" class="fa-solid fa-arrow-up hide "></i>
    <i id="arrowdown" class="fa-solid fa-arrow-down"></i>
</div>
<div class="sliptext">
    <p>Finds ${type}   #425298592</p>
<p id="to" >${text}  ${id}</p>
<p>Through Digital Banking</p>
</div>
<div class="slipamount">
   <p id="diffinamountcredit" > ${sign}${amount}</p>
</div>
</div>`
slip.insertAdjacentHTML("afterbegin",slip1);

}else{
    let slip1=`
    <div class="slip">
     <div class="arrow">
    <i id="arrowup" class="fa-solid fa-arrow-up"></i>
    <i id="arrowdown" class="fa-solid fa-arrow-down hide"></i>
</div>
<div class="sliptext">
    <p>Funds ${type}   #425298592</p>
<p id="to" >${text}  ${id}</p>
<p>Through Digital Banking</p>
</div>
<div class="slipamount">
   <p id="diffinamountdebit" > ${sign}${amount}</p>
</div>
</div>`
slip.insertAdjacentHTML("afterbegin",slip1);

}
    });

};
    rsult();
    transactionel.reset();
};
transactionel.addEventListener("submit",calculatedata);
