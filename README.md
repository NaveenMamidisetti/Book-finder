
Book Finder
A modern and elegant web application for searching and previewing books using the Google Books API.

📚 Project Overview
Book Finder is a simple yet stylish web application that allows users to search for books by title or author. It leverages the Google Books API to fetch book details and provides an embedded viewer to preview available books directly within the application. The user interface is designed to be responsive and visually appealing, featuring a glowing search bar and custom alerts for a smoother user experience.

✨ Features
Book Search: Easily search for books using keywords, titles, or authors.

Google Books API Integration: Fetches comprehensive book data (title, author, publisher, cover image, ISBN) from the Google Books API.

Embedded Book Viewer: Preview books directly within the application using the Google Books Embedded Viewer API.

Elegant & Responsive UI: Built with Tailwind CSS for a clean, modern, and fully responsive design that looks great on all devices.

Glowing Search Bar: A visually striking search input with a subtle pulsating glow effect.

Custom Message Box: Replaces standard browser alert() with a custom, styled modal for a better user experience.

Reliable Navigation: A dedicated "Back to Search" button ensures smooth navigation between the book viewer and search results.

Loading Indicators: Provides visual feedback during API calls and book loading.

Robust ISBN Handling: Intelligently extracts ISBNs (prioritizing ISBN-13) to ensure accurate book previews.

🚀 Technologies Used
HTML5: For the basic structure of the web pages.

CSS3: Custom styles, including animations for the glowing effect.

JavaScript (ES6+): For all interactive functionalities.

jQuery: Simplifies DOM manipulation and AJAX requests.

Tailwind CSS: A utility-first CSS framework for rapid UI development and responsive design.

Google Books API: For fetching book data.

Google Books Embedded Viewer API: For displaying book previews.

📦 Setup and Installation
To get a copy of this project up and running on your local machine, follow these simple steps:

Clone the repository:

Bash

git clone (https://github.com/NaveenMamidisetti/Book-finder)
(Remember to replace YOUR_USERNAME with your actual GitHub username or the repository owner's username.)

Navigate into the project directory:

Bash

cd book-finder
Open index.html:
Simply open the index.html file in your preferred web browser. All necessary libraries (Tailwind CSS, jQuery, Google Books API) are loaded via CDN, so no further installation is required.

📖 Usage
Search for a Book:

On the main page (index.html), enter a book title, author, or keywords into the search bar.

Click the "Search" button.

Search results will appear below the search bar.

Read a Book Preview:

For books that have a preview available, click the "Read Book" button on the book card.

This will open the book.html page, where the Google Books Embedded Viewer will load the book preview.

Navigate Back:

On the book viewer page, click the "← Back to Search" button in the header to return to the search results.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name or bugfix/your-bug-fix).

Make your changes.

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Google Books API for providing the book data and embedded viewer.

Tailwind CSS for simplifying responsive design.

jQuery for DOM manipulation.

Placehold.co for placeholder images.
