import {type ReactNode, useEffect} from "react";

export type ModalProps = {
    children: ReactNode,
    onClose: () => void
}

export function Modal({children, onClose}: ModalProps){
    useEffect(() => {
        // Действие после монтирования компонента
        const handleEscape = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleEscape)
        // Действие после удаления компонента
        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    })


    return(
        <div className='modal' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose}>X</button>
                {children}
            </div>

        </div>
    )
}