import Link from "next/link";
import React from "react";
import { FaCodeBranch, FaEye, FaStar } from "react-icons/fa";
import { username } from "../constants";

export default async function ReposPage() {
  //1, SSG : 정적페이지
  // const response = await fetch();
  // `https://api.github.com/users/${username}/repos`

  //2. SSR : 서버사이드렌더링
  // const response = await fetch(
  //   `https://api.github.com/users/${username}/repos`,
  //   { cache: "no-store" }
  // );

  //3. ISR : 인크리멘탈 스태틱 제너레이션 일정 시간 간격으로 갱신하는 것
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    { next: { revalidate: 60 } }
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const repos = await response.json();

  console.log(repos);

  return (
    <div className="flex flex-col justify-start items-start max-w-lg">
      <h2 className="test-2xl font-bold mb-4">
        Github repositories of {username}
      </h2>
      <ul className="justify-start">
        {repos.map((repo: any) => (
          <li key={repos.id} className="bg-gray-100 m-4 p-4 rounded-md">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p>{repo.description}</p>
            </Link>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 ">
                <FaStar /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <FaCodeBranch /> {repo.forks_count}
              </span>
              <span className="flex items-center gap-1">
                <FaEye /> {repo.watchers_count}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
