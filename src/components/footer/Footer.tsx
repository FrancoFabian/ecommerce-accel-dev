'use client';
import { DarkIcon } from "@/icons/DarkIcon";
import { FacebookIcon } from "@/icons/FacebookIcon";
import { LightIcon } from "@/icons/LightIcon";
import { NewsletterSubscription } from "./NewsletterSubscription";
import './footer.css'

const redesSociales= [
    {
        icon: FacebookIcon,
        link: 'https://www.facebook.com/grupoaccel/',
        alt: 'Facebook',
        name: 'Facebook',
    }
]
export const Footer = () => {
    const handleSubscription = (email: string) => {
        // Aquí puedes implementar la lógica para manejar la suscripción.
        // Por ejemplo, enviar el correo a tu backend o a una API.
        console.log("Correo electrónico suscrito:", email);
        alert(`¡Gracias por suscribirte, ${email}!`);
      };
    
    return (
        <div className="lg:block hidden md:block sm:block px-6 pb-8 pt-16 
        lg:px-8 w-full lg:pt-32">
            <div className="xl:grid xl:grid-cols-2 xl:gap-8">
                {/* Left Section */}
                <div className="space-y-8 md:pr-8">
                    <div className="flex items-center justify-start">
                        <svg fill="none" height="44" viewBox="0 0 32 32" width="44">
                            <path
                                clipRule="evenodd"
                                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                        <span className="text-md font-md">ACME</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique.
                    </p>
                    <div className="flex space-x-6">
                        {redesSociales.map((platform) => (
                            <a
                                key={platform.link}
                                className="relative inline-flex items-center text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                                href={platform.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">{platform.name}</span>
                                <platform.icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Services & Support Section */}
                <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-small font-semibold text-default-600">Services</h3>
                            <ul className="mt-6 space-y-4">
                                {['Branding', 'Data Analysis', 'E-commerce Solutions', 'Market Research'].map(
                                    (service, index) => (
                                        <li key={index}>
                                            <a
                                                className="relative inline-flex items-center text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                                                href="#"
                                            >
                                                {service}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0">
                            <h3 className="text-small font-semibold text-default-600">Support</h3>
                            <ul className="mt-6 space-y-4">
                                {['Pricing Plans', 'User Guides', 'Tutorials', 'Service Status'].map(
                                    (support, index) => (
                                        <li key={index}>
                                            <a
                                                className="relative inline-flex items-center text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                                                href="#"
                                            >
                                                {support}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* About Us & Legal Section */}
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-small font-semibold text-default-600">About Us</h3>
                            <ul className="mt-6 space-y-4">
                                {[
                                    'Our Story',
                                    'Latest News',
                                    'Career Opportunities',
                                    'Media Enquiries',
                                    'Collaborations',
                                ].map((about, index) => (
                                    <li key={index}>
                                        <a
                                            className="relative inline-flex items-center text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                                            href="#"
                                        >
                                            {about}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0">
                            <h3 className="text-small font-semibold text-default-600">Legal</h3>
                            <ul className="mt-6 space-y-4">
                                {['Claim', 'Privacy', 'Terms', 'User Agreement'].map((legal, index) => (
                                    <li key={index}>
                                        <a
                                            className="relative inline-flex items-center text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                                            href="#"
                                        >
                                            {legal}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <NewsletterSubscription onSubscribe={handleSubscription} />

            {/* Footer Bottom */}
            <hr
                className="shrink-0 bg-divider border-none w-full h-divider mt-16 sm:mt-20 lg:mt-24"
                role="separator"
            />
            <div className="flex flex-wrap justify-between gap-2 pt-8">
                {/* Copyright Text */}
                <p className="text-small text-default-400">© 2024 Acme Inc. All rights reserved.</p>

                {/* Theme Selector */}
                <div
                    className="relative flex flex-col gap-2"
                    aria-label="Select a theme"
                    role="radiogroup"
                    aria-orientation="horizontal"
                >
                    <div className="flex flex-wrap gap-0 items-center flex-row">
                        {/* Dark Theme */}
                        <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2">
                            <input
                                type="radio"
                                name="theme"
                                value="dark"
                                className="sr-only"
                                defaultChecked
                            />
                            <div
                                aria-hidden="true"
                                className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-medium box-border h-8 w-8 rounded-full border-black border-opacity-10 group-data-[hover-unselected=true]:bg-default-100 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[selected=true]:border-primary bg-default-200 dark:bg-default-100 transition-transform-colors"
                            >
                                <DarkIcon className="text-default-500" />
                            </div>
                        </label>

                        {/* Light Theme */}
                        <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2">
                            <input type="radio" name="theme" value="light" className="sr-only" />
                            <div
                                aria-hidden="true"
                                className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-medium box-border h-8 w-8 rounded-full border-black border-opacity-10 group-data-[hover-unselected=true]:bg-default-100 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[selected=true]:border-primary transition-transform-colors"
                            >
                                <LightIcon className="text-default-500" />
                            </div>
                        </label>

                        {/* System Theme */}
                        <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2">
                            <input type="radio" name="theme" value="system" className="sr-only" />
                            <div
                                aria-hidden="true"
                                className="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden border-solid border-medium box-border h-8 w-8 rounded-full border-black border-opacity-10 group-data-[hover-unselected=true]:bg-default-100 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[selected=true]:border-primary transition-transform-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="img"
                                    className="text-default-500"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M2 10c0-3.771 0-5.657 1.172-6.828S6.229 2 10 2h4c3.771 0 5.657 0 6.828 1.172S22 6.229 22 10v1c0 2.828 0 4.243-.879 5.121C20.243 17 18.828 17 16 17H8c-2.828 0-4.243 0-5.121-.879C2 15.243 2 13.828 2 11z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        d="M16 22H8m4-5v5m10-9H2"
                                    />
                                </svg>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

}