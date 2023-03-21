import { doc } from "prettier";

export default class Alert {
    constructor() {
        this.url = '/json/alerts.json';
    }

    async fetchData () {
        const response = await fetch(this.url);
        if(response.ok) {
        let data = await response.json();
        return data;
        }}

    async messageToDisplay () {
        const message = await this.fetchData();
       
        for (let i=0; i < message.length; i++) {
            
            const alert = document.createElement('section');
            alert.classList.add('alert-list');
                   
            alert.innerHTML = message[i].message;
            //section.className = "show";
            alert.style.background = message[i].background;
            alert.style.color = message[i].color;
            // setTimeout(function () {
            //   section.className = section.className.replace("show", "");
            // }, 3000); // After 3 seconds, remove the show class from DIV
            
            const main = document.querySelector('.announcements');
            main.prepend(alert);
            }
    }
 
}

