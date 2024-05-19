import "./App.css";
import { Image1 } from "./Image1";

export function App() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {[...Array(5)].map((_, i) => (
        <Image1 key={i} />
      ))}
    </div>
  );
}
