document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    var outputList = document.getElementById("list-output");
    var bookurl = "https://www.googleapis.com/books/v1/volumes?q=";
    var placeHldr = 'https://placehold.co/150x200/cccccc/333333?text=No+Image';

    // Get message box elements
    var messageBox = document.getElementById("message-box");
    var messageContent = document.getElementById("message-content");
    var messageCloseButton = document.getElementById("message-close");

    // Get search elements
    var searchButton = document.getElementById("search");
    var searchBox = document.getElementById("search-box");
    var bookListSection = document.querySelector(".book-list");

    // Function to display custom messages
    function showMessage(message) {
        if (messageContent && messageBox) {
            messageContent.textContent = message;
            messageBox.classList.remove("hidden");
        }
    }

    // Function to hide custom messages
    function hideMessage() {
        if (messageBox) {
            messageBox.classList.add("hidden");
        }
    }

    // Event listener for the message box close button
    if (messageCloseButton) {
        messageCloseButton.addEventListener("click", hideMessage);
    }

    // Event listener for search button click
    if (searchButton) {
        searchButton.addEventListener("click", performSearch);
    }

    // Event listener for Enter key in search box
    if (searchBox) {
        searchBox.addEventListener("keypress", function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        if (!outputList) {
            console.error("Output list element not found");
            return;
        }

        outputList.innerHTML = "";
        var searchData = searchBox.value.trim();

        if (searchData === "") {
            showMessage("Please enter a book title to search!");
            return;
        }

        // Show loading state
        outputList.innerHTML = '<div class="loading-message">Loading books...</div>';
        
        if (bookListSection) {
            bookListSection.classList.remove("hidden");
        }

        // Perform AJAX request using fetch API
        fetch(bookurl + encodeURIComponent(searchData))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("API Response:", data);
                if (data.totalItems === 0 || !data.items) {
                    showMessage("No results found for your search! Please try again with different keywords.");
                    outputList.innerHTML = '';
                } else {
                    if (bookListSection) {
                        bookListSection.classList.remove("hidden");
                    }
                    outputList.innerHTML = '';
                    displayResults(data);
                }
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                showMessage("Something went wrong while fetching data! Please try again. (Details: " + error.message + ")");
                outputList.innerHTML = '';
            });

        // Clear the search box
        searchBox.value = "";
    }

    function displayResults(res) {
        if (!res.items || res.items.length === 0) {
            showMessage("No book items found in the response.");
            return;
        }

        for (var i = 0; i < res.items.length; i++) {
            var item = res.items[i];
            if (!item.volumeInfo) {
                console.warn("Skipping item due to missing volumeInfo:", item);
                continue;
            }

            var title = item.volumeInfo.title || "No Title Available";
            var author = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown Author";
            var publisher = item.volumeInfo.publisher || "Unknown Publisher";
            var publishedDate = item.volumeInfo.publishedDate || "Unknown Date";
            
            var bookIsbn = "No ISBN";
            if (item.volumeInfo.industryIdentifiers) {
                for (var j = 0; j < item.volumeInfo.industryIdentifiers.length; j++) {
                    var identifier = item.volumeInfo.industryIdentifiers[j];
                    if (identifier.type === 'ISBN_13') {
                        bookIsbn = identifier.identifier;
                        break;
                    } else if (identifier.type === 'ISBN_10' && bookIsbn === "No ISBN") {
                        bookIsbn = identifier.identifier;
                    }
                }
            }

            var bookImg = (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) ? 
                item.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://') : placeHldr;

            // Create and append book card
            var bookCard = createBookCard(bookImg, title, author, publisher, publishedDate, bookIsbn);
            outputList.appendChild(bookCard);
        }
    }

    function createBookCard(bookImg, title, author, publisher, publishedDate, bookIsbn) {
        var viewUrl = (bookIsbn !== "No ISBN") ? 'book.html?isbn=' + bookIsbn : '#';
        
        var bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        bookCard.innerHTML = `
            <div class="book-card-image">
                <img src="${bookImg}" onerror="this.onerror=null;this.src='${placeHldr}';" alt="Cover of ${title}">
            </div>
            <div class="book-card-content">
                <div>
                    <h4 class="book-card-title">${title}</h4>
                    <div class="book-card-meta">
                        <p><strong>Author:</strong> ${author}</p>
                        <p><strong>Publisher:</strong> ${publisher}</p>
                        <p><strong>Published:</strong> ${publishedDate}</p>
                        <p><strong>ISBN:</strong> ${bookIsbn}</p>
                    </div>
                </div>
                ${(bookIsbn !== "No ISBN") ? 
                    `<a href="${viewUrl}" target="_blank" class="btn btn-primary book-card-button">
                        Read Preview
                    </a>` :
                    `<span class="btn btn-outline book-card-button" style="cursor: not-allowed; opacity: 0.6;">
                        No Preview
                    </span>`
                }
            </div>
        `;
        
        return bookCard;
    }

    // Add some sample books on load for demonstration
    function loadSampleBooks() {
        if (outputList && outputList.children.length === 0) {
            var sampleBooks = [
                {
                    img: 'https://books.google.com/books/content?id=YL8VEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                    title: 'The Great Gatsby',
                    author: 'F. Scott Fitzgerald',
                    publisher: 'Scribner',
                    date: '1925-04-10',
                    isbn: '9780743273565'
                },
                {
                    img: 'https://books.google.com/books/content?id=harZDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                    title: 'To Kill a Mockingbird',
                    author: 'Harper Lee',
                    publisher: 'J.B. Lippincott & Co.',
                    date: '1960-07-11',
                    isbn: '9780061120084'
                }
            ];

            sampleBooks.forEach(book => {
                var bookCard = createBookCard(
                    book.img, 
                    book.title, 
                    book.author, 
                    book.publisher, 
                    book.date, 
                    book.isbn
                );
                outputList.appendChild(bookCard);
            });

            // Show the book list section when samples are loaded
            if (bookListSection) {
                bookListSection.classList.remove("hidden");
            }
        }
    }

    // Load sample books when page loads
    setTimeout(loadSampleBooks, 1000);
});
