import './globals.css'

export const metadata = {
  title: 'Daily Routine',
  description: 'Minimalist daily routine and fitness tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
