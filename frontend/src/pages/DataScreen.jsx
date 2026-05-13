import { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Search, Plus } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [dataFor],
    queryFn: ({ pageParam = 1 }) => getApiFn({ pageParam }),
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

  const { mutate: createMutation, isPending: isCreatePending } = useMutation({
    mutationFn: (formData) => createApiFn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
      setShowModal(false);
      toast.success("Created successfully");
    },
    onError: (err) => {
      toast.error(`Failed to create ${dataFor}`);
      console.error(`Create ${dataFor} failed:`, err);
    },
  });

  const { mutate: updateMutation, isPending: isUpdatePending } = useMutation({
    mutationFn: (formData) => updateApiFn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
      setShowModal(false);
      toast.success("Updated successfully");
    },
    onError: (err) => {
      toast.error(`Failed to update ${dataFor}`);
      console.error(`Update ${dataFor} failed:`, err);
    },
  });

  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: (id) => deleteApiFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
    },
    onError: (err) => {
      toast.error(`Failed to create ${dataFor}`);
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

  const allData = data?.pages.flatMap((p) => p.data) || [];

  const displayName = {
    members: "Members",
    exectives: "Executives",
    programs: "Programs",
    events: "Events",
    news: "News",
    gallery: "Gallery",
    achievements: "Achievements",
    awards: "Awards",
  }[dataFor] || (dataFor ? dataFor.charAt(0).toUpperCase() + dataFor.slice(1) : "");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim() || dataFor !== "members") return allData;
    const q = searchQuery.toLowerCase();
    return allData.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.CNIC?.toLowerCase().includes(q) ||
        m.district?.toLowerCase().includes(q) ||
        m.pk?.toLowerCase().includes(q)
    );
  }, [allData, searchQuery, dataFor]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div
          className="w-8 h-8 border-4 rounded-full animate-spin"
          style={{
            borderColor: "var(--color-border)",
            borderTopColor: "var(--color-fyp-green)",
          }}
        />
      </div>
    );

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
        return filteredData.map((m) => (
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

  const addLabel = displayName.toLowerCase() === "gallery"
    ? displayName
    : displayName.slice(0, -1);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search (members only) */}
        {dataFor === "members" && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search by name, CNIC, district or PK…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="fyp-search w-full pl-10 pr-4 py-2 text-sm"
              style={{ color: "var(--color-text-primary)" }}
            />
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add button */}
        <button
          onClick={() => {
            setSelectedItem(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-150 cursor-pointer"
          style={{ background: "var(--color-fyp-green)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-fyp-green-light)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--color-fyp-green)"}
        >
          <Plus size={16} />
          Add {addLabel}
        </button>
      </div>

      {/* Empty state */}
      {allData.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center min-h-[40vh] gap-4 rounded-xl"
          style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(1,68,33,0.08)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "var(--color-fyp-green)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M3 12a9 9 0 1118 0A9 9 0 013 12z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
              No {displayName.toLowerCase()} yet
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              Click "Add {addLabel}" to create the first one.
            </p>
          </div>
        </div>
      ) : (
        <div
          className={
            dataFor === "members" || dataFor === "exectives"
              ? "space-y-2"
              : "grid grid-cols-1 md:grid-cols-2 gap-5 items-start"
          }
        >
          {renderCards()}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={loadMoreRef} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <div
            className="w-7 h-7 border-4 rounded-full animate-spin"
            style={{
              borderColor: "var(--color-border)",
              borderTopColor: "var(--color-fyp-green)",
            }}
          />
        )}
      </div>

      {/* Modals */}
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
          message={`Are you sure you want to delete "${selectedItem?.name || selectedItem?.title}"?`}
          onConfirm={() => confirmDel(selectedItem?._id)}
          onCancel={() => setDeleteConfirm(false)}
          loading={isDeletePending}
        />
      )}
    </div>
  );
}

export default DataScreen;
