const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Statik dosyaları sun (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Oyun Aşamaları
const GameStates = {
    LOBBY: 'lobby',
    COUNTRY_HINTS: 'country_hints'
};

let currentState = GameStates.LOBBY;
let players = {};
let clueInterval = null;

// Ülke Bulmaca Verileri
const countryQuiz = {
    answer: "brezilya",
    clues: [
        "Bu ülke Dünya Kupası'nı 1'den fazla kez kazandı.",
        "Avrupa veya Afrika kıtasında yer almaz.",
        "Bayrağında sarı ve yeşil renkler ağırlıktadır.",
        "Pele bu ülkenin efsanesidir."
    ]
};

io.on('connection', (socket) => {
    console.log('Bir oyuncu bağlandı:', socket.id);
    players[socket.id] = { id: socket.id, score: 0, name: `Oyuncu_${socket.id.substring(0,4)}` };

    // Yeni bağlanana mevcut durumu ve oyuncu listesini gönder
    socket.emit('state_changed', currentState);
    io.emit('update_players', Object.values(players));

    // Admin oyunu başlatırsa
    socket.on('start_game', () => {
        currentState = GameStates.COUNTRY_HINTS;
        io.emit('state_changed', currentState);
        startCountryMode();
    });

    // Oyuncu tahmin yaparsa
    socket.on('make_guess', (guess) => {
        if (currentState === GameStates.COUNTRY_HINTS) {
            if (guess.toLowerCase().trim() === countryQuiz.answer) {
                clearInterval(clueInterval);
                players[socket.id].score += 100; // Doğru bilene 100 puan
                io.emit('round_winner', { winner: players[socket.id].name, answer: countryQuiz.answer });
                io.emit('update_players', Object.values(players));
                
                // 5 saniye sonra lobiye dön
                setTimeout(() => {
                    currentState = GameStates.LOBBY;
                    io.emit('state_changed', currentState);
                }, 5000);
            } else {
                // Yanlış tahminleri chatte göster
                io.emit('chat_message', { sender: players[socket.id].name, text: guess });
            }
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('update_players', Object.values(players));
    });
});

function startCountryMode() {
    let clueIndex = 0;
    io.emit('new_clue', countryQuiz.clues[clueIndex]);
    
    clueInterval = setInterval(() => {
        clueIndex++;
        if (clueIndex < countryQuiz.clues.length) {
            io.emit('new_clue', countryQuiz.clues[clueIndex]);
        } else {
            clearInterval(clueInterval);
            io.emit('round_winner', { winner: "Kimse", answer: countryQuiz.answer });
            setTimeout(() => {
                currentState = GameStates.LOBBY;
                io.emit('state_changed', currentState);
            }, 5000);
        }
    }, 8000); // Her 8 saniyede bir ipucu
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});