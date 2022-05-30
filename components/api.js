export const checkUserExists = async (email) => {
	const response = await supabaseClient
		.from<definitions["users"]>("users")
		.select("*")
		.eq("email", email)
		.single();

	if (response && response.data) return response.data;

	return null;
};

export const isUsernameAvailable = async (username) => {
	const { data, error } = await supabaseClient
		.from<definitions["users"]>("users")
		.select("*")
		.eq("username", username.toLowerCase())
		.maybeSingle();
	if (error) {
		console.error("[isUsernameAvailable]", error);
	}
	return data ? false : true;
};

