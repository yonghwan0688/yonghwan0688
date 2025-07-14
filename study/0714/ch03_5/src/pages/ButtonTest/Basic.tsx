import { Button } from "../../theme/daisyui";

export default function Basic() {
  return (
    <section className="mt-4">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
        <h3 className="font-bold text-xl text-center mb-6 text-primary">
          ✨ Basic Button Styles
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button className="btn btn-primary hover:scale-105 transition-transform">
            Primary
          </Button>
          <Button className="btn btn-secondary hover:scale-105 transition-transform">
            Secondary
          </Button>
          <Button className="btn btn-accent hover:scale-105 transition-transform">
            Accent
          </Button>
          <Button className="btn btn-info hover:scale-105 transition-transform">
            Info
          </Button>
          <Button className="btn btn-success hover:scale-105 transition-transform">
            Success
          </Button>
          <Button className="btn btn-warning hover:scale-105 transition-transform">
            Warning
          </Button>
          <Button className="btn btn-error hover:scale-105 transition-transform">
            Error
          </Button>
          <Button className="btn btn-ghost hover:scale-105 transition-transform">
            Ghost
          </Button>
          <Button className="btn btn-outline btn-primary hover:scale-105 transition-transform">
            Outline
          </Button>
          <Button className="btn btn-active btn-neutral hover:scale-105 transition-transform">
            Active
          </Button>
          <Button className="btn btn-disabled" disabled>
            Disabled
          </Button>
          <Button className="btn glass hover:scale-105 transition-transform">
            Glass
          </Button>
        </div>
      </div>
    </section>
  );
}
