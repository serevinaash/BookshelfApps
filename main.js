const storageKey = "STORAGE_KEY";

const formAddBook = document.getElementById("pushBook");
const formSearchBook = document.getElementById("searchBook");

function CheckForStorage() {
    return typeof Storage !== "undefined";
}

formAddBook.addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah formulir mengirimkan permintaan HTTP

    const title = document.getElementById("BookTitle").value;
    const author = document.getElementById("BookAuthor").value;
    const year = parseInt(document.getElementById("BookYear").value);
    const isComplete = document.getElementById("BookIsComplete").value;

    const idTemp = document.getElementById("inputBookTitle").value; // Mengganti .name menjadi .value
    if (idTemp !== "") {
        const bookData = GetBookList();
        for (let index = 0; index < bookData.length; index++) {
            if (bookData[index].id == idTemp) {
                bookData[index].title = title;
                bookData[index].author = author;
                bookData[index].year = year;
                bookData[index].isComplete = isComplete;
            }
        }
        localStorage.setItem(storageKey, JSON.stringify(bookData));
        ResetAllForm();
        RenderBookList(bookData);
        return;
    }

    const id = JSON.parse(localStorage.getItem(storageKey)) === null ? 0 + Date.now() : JSON.parse(localStorage.getItem(storageKey)).length + Date.now();
    const newBook = {
      id: id,
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };
   
  PutBookList(newBook);

  const bookData = GetBookList();
  RenderBookList(bookData);
});

function PutBookList(data) {
    if (CheckForStorage()) {
      let bookData = [];
  
      if (localStorage.getItem(storageKey) !== null) {
        bookData = JSON.parse(localStorage.getItem(storageKey));
      }
  
      bookData.push(data);
      localStorage.setItem(storageKey, JSON.stringify(bookData));
    }
  }


  function RenderBookList(bookData) {
    if (bookData === null) {
      return;
    }
  
    const containerIncomplete = document.getElementById("incompleteBookshelfList");
    const containerComplete = document.getElementById("completeBookshelfList");
  
    containerIncomplete.innerHTML = "";
    containerComplete.innerHTML = "";
    for (let book of bookData) {
      const id = book.id;
      const title = book.title;
      const author = book.author;
      const year = book.year;
      const isComplete = book.isComplete;
  
      //create isi item
      let bookItem = document.createElement("article");
      bookItem.classList.add("book_item", "select_item");
      bookItem.innerHTML = "<h3 name = " + id + ">" + title + "</h3>";
      bookItem.innerHTML += "<p>Penulis: " + author + "</p>";
      bookItem.innerHTML += "<p>Tahun: " + year + "</p>";
  
      //container action item
      let containerActionItem = document.createElement("div");
      containerActionItem.classList.add("action");
  
      //green button
      const greenButton = CreateGreenButton(book, function (event) {
        isCompleteBookHandler(event.target.parentElement.parentElement);
  
        const bookData = GetBookList();
        ResetAllForm();
        RenderBookList(bookData);
      });
  
      //red button
      const redButton = CreateRedButton(function (event) {
        DeleteAnItem(event.target.parentElement.parentElement);
  
        const bookData = GetBookList();
        ResetAllForm();
        RenderBookList(bookData);
      });
  
      containerActionItem.append(greenButton, redButton);
  
      bookItem.append(containerActionItem);
  
      //incomplete book
      if (isComplete === false) {
        containerIncomplete.append(bookItem);
        bookItem.childNodes[0].addEventListener("click", function (event) {
          UpdateAnItem(event.target.parentElement);
        });
  
        continue;
      }
  
      //complete book
      containerComplete.append(bookItem);
  
      bookItem.childNodes[0].addEventListener("click", function (event) {
        UpdateAnItem(event.target.parentElement);
      });
    }
  }
  
    
    



