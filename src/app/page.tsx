import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Edit3 } from 'lucide-react'
import { Logo } from '@/components/icons'
import Image from 'next/image'

export default function HomePage() {
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='container z-40 bg-background'>
				<div className='flex h-20 items-center justify-between py-6'>
					<Link href='/' className='flex items-center space-x-2'>
						<Logo className='h-8 w-8' />
						<span className='text-2xl font-bold'>ProfileCard</span>
					</Link>
					<nav>
						<Button asChild>
							<Link href='/dashboard'>
								Get Started <ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</nav>
				</div>
			</header>
			<main className='flex-1'>
				<section className='container py-12 md:py-24 lg:py-32'>
					<div className='grid gap-10 lg:grid-cols-2 lg:gap-20 items-center'>
						<div className='space-y-6'>
							<h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl'>
								Create Your Professional Digital Resume
							</h1>
							<p className='text-lg text-muted-foreground md:text-xl'>
								ProfileCard helps you build a stunning online resume to share
								with employers and showcase your skills and experience
								effectively.
							</p>
							<ul className='space-y-3 text-md text-muted-foreground'>
								<li className='flex items-center'>
									<CheckCircle className='mr-2 h-5 w-5 text-primary' />
									Easy profile creation and customization.
								</li>
								<li className='flex items-center'>
									<CheckCircle className='mr-2 h-5 w-5 text-primary' />
									Shareable unique URL for your profile.
								</li>
								<li className='flex items-center'>
									<CheckCircle className='mr-2 h-5 w-5 text-primary' />
									AI-powered skill suggestions to enhance your profile.
								</li>
							</ul>
							<div className='flex flex-col gap-4 sm:flex-row'>
								<Button size='lg' asChild>
									<Link href='/dashboard'>
										Create Your Profile <ArrowRight className='ml-2 h-5 w-5' />
									</Link>
								</Button>
								<Button size='lg' variant='outline' asChild>
									<Link href='/profile/sample-user'>View Sample Profile</Link>
								</Button>
							</div>
						</div>
						<div className='rounded-xl shadow-2xl overflow-hidden'>
							<Image
								src='https://placehold.co/600x400.png'
								alt='ProfileCard Example'
								width={600}
								height={400}
								className='w-full h-auto object-cover'
								data-ai-hint='resume professional'
							/>
						</div>
					</div>
				</section>

				<section className='bg-muted py-12 md:py-24'>
					<div className='container'>
						<h2 className='text-3xl font-bold text-center mb-10'>
							How It Works
						</h2>
						<div className='grid gap-8 md:grid-cols-3'>
							<div className='flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg'>
								<div className='p-4 bg-primary rounded-full text-primary-foreground mb-4'>
									<Edit3 className='h-8 w-8' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>
									1. Create Profile
								</h3>
								<p className='text-muted-foreground'>
									Sign up and fill in your details, experience, skills, and
									education.
								</p>
							</div>
							<div className='flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg'>
								<div className='p-4 bg-primary rounded-full text-primary-foreground mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='32'
										height='32'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10' />
										<path d='M14 2v4a2 2 0 0 0 2 2h4' />
										<path d='M10.4 12.6a2 2 0 1 1 3 3L8.8 21l-1.6.3.4-1.5Z' />
									</svg>
								</div>
								<h3 className='text-xl font-semibold mb-2'>2. Customize</h3>
								<p className='text-muted-foreground'>
									Use AI suggestions for skills and customize the look and feel
									of your profile.
								</p>
							</div>
							<div className='flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg'>
								<div className='p-4 bg-primary rounded-full text-primary-foreground mb-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='32'
										height='32'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72' />
										<path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72' />
									</svg>
								</div>
								<h3 className='text-xl font-semibold mb-2'>3. Share</h3>
								<p className='text-muted-foreground'>
									Get a unique link to share your professional profile with
									anyone.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className='py-6 md:px-8 md:py-0 border-t'>
				<div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
					<p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
						© {new Date().getFullYear()} ProfileCard. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	)
}
