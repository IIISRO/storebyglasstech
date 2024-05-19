let mdf=document.getElementById("mdf")
let glass=document.getElementById("glass")
let mdfText=document.querySelector("#mdf span")
let glassText=document.querySelector("#glass span")
mdf.addEventListener("click",()=>{
    if(mdf.classList.contains("col-md-6")){
        mdf.classList.add("col-md-10")
        mdf.classList.add("bg-light")
    mdf.classList.remove("col-md-6")
    glass.classList.add("col-md-2")
    glass.classList.remove("col-md-6")
    glassText.classList.add("d-none")
    }
    else{
        mdf.classList.add("col-md-10")
        mdf.classList.add("bg-light")
        glass.classList.remove("bg-light")
    mdf.classList.remove("col-md-2")
    glass.classList.add("col-md-2")
    glass.classList.remove("col-md-10")
    mdfText.classList.remove("d-none")
    glassText.classList.add("d-none")
    }
    
})
glass.addEventListener("click",()=>{
    if(glass.classList.contains("col-md-6")){
        glass.classList.add("col-md-10")
        glass.classList.add("bg-light")
        glass.classList.remove("col-md-6")
    mdf.classList.add("col-md-2")
    mdf.classList.remove("col-md-6")
    
    mdfText.classList.add("d-none")
    }
    else{
        glass.classList.add("col-md-10")
    glass.classList.remove("col-md-2")
    mdf.classList.add("col-md-2")
    mdf.classList.remove("bg-light")
    glass.classList.add("bg-light")
    mdf.classList.remove("col-md-10")
    glassText.classList.remove("d-none")
    mdfText.classList.add("d-none")
    }
})