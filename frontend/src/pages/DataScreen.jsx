import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
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

  const { data, isLoading, error } = useQuery({
    queryKey: [dataFor],
    queryFn: getApiFn,
    enabled: !!getApiFn,
  });

  const createMutation = useMutation({
    mutationFn: (formData) => createApiFn(formData),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
      setShowModal(false);
      toast.success("Created successfully");
    },
    onError: (err) => {
      console.error(`Create ${dataFor} failed:`, err);
      toast.error("Creation failed");
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
      toast.error("Update failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteApiFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries([dataFor]);
      toast.success("Deleted successfully");
    },
    onError: (err) => {
      console.error(`Delete ${dataFor} failed:`, err);
      toast.error("Delete failed");
    },
  });

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCreate = (formData) => {
    createMutation.mutate(formData);
  };

  const handleUpdate = (formData) => {
    const id = formData.get("_id");
    if (!id) return;
    updateMutation.mutate(formData);
  };

  const confirmDel = (id) => {
    deleteMutation.mutate(id);
    setDeleteConfirm(false);
  };
  const handleDelete = (item) => {
    setDeleteConfirm(true);
    setSelectedItem(item);
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

  const renderCards = () => {
    const renderProps = {
      onUpdate: (item) => {
        handleUpdate(item);
      },
      onDelete: handleDelete,
    };

    switch (dataFor) {
      case "members":
        return data?.data?.map((member) => (
          <MemberCard key={member._id} member={member} {...renderProps} />
        ));
      case "programs":
        return data?.data?.map((program) => (
          <ProgramCard key={program._id} program={program} {...renderProps} expanded={expandedId === program._id} onToggle={() => toggleExpand(program._id)}/>
        ));
      case "events":
        return data?.data?.map((event) => (
          <EventCard key={event._id} event={event} {...renderProps} expanded={expandedId === event._id} onToggle={() => toggleExpand(event._id)}/>
        ));
      case "news":
        return data?.data?.map((news) => (
          <NewsCard key={news._id} news={news} {...renderProps} expanded={expandedId === news._id} onToggle={() => toggleExpand(news._id)}/>
        ));
      case "gallery":
        return data?.data?.map((media) => (
          <GalleryCard key={media._id} media={media} {...renderProps} expanded={expandedId === media._id} onToggle={() => toggleExpand(media._id)}/>
        ));
      default:
        return null;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;
    const modalProps = {
      onClose: () => setShowModal(false),
      onSubmit: (formData) => {
        if (selectedItem?._id) {
          handleUpdate(formData);
        } else {
          handleCreate(formData);
        }
      },
    };

    switch (dataFor) {
      case "members":
        return <MemberModel member={selectedItem} {...modalProps} />;
      case "programs":
        return <ProgramModal program={selectedItem} {...modalProps} />;
      case "events":
        return <EventModal event={selectedItem} {...modalProps} />;
      case "news":
        return <NewsModal news={selectedItem} {...modalProps} />;
      case "gallery":
        return <GalleryModal media={selectedItem} {...modalProps} />;
      default:
        return null;
    }
  };
  // render
  return (
    <div className="p-4 space-y-4">
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
          + Add {dataFor.slice(0, -1)}
        </button>
      </div>

      <div
        className={`
    ${
      dataFor === "members"
        ? "space-y-3"
        : "grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
    }
  `}
      >
        {renderCards()}
      </div>
      {renderModal()}
      {deleteConfirm && (
        <Confirmation
          show={deleteConfirm}
          message={`Are You Sure to Delete "${
            selectedItem?.name ? selectedItem.name : selectedItem.title
          }"?`}
          onConfirm={() => confirmDel(selectedItem?._id)}
          onCancel={() => setDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default DataScreen;
