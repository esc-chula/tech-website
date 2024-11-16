import { Suspense } from "react";
import { User } from "lucide-react";
import { me } from "@/server/actions/auth";
import { LoginButton, LogoutButton } from "./auth-buttons";
import { Skeleton } from "../ui/skeleton";

export default function MenuUser() {
  return (
    <Suspense fallback={<Loading />}>
      <UI />
    </Suspense>
  );
}

async function UI() {
  const res = await me();

  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-5">
      <div className="flex items-center gap-4">
        <div className="grid aspect-square w-12 place-content-center rounded-full bg-white/20">
          <User size={24} />
        </div>
        <div>
          {res.success ? (
            res.data.student?.firstNameEn ? (
              <>
                <p className="font-medium">{res.data.student.firstNameEn}</p>
                <p className="text-sm">
                  {res.success ? res.data.student?.studentId : "Please log in"}
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">{res.data.student?.studentId}</p>
              </>
            )
          ) : (
            <>
              <p className="font-medium">Hello, Intania</p>
              <p className="text-sm">Please log in</p>
            </>
          )}
        </div>
      </div>
      {res.success ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-5">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
