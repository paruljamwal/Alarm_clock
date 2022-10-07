const currentTime = document.querySelector("h1");
let selectMenu= document.querySelectorAll("select");
let setAlarmBtn= document.querySelector("button");
let content=document.querySelector(".content");
let alarmTime;
let RingTone= new Audio('./files/cuppycake.mp3');
let isAlarmSet=false;
// HOUR.....

for(let i=12; i>0 ; i--){
   
    i= i<10 ? "0" + i : i ;
    let option = `<option value=${i} >${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend',option)
}

// Minutes.....

for(let i=59 ; i>=0 ; i--){
 
    i= i<10 ? "0" + i : i ;
    let option = `<option value=${i} >${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend',option)
}

// AMPM.....

for(let i=2; i>0 ; i--){
  
    let ampm = i ==1 ? "AM" : "PM";
    let option = `<option value=${ampm} >${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend',option)
}



// Show timer.....

setInterval(() => {
    // getting hour , mins , secs
    let date= new Date();
    h= date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
    ampm="AM";

    if(h >=12){
        ampm="PM";
        h=h -12 ;

    };

    // if hour value is 0, set this value to 12
    h = h===0 ? h=12 : h ;

    // adding 0 before hr , min , sec if this value is less than 10...

    h = h<10 ? "0" + h : h;
    m= m <10 ? "0" + m : m;
    s = s<10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`
    if(alarmTime== `${h}:${m} ${ampm}`){
    //   console.log("Alarm ringing.....");
    RingTone.play();
    RingTone.loop=true;
    }
}, 1000);


setAlarmBtn.addEventListener("click",setAlarm);

function setAlarm(){
    if(isAlarmSet){
        alarmTime="";
        RingTone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText="set Alarm";
        return isAlarmSet=false;
    }
    // get data
    let time= `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
    // console.log(time);
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please select a valid time to set alarm! ");
    }
    alarmTime=time;
    isAlarmSet=true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm"
}