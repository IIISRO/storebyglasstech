function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }


$( document ).ready(function() {
    if($("#addresseslist li").length == 0){
        $("#addresseslist").html(`<div class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">${transNoAddress}</div>`)
    }
    // bir basa gosterilen  tabi acmag
    let urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('p')){
        $(".active").each(function( index ) {
            $( this ).removeClass('active')
        });

        $(`a[href="#${urlParams.get('p')}"]`).addClass('active');
        $(`#${urlParams.get('p')}`).addClass('active');

        urlParams.delete('p');
        var url = new URL(window.location.href);
        url.search = urlParams.toString();

        window.history.replaceState({ id: "100" },"", url.toString());

        
    }
    if (urlParams.get('apprv')){
       
        
        var confSound = document.getElementById("confSound"); 
        notfSuccess(notfOrderConf);
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
          }
          
        delay(2000).then(() =>  confSound.play());
       
        
        urlParams.delete('apprv');
        var url = new URL(window.location.href);
        url.search = urlParams.toString();

        window.history.replaceState({ id: "100" },"", url.toString());

    }
});

// user melumat update
function editModeUserData(btn, edit){
if(edit){
$("#userfirstname").removeAttr('disabled');
$("#userlastname").removeAttr('disabled');
$("#useremail").removeAttr('disabled');

const saveBtn = `<button type="submit" id="updateuserdata" class="profile-save-btn bordered-btn">${transSave}</button>`;
const cancelBtn = `<button type="button" onclick="editModeUserData(this, false)" id="cancelupdateuserdata" class="profile-bordered-btn bordered-btn ml-1">${transCancel}</button>`;

$(btn).after(cancelBtn);
$(btn).after(saveBtn);
$(btn).remove();
}else{
$("#userfirstname").attr('disabled', true);
$("#userlastname").attr('disabled',  true);
$("#useremail").attr('disabled',  true);

$("#userfirstname").val('');
$("#userlastname").val('');
$("#useremail").val('');

const editBtn = `<button type="button" onclick="editModeUserData(this, true)" class="profile-bordered-btn bordered-btn">${transEdit}</button>`;

$(btn).after(editBtn);
$("#updateuserdata").remove();
$(btn).remove();
}
}

const updateUserDataForm = document.getElementById('updateuserdataform')
updateUserDataForm.addEventListener("submit", (e) => {
e.preventDefault();

const firstName = $("#userfirstname").val();
const lastName = $("#userlastname").val();
const email = $("#useremail").val();
if(email && !isEmail(email)){

return notfWrong(notfWrongEmailMessage);
}
fetch(updateUserAPI,{
    method:"PATCH",
    headers: {
        "X-CSRFToken": csrf,
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
    'first_name': firstName,
    'last_name': lastName,
    'email': email
    })
})
.then((response)=>{
    if(response.status == 200){
        notfSuccess(notfDatasUpdated);
    }else{
        notfWrong(notfError);
    }
    return response.json()
})

.finally(() => {
$("#userfirstname").attr('disabled', true);
$("#userlastname").attr('disabled',  true);
$("#useremail").attr('disabled',  true);

$("#updateuserdata").after(`<button type="button" onclick="editModeUserData(this, true)" class="profile-bordered-btn bordered-btn">${transEdit}</button>`);
$("#cancelupdateuserdata").remove();
$("#updateuserdata").remove();



return 0
    
});
});


// user sifre deyishme
function checkChangePassSaveBtn(){


if($("#oldpass").val().length >= 6 && $("#newpass").val().length >= 6 && $("#renewpass").val().length >= 6){
$("#changepassbtn").addClass('profile-save-btn');
$("#changepassbtn").removeClass('disabled-chng-pass');
$("#changepassbtn").attr('type','submit');


}else{
$("#changepassbtn").addClass('disabled-chng-pass');
$("#changepassbtn").removeClass('profile-save-btn');
$("#changepassbtn").attr('type','button');
}

}

