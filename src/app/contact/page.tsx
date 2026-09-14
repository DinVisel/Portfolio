import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import Magnetic from "@/components/motion/Magnetic";
import Stagger from "@/components/motion/Stagger";
import ContactChannelCard from "@/components/ContactChannelCard";
import { contact, contactChannels, profile } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Contact | Arda Özcan",
  description: "Get in touch with Arda Özcan for freelance work and opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Intro */}
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
              {"// get_in_touch"}
            </span>
            <h1 className="font-headline-lg text-headline-lg md:text-headline-xl md:font-headline-xl text-on-surface mt-3">
              {contact.heading}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mt-5">
              {contact.intro}
            </p>

            <div className="mt-8 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary subtle-pulse"></span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                {profile.availability}
              </span>
            </div>

            <Magnetic className="mt-8">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-lg font-body-md text-on-primary font-bold hover:brightness-105 transition-all active:scale-95"
              >
                <Icon name="mail" />
                {profile.email}
              </a>
            </Magnetic>
          </div>

          {/* Channels */}
          <Stagger className="flex flex-col gap-4" each={60} preserveTransform>
            {contactChannels.map((channel) => (
              <ContactChannelCard key={channel.label} channel={channel} />
            ))}
          </Stagger>
        </div>
      </main>
      <Footer />
    </>
  );
}
