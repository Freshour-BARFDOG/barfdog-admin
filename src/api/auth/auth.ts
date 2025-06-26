import axiosInstance from "@/api/axiosInstance";

const login = async (formData: { email: string; password: string }) => {
	const response = await axiosInstance.post("/api/login", formData);
	console.log("login response", response);

	return response;
};

const logout = async () => {
	const response = await axiosInstance.get("/api/logout");

	return response;
};

export {
	login,
	logout,
};