const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// 스코어 저장 API
app.post('/api/scores', (req, res) => {
    const data = req.body;

    // scores.json 파일에 저장
    fs.readFile('scores.json', (err, fileData) => {
        if (err) {
            console.error(err);
            return res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
        }
        
        const scores = JSON.parse(fileData || '[]');
        scores.push(data);
        
        fs.writeFile('scores.json', JSON.stringify(scores), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('파일을 저장하는 중 오류가 발생했습니다.');
            }
            res.status(201).send(data);
        });
    });
});

// 스코어 조회 API
app.get('/api/scores', (req, res) => {
    fs.readFile('scores.json', (err, fileData) => {
        if (err) {
            console.error(err);
            return res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
        }
        const scores = JSON.parse(fileData || '[]');
        res.send(scores);
    });
});

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}에서 실행 중입니다.`);
});
