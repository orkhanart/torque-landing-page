import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"


const Impact = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-[1400px]">
      <div >
        <Badge variant="outline" className='mb-4'>Impact</Badge>
      </div>
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-medium mb-12 text-center max-w-[1000px] leading-56 font-sans">
        Torque gives marketers the reward system they need to massively scale usage 
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Protocol Name
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
            Lorem ipsum dolor sit amet consectetur. Cursus faucibus pellentesque fermentum tellus sit et sit consequat urna. Arcu tortor vulputate ipsum amet. Id urna eu arcu faucibus. Elit porttitor sed convallis purus fermentum. Lorem ipsum dolor sit amet consectetur. Cursus faucibus pellentesque fermentum tellus sit et sit consequat urna. Arcu tortor vulputate ipsum amet. Id urna eu arcu faucibus. Elit porttitor sed convallis purus fermentum.
            </p>
          </CardContent>
        </Card>
        <div className="grid-row-3">
          <Card>
            <CardHeader>
              <CardTitle>
                Protocol Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                20% increase in SMB Gen3 floor price
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Protocol Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                20% increase in SMB Gen3 floor price
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Protocol Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                20% increase in SMB Gen3 floor price
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Impact;