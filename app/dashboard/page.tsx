import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Dashboardpage() {
  const { userId } = auth();
  const user = await currentUser();
  console.log(userId);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard. 대시보드</h1>
      <p>
        Welcome to dashboard. 이 페이지는 로그인된 사용자의 정보를 보여주는
        페이지입니다.
      </p>
      {userId && (
        <div>
          <p>UserID: {userId}</p>
          <p>Name: {user?.fullName}</p>
          <p>Email: {user?.primaryEmailAddressId}</p>
        </div>
      )}
    </div>
  );
}
