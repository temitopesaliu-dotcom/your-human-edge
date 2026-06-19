interface PromptCardProps {
  id: string;
  name: string;
  text: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export function PromptCard({ id, name, text, copiedId, onCopy }: PromptCardProps) {
  const isCopied = copiedId === id;

  return (
    <div className="as-prompt">
      <div className="as-prompt-top">
        <span className="as-prompt-name">{name}</span>
        <button
          type="button"
          className={`as-copybtn${isCopied ? ' copied' : ''}`}
          onClick={() => onCopy(text, id)}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}
