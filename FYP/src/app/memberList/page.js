"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { getMembers } from "../../../config/apis";
import { PreFooter } from "@/components/PreFooter";

const MembersPage = () => {
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

  const members = data?.pages?.flatMap((page) => page?.data || []) || [];

  return (
    <main>
      <section className="px-6 py-12 bg-gray-50">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Youth Parliament Members
        </h2>

        {/* Table Container */}
        <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            {/* Table Head */}
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">#</th>
                <th className="py-3 px-4 text-left font-semibold">Picture</th>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Father’s Name</th>
                <th className="py-3 px-4 text-left font-semibold">District</th>
                <th className="py-3 px-4 text-left font-semibold">PK</th>
                <th className="py-3 px-4 text-left font-semibold">CNIC</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={member._id || index} className="hover:bg-green-50 transition">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <img
                        src={member?.image?.url || "/default-avatar.png"}
                        alt={member?.name || "Member"}
                        className="w-16 h-16 rounded-full object-cover shadow-md"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {member?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4">{member?.father_name || "N/A"}</td>
                    <td className="py-3 px-4">{member?.district || "N/A"}</td>
                    <td className="py-3 px-4 font-semibold text-green-700">
                      {member?.pk ? `PK-${member.pk}` : "N/A"}
                    </td>
                    <td className="py-3 px-4">{member?.CNIC || "N/A"}</td>
                    <td className="py-3 px-4 text-blue-600 underline">
                      {member?.email || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition shadow-md disabled:opacity-60"
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
