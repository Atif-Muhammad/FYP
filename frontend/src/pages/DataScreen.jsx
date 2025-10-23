import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    programs: getPrograms,
    events: getEvents,
    news: getUpdates,
    gallery: getGallery,
  }[dataFor];

  const createApiFn = {
    members: createMember,
    programs: createProgram,
    events: createEvent,
    news: createUpdate,
    gallery: createGallery,
  }[dataFor];

  const updateApiFn = {
    members: updateMember,
    programs: updateProgram,
    events: updateEvent,
    news: updateUpdate,
    gallery: updateGallery,
  }[dataFor];

  const deleteApiFn = {
    members: deleteMember,
    programs: deleteProgram,
    events: deleteEvent,
    news: deleteUpdate,
    gallery: deleteGallery,
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

  // 🔹 Trigger fetchNextPage when sentinel is visible
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

  const createMutation = useMutation({
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

  const updateMutation = useMutation({
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

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteApiFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
    },
    onError: (err) => {
      console.error(`Delete ${dataFor} failed:`, err);
    },
  });

  const toggleExpand = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const handleCreate = (formData) => createMutation.mutate(formData);
  const handleUpdate = (formData) => updateMutation.mutate(formData);
  const confirmDel = (id) => {
    deleteMutation.mutate(id);
    setDeleteConfirm(false);
  };

  if (isLoading)
    
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="animate-pulse text-gray-500">Loading {dataFor}...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-6">
        Failed to load {dataFor}: {error.message}
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
        return allData.map((m) => <MemberCard key={m._id} member={m} {...renderProps} />);
      case "programs":
        return allData.map((p) => (
          <ProgramCard key={p._id} program={p} {...renderProps} expanded={expandedId === p._id} onToggle={() => toggleExpand(p._id)} />
        ));
      case "events":
        return allData.map((e) => (
          <EventCard key={e._id} event={e} {...renderProps} expanded={expandedId === e._id} onToggle={() => toggleExpand(e._id)} />
        ));
      case "news":
        return allData.map((n) => (
          <NewsCard key={n._id} news={n} {...renderProps} expanded={expandedId === n._id} onToggle={() => toggleExpand(n._id)} />
        ));
      case "gallery":
        return allData.map((g) => (
          <GalleryCard key={g._id} media={g} {...renderProps} expanded={expandedId === g._id} onToggle={() => toggleExpand(g._id)} />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize text-gray-800">{dataFor}</h1>
        <button
          onClick={() => {
            setSelectedItem(null);
            setShowModal(true);
          }}
          className="bg-[#101828] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#101828eb] transition"
        >
          + Add {dataFor.slice(0, -1)}
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
        ) : hasNextPage && (
          <p className="text-gray-500 text-sm">Scroll down to load more...</p>
        )}
      </div>

      {showModal && (
        <>
          {dataFor === "members" && <MemberModel member={selectedItem} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
          {dataFor === "programs" && <ProgramModal program={selectedItem} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
          {dataFor === "events" && <EventModal event={selectedItem} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
          {dataFor === "news" && <NewsModal news={selectedItem} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
          {dataFor === "gallery" && <GalleryModal media={selectedItem} onClose={() => setShowModal(false)} onSubmit={handleCreate} />}
        </>
      )}

      {deleteConfirm && (
        <Confirmation
          show={deleteConfirm}
          message={`Are You Sure to Delete "${selectedItem?.name || selectedItem?.title}"?`}
          onConfirm={() => confirmDel(selectedItem?._id)}
          onCancel={() => setDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default DataScreen;
