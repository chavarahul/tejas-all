"use client"

import { Button } from "@/components/ui/button"
import { Star, ArrowRight, Database, LineChart, Linkedin, Brain, Zap, UserPlus, Github, Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loading from "./loading"
import { SparklesCore } from "../components/sparkles"
import { Meteors } from "../components/ui/meteors"
import { TextGenerateEffect } from "../components/ui/text-generate-effect"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Show loading screen for initial animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows`;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation - Made sticky */}
      <nav className="fixed top-0 left-0 right-0 z-[999]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <Star className="h-8 w-8 text-purple-500 transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110" />
                <span className="text-2xl font-semibold">STAAR|AI</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {/* Login and Sign Up buttons */}
              <div className="flex items-center space-x-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button
                      className="relative inline-block p-[2px] font-semibold leading-6 text-white shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                    >
                      <span
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-100 transition-opacity duration-500 group-hover:opacity-100"
                      ></span>
                      <span className="relative z-10 block px-6 py-3 rounded-xl bg-purple-700">
                        <div className="relative z-10 flex items-center space-x-2">
                          <UserPlus className="mr-2 h-5 w-5" />
                          <span className="transition-all duration-300 group-hover:translate-x-1">Register Now</span>
                          <svg
                            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                            data-slot="icon"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-gray-900 to-black border border-purple-500/20">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-white">Create Account</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full bg-transparent border-purple-500/30 text-white hover:bg-purple-500/10">
                          <Github className="mr-2 h-5 w-5" />
                          GitHub
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent border-purple-500/30 text-white hover:bg-purple-500/10">
                          <Mail className="mr-2 h-5 w-5" />
                          Google
                        </Button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-purple-500/30" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-black px-2 text-purple-400">Or continue with</span>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-purple-200">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-purple-200">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password" className="text-purple-200">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <Button
                        className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => setOpen(false)}
                      >
                        Create Account
                      </Button>
                    </div>
                    <p className="text-center text-sm text-purple-200/60">
                      Already have an account? <a href="#" className="text-purple-400 hover:text-purple-300">Sign in</a>
                    </p>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <div className="relative animate-fadeIn h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 z-50 relative absolute left-0 my-auto h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              An AI That Listens, Learns, and Works—Effortlessly!
            </h1>
            <p className="mt-6 text-xl text-gray-300">Smarter Assistance, Effortless Productivity</p>
            <div className="mt-10 flex justify-center gap-4">
              <button className="relative inline-flex items-center gap-3 bg-[#7808d0] text-white font-semibold rounded-full px-6 py-3 pl-5 whitespace-nowrap overflow-hidden transition-colors duration-300 hover:bg-black group">
                <span className="relative flex-shrink-0 w-6 h-6 grid place-items-center bg-white text-[#7808d0] rounded-full overflow-hidden transition-colors duration-300 group-hover:text-black">
                  {/* First Icon */}
                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute transition-transform duration-300 ease-in-out transform group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                    width="10"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  {/* Second Icon (Appears After Hover) */}
                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    width="10"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute transition-transform duration-300 ease-in-out delay-75 transform translate-x-[-150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                Try
              </button>
            </div>
          </div>
        </div>
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full absolute top-0 left-0"
          particleColor="#FFFFFF"
        />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {/* Content */}

      </div>

      {/* Text Generate Effect Section */}
      <section className="relative py-16">
  <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 h-screen flex items-center justify-center">
    <div className="relative w-full">
      {/* Corner Borders */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-500 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-purple-400"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500 transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-purple-400"></div>

      {/* Content */}
      <div className="p-10">
        <TextGenerateEffect words={words} />
      </div>
    </div>
  </div>
</section>

      {/* Expertise Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Explore What Our AI Can Do for You!</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Smart Features, Smarter You!</p>
          </div>

          {/* Expertise Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Consulting Card */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 transition relative overflow-hidden hover:translate-y-[-10px] hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] hover:shadow-purple">
              <div className="inline-block bg-purple-600/20 p-3 rounded-lg mb-4">
                <LineChart className="h-6 w-6 text-purple-500" />
              </div>
              <div className="bg-purple-600/20 text-purple-300 text-sm font-medium px-4 py-1 rounded-full inline-block mb-4">
                Smart Notes
              </div>
              <h3 className="text-2xl font-semibold mb-4">
              </h3>
              <p className="text-gray-400 mb-6">
                Your AI-powered assistant captures and organizes your thoughts effortlessly.
              </p>
              <Button variant="ghost" className="group">
                Discover
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
              <Meteors number={20} />
            </div>

            {/* Data Collection Card */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 transition relative overflow-hidden hover:translate-y-[-10px] hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] hover:shadow-purple">
              <div className="inline-block bg-purple-600/20 p-3 rounded-lg mb-4">
                <Database className="h-6 w-6 text-purple-500" />
              </div>
              <div className="bg-purple-600/20 text-purple-300 text-sm font-medium px-4 py-1 rounded-full inline-block mb-4">
                VisionAssist
              </div>
              <h3 className="text-2xl font-semibold mb-4">Smart Insights</h3>
              <p className="text-gray-400 mb-6">
                AI-powered analysis of your desktop for valuable insights and suggestions.
              </p>
              <Button variant="ghost" className="group">
                Discover
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
              <Meteors number={20} />
            </div>

            {/* New Card 1 */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 transition relative overflow-hidden hover:translate-y-[-10px] hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] hover:shadow-purple">
              <div className="inline-block bg-purple-600/20 p-3 rounded-lg mb-4">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <div className="bg-purple-600/20 text-purple-300 text-sm font-medium px-4 py-1 rounded-full inline-block mb-4">
                AI Learning
              </div>
              <h3 className="text-2xl font-semibold mb-4">Adaptive AI</h3>
              <p className="text-gray-400 mb-6">
                Our AI learns from your interactions to provide personalized experiences.
              </p>
              <Button variant="ghost" className="group">
                Discover
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
              <Meteors number={20} />
            </div>

            {/* New Card 2 */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 transition relative overflow-hidden hover:translate-y-[-10px] hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)] hover:shadow-purple">
              <div className="inline-block bg-purple-600/20 p-3 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <div className="bg-purple-600/20 text-purple-300 text-sm font-medium px-4 py-1 rounded-full inline-block mb-4">
                Automation
              </div>
              <h3 className="text-2xl font-semibold mb-4">Smart Workflow</h3>
              <p className="text-gray-400 mb-6">Automate repetitive tasks and streamline your workflow with AI.</p>
              <Button variant="ghost" className="group">
                Discover
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
              <Meteors number={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-semibold">Staar AI</span>
            </div>
            <div className="flex space-x-8">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Data Protection
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Legal Notices
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-purple-500 transition">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}