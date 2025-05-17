const form = document.getElementById('news-form');
const newsInput = document.getElementById('news-input');
const resultDiv = document.getElementById('result');
const historyList = document.getElementById('history');

const AI_PROMPT = "Analyze this news headline and determine whether it's likely to be true or false, citing potential biases and sources.";

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('analysisHistory')) || [];
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Headline: "${item.headline}" - Trustworthiness: ${item.score} - Sources: ${item.sources}`;
        historyList.appendChild(li);
    });
}

function saveToHistory(entry) {
    const history = JSON.parse(localStorage.getItem('analysisHistory')) || [];
    history.unshift(entry);
    if (history.length > 10) {
        history.pop();
    }
    localStorage.setItem('analysisHistory', JSON.stringify(history));
    loadHistory();
}

function analyzeHeadline(headline) {
    // This is a placeholder for actual AI integration
    // For demo, randomly assign a trustworthiness score and sources
    const score = (Math.random() * 100).toFixed(2) + '%';
    const sources = 'Example News Source, Trusted Media';
    const bias = Math.random() > 0.5 ? 'Potential bias detected' : 'No significant bias detected';
    return {
        score: score,
        sources: sources,
        bias: bias,
        analysis: `Analysis for: "${headline}"
Score: ${score}
Sources: ${sources}
Bias: ${bias}`
    };
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const headline = newsInput.value.trim();
    if (!headline) return;

    const analysis = analyzeHeadline(headline);
    resultDiv.innerText = analysis.analysis;

    saveToHistory({
        headline,
        score: analysis.score,
        sources: analysis.sources,
        bias: analysis.bias
    });

    newsInput.value = '';
});

window.onload = () => {
    loadHistory();
};
