function reverseString(str) {
    var reversedString = str.split("").reverse().join("");
    return reversedString;
  }
  
  function isThisPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
  }
  
  function convertToString(date) {
    var DateAsString = { day: "", month: "", year: "" }
  
    if (date.day < 10) {
      DateAsString.day = "0" + date.day;
    } else {
      DateAsString.day = date.day.toString();
    }
  
    if (date.month < 10) {
      DateAsString.month = "0" + date.month;
    } else {
      DateAsString.month = date.month.toString();
    }
  
    DateAsString.year = date.year.toString();
  
    return DateAsString;
  }
  
  function allDateFormats(date) {
    var dateStr = convertToString(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  
  function checkAllFormatsForPalindrome(date) {
    var listOfFormats = allDateFormats(date);
    var checker = false;
  
    for (let i = 0; i < listOfFormats.length; i++) {
      if (isThisPalindrome(listOfFormats[i])) {
        checker = true;
        break;
      }
    }
    return checker;
  }
  
  function isLeapYear(year) {
  
    if (year % 400 === 0) {
      return true;
    }
  
    if (year % 100 === 0) {
      return false;
    }
  
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    if (month == 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonths[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);
  
    while (1) {
      counter++;
      if (checkAllFormatsForPalindrome(nextDate)) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
  
    return [counter, nextDate];
  }
  
  function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    if (day === 0) {
      month--;
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonths[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year,
    }
  }
  
  function getPreviousPalindromeDate(date) {
    var counter2 = 0;
    var previousDate = getPreviousDate(date);
  
    while (1) {
      counter2++;
      if (checkAllFormatsForPalindrome(previousDate)) {
        break;
      }
      previousDate = getPreviousDate(previousDate);
    }
  
    return [counter2, previousDate];
  }
  
  var inputDate = document.querySelector("#input-date");
  var btnCheck = document.querySelector("#btn-check");
  var outputBox = document.querySelector("#output");
  
  function showMessage(msg) {
    outputBox.innerText = msg;
  }
  
  
  function clickEventHandler() {
    console.log(inputDate.value);
    var input = inputDate.value;
  
    if (input !== "") {
      var dateArray = input.split("-");
  
      var date = {
        day: Number(dateArray[2]),
        month: Number(dateArray[1]),
        year: Number(dateArray[0])
      };
  
      var isPalindrome = checkAllFormatsForPalindrome(date);
  
      if (isPalindrome) {
        showMessage("Yay! your Birthday is a Palindrome!!")
      } else {
        var [counter, nextDate] = getNextPalindromeDate(date);
        var [counter2, previousDate] = getPreviousPalindromeDate(date);
  
        var upcomingPalindromeDate = convertToString(nextDate);
        var passedPalindromeDate = convertToString(previousDate);
  
        if (counter < counter2) {
          showMessage(`The nearest palindrome is on ${upcomingPalindromeDate.day}-${upcomingPalindromeDate.month}-${upcomingPalindromeDate.year}, you missed it by ${counter} days`)
        } else {
          showMessage(`The nearest palindrome is on ${passedPalindromeDate.day}-${passedPalindromeDate.month}-${passedPalindromeDate.year}, you missed it by ${counter2} days`);
        }
  
      }
    } else {
      showMessage("Please enter a date.")
    }
  }
  
  btnCheck.addEventListener("click", clickEventHandler);
  
  var date2 = {
    day: 1,
    month: 3,
    year: 2022
  }
  
  
  console.log(getPreviousPalindromeDate(date2));
  
  