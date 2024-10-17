import Image from "next/image";
import Link from "next/link";

export default function HeroSection(): JSX.Element {
  return (
    <div
      id="hero"
      className="flex min-h-screen w-full max-w-screen-xl flex-col px-8 pt-14 font-tiny5 text-techmonth-white md:px-16 xl:px-4"
    >
      <header className="flex h-10 w-full justify-between text-2xl md:h-12 md:text-4xl lg:h-16 lg:text-5xl">
        <div className="flex flex-wrap items-center gap-5">
          <Image
            src="/techmonth/esc_icon.svg"
            alt=""
            className="h-full"
            width={55}
            height={65}
          />
          <h3>TECH ESC</h3>
        </div>
        <Link
          href="https://www.instagram.com/escchula"
          rel="noopener noreferrer"
          target="_blank"
          className="z-50 h-full"
        >
          <Image
            src="/techmonth/instagram_icon.svg"
            className="pointer-events-none size-full object-fill"
            alt=""
            width={45}
            height={45}
          />
        </Link>
      </header>
      <main className="grid size-full flex-1 grid-cols-1 place-content-center gap-16 lg:-mt-28 lg:grid-cols-2 lg:gap-0">
        <section className="flex flex-col items-center lg:items-start">
          <h1 className="text-5xl uppercase md:text-7xl lg:text-9xl">
            Intania
          </h1>
          <Image
            src="/techmonth/tech_logo.svg"
            alt="Tech"
            width={801}
            height={223}
            className="w-full max-w-96 md:w-1/2 lg:w-auto lg:min-w-96 lg:max-w-lg"
          />
          <div className="flex items-baseline gap-6">
            <span className="text-2xl md:text-4xl lg:text-5xl">@!4%^23#</span>
            <h2 className="text-3xl text-techmonth-green md:text-5xl lg:text-6xl">
              MONTH
            </h2>
          </div>
          <div className="mt-4 flex gap-2">
            <p>Sponsored By</p>
            <Image
              src="/techmonth/cleverse_logo.svg"
              alt="Cleverse"
              width={100}
              height={100}
            />
          </div>
        </section>
        <section className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 font-press-start-2p lg:flex-col lg:items-end lg:gap-14 lg:text-right">
          <h2 className="w-min whitespace-nowrap text-xl md:text-2xl lg:whitespace-normal lg:text-9xl">
            7
            <span className="hidden lg:inline">
              <br />
            </span>
            -31
          </h2>
          <p className="flex gap-6 text-xl md:text-2xl lg:text-4xl">
            <span className="text-techmonth-green">OCTOBER</span>
            <span className="text-techmonth-magenta">2024</span>
          </p>
        </section>
        <Link
          href="/techmonth/stamp"
          className="mx-auto h-fit w-min whitespace-nowrap bg-techmonth-yellow px-4 py-2 text-center font-tiny5 text-xl text-techmonth-black duration-300 ease-in-out hover:translate-x-2 md:text-2xl lg:hidden lg:px-5 lg:py-2.5 lg:text-3xl"
        >
          COLLECT STAMP -&gt;
        </Link>
      </main>
    </div>
  );
}
