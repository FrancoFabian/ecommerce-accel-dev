'use client';
import { JSX, useState } from 'react';

interface SectionProps {
  title: string;
  content?: JSX.Element;
}

export const ExpandableSection = ({ title, content }: SectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div data-open={isExpanded}>
      <h2 data-open={isExpanded}>
        <button
          className="flex py-4 w-full h-full gap-3 items-center tap-highlight-transparent outline-none transition-opacity focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          data-open={isExpanded}
          aria-controls={title.replace(/ /g, '')}
        >
          <div className="flex-1 flex flex-col text-start">
            <span className="text-large text-default-400" data-open={isExpanded}>
              {title}
            </span>
          </div>
          <span
            aria-hidden="true"
            className={`text-default-400 transition-transform ${
              isExpanded ? '-rotate-90' : 'rotate-0'
            }`}
            data-open={isExpanded}
          >
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              height="1em"
              role="presentation"
              viewBox="0 0 24 24"
              width="1em"
            >
              <path
                d="M15.5 19l-7-7 7-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </button>
      </h2>
      {isExpanded && content && (
        <section
          style={{ willChange: 'auto', opacity: 1, height: 'auto', overflowY: 'unset' }}
        >
          <div
            className="py-2 pt-0 pb-6 text-base text-default-500"
            id={title.replace(/ /g, '')}
            role="region"
            aria-labelledby={title.replace(/ /g, '')}
          >
            {content}
          </div>
        </section>
      )}
    </div>
  );
};