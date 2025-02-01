let yearDiv, monthDiv, dayDiv, hourDiv, minuteDiv, secondDiv;
let minutes, hours, days, months;
let minuteLabel, hourLabel, dayLabel, monthLabel;
let localTime;
function init() {
    yearDiv = document.getElementById('year');
    monthDiv = document.getElementById('month');
    dayDiv = document.getElementById('day');
    hourDiv = document.getElementById('hour');
    minuteDiv = document.getElementById('minute');
    secondDiv = document.getElementById('second');

    setInterval(updateTime);

    const svg = document.getElementById("clock");

    months = createTicks(svg, 250, 250, 160, 12, 8); // 22개 눈금
    days = createTicks(svg, 250, 250, 130, 10, 22);  // 8개 눈금
    hours = createTicks(svg, 250, 250, 100, 8, 24);  // 24개 눈금
    minutes = createTicks(svg, 250, 250, 70, 6, 60);   // 60개 눈금

    minuteLabel = document.getElementById('minute-label');
    hourLabel = document.getElementById('hour-label');
    dayLabel = document.getElementById('day-label');
    monthLabel = document.getElementById('month-label');

    localTime = document.getElementById('local-time');
}

function updateTime() {
    const now = new Date();

    localTime.textContent = now.toLocaleString();

    let delta;
    if (now >= new Date('2022-10-10T00:00:00')) {
        delta = now - new Date('2009-01-31T00:00:00');
    } else {
        delta = now - new Date('2017-12-25T00:00:00');
    }

    const convert = delta / 1000 / 60 / 60 / 24 + (14 / 24 / 8 / 22);

    const year = Math.floor(convert);
    const month = Math.floor(convert % 1 * 8) + 1;
    const day = Math.floor(convert % 1 * 8 % 1 * 22) + 1;
    const hour = Math.floor(convert % 1 * 8 % 1 * 22 % 1 * 24);
    const minute = Math.floor(convert % 1 * 8 % 1 * 22 % 1 * 24 % 1 * 60);
    const second = Math.floor(convert % 1 * 8 % 1 * 22 % 1 * 24 % 1 * 60 % 1 * 60);

    yearDiv.textContent = year;
    monthDiv.textContent = month;
    dayDiv.textContent = padZero(day);
    hourDiv.textContent = padZero(hour);
    minuteDiv.textContent = padZero(minute);
    secondDiv.textContent = padZero(second);

    minuteLabel.textContent = minute;
    hourLabel.textContent = hour;
    dayLabel.textContent = day;
    monthLabel.textContent = month;

    // rotate hands
    const mathMinute = convert % 1 * 8 % 1 * 22 % 1 * 24 % 1 * 60;
    const mathHour = convert % 1 * 8 % 1 * 22 % 1 * 24;
    const mathDay = convert % 1 * 8 % 1 * 22;
    const mathMonth = convert % 1 * 8;
    minutes.style.transform = `translate(250px, 250px) rotate(${360 / 60 * mathMinute}deg) translate(-250px, -250px)`;
    hours.style.transform = `translate(250px, 250px) rotate(${360 / 24 * mathHour}deg) translate(-250px, -250px)`;
    days.style.transform = `translate(250px, 250px) rotate(${360 / 22 * mathDay}deg) translate(-250px, -250px)`;
    months.style.transform = `translate(250px, 250px) rotate(${360 / 8 * mathMonth}deg) translate(-250px, -250px)`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', init);

function createTicks(svg, centerX, centerY, radius, tickLength, count) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    for (let i = 0; i < count; i++) {
        let angle = (i * (360 / count)) * (Math.PI / 180);
        let x1 = centerX + Math.cos(angle) * (radius - tickLength * (i === 0 ? 2 : 1));
        let y1 = centerY + Math.sin(angle) * (radius - tickLength * (i === 0 ? 2 : 1));
        let x2 = centerX + Math.cos(angle) * radius;
        let y2 = centerY + Math.sin(angle) * radius;

        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "black");
        group.appendChild(line);
    }

    svg.insertBefore(group, svg.firstChild);

    return group;
}