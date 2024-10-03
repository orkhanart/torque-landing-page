"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react'

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [currentSlide, setCurrentSlide] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentSlide(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full p-4">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[900px] font-sans">
        What founders & marketers are saying
      </h1>
      <div className="w-full max-w-[1250px]">
        <div className="lg:hidden flex justify-center mb-8">
          {posts.map((_, index) => (
            <Image
              key={index}
              src={index === currentSlide ? '/dot-active.svg' : '/dot-inactive.svg'}
              alt={`Slide ${index + 1}`}
              width={index === currentSlide ? 32 : 6} // Adjust width as needed
              height={index === currentSlide ? 32 : 6} // Adjust height as needed
              className={index === currentSlide ? "-mx-2" : "mx-1"}
            />
          ))}
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex flex-row justify-start">
            {posts.map((post, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 lg:flex-[0_0_25%] basis-[330px]">
                <Card className="h-full lg:w-[300px] w-[315px]">
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
                  <CardContent className="lg:text-sm text-base">
                    <p>{post.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Media