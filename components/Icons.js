const paths = {
  phone:
    'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2',
  cart: 'M3 4h2.5l2.2 10.2a2 2 0 002 1.6h7.6a2 2 0 001.9-1.4L21 8H6.2M10 20.5h.01M17 20.5h.01',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  truck: 'M3 6h11v10H3zM14 10h4l3 3v3h-7M7.5 19.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM17.5 19.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z',
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
  minus: 'M5 12h14',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v6M12 7.5h.01',
  alert: 'M12 3l10 18H2zM12 10v5M12 18h.01',
  wood: 'M4 6h16v12H4zM4 10c4-2 8 2 16 0M4 14c4 2 10-2 16 0',
  jar: 'M8 3h8v3H8zM7 6h10a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2zM9 12h6',
  handshake: 'M3 12l4-4 4 2 3-2 3 1 4 3M7 8l-4 7 4 3 3-1 3 2 4-3 4-3M10 17l2-2M13 19l2-2',
  bank: 'M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18',
  cash: 'M3 7h18v10H3zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM6 10v4M18 10v4',
  box: 'M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8',
  facebook: 'M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z',
};

export default function Icon({ name, className = 'h-6 w-6', strokeWidth = 2 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
