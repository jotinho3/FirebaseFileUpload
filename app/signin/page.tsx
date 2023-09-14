import SignIn from "./components/GoogleSignIn"
import mainIcon from '../../assets/add_photo_alternate_outlined.png'
import github from '../../assets/GitHubIcon.png'

import Image from "next/image"

function SignInPage() {
  return (
    <section className="w-full flex flex-row bg-red-800 items-center ">
        <aside className="w-1/3 h-screen">
            <video className="h-full sm:max-w-full hidden sm:block" src="/video/pexels-iyan-darmawan-5512952 (2160p).mp4" autoPlay muted loop></video>
        </aside>

        <div className="w-2/3 flex sm:ml-0 ml-[-5rem] justify-center">
            <div className="flex flex-col gap-32 p-8 sm:p-16 bg-slate-800 rounded-xl items-center ">
                <div className="flex gap-8 items-center border-b-2 border-slate-300 pb-6">
                    <Image width={50} height={50} src={mainIcon} alt="Image Uploader Img" />
                    <h1 className="text-xl">Image Uploader</h1>
                </div>
                
                <SignIn />

                <div className="flex gap-2 items-center">
                    <p>Made by jotinho </p> 
                    <a href="https://github.com/jotinho3" target="_blank">
                        <Image src={github} alt="GitHub icon" className="w-8 h-8"/>
                    </a>
                    
                </div>
                
            </div>
        </div>

    </section>
  )
}

export default SignInPage