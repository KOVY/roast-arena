import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="pt-16 pb-20 md:pb-8 min-h-screen">
        {children}
      </main>
      <BottomNav />
    </>
  )
}
