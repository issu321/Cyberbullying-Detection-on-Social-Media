/* ================================================
   CYBERSHIELD AI - LIVE DEMO ENGINE
   Client-side mock cyberbullying detection
   Developed by issu321
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    initDemo();
});

// Toxic keyword dictionaries
const TOXIC_KEYWORDS = [
    'stupid', 'idiot', 'loser', 'hate', 'dumb', 'moron', 'pathetic', 'trash',
    'garbage', 'awful', 'terrible', 'worst', 'annoying', 'joke', 'embarrassing',
    'worthless', 'useless', 'disappointing', 'ugly', 'failure', 'hopeless',
    'bad', 'suck', 'hate', 'disgusting', 'pathetic', 'lame', 'cringe',
    'nobody cares', 'shut up', 'go away', 'get lost', 'no talent',
    'waste', 'ruin', 'disaster', 'mess', 'broken', 'buggy'
];

const SEVERE_KEYWORDS = [
    'kill', 'die', 'death', 'suicide', 'murder', 'attack', 'destroy',
    'hurt', 'violence', 'vanish', 'disappear', 'burden', 'waste', 'ruin',
    'ashamed', 'gone', 'forever', 'terrible', 'hope', 'amount',
    'deserve nothing', 'better without', 'happen to you', 'want you gone',
    'never come back', 'fail forever', 'never amount', 'give up',
    'nobody likes', 'nobody wants', 'everyone hates', 'world better',
    'waste of space', 'waste of oxygen', 'should disappear'
];

const POSITIVE_WORDS = [
    'great', 'amazing', 'excellent', 'awesome', 'fantastic', 'wonderful',
    'perfect', 'love', 'like', 'good', 'best', 'brilliant', 'outstanding',
    'superb', 'magnificent', 'beautiful', 'happy', 'joy', 'thanks',
    'appreciate', 'grateful', 'helpful', 'useful', 'informative',
    'congratulations', 'well done', 'good job', 'nice work', 'impressive'
];

const NEGATIVE_WORDS = [
    'hate', 'bad', 'terrible', 'awful', 'worst', 'sad', 'angry', 'mad',
    'frustrated', 'disappointed', 'upset', 'hurt', 'pain', 'cry',
    'depressed', 'anxious', 'worried', 'stressed', 'annoyed', 'irritated'
];

function initDemo() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const demoInput = document.getElementById('demoInput');
    const presetBtns = document.querySelectorAll('.preset-btn');

    if (!analyzeBtn) return;

    analyzeBtn.addEventListener('click', () => analyzeText(demoInput.value));

    clearBtn.addEventListener('click', () => {
        demoInput.value = '';
        document.getElementById('demoResults').classList.add('hidden');
    });

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            demoInput.value = btn.dataset.text;
            analyzeText(btn.dataset.text);
        });
    });

    demoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            analyzeText(demoInput.value);
        }
    });
}

function analyzeText(text) {
    if (!text || !text.trim()) {
        alert('Please enter some text to analyze.');
        return;
    }

    const results = document.getElementById('demoResults');
    results.classList.remove('hidden');

    // Show analyzing state
    const header = document.getElementById('resultHeader');
    const status = document.getElementById('resultStatus');
    header.className = 'result-header';
    status.textContent = 'Analyzing...';

    // Simulate processing delay
    setTimeout(() => {
        const result = performAnalysis(text);
        displayResults(result);
    }, 600);
}

function performAnalysis(text) {
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 0);

    // Count keyword matches
    let toxicScore = 0;
    let severeScore = 0;
    let positiveScore = 0;
    let negativeScore = 0;

    TOXIC_KEYWORDS.forEach(kw => {
        if (lower.includes(kw)) toxicScore += 2;
    });

    SEVERE_KEYWORDS.forEach(kw => {
        if (lower.includes(kw)) severeScore += 3;
    });

    POSITIVE_WORDS.forEach(kw => {
        if (lower.includes(kw)) positiveScore += 1.5;
    });

    NEGATIVE_WORDS.forEach(kw => {
        if (lower.includes(kw)) negativeScore += 1;
    });

    // Base sentiment from word counts
    const totalWords = words.length || 1;
    const intensity = (toxicScore + severeScore + negativeScore - positiveScore) / Math.max(totalWords * 0.3, 1);

    // Calculate raw probabilities
    let safeRaw = Math.max(0, 1 - (toxicScore * 0.15 + severeScore * 0.2));
    let toxicRaw = Math.max(0, toxicScore * 0.2 + intensity * 0.5);
    let severeRaw = Math.max(0, severeScore * 0.25 + intensity * 0.8);

    // Normalize
    const total = safeRaw + toxicRaw + severeRaw;
    if (total > 0) {
        safeRaw /= total;
        toxicRaw /= total;
        severeRaw /= total;
    }

    // Determine label
    let label, confidence;
    if (severeRaw > toxicRaw && severeRaw > safeRaw && severeRaw > 0.25) {
        label = 'severe';
        confidence = severeRaw;
    } else if (toxicRaw > safeRaw && toxicRaw > 0.25) {
        label = 'toxic';
        confidence = toxicRaw;
    } else {
        label = 'safe';
        confidence = safeRaw;
    }

    // Sentiment
    const compound = (positiveScore - negativeScore - toxicScore - severeScore) / Math.max(totalWords, 1);
    let sentiment, emoji;
    if (compound > 0.1) {
        sentiment = 'Positive';
        emoji = '😊';
    } else if (compound < -0.1) {
        sentiment = 'Negative';
        emoji = '😠';
    } else {
        sentiment = 'Neutral';
        emoji = '😐';
    }

    // Generate explanation
    const explanation = generateExplanation(label, confidence, text, toxicScore, severeScore);

    return {
        label,
        confidence: Math.round(confidence * 100),
        probabilities: {
            safe: Math.round(safeRaw * 100),
            toxic: Math.round(toxicRaw * 100),
            severe: Math.round(severeRaw * 100)
        },
        sentiment,
        emoji,
        compound: compound.toFixed(3),
        pos: (positiveScore / totalWords).toFixed(3),
        neg: (negativeScore / totalWords).toFixed(3),
        neu: Math.max(0, 1 - (positiveScore + negativeScore) / totalWords).toFixed(3),
        explanation
    };
}

function generateExplanation(label, confidence, text, toxicScore, severeScore) {
    if (label === 'safe') {
        return `This comment appears safe and non-threatening. The language is neutral or positive with no harmful patterns detected. AI Confidence: ${confidence}%.`;
    }

    const lower = text.toLowerCase();
    const foundToxic = TOXIC_KEYWORDS.filter(kw => lower.includes(kw));
    const foundSevere = SEVERE_KEYWORDS.filter(kw => lower.includes(kw));

    if (label === 'toxic') {
        if (foundToxic.length > 0) {
            const words = foundToxic.slice(0, 3).join("', '");
            return `Mild toxicity detected. The comment contains disrespectful language such as '${words}'. This may hurt others and could escalate conflicts. AI Confidence: ${confidence}%.`;
        }
        return `Mild toxicity detected based on negative sentence structure and sentiment patterns. The tone is dismissive or disrespectful. AI Confidence: ${confidence}%.`;
    }

    if (foundSevere.length > 0) {
        const words = foundSevere.slice(0, 3).join("', '");
        return `Severe cyberbullying alert! The comment contains threatening or deeply harmful language including '${words}'. This indicates serious harassment that requires immediate attention. AI Confidence: ${confidence}%.`;
    }
    return `Severe cyberbullying detected! The comment exhibits highly aggressive patterns and extreme negativity characteristic of serious harassment. AI Confidence: ${confidence}%.`;
}

function displayResults(result) {
    const header = document.getElementById('resultHeader');
    const status = document.getElementById('resultStatus');
    const confBar = document.getElementById('confidenceBar');
    const confValue = document.getElementById('confidenceValue');
    const safeBar = document.getElementById('safeBar');
    const safeValue = document.getElementById('safeValue');
    const toxicBar = document.getElementById('toxicBar');
    const toxicValue = document.getElementById('toxicValue');
    const severeBar = document.getElementById('severeBar');
    const severeValue = document.getElementById('severeValue');
    const explanation = document.getElementById('explanationText');
    const sentimentEmoji = document.getElementById('sentimentEmoji');
    const sentimentLabel = document.getElementById('sentimentLabel');
    const sentimentScores = document.getElementById('sentimentScores');

    // Header
    header.className = `result-header ${result.label}`;
    const icons = { safe: 'fa-shield-halved', toxic: 'fa-triangle-exclamation', severe: 'fa-skull-crossbones' };
    const labels = { safe: 'SAFE CONTENT', toxic: 'MILD TOXICITY DETECTED', severe: 'SEVERE TOXICITY ALERT' };
    const colors = { safe: '#00ff9d', toxic: '#ffaa00', severe: '#ff0055' };

    header.innerHTML = `<i class="fas ${icons[result.label]}"></i> <span>${labels[result.label]}</span>`;

    // Confidence
    confBar.style.width = '0%';
    confBar.style.background = colors[result.label];
    setTimeout(() => { confBar.style.width = result.confidence + '%'; }, 100);
    confValue.textContent = result.confidence + '%';
    confValue.style.color = colors[result.label];

    // Probabilities
    setBar(safeBar, safeValue, result.probabilities.safe);
    setBar(toxicBar, toxicValue, result.probabilities.toxic);
    setBar(severeBar, severeValue, result.probabilities.severe);

    // Explanation
    explanation.textContent = result.explanation;

    // Sentiment
    sentimentEmoji.textContent = result.emoji;
    sentimentLabel.textContent = result.sentiment;
    sentimentLabel.style.color = result.sentiment === 'Positive' ? '#00ff9d' : result.sentiment === 'Negative' ? '#ff0055' : '#ffaa00';
    sentimentScores.innerHTML = `
        <span>Compound: ${result.compound}</span>
        <span>Pos: ${result.pos}</span>
        <span>Neu: ${result.neu}</span>
        <span>Neg: ${result.neg}</span>
    `;
}

function setBar(bar, valueEl, percent) {
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = percent + '%'; }, 100);
    valueEl.textContent = percent + '%';
}
