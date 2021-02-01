const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const TwitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuote = []

//Show Loading Spinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading Spinner
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote form data array
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    console.log(quote);
    //Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {  //! + 變數 => 代表此變數不存在或為空值
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author
    }

    //Check Quote length to determine styling
    if(quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set quote, Hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner()
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https:type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        // console.log(apiQuote);
        newQuote()
    } catch (error) {
        console.log('woops, no quote', error);
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    //_blank 在新視窗打開
    window.open(twitterUrl, '_blank')
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
TwitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
