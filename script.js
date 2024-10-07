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
    localStorage.setItem('golfScores', JSON.stringify(players.map(player => player.scores)));
}

// 결과 업데이트 함수
function updateResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // 이전 결과 초기화

    // 9홀 중간 집계
    const firstHalfResults = players.map(player => {
        const totalScore = player.scores.slice(0, 9).reduce((acc, score) => acc + score, 0);
        return `${player.name}: ${totalScore}타 (1~9홀: ${player.scores.slice(0, 9).join(', ')})`;
    });

    resultsDiv.innerHTML += `<h3>1~9홀 중간 집계</h3><p>${firstHalfResults.join('</p><p>')}</p>`;

    // 18홀 결과 표시
    const secondHalfResults = players.map(player => {
        const totalScore = player.scores.slice(9, 18).reduce((acc, score) => acc + score, 0);
        return `${player.name}: ${totalScore}타 (10~18홀: ${player.scores.slice(9, 18).join(', ')})`;
    });

    resultsDiv.innerHTML += `<h3>10~18홀 결과</h3><p>${secondHalfResults.join('</p><p>')}</p>`;

    // 총합 결과 표시
    const totalResults = players.map(player => {
        const totalScore = player.scores.reduce((acc, score) => acc + score, 0) + 72; // 최종 점수 계산
        return `${player.name}: ${totalScore}타 (총합: ${player.scores.reduce((acc, score) => acc + score, 0)}타)`;
    });

    resultsDiv.innerHTML += `<h3>총합 결과</h3><p>${totalResults.join('</p><p>')}</p>`;
}

// 결과 버튼 클릭 시 결과 업데이트
document.getElementById('show-results').addEventListener('click', updateResults);
