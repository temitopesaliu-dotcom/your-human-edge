import { ArrowIcon, CheckIcon, StarIcon, UsersIcon, UserIcon, ShieldIcon } from "./Icons";
import { ACCELERATOR_HREF } from "./business-architect.data";

export default function AcceleratorTier() {
  return (
    <div className="tier featured">
      <div className="tier-top">
        <div className="tier-badge p">
          <StarIcon />
          The Accelerator
        </div>
        <div className="tier-name">
          The <em>Accelerator</em>
        </div>
        <div className="tier-for">
          You are a domain expert — exceptional at what you do, but
          the building side is not yours. You bring one technical
          person with you. They learn the implementation. You lead
          the business, the clients, the strategy. Together you are
          a complete consulting unit. This tier is also for those
          who want to reach their first client faster — with direct
          support behind every critical step.
        </div>
        <div className="tier-price-row">
          <div className="tier-price">$997</div>
          <div className="tier-price-cross">$1,497</div>
        </div>
        <div className="tier-note">
          <strong>Founding Cohort pricing ends Tuesday.</strong>{" "}
          Reverts to $1,497 after 72 hours.
        </div>
        <a href={ACCELERATOR_HREF} className="tier-btn p">
          Join as The Accelerator <ArrowIcon />
        </a>
      </div>
      <div className="tier-body">
        <div className="tier-section-lbl">
          Everything in The Builder, plus
        </div>

        <div className="builder-seat">
          <div className="bs-lbl">
            <UsersIcon />
            The Builder Seat
          </div>
          <div className="bs-title">
            Bring your technical co-builder
          </div>
          <div className="bs-body">
            One person joins the full six-week programme alongside
            you. They learn the implementation side while you build
            the business side. You graduate as a team — a domain
            expert and a builder who speak the same language and
            share the same system.
          </div>
          <div className="bs-math">
            Two people. One programme. One investment of{" "}
            <strong>$997</strong> — rather than two separate seats at
            $597 each plus the Accelerator extras. The Builder Seat
            is included because the best Business Architects do not
            build alone.
          </div>
        </div>

        <div className="tier-section-lbl">
          Two private strategy sessions
        </div>
        <div className="sessions">
          <div className="srow">
            <div className="sicon pu">
              <UserIcon />
            </div>
            <div>
              <div className="stitle">Opening strategy session</div>
              <div className="sdesc">
                Your Intelligence Layer mapped to your specific
                market opportunity. Your offer, your positioning,
                your first 90 days — built before the programme
                begins so you start with clarity, not questions.
              </div>
            </div>
          </div>
          <div className="srow">
            <div className="sicon gr">
              <UsersIcon />
            </div>
            <div>
              <div className="stitle">Track expert session</div>
              <div className="sdesc">
                Targeted implementation support from the domain
                expert who teaches your specific track — delivered
                at the point in the programme where you need it
                most. Not a generalist session. Exact help for your
                exact situation.
              </div>
            </div>
          </div>
        </div>

        <div className="tier-section-lbl">
          Additional Accelerator benefits
        </div>
        <div className="tf pu">
          <CheckIcon />
          <span>
            Personal review of your first client proposal and AI
            Operating System architecture before it goes out
          </span>
        </div>
        <div className="tf pu">
          <CheckIcon />
          <span>
            Priority feedback — questions answered within 24 hours
          </span>
        </div>
        <div className="tf pu">
          <CheckIcon />
          <span>
            <strong>The Invisible Operator track</strong> — AI clone,
            voice, and faceless content presence
          </span>
        </div>

        <div className="soft-assurance">
          <div className="sa-lbl">
            <ShieldIcon />
            You do not figure out the first client alone
          </div>
          <div className="sa-title">
            Your proposal gets reviewed before it goes out.
          </div>
          <div className="sa-body">
            Your pitch gets sharpened before you walk in. The
            discovery, the scope, the close — the private sessions
            and the personal proposal review exist specifically for
            this moment. Accelerator members arrive at their first
            client conversation prepared, not hopeful.
          </div>
        </div>
      </div>
    </div>
  );
}
