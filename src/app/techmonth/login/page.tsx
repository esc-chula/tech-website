"use client";

import { login } from "@/server/actions/techmonth";

export default function LoginPage() {
  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const studentId = formData.get("studentId");
    if (!studentId) {
      return;
    }
    await login(studentId as string);
  };

  return (
    <form onSubmit={formHandler}>
      <input
        name="studentId"
        placeholder="Fill your student ID"
        className="text-black"
      />
      <button type="submit">login</button>
    </form>
  );
}
