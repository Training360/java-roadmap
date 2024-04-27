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
            };
    });

    const search = document.querySelector("#search-input");
    search.oninput = function() {
        clearFilters();
        document.querySelector("#filter-none").classList.add("selected");
        const query = search.value;        
        selectTrainings(function(training) {
            const content = training.querySelector(".modal-content");
            return (query == "") || (content.innerHTML.toLowerCase().includes(query.toLowerCase()));
        });
    };

    const filters = document.querySelectorAll(".filter");
    filters.forEach(function(filter, key, parent) {
        filter.onclick = function() {
            if (!filter.classList.contains("selected")) {                
                const search = document.querySelector("#search-input");
                search.value = "";
                clearFilters();
                filter.classList.add("selected");
                const filterId = filter.id;
                if (filterId == "filter-none") {
                    testTraining = function(training) {
                        return true;
                    };
                }
                if (filterId == "filter-new") {
                    testTraining = function(training) {
                        return training.querySelector(".triangle-left");
                    };
                }
                if (filterId == "filter-blended") {
                    testTraining = function(training) {
                        return training.classList.contains("blended");
                    };
                }
                if (filterId == "filter-classic") {
                    testTraining = function(training) {
                        return !training.classList.contains("blended");
                    };
                }
                if (filterId == "filter-web") {
                    testTraining = function(training) {
                        const code = training.querySelector("h2").innerHTML;
                        return ["JAVA-BGN", "JAVA-BSC", "JAVA-ADV", "SZT-01", "JAVA-SQL", "JAVA-JPA", "JAVAX-MCR"].includes(code);
                    };
                }
                if (filterId == "filter-advanced-web") {
                    testTraining = function(training) {
                        const code = training.querySelector("h2").innerHTML;
                        return ["JAVA-OO", "JAVA-CC", "JAVA-JPA2", "JAVAX-SPR2", ].includes(code);
                    };
                }
                if (filterId == "filter-test") {
                    testTraining = function(training) {
                        const code = training.querySelector("h2").innerHTML;
                        return ["JAVA-BGN", "JAVA-BSC", "SZT-01", "SWD-JAVA", ].includes(code);
                    };
                }
                if (filterId == "filter-microservice") {
                    testTraining = function(training) {
                        const code = training.querySelector("h2").innerHTML;
                        return ["JAVA-DDD", "JAVAX-NOSQL", "JAVAX-MCR", "JAVAX-SPR2", "JAVAX-SPCL", "JAVAX-REACT"].includes(code);
                    };
                }
                selectTrainings(testTraining);
            }
        }
    });
        
}

function clearFilters() {
    const filters = document.querySelectorAll(".filter");
    filters.forEach(function(otherFilter, key, parent) {
        otherFilter.classList.remove("selected");
    });
}

function selectTrainings(testTraining) {
    const categories = document.querySelectorAll(".category");     
        categories.forEach(function(category, key, parent) {
            const trainings = category.querySelectorAll(".training");        
            let selected = 0;
            trainings.forEach(function(training, key, parent) {
                
                if (testTraining(training)) {
                    training.style.display = "block";
                    selected++;
                }
                else {
                    training.style.display = "none";
                }
            });
            if (selected == 0) {
                category.style.display = "none";
            }
            else {
                category.style.display = "block";
            }
        });
}
