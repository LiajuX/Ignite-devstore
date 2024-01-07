import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'

export const metadata: Metadata = {
  title: 'Home',
}

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid grid-rows-6 grid-cols-9 gap-6 max-h-[860]px">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative flex justify-center items-end row-span-6 col-span-6 rounded-lg bg-zinc-900 overflow-hidden"
      >
        <Image
          src={highlightedProduct.image}
          className="group-hover:scale-105 transition-transform duration-500"
          width={860}
          height={860}
          quality={100}
          alt=""
        />

        <div className="absolute right-28 bottom-28 gap-2 flex items-center max-w-[280px] h-12 p-1 pl-5 border-2 border-zinc-500 rounded-full bg-black/60">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex items-center justify-center h-full px-4 rounded-full bg-violet-500 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`product/${product.slug}`}
          className="group relative flex justify-center items-end row-span-3 col-span-3 rounded-lg bg-zinc-900 overflow-hidden"
        >
          <Image
            src={product.image}
            className="group-hover:scale-105 transition-transform duration-500"
            width={860}
            height={860}
            quality={100}
            alt=""
          />

          <div className="absolute right-10 bottom-10 gap-2 flex items-center max-w-[280px] h-12 p-1 pl-5 border-2 border-zinc-500 rounded-full bg-black/60">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex items-center justify-center h-full px-4 rounded-full bg-violet-500 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
