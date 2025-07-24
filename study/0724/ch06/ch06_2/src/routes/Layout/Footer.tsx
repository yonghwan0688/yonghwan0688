import * as D from "../../data";

export default function Footer() {
  return (
    <footer className="p-4 footer footer-center vg-primary text-primary-content">
      <div>
        <p>CopyRight @2022 - All rights reserved by {D.randomCompanyName()}</p>
      </div>
    </footer>
  );
}
