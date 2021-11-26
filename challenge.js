class Library {
  constructor(title, author, id, listBooks) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.listBooks = listBooks = [];
  }

  setStorage() {
    if(localStorage.getItem('MyBooks') == null) {
      localStorage.setItem('MyBooks', JSON.stringify(this.listBooks));
    }
  }

  addBook() {
    let book = {
      title: this.title,
      author: this.author,
      id: this.id,
    }
    this.setStorage();
    this.listBooks = JSON.parse(localStorage.getItem('MyBooks'));
    this.listBooks.push(book);
    localStorage.setItem('MyBooks', JSON.stringify(this.listBooks));
  }

  removeBook(id) {
    this.setStorage();
    this.listBooks = JSON.parse(localStorage.getItem('MyBooks'));
    this.listBooks = this.listBooks.filter((book) => book.id !== id);
    localStorage.setItem('MyBooks', JSON.stringify(this.listBooks));
  }
}

let library = new Library;
let addBtn = document.querySelector('#add-btn');
let bookTitle = document.querySelector('#title');
let bookAuthor = document.querySelector('#author');

function displayBooks() {
  library.listBooks = JSON.parse(localStorage.getItem('MyBooks'));
  if (library.listBooks.length === 0) {
    document.querySelector('.book-list').innerHTML = `
      <div class="book">
        <p>The Library is Empty.</p>
      </div>
    `;
  } else {
    let bookDock = '';
    for(let i = 0; i < library.listBooks.length; i += 1) {
      bookDock += `
      <ul class="book">
        <li>${library.listBooks[i].title}</li>
        <li>${library.listBooks[i].author}</li>
        <button id="remove-btn" data-id="${library.listBooks[i].id}" type="button">Remove</button>
      </ul>
      `;
    }
    document.getElementById('book-list').innerHTML = bookDock;
    removeBook();
  }
}

function bookAdd() {
  addBtn.addEventListener('click', () => {
    let library = new Library;
    library.title = bookTitle.value;
    library.author = bookAuthor.value;
    library.id = Math.random().toString(16).substr(4,7);
    library.addBook();
    bookTitle.value = '';
    bookAuthor.value = '';
    displayBooks();
  });
}

function removeBook() {
  let removeBtn = document.querySelectorAll('#remove-btn');
  removeBtn.forEach((remove) => {
    remove.addEventListener('click', () => {
      let ID = remove.dataset.id;
      console.log(remove.dataset.id);
      library.removeBook(ID);
      displayBooks();
    });
  });
}

window.onload = () => {
  library.setStorage();
  displayBooks();
  bookAdd();
}