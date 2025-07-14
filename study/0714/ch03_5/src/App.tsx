import ButtonTest from "./pages/ButtonTest";
import InputTest from "./pages/InputTest";
import ModalTest from "./pages/ModalTest";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-content shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-white to-base-100 bg-clip-text text-transparent mb-4">
              🎨 React Component Gallery
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="badge badge-accent badge-lg">React 19</div>
              <div className="badge badge-secondary badge-lg">DaisyUI</div>
              <div className="badge badge-info badge-lg">TypeScript</div>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              ✨ Beautiful UI Components Testing & Examples Dashboard ✨
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-base-100 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1 py-4">
            <a href="#buttons" className="btn btn-ghost btn-sm">
              🔘 Buttons
            </a>
            <a href="#inputs" className="btn btn-ghost btn-sm">
              📝 Inputs
            </a>
            <a href="#modals" className="btn btn-ghost btn-sm">
              🪟 Modals
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-12">
          {/* Button Test Section */}
          <div
            id="buttons"
            className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-2xl border border-primary/20 hover:shadow-3xl transition-all duration-300"
          >
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">
                  🔘
                </div>
                <h2 className="card-title text-3xl font-bold text-primary">
                  Button Components
                </h2>
              </div>
              <ButtonTest />
            </div>
          </div>

          {/* Input Test Section */}
          <div
            id="inputs"
            className="card bg-gradient-to-br from-secondary/10 to-accent/10 shadow-2xl border border-secondary/20 hover:shadow-3xl transition-all duration-300"
          >
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl">
                  📝
                </div>
                <h2 className="card-title text-3xl font-bold text-secondary">
                  Input Components
                </h2>
              </div>
              <InputTest />
            </div>
          </div>

          {/* Modal Test Section */}
          <div
            id="modals"
            className="card bg-gradient-to-br from-accent/10 to-info/10 shadow-2xl border border-accent/20 hover:shadow-3xl transition-all duration-300"
          >
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-2xl">
                  🪟
                </div>
                <h2 className="card-title text-3xl font-bold text-accent">
                  Modal Components
                </h2>
              </div>
              <ModalTest />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-neutral via-base-300 to-neutral text-neutral-content mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                ⚛️
              </div>
              <span className="text-xl font-bold">React Component Gallery</span>
            </div>
            <p className="opacity-75">
              © 2025 Built with ❤️ using React, TypeScript & DaisyUI
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <div className="badge badge-outline">v1.0.0</div>
              <div className="badge badge-outline">Modern UI</div>
              <div className="badge badge-outline">Responsive</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
