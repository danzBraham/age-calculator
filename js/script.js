const dayLabel = document.querySelector("#day-label");
const dayInput = document.querySelector("#day-input");
const dayErrorMessage = document.querySelector("#day-error");
const monthLabel = document.querySelector("#month-label");
const monthInput = document.querySelector("#month-input");
const monthErrorMessage = document.querySelector("#month-error");
const yearLabel = document.querySelector("#year-label");
const yearInput = document.querySelector("#year-input");
const yearErrorMessage = document.querySelector("#year-error");
const ageYears = document.querySelector("#age-years");
const ageMonths = document.querySelector("#age-months");
const ageDays = document.querySelector("#age-days");

let day = "";
let month = "";
let year = "";

dayInput.addEventListener("keyup", () => {
  day = dayInput.value;
  if (isNaN(day) || day > 31 || (day.length === 1 && day[0] === "0")) {
    addError(dayLabel, dayInput, dayErrorMessage);
    day = "";
    ageYears.innerText = "--";
    ageMonths.innerText = "--";
    ageDays.innerText = "--";
  } else {
    removeError(dayLabel, dayInput, dayErrorMessage);
    calculateAge(year, month, day);
  }
});

monthInput.addEventListener("keyup", () => {
  month = monthInput.value;
  if (isNaN(month) || month > 12 || (month.length === 1 && month[0] === "0")) {
    addError(monthLabel, monthInput, monthErrorMessage);
    month = "";
  } else {
    removeError(monthLabel, monthInput, monthErrorMessage);
    calculateAge(year, month, day);
  }
});

yearInput.addEventListener("keyup", () => {
  year = yearInput.value;
  const currentYear = new Date().getFullYear();

  if (isNaN(year) || year > currentYear) {
    addError(yearLabel, yearInput, yearErrorMessage);
    year = "";
  } else {
    removeError(yearLabel, yearInput, yearErrorMessage);
    calculateAge(year, month, day);
  }
});

function addError(label, input, message) {
  input.classList.remove("valid:border-green-400");
  input.classList.remove("required:border-yellow-400");
  input.classList.remove("focus:border-violet-400");
  label.classList.add("error");
  input.classList.add("not-valid");
  message.classList.add("pop-error");
}

function removeError(label, input, message) {
  input.classList.add("valid:border-green-400");
  input.classList.add("required:border-yellow-400");
  input.classList.add("focus:border-violet-400");
  label.classList.remove("error");
  input.classList.remove("not-valid");
  message.classList.remove("pop-error");
}

function calculateAge(year, month, day) {
  if (year.length === 4 && month && day) {
    const birthDate = new Date(year, parseInt(month) - 1, day);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // If the birthdate hasn't occurred this year yet, subtract one year
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    // If the day of the month is negative, adjust months and days
    if (days < 0) {
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0,
      ).getDate();
      days += lastDayOfMonth;
      months--;
    }

    if (!isNaN(years) && !isNaN(months) && !isNaN(days)) {
      ageYears.innerText = years;
      ageMonths.innerText = months;
      ageDays.innerText = days;
    }
  }
}
