import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import { NotificationProvider } from '../context/NotificationContext'
import './globals.css'

export const metadata = {
  title: 'MyApp',
  description: 'Next.js Authentication App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NotificationProvider>
            <Navbar />
            <main className="main-content">
              {children}
            </main>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  )
}
