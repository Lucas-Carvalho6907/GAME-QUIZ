import '../styles/globals.css';

export const metadata = {
  title: 'Quiz Game',
  description: 'Jogo de quiz em tempo real',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
