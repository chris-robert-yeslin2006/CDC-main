import ClientLayout from "./components/ClientLayout"
import './globals.css';

export const metadata = {
  title: 'Dashboard',
  description: 'Admin Panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
