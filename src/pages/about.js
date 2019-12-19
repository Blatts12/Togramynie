import Link from "next/link";
import Cos from "../components/Cos";

export default function About() {
  return (
    <div>
      <h1>Pipa</h1>
      <Link href="/login">Wejdź login</Link>
      <Cos />
    </div>
  );
}
