import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = await response.json()

  return product
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative flex justify-center items-end rounded-lg bg-zinc-900 overflow-hidden"
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
    </div>
  )
}
