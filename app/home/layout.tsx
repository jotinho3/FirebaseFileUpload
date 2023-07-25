import { ReactNode } from "react"
import Header from "./components/Header"



interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({children}: AppLayoutProps) {
    return (
        <div>
            <Header  />
            <h1>Home Layout</h1>
            <div className="w-2/3 m-auto ">
               {children}
            </div>
            
            
            
        </div>
        
    )
}