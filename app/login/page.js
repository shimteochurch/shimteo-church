'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  function handleSubmit(e) {
    e.preventDefault()
    if (password === 'shimteo') {
      document.cookie = `shimteo-auth=${password}; path=/; max-age=86400`
      router.push(from)
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-[#1a2744] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-xl text-center">
        <h1 className="font-serif text-2xl font-bold text-[#1a2744] mb-2">쉼터 교회</h1>
        <p className="text-[#6B6B6B] text-sm mb-6">Shimteo Church</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-[#E8E4DC] rounded-lg text-center focus:outline-none focus:border-[#1a2744]"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm">Incorrect password</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-[#1a2744] text-white rounded-lg font-medium hover:bg-[#243460] transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
