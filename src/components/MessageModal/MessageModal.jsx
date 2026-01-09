import PropTypes from "prop-types";
import { useEffect } from "react";
import {createPortal} from "react-dom";
import styles from "./MessageModal.module.css";
import React from "react";

function isValidEmail(email) {
    // Validación simple (suficiente para este proyecto)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// Componente del modal de mensaje
export default function MessageModal({isOpen, onClose}) {
    const [to, setTo] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [body, setBody] = React.useState("");
    const [error, setError] = React.useState("");
    
    const firstInputRef = React.useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Enfocar el primer campo de entrada cuando se abra el modal
        requestAnimationFrame(() => {
            firstImputRef.current?.focus();
        });

        // Cerrar modal con el boton de escape
        const handlekeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handlekeyDown);

        // Restaurar el estado anterior al cerrar el modal
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", handlekeyDown);
        };
    }, [isOpen, onClose]);

    // No renderizar nada si el modal no está abierto
    if (!isOpen) return null;
    
    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
    

    if (!to.trim()) return setError("Porfavor ingresa el correo del destinatario.");
    if (!isValidEmail(to.trim())) return setError("El correo del destinatario no es válido.");
    if (!subject.trim()) return setError("Porfavor ingresa el asunto del mensaje.");
    if (!body.trim()) return setError("Porfavor ingresa el cuerpo del mensaje.");

    // Construir la URL de Gmail para componer el correo
    const gmailComposeUrl = 
    "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(to.trim())}` +
      `&su=${encodeURIComponent(subject.trim())}` +
      `&body=${encodeURIComponent(body.trim())}`;
    // Abrir la URL en una nueva pestaña
      window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
        onClose();
};

return createPortal(
<div className={styles.overlay} onMouseDown={onClose}> 
    {/* stopPropagation para que click dentro no cierre */}
    <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="message-modal-title" onMouseDown={(e) => e.stopPropagation()}>
        <header className={styles.header}>
            <h2 id="message-modal-title" className={styles.title}> Enviar mensaje </h2>
            
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal" title="Cerrar"> X </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Gmail (destino)
               
                <input  ref={firstInputRef} className={styles.input} type="email" placeholder="ej: ejemplo@gmail.com" 
                        value={to} onChange={(e) => setTo(e.target.value)} autoComplete="email" />
            </label>

            <label className={styles.label}>
                Asunto

                <input className={styles.input} type="text" placeholder="Asunto del mensaje" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </label>

            <label className={styles.label}>
                Mensaje
                
                <textarea className={styles.textarea} placeholder="Escribe tu mensaje..." value={body} onChange={(e) => setBody(e.target.value)} rows={6} /> 
             </label>

            {error ? <p className={styles.error}>{error}</p> : null}

            <div className={styles.actions}>
                <button type="button" className={styles.secondary} onClick={onClose}> Cancelar </button>

                <button type="submit" className={styles.primary}> Enviar </button>
            </div>

            <p className={styles.hint}> Se abrirá Gmail con el correo prellenado (debes estar logueado). </p>
        </form>
    </div>
    </div>, 
    document.body
    );
}

MessageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};