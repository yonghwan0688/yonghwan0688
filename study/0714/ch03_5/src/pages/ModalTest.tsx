import { useState } from "react";
import { Subtitle } from "../components";
import { Modal, ModalContent, ModalAction, Button } from "../theme/daisyui";
import * as D from "../data";

export default function ModalTest() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("default");

  const closeClicked = () => setOpen(false);
  const acceptClicked = () => {
    alert("✅ Action confirmed!");
    setOpen(false);
  };
  const openModal = (type = "default") => {
    setModalType(type);
    setOpen(true);
  };

  return (
    <section className="space-y-8">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-700">
        <h3 className="font-bold text-2xl text-center mb-8 text-purple-600">
          🪟 Interactive Modals
        </h3>

        {/* Hero Modal Button */}
        <div className="text-center mb-8">
          <Button
            className="btn btn-primary btn-lg hover:scale-105 transition-all shadow-lg"
            onClick={() => openModal("hero")}
          >
            🚀 Open Hero Modal
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Click to see the main modal example
          </p>
        </div>

        {/* Modal Variations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <Button
              className="btn btn-secondary w-full hover:scale-105 transition-all"
              onClick={() => openModal("info")}
            >
              📋 Info Modal
            </Button>
            <p className="text-xs text-gray-500">Information dialog</p>
          </div>

          <div className="text-center space-y-2">
            <Button
              className="btn btn-accent w-full hover:scale-105 transition-all"
              onClick={() => openModal("success")}
            >
              ✅ Success Modal
            </Button>
            <p className="text-xs text-gray-500">Success confirmation</p>
          </div>

          <div className="text-center space-y-2">
            <Button
              className="btn btn-warning w-full hover:scale-105 transition-all"
              onClick={() => openModal("warning")}
            >
              ⚠️ Warning Modal
            </Button>
            <p className="text-xs text-gray-500">Warning message</p>
          </div>

          <div className="text-center space-y-2">
            <Button
              className="btn btn-error w-full hover:scale-105 transition-all"
              onClick={() => openModal("error")}
            >
              🚨 Error Modal
            </Button>
            <p className="text-xs text-gray-500">Error notification</p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="divider divider-purple">Special Features</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="btn btn-outline btn-primary hover:scale-105 transition-all"
            onClick={() => openModal("custom")}
          >
            🎨 Custom Modal
          </Button>
          <Button
            className="btn btn-ghost hover:scale-105 transition-all"
            onClick={() => openModal("minimal")}
          >
            🔹 Minimal Modal
          </Button>
          <Button
            className="btn glass hover:scale-105 transition-all"
            onClick={() => openModal("glass")}
          >
            ✨ Glass Modal
          </Button>
        </div>
      </div>

      <Modal open={open}>
        <ModalContent onCloseIconClicked={closeClicked}>
          <div className="text-center">
            {modalType === "hero" && (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <Subtitle>Welcome to Our Amazing Modal!</Subtitle>
                <p className="mt-4 text-justify leading-relaxed">
                  {D.randomParagraphs()}
                </p>
              </>
            )}
            {modalType === "info" && (
              <>
                <div className="text-6xl mb-4">📋</div>
                <Subtitle>Information</Subtitle>
                <p className="mt-4">
                  Here's some important information you should know about this
                  feature.
                </p>
              </>
            )}
            {modalType === "success" && (
              <>
                <div className="text-6xl mb-4">✅</div>
                <Subtitle className="text-success">Success!</Subtitle>
                <p className="mt-4">
                  Your action has been completed successfully. Everything is
                  working perfectly!
                </p>
              </>
            )}
            {modalType === "warning" && (
              <>
                <div className="text-6xl mb-4">⚠️</div>
                <Subtitle className="text-warning">Warning</Subtitle>
                <p className="mt-4">
                  Please be careful! This action might have some consequences
                  that you should consider.
                </p>
              </>
            )}
            {modalType === "error" && (
              <>
                <div className="text-6xl mb-4">🚨</div>
                <Subtitle className="text-error">Error Occurred</Subtitle>
                <p className="mt-4">
                  Something went wrong. Please try again or contact support if
                  the problem persists.
                </p>
              </>
            )}
            {["custom", "minimal", "glass"].includes(modalType) && (
              <>
                <div className="text-6xl mb-4">
                  {modalType === "custom"
                    ? "🎨"
                    : modalType === "minimal"
                    ? "🔹"
                    : "✨"}
                </div>
                <Subtitle>
                  {modalType === "custom"
                    ? "Custom Styled Modal"
                    : modalType === "minimal"
                    ? "Minimal Design"
                    : "Glass Effect Modal"}
                </Subtitle>
                <p className="mt-4">
                  This is a special {modalType} modal with unique styling and
                  effects.
                </p>
              </>
            )}
          </div>

          <ModalAction>
            <Button
              className="btn btn-primary hover:scale-105 transition-all"
              onClick={acceptClicked}
            >
              ✨ Accept
            </Button>
            <Button
              className="btn btn-outline hover:scale-105 transition-all"
              onClick={closeClicked}
            >
              ❌ Close
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </section>
  );
}
