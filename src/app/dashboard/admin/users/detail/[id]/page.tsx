// app/dashboard/admin/users/detail/[id]/page.tsx
"use client"
import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  const { id } = params

  return (
    <div>
      <h1>Detail User: {id}</h1>
    </div>
  )
}

export default Page
