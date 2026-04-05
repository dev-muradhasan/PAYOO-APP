document.getElementById("loginBtn").addEventListener("click", (e)=>{
    e.preventDefault();
    const mobileNumber = 12345678910;
    const pinNumber = 1234;
    const mobileNumberValue = document.getElementById("mobileNumber").value;
    const pinNumberValue = document.getElementById("pinNumber").value;
    const mobileNumberValueInt = parseInt(mobileNumberValue);
    const pinNumberValueInt = parseInt(pinNumberValue);
    
    if(mobileNumberValueInt === mobileNumber && pinNumberValueInt === pinNumber){
        window.location.href = "./home.html";
    }
    else{
        alert("Invalid credentials!")
    }
})