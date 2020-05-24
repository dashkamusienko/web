class Person {
  constructor(newName, newSurname, newGender, newBirthday) {
    this.name = newName;
    this.surname = newSurname;
    this.gender = newGender;
    this.birthday = newBirthday;
  }

  set gender(newGender) {
    if (this.isGenderValid(newGender)) {
      this._gender = newGender;
    }
    else {
      console.log("Error");
      this._gender = 'M';
    }
  }

  set birthday(newBirthday) {
    if (this.isDateValid(newBirthday)) {
      this._birthday = newBirthday;
    }
    else {
      console.log("Error date format.");
      this._birthday = "1/1/1970";
    }
  }

  getCode() {
    return (this.codeFromSurname() + this.codeFromName()
      + this.codeFromBirthDate()).toUpperCase();
  }

  codeFromName() {
    let letters = this.separateLetters(this.name);
    let vowels = letters.get("vowels"), consonants = letters.get("Consonants");
    if (consonants.length > 3)
      consonants.splice(1, 1);
    return this.codeFromNames(vowels, consonants);
  }

  codeFromSurname() {
    let letters = this.separateLetters(this.surname);
    return this.codeFromNames(letters.get("vowels"),
      letters.get("Consonants"));
  }


  codeFromBirthDate() {
    const months = {
      1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
      7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"
    };
    let date = this.parseDate(this._birthday);
    let yearCode = date[2] % 100;
    yearCode = yearCode < 10 ? '0' + yearCode : yearCode;
    let dayCode = this._gender === "F" ? date[0] + 40 : date[0];
    dayCode = dayCode < 10 ? '0' + dayCode : dayCode;
    return yearCode + months[date[1]] + dayCode;
  }

  codeFromNames(vowels, consonants) {
    let code = '';

    for (let i = 0, j = 0; code.length < 3;)
      if (typeof consonants[i] !== 'undefined')
        code += consonants[i++];
      else if (typeof vowels[j] !== 'undefined')
        code += vowels[j++];
      else
        code += "X";
    return code;
  }

  separateLetters(to_separate) {
    let vowels = [];
    let consonants = [];
    for (let i = 0; i < to_separate.length; i++) {
      let char = to_separate.charAt(i);
      if (this.isVowel(char)) {
        vowels.push(char);
      } else {
        consonants.push(char);
      }
    }
    let letters = new Map();
    letters.set("vowels", vowels);
    letters.set("Consonants", consonants);
    return letters;
  }

  isVowel(char) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(char.toLowerCase()) !== -1;
  }

  parseDate(strDate) {
    const parsedDate = strDate.split("/").map(function (value) {
      return parseInt(value, 10);
    })
    return parsedDate;
  }

  isDateValid(dateToCheck) {
    const parsedDate = this.parseDate(dateToCheck);
    return !(parsedDate.length !== 3 || !this.checkDate(parsedDate[0], parsedDate[1], parsedDate[2]));
  }

  checkDate(day, month, year) {
    if (year < 0) {
      return false;
    }
    else if ((month < 1) || (month > 12)) {
      return false;
    }
    else if ((month == 1 || month == 3 || month == 5 || month == 7 ||
      month == 8 || month == 10 || month == 12) && (day > 31 || day < 1)) {
      return false;
    }
    else if ((month == 4 || month == 6 || month == 9 || month == 11)
      && (day > 30 || day < 1)) {
      return false;
    }
    else if ((month == 2) && (day > ((year % 4 != 0
      || (year % 100 == 0 && year % 400 != 0) ? 28 : 29) || day < 1))) {
      return false;
    }
    return true;
  }

  isGenderValid(gender) {
    return gender === "F" || gender === "M";
  }
}

function send() {
  let p = new Person(document.getElementById('name').value,
                      document.getElementById('surname').value,
                      document.getElementById('gender').value,
                      document.getElementById('birthday').value);
  document.getElementById('out').innerHTML = p.getCode();
}