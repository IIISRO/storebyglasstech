document.addEventListener("DOMContentLoaded", function() {
    const frameItems = document.querySelectorAll(".frame-item");
    const mainFrame = document.getElementById("main-frame");

    frameItems.forEach(item => {
        item.addEventListener("click", function() {
            // Remove active class from all frame items
            frameItems.forEach(frame => frame.classList.remove("frameactive"));

            // Add active class to the clicked frame item
            this.classList.add("frameactive");

            // Get the frame URL from the clicked frame item
            const frameUrl = this.getAttribute("data-frame");

            // Update the main frame background with the selected frame
            if (frameUrl === "none") {
                mainFrame.style.backgroundImage = "none";
                mainFrame.style.background = "none"; // Clear any background set by ::before
            } else {
                mainFrame.style.background = `url(${frameUrl}) no-repeat center center`;
                mainFrame.style.backgroundSize = "cover";
            }
        });
    });
});
