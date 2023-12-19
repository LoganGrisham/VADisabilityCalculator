    <script>
        // Store selected ratings in an array
        const selectedRatings = [];

        // Function to add a rating to the selected list
        function addRating(value) {
            selectedRatings.push(value);
            updateSelectedRatingsList();
        }

        // Function to update the displayed selected ratings list
        function updateSelectedRatingsList() {
            const selectedRatingsList = document.getElementById('selected-ratings');
            selectedRatingsList.innerHTML = selectedRatings.map(value => `<li>${value}</li>`).join('');
        }

        // Function to add a step to the displayed steps list
        function addStep(step) {
            const stepsList = document.getElementById('steps-list');
            stepsList.innerHTML += `<p>${step}</p>`;
        }

        // Event listener for rating buttons
        const ratingButtons = document.querySelectorAll('.rating-button');
        ratingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const value = parseInt(button.getAttribute('data-value'));
                addRating(value);
            });
        });

        // Event listener for calculate button
        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', () => {
            calculateCombinedRating(selectedRatings);
        });

        // Function to calculate combined rating based on selected ratings
        function calculateCombinedRating(ratings) {
            // Clear the steps list
            const stepsList = document.getElementById('steps-list');
            stepsList.innerHTML = '';

            // Create a copy of the ratings array for sorting
            const sortedRatings = [...ratings];

            // Sort the ratings in ascending order
            sortedRatings.sort((a, b) => b - a);

            addStep(`Sorted Ratings:, ${sortedRatings}`);

            let result = 0;
            let past = 0;

            for (let i = 0; i < sortedRatings.length; i++) {
                const currentRating = sortedRatings[i];

                if (i === 0) {
                    // For the first rating, initialize result with the value from combinedRatings
                    result = currentRating;
                    past = currentRating;
                    addStep(`Initial: ${currentRating} -> Value ${result}`);
                } 
                else {
                    // For subsequent ratings, update result with the value based on the current rating and the resultant value
                    result = combinedRatings[result][currentRating];
                    addStep(`Step ${i}: ${past} -> ${currentRating} -> Value ${result}`);
                    past = result;
                }
            }

            const resultContainer = document.getElementById('result-container');
            resultContainer.innerHTML = `<h3 style = "color:chartreuse">The final result is ${result}.</h3>`;
        }
    </script>
