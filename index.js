// Your code here
// Utility function to parse a timestamp into a Date object
// Helper function to validate date format
function isValidDateFormat(dateString) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

// Helper function to validate time format
function isValidTimeFormat(timeString) {
    return /^\d{4}$/.test(timeString);
}

// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from nested arrays
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Function to create a TimeIn event
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    if (!isValidDateFormat(date) || !isValidTimeFormat(time)) {
        throw new Error(`Invalid date or time format: ${dateTimeString}`);
    }
    const hour = parseInt(time, 10);
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date
    });
    return employeeRecord;
}

// Function to create a TimeOut event
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    if (!isValidDateFormat(date) || !isValidTimeFormat(time)) {
        throw new Error(`Invalid date or time format: ${dateTimeString}`);
    }
    const hour = parseInt(time, 10);
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (!timeInEvent || !timeOutEvent) {
        throw new Error(`Missing TimeIn or TimeOut event for date: ${date}`);
    }

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
}

// Function to calculate total wages earned by an employee
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => acc + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((acc, employee) => acc + allWagesFor(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};
