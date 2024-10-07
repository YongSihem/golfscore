const players = [
    { name: "박두호", scores: Array(18).fill(0) },
    { name: "민경호", scores: Array(18).fill(0) },
    { name: "박병춘", scores: Array(18).fill(0) },
    { name: "양태욱", scores: Array(18).fill(0) },
    { name: "김재형", scores: Array(18).fill(0) },
    { name: "전용선", scores: Array(18).fill(0) },
];

// 페이지 로드 시 점수 복원
document.addEventListener('DOMContentLoaded', () => {
    const storedScores = JSON.parse(localStorage.getItem('golfScores'));
    if (storedScores) {
        players.forEach((player, index) => {
            player.scores = storedScores[index];
            for (let i = 0; i < player.scores.length; i++) {
                document.querySelector(`.score-display[data-hole="${i + 1}"][data-player="${index}"]`).textContent = player.scores[i];
            }
        });
    }
});

// 스코어 업데이트 함수
function updateScore(button, change) {
    const hole = button.dataset.hole;
    const player = button.dataset.player;
    const scoreDisplay = document.querySelector(`.score-display[data-hole="${hole}"][data-player="${player}"]`);

    // 현재 스코어 가져오기
    let currentScore = parseInt(scoreDisplay.textContent);
    currentScore += change;

    // 업데이트된 스코어 표시
    scoreDisplay.textContent = currentScore;

    // 로컬 스토리지에 점수 저장
    saveScores();
}

// 로컬 스토리지에 점수 저장
function saveScores() {
    players.forEach((player, index) => {
        const scores = Array.from(document.querySelectorAll(`.score-display[data-player="${index}"]`)).map(span => parseInt(span.textContent));
        player.scores = scores;
    });
    localStorage.setItem('golfScores', JSON.stringify(players.map(player => player.scores)));
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
    let totalHeader = `<tr><th>플레이어</th><th>총합 점수</th><th>상세</th></tr>`;
    totalResultsTable.innerHTML += totalHeader;
    players.forEach(player => {
        const totalScore = player.scores.reduce((acc, score) => acc + score, 0) + 72; // 최종 점수 계산
        const details = player.scores.reduce((acc, score) => acc + score, 0);
        totalResultsTable.innerHTML += `<tr><td>${player.name}</td><td>${totalScore}</td><td>${details}</td></tr>`;
    });
}

// 결과 버튼 클릭 시 결과 업데이트
document.getElementById('show-results').addEventListener('click', updateResults);
