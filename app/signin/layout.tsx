import { ReactNode } from "react"

interface SignInLayoutProps {
    children: ReactNode
}

export default function SignInLayout({children}: SignInLayoutProps) {
    return (
        <div>
            <h1>SignIn Layout</h1>
            {children}
        </div>
        
    )
}