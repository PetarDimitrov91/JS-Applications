import { html,render } from 'https://unpkg.com/lit-html?module';

const thCell = (content) => html`
    <th>${content}</th>`;

const tdCell = (content) => html`
    <td>${content}</td>`;

const tableHeader = (heads) => html`
    <thead>
    <tr>
        ${heads.map(x => thCell(x))}
    </tr>
    </thead>`;

const tableBody = (bodyData) => html`
    <tbody>
    ${bodyData.map(x => html`
        <tr>
            ${tdCell(`${x.firstName} ${x.lastName}`)}
            ${tdCell(x.email)}
            ${tdCell(x.course)}
        </tr>`)}
    </tbody>`

const table = ({ headers, bodyData }) => html`
    <table class="container">
        ${tableHeader(headers)}
        ${tableBody(bodyData)}
        <tfoot>
        <tr>
            <td colspan="3">
                <input type="text" id="searchField"/>
                <button type="button" id="searchBtn">Search</button>
            </td>
        </tr>
        </tfoot>
    </table>`;


async function getData () {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');

   return response.json();
}

const data = await getData();

const tableData = {
   headers: ['Student name', 'Student email', 'Student course',],
   bodyData: Object.values(data)
}

render(table(tableData), document.querySelector('body'));

document.addEventListener('click', e => {
   if (e.target.tagName === 'BUTTON' && e.target.id === 'searchBtn') {
      const input = document.getElementById('searchField');

      if(!input.value.trim()){
         input.value = '';
         return;
      }

      const rows = [...document.getElementsByTagName('tr')].slice(1);

      rows.forEach(x => x.className = '');

      const selectedRows = rows
          .filter(x => x.textContent.toLocaleLowerCase()
              .includes(input.value.toLocaleLowerCase()));

      selectedRows.forEach(x => x.className = 'select');
      input.value = '';
   }
});