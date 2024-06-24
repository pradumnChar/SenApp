const Loading= ({ color = "accent" }) => {
	const Mcolor = `text-${color}`;

	return <span className={`loading loading-spinner ${Mcolor}`} />;
};
export default Loading;