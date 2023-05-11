const library = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    library.push(newBook);
    createBookElement(library.length - 1);
}

function createBookElement(index) {
    const libraryContainer = document.querySelector(".library");
    const newBook = document.createElement("div");

    newBook.classList.add("book");
    newBook.setAttribute("read", library[index].read);

    const bookNameAndAuthorContainer = document.createElement("div");
    const bookName = createBookElementName(library[index].name);
    const bookAuthor = createBookElementAuthor(library[index].author);
    const bookPageCount = createBookElementPageCount(library[index].pages);
    const bookReadIndicator = document.createElement("div");
    const bookSeparator = document.createElement("div");
    const bookMarkAsReadButton = createBookElementButton(library[index].read);

    bookNameAndAuthorContainer.classList.add("book-name-and-author-container");
    bookReadIndicator.classList.add("book-read-indicator");
    bookSeparator.classList.add("book-card-separator");

    bookMarkAsReadButton.addEventListener("click", bookElementRead);

    newBook.appendChild(bookNameAndAuthorContainer);
    bookNameAndAuthorContainer.appendChild(bookName);
    bookNameAndAuthorContainer.appendChild(bookAuthor);
    newBook.appendChild(bookPageCount);
    newBook.appendChild(document.createElement("div"));
    newBook.appendChild(bookReadIndicator);
    newBook.appendChild(bookSeparator);
    newBook.appendChild(bookMarkAsReadButton);

    libraryContainer.appendChild(newBook);
}

function createBookElementName(name) {
    const bookName = document.createElement("h4");
    bookName.classList.add("book-name");
    bookName.textContent = name;
    return bookName;
}

function createBookElementAuthor(author) {
    const bookAuthor = document.createElement("h6");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = author;
    return bookAuthor;
}

function createBookElementPageCount(pages) {
    const bookPageCount = document.createElement("div");
    bookPageCount.classList.add("book-pages");
    bookPageCount.textContent = `${pages} Pages`;
    return bookPageCount;
}

function createBookElementButton(read) {
    const bookMarkAsReadButton = document.createElement("button");
    bookMarkAsReadButton.classList.add("book-mark-as-read");
    bookMarkAsReadButton.textContent = bookElementButtonString(read);
    return bookMarkAsReadButton;
}

function bookElementButtonString(read) {
    if (read) {
        return "Mark book as unread";
    }
    return "Mark book as read";
}

function bookElementRead(e) {
    const read = e.target.parentNode.getAttribute("read");
    if (read === "false") {
        e.target.parentNode.setAttribute("read", "true");
        e.target.textContent = bookElementButtonString(true);
    } else if (read === "true") {
        e.target.parentNode.setAttribute("read", "false");
        e.target.textContent = bookElementButtonString(false);
    }
}

/* Default Books */
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 208, false);
addBookToLibrary("Nineteen Eighty-Four", "George Orwell", 328, true);
addBookToLibrary("Moby-Dick", "Herman Melville", 378, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary(
    "Alice's Adventures in Wonderland",
    "Lewis Carroll",
    104,
    false
);
addBookToLibrary("David Copperfield", "Charles Dickens", 624, true);
addBookToLibrary("Gulliver's Travels", "Jonathan Swift", 352, true);