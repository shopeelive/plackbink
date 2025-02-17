import { firebaseConfig } from './Firebase.js';
import { createRoot } from './index.js';
import { createNav } from './Nav.js';
import { createPost } from './Post.js';
import { createQuote } from './Quote.js';


const initDb = firebase.initializeApp(firebaseConfig)
const $ = (selector) => document.querySelector(selector);
const database = initDb.database();
const storage = initDb.storage();


const renderQuotes = db => $(`#quoteList`).replaceWith(createQuote(db, renderQuotes));

$(`#root`).replaceWith(createRoot());
$(`#nav`).replaceWith(createNav(renderQuotes));
$(`#post`).replaceWith(createPost(storage, database, renderQuotes));
//$(`#input`).appendChild(createInput(database, renderQuotes));
renderQuotes(database);




console.log(moment.unix(1708000000).fromNow());