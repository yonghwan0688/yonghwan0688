type LoginInfo = { name: string; carNum: string };

export default function ScrapForm({ name, carNum }: LoginInfo) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <label htmlFor="name">이름</label>
      <input id="name" type="text" value={name} />
      <label htmlFor="name">이름</label>
      <input id="name" type="text" value={name} />
    </div>
  );
}
