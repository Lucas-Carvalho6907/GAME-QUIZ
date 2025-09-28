'use client'
import { useState } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function TutorPage() {
  const [roomCode, setRoomCode] = useState('sala123');
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState(0);

  const createRoom = () => socket.emit('tutor:createRoom', { roomCode });

  const addQuestion = () => {
    const q = { text, options, correctIndex: correct };
    const newQuestions = [...questions, q];
    setQuestions(newQuestions);
    socket.emit('tutor:updateQuestions', { roomCode, questions: newQuestions });
    setText('');
    setOptions(['', '', '', '']);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tutor</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={createRoom}>
        Criar Sala ({roomCode})
      </button>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Pergunta"
          className="border p-2 w-full mb-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Opção ${i + 1}`}
            className="border p-2 w-full mb-2"
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
          />
        ))}
        <label>Resposta Correta:</label>
        <select
          value={correct}
          onChange={(e) => setCorrect(Number(e.target.value))}
          className="border p-2 ml-2"
        >
          {options.map((_, i) => (
            <option key={i} value={i}>
              {i + 1}
            </option>
          ))}
        </select>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          onClick={addQuestion}
        >
          Adicionar Pergunta
        </button>
      </div>

      <h2 className="mt-6 font-bold">Perguntas:</h2>
      <ul>
        {questions.map((q, i) => (
          <li key={i}>{q.text}</li>
        ))}
      </ul>
    </div>
  );
}