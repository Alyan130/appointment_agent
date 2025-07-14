import { HeroSection } from "@/components/HeroSection"


export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Your Personal AI Scheduler"
        subtitle={{
          regular: "Book Appointments Effortlessly with ",
          gradient: "Smart AI Assistance",
        }}
        description="Easily schedule appointments, avoid double-bookings, and stay organized — powered by intelligent automation."
        ctaText="Try It Now"
        ctaHref="/start"
        bottomImage={{
          light: "/placeholder.svg?height=600&width=1200",
          dark: "/placeholder.svg?height=600&width=1200",
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.2,
          cellSize: 40,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />
    </main>
  )
}
