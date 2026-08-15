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
              <div className="track-benefit">{track.benefit}</div>
              <div className="track-desc">{track.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
