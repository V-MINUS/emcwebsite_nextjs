'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaDiscord, FaInstagram, FaFacebook, FaSoundcloud, FaTags } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Community | Electronic Music Council',
  description: "Explore the Electronic Music Council's community initiatives, fundraisers, and educational programs supporting Cork's electronic music culture.",
}

type Initiative = {
  title: string
  date?: string
  location?: string
  content: string[]
  expandableContent?: string[]
  image?: string
  isFeatured?: boolean
  tags: string[]
  videoSrc?: string
}

const communityInitiatives: Record<string, Initiative> = {
  cultureNight: {
    title: "Culture Night 2024",
    date: "Friday, September 20, 2024",
    location: "Cobh, Co. Cork",
    content: [
      "We are hoping that everyone is as excited for this year's Culture Night as we are.",
      "It's a very special occasion with many communities all over the country opening their doors to the general public and showcasing their work in its most purest form.",
      "As EMC have been chosen to host one of Cork Counties flagship events, we felt obliged to go all out in true EMC fashion.",
      "We wanted to provide an experience that showcased as much of Cobh's heritage and beauty as possible, highlighting the potential for electronic music and visual art in spaces outside the city."
    ],
    expandableContent: [
      "With most of our community residing in Cork City, we felt it important to make sure everyone gets to the event and home safely.",
      "As a result of this we have decided to hire a private boat to bring guests up the lee to our first venue and a private bus which will bring guests back to the city, should they decide to stay for the entirety of the event.",
      "As spaces were limited on the boat and we know there will be some in need of an earlier night, we have also highlighted various public transport routes in and out of Cobh.",
      "We are incredibly excited to welcome our community to Cobh and bring our art and community to the people of Cobh, in the hope that we forge new connections and create further opportunities for development and growth in Cork.",
      "See you all on Friday :)"
    ],
    image: "/images/culture-night.jpg",
    isFeatured: true,
    tags: ["Culture Night", "Cobh", "Featured Event"]
  },
  guidelines: {
    title: "Culture Night Safety Guidelines",
    content: [
      "Our top priority today is ensuring everyone has a safe, enjoyable, and respectful experience. That is why we need everyone's collaboration on a shared vision.",
      "Togetherness and thoughtfulness is what makes our community a safe and healthy space, therefore we invite you to keep the following guidelines in mind:"
    ],
    expandableContent: [
      "- Respect the Art and Venue: Cobh's venues are special, and we ask that you treat the spaces, artworks, and the local community with respect.",
      "- Assistance: For any questions or concerns, don't hesitate to reach out to us during the event. Members of our team will be recognisable by lanyards.",
      "- Alcohol: Enjoy responsibly. Please be mindful not to over-consume alcohol, and look out for your friends and fellow attendees for any assistance you might need.",
      "- Zero Tolerance for Substance Abuse: This event operates under a zero-tolerance policy regarding illegal substances. Anyone found in breach of this will be asked to leave immediately.",
      "- Inclusive Space: This is an inclusive event, and we champion values such as open-mindedness and nondiscrimination. If you have any specific needs or requests, please contact us in advance or during the event. We're here to ensure everyone feels welcome and safe, and we invite you to call out on disrespectful behaviour.",
      "- Venue Information: The event is spread across three buildings and a boat. The Sirius Art Centre will be the main hub for information until 10pm. The final part of the event will be held at the Commodore Hotel, from 10pm to 1am.",
      "- Transport: If you're not attending the boat party, there are affordable and convenient train services to Cobh. There will be free buses back to Cork City at the end of the night.",
      "Having a collaborative outlook creates safety, and we hope everyone will have a great time while feeling comfortable. That way, we can support each other in a way that feels meaningful."
    ],
    image: "/images/safety-guidelines.jpg",
    tags: ["Guidelines", "Safety"]
  },
  somaCoffee: {
    title: "Soma Coffee & Cancer Society Fundraiser",
    location: "The Black Market, Cork",
    content: [
      "Want a lovely bag of SOMA coffee? The Black Market are hosting an event tomorrow alongside the Irish Cancer Society. Make any donation to the Irish Cancer Society and get a bag of gorgeous SOMA coffee. Music supplied all day by Electronic Music Council "
    ],
    image: "/images/soma-coffee.jpg",
    tags: ["Fundraiser", "Irish Cancer Society"]
  },
  daffodilDay: {
    title: "Daffodil Day Irish Cancer Society Free Party Fundraiser",
    date: "Daffodil Day",
    location: "Patrick Street, at the Gentlemen's Quarter",
    content: [
      "Music on Patrick Street tomorrow for Daffodil Day ",
      "We've got something special happening. The City Council have given the Electronic Music Council permission to setup a music stall to raise funds for Daffodil Day, supporting the Irish Cancer Society.",
      "Stevie G is kicking us off at 10am, and we'll have a lineup of DJs keeping the vibes going throughout the day."
    ],
    expandableContent: [
      "It's going to be a laid-back hangout of happy uplifting tunes and we'd love to see you there!",
      "Location: Patrick Street, at the Gentlemen's Quarter",
      "Time: 10 am to 4 pm",
      "Come by, have a bop and help us raise money & awareness for the Irish Cancer Society",
      "Thanks so much",
      "EMC "
    ],
    image: "/images/daffodil-day.jpg",
    tags: ["Fundraiser", "Irish Cancer Society", "Free Party"]
  },
  producerBattle: {
    title: "Community Producer Beat Battle",
    date: "Saturday 16th December",
    location: "The Roundy (upstairs)",
    content: [
      "Big day and night for the EMC familia!",
      "Production workshop at 2.30 in the roundy - would love to see as many there as possible! We reckon we can fit another 10/15",
      "We play music then in Rising Sons from 10-2.30am",
      "Come through and say hi and help us grow this community to even greater heights.",
      "Create, learn and connect!"
    ],
    expandableContent: [
      "We're delighted to announce your second Producer Battle.",
      "\"A city comes together\" by @electronicmusiccouncil is on Saturday 16th December in @theroundy (upstairs) between 2:30pm and 5:30pm.",
      "Producers of all levels are invited to call in.",
      "We'll explore, create, learn, network, share, produce, listen, etc.",
      "Very inclusive and collaborative workshops.",
      "Drop your ideas in comment section as well.",
      "Bring your computer and/or your favorite tools you used to create music.",
      "An extension lead and a headset will be handy as well.",
      "Event is free",
      "Link to free ticket via Eventbrite is available in bio"
    ],
    image: "/images/producer-battle.jpg",
    tags: ["Workshop", "Beat Battle", "Production"]
  },
  djMentorship: {
    title: "EMC DJ Mentorship Programme",
    content: [
      "The Electronic Music Council (EMC) in Cork is offering a DJ mentorship program to help emerging and established DJs grow their skills and careers. The program aims to provide support, guidance, and opportunities for DJs to develop their craft and enhance their overall professionalism."
    ],
    expandableContent: [
      "Key aspects of the program:",
      "- Mentorship: The program pairs DJs with experienced professionals who can provide guidance and support.",
      "- Skill Development: Mentorship aims to help DJs expand their skillset and improve their overall professionalism.",
      "- Career Advancement: The program may also aim to increase opportunities for DJs within the industry.",
      "- In-Person and Online Sessions: The program includes a mix of in-person and online sessions, offering flexibility for participants.",
      "- Holistic Approach: The mentorship focuses on the overall DJing process and mindset, rather than just specific techniques or equipment.",
      "- Industry Knowledge: Mentors share insights into the electronic music industry, including how to navigate challenges and overcome obstacles."
    ],
    image: "/images/mentorship-program.jpg",
    videoSrc: "/images/mentorship-program.mp4",
    tags: ["Mentorship", "Education", "DJs"]
  }
}

