import { ReactNode } from "react"
import Header from "./components/Header"
import LeftSidedAside from "./components/Aside"


interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({children}: AppLayoutProps) {
    return (
        <div>
            
            <Header  />
            <div className="m-auto flex gap-1 sm:gap-8 ">
                <LeftSidedAside />
               
               {children}
            </div>
            
            
            
        </div>
        
    )
}