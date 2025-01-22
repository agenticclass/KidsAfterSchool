import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  const [error, setError] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const { session, forceRefresh } = useAuth()
  const navigate = useNavigate()

  const handleGoogleAuth = async () => {
    setGoogleLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          scopes: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
        }
      })

      if (error) throw error
      await forceRefresh()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar onSignIn={handleGoogleAuth} onSignUp={handleGoogleAuth} />

      {/* Hero Section */}
      <section className="container py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            AI-Powered Personalized Learning for Kids
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Adaptive learning that grows with your child, making education fun and effective
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Start Learning</Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Personalized Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Coding & AI',
                description: 'Learn programming and AI concepts through interactive projects'
              },
              {
                title: 'Creative Arts',
                description: 'Explore digital art, music, and creative expression'
              },
              {
                title: 'STEM Discovery',
                description: 'Master science, technology, engineering and math concepts'
              }
            ].map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {category.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AfterSchool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Learning',
                description: 'AI adapts to your child\'s unique learning style and pace',
                icon: '🧠'
              },
              {
                title: 'Generative AI',
                description: 'Interactive AI tutors create engaging, adaptive lessons',
                icon: '🤖'
              },
              {
                title: 'Tailored for Each Child',
                description: 'Curriculum evolves based on individual progress and interests',
                icon: '👧'
              }
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Parents Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah T.',
                review: 'The AI adapts perfectly to my son\'s learning style - he\'s thriving!',
                avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
              },
              {
                name: 'Michael R.',
                review: 'Finally a platform that truly personalizes learning for my kids',
                avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
              },
              {
                name: 'Emily C.',
                review: 'The adaptive curriculum keeps my daughter engaged and motivated',
                avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
              }
            ].map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{testimonial.name}</div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AfterSchool</h3>
              <p className="text-sm text-muted-foreground">
                Empowering kids through online learning
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
                <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}