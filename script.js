const dialog = document.querySelector('dialog');
const dialogClose = document.querySelector(".dialog-close");
const dialogAddBook = document.querySelector('.dialog-add-book');
const cardContainer = document.querySelector('.card-container');
const addButton = document.querySelector(".add-book");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.bookArray = [];
    }

    get books() {
        return this.bookArray;
    }

    addBookToLibrary(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        this.bookArray.push(book);
    }

    removeCard(bookCard) {
        let removeCardTitle = bookCard.firstChild.textContent;
        let index = this.bookArray.findIndex(x => x.title === removeCardTitle)
        this.bookArray.splice(index, 1);
        bookCard.remove();
        console.log(`My book array is now length ${this.bookArray.length}`);
    }

    createBookCard(book) {
        console.log(this.bookArray)
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";

        const title = document.createElement("h1");
        title.textContent = book.title;
        const author = document.createElement("h2");
        author.textContent = book.author;
        const pages = document.createElement("h3");
        pages.textContent = book.pages + " pages";
        const readButton = document.createElement("button");

        if (book.read === 'yes') {
            readButton.textContent = "Read it!"
            readButton.className = "has-read";
        } else {
            readButton.textContent = "Not read";
            readButton.className = "not-read";
        }

        readButton.addEventListener('click', () => {
            let index = this.bookArray.findIndex(x => x.title === book.title)
            if (readButton.className === "has-read") {
                readButton.className = 'not-read';
                readButton.textContent = "Not read";
                this.bookArray[index].read = 'no';
            } else {
                readButton.className = 'has-read';
                readButton.textContent = "Read it!";
                this.bookArray[index].read = 'yes';
            }
        });

        const delButton = document.createElement('button');
        delButton.className = "delete-card";
        delButton.addEventListener('click', () => {
            this.removeCard(delButton.parentNode);
        })


        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readButton);
        bookCard.appendChild(delButton);

        this.appendToContainer(bookCard);
    }

    appendToContainer(bookCard) {
        cardContainer.appendChild(bookCard);
    }

}

const myLibrary = new Library();

// would (probably) also want to put the dom-related code into it's own class, but not today :)

addButton.addEventListener('click', () => {
    dialog.showModal();
});
dialogClose.addEventListener('click', () => {
    dialog.close();
});

const titleInput = document.getElementById('book_title');
const authorInput = document.getElementById('book_author');
const pagesInput = document.getElementById('book_pages');
const readInput = document.getElementById('has_read');
const form = document.querySelector('.new-book-form');

form.addEventListener('submit', function () {
    console.log('submitting')
    myLibrary.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);

    while (cardContainer.childElementCount != 0) {
        cardContainer.removeChild(cardContainer.lastChild)
    }
    myLibrary.books.forEach((book) => myLibrary.createBookCard(book));

    // clear the form inputs
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = null;
});