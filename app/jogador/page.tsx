'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function JogadorPage() {
  const [room, setRoom] = useState('sala123');
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [question, setQuestion] = useState(null);
  const [time, setTime] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  const join = () => {
    socket.emit('player:join', { room, name });
    setJoined(true);
  };

  useEffect(() => {
    socket.on('question:start', ({ question, time }) => {
      setQuestion(question);
      setTime(time);
    });
    socket.on('time:update', ({ time }) => setTime(time));
    socket.on('leaderboard:update', (lb) => setLeaderboard(lb));
    return () => {
      socket.off('question:start');
      socket.off('time:update');
      socket.off('leaderboard:update');
    };
  }, []);

  const answer = (i) => {
    socket.emit('player:answer', { room, answerIndex: i });
  };

  if (!joined)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Entrar no jogo</h1>
        <input
          type="text"
          placeholder="Seu nome"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={join}
        >
          Entrar
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Jogador: {name}</h1>
      {question ? (
        <div className="mt-4">
          <h2 className="font-bold">{question.text}</h2>
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => answer(i)}
              className="block border px-4 py-2 my-2 rounded hover:bg-gray-100"
            >
              {opt}
            </button>
          ))}
          <p>Tempo restante: {time}s</p>
        </div>
      ) : (
        <p>Aguardando próxima pergunta...</p>
      )}
      <h2 className="mt-6 font-bold">Ranking</h2>
      <ul>
        {leaderboard.map((p, i) => (
          <li key={i}>
            {p.name}: {p.score}
          </li>
        ))}
      </ul>
    </div>
  );
}