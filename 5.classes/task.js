class PrintEditionItem {
  constructor(name, releaseDate, pagesCount, state = 100, type = null) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = state;
    this.type = type;
  }
  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }
  get state() {
    return this._state;
  }
  fix() {
    this.state = this.state * 1.5;
  }
}
class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount, state) {
    super(name, releaseDate, pagesCount, state);
    this.type = "magazine";
  }
}
class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount, state) {
    super(name, releaseDate, pagesCount, state);
    this.type = "book";
    this.author = author;
  }
}
class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount, state) {
    super(author, name, releaseDate, pagesCount, state);
    this.type = "novel";
  }
}
class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount, state) {
    super(author, name, releaseDate, pagesCount, state);
    this.type = "fantastic";
  }
}
class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount, state) {
    super(author, name, releaseDate, pagesCount, state);
    this.type = "detective";
  }
}
class Library {
  constructor(name, books = []) {
    this.name = name;
    this.books = books;
  }
  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }
  findBookBy(type, value) {
    let book = this.books.find(book => book[type] === value);
    if (book) {
      return book;
    } else {
      return null;
    }
  }
  giveBookByName(bookName) {
    let bookId = this.books.findIndex(book => book.name === bookName);
    if (bookId === -1) {
      return null;
    } else {
      return this.books.splice(bookId, 1)[0];
    }
  }
}

class Student {
  constructor(name) {
    this.name = name;
    this.subjects = [
      {
        subjectName: "algebra",
        marks: [],
      },
      {
        subjectName: "geometry",
        marks: [],
      },
      {
        subjectName: "history",
        marks: [],
      },
    ];
  }
  #getSubjectByName(subjectName) {
    return this.subjects.find(subject => subject.subjectName === subjectName);
  }
  addMark(mark, subjectName) {
    if (mark < 0 || mark > 5) {
      return;
    }
    let subject = this.#getSubjectByName(subjectName);
    if (subject) {
      subject.marks.push(mark);
    }
  }
  getAverageBySubject(subjectName) {
    let subject = this.#getSubjectByName(subjectName);
    if (subject) {
      return subject.marks.reduce((acc, mark) => acc + mark) / subject.marks.length;
    } else {
      return;
    }
  }
  getAverage() {
    let totalMarks = 0;
    let acc = 0;
    this.subjects.forEach(subject => {
      subject.marks.forEach(mark => {
        acc += mark;
        totalMarks++;
      });
    });
    return acc / totalMarks;
  }
  exclude(reason) {
    this.excluded = reason;
  }
}
