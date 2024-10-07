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

document.getElementById('submit').addEventListener('click', () => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // 이전 결과 초기화

    // 플레이어 이름 가져오기
    const players = [];
    for (let i = 1; i <= 6; i++) {
        const playerName = document.getElementById(`player${i}`).value;
        if (playerName) {
            players.push({ name: playerName, scores: Array(18).fill(0) });
        }
    }

    // 각 홀의 스코어 가져오기
    const scores = document.querySelectorAll('.score-display');
    scores.forEach(scoreDisplay => {
        const hole = scoreDisplay.dataset.hole - 1;
        const playerIndex = scoreDisplay.dataset.player - 1;
        const score = parseInt(scoreDisplay.textContent);

        players[playerIndex].scores[hole] = score;
    });

    // 결과 표시
    players.forEach(player => {
        const totalScore = player.scores.reduce((acc, score) => acc + score, 0);
        resultsDiv.innerHTML += `<p>${player.name}: ${totalScore}타 (홀별 스코어: ${player.scores.join(', ')})</p>`;
    });
});
