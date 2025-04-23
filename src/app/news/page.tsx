import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { FaArrowRight } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'News | Electronic Music Council',
  description: 'Latest news, interviews, and updates from the Electronic Music Council.',
}

type NewsItem = {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
  category: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "EMC Announces Summer Festival Lineup",
    date: "April 10, 2025",
    excerpt: "The Electronic Music Council is excited to announce the full lineup for our annual summer festival, featuring top local and international talent.",
    image: "/images/event-placeholder.jpg",
    category: "Events"
  },
  {
    id: 2,
    title: "New Producer Workshop Series Starts Next Month",
    date: "April 5, 2025",
    excerpt: "Join us for a six-week workshop series covering everything from beat-making to mastering, led by industry professionals.",
    image: "/images/event-placeholder.jpg",
    category: "Education"
  },
  {
    id: 3,
    title: "Interview with DJ Pulse: Cork's Emerging Techno Scene",
    date: "March 28, 2025",
    excerpt: "We sat down with DJ Pulse to discuss the growing techno scene in Cork and the importance of supporting local venues.",
    image: "/images/event-placeholder.jpg",
    category: "Interviews"
  }
]

const categoryColors = {
  Events: 'bg-purple-600/20 text-purple-400',
  Education: 'bg-blue-600/20 text-blue-400',
  Interviews: 'bg-green-600/20 text-green-400'
} as const

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm ${categoryColors[item.category as keyof typeof categoryColors]}`}>
          {item.category}
        </span>
      </div>
      <div className="p-6">
        <time className="text-sm text-zinc-400 mb-2 block">{item.date}</time>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-zinc-300 mb-6">{item.excerpt}</p>
        <Link 
          href={`/news/${item.id}`}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          Read more <FaArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default function News() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-purple-900/50 to-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News</h1>
          <div className="w-24 h-1 bg-purple-600 mb-6"></div>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Stay up to date with the latest news, interviews, and updates from the Electronic Music Council.
          </p>
        </div>
      </section>
      
      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map(item => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for the latest news and updates from EMC.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required
              className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
} 