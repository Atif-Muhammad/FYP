import axios from "axios"

const base_url = 'http://localhost:3000/apis';


export const signin = async (data)=>{
    try {
        return await axios.post(`${base_url}/members/client/auth/signin`, data, {withCredentials: true});
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const userWho = async ()=>{
    try {
        const response = await axios.get(`${base_url}/members/client/auth/userWho`, {withCredentials: true});
        if(response.status == 200){
            return true
        }else{
            return undefined
        }
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const dashboard = async ()=>{
    try {
        const response = await axios.get(`${base_url}/dashboard/admin/dashboard`, {withCredentials: true})
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
export const getPrograms = async ({ pageParam = 1 })=>{
    try {
        const response = await axios.get(`${base_url}/programs/client/allPrograms?page=${pageParam}`, {withCredentials: true})
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
export const getEvents = async ({ pageParam = 1 })=>{
    try {
        const response = await axios.get(`${base_url}/events/client/events?page=${pageParam}`, {withCredentials: true})
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
export const getUpdates = async ({ pageParam = 1 })=>{
    try {
        const response = await axios.get(`${base_url}/updates/client/updates?page=${pageParam}`, {withCredentials: true})
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
export const getGallery = async ({ pageParam = 1 })=>{
    try {
        const response = await axios.get(`${base_url}/gallery/client/gallery?page=${pageParam}`, {withCredentials: true})
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createMember = async (data)=>{
    try {
        const response = await axios.post(`${base_url}/members/admin/addMember`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
export const updateMember = async (data)=>{
    try {
        const response = await axios.patch(`${base_url}/members/admin/updateMember`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
export const deleteMember = async (MemberID)=>{
    try {
        const response = await axios.delete(`${base_url}/members/admin/deleteMember?memberID=${MemberID}`, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createProgram = async (data)=>{
    try {
        const response = await axios.post(`${base_url}/programs/admin/addProgram`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProgram = async (data)=>{
    try {
        const response = await axios.patch(`${base_url}/programs/admin/updateProgram`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteProgram = async (programID)=>{
    try {
        const response = await axios.delete(`${base_url}/programs/admin/deleteProgram?programID=${programID}`, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createEvent = async (data)=>{
    try {
        const response = await axios.post(`${base_url}/events/admin/addEvent`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateEvent = async (data)=>{
    try {
        const response = await axios.patch(`${base_url}/events/admin/updateEvent`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteEvent = async (eventID)=>{
    try {
        const response = await axios.delete(`${base_url}/events/admin/deleteEvent?eventID=${eventID}`, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createUpdate = async (data)=>{
    try {
        const response = await axios.post(`${base_url}/updates/admin/addUpdate`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateUpdate = async (data)=>{
    try {
        const response = await axios.patch(`${base_url}/updates/admin/editUpdate`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteUpdate = async (updateID)=>{
    try {
        const response = await axios.delete(`${base_url}/updates/admin/deleteUpdate?newsID=${updateID}`, { withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createGallery = async (data)=>{
    try {
        const response = await axios.post(`${base_url}/gallery/admin/addGallery`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateGallery = async (data)=>{
    try {
        const response = await axios.patch(`${base_url}/gallery/admin/updateGallery`, data, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteGallery = async (mediaID)=>{
    try {
        const response = await axios.delete(`${base_url}/gallery/admin/deleteGallery?mediaID=${mediaID}`, {withCredentials: true});
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

