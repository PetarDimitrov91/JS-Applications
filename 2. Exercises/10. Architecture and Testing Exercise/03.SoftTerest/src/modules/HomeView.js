import {View} from "./View.js";
import {DashboardView} from "./DashboardView.js";
import {dashboardSection} from "../main.js";

export class HomeView extends View {

    constructor(section) {
        super(section);
    }

    showView() {
        super.showView();
        this.section.querySelector('#startBtn').addEventListener('click', showDashboard)

        function showDashboard(event) {
            event.preventDefault();
            const dashboard = new DashboardView(dashboardSection)
            dashboard.showView();
        }

        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData !== null) {
            [...document.getElementsByClassName('user')].forEach(e => e.style.display = 'inline-block');
            [...document.getElementsByClassName('guest')].forEach(e => e.style.display = 'none');
        } else {
            [...document.getElementsByClassName('guest')].forEach(e => e.style.display = 'inline-block');
            [...document.getElementsByClassName('user')].forEach(e => e.style.display = 'none');
        }
    }
}