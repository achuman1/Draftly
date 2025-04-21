import React from "react";
import Link from "next/link";

export default function Landing() {
	return (
		<div className="font-inter">
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
					<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] p-10">
						<img
							src="/static/landing.jpeg"
							width="550"
							height="550"
							alt="Agreemint Hero"
							className="object-cover mx-auto overflow-hidden aspect-video rounded-xl sm:w-full lg:order-last lg:aspect-square"
						/>
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									Simplify Legal Agreements with Draftly
								</h1>
								<p className="max-w-[600px] text-muted-foreground md:text-xl">
									Streamline your contract management process
									with our AI-powered agreement generation,
									digital signing, and document management
									features.
								</p>
							</div>
								<Link
									href="#"
									className="inline-flex items-center justify-center w-48 h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary-foreground text-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									Get Started
								</Link>
						</div>
					</div>
			</section>
			<section
				id="features"
				className="w-full py-12 md:py-24 lg:py-32 bg-bgmint"
			>
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block px-3 py-1 text-sm rounded-lg text-primary">
								Key Features
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Streamline Your Legal Workflow
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Draftly offers a suite of powerful features to
								help you create, manage, and sign legal
								agreements with ease.
							</p>
						</div>
					</div>
					<div className="grid items-center max-w-5xl gap-6 py-12 mx-auto lg:grid-cols-2 lg:gap-12">
						<div className="flex flex-col justify-center space-y-4">
							<ul className="grid gap-6">
								<li>
									<div className="grid gap-1">
										<h3 className="text-xl font-bold text-primary">
											AI-Powered Agreement Generation
										</h3>
										<p className="text-muted-foreground">
											Create custom legal agreements with
											our intuitive document builder and
											AI-powered templates.
										</p>
									</div>
								</li>
								<li>
									<div className="grid gap-1">
										<h3 className="text-xl font-bold text-primary">
											Digital Signing
										</h3>
										<p className="text-muted-foreground">
											Securely sign agreements with our
											built-in e-signature tools,
											eliminating the need for physical
											paperwork.
										</p>
									</div>
								</li>
								<li>
									<div className="grid gap-1">
										<h3 className="text-xl font-bold text-primary">
											Document Management
										</h3>
										<p className="text-muted-foreground">
											Store, organize, and access all your
											legal documents in one centralized
											platform.
										</p>
									</div>
								</li>
							</ul>
						</div>
						<img
							src="/placeholder.svg"
							width="550"
							height="310"
							alt="Agreemint Features"
							className="object-cover object-center mx-auto overflow-hidden aspect-video rounded-xl sm:w-full lg:order-last"
						/>
					</div>
			</section>
		</div>
	);
}
