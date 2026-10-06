import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { after } from 'next/server';
import Link from 'next/link';
import { getResult } from '@/lib/efp/store';
import { sendMetaEvent } from '@/lib/services/meta-capi';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { EFP_CSS } from '../efp-styles';
import ResultsView from './results-view';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Expert Framework Profile Results Page',
  robots: { index: false, follow: false, nocache: true },
};

export default async function ResultsPage() {
  const code = (await cookies()).get('efp_r')?.value || '';
  const record = code ? await getResult(code) : null;

  if (!record) {
    return (
      <div className="efp">
        <style dangerouslySetInnerHTML={{ __html: EFP_CSS }} />
        <div className="efp-res">
          <div className="efp-hello"><h1>We couldn&apos;t find your results on this device.</h1></div>
          <p className="efp-why">Open the link in the email we sent you, or take the profile again. It takes about five minutes.</p>
          <Link className="efp-btn" href="/expert-framework-profile">Take the profile</Link>
        </div>
      </div>
    );
  }

  const eventId = `efp_view_${record.submissionId}`;
  const h = await headers();
  after(() => sendMetaEvent({
    eventName: 'ViewContent',
    eventId,
    eventSourceUrl: 'https://temitopesaliu.com/expert-framework-profile/results',
    clientIp: getClientIp(h),
    userAgent: h.get('user-agent') || undefined,
    customData: { content_name: 'Expert Framework Profile Results Page' },
  }));

  return (
    <div className="efp">
      <style dangerouslySetInnerHTML={{ __html: EFP_CSS }} />
      <ResultsView record={record} viewEventId={eventId} />
    </div>
  );
}
