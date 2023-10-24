const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const isCompleteInput = document.getElementById('isComplete');
const belumSelesaiDibacaShelf = document.getElementById('belumSelesaiDibacaShelf');
const selesaiDibacaShelf = document.getElementById('selesaiDibacaShelf');

// Load books from localStorage on page load
const books = JSON.parse(localStorage.getItem('books')) || [];

// Function to render books on the shelves
function renderBooks() {
    belumSelesaiDibacaShelf.innerHTML = '';
    selesaiDibacaShelf.innerHTML = '';

    books.forEach((book) => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} by ${book.author} (${book.year})`;
        const moveButton = document.createElement('button');
        moveButton.textContent = book.isComplete ? 'Move to Belum Selesai Dibaca' : 'Move to Selesai Dibaca';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        moveButton.addEventListener('click', () => {
            // Toggle the 'isComplete' property
            book.isComplete = !book.isComplete;
            saveBooks();
            renderBooks();
        });

        deleteButton.addEventListener('click', () => {
            // Remove the book from the array
            const index = books.indexOf(book);
            if (index !== -1) {
                books.splice(index, 1);
                saveBooks();
                renderBooks();
            }
        });

        li.appendChild(moveButton);
        li.appendChild(deleteButton);

        if (book.isComplete) {
            selesaiDibacaShelf.appendChild(li);
        } else {
            belumSelesaiDibacaShelf.appendChild(li);
        }
    });
}

// Function to save books to localStorage
function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Event listener for form submission
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newBook = {
        id: +new Date(), // Unique ID using timestamp
        title: titleInput.value,
        author: authorInput.value,
        year: parseInt(yearInput.value),
        isComplete: isCompleteInput.checked,
    };

    books.push(newBook);
    saveBooks();
    renderBooks();

    // Clear the form inputs
    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
    isCompleteInput.checked = false;
});

renderBooks(); // Initial rendering of books
