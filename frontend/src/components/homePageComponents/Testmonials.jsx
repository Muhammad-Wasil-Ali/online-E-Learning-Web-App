import React, { useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Testmonials = () => {
  const scrollRef = useRef(null);
  const testimonials = [
    {
      id: 1,
      quote:
        "EduSpark completely transformed my career. I went from retail to a full-time developer in 6 months!",
      name: "Sarah K.",
      role: "Frontend Developer at Shopify",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    },
    {
      id: 2,
      quote:
        "The project-based learning approach helped me build a portfolio that got me multiple job offers.",
      name: "Michael T.",
      role: "UX Designer at Google",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      quote:
        "As a busy mom, I appreciated the flexible schedule. Finished courses during nap times!",
      name: "Priya M.",
      role: "Data Analyst at Netflix",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 4,
      quote:
        "The instructors are top-notch. Felt like 1:1 mentorship even in group courses.",
      name: "David R.",
      role: "Backend Engineer at Stripe",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 5,
      quote:
        "Worth every penny. The salary increase paid for the courses in just 3 months.",
      name: "Jessica L.",
      role: "Product Manager at Microsoft",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-lg text-gray-600">
            Hear from our students around the world
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full border-gray-300 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full border-gray-300 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 pb-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 snap-start"
            >
              <div className="bg-white p-8 rounded-xl shadow-sm h-full border border-gray-100 hover:shadow-md transition-all">
                <Quote className="text-gray-200 w-8 h-8 mb-4" />
                <p className="text-gray-700 text-lg mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-primary transition-colors"
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
