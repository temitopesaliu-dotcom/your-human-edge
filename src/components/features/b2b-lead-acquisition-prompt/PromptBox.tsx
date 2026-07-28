import { PROMPT_TEXT } from "./b2b-prompt.data";

interface PromptBoxProps {
  copied: boolean;
  onCopy: () => void;
}

export default function PromptBox({ copied, onCopy }: PromptBoxProps) {
  return (
    <div className="b2b-prompt-box">
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        marginBottom: '1.2rem', flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{
            fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em',
            textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 4,
          }}>
            The master prompt
          </div>
          <p style={{ fontSize: '.82rem', color: 'var(--soft)', margin: 0, lineHeight: 1.6 }}>
            Fill in the 8 bracketed fields. Paste into any AI assistant.
          </p>
        </div>
        <button
          onClick={onCopy}
          className="b2b-copy-btn"
          style={{
            fontSize: '.82rem', fontWeight: 600,
            padding: '10px 22px',
            border: copied ? '1.5px solid var(--teal)' : '1.5px solid var(--border)',
            borderRadius: 40,
            background: copied ? 'rgba(15,110,86,.08)' : '#fff',
            color: copied ? 'var(--teal)' : 'var(--ink)',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.2s',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? '✓ Copied!' : 'Copy prompt'}
        </button>
      </div>

      <pre className='b2b-prompt-pre' style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1.6rem 1.8rem',
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 12.5,
        color: 'var(--soft)',
        lineHeight: 1.9,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        margin: 0,
        overflow: 'auto',
        maxHeight: 560,
      }}>
        {PROMPT_TEXT}
      </pre>
    </div>
  );
}
