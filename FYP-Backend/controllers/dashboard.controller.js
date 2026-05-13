import { totalEvents, totalMembers, totalPrograms, totalUpdates } from "../services/dashboard.service.js"



export const dashboard = async (req, res)=>{
    try {
        
        // make calcs
        const members = await totalMembers() || 0;
        const programs = await totalPrograms() || 0;
        const events = await totalEvents() || 0;
        const news = await totalUpdates() || 0;


        res.status(200).json({success: true, data: {
            members, programs, events, news
        }})


    } catch (error) {
        res.status(500).json({cause: error.message})
    }
}