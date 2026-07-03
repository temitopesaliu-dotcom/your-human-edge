'use client';

const TIME_ZONES = [
  { label: 'UK (BST)', time: '16:00 (4 PM)', gold: true },
  { label: 'GMT / UTC', time: '15:00 (3 PM)', gold: false },
  { label: 'Lagos (WAT)', time: '16:00 (4 PM)', gold: false },
  { label: 'Johannesburg (CAT)', time: '17:00 (5 PM)', gold: false },
  { label: 'Nairobi (EAT)', time: '18:00 (6 PM)', gold: false },
  { label: 'Mumbai (IST)', time: '20:30 (8:30 PM)', gold: false },
  { label: 'New York (EDT)', time: '11:00 (11 AM)', gold: false },
  { label: 'Chicago (CDT)', time: '10:00 (10 AM)', gold: false },
  { label: 'Los Angeles (PDT)', time: '08:00 (8 AM)', gold: false },
  { label: 'Sydney (AEST)', time: '01:00 (1 AM) next day', gold: false },
];

export default function PaymentSuccessfulClient() {
  return (
    <div className="bg-[#F6F1E4] font-['Literata',Georgia,serif] min-h-dvh flex items-center justify-center p-5">
      <div className="max-w-[620px] w-full bg-[#14171F] text-[#F6F1E4] rounded-[20px] px-10 py-12 pb-10 text-center border border-[rgba(242,169,60,0.3)] shadow-[0_20px_60px_rgba(20,23,31,0.5)]">

        {/* Check icon */}
        <div
          className="w-20 h-20 rounded-full bg-[#2E7D5B] flex items-center justify-center mx-auto mb-6 border-[3px] border-[#F2A93C]"
          aria-hidden
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#F6F1E4" strokeWidth="3">
            <polyline points="4 13 9 18 20 7" />
          </svg>
        </div>

        <h1 className="font-['Anton',sans-serif] text-[34px] tracking-[1px] uppercase text-[#F2A93C] mb-2">
          Payment Confirmed
        </h1>

        <p className="font-['Literata',serif] italic text-base text-[rgba(246,241,228,0.7)] mb-7">
          You&apos;re in. See you at the live class.
        </p>

        <div className="w-[60px] h-[2px] bg-[#F2A93C] mx-auto mb-6 opacity-50" aria-hidden />

        <p className="text-base leading-[1.7] text-[rgba(246,241,228,0.9)]">
          A confirmation email has been sent to your inbox.
          <br />
          Your training will take place on{' '}
          <strong className="text-[#F2A93C] font-semibold">July 12, 2026</strong> at{' '}
          <strong className="text-[#F2A93C] font-semibold">4:00 PM (UK time)</strong>
          <span className="block text-[14px] text-[rgba(246,241,228,0.5)] mt-1">
            (15:00 GMT / UTC)
          </span>
        </p>

        {/* Time zone grid */}
        <div className="grid grid-cols-2 gap-[10px_20px] my-6 mb-7 text-left bg-white/[0.04] rounded-[12px] p-[18px_22px] border border-[rgba(246,241,228,0.08)]">
          {TIME_ZONES.map((tz) => (
            <div key={tz.label}>
              <span className="font-['Oswald',sans-serif] text-[11px] tracking-[1px] uppercase text-[rgba(246,241,228,0.4)]">
                {tz.label}
              </span>
              <div className={`font-['IBM_Plex_Mono',monospace] text-[14px] font-medium ${tz.gold ? 'text-[#F2A93C]' : 'text-[#F6F1E4]'}`}>
                {tz.time}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-[rgba(246,241,228,0.4)] italic border-t border-[rgba(246,241,228,0.06)] pt-5 mt-[6px]">
          A calendar invite with the link will follow shortly.
        </p>
      </div>
    </div>
  );
}
