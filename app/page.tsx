import Image from "next/image";

export default function Page() {
  return (
    <>
      <Image src="/pokeball-favicon.ico" alt="logo" width={50} height={50} />
      <h1>Hello, Next.js!</h1>

      <Image src="/025.png" alt="Pikachu" width={100} height={100} />
      <Image
        src="/025.png"
        alt="Pikachu"
        width={100}
        height={100}
        style={{ filter: "brightness(0) grayscale(1)", opacity: 0.5 }}
      />
    </>
  );
}
