const dialog = document.querySelector('dialog');
const dialogClose = document.querySelector(".dialog-close");
const dialogAddBook = document.querySelector('.dialog-add-book');
const cardContainer = document.querySelector('.card-container');
const addButton = document.querySelector(".add-book");

class Book {
    constructor (title,author,pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library{
    constructor(){
        this.bookArray = [];    
    }

    get books(){
        return this.bookArray;
    }

    addBookToLibrary(){

        const inputTitle = document.querySelector('#book_title');
        console.log(inputTitle.value.length)
        const inputAuthor = document.querySelector('#book_author');
        const inputPages = document.querySelector('#book_pages');
        console.log(inputPages.value.length);
        const inputRead = document.querySelector('#has_read');

        if(inputTitle.value.length === 0 ||
            inputAuthor.value.length === 0 ||
            inputPages.value.length === 0) {
                alert("Please enter value input!")
        } else {
            const book = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.value);
            
                inputTitle.value = '';
                inputAuthor.value = '';
                inputPages.value = null;
            
                this.bookArray.push(book);
        }
    }

    createBookCard(book){
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
    
        const title = document.createElement("h1");
        title.textContent = book.title;
        const author = document.createElement("h2");
        author.textContent = book.author;
        const pages = document.createElement("h3");
        pages.textContent = book.pages + " pages";
        const readButton = document.createElement("button");
    
        if(book.read === 'yes'){
            readButton.textContent = "Read it!"
            readButton.className = "has-read";
        } else {
            readButton.textContent = "Not read";
            readButton.className = "not-read";
        }
    
        readButton.addEventListener('click', ()=>{
            let index = this.bookArray.findIndex(x => x.title === book.title)
            if(readButton.className === "has-read"){
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
        delButton.addEventListener('click', ()=>{
            this.removeCard(delButton.parentNode);
        })
        
    
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readButton);
        bookCard.appendChild(delButton);
        
        appendToContainer(bookCard);
    }

    removeCard(bookCard) {
        console.log(`My library array is length ${myLibrary.length}`);
        let removeCardTitle = bookCard.firstChild.textContent;
    
        let index = myLibrary.findIndex(x => x.title === removeCardTitle)
        myLibrary.splice(index, 1);
        bookCard.remove();
    }
    // addToContainer()
}

const myLibrary = new Library();

addButton.addEventListener('click', () => {
    dialog.showModal();
});
dialogClose.addEventListener('click', () => {
    dialog.close();
});
dialogAddBook.addEventListener('click', () => {
    myLibrary.addBookToLibrary();

    while(cardContainer.childElementCount != 0){
        cardContainer.removeChild(cardContainer.lastChild)
    }
    myLibrary.bookArray.forEach(myLibrary.createBookCard);

    dialog.close();
});

function appendToContainer(bookCard){   
    cardContainer.appendChild(bookCard);
}
