$(document).ready(function() {
    var outputList = document.getElementById("list-output");
    var bookurl = "https://www.googleapis.com/books/v1/volumes?q=";
    // Placeholder image with a more modern look
    var placeHldr = 'https://placehold.co/150x200/cccccc/333333?text=No+Image';

    // Get message box elements
    var messageBox = document.getElementById("message-box");
    var messageContent = document.getElementById("message-content");
    var messageCloseButton = document.getElementById("message-close");

    // Function to display custom messages
    function showMessage(message) {
        messageContent.textContent = message;
        messageBox.classList.remove("hidden"); // Show the message box
    }

    // Function to hide custom messages
    function hideMessage() {
        messageBox.classList.add("hidden"); // Hide the message box
    }

    // Event listener for the message box close button
    messageCloseButton.addEventListener("click", hideMessage);

    $("#search").click(function() {
        outputList.innerHTML = ""; // Clear previous results
        var searchData = $("#search-box").val().trim(); // Get search data and trim whitespace

        if (searchData === "") {
            showMessage("Please enter a book title to search!"); // Use custom message box
        } else {
            // Add a loading indicator
            outputList.innerHTML = '<div class="text-center text-white text-xl col-span-full py-8">Loading books...</div>';

            $.ajax({
                url: bookurl + encodeURIComponent(searchData), // Encode search data for URL safety
                dataType: "json",
                success: function(response) {
                    console.log("API Response:", response); // Log the full API response for debugging
                    if (response.totalItems === 0) {
                        showMessage("No results found for your search! Please try again with different keywords."); // Use custom message box
                        outputList.innerHTML = ''; // Clear loading message
                    } else {
                        // Show the book list section
                        $(".book-list").removeClass('hidden').addClass('flex flex-col');
                        outputList.innerHTML = ''; // Clear loading message before displaying results
                        displayResults(response);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error:", textStatus, errorThrown); // Log detailed error
                    showMessage("Something went wrong while fetching data! Please try again. (Details: " + textStatus + ")"); // Use custom message box
                    outputList.innerHTML = ''; // Clear loading message
                }
            });
        }
        $("#search-box").val(""); // Clear the search box after search
    });

    function displayResults(res) {
        // Check if items array exists and has content
        if (!res.items || res.items.length === 0) {
            showMessage("No book items found in the response.");
            return;
        }

        for (var i = 0; i < res.items.length; i++) {
            var item = res.items[i];
            // Ensure volumeInfo exists before accessing its properties
            if (!item.volumeInfo) {
                console.warn("Skipping item due to missing volumeInfo:", item);
                continue; // Skip this item if volumeInfo is missing
            }

            var title = item.volumeInfo.title || "No Title Available";
            var author = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown Author";
            var publisher = item.volumeInfo.publisher || "Unknown Publisher";
            
            // --- Robust ISBN Extraction ---
            var bookIsbn = "No ISBN";
            if (item.volumeInfo.industryIdentifiers) {
                // Prioritize ISBN_13, then ISBN_10
                for (var j = 0; j < item.volumeInfo.industryIdentifiers.length; j++) {
                    var identifier = item.volumeInfo.industryIdentifiers[j];
                    if (identifier.type === 'ISBN_13') {
                        bookIsbn = identifier.identifier;
                        break; // Found ISBN_13, no need to check further
                    } else if (identifier.type === 'ISBN_10' && bookIsbn === "No ISBN") {
                        // Only assign ISBN_10 if ISBN_13 hasn't been found yet
                        bookIsbn = identifier.identifier;
                    }
                }
            }
            console.log("Book Title:", title, "Extracted ISBN:", bookIsbn); // Log ISBN for each book

            var bookImg = (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            // Append each book card individually to allow for flexible grid layout
            outputList.innerHTML += formatOutput(bookImg, title, author, publisher, bookIsbn);
        }
    }

    function formatOutput(bookImg, title, author, publisher, bookIsbn) {
        // Only create a view URL if a valid ISBN was found
        var viewUrl = (bookIsbn !== "No ISBN") ? 'book.html?isbn=' + bookIsbn : '#'; // Use '#' if no ISBN
        
        var htmlCard = `
            <div class="col-span-1">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transform transition duration-300 hover:scale-105">
                    <div class="w-full md:w-1/3 p-4 flex justify-center items-center">
                        <img src="${bookImg}" onerror="this.onerror=null;this.src='${placeHldr}';" class="w-full h-48 md:h-full object-contain rounded-md shadow-sm" alt="Book Cover">
                    </div>
                    <div class="w-full md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                            <h5 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">${title}</h5>
                            <p class="text-gray-600 text-sm md:text-base mb-1"><strong>Author:</strong> ${author}</p>
                            <p class="text-gray-600 text-sm md:text-base mb-3"><strong>Publisher:</strong> ${publisher}</p>
                        </div>
                        ${(bookIsbn !== "No ISBN") ? // Conditionally render the button
                            `<a target="_blank" href="${viewUrl}" class="mt-4 self-start bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md">
                                Read Book
                            </a>` :
                            `<span class="mt-4 self-start bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed">
                                No Preview Available
                            </span>`
                        }
                    </div>
                </div>
            </div>
        `;
        return htmlCard;
    }
});
