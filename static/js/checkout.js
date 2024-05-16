let showBtn=document.querySelector('.showcoupon')
let form=document.querySelector('.form-coupon')

showBtn.addEventListener('click',()=>{
    let result=showBtn.classList.toggle('active')
    if(result){
        form.classList.remove('d-none')
    }
    else{
        form.classList.add('d-none')
    }
})