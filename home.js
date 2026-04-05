const validPin = 1234;

const transactionData = [];

// log out function
document.getElementById("logOutBtn").addEventListener("click", () => {
  window.location.href = "./login.html";
});


// get input value function
function inputFieldValueNumber(id) {
  const inputFieldValue = parseInt(document.getElementById(id).value);
  return inputFieldValue;
}
// to get available balance
function getAvailableBalance(id) {
  const balance = parseInt(document.getElementById(id).innerText);
  return balance;
}
// to get bank account number
function accountNumber(account) {
  const bankAccount = document.getElementById(account).value;
  return bankAccount;
}
// set inner text
function setInnerText(value) {
  const setAvailableBalance = document.getElementById("availableBalance");
  setAvailableBalance.innerText = value;
  return setAvailableBalance;
}

// toggle function
function handleToggle(id) {
  const forms = document.getElementsByClassName("formAll");
  for (const form of forms) {
    form.style.display = "none";
  }
  document.getElementById(id).style.display = "block";
}

// handle toggle button function
function handleToggleButton(id){
   const allButton = document.getElementsByClassName("allButton ");
   for (const button of allButton) {
     button.classList.remove("bg-[#0874F2]/5", "border-[#0874F2]");
     button.classList.add("border-[#080808]/10", "bg-white");
   }
   document.getElementById(id).classList.remove("border-[#080808]/10", "bg-white");
   document.getElementById(id).classList.add("bg-[#0874F2]/5", "border-[#0874F2]");
}


// add money function
document.getElementById("addMoneyBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const bankAccountNumber = accountNumber("bankAccountNumber");
  const addAmount = inputFieldValueNumber("addAmount");
  if(addAmount < 1){
    alert("Amount must be greater than 0.")
    return
  }
  const pinNumber = inputFieldValueNumber("pinNumber");
  const availableBalance = getAvailableBalance("availableBalance");
  if (bankAccountNumber.length !== 11) {
    alert("Please provide a valid account number!");
    return;
  }
  if (pinNumber !== validPin) {
    alert("Please provide a valid pin number!");
    return;
  }

  const newAvailableBalance = availableBalance + addAmount;
  setInnerText(newAvailableBalance);
  alert("Money added successfully");
  const data = {
    name: "Add Money",
    time: new Date().toLocaleTimeString()
  };
  transactionData.unshift(data)
});

// cash out function
document.getElementById("cashOutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const bankAccountNumber = accountNumber("withdrawNumber");
  const withdrawPinNumber = inputFieldValueNumber("withdrawPinNumber");
  const withdrawAmount = inputFieldValueNumber("cashOutAmount");
  const availableBalance = getAvailableBalance("availableBalance");
  if(withdrawAmount > availableBalance){
    alert("Withdraw amount must be less than Balance.");
    return;
  }
  if(withdrawAmount < 1){
    alert("Amount must be greater than 0.");
  }
  if (bankAccountNumber.length !== 11) {
    alert("Please provide a valid account number!");
    return;
  }
  if (withdrawPinNumber !== validPin) {
    alert("Please provide a valid pin number!");
    return;
  }
  const newAvailableBalance = availableBalance - withdrawAmount;
  setInnerText(newAvailableBalance);
  alert("Withdraw Successful");
  const data = {
    name: "Cash Out",
    time: new Date().toLocaleTimeString(),
  };
  transactionData.unshift(data);
});

// transfer money function
document.getElementById("transferBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const transferNumber = accountNumber("transferNumber");
  const transferPinNumber = inputFieldValueNumber("transferPinNumber");
  const transferAmount = inputFieldValueNumber("transferAmount");
  const availableBalance = getAvailableBalance("availableBalance");
  if(transferAmount > availableBalance){
    alert("Transfer amount must be less than Balance.");
    return;
  }
  if (transferNumber.length !== 11) {
    alert("Please provide a valid account number!");
    return;
  }
  if (transferPinNumber !== validPin) {
    alert("Please provide a valid pin number!");
    return;
  }
  const newAvailableBalance = availableBalance - transferAmount;
  setInnerText(newAvailableBalance);
  alert("Transfer Successful");
  const data = {
    name: "Transfer Money",
    time: new Date().toLocaleTimeString(),
  };
  transactionData.unshift(data);
});

