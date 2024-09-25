import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import Image from 'next/image'

const ModernMarketingStack = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div >
        <Badge variant="outline" className='mb-4'>Modern Marketing Stack</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-semibold mb-12 text-center max-w-[900px]">
        Track users across campaigns and provide incentives never before possible
      </h1>
      <Card className="bg-gray-900 text-white p-4 w-80">
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <span>Reward</span>
            {/* <Select defaultValue="only">
              <SelectTrigger className="w-24 bg-red-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="only">only</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="long-term-stakers">
              <SelectTrigger className="w-40 bg-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long-term-stakers">long-term stakers</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <div className="flex items-center space-x-2">
            <span>who continued to stake</span>
            {/* <Select defaultValue="after">
              <SelectTrigger className="w-24 bg-red-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="after">after</SelectItem>
              </SelectContent>
            </Select> */}
            <span>the</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>previous</span>
            {/* <Select defaultValue="promotional-period">
              <SelectTrigger className="w-40 bg-teal-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promotional-period">promotional period</SelectItem>
              </SelectContent>
            </Select> */}
            <span>has ended.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModernMarketingStack