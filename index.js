console.log("its all about the practice");





class Book {
    constructor(name, authorName, type) {
        this.bookName = name;
        this.authorName = authorName;
        this.type = type;
    }
}

class Display {

    valid(book) {
        if (book.bookName.length > 2 && book.authorName.length > 2) {
            return true;
        } else {
            return false;
        }
    }
    success() {
        let alert = document.getElementById("alert");
        let html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>SuccessFully Added!</strong> Your Book Successfully added
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
        alert.innerHTML = html;
        setTimeout(function () {
            alert.innerHTML = "";
        }, 5000)
    }
    danger(text , message) {
        let alert = document.getElementById("alert");
        let html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>${text}</strong> ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
        alert.innerHTML = html;
        setTimeout(function () {
            alert.innerHTML = "";
        }, 5000)
    }
    empty() {
        let alert = document.getElementById("alert");
        let html = `<div class="alert alert-info alert-dismissible fade show" role="alert">
                        <strong>Sorry !</strong> No book Available in database!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
        alert.innerHTML = html;
        setTimeout(function () {
            alert.innerHTML = "";
        }, 5000)
    }
    
    clear() {
        document.getElementById("bookName").value = "";
        document.getElementById("authorName").value = "";

    }
    showBook() {
        let book = localStorage.getItem("book");
        if (book == null) {
            this.empty();
        } else {
            let tBody = document.getElementById("tBody");
            let html = "";
            let bookArray = JSON.parse(book);
            // console.log(bookArray);
            Array.from(bookArray).forEach(function (book, index) {
                html += `<tr>
                    <td>${book.bookName}</td>
                    <td>${book.authorName}</td>
                    <td>${book.type}</td>
                    <td><button class="btn-sm btn-danger" id =${index} onclick="deleteBook(this.id)">delete</button></td>
                </tr>`
            });
            tBody.innerHTML = html;

        }

    }
}

function deleteBook(index) {

    let books = localStorage.getItem("book");
    let bookArray = JSON.parse(books);
    bookArray.splice(index, 1);
    localStorage.setItem("book", JSON.stringify(bookArray));
    displayBook.showBook();
}

let displayBook = new Display();
displayBook.showBook();


document.getElementById("form").addEventListener("submit", function (e) {


    let bName = document.getElementById("bookName").value;
    let aName = document.getElementById("authorName").value;
    let computer = document.getElementById("computer");
    let electrical = document.getElementById("electrical");
    let mechanical = document.getElementById("mechanical");

    let type;
    if (computer.checked) {
        type = computer.value;
    } else if (electrical.checked) {
        type = electrical.value;
    } else if (mechanical.checked) {
        type = mechanical.value;
    }

    let book = new Book(bName, aName, type);


    if (displayBook.valid(book)) {
        let books = localStorage.getItem("book");
        if (books == null) {
            bookArray = [];
        } else {
            bookArray = JSON.parse(books);
            console.log(bookArray)
        }
        bookArray.push(book);
        localStorage.setItem("book", JSON.stringify(bookArray))
        displayBook.success();

        displayBook.showBook();
        displayBook.clear();
    } else {
        displayBook.danger("Error !" , " Please checked Added info!");
    }
    e.preventDefault();

});


document.getElementById("search").addEventListener("input", function (e) {

    let text = e.target.value.toLowerCase();



    let book = localStorage.getItem("book");
    if (book == null) {
        displayBook.empty();
    } else {
        let tBody = document.getElementById("tBody");
        let html = "";
        let bookArray = JSON.parse(book);
        // console.log(bookArray);
        Array.from(bookArray).forEach(function (book, index) {
            if (book.bookName.toLowerCase().includes(text) || book.authorName.toLowerCase().includes(text) || book.type.toLowerCase().includes(text)) {
                html += `<tr>
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.type}</td>
                <td><button class="btn-sm btn-danger" id =${index} onclick="deleteBook(this.id)">delete</button></td>
            </tr>`
            }
            else{
                html += "";
                // console.log(html);
            }
        });
        if(html.length!=0)
        {
            tBody.innerHTML = html;
        }
        else{
            displayBook.danger("No Result Found" , "sorry, we cant find search result.")
            tBody.innerHTML = "";
        }
    }



// console.log(text);

});