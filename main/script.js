$(document).ready(function() {
    var outputList = document.getElementById("list-output");
    var bookurl = "https://www.googleapis.com/books/v1/volumes?q=";
    var placeHldr = '<img src="https://via.placeholder.com/150">';
    var searchData;
  
    $("#search").click(function() {
        outputList.innerHTML = "";
        searchData = $("#search-box").val();
        if (searchData === "" || searchData === null) {
            displayError();
        } else {
            $.ajax({
                url: bookurl + searchData,
                dataType: "json",
                success: function(response) {
                    console.log(response);
                    if (response.totalItems === 0) {
                        alert("No results! Please try again.");
                    } else {
                        $("title").css('margin-top', '10px');
                        $(".book-list").css('visibility', 'visible');
                        displayResults(response);
                    }
                },
                error: function() {
                    alert("Something went wrong! Please try again.");
                }
            });
        }
        $("#search-box").val("");
    });
  
    function displayResults(res){
        for(var i = 0; i < res.items.length; i+=2) {
            var item = res.items[i];
            var title1 = item.volumeInfo.title;
            var author1 = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown Author";
            var publisher1 = item.volumeInfo.publisher ? item.volumeInfo.publisher : "Unknown Publisher";
            var bookIsbn1 = item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers[1].identifier : "No ISBN";
            var bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;
  
            var item2 = res.items[i+1];
            var title2 = item2.volumeInfo.title;
            var author2 = item2.volumeInfo.authors ? item2.volumeInfo.authors.join(", ") : "Unknown Author";
            var publisher2 = item2.volumeInfo.publisher ? item2.volumeInfo.publisher : "Unknown Publisher";
            var bookIsbn2 = item2.volumeInfo.industryIdentifiers ? item2.volumeInfo.industryIdentifiers[1].identifier : "No ISBN";
            var bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;
  
            outputList.innerHTML += '<div class="row mt-4">' +
                                        formatOutput(bookImg1, title1, author1, publisher1, bookIsbn1) +
                                        formatOutput(bookImg2, title2, author2, publisher2, bookIsbn2) +
                                    '</div>';
        }
    }
  
    function formatOutput(bookImg, title, author, publisher, bookIsbn) {
        var viewUrl = 'book.html?isbn=' + bookIsbn;
        var htmlCard = `<div class="col-lg-6">
                            <div class="card" style="">
                                <div class= "row no-gutters">
                                    <div class="col-md-4">
                                        <img src="${bookImg}" class="card-img" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${title}</h5>
                                            <p class="card-text">Author: ${author}</p>
                                            <p class="card-text">Publisher: ${publisher}</p>
                                            <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>`;
        return htmlCard;
    }
  });
