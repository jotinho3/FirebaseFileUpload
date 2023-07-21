import { ReactNode } from "react"
import Header from "./components/Header"



interface AppLayoutProps {
    children: ReactNode
}

export default function AppLayout({children}: AppLayoutProps) {
    return (
        <div>
            <Header />
            <h1>Home Layout</h1>
            {children}
            
            
        </div>
        
    )
}