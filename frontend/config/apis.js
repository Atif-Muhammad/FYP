import axios from "axios"




const base_url = 'http://localhost:3000/apis';


export const signin = async (data) => {
    try {
        return await axios.post(`${base_url}/members/client/auth/signin`, data, { withCredentials: true });
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const userWho = async () => {
    try {
        const response = await axios.get(`${base_url}/members/client/auth/userWho`, { withCredentials: true });
        if (response.status == 200) {
            return true
        } else {
            return undefined
        }
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const dashboard = async () => {
    try {
        const response = await axios.get(`${base_url}/dashboard/admin/dashboard`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getMembers = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get(
            `${base_url}/members/client/allMembers?page=${pageParam}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getExecs = async () => {
    try {
        const response = await axios.get(
            `${base_url}/members/client/allExecs`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
export const getPrograms = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get(`${base_url}/programs/client/allPrograms?page=${pageParam}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
export const getEvents = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get(`${base_url}/events/client/events?page=${pageParam}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
export const getUpdates = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get(`${base_url}/updates/client/updates?page=${pageParam}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
export const getGallery = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get(`${base_url}/gallery/client/gallery?page=${pageParam}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const getAchievements = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get(`${base_url}/achievements/client/all?page=${pageParam}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw new Error(error)
    }
}
export const getAwards = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get(`${base_url}/awards/client/all?page=${pageParam}`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw new Error(error)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createMember = async (data) => {
    try {
        const response = await axios.post(`${base_url}/members/admin/addMember`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
export const updateMember = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/members/admin/updateMember`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
export const deleteMember = async (MemberID) => {
    try {
        const response = await axios.delete(`${base_url}/members/admin/deleteMember?memberID=${MemberID}`, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createExec = async (data) => {
    try {
        const response = await axios.post(`${base_url}/members/admin/addExec`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
export const updateExec = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/members/admin/updateExec`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
export const deleteExec = async (execID) => {
    try {
        const response = await axios.delete(
            `${base_url}/members/admin/deleteExec?execID=${execID}`,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        throw new Error(error);
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createProgram = async (data) => {
    try {
        const response = await axios.post(`${base_url}/programs/admin/addProgram`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProgram = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/programs/admin/updateProgram`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProgram = async (programID) => {
    try {
        const response = await axios.delete(`${base_url}/programs/admin/deleteProgram?programID=${programID}`, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createEvent = async (data) => {
    try {
        const response = await axios.post(`${base_url}/events/admin/addEvent`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateEvent = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/events/admin/updateEvent`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteEvent = async (eventID) => {
    try {
        const response = await axios.delete(`${base_url}/events/admin/deleteEvent?eventID=${eventID}`, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createUpdate = async (data) => {
    try {
        const response = await axios.post(`${base_url}/updates/admin/addUpdate`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateUpdate = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/updates/admin/editUpdate`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteUpdate = async (updateID) => {
    try {
        const response = await axios.delete(`${base_url}/updates/admin/deleteUpdate?newsID=${updateID}`, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createGallery = async (data) => {
    try {
        const response = await axios.post(`${base_url}/gallery/admin/addGallery`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateGallery = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/gallery/admin/updateGallery`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteGallery = async (mediaID) => {
    try {
        const response = await axios.delete(`${base_url}/gallery/admin/deleteGallery?mediaID=${mediaID}`, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createAchievement = async (data) => {
    try {
        const response = await axios.post(`${base_url}/achievements/admin/addAchievement`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateAchievement = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/achievements/admin/updateAchievement`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteAchievement = async (achieveID) => {
    try {
        const response = await axios.delete(`${base_url}/achievements/admin/deleteAchievement?achieveID=${achieveID}`, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createAward = async (data) => {
    try {
        const response = await axios.post(`${base_url}/awards/admin/createAward`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateAward = async (data) => {
    try {
        const response = await axios.patch(`${base_url}/awards/admin/updateAward`, data, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteAward = async (awardID) => {
    try {
        const response = await axios.delete(`${base_url}/awards/admin/deleteAward?awardID=${awardID}`, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

