'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: '1',
    name: 'EMC Logo T-Shirt',
    price: 25.00,
    image: '/images/merch/tshirt.jpg',
    description: 'Classic black t-shirt with the EMC logo'
  },
  {
    id: '2',
    name: 'EMC Hoodie',
    price: 45.00,
    image: '/images/merch/hoodie.jpg',
    description: 'Comfortable hoodie featuring the EMC logo'
  },
  {
    id: '3',
    name: 'EMC Cap',
    price: 20.00,
    image: '/images/merch/cap.jpg',
    description: 'Stylish cap with embroidered EMC logo'
  },
  {
    id: '4',
    name: 'EMC Sticker Pack',
    price: 10.00,
    image: '/images/merch/stickers.jpg',
    description: 'Set of 5 EMC logo stickers'
  }
];

export default function Merch() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">EMC Merchandise</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-300 mb-2">{product.description}</p>
              <p className="text-2xl font-bold mb-4">€{product.price.toFixed(2)}</p>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => {
                  // Add to cart functionality will be implemented later
                  console.log(`Added ${product.name} to cart`);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 