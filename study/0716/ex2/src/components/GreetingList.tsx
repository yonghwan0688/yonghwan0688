import { welcomeMessages } from "../data/messages";

export default function GreetingList() {
  return (
    <ul className="space-y-2">
      {welcomeMessages.map((msg, idx) => (
        <li key={idx} className="p-3 bg-blue-100 rounded shadow">
          {msg}
        </li>
      ))}
    </ul>
  );
}
