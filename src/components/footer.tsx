import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="connect">
        {/* Updated: moved mail icon before Twitter/X icon */}
        <a href="mailto:example@example.com">
          <i className="mail-icon"></i>
        </a>
        <a href="https://twitter.com/example">
          <i className="twitter-icon"></i>
        </a>
        <a href="https://x.com/example">
          <i className="x-icon"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;