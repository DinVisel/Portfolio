import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { contact, contactChannels, profile } from "@/content/portfolio";
import { accentText } from "@/lib/accent";

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

            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-lg font-body-md text-on-primary font-bold hover:brightness-105 transition-all active:scale-95"
            >
              <Icon name="mail" />
              {profile.email}
            </a>
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-4">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  channel.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="glass-card rounded-xl p-5 flex items-center gap-4 group"
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high border border-outline-variant/10">
                  <Icon name={channel.icon} className={accentText[channel.accent]} />
                </span>
                <div className="flex-grow">
                  <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    {channel.label}
                  </div>
                  <div className="font-body-md text-body-md text-on-surface">
                    {channel.value}
                  </div>
                </div>
                <Icon
                  name="north_east"
                  className="text-on-surface-variant group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
