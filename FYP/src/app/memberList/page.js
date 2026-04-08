"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { getMembers } from "../../../config/apis";
import { PreFooter } from "@/components/PreFooter";

const MembersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["members"],
    queryFn: ({ pageParam = 1 }) => getMembers({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.page < lastPage?.pages ? lastPage.page + 1 : undefined,
  });

  const members = data?.pages?.flatMap((page) => page?.data || []) || [];

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const q = searchQuery.toLowerCase();
    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.CNIC?.toLowerCase().includes(q)
    );
  }, [members, searchQuery]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-green-700 text-2xl font-semibold">
        Loading members...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Failed to load members.
      </div>
    );

  return (
    <main>
      <section className="px-4 sm:px-8 py-14 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-2">
          Youth Parliament Members
        </h2>
        <p className="text-center text-gray-500 mb-10 text-sm">
          Browse the official directory of Federal Youth Parliament members
        </p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-10 relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or CNIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition placeholder:text-gray-400"
          />
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg bg-white">
          <table className="min-w-full text-sm">
            {/* Table Head */}
            <thead>
              <tr className="bg-gradient-to-r from-green-700 to-green-600 text-white">
                <th className="py-4 px-5 text-left font-semibold text-xs uppercase tracking-wider">#</th>
                <th className="py-4 px-5 text-left font-semibold text-xs uppercase tracking-wider">Picture</th>
                <th className="py-4 px-5 text-left font-semibold text-xs uppercase tracking-wider">Name</th>
                <th className="py-4 px-5 text-left font-semibold text-xs uppercase tracking-wider">Father&apos;s Name</th>
                <th className="py-4 px-5 text-left font-semibold text-xs uppercase tracking-wider">District</th>
                <th className="py-4 px-5 text-left font-semibold text-xs uppercase tracking-wider">PK</th>
                <th className="py-4 px-5 text-left font-semibold text-xs uppercase tracking-wider">CNIC</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <tr
                    key={member._id || index}
                    className={`transition duration-150 hover:bg-green-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                  >
                    <td className="py-4 px-5 text-gray-500 font-medium">{index + 1}</td>
                    <td className="py-4 px-5">
                      <img
                        src={member?.image?.url || "/default-avatar.png"}
                        alt={member?.name || "Member"}
                        className="w-14 h-14 rounded-full object-cover shadow ring-2 ring-green-100"
                      />
                    </td>
                    <td className="py-4 px-5 font-semibold text-gray-900">
                      {member?.name || "N/A"}
                    </td>
                    <td className="py-4 px-5 text-gray-600">{member?.father_name || "N/A"}</td>
                    <td className="py-4 px-5 text-gray-600 capitalize">{member?.district || "N/A"}</td>
                    <td className="py-4 px-5">
                      <span className="inline-block bg-green-100 text-green-800 font-semibold text-xs px-3 py-1 rounded-full">
                        {member?.pk ? `PK-${member.pk}` : "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-gray-600 font-mono text-xs">{member?.CNIC || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    {searchQuery.trim()
                      ? `No members found for "${searchQuery}".`
                      : "No members found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-8 py-3 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 transition shadow-md disabled:opacity-60"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </section>
      <PreFooter btnText="View Executive Members" link="/executive" />
    </main>
  );
};

export default MembersPage;
