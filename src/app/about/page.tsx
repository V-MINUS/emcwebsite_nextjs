import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaTrophy, FaHandshake, FaArrowRight } from 'react-icons/fa';
import { Metadata } from 'next';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string[];
  imageSrc: string;
}

interface Value {
  icon: React.ElementType;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: FaUsers,
    title: 'Community',
    description: 'Building a strong, supportive community of music creators.'
  },
  {
    icon: FaLightbulb,
    title: 'Innovation',
    description: 'Encouraging creativity and pushing boundaries in electronic music.'
  },
  {
    icon: FaTrophy,
    title: 'Excellence',
    description: 'Striving for excellence in all our competitions and events.'
  },
  {
    icon: FaHandshake,
    title: 'Collaboration',
    description: 'Fostering collaboration between artists and industry professionals.'
  }
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dan-Jo Relihan",
    role: "Core Team Member",
    bio: [
      "Allow us to introduce Dan-Jo Relihan A.K.A. Steam Lite, a humble maestro of Drum and Bass who has been setting dance floors ablaze since 2014.",
      "Drawing inspiration from the pulsating world of hip-hop, Steam Lite crafts a captivating sonic journey that transcends genres, spanning breaks, Neurofunk, Jungle, and Liquid D&B.",
      "Beyond performances, he curates immersive art shows and runs exceptional events in Cork City, merging music and visual art to engage all senses."
    ],
    imageSrc: "/images/team/Dan-jo.jpg"
  },
  {
    id: 2,
    name: "Gwada Mike",
    role: "Core Team Member",
    bio: [
      "Meet Mike! He makes up for a great part of the Cork scene and community, playing everything from reggae and dancehall to afro house and amapiano.",
      "He holds a residency at Edison for house and techno, was a lead organizer of Africa Day Cork 2022, and sits on EMC's core decision committee."
    ],
    imageSrc: "/images/team/Mike.jpg"
  },
  {
    id: 3,
    name: "DEBHIAL",
    role: "Artist Member",
    bio: [
      "DEBHIAL is a talented producer and DJ from Cork's electronic music scene, bringing fresh energy and innovative sounds to every performance.",
      "With a unique style that blends multiple electronic genres, DEBHIAL has become an important voice in the local community."
    ],
    imageSrc: "/images/team/debhial.jpg"
  },
  {
    id: 4,
    name: "Miko",
    role: "Community Organizer",
    bio: [
      "Miko has been instrumental in building bridges between different parts of Cork's music scene.",
      "With a focus on inclusivity and community development, Miko helps organize events that bring together diverse audiences."
    ],
    imageSrc: "/images/team/miko.jpg"
  },
  {
    id: 5,
    name: "Nat",
    role: "Events Coordinator",
    bio: [
      "Nat brings extensive experience in event planning and management to the EMC team.",
      "Passionate about creating memorable experiences, Nat ensures every EMC event runs smoothly and exceeds expectations."
    ],
    imageSrc: "/images/team/nat.jpg"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const metadata: Metadata = {
  title: 'About Us | Electronic Music Council',
  description: "Learn about the Electronic Music Council and our mission to foster Cork's electronic music culture.",
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden group">
      <div className="relative h-80 overflow-hidden">
        <Image
          src={member.imageSrc}
          alt={member.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-600/20 text-purple-400">
            {member.role}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {member.bio.map((paragraph, idx) => (
            <p key={idx} className="text-zinc-300">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-purple-900/50 to-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <div className="w-24 h-1 bg-purple-600"></div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-purple-600 mb-8"></div>
              <p className="text-xl text-zinc-300">
                Our mission is to create a vibrant and inclusive community where artists can thrive, collaborate, 
                and push the boundaries of electronic music. We're committed to providing a platform for both 
                established and emerging artists to showcase their talent.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Content */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">About EMC</h2>
              <div className="w-24 h-1 bg-purple-600 mb-8"></div>
              <div className="space-y-6 text-lg text-zinc-300">
                <p>
                  The Electronic Music Council (EMC) was established to support and grow Cork's electronic 
                  music scene. We connect artists, venues, and audiences to create a vibrant community 
                  around electronic music.
                </p>
                <p>
                  Through our events, educational programs, and community initiatives, we aim to make Cork 
                  a hub for electronic music culture in Ireland and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 