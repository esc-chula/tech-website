import { User } from "lucide-react";
import { me } from "@/server/actions/auth";
import LoginButton from "../button/login-button";
import LogoutButton from "../button/logout-button";

export default async function UserBox() {
  const res = await me();

  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-5">
      <div className="flex items-center gap-4">
        <div className="grid aspect-square w-12 place-content-center rounded-full bg-white/20">
          <User size={24} />
        </div>
        <div>
          {res.success ? (
            res.data.firstNameEn ? (
              <>
                <p className="font-medium">{res.data.firstNameEn}</p>
                <p className="text-sm">
                  {res.success ? res.data.studentId : "Please log in"}
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">{res.data.studentId}</p>
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
