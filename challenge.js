class Library {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.listBooks = [];
  }

  setStorage() {
    if (localStorage.getItem('MyBooks') == null) {
      localStorage.setItem('MyBooks', JSON.stringify(this.listBooks));
    }
  }

  addBook() {
    const book = {
      title: this.title,
      author: this.author,
      id: this.id,
    };
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

const library = new Library();
const addBtn = document.querySelector('#add-btn');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');

function displayBooks() {
  library.listBooks = JSON.parse(localStorage.getItem('MyBooks'));
  if (library.listBooks.length === 0) {
    document.querySelector('.book-list').innerHTML = `
      <div class="book empty">
        <p>The Library is Empty. . . . . </p>
      </div>
    `;
  } else {
    let bookDock = '';
    for (let i = 0; i < library.listBooks.length; i += 1) {
      bookDock += `
      <ul class="book d-flex">
        <li>"${library.listBooks[i].title}" by ${library.listBooks[i].author}</li>
        <button id="remove-btn" class="remove-btn" data-id="${library.listBooks[i].id}" type="button">Remove</button>
      </ul>
      `;
    }
    document.getElementById('book-list').innerHTML = bookDock;
    // eslint-disable-next-line no-use-before-define
    removeBook();
  }
}

function bookAdd() {
  addBtn.addEventListener('click', () => {
    const library = new Library();
    library.title = bookTitle.value;
    library.author = bookAuthor.value;
    library.id = Math.random().toString(16).substr(4, 7);
    library.addBook();
    bookTitle.value = '';
    bookAuthor.value = '';
    displayBooks();
  });
}

function removeBook() {
  const removeBtn = document.querySelectorAll('#remove-btn');
  removeBtn.forEach((remove) => {
    remove.addEventListener('click', () => {
      const ID = remove.dataset.id;
      library.removeBook(ID);
      displayBooks();
    });
  });
}

const showList = document.getElementById('list');
const showAdd = document.getElementById('add');
const showContact = document.getElementById('contact');

const activator = document.querySelectorAll('.togly');
activator.forEach((activi) => {
  activi.addEventListener('click', () => {
    if (activi.dataset.target === 'list') {
      showList.style.display = 'block';
      showAdd.style.display = 'none';
      showContact.style.display = 'none';
    } else if (activi.dataset.target === 'add') {
      showList.style.display = 'none';
      showAdd.style.display = 'block';
      showContact.style.display = 'none';
    } else {
      showList.style.display = 'none';
      showAdd.style.display = 'none';
      showContact.style.display = 'block';
    }
  })
})

window.onload = () => {
  library.setStorage();
  displayBooks();
  bookAdd();
  showList.style.display = 'block';
  showAdd.style.display = 'none';
  showContact.style.display = 'none';
};