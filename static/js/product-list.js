let mdf = document.getElementById("mdf")
let glass = document.getElementById("glass")
let mdfText = document.querySelector("#mdf span")
let glassText = document.querySelector("#glass span")

mdf.addEventListener("click", () => {
    if (mdf.classList.contains("col-6")) {
        mdf.classList.add("col-10")
        mdf.classList.add("bg-light")
        mdf.classList.remove("col-6")
        glass.classList.add("col-2")
        glass.classList.remove("col-6")
        glassText.classList.add("d-none")
    }
    else {
        mdf.classList.add("col-10")
        mdf.classList.add("bg-light")
        glass.classList.remove("bg-light")
        mdf.classList.remove("col-2")
        glass.classList.add("col-2")
        glass.classList.remove("col-10")
        mdfText.classList.remove("d-none")
        glassText.classList.add("d-none")
    }

})
glass.addEventListener("click", () => {
    if (glass.classList.contains("col-6")) {
        glass.classList.add("col-10")
        glass.classList.add("bg-light")
        glass.classList.remove("col-6")
        mdf.classList.add("col-2")
        mdf.classList.remove("col-6")

        mdfText.classList.add("d-none")
    }
    else {
        glass.classList.add("col-10")
        glass.classList.remove("col-2")
        mdf.classList.add("col-2")
        mdf.classList.remove("bg-light")
        glass.classList.add("bg-light")
        mdf.classList.remove("col-10")
        glassText.classList.remove("d-none")
        mdfText.classList.add("d-none")
    }
})
