const API_URL = 'https://yongsihem.github.io/golfscore/scores';

const players = [
    { name: "박두호", scores: Array(18).fill(0) },
    { name: "민경호", scores: Array(18).fill(0) },
    { name: "박병춘", scores: Array(18).fill(0) },
    { name: "양태욱", scores: Array(18).fill(0) },
    { name: "김재형", scores: Array(18).fill(0) },
    { name: "전용선", scores: Array(18).fill(0) },
];

// 점수 저장 함수
async function saveScores() {
    const scores = players.map(player => player.scores);
    const response = await fetch('http://localhost:5000/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ players: scores })
    });
    return response.json();
}

// 점수 불러오기 함수
async function loadScores() {
    const response = await fetch('http://localhost:5000/api/scores');
    const scores = await response.json();
    return scores;
}

// 페이지 로드 시 점수 복원
document.addEventListener('DOMContentLoaded', async () => {
    const storedScores = await loadScores();
    if (storedScores.length > 0) {
        // 가장 최근의 점수만 로드
        const latestScores = storedScores[storedScores.length - 1].players;
        players.forEach((player, index) => {
            player.scores = latestScores[index];
            for (let i = 0; i < player.scores.length; i++) {
                document.querySelector(`.score-display[data-hole="${i + 1}"][data-player="${index}"]`).textContent = player.scores[i];
            }
        });
    }
});

// 점수 업데이트 함수
function updateScore(button, change) {
    const hole = button.dataset.hole;
    const player = button.dataset.player;
    const scoreDisplay = document.querySelector(`.score-display[data-hole="${hole}"][data-player="${player}"]`);

    // 현재 스코어 가져오기
    let currentScore = parseInt(scoreDisplay.textContent);
    currentScore += change;

    // 업데이트된 스코어 표시
    scoreDisplay.textContent = currentScore;

    // 점수 저장
    saveScores();
}

// 결과 업데이트 함수
function updateResults() {
    const firstHalfResultsTable = document.getElementById('first-half-results');
    const secondHalfResultsTable = document.getElementById('second-half-results');
    const totalResultsTable = document.getElementById('total-results');

    // 테이블 초기화
    firstHalfResultsTable.innerHTML = '';
    secondHalfResultsTable.innerHTML = '';
    totalResultsTable.innerHTML = '';

    // 9홀 중간 집계
    let firstHalfHeader = `<tr><th>플레이어</th><th>점수</th><th>상세</th></tr>`;
    firstHalfResultsTable.innerHTML += firstHalfHeader;
    players.forEach(player => {
        const totalScore = player.scores.slice(0, 9).reduce((acc, score) => acc + score, 0);
        const details = player.scores.slice(0, 9).join(', ');
        firstHalfResultsTable.innerHTML += `<tr><td>${player.name}</td><td>${totalScore}</td><td>${details}</td></tr>`;
    });

    // 18홀 결과 표시
    let secondHalfHeader = `<tr><th>플레이어</th><th>점수</th><th>상세</th></tr>`;
    secondHalfResultsTable.innerHTML += secondHalfHeader;
    players.forEach(player => {
        const totalScore = player.scores.slice(9, 18).reduce((acc, score) => acc + score, 0);
        const details = player.scores.slice(9, 18).join(', ');
        secondHalfResultsTable.innerHTML += `<tr><td>${player.name}</td><td>${totalScore}</td><td>${details}</td></tr>`;
    });

    // 총합 결과 표시
    let totalHeader = `<tr><th>플레이어</th><th>총합 점수</th></tr>`;
    totalResultsTable.innerHTML += totalHeader;

    players.forEach(player => {
        const totalScore = player.scores.reduce((acc, score) => acc + score, 0);
        totalResultsTable.innerHTML += `<tr><td>${player.name}</td><td>${totalScore}</td></tr>`;
    });
}

// 결과 버튼 클릭 시 결과 업데이트
document.getElementById('show-results').addEventListener('click', updateResults);
