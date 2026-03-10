import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import styles from "./MessageModal.module.css";

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function MessageModal({ isOpen, onClose }) {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    const firstInputRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            firstInputRef.current?.focus();
        });

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!to.trim()) return setError("Por favor ingresa el correo del destinatario.");
        if (!isValidEmail(to.trim())) return setError("El correo no es válido.");
        if (!subject.trim()) return setError("Por favor ingresa el asunto.");
        if (!body.trim()) return setError("Por favor ingresa el mensaje.");

        const gmailComposeUrl =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            `&to=${encodeURIComponent(to.trim())}` +
            `&su=${encodeURIComponent(subject.trim())}` +
            `&body=${encodeURIComponent(body.trim())}`;

        window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
        onClose();
    };

    return createPortal(
        <div className={styles.overlay} onMouseDown={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <header className={styles.header}>
                    <h2 className={styles.title}>Enviar Mensaje</h2>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        <X size={20} />
                    </button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Destinatario</label>
                        <input
                            ref={firstInputRef}
                            className={styles.input}
                            type="email"
                            placeholder="ejemplo@gmail.com"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Asunto</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="¿De qué trata?"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Mensaje</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Escribe tu mensaje aquí..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={5}
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.secondary}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button type="submit" className={styles.primary}>
                            <Send size={18} />
                            <span>Enviar con Gmail</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>,
        document.body
    );
}

MessageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};