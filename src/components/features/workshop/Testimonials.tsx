"use client";

import { useState } from "react";
import { TESTIMONIALS } from "./testimonials.data";

export default function Testimonials() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="ws-testimonials-section ws-section">
      <div className="ws-container">
        <div className="ws-section-eyebrow">What past attendees say</div>
        <h2 className="ws-section-h2">
          Hear it from people who have sat in the room.
        </h2>
        <p className="ws-section-sub">
          Real reactions from people who walked in with expertise and walked
          out with a priced, built offer.
        </p>
        <div className="ws-testimonials-grid">
          {TESTIMONIALS.map((video) => (
            <div
              key={video.id}
              className={`ws-testimonial-card ws-testimonial-card--${video.aspect}`}
            >
              {playingId === video.id ? (
                <iframe
                  className="ws-testimonial-frame"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                  title="Workshop testimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="ws-testimonial-thumb"
                  onClick={() => setPlayingId(video.id)}
                  aria-label="Play testimonial video"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail host isn't registered with next/image */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    className="ws-testimonial-thumb-img"
                  />
                  <span className="ws-testimonial-play">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
