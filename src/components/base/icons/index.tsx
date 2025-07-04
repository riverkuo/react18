const Icon = ({ children, style }: { children: React.ReactNode; style?: React.SVGProps<SVGSVGElement> }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-white)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...style}
      >
        {children}
      </svg>
    </div>
  );
};

export const InfoIcon = (style?: React.SVGProps<SVGSVGElement>) => (
  <Icon style={style}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </Icon>
);

export const DeleteIcon = (style?: React.SVGProps<SVGSVGElement>) => (
  <Icon style={style}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </Icon>
);

export const EditIcon = (style?: React.SVGProps<SVGSVGElement>) => (
  <Icon style={style}>
    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
  </Icon>
);
