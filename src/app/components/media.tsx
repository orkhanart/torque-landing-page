import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const posts = [
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.',
  },
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. DeFi native, self-appointed tokenomist.',
  },
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. Wanted to build his own systems. Always keen on engaging. quickly realized he wanted to build',
  },
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems.',
  },
]

const Media = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[900px] leading-56 font-sans">
        What founders & marketers are saying
      </h1>
      <div className="flex flex-row gap-4">
        {posts.map((post, index) => (
          <Card key={index} className='h-auto w-[300px]'>
            <CardHeader>
              <CardTitle>{post.author}</CardTitle>  
              <CardDescription>{post.role}</CardDescription>
            </CardHeader>
            <CardContent className='text-sm'>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Media