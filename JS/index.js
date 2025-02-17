export const createRoot = () => {
    const div = document.createElement('div');
    div.className = 'container';
    div.id = 'listlink';
    div.innerHTML = /*html*/`
    <div class="container">
    <div class="header">
        <img src="https://via.placeholder.com/30" alt="Profile">
        PLΛƆKBIИK
        <span class="theme-toggle" onclick="toggleTheme()">🌙</span>
    </div>
    <div id='nav'>
        <!-- Nav.js -->
    </div>

    <div id='post'>
        <!-- Post.js -->
    </div>

    

    <div id="quoteList">
        <!-- Quote.js -->
    </div>
    
    
        

</div>
    `
    return div;
};
