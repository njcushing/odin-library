class Library {
    constructor() {
        this.books = [];
    }

    addBook = (book) => {
        this.books.push(book);
        displayControl.createBook(this.books.length - 1);
    };

    updateBookReadStatus = (index, read) => {
        this.books[index].read = read;
    };

    removeBook = (index) => {
        this.books.splice(index, 1);
        displayControl.updateBooks(index);
    };
}
const library = new Library();

const Book = (name, author, pages, read) => ({
    name,
    author,
    pages,
    read,
});

const displayControl = (() => {
    const newBookButton = document.querySelector(".new-book-button");
    const newBookFormCancelButton = document.querySelector(".new-book-cancel");
    const newBookForm = document.querySelector(".new-book-form");

    const createBook = (index) => {
        const libraryContainer = document.querySelector(".library");
        const newBook = document.createElement("div");

        newBook.classList.add("book");
        newBook.setAttribute("bookIndex", index);
        newBook.setAttribute("read", library.books[index].read);

        const bookNameAndAuthorContainer = document.createElement("div");
        const bookName = _createBookName(library.books[index].name);
        const bookAuthor = _createBookAuthor(library.books[index].author);
        const bookPageCount = _createBookPageCount(library.books[index].pages);
        const bookReadIndicator = document.createElement("div");
        const bookSeparator = document.createElement("div");
        const bookMarkAsReadButton = _createBookButton(
            library.books[index].read
        );
        const bookRemoveButton = _createBookRemoveButton(
            library.books[index].read
        );

        bookNameAndAuthorContainer.classList.add(
            "book-name-and-author-container"
        );
        bookReadIndicator.classList.add("book-read-indicator");
        bookSeparator.classList.add("book-card-separator");

        bookMarkAsReadButton.addEventListener("click", _bookRead);
        bookRemoveButton.addEventListener("click", removeBook);

        newBook.appendChild(bookNameAndAuthorContainer);
        bookNameAndAuthorContainer.appendChild(bookName);
        bookNameAndAuthorContainer.appendChild(bookAuthor);
        newBook.appendChild(bookPageCount);
        newBook.appendChild(document.createElement("div"));
        newBook.appendChild(bookReadIndicator);
        newBook.appendChild(bookSeparator);
        newBook.appendChild(bookMarkAsReadButton);
        newBook.appendChild(bookRemoveButton);

        libraryContainer.appendChild(newBook);
    };

    const _createBookName = (name) => {
        const bookName = document.createElement("h4");
        bookName.classList.add("book-name");
        bookName.textContent = name;
        return bookName;
    };

    const _createBookAuthor = (author) => {
        const bookAuthor = document.createElement("h6");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = author;
        return bookAuthor;
    };

    const _createBookPageCount = (pages) => {
        const bookPageCount = document.createElement("div");
        bookPageCount.classList.add("book-pages");
        bookPageCount.textContent = `${pages} Pages`;
        return bookPageCount;
    };

    const _createBookButton = (read) => {
        const bookMarkAsReadButton = document.createElement("button");
        bookMarkAsReadButton.classList.add("book-mark-as-read");
        bookMarkAsReadButton.textContent = _bookButtonString(read);
        return bookMarkAsReadButton;
    };

    const _createBookRemoveButton = () => {
        const bookRemoveButton = document.createElement("button");
        bookRemoveButton.classList.add("book-remove");
        bookRemoveButton.textContent = "Remove book from library";
        return bookRemoveButton;
    };

    const _bookButtonString = (read) => {
        if (read) {
            return "Mark book as unread";
        }
        return "Mark book as read";
    };

    const _bookRead = (e) => {
        const read = e.target.parentNode.getAttribute("read");
        if (read === "false") {
            e.target.parentNode.setAttribute("read", "true");
            e.target.textContent = _bookButtonString(true);
            library.updateBookReadStatus(
                e.target.parentNode.getAttribute("bookIndex"),
                true
            );
        } else if (read === "true") {
            e.target.parentNode.setAttribute("read", "false");
            e.target.textContent = _bookButtonString(false);
            library.updateBookReadStatus(
                e.target.parentNode.getAttribute("bookIndex"),
                false
            );
        }
    };

    const removeBook = (e) => {
        const index = e.target.parentNode.getAttribute("bookIndex");
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);

        library.removeBook(index);
    };

    const updateBooks = () => {
        const bookElements = document.querySelectorAll(".book");
        let i = 0;
        bookElements.forEach((book) => {
            book.setAttribute("bookIndex", i);
            i++;
        });
    };

    const openNewBookForm = (e) => {
        const newBookParentElement = document.querySelector(
            ".new-book-form-background"
        );
        newBookParentElement.removeAttribute("off");
    };
    newBookButton.addEventListener("click", openNewBookForm);

    const closeNewBookForm = (e) => {
        const newBookParentElement = document.querySelector(
            ".new-book-form-background"
        );
        newBookParentElement.setAttribute("off", "");
        resetNewBookFormFields();
    };
    newBookFormCancelButton.addEventListener("click", closeNewBookForm);

    const resetNewBookFormFields = () => {
        newBookForm.reset();
    };

    function _createNewBookFromForm(e) {
        e.preventDefault(); /* Prevents the page from refreshing when the form is submitted */
        const formData = Object.fromEntries(new FormData(e.target).entries());
        const bookRead = !!formData.bookRead;
        library.addBook(
            Book(
                formData.bookName,
                formData.bookAuthor,
                formData.bookPageCount,
                bookRead
            )
        );
        closeNewBookForm();
    }
    newBookForm.addEventListener("submit", _createNewBookFromForm);

    return {
        createBook,
        removeBook,
        updateBooks,
        openNewBookForm,
        closeNewBookForm,
        resetNewBookFormFields,
    };
})();

/* Default Books */
library.addBook(Book("The Great Gatsby", "F. Scott Fitzgerald", 208, false));
library.addBook(Book("Nineteen Eighty-Four", "George Orwell", 328, true));
library.addBook(Book("Moby-Dick", "Herman Melville", 378, true));
library.addBook(Book("To Kill a Mockingbird", "Harper Lee", 281, false));
library.addBook(
    Book("Alice's Adventures in Wonderland", "Lewis Carroll", 104, false)
);
library.addBook(Book("David Copperfield", "Charles Dickens", 624, true));
library.addBook(Book("Gulliver's Travels", "Jonathan Swift", 352, true));
