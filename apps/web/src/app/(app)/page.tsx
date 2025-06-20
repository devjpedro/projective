import { Header } from '@/components/header'

export default function Home() {
  return (
    <div className="xs:px-4 px-3 sm:px-8">
      <div className="pt-4 sm:pt-6">
        <Header isHome />
      </div>
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <p className="text-muted-foreground text-sm">Select an organization</p>
      </main>
    </div>
  )
}
