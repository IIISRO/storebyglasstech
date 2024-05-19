

document.getElementById('phone').addEventListener('input', function(e){
    let input  = e.target
    if(e.data===null && input.value.length > 4){
        return;
    }
    const nonDigRegx = /\D/g
    const testNumRegx = /^[0-9+\s]+$/
    
    if (testNumRegx.test(input.value) && input.value.length === 17 && input.value.replace(/\D/g, '').length === 12) {
        return;
    }
    let phoneNumber = input.value.replace(nonDigRegx, '');

    if (phoneNumber.startsWith('994')) {
        phoneNumber = '994' + phoneNumber.slice(3);
    }

    phoneNumber = phoneNumber.slice(0, 14);

    const countryCodeLength = 4; // +994
    const maxDigitsAfterCountryCode = 8;
    const digitsAfterCountryCode = phoneNumber.length - countryCodeLength;

    if (digitsAfterCountryCode > maxDigitsAfterCountryCode) {
        phoneNumber = phoneNumber.slice(0, countryCodeLength + maxDigitsAfterCountryCode);
    }

    const formattedNumber = `+994 ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10)}`;
    
    input.value = formattedNumber;
})

function checkNumber(){
    jQuery(".loader_wait_response").show();
    if (/^[0-9+\s]+$/.test($("#phone").val()) && $("#phone").val().length === 17 && $("#phone").val().replace(/\D/g, '').length === 12) {
      
                $("#next-btn").remove();
                $("#phone").attr('disabled', true);
                $("#pass_div").removeClass('d-none');
                $("#signin_btn").removeClass('d-none');
                $("#reset_pass").removeClass('d-none');
                notfSuccess(notfPassSMSSended);
                resendSMSTimer();
    }
    else{
        jQuery(".loader_wait_response").hide();
        notfWrong(notfWrongNumber);
    }
    
}

function newPassword(){
    jQuery(".loader_wait_response").show();
    
                    $("#reset_pass").remove();
                    notfSuccess(notfNewPassSMSSended);
                    resendSMSTimer();
              
}
function login(){
    if(!/^[0-9+\s]+$/.test($("#phone").val()) && $("#phone").val().length === 17 && $("#phone").val().replace(/\D/g, '').length === 12){
        notfWrong(notfWrongNumber)
        return false;
    }
    if(!$("#password").val()){
        notfWrong(notfEnterPass)
        return false;
    }


    
}


function resendSMSTimer(){
    $("#resend_timer").removeClass('d-none');

    const minutesLabel = $("#minutes");
    const secondsLabel = $("#seconds");

    // Set the duration of the countdown in milliseconds (3 minutes)
    const countdownDuration = 3 * 60 * 1000;

    // Calculate the target time by adding the duration to the current time
    const targetTime = Date.now() + countdownDuration;

    // Update the countdown every second
    const countdownTimer = setInterval(() => {
    // Get the current time
    const currentTime = Date.now();

    // Calculate the remaining time
    const remainingTime = targetTime - currentTime;

    // Calculate minutes and seconds
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
    // Display the countdown
    minutesLabel.html(minutes)
    secondsLabel.html(seconds.toString().padStart(2, '0'))

   
    // If the countdown is finished, display a message and clear the interval
    if (remainingTime <= 0) {
        clearInterval(countdownTimer);
        $("#resend_timer").addClass('d-none');
        $("#resend_pass").removeClass('d-none');
        
    }
    }, 1000); // Update every second

   
}

