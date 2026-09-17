import { isAuthenticated } from "./authMiddleware";

export const adminOnly = async (request) => {
    const { authenticated, user } = await isAuthenticated(request);
    
    if(!authenticated) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if(user.role !== "admin") { 
        return Response.json({ message: "Not admin" }, { status: 403 });
    }
    return user;
}