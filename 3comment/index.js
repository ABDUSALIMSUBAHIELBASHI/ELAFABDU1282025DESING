// Load data from LocalStorage immediately
let books = JSON.parse(localStorage.getItem('myBookStore')) || [];

const bookList = document.getElementById('bookList');
const bookForm = document.getElementById('bookForm');
const statusMsg = document.getElementById('statusMessage');
const printBtn = document.getElementById('printBtn');

// 1. Show dynamic messages (Success/Delete)
function showFeedback(text, type) {
  statusMsg.textContent = text;
  statusMsg.className = `status-message ${type}`;
  statusMsg.style.display = 'block';
  
  setTimeout(() => {
    statusMsg.style.display = 'none';
  }, 3000);
}

// 2. Render the list to the screen
function renderBooks() {
  bookList.innerHTML = '';
  
  if (books.length === 0) {
    bookList.innerHTML = '<p class="empty-msg">No books added yet.</p>';
  }

  books.forEach(book => {
    const li = document.createElement('li');
    li.className = 'book-item';
    li.innerHTML = `
      <div class="book-info">
        <span class="book-title">${book.title}</span>
        <span class="book-author">by ${book.author}</span>
      </div>
      <button class="btn-delete" onclick="deleteBook(${book.id})">Remove</button>
    `;
    bookList.appendChild(li);
  });

  // Save to LocalStorage
  localStorage.setItem('myBookStore', JSON.stringify(books));
}

// 3. Add a new book
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newBook = {
    id: Date.now(),
    title: document.getElementById('title').value,
    author: document.getElementById('author').value
  };

  books.push(newBook);
  renderBooks();
  bookForm.reset();
  showFeedback("Added to library! ✅", "success");
});

// 4. Delete a book
window.deleteBook = function(id) {
  books = books.filter(book => book.id !== id);
  renderBooks();
  showFeedback("Book removed. 🗑️", "error");
};

// 5. Print Page
printBtn.addEventListener('click', () => {
  window.print();
});

// Initial Load
renderBooks();