function InitiativeCard({ initiative }: { initiative: Initiative }) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      {initiative.image && (
        <div className="relative h-64">
          <Image
            src={initiative.image}
            alt={initiative.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{initiative.title}</h3>
        {(initiative.date || initiative.location) && (
          <div className="flex flex-wrap gap-4 text-zinc-400 mb-4">
            {initiative.date && <span>{initiative.date}</span>}
            {initiative.location && <span>{initiative.location}</span>}
          </div>
        )}
        <div className="space-y-4 mb-6">
          {initiative.content.map((paragraph, idx) => (
            <p key={idx} className="text-zinc-300">{paragraph}</p>
          ))}
        </div>
        {initiative.expandableContent && (
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="space-y-2">
              {initiative.expandableContent.map((item, idx) => (
                <p key={idx} className="text-zinc-400">{item}</p>
              ))}
            </div>
          </div>
        )}
        {initiative.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {initiative.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-purple-600/20 text-purple-400"
              >
                <FaTags className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Community() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-purple-900/50 to-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Initiatives</h1>
          <div className="w-24 h-1 bg-purple-600 mb-6"></div>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Discover the various community initiatives organized by the Electronic Music Council to foster growth, 
            education, and connection within Cork's electronic music community.
          </p>
        </div>
      </section>
      
      {/* Featured Initiative */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Initiatives</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          
          <div className="grid gap-8">
            <InitiativeCard initiative={communityInitiatives.cultureNight} />
            <InitiativeCard initiative={communityInitiatives.guidelines} />
          </div>
        </div>
      </section>
      
      {/* Fundraisers */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Fundraisers</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <InitiativeCard initiative={communityInitiatives.somaCoffee} />
            <InitiativeCard initiative={communityInitiatives.daffodilDay} />
          </div>
        </div>
      </section>
      
      {/* Education & Workshops */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Education & Workshops</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <InitiativeCard initiative={communityInitiatives.producerBattle} />
            <InitiativeCard initiative={communityInitiatives.djMentorship} />
          </div>
        </div>
      </section>
      
      {/* Join Community CTA */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Be part of Cork's vibrant electronic music scene. Connect with fellow artists, attend workshops, 
            and participate in our community events.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </main>
  )
} 