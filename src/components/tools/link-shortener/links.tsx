import LinkCard from "./link-card";

export default function Links() {
  const shortenedLinks = [
    {
      editedAt: new Date(),
      name: "Intania Tech Month Website",
      url: "https://tech.intania.org/techmonth",
      slug: "techmonth",
      count: 10,
    },
    {
      editedAt: new Date(),
      name: "แบบฟอร์มประเมินร้านอาหาร",
      url: "https://db.intania.org/dashboard/#/nc/form/6f44a500-b755-4faf-aab9-e226ceb131a7/survey",
      slug: "esc67-canteen-evaluation",
      count: 87,
    },
    {
      editedAt: new Date(),
      name: "แบบฟอร์มการขอลงสื่อผ่านช่องทางการประชาสัมพันธ์ในความดูแลของ กวศ.",
      url: "https://forms.gle/3E9q4P5yjL8Afkwb9",
      slug: "esc67-content-publishing",
      count: 0,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
      {shortenedLinks.map((link, index) => (
        <LinkCard key={index} {...link} />
      ))}
    </div>
  );
}
