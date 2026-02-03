import Image from "next/image";

export default function Page() {
  return (
    <>
      <Image src="/pokeball-favicon.ico" alt="logo" width={50} height={50} />
      <h1>Hello, Next.js!</h1>
    </>
  );
}
