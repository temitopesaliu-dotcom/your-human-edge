import { StarIcon } from "./Icons";
import { tracks } from "./business-architect.data";

export default function CurriculumSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow" style={{ textAlign: "center" }}>
          The curriculum
        </div>
        <h2 className="section-h2" style={{ textAlign: "center" }}>
          Six tracks. <em>Six transformations.</em>
        </h2>
        <p
          className="section-sub"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          Not a syllabus. Not a calendar. Six areas of mastery — each one
          leaving you with something real you can use immediately.
        </p>
        <div className="tracks-grid">
          {tracks.map((track) => (
            <div className="track" key={track.num}>
              <div className="track-num">{track.num}</div>
              <div className="track-title">{track.title}</div>
              <div className="track-desc">{track.desc}</div>
            </div>
          ))}
          <div className="track track-bonus">
            <div className="bonus-badge">
              <StarIcon />
              Accelerator Exclusive — The Unfair Advantage
            </div>
            <div className="track-title">
              The <em>Invisible</em> Operator
            </div>
            <div className="track-desc">
              Your AI clone. Your voice. A faceless content presence built
              in parallel to your personal brand — posting, teaching,
              attracting — without requiring your face or your hours every
              single time. While others are manually creating content
              piece by piece, you have a system that runs on its own. This
              track is not part of the core six. It is the layer that
              separates the architects who scale from those who stay at
              capacity.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
