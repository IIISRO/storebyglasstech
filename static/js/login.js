let passInput = document.getElementById('current-password')
let passInput2 = document.getElementById('current-password2')
let toggler = document.getElementById('pass-image')
let toggler2 = document.getElementById('pass-image2')
passInput.addEventListener('input', function () {
    if(passInput.value!=''){
        toggler.classList.remove('d-none')
        toggler.addEventListener('click', showHidePassword);
    }
    else if(passInput.value==''){
        toggler.classList.add('d-none')
    }
})
function showHidePassword() {
    if (passInput.type == 'password') {
        passInput.setAttribute('type', 'text');
        toggler.src = "./static/images/hide.png";
    } else {
        toggler.src = "./static/images/eye.png";
        passInput.setAttribute('type', 'password');
    }
};


passInput2.addEventListener('input', function () {
    if(passInput2.value!=''){
        toggler2.classList.remove('d-none')
        toggler2.addEventListener('click', showHidePassword2);
    }
    else if(passInput2.value==''){
        toggler2.classList.add('d-none')
    }
})
function showHidePassword2() {
    if (passInput2.type == 'password') {
        passInput2.setAttribute('type', 'text');
        toggler2.src = "./static/images/hide.png";
    } else {
        toggler2.src = "./static/images/eye.png";
        passInput2.setAttribute('type', 'password');
    }
};

let choice1=document.getElementById('choice1');
let vendor=document.getElementById('vendor');
let choice2=document.getElementById('choice2');

choice2.addEventListener('click',()=>{
    if(choice2.checked==true){
        vendor.classList.remove('d-none')
    }
})
choice1.addEventListener('click',()=>{
    if(choice1.checked==true){
        vendor.classList.add('d-none')
    }
})