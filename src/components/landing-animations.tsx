"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LandingAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const disposers: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("section, .grid");
      const scaleCards = gsap.utils.toArray<HTMLElement>(".scale-card");

      sections.forEach((section) => {
        const reveals = section.querySelectorAll(".reveal");

        if (reveals.length > 0) {
          gsap.to(reveals, {
            scrollTrigger: {
              trigger: section,
              start: "top 65%"
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.2
          });
        }
      });

      scaleCards.forEach((card) => {
        card.style.willChange = "transform";

        const onEnter = () => {
          gsap.to(card, { y: -8, scale: 1.02, duration: 0.35, ease: "power2.out" });
        };

        const onLeave = () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: "power2.out" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        disposers.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    });

    return () => {
      disposers.forEach((dispose) => dispose());
      ctx.revert();
    };
  }, []);

  return null;
}
