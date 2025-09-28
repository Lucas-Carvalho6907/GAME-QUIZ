export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Quiz Game</h1>
      <a href="/tutor" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Entrar como Tutor</a>
      <a href="/jogador" className="bg-green-600 text-white px-4 py-2 rounded-lg">Entrar como Jogador</a>
    </main>
  );
}