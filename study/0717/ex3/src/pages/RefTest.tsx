import MyComponent from "../components/MyComponent";

export default function RefTest() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">RefTest Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MyComponent />
        <MyComponent />
        <MyComponent />
      </div>
    </div>
  );
}
