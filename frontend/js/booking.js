// Booking page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Date Picker
    const datePicker = flatpickr("#date-picker", {
        dateFormat: "F j, Y", // April 14, 2024 format
        minDate: "today",
        maxDate: new Date().fp_incr(60), // Allow booking up to 60 days in advance
        defaultDate: new Date().fp_incr(1), // Default to tomorrow
        disableMobile: true, // Use the same UI on mobile
        inline: false, // Show the calendar only when the input is clicked
        theme: "dark",
        onChange: function(selectedDates, dateStr) {
            console.log("Selected date: ", dateStr);
        }
    });      // Initialize Time Picker
    const timePicker = flatpickr("#time-picker", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K", // 6:00 PM format
        minTime: "17:00", // 5:00 PM
        maxTime: "22:00", // 10:00 PM
        defaultDate: "17:00", // Default to 5:00 PM
        disableMobile: true, // Use the same UI on mobile
        theme: "dark",
        minuteIncrement: 1, // Allow any minute selection (1 to 59)
        time_24hr: false, // Use 12 hour time with AM/PM
        onChange: function(selectedDates, timeStr) {
            console.log("Selected time: ", timeStr);
        }
    });
    
    // Table option selection
    const tableOptions = document.querySelectorAll('.table-option');
    tableOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            tableOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });    // Form submission
    const bookingForm = document.querySelector('.booking-form');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get selected values
        const selectedDate = document.getElementById('date-picker').value;
        const selectedTime = document.getElementById('time-picker').value;
        const selectedTables = document.querySelector('.table-option.selected')?.textContent;
        
        if (!selectedDate || !selectedTime || !selectedTables) {
            alert("Please select date, time, and number of tables");
            return;
        }
        
        // Simple booking confirmation
        alert(`Booking confirmed!\nDate: ${selectedDate}\nTime: ${selectedTime}\nTables: ${selectedTables}`);
        
        // Here you would typically send the data to your backend
        console.log('Booking details:', {
            date: selectedDate,
            time: selectedTime,
            tables: selectedTables
        });
    });
});
