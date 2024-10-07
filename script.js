let players = [
    { name: "박두호", scores: Array(18).fill(0) },
    { name: "민경호", scores: Array(18).fill(0) },
    { name: "박병춘", scores: Array(18).fill(0) },
    { name: "양태욱", scores: Array(18).fill(0) },
    { name: "김재형", scores: Array(18).fill(0) },
    { name: "전용선", scores: Array(18).fill(0) },
];

// 스코어 업데이트 함수
function updateScore(button, change) {
    const hole = button.dataset.hole;
    const player = button.dataset.player;
    const scoreDisplay = document.querySelector(`.score-display[data-hole="${hole}"][data-player="${player}"]`);

    // 현재 스코어 가져오기
    let currentScore = parseInt(scoreDisplay.textContent);

    // 스코어 업데이트
    currentScore += change;

    // 스코어가 0 이상으로 제한
    if (currentScore < 0) {
        currentScore = 0;
    }

    // 업데이트된 스코어 표시
    scoreDisplay.textContent = currentScore;
}

// 제출 버튼 클릭 시 결과 표시
document.getElementById('submit').addEventListener('click', () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // 이전 결과 초기화

    // 각 홀의 스코어 가져오기
    const scores = document.querySelectorAll('.score-display');
    scores.forEach(scoreDisplay => {
        const hole = scoreDisplay.dataset.hole - 1;
        const playerIndex = scoreDisplay.dataset.player;
        const score = parseInt(scoreDisplay.textContent);

        players[playerIndex].scores[hole] = score;
    });

    // 결과 표시
    players.forEach(player => {
        const totalScore = player.scores.reduce((acc, score) => acc + score, 0);
        resultsDiv.innerHTML += `<p>${player.name}: ${totalScore}타 (홀별 스코어: ${player.scores.join(', ')})</p>`;
    });
});
