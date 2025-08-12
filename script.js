// Wait until the entire page is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const totalCorpus = 32500000; // The total fund amount (3.25 Crores)

    // --- Get HTML Elements ---
    // Get references to all the parts of our HTML that we need to interact with
    const totalCorpusEl = document.getElementById('total-corpus');
    const totalAllocatedEl = document.getElementById('total-allocated');
    const remainingFundsEl = document.getElementById('remaining-funds');

    const sliders = {
        health: document.getElementById('health'),
        banking: document.getElementById('banking'),
        investments: document.getElementById('investments'),
        posterity: document.getElementById('posterity')
    };

    const percentages = {
        health: document.getElementById('health-percent'),
        banking: document.getElementById('banking-percent'),
        investments: document.getElementById('investments-percent'),
        posterity: document.getElementById('posterity-percent')
    };

    const amounts = {
        health: document.getElementById('health-amount'),
        banking: document.getElementById('banking-amount'),
        investments: document.getElementById('investments-amount'),
        posterity: document.getElementById('posterity-amount')
    };

    // --- Functions ---

    /**
     * Formats a number into Indian Rupee currency format (e.g., ₹ 1,23,45,678)
     * @param {number} num - The number to format
     * @returns {string} - The formatted currency string
     */
    function formatCurrency(num) {
        return `₹ ${num.toLocaleString('en-IN')}`;
    }

    /**
     * Main function to update all calculations and display them on the page
     */
    function updateDashboard() {
        let totalAllocatedPercent = 0;
        let totalAllocatedAmount = 0;

        // Loop through each slider to calculate its value
        for (const key in sliders) {
            const slider = sliders[key];
            const percentage = parseInt(slider.value, 10);
            const amount = (totalCorpus * percentage) / 100;

            // Update the percentage text and amount text for this category
            percentages[key].textContent = `${percentage}%`;
            amounts[key].textContent = formatCurrency(amount);

            // Add to the running totals
            totalAllocatedPercent += percentage;
            totalAllocatedAmount += amount;
        }

        // Calculate remaining funds
        const remainingAmount = totalCorpus - totalAllocatedAmount;

        // Update the summary dashboard at the top
        totalAllocatedEl.textContent = formatCurrency(totalAllocatedAmount);
        remainingFundsEl.textContent = formatCurrency(remainingAmount);

        // Change the color of the "Total Allocated" box if it exceeds 100%
        if (totalAllocatedPercent > 100) {
            totalAllocatedEl.parentElement.style.backgroundColor = '#f8d7da'; // Reddish color
            totalAllocatedEl.parentElement.style.color = '#721c24';
        } else {
            totalAllocatedEl.parentElement.style.backgroundColor = '#e9ecef'; // Default color
            totalAllocatedEl.parentElement.style.color = '#0056b3';
        }
    }

    // --- Initial Setup ---

    // Set the display for the total corpus when the page first loads
    totalCorpusEl.textContent = formatCurrency(totalCorpus);

    // Add an 'input' event listener to every slider.
    // This will trigger the updateDashboard function every time a slider is moved.
    for (const key in sliders) {
        sliders[key].addEventListener('input', updateDashboard);
    }

    // Run the function once on page load to set initial values
    updateDashboard();

});
