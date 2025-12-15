import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  getUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
  deleteExec,
  updateExec,
  createExec,
  getExecs,
  getAchievements,
  getAwards,
  createAchievement,
  createAward,
  updateAchievement,
  updateAward,
  deleteAchievement,
  deleteAward,
} from "../../config/apis";

import MemberCard from "../components/cards/MemberCard";
import ProgramCard from "../components/cards/ProgramCard";
import EventCard from "../components/cards/EventCard";
import NewsCard from "../components/cards/NewsCard";
import GalleryCard from "../components/cards/GalleryCard";
import MemberModel from "../components/models/MemberModel";
import ProgramModal from "../components/models/ProgramModal";
import EventModal from "../components/models/EventModal";
import NewsModal from "../components/models/NewsModal";
import GalleryModal from "../components/models/GalleryModal";
import Confirmation from "../components/ui/Confirmation";
import ExectivesCard from "../components/cards/ExectivesCard";
import ExectivesModal from "../components/models/ExectivesModal";
import AchievementCard from "../components/cards/AchievementsCard";
import AwardCard from "../components/cards/AwardsCard";
import AchievementModal from "../components/models/AchievementsModal";
import AwardModal from "../components/models/AwardsModal";
import { toast } from "react-hot-toast";

function DataScreen() {
  const { for: dataFor } = useParams();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const loadMoreRef = useRef(null);

  const getApiFn = {
    members: getMembers,
    exectives: getExecs,
    programs: getPrograms,
    events: getEvents,
    news: getUpdates,
    gallery: getGallery,
    achievements: getAchievements,
    awards: getAwards,
  }[dataFor];

  const createApiFn = {
    members: createMember,
    exectives: createExec,
    programs: createProgram,
    events: createEvent,
    news: createUpdate,
    gallery: createGallery,
    achievements: createAchievement,
    awards: createAward,
  }[dataFor];

  const updateApiFn = {
    members: updateMember,
    exectives: updateExec,
    programs: updateProgram,
    events: updateEvent,
    news: updateUpdate,
    gallery: updateGallery,
    achievements: updateAchievement,
    awards: updateAward,
  }[dataFor];

  const deleteApiFn = {
    members: deleteMember,
    exectives: deleteExec,
    programs: deleteProgram,
    events: deleteEvent,
    news: deleteUpdate,
    gallery: deleteGallery,
    achievements: deleteAchievement,
    awards: deleteAward,
  }[dataFor];

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [dataFor],
    queryFn: ({ pageParam = 1 }) => getApiFn({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    enabled: !!getApiFn,
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    const ref = loadMoreRef.current;
    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const {mutate: createMutation, isPending: isCreatePending} = useMutation({
    mutationFn: (formData) => createApiFn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
      setShowModal(false);
      toast.success("Created successfully");
    },
    onError: (err) => {
      console.error(`Create ${dataFor} failed:`, err);
    },
  });
  
  const {mutate: updateMutation, isPending: isUpdatePending} = useMutation({
    mutationFn: (formData) => updateApiFn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
      setShowModal(false);
      toast.success("Updated successfully");
    },
    onError: (err) => {
      console.error(`Update ${dataFor} failed:`, err);
    },
  });

  const {mutate: deleteMutation, isPending: isDeletePending} = useMutation({
    mutationFn: (id) => deleteApiFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
    },
    onError: (err) => {
      console.error(`Delete ${dataFor} failed:`, err);
    },
  });

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const handleCreate = (formData) => createMutation(formData);
  const handleUpdate = (formData) => updateMutation(formData);
  const confirmDel = (id) => {
    deleteMutation(id);
    setDeleteConfirm(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="animate-pulse text-gray-500">Loading {dataFor}...</p>
      </div>
    );

  const allData = data?.pages.flatMap((p) => p.data) || [];

  const renderCards = () => {
    const renderProps = {
      onUpdate: (item) => handleUpdate(item),
      onDelete: (item) => {
        setSelectedItem(item);
        setDeleteConfirm(true);
      },
    };

    switch (dataFor) {
      case "members":
        return allData.map((m) => (
          <MemberCard key={m._id} member={m} {...renderProps} />
        ));
      case "exectives":
        return allData.map((m) => (
          <ExectivesCard key={m._id} member={m} {...renderProps} />
        ));
      case "programs":
        return allData.map((p) => (
          <ProgramCard
            key={p._id}
            program={p}
            {...renderProps}
            expanded={expandedId === p._id}
            onToggle={() => toggleExpand(p._id)}
          />
        ));
      case "events":
        return allData.map((e) => (
          <EventCard
            key={e._id}
            event={e}
            {...renderProps}
            expanded={expandedId === e._id}
            onToggle={() => toggleExpand(e._id)}
          />
        ));
      case "news":
        return allData.map((n) => (
          <NewsCard
            key={n._id}
            news={n}
            {...renderProps}
            expanded={expandedId === n._id}
            onToggle={() => toggleExpand(n._id)}
          />
        ));
      case "gallery":
        return allData.map((g) => (
          <GalleryCard
            key={g._id}
            media={g}
            {...renderProps}
            expanded={expandedId === g._id}
            onToggle={() => toggleExpand(g._id)}
          />
        ));
      case "achievements":
        return allData.map((g) => (
          <AchievementCard
            key={g._id}
            achievement={g}
            {...renderProps}
            expanded={expandedId === g._id}
            onToggle={() => toggleExpand(g._id)}
          />
        ));
      case "awards":
        return allData.map((g) => (
          <AwardCard
            key={g._id}
            achievement={g}
            {...renderProps}
            expanded={expandedId === g._id}
            onToggle={() => toggleExpand(g._id)}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4 border rounded-2xl border-gray-200 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize text-gray-800">
          {dataFor}
        </h1>
        <button
          onClick={() => {
            setSelectedItem(null);
            setShowModal(true);
          }}
          className="bg-[#101828] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#101828eb] transition"
        >
          {dataFor.toLowerCase() === "gallery" ? <>+ Add {dataFor}</> : <>+ Add {dataFor.slice(0, -1)}</>}
          
        </button>
      </div>

      <div
        className={`
    ${
      dataFor === "members"
        ? "space-y-3"
        : "grid grid-cols-1 md:grid-cols-2 gap-6"
    }
  `}
      >
        {renderCards()}
      </div>

      {/* 🔹 Infinite Scroll Loader */}
      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isFetchingNextPage ? (
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        ) : (
          hasNextPage && (
            <p className="text-gray-500 text-sm">Scroll down to load more...</p>
          )
        )}
      </div>

      {showModal && (
        <>
          {dataFor === "members" && (
            <MemberModel
              member={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}

          {dataFor === "exectives" && (
            <ExectivesModal
              member={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}
          {dataFor === "programs" && (
            <ProgramModal
              program={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}
          {dataFor === "events" && (
            <EventModal
              event={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}
          {dataFor === "news" && (
            <NewsModal
              news={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}
          {dataFor === "gallery" && (
            <GalleryModal
              media={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}
          {dataFor === "achievements" && (
            <AchievementModal
              media={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}
          {dataFor === "awards" && (
            <AwardModal
              media={selectedItem}
              onClose={() => setShowModal(false)}
              onSubmit={selectedItem ? handleUpdate : handleCreate}
              loading={selectedItem ? isUpdatePending : isCreatePending}
            />
          )}
        </>
      )}

      {deleteConfirm && (
        <Confirmation
          show={deleteConfirm}
          message={`Are You Sure to Delete "${
            selectedItem?.name || selectedItem?.title
          }"?`}
          onConfirm={() => confirmDel(selectedItem?._id)}
          onCancel={() => setDeleteConfirm(false)}
          loading={isDeletePending}
        />
      )}
    </div>
  );
}

export default DataScreen;
