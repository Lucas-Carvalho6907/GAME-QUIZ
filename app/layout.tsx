import './globals.css';

export const metadata = {
  title: 'Quiz Game',
  description: 'Jogo de quiz em tempo real',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}