const updatePasswordForm = document.getElementById('updatepasswordform')
updatePasswordForm.addEventListener("submit", (e) => {
e.preventDefault();

const oldPass = $("#oldpass").val();
const newPass = $("#newpass").val();
const reNewPass = $("#renewpass").val();
if(newPass !== reNewPass){

return notfWrong(notfRepPassWrong);
}
fetch(changeUserPassAPI,{
    method:"POST",
    headers: {
        "X-CSRFToken": csrf,
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
    'old_password': oldPass,
    'new_password': newPass
    })
})
.then((response)=>{
    if(response.status == 400){
    notfWrong(notfOldPassWrong);
    }else if(response.status == 200){
    $("#oldpass").val('')
    $("#newpass").val('')
    $("#renewpass").val('')
    $("#changepassbtn").addClass('disabled-chng-pass');
    $("#changepassbtn").removeClass('profile-save-btn');
    $("#changepassbtn").attr('type','button');
    notfSuccess(notfPassUpdated)
    }else{
    notfWrong(notfError)
    }
    return response.json()
})

.finally(() => {



return 0;

    
});
});

// yeni address elave etmee
const addNewAddress = document.getElementById('addnewaddress')
addNewAddress.addEventListener("submit", (e) => {
e.preventDefault();

const addressFirstname = $("#addressfirstname");
const addressLastname = $("#addresslastname");
const addressLine = $("#addressline");
const addressRegion = $("#addressregion");
const addressStreet = $("#addressstreet");
const addressBuilding = $("#addressbuilding");
const addressFlat = $("#addressflat");
const addressesList = $("#addresseslist");

if(!addressFirstname.val() || !addressLastname.val() ||
!addressLine.val() || !addressRegion.val() ||
!addressStreet.val() || !addressBuilding.val() || !addressFlat.val()){

return notfWrong(notfDatasMiss);
}
fetch(addAddressAPI,{
    method:"POST",
    headers: {
        "X-CSRFToken": csrf,
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
    'first_name': addressFirstname.val(),
    'last_name': addressLastname.val(),
    'address_line': addressLine.val(),
    'region': addressRegion.val(),
    'street': addressStreet.val(),
    'building': addressBuilding.val(),
    'flat': addressFlat.val(),
    'is_default': true
    })
})
.then((response)=>{
    if(response.status == 201){
    addressFirstname.val('');
    addressLastname.val('');
    addressLine.val('');
    addressRegion.val('');
    addressStreet.val('');
    addressBuilding.val('');
    addressFlat.val('');
    addressesList.html('')

    notfSuccess(notfNewAddressAdded)
    }else{
    notfWrong(notfError);
    }
    return response.json()
})
.then((data)=>{

if(data){
    for(let address of data){
    let addressHTML = 
    `
    <li class="mb-4 address-item list-group-item has-icon">
        <div>
            <h6 class="mb-0"><i class="fa-solid fa-location-dot"></i> ${address.address_line}</h6>
            <small class="text-muted">${address.first_name} ${address.last_name}, ${address.region}, ${address.street}, ${address.building}, ${address.flat}</small>
        </div>
        ${
        (function checkDefault() {
            if(address.is_default){
            return ` <button class="address-buttons default_address btn btn-light btn-sm ml-auto" type="button"><i class="default_address_check fa-solid fa-circle-check"></i></button>`
            }
            return `<button onclick="setDefault('${address.id}')" class="address-buttons btn btn-light btn-sm ml-auto" type="button"><i class="fa-regular fa-circle-check"></i></button>`

        })()
        }
        
        <button onclick="removeAddress('${address.id}')" class="address-buttons btn address-remove-btn btn-light btn-sm ml-auto" type="button"><i class="fa-regular fa-circle-xmark"></i></button>  
    </li>
    `
    if(address.is_default){
        addressesList.prepend(addressHTML)
    }else{
        addressesList.append(addressHTML)
    }


    }
}

})
.finally(() => {

$('#addAddressModal').modal('hide');

return 0;

    
});
});

