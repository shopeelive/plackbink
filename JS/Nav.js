export const createNav = (renderQuotes) => {
    const div = document.createElement('div');
    const $ = (selector) => div.querySelector(selector);

    div.className = 'nav';
    div.innerHTML = /*html*/`
        <a id = 'list'>🏠</a>
        <a href="#">@</a>
        <a href="#">#</a>
        <a href="#">⋮</a>
    `;

    $('#list').addEventListener('click', () => console.log(renderQuotes));
    //$('#delete-button').addEventListener('click', () => deleteQuote(quoteId, $('#delete-button')));

    return div;
};
