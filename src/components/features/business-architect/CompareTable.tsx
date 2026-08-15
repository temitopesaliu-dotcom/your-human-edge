import { Fragment } from "react";
import { CheckIcon, DashIcon } from "./Icons";
import { compareRows } from "./business-architect.data";

export default function CompareTable() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="eyebrow" style={{ textAlign: "center" }}>
          Full comparison
        </div>
        <h2 className="section-h2" style={{ textAlign: "center" }}>
          Side by side. <em>Full picture.</em>
        </h2>
        <table className="compare-table">
          <thead>
            <tr>
              <th></th>
              <th className="bc">The Builder · $597</th>
              <th className="ac">The Accelerator · $997</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <Fragment key={row.label}>
                {row.section && (
                  <tr className="sec-row">
                    <td colSpan={3}>{row.section}</td>
                  </tr>
                )}
                <tr>
                  <td>{row.label}</td>
                  <td>
                    {row.builder ? (
                      <span className="ck">
                        <CheckIcon />
                      </span>
                    ) : (
                      <span className="ds">
                        <DashIcon />
                      </span>
                    )}
                  </td>
                  <td>
                    {row.accelerator ? (
                      <span className="ck-pu">
                        <CheckIcon />
                      </span>
                    ) : (
                      <span className="ds">
                        <DashIcon />
                      </span>
                    )}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
