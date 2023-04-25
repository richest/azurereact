import style from "./modal.module.scss";

const Modal = ({ open, children, className, handleClose }) => {
  return (
    <>
      {open && (
        <div
          className={style.modalWrapper}
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
            handleClose?.();
          }}
        >
          <div
            className={`${style.modalContentWrapper} ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
