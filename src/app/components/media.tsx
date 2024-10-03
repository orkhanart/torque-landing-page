import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';
const posts = [
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging.',
    image: '/sheldon-pfp.png',
  },
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. DeFi native, self-appointed tokenomist.',
    image: '/sheldon-pfp.png',
  },
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems. Always keen on engaging. Wanted to build his own systems. Always keen on engaging. quickly realized he wanted to build',
    image: '/sheldon-pfp.png',
  },
  {
    author: 'Sheldon',
    role: 'Founder',
    platform: 'X',
    content: 'DeFi native, self-appointed tokenomist. Started as a consultant in web3 back in early 2020, and quickly realized he wanted to build his own systems.',
    image: '/sheldon-pfp.png',
  },
]

const Media = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full p-4">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[900px] font-sans">
        What founders & marketers are saying
      </h1>
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex flex-row gap-4 items-start min-w-min md:max-w-[1000px] mx-auto">
          {posts.map((post, index) => (
            <Card key={index} className="!h-auto w-[300px] flex-shrink-0">
              <CardHeader className="flex flex-row justify-between items-start">
                <div className="flex flex-row gap-4 items-start">
                  <Image className="rounded-full" src={post.image} alt={post.author} width={44} height={44} />
                  <div className="flex flex-col gap-2">
                    <CardTitle className="my-0 -mt-1 py-0 text-lg font-medium">{post.author}</CardTitle>  
                    <CardDescription className="-mt-2 text-sm text-primary">{post.role}</CardDescription>
                  </div>
                </div>
                <Image className="mt-4" src="x-gray-logo.svg" alt={post.author} width={32} height={32} />
              </CardHeader>
              <CardContent className="text-sm">
                <p>{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Media