import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events | Electronic Music Council',
  description: 'Upcoming electronic music events organized by the Electronic Music Council in Cork.',
}

type Event = {
  id: number
  title: string
  date: {
    day: string
    month: string
  }
  venue: string
  time: string
  description: string
  image: string
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "EMC Presents: Small Crab at Liquid Lounge",
    date: { day: "15", month: "APR" },
    venue: "Liquid Lounge, Cork",
    time: "10:00 PM - 2:00 AM",
    description: "Join us for an unforgettable night featuring Small Crab, delivering cutting-edge electronic sounds in an intimate venue setting.",
    image: "/images/small-crab.jpg"
  },
  {
    id: 2,
    title: "Techno Tuesdays with DJ Static",
    date: { day: "22", month: "APR" },
    venue: "Dali, Cork",
    time: "9:00 PM - 1:00 AM",
    description: "Our weekly techno night returns with resident DJ Static spinning the best underground techno tracks.",
    image: "/images/event-placeholder.jpg"
  },
  {
    id: 3,
    title: "EMC Workshop: Introduction to Ableton Live",
    date: { day: "28", month: "APR" },
    venue: "Cork Sound Fair, Cork",
    time: "2:00 PM - 5:00 PM",
    description: "Learn the basics of music production with Ableton Live in this hands-on workshop for beginners.",
    image: "/images/event-placeholder.jpg"
  }
]

export default function Events() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-purple-900/50 to-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <div className="w-24 h-1 bg-purple-600"></div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="relative w-full h-64">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center bg-purple-600 px-4 py-2 rounded">
                      <span className="block text-2xl font-bold">{event.date.day}</span>
                      <span className="text-sm">{event.date.month}</span>
                    </div>
                    <div className="flex-1 ml-4">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-zinc-400">
                        <span className="block">{event.venue}</span>
                        <span>{event.time}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-zinc-300 mb-4">{event.description}</p>
                  <Link 
                    href={`/events/${event.id}`}
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition duration-300"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Past Events Gallery */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Past Events</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg">
              <Image 
                src="/images/event-placeholder.jpg" 
                alt="Winter Sound Series" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-xl font-semibold mb-2">Winter Sound Series</h3>
                <p className="text-zinc-300">December 2024</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <Image 
                src="/images/event-placeholder.jpg" 
                alt="Cork Electronic Festival" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-xl font-semibold mb-2">Cork Electronic Festival</h3>
                <p className="text-zinc-300">October 2024</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <Image 
                src="/images/event-placeholder.jpg" 
                alt="Summer DJ Workshop" 
                width={400} 
                height={300}
                className="w-full h-[300px] object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-xl font-semibold mb-2">Summer DJ Workshop</h3>
                <p className="text-zinc-300">July 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 