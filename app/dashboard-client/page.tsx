import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard (Server-side)</h1>
      <p className="mb-5">
        Welcome to server-side dashboard. This page shows the personal
        information of the logged-in user.
      </p>
      {userId && (
        <div>
          <p>UserID: {userId}</p>
          <p>Name: {user?.fullName}</p>
          <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      )}
    </div>
  );
}
