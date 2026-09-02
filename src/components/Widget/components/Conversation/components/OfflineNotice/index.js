import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const OfflineNotice = ({ faqUrl, ticketUrl }) => (
  <main className="rw-offline-notice" aria-labelledby="rw-offline-title">
    <div className="rw-offline-message">
      <h2 id="rw-offline-title">We’re improving your experience</h2>
      <p>
        This is currently unavailable while we make some improvements. You can
        find answers in our FAQs or raise a support ticket.
      </p>
    </div>
    <div className="rw-offline-actions">
      <a href={faqUrl} target="_blank" rel="noopener noreferrer">View FAQs</a>
      <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
        Raise a support ticket
      </a>
    </div>
  </main>
);

OfflineNotice.propTypes = {
  faqUrl: PropTypes.string.isRequired,
  ticketUrl: PropTypes.string.isRequired
};

export default OfflineNotice;
