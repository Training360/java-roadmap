window.onload = function() {
    const trainings = document.querySelectorAll(".training");
    trainings.forEach(function(training, key, parent) {
        const link = training.querySelector("h1 a");
        const modal = training.querySelector(".modal");        
        link.onclick = function() {
            modal.style.display = "block";
        };

        const close = training.querySelector(".close");
        close.onclick = function() {
            modal.style.display = "none";
        }
    });

    const search = document.querySelector("#search-input");
    search.oninput = function() {
        const query = search.value;        
        console.log("Value: " + query);
        const trainings = document.querySelectorAll(".training");        
        trainings.forEach(function(training, key, parent) {
            const content = training.querySelector(".modal-content");
            if ((query == "") || (content.innerHTML.includes(query))) {
                training.style.display = "block";
            }
            else {
                training.style.display = "none";
            }
        });
    };
        
}
