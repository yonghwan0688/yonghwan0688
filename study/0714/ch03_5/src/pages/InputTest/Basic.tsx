import { Input } from "../../theme/daisyui";

export default function Basic() {
  return (
    <section className="mt-4">
      <div className="bg-gradient-to-r from-info/10 to-success/10 rounded-2xl p-6 border border-info/20">
        <h3 className="font-bold text-xl text-center mb-6 text-info">
          📝 Basic Input Types
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Standard Inputs */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Standard Inputs</h4>
            <Input
              className="input-primary w-full"
              placeholder="Primary input..."
            />
            <Input
              className="input-secondary w-full"
              placeholder="Secondary input..."
            />
            <Input
              className="input-accent w-full"
              placeholder="Accent input..."
              type="email"
            />
          </div>

          {/* Special Input Types */}
          <div className="space-y-4">
            <h4 className="font-semibold text-secondary">Special Types</h4>
            <Input
              className="input-info w-full"
              placeholder="Search something..."
              type="search"
            />
            <Input className="input-success w-full" type="date" />
            <Input
              className="input-warning w-full"
              placeholder="Your password"
              type="password"
            />
          </div>
        </div>

        {/* Input States */}
        <div className="divider divider-info mt-8">Input States</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium">Focused</span>
            </label>
            <Input
              className="input-bordered input-primary w-full focus:scale-105 transition-transform"
              placeholder="Click to focus"
            />
          </div>
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium">With Value</span>
            </label>
            <Input
              className="input-bordered input-secondary w-full"
              defaultValue="Sample text"
            />
          </div>
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium">Disabled</span>
            </label>
            <Input
              className="input-bordered w-full"
              placeholder="Disabled input"
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
