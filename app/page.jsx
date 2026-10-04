import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <div className="grid-background" aria-hidden="true" />
      <HeroSection />

      <section className="w-full bg-slate-50/80 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="toolkit-reveal mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
              Your career toolkit
            </p>
            <h2 className="toolkit-reveal [--reveal-delay:100ms] mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-[1.12] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Powerful tools for your next{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                career move
              </span>
            </h2>
            <p className="toolkit-reveal [--reveal-delay:200ms] mx-auto mt-5 max-w-6xl text-pretty text-base leading-7 tracking-[0.005em] text-slate-600 sm:text-lg sm:leading-8">
              Explore opportunities, build a standout resume, and prepare for
              interviews with personalized AI guidance.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                style={{ "--reveal-delay": `${250 + index * 100}ms` }}
                className="toolkit-reveal group h-full rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/[0.07]"
              >
                <CardContent className="flex h-full flex-col items-center px-6 py-7 text-center sm:items-start sm:text-left">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:bg-blue-100">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-muted-foreground">Industries Covered</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="text-muted-foreground">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-muted-foreground">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full overflow-hidden bg-gradient-to-b from-white to-blue-50/60 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="toolkit-reveal mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
              Your path forward
            </p>
            <h2 className="mb-4 text-balance text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Four simple steps to turn your career goals into your next opportunity.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
            {howItWorks.map((item, index) => (
              <Card
                key={index}
                style={{ "--reveal-delay": `${150 + index * 120}ms` }}
                className="toolkit-reveal group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/[0.07]"
              >
                <CardContent className="flex h-full flex-col items-center px-6 py-7 text-center sm:items-start sm:text-left">
                  <div className="mb-6 flex w-full items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-100">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold tracking-[0.16em] text-blue-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-primary/20"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-primary">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-muted-foreground italic relative">
                        <span className="text-3xl text-primary absolute -top-4 -left-2">
                          &quot;
                        </span>
                        {testimonial.quote}
                        <span className="text-3xl text-primary absolute -bottom-4">
                          &quot;
                        </span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50/80 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="toolkit-reveal mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-sm">
              Here to help
            </p>
            <h2 className="mb-4 text-balance text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Find answers to common questions and learn how Saarathi can support
              your career journey.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" className="flex w-full flex-col gap-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  style={{ "--reveal-delay": `${120 + index * 90}ms` }}
                  className="toolkit-reveal rounded-2xl border border-slate-200/80 bg-white px-5 shadow-sm shadow-slate-900/[0.03] transition-all duration-200 hover:border-blue-200 hover:shadow-md hover:shadow-blue-950/[0.05] sm:px-6"
                >
                  <AccordionTrigger className="items-center gap-4 py-5 text-base font-semibold text-slate-900 hover:no-underline sm:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-sm leading-7 text-slate-600 sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto py-24 bg-gradient-to-t from-blue-500 to-background/250">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-black/80 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 mt-5 animate-bounce"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
