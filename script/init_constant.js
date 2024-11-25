export class Names {
    constructor() {
        this.FIRST_DAY_NAME = document.querySelector('#first-day .name');
        this.SECOND_DAY_NAME = document.querySelector('#second-day .name');
        this.THIRD_DAY_NAME = document.querySelector('#third-day .name');
        this.FOURTH_DAY_NAME = document.querySelector('#fourth-day .name');
        this.FIFTH_DAY_NAME = document.querySelector('#fifth-day .name');
    }
}

export class Icons {
    constructor() {
        this.FIRST_DAY_ICON = document.querySelector('#first-day .icon');
        this.SECOND_DAY_ICON = document.querySelector('#second-day .icon');
        this.THIRD_DAY_ICON = document.querySelector('#third-day .icon');
        this.FOURTH_DAY_ICON = document.querySelector('#fourth-day .icon');
        this.FIFTH_DAY_ICON = document.querySelector('#fifth-day .icon');
    }

    setIcon(index, value) {
        if (index == 0) {
            this.FIRST_DAY_ICON.innerText = `${value < 3 ? `☀️` : value < 4 ? `🌤️` : `☁️`}`
        }
        else if (index == 1) {
            this.SECOND_DAY_ICON.innerText = `${value < 3 ? `☀️` : value < 4 ? `🌤️` : `☁️`}`
        }
        else if (index == 2) {
            this.THIRD_DAY_ICON.innerText = `${value < 3 ? `☀️` : value < 4 ? `🌤️` : `☁️`}`
        }
        else if (index == 3) {
            this.FOURTH_DAY_ICON.innerText = `${value < 3 ? `☀️` : value < 4 ? `🌤️` : `☁️`}`
        }
        else if (index == 4) {
            this.FIFTH_DAY_ICON.innerText = `${value < 3 ? `☀️` : value < 4 ? `🌤️` : `☁️`}`
        }
    }

    setRainIcon(index, value) {
        if (index == 0) {
            this.FIRST_DAY_ICON.innerText = `${value < 3 ? `🌧️` : value < 4 ? `☃️` : `🌦️`}`
        }
        else if (index == 1) {
            this.SECOND_DAY_ICON.innerText = `${value < 3 ? `🌧️` : value < 4 ? `☃️` : `🌦️`}`
        }
        else if (index == 2) {
            this.THIRD_DAY_ICON.innerText = `${value < 3 ? `🌧️` : value < 4 ? `☃️` : `🌦️`}`
        }
        else if (index == 3) {
            this.FOURTH_DAY_ICON.innerText = `${value < 3 ? `🌧️` : value < 4 ? `☃️` : `🌦️`}`
        }
        else if (index == 4) {
            this.FIFTH_DAY_ICON.innerText = `${value < 3 ? `🌧️` : value < 4 ? `☃️` : `🌦️`}`
        }
    }
}

export class Temps {
    constructor() {
        this.FIRST_DAY_TEMP = document.querySelector('#first-day .temp');
        this.SECOND_DAY_TEMP = document.querySelector('#second-day .temp');
        this.THIRD_DAY_TEMP = document.querySelector('#third-day .temp');
        this.FOURTH_DAY_TEMP = document.querySelector('#fourth-day .temp');
        this.FIFTH_DAY_TEMP = document.querySelector('#fifth-day .temp');
    }

    setTemp(index, value) {
        if (index == 0) {
            this.FIRST_DAY_TEMP.innerText = `${value}°C`
        }
        else if (index == 1) {
            this.SECOND_DAY_TEMP.innerText = `${value}°C`
        }
        else if (index == 2) {
            this.THIRD_DAY_TEMP.innerText = `${value}°C`
        }
        else if (index == 3) {
            this.FOURTH_DAY_TEMP.innerText = `${value}°C`
        }
        else if (index == 4) {
            this.FIFTH_DAY_TEMP.innerText = `${value}°C`
        }
    }
}

export class Days {
    constructor() {
        this.FIRST_DAY_NAME = document.querySelector('#first-day .name');
        this.SECOND_DAY_NAME = document.querySelector('#second-day .name');
        this.THIRD_DAY_NAME = document.querySelector('#third-day .name');
        this.FOURTH_DAY_NAME = document.querySelector('#fourth-day .name');
        this.FIFTH_DAY_NAME = document.querySelector('#fifth-day .name');
    }
    setDays(days) {
        this.FIRST_DAY_NAME.innerText = this.getDayByDateObj(days[0]);
        this.SECOND_DAY_NAME.innerText = this.getDayByDateObj(days[1]);
        this.THIRD_DAY_NAME.innerText = this.getDayByDateObj(days[2]);
        this.FOURTH_DAY_NAME.innerText = this.getDayByDateObj(days[3]);
        this.FIFTH_DAY_NAME.innerText = this.getDayByDateObj(days[4]);
    }

    getDayByDateObj(date) {
        switch (date.getDay()) {
            case 0:
                return `Sun`;
            case 1:
                return `Mon`;
            case 2:
                return `Tue`;
            case 3:
                return `Wed`;
            case 4:
                return `Thu`;
            case 5:
                return `Fri`;
            case 6:
                return `Sat`;
        }
    }
}