// get bonus function
document.getElementById("getBonusBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const getBonusPinNumber = inputFieldValueNumber("getBonusPinNumber");
  const bonusCode = accountNumber("bonusCode");
  const availableBalance = getAvailableBalance("availableBalance");
  if (bonusCode.length !== 4) {
    alert("Please provide a valid code!");
    return;
  }
  if (getBonusPinNumber !== validPin) {
    alert("Please provide a valid pin number!");
    return;
  }
  const newAvailableBalance = availableBalance + 1000;
  setInnerText(newAvailableBalance);
  alert("You have received a $1000 bonus");
  const data = {
    name: "Bonus",
    time: new Date().toLocaleTimeString(),
  };
  transactionData.unshift(data);
});

// pay bill function
document.getElementById("payBillBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const billerAccountNumber = accountNumber("billerAccountNumber");
  const payAmount = inputFieldValueNumber("payAmount");
  const payBillPinNumber = inputFieldValueNumber("payBillPinNumber");
  const availableBalance = getAvailableBalance("availableBalance");
  if(payAmount > availableBalance){
    alert("Insufficient Balance");
    return;
  }
  const select = document.getElementById("billName");
  const selectInnerText = select.options[select.selectedIndex].innerText;
  if (billerAccountNumber.length !== 11) {
    alert("Please provide a valid account number!");
    return;
  }
  if (payBillPinNumber !== validPin) {
    alert("Please provide a valid pin number!");
    return;
  }
  const newAvailableBalance = availableBalance - payAmount;
  setInnerText(newAvailableBalance);
  alert("Bill Paid successfully");
  const data = {
    name: selectInnerText,
    time: new Date().toLocaleTimeString(),
  };
  transactionData.unshift(data);
});

// transaction function
document.getElementById("transactionsButton").addEventListener("click", (e)=>{
  const transactionContainer = document.getElementById("transactionContainer");
  transactionContainer.innerHTML = "";
  for(const data of transactionData){
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-white p-3 rounded-xl border-1 border-[#080808]/10 mb-3">
                    <div class="flex justify-between items-center ">
                        <div class="flex items-center gap-2">
                            <div class="p-3 rounded-full bg-[#080808]/5">
                                <img src="./assets/wallet1.png" alt="">
                            </div>
                            <div>
                                <h4 class="text-[#080808]/70 font-semibold">${data.name}</h4>
                                <p class="text-[#080808]/70 text-[12px]">${data.time}</p>
                            </div>
                        </div>
                        <div class="text-[#080808]/70 text-lg">
                            <i class="fa-solid fa-ellipsis rotate-90"></i>
                        </div>
                    </div>
                </div>
    `;
    transactionContainer.appendChild(div);
  }
});


// toggle feature
document.getElementById("addMoneyButton").addEventListener("click", (e) => {
  handleToggle("addMoney");
  handleToggleButton("addMoneyButton");
});

document.getElementById("cashOutButton").addEventListener("click", (e) => {
  handleToggle("cashOut");
  handleToggleButton("cashOutButton");
});

document.getElementById("transferMoneyButton").addEventListener("click", (e) => {
    handleToggle("transferMoney");
    handleToggleButton("transferMoneyButton");
});

document.getElementById("getBonusButton").addEventListener("click", (e) => {
  handleToggle("getBonus");
  handleToggleButton("getBonusButton");
});

document.getElementById("payBillButton").addEventListener("click", (e) => {
  handleToggle("payBill");
  handleToggleButton("payBillButton");
});

document.getElementById("transactionsButton").addEventListener("click", (e) => {
  handleToggle("transaction");
  handleToggleButton("transactionsButton");
});

