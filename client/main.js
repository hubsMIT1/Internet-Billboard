// variabe to save the amount and messages

let messages = [];

// Get the value of the "data" attribute from the DOM element

var dataElement = document.getElementById('getdata');
var data = dataElement.getAttribute('data-my-data');
data = JSON.parse(data);

messages = data;

let currentPrice = 0;
// variable
var cancelPay = document.querySelector(".blockonomics_close");
var leftScreen = document.querySelector(".screen-body-item.left");
var show_msg_id = document.getElementById("show_msg");
var show_amnt_id = document.getElementById("show_amnt");
var show_name_id = document.getElementById("show_name");
// cheching if there is any message in db or not else hide message section
if (messages.length === 0) {
  //   leftScreen.style.display = "none";
  document.querySelector(".input_payment_title").innerHTML =
    "Pay an Amount To add your message in list:";
  // document.querySelector(".screen-body-item.left").style.display = 'none';
}
else {
  show_msg_id.innerText = messages[0].message;
  show_name_id.innerText = "Name: " + messages[0].name;
  show_amnt_id.innerText = messages[0].amount;
  currentPrice = messages[0].amount;
}
// global varible to take form data
var email, amount, names, message, price;

// bitcoinpay box
var block_div = document.querySelector("#bitcoinpay");

// pay a funtion after submiting the form

function pay(event) {
  block_div.innerHTML = "";
  event.preventDefault();
  // allow to show the popup box after submiting form
  var popup = document.querySelector(".overlay");
  popup.style.display = "block";
  // save all input data into respected variable
  email = document.getElementById("email");
  amount = document.getElementById("amount");
  names = document.getElementById("name");
  message = document.getElementById("text");

  price = parseInt(amount.value); // saving value if input data and push in messages then sorting according to amount
  var useremail = email.value;
  //now here used Blockonomics.widget function to send email and amount
  try {
    Blockonomics.widget({
      msg_area: "bitcoinpay",
      uid: "7371c14f9ace4940",
      email: useremail,
      amount: price
    });
  } catch (error) { }



  // on click the close btn popup will close
  cancelPay.addEventListener("click", function () {
    cancelPayment();
  });

  // to show the conversion of USD into BTC till 8 decimal
  var create_div = document.querySelector("#usd_to_bitcoin");
  var usdToBtc = parseFloat(0.000045111492 * price).toFixed(8);
  create_div.innerHTML = price + "USD <==> " + usdToBtc + " BTC ";
  // Callback();
  // return false;
}

//  it is to just cancel payment and hide popup
function cancelPayment() {
  var popup = document.querySelector(".overlay");
  popup.style.display = "none";
  document.getElementById("bitcoinpay").innerHTML = "";
}

// After the payment done => by using Payment Callback fuction
// redirecting user to main page and if amount is higher than others then allowing to message in message box
var higherAmount = 1;
window.blockonomicsPaymentCallback = function(payment) {
    // displaying the left message box if there any message
  //  function Callback(){
  leftScreen.style.display = 'block';

  // DOM variable  all here to show MESSAGES | NAME | AMOUNT
 
     if(price>currentPrice){
    // allowing message to show in the message box
    show_msg_id.innerText = messages[0].message = message.value;
    show_name_id.innerText = messages[0].name = "Name: " + names.value;
    show_amnt_id.innerText = messages[0].amount = price;
    currentPrice = price;
    messages[0].email = email.value;
    // to show toast for 10sec that payment has done and messsages added successfully
    

    //here sending the data to update it 
    var req = new XMLHttpRequest();
    req.open("POST", '/');
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("name=" + names.value + "&email=" + email.value + "&amount=" + currentPrice + "&message=" + message.value);

    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        // alert(req.responseText);
      }
      
    }
    higherAmount = 3;
  }
  else {
     higherAmount=2;
  }


  // assign null to input value
  names.value = "";
  message.value = "";
  amount.value = "";
  email.value = "";
  
  document.getElementById("bitcoinpay").innerHTML = "";
  cancelPayment();
  Showtoast(higherAmount);

}
function Showtoast(higherAmount){
  var x = document.getElementById("snackbar");
if(higherAmount===3){
  x.className = "show";
}
else if(higherAmount===2) {
  
    x.className = "show";
    x.innerHTML = "";
    x.innerText = "Payment Done but.. OOPS You have to pay higher amount to be higer bidder!!";
  }
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 10000);
}