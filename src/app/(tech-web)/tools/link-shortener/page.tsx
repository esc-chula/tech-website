import LinkCard from "@/components/tools/link-shortener/link-card";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl font-medium">Your URLs</h2>
      </div>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
        <LinkCard
          editedAt={new Date()}
          name={"Intania Tech Month Website"}
          url={"https://tech.intania.org/techmonth"}
          slug={"techmonth"}
        />
        <LinkCard
          editedAt={new Date()}
          name={"Intania Tech Month Website"}
          url={"https://tech.intania.org/techmonth"}
          slug={"techmonth"}
        />
        <LinkCard
          editedAt={new Date()}
          name={"Intania Tech Month Website"}
          url={"https://tech.intania.org/techmonth"}
          slug={"techmonth"}
        />
        <LinkCard
          editedAt={new Date()}
          name={"Intania Tech Month Website"}
          url={"https://tech.intania.org/techmonth"}
          slug={"techmonth"}
        />
        <LinkCard
          editedAt={new Date()}
          name={"Intania Tech Month Website"}
          url={"https://tech.intania.org/techmonth"}
          slug={"techmonth"}
        />
      </div>
    </div>
  );
}
