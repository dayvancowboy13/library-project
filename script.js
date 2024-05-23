const myLibrary = [];
const dialog = document.querySelector('dialog');
const dialogClose = document.querySelector(".dialog-close");
const dialogAddBook = document.querySelector('.dialog-add-book');
const cardContainer = document.querySelector('.card-container');
const addButton = document.querySelector(".add-book");



addButton.addEventListener('click', () => {
    dialog.showModal();
});
dialogClose.addEventListener('click', () => {
    dialog.close();
});
dialogAddBook.addEventListener('click', () => {
    //submit the information in the forms and close
    addToLibrary();
    //clear existing nodes

    while(cardContainer.childElementCount != 0){
        // console.log(`removing ${cardContainer.firstChild}`);
        cardContainer.removeChild(cardContainer.lastChild)
    }
    myLibrary.forEach(createBookCard);

    dialog.close();
});

addTestBooks();

function addTestBooks(){

const testBook = new Book("Great Title", "Awesome Author",
    250, 'yes');
myLibrary.push(testBook);

const testBook2 = new Book("Great Title2", "Awesome Author",
    250, 'yes');
myLibrary.push(testBook2);

const testBook3 = new Book("Great Title3", "Awesome Author",
    250, 'no');
myLibrary.push(testBook3);
}

// cardContainer.childsNodes

// console.log(myLibrary);

function testReturn(){
    return "this text is cool"
}


function createBookCard(book){
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
        if(readButton.className === "has-read"){
            readButton.className = 'not-read';
            readButton.textContent = "Not read";
        } else {
            readButton.className = 'has-read';
            readButton.textContent = "Read it!"
        }
    });
    

    //create the delete button
    const delButton = document.createElement('button');
    delButton.className = "delete-card";
    delButton.textContent = "-";
    delButton.addEventListener('click', ()=>{
        removeCard(delButton.parentNode);
    })

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readButton);
    bookCard.appendChild(delButton);
    
    // add it to the DOM
    appendToContainer(bookCard);
}

function removeCard(bookCard) {
    console.log(`My library array is length ${myLibrary.length}`);
    let removeCardTitle = bookCard.firstChild.textContent;

    let index = myLibrary.findIndex(x => x.title === removeCardTitle)
    myLibrary.splice(index, 1);
    bookCard.remove();
}

function appendToContainer(bookCard){   
    cardContainer.appendChild(bookCard);
}


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addToLibrary() {
    //processing of the info from the form will happen here
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
            inputPages.value = 0;
        
            myLibrary.push(book);
    }
}
