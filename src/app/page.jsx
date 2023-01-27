import Test from '@/components/test'
import { Inter } from '@next/font/google'
import localFont from '@next/font/local'

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: './fonts/GT-Regular.woff',
})

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='mx-auto max-w-5xl'>
      <div className={inter.className}>
        <Test />
      </div>
    </main>
  )
}
