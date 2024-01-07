import { ReactNode } from 'react'

import { CartProvider } from '@/contexts/cart-context'
import { Header } from '@/components/header'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="grid grid-rows-app gap-5 w-full max-w-[1600px] min-h-screen mx-auto p-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
