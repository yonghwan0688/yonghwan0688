import { Button } from "../../theme/daisyui";

export default function Size() {
  return (
    <section className="mt-4">
      <div className="bg-gradient-to-r from-secondary/10 to-info/10 rounded-2xl p-6 border border-secondary/20">
        <h3 className="font-bold text-xl text-center mb-6 text-secondary">
          📏 Button Sizes
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <div className="text-center">
            <Button className="btn-lg btn-primary hover:scale-105 transition-all shadow-lg">
              Large Button
            </Button>
            <p className="text-sm text-gray-500 mt-2">btn-lg</p>
          </div>
          <div className="text-center">
            <Button className="btn-md btn-secondary hover:scale-105 transition-all shadow-lg">
              Medium Button
            </Button>
            <p className="text-sm text-gray-500 mt-2">btn-md (default)</p>
          </div>
          <div className="text-center">
            <Button className="btn-sm btn-accent hover:scale-105 transition-all shadow-lg">
              Small Button
            </Button>
            <p className="text-sm text-gray-500 mt-2">btn-sm</p>
          </div>
          <div className="text-center">
            <Button className="btn-xs btn-info hover:scale-105 transition-all shadow-lg">
              Tiny Button
            </Button>
            <p className="text-sm text-gray-500 mt-2">btn-xs</p>
          </div>
        </div>

        {/* Additional size examples with different styles */}
        <div className="divider divider-secondary mt-8">Size Variations</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-center">Outline Variants</h4>
            <div className="flex justify-center items-center gap-2">
              <Button className="btn-xs btn-outline btn-primary">XS</Button>
              <Button className="btn-sm btn-outline btn-secondary">SM</Button>
              <Button className="btn-md btn-outline btn-accent">MD</Button>
              <Button className="btn-lg btn-outline btn-info">LG</Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-center">Ghost Variants</h4>
            <div className="flex justify-center items-center gap-2">
              <Button className="btn-xs btn-ghost">XS</Button>
              <Button className="btn-sm btn-ghost">SM</Button>
              <Button className="btn-md btn-ghost">MD</Button>
              <Button className="btn-lg btn-ghost">LG</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
