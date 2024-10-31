// import "@/styles/globals.css";

export default function QrGenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`w-full h-full min-h-svh bg-black bg-pattern`}>
      {children}
    </div>
  )
}