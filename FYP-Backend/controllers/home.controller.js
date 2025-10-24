import {
  execMembers,
  latestGalleryImages,
  latestNewsUpdates,
  topEvents,
  topPrograms,
} from "../services/home.service.js";

export const homeController = async (req, res) => {
  try {
    const [programs, members, events, galleryImages, newsUpdates] =
      await Promise.all([
        topPrograms(),
        execMembers(),
        topEvents(),
        latestGalleryImages(),
        latestNewsUpdates(),
      ]);

    res.status(200).json({
      programs,
      members,
      events,
      galleryImages,
      newsUpdates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ cause: error.message });
  }
};
