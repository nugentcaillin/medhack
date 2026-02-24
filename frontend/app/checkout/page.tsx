import { Card, CardDescription, CardHeader, CardTitle   } from "@/components/ui/card"
import "./checkoutStyle.css"


function CheckoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="checkoutWrapper">
            {children}
        </div>
    )
}


function SoleModelDisplayer() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sole Model</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
        </Card>
    )
}


export default function Home() {
  return (
    <CheckoutWrapper>
        <SoleModelDisplayer />
    </CheckoutWrapper>
  )
}