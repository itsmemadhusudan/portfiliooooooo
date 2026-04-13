"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type ContactFormProps = {
  phoneDisplay: string;
};

function digitsForLinks(phone: string) {
  return phone.replace(/\D/g, "");
}

export function ContactForm({ phoneDisplay }: ContactFormProps) {
  const modalTitleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const waDigits = digitsForLinks(phoneDisplay);
  const whatsappUrl = `https://wa.me/${waDigits}`;
  const viberUrl = `viber://chat?number=${encodeURIComponent(waDigits)}`;
  const telHref = `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`;

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, closeModal]);

  return (
    <div className="contactFormWrap">
      <div className="maintenanceBanner" role="status">
        <strong>Form under maintenance</strong>
        <p>
          The contact form is temporarily unavailable. Please reach me by phone,{" "}
          <strong>Viber</strong>, or <strong>WhatsApp</strong> using the number below.
        </p>
      </div>

      <div className="contactForm contactForm--disabled" aria-hidden="true">
        <div className="fieldGrid">
          <label className="field">
            <span>Name</span>
            <input disabled placeholder="Unavailable during maintenance" />
          </label>
          <label className="field">
            <span>Email</span>
            <input disabled type="email" placeholder="Unavailable during maintenance" />
          </label>
        </div>
        <label className="field">
          <span>Subject</span>
          <input disabled placeholder="Unavailable during maintenance" />
        </label>
        <label className="field">
          <span>Message</span>
          <textarea disabled rows={4} placeholder="Unavailable during maintenance" />
        </label>
      </div>

      <button type="button" className="btn btnPrimary sendBtn contactAltBtn" onClick={openModal}>
        Contact me on Viber or WhatsApp
      </button>

      {modalOpen && (
        <div
          className="contactModalOverlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="contactModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
          >
            <div className="contactModalHeader">
              <h4 id={modalTitleId}>Get in touch</h4>
              <button
                ref={closeRef}
                type="button"
                className="contactModalClose"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="contactModalLead">
              Please contact me using this number on <strong>Viber</strong> or{" "}
              <strong>WhatsApp</strong>, or call directly.
            </p>
            <p className="contactModalPhone">
              <a href={telHref}>{phoneDisplay}</a>
            </p>
            <div className="contactModalActions">
              <a className="btn btnPrimary" href={whatsappUrl} target="_blank" rel="noreferrer">
                Open WhatsApp
              </a>
              <a className="btn btnGhost contactModalViber" href={viberUrl}>
                Open Viber
              </a>
            </div>
            <p className="contactModalHint mutedText">
              If a link does not open, save the number and message me from your Viber or WhatsApp app.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
