import Image from "next/image";
import { StampCollection } from "./stamp-collection";
import Link from "next/link";

const sources = [
  "/techmonth/assets/clubs/robo_racer.png",
  "/techmonth/assets/clubs/quant.png",
  "/techmonth/assets/clubs/eic.png",
  "/techmonth/assets/clubs/thinc.png",
  "/techmonth/assets/clubs/gdsc.png",
  "/techmonth/assets/clubs/grdc.png",
  "/techmonth/assets/clubs/cubs.png",
];

export default function TechMonthSection(): JSX.Element {
  return (
    <div
      id="techmonth"
      className="flex min-h-screen w-full max-w-screen-xl flex-col gap-40 px-8 py-28 md:px-16 xl:px-4"
    >
      <article>
        <h2 className="max-w-4xl text-center font-ibm-plex-sans-thai text-5xl leading-normal md:text-7xl lg:text-left lg:text-8xl">
          เดือนแห่งการ<span className="text-techmonth-magenta">เรียนรู้</span>{" "}
          <span className="text-techmonth-green">สร้างสรรค์</span>เทคโนโลยี
        </h2>
        <p className="text-center font-ibm-plex-sans-thai text-xl md:text-3xl lg:text-left lg:text-4xl">
          จากชมรม <span className="font-tiny5">TECH</span> ใน{" "}
          <span className="font-tiny5">INTANIA</span>
        </p>
        <div className="mx-auto mt-16 grid w-fit grid-cols-4 gap-6 md:gap-8 lg:mt-24 lg:grid-cols-7">
          {sources.map((src, i) => (
            <Image
              src={src}
              key={i}
              alt=""
              width={120}
              height={120}
              className="aspect-square object-contain"
            />
          ))}
        </div>
      </article>
      <article className="flex flex-col-reverse place-items-center gap-8 lg:grid lg:grid-cols-2 lg:gap-0">
        <StampCollection />
        <div className="flex flex-col items-center gap-8 text-center lg:items-end lg:text-right">
          <h2 className="font-tiny5 text-5xl uppercase md:text-7xl lg:text-8xl">
            <span className="text-techmonth-green">Stamp</span> Book
          </h2>
          <p className="font-ibm-plex-sans-thai text-lg md:text-2xl lg:text-3xl">
            นอกจากอีเว้นท์อย่าลืมสะสม Stamp จากกิจกรรมต่าง ๆ
            เพื่อแลกของรางวัลด้วย!
          </p>
          <Link
            href="/techmonth/stamps"
            className="mx-auto h-fit w-min whitespace-nowrap bg-techmonth-yellow px-4 py-2 text-center font-tiny5 text-xl text-techmonth-black duration-300 ease-in-out hover:translate-x-2 md:text-2xl lg:px-5 lg:py-2.5 lg:text-3xl"
          >
            COLLECT STAMP -&gt;
          </Link>
        </div>
      </article>
    </div>
  );
}