// address sil
function removeAddress(id){
const addressesList = $("#addresseslist")


fetch(`/api/v1/account/delete/address/${id}/`,{
    method:"delete",
    headers: {
        "X-CSRFToken": csrf,
        "Accept": "application/json",
        'Content-Type': 'application/json'
    }
    
})
.then((response)=>{
    if(response.status == 200){
    addressesList.html('');
    notfSuccess(notfAddressDeleted);
    }else{
    

    notfWrong(notfError);
    }
    return response.json()
})
.then((data)=>{
if(data){
    for(let address of data){
    let addressHTML = 
    `
    <li class="mb-4 address-item list-group-item has-icon">
        <div>
            <h6 class="mb-0"><i class="fa-solid fa-location-dot"></i> ${address.address_line}</h6>
            <small class="text-muted">${address.first_name} ${address.last_name}, ${address.region}, ${address.street}, ${address.building}, ${address.flat}</small>
        </div>
        ${
        (function checkDefault() {
            if(address.is_default){
            return ` <button class="address-buttons default_address btn btn-light btn-sm ml-auto" type="button"><i class="default_address_check fa-solid fa-circle-check"></i></button>`
            }
            return `<button onclick="setDefault('${address.id}')" class="address-buttons btn btn-light btn-sm ml-auto" type="button"><i class="fa-regular fa-circle-check"></i></button>`

        })()
        }
        
        <button onclick="removeAddress('${address.id}')" class="address-buttons btn address-remove-btn btn-light btn-sm ml-auto" type="button"><i class="fa-regular fa-circle-xmark"></i></button>  
    </li>
    `
    if(address.is_default){
        addressesList.prepend(addressHTML)
    }else{
        addressesList.append(addressHTML)
    }


    }
}
if($("#addresseslist li").length == 0){
    $("#addresseslist").html(`<div class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">${transNoAddress}</div>`)
    }
    })
    .finally(() => {
    return 0;
    });
}

// default address
function setDefault(id){
const addressesList = $("#addresseslist")

fetch(`/api/v1/account/set_default/address/${id}/`,{
    method:"post",
    headers: {
        "X-CSRFToken": csrf,
        "Accept": "application/json",
        'Content-Type': 'application/json'
    }
    
})
.then((response)=>{
    if(response.status == 200){
    addressesList.html('');
    notfSuccess(notfDefAddressChnged);
    }else{
    

    notfWrong(notfError);
    }
    return response.json()
})
.then((data)=>{

if(data){
    for(let address of data){
    let addressHTML = 
    `
    <li class="mb-4 address-item list-group-item has-icon">
        <div>
            <h6 class="mb-0"><i class="fa-solid fa-location-dot"></i> ${address.address_line}</h6>
            <small class="text-muted">${address.first_name} ${address.last_name}, ${address.region}, ${address.street}, ${address.building}, ${address.flat}</small>
        </div>
        ${
        (function checkDefault() {
            if(address.is_default){
            return `<button class="address-buttons default_address btn btn-light btn-sm ml-auto" type="button"><i class="default_address_check fa-solid fa-circle-check"></i></button>`
            }
            return `<button onclick="setDefault('${address.id}')" class="address-buttons btn btn-light btn-sm ml-auto" type="button"><i class="fa-regular fa-circle-check"></i></button>`

        })()
        }
        
        <button onclick="removeAddress('${address.id}')" class="address-buttons btn address-remove-btn btn-light btn-sm ml-auto" type="button"><i class="fa-regular fa-circle-xmark"></i></button>  
    </li>
    `
    if(address.is_default){
        addressesList.prepend(addressHTML)
    }else{
        addressesList.append(addressHTML)
    }


    }
}

})
.finally(() => {
    return 0
    });
}


// projects filters isotop
$(".product-filters li").on('click', function () {
    if(!$(this).hasClass('linkli')){

        $(".product-filters li").removeClass("active");
        $(this).addClass("active");
    }

    var selector = $(this).attr('data-filter');

    $(".product-lists").isotope({
        filter: selector,
    });

});

function addComment(prodID){
    loader.show();
    const rating = document.querySelector('input[name="rating"]:checked');
    const result = rating ? rating.value : 'No rating selected';
    if(!result || !$("#comment").val()){
        notfWrong(notfDatasMiss);
        loader.hide();
    }else{
        fetch(addCommentAPI,{
            method:"POST",
            headers: {
                "X-CSRFToken": csrf,
                "Accept": "application/json",
                'Content-Type': 'application/json'
                },
            body:JSON.stringify({
                'product':  parseInt(prodID),
                'rate':  parseInt(result),
                'comment':  $("#comment").val(),
    
            })
        })
        .then((response)=>{
            if (response.status === 201){
                notfSuccess('Əlavə olundu!')
            }else{ notfWrong(notfError); }
        })
        .finally(()=>{
            loader.hide();
        })
    